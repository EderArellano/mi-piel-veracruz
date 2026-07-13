import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWhatsAppMessage } from "@/lib/whatsapp";
import { generateWhatsAppReply, type WaMessage } from "@/lib/ai/whatsapp-agent";
import { rateLimit } from "@/lib/rate-limit";

// ─── Meta webhook verification ──────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode      = searchParams.get("hub.mode");
  const token     = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// ─── Receive & reply to messages ────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: true }); // Meta expects 200 always
  }

  try {
    const payload = body as Record<string, unknown>;
    const entry   = (payload.entry as unknown[])?.[0] as Record<string, unknown> | undefined;
    const changes = (entry?.changes as unknown[])?.[0] as Record<string, unknown> | undefined;
    const value   = changes?.value as Record<string, unknown> | undefined;
    const messages = value?.messages as Record<string, unknown>[] | undefined;

    // Not a message event (status update, etc.)
    if (!messages?.length) return NextResponse.json({ ok: true });

    const msg  = messages[0];
    const from = msg.from as string;       // Sender phone number
    const type = msg.type as string;

    // Only handle text messages
    if (type !== "text") {
      await sendWhatsAppMessage(
        from,
        "Hola 👋 Por ahora solo puedo responder mensajes de texto. Para imágenes o notas de voz, escríbenos tu consulta en texto y con gusto te ayudo."
      );
      return NextResponse.json({ ok: true });
    }

    const text = (msg.text as Record<string, string>)?.body?.trim();
    if (!text) return NextResponse.json({ ok: true });

    // Rate-limit: 10 messages per minute per phone number
    if (!rateLimit(`wa:${from}`, 10, 60_000)) {
      return NextResponse.json({ ok: true }); // Silently drop; don't spam
    }

    // Get or create conversation keyed by phone number
    const sessionId = `whatsapp:${from}`;
    let conversation = await prisma.aiConversation.findUnique({
      where: { sessionId },
      include: {
        messages: { orderBy: { createdAt: "asc" }, take: 20 },
      },
    });

    if (!conversation) {
      conversation = await prisma.aiConversation.create({
        data: {
          sessionId,
          context: { platform: "whatsapp", phone: from },
        },
        include: { messages: true },
      });
    }

    // Persist incoming user message
    await prisma.aiMessage.create({
      data: {
        conversationId: conversation.id,
        role: "USER",
        content: text,
      },
    });

    // Build history for the agent (last 20 messages → 10 exchanges)
    const history: WaMessage[] = conversation.messages.map((m) => ({
      role: m.role === "USER" ? "user" : "assistant",
      content: m.content,
    }));

    // Generate reply with Claude
    const reply = await generateWhatsAppReply(history, text);

    // Persist assistant reply
    await prisma.aiMessage.create({
      data: {
        conversationId: conversation.id,
        role: "ASSISTANT",
        content: reply,
      },
    });

    // Send reply via WhatsApp API
    await sendWhatsAppMessage(from, reply);
  } catch (err) {
    // Log but always return 200 so Meta doesn't disable the webhook
    console.error("[WhatsApp Webhook]", err);
  }

  return NextResponse.json({ ok: true });
}

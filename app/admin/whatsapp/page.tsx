export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { MessageCircle, Bot, User, Phone } from "lucide-react";

export default async function AdminWhatsAppPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  const conversations = await prisma.aiConversation.findMany({
    where: { sessionId: { startsWith: "whatsapp:" } },
    include: {
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { updatedAt: "desc" },
    take: 50,
  });

  const totalMessages = await prisma.aiMessage.count({
    where: { conversation: { sessionId: { startsWith: "whatsapp:" } } },
  });

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2B2B2B] flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-[#25D366]" />
            Agente WhatsApp
          </h1>
          <p className="text-sm text-[#6B6B6B] mt-1">
            Conversaciones atendidas por el asistente de IA
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-center">
          <div className="bg-white rounded-2xl border border-[#E7E3DC] px-5 py-3 shadow-sm">
            <p className="text-2xl font-bold text-[#2B2B2B]">{conversations.length}</p>
            <p className="text-xs text-[#9CA3AF]">Conversaciones</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#E7E3DC] px-5 py-3 shadow-sm">
            <p className="text-2xl font-bold text-[#2B2B2B]">{totalMessages}</p>
            <p className="text-xs text-[#9CA3AF]">Mensajes totales</p>
          </div>
        </div>
      </div>

      {/* Config status */}
      {!process.env.WHATSAPP_TOKEN && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
          <strong>Configuración pendiente:</strong> Agrega las variables de entorno{" "}
          <code className="bg-amber-100 px-1 rounded">WHATSAPP_TOKEN</code>,{" "}
          <code className="bg-amber-100 px-1 rounded">WHATSAPP_PHONE_NUMBER_ID</code> y{" "}
          <code className="bg-amber-100 px-1 rounded">WHATSAPP_VERIFY_TOKEN</code> para activar el agente.
          El webhook URL es: <code className="bg-amber-100 px-1 rounded">{process.env.NEXT_PUBLIC_APP_URL}/api/whatsapp/webhook</code>
        </div>
      )}

      {/* Conversations */}
      {conversations.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E7E3DC] p-12 text-center">
          <MessageCircle className="w-12 h-12 text-[#C8C4BD] mx-auto mb-3" />
          <p className="font-semibold text-[#2B2B2B]">Sin conversaciones aún</p>
          <p className="text-sm text-[#6B6B6B] mt-1">
            Las conversaciones de WhatsApp aparecerán aquí una vez configurado el webhook.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {conversations.map((conv) => {
            const phone    = (conv.context as Record<string, string>)?.phone ?? "—";
            const lastMsg  = conv.messages[0];
            const isBot    = lastMsg?.role === "ASSISTANT";

            return (
              <ConversationCard
                key={conv.id}
                convId={conv.id}
                phone={phone}
                lastMessage={lastMsg?.content ?? "Sin mensajes"}
                isBot={isBot}
                updatedAt={conv.updatedAt}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Conversation detail fetches server-side per card ───────────────────────
async function ConversationCard({
  convId,
  phone,
  lastMessage,
  isBot,
  updatedAt,
}: {
  convId: string;
  phone: string;
  lastMessage: string;
  isBot: boolean;
  updatedAt: Date;
}) {
  const messages = await prisma.aiMessage.findMany({
    where: { conversationId: convId },
    orderBy: { createdAt: "asc" },
  });

  return (
    <details className="group bg-white rounded-2xl border border-[#E7E3DC] shadow-sm overflow-hidden">
      {/* Summary row */}
      <summary className="flex items-center gap-4 px-5 py-4 cursor-pointer select-none hover:bg-[#FAFAF8] transition-colors list-none">
        <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
          <Phone className="w-4 h-4 text-[#25D366]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[#2B2B2B] text-sm">+{phone}</p>
          <p className="text-xs text-[#6B6B6B] truncate mt-0.5">
            {isBot ? "🤖 " : "👤 "}
            {lastMessage.slice(0, 80)}{lastMessage.length > 80 ? "…" : ""}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-[#9CA3AF]">
            {format(updatedAt, "d MMM, HH:mm", { locale: es })}
          </p>
          <p className="text-xs text-[#9CA3AF] mt-0.5">{messages.length} msgs</p>
        </div>
      </summary>

      {/* Message thread */}
      <div className="border-t border-[#E7E3DC] px-5 py-4 space-y-3 max-h-96 overflow-y-auto bg-[#FAFAF8]">
        {messages.map((m) => {
          const isAssistant = m.role === "ASSISTANT";
          return (
            <div
              key={m.id}
              className={`flex gap-2 ${isAssistant ? "flex-row" : "flex-row-reverse"}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  isAssistant ? "bg-[#2596be]/10" : "bg-[#E7E3DC]"
                }`}
              >
                {isAssistant ? (
                  <Bot className="w-3.5 h-3.5 text-[#2596be]" />
                ) : (
                  <User className="w-3.5 h-3.5 text-[#6B6B6B]" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${
                  isAssistant
                    ? "bg-white border border-[#E7E3DC] text-[#2B2B2B] rounded-tl-sm"
                    : "bg-[#2596be] text-white rounded-tr-sm"
                }`}
              >
                <p className="whitespace-pre-wrap">{m.content}</p>
                <p
                  className={`text-[10px] mt-1 ${
                    isAssistant ? "text-[#9CA3AF]" : "text-white/60"
                  }`}
                >
                  {format(m.createdAt, "HH:mm")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </details>
  );
}

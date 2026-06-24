import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { NextResponse } from "next/server";

const profileSchema = z.object({
  name: z.string().min(2, "Nombre muy corto").max(80).trim(),
  phone: z.string().max(20).trim().optional().or(z.literal("")),
});

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
      { status: 422 }
    );
  }

  const { name, phone } = parsed.data;

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name,
      phone: phone || null,
    },
    select: { id: true, name: true, phone: true },
  });

  return NextResponse.json(updated);
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  token: z.string().min(64).max(64),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Datos inválidos" }, { status: 400 });
  }

  const { email, token, password } = parsed.data;

  const record = await prisma.verificationToken.findFirst({
    where: { identifier: email.toLowerCase(), token },
  });

  if (!record) {
    return NextResponse.json({ message: "Enlace inválido o expirado" }, { status: 400 });
  }

  if (record.expires < new Date()) {
    await prisma.verificationToken.delete({ where: { identifier_token: { identifier: email, token } } });
    return NextResponse.json({ message: "El enlace ha expirado. Solicita uno nuevo." }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 12);

  await prisma.$transaction([
    prisma.user.update({ where: { email }, data: { password: hashed } }),
    prisma.verificationToken.delete({ where: { identifier_token: { identifier: email, token } } }),
  ]);

  return NextResponse.json({ success: true });
}

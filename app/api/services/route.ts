import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createServiceSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  duration: z.number().int().positive(),
  price: z.number().positive(),
  currency: z.string().default("MXN"),
  category: z.enum(["FACIAL", "LEGS", "ARMPITS", "BIKINI", "FULL_BODY", "MENS", "PACKAGE", "OTHER"]),
  imageUrl: z.string().url().optional(),
  isPackage: z.boolean().default(false),
  sessionsIncluded: z.number().int().positive().optional(),
});

export async function GET() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { price: "asc" }],
  });
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = createServiceSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: "Datos inválidos" }, { status: 400 });

  const service = await prisma.service.create({ data: parsed.data });
  return NextResponse.json(service, { status: 201 });
}

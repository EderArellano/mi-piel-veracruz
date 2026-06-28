import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { ProductCategory } from "@prisma/client";

const productSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  shortDesc: z.string().max(200).optional(),
  price: z.number().positive(),
  comparePrice: z.number().positive().optional().nullable(),
  images: z.array(z.string().url()).default([]),
  category: z.nativeEnum(ProductCategory),
  brand: z.string().optional(),
  stock: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  ingredients: z.string().optional(),
  howToUse: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDesc: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") as ProductCategory | null;
  const featured = searchParams.get("featured") === "true";
  const search = searchParams.get("q") ?? "";
  const activeOnly = searchParams.get("activeOnly") !== "false";

  const where = {
    ...(activeOnly && { isActive: true }),
    ...(featured && { isFeatured: true }),
    ...(category && { category }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { brand: { contains: search, mode: "insensitive" as const } },
        { tags: { has: search } },
      ],
    }),
  };

  const products = await prisma.product.findMany({
    where,
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await prisma.product.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return NextResponse.json({ error: "Ya existe un producto con ese slug" }, { status: 409 });
  }

  const product = await prisma.product.create({ data: parsed.data });
  return NextResponse.json(product, { status: 201 });
}

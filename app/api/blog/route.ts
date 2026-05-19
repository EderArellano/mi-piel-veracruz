import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { slugify, generateReadTime } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const category = searchParams.get("category");
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  if (slug) {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: { select: { name: true, image: true } },
        category: true,
        faqs: { orderBy: { order: "asc" } },
      },
    });
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await prisma.blogPost.update({ where: { id: post.id }, data: { views: { increment: 1 } } });
    return NextResponse.json(post);
  }

  const where = {
    status: "PUBLISHED" as const,
    ...(category ? { category: { slug: category } } : {}),
  };

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      include: {
        author: { select: { name: true, image: true } },
        category: { select: { name: true, slug: true } },
      },
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return NextResponse.json({ posts, total, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!["ADMIN", "EMPLOYEE"].includes(session?.user.role || "")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { title, content, excerpt, coverImage, categoryId, tags, seoTitle, seoDesc, seoKeywords, status, faqs } = body;

  const post = await prisma.blogPost.create({
    data: {
      title,
      slug: slugify(title),
      content,
      excerpt,
      coverImage,
      categoryId,
      tags: tags || [],
      seoTitle,
      seoDesc,
      seoKeywords: seoKeywords || [],
      status: status || "DRAFT",
      readTime: generateReadTime(content),
      authorId: session!.user.id!,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
      faqs: {
        create: (faqs || []).map((f: { question: string; answer: string }, i: number) => ({
          question: f.question,
          answer: f.answer,
          order: i,
        })),
      },
    },
    include: { faqs: true },
  });

  return NextResponse.json(post, { status: 201 });
}

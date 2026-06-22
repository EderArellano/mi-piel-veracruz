import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { slugify, generateReadTime } from "@/lib/utils";
import sanitizeHtml from "sanitize-html";

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "h1", "h2", "h3", "h4", "ul", "ol", "li",
    "strong", "em", "u", "s", "a", "img", "blockquote",
    "pre", "code", "br", "hr", "table", "thead", "tbody", "tr", "th", "td",
  ],
  allowedAttributes: {
    a: ["href", "title", "rel", "target"],
    img: ["src", "alt", "width", "height"],
    "*": ["class"],
  },
  allowedSchemes: ["https", "http", "mailto"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
  },
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const category = searchParams.get("category");
  const page = Number(searchParams.get("page") || 1);
  const limit = Math.min(Number(searchParams.get("limit") || 10), 50);

  if (slug) {
    const post = await prisma.blogPost.findUnique({
      where: { slug, status: "PUBLISHED" },
      include: {
        author: { select: { name: true, image: true } },
        category: true,
        faqs: { orderBy: { order: "asc" } },
      },
    });
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
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

  if (!title || typeof title !== "string" || title.trim().length < 3) {
    return NextResponse.json({ message: "Título inválido" }, { status: 400 });
  }
  if (!content || typeof content !== "string") {
    return NextResponse.json({ message: "Contenido requerido" }, { status: 400 });
  }

  const safeContent = sanitizeHtml(content, SANITIZE_OPTIONS);

  const post = await prisma.blogPost.create({
    data: {
      title: title.trim(),
      slug: slugify(title),
      content: safeContent,
      excerpt: excerpt ? sanitizeHtml(excerpt, { allowedTags: [] }) : undefined,
      coverImage,
      categoryId,
      tags: Array.isArray(tags) ? tags : [],
      seoTitle,
      seoDesc,
      seoKeywords: Array.isArray(seoKeywords) ? seoKeywords : [],
      status: status || "DRAFT",
      readTime: generateReadTime(safeContent),
      authorId: session!.user.id!,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
      faqs: {
        create: (Array.isArray(faqs) ? faqs : []).map(
          (f: { question: string; answer: string }, i: number) => ({
            question: f.question,
            answer: sanitizeHtml(f.answer, { allowedTags: [] }),
            order: i,
          })
        ),
      },
    },
    include: { faqs: true },
  });

  return NextResponse.json(post, { status: 201 });
}

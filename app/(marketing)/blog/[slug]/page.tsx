import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!post) return { title: "Artículo no encontrado" };

  return {
    title: post.seoTitle || post.title,
    description: post.seoDesc || post.excerpt || "",
    keywords: post.seoKeywords,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDesc || post.excerpt || "",
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      type: "article",
    },
    alternates: { canonical: `https://mipielveracruz.com/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: {
      author: { select: { name: true, image: true } },
      category: true,
      faqs: { orderBy: { order: "asc" } },
    },
  });

  if (!post) notFound();

  await prisma.blogPost.update({ where: { id: post.id }, data: { views: { increment: 1 } } });

  return (
    <article className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <header className="mb-10">
          {post.category && <Badge variant="default" className="mb-4">{post.category.name}</Badge>}
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-rose-400 flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {(post.author.name || "A")[0]}
                </span>
              </div>
              <span>{post.author.name}</span>
            </div>
            {post.publishedAt && (
              <span>{formatDate(post.publishedAt)}</span>
            )}
            {post.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{post.readTime} min de lectura</span>
              </div>
            )}
          </div>
        </header>

        {/* Cover image */}
        {post.coverImage && (
          <div className="aspect-video rounded-3xl overflow-hidden mb-10 bg-muted relative">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-gray max-w-none
            prose-headings:font-bold prose-headings:text-foreground
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-2xl prose-blockquote:border-primary"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* FAQs */}
        {post.faqs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Preguntas frecuentes</h2>
            <div className="space-y-4">
              {post.faqs.map((faq) => (
                <div key={faq.id} className="card-premium p-6">
                  <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: post.faqs.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: { "@type": "Answer", text: faq.answer },
                  })),
                }),
              }}
            />
          </div>
        )}

        {/* Article schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.excerpt,
              author: { "@type": "Person", name: post.author.name },
              publisher: {
                "@type": "Organization",
                name: "Mi Piel Veracruz",
                url: "https://mipielveracruz.com",
              },
              datePublished: post.publishedAt,
              dateModified: post.updatedAt,
              image: post.coverImage || "https://mipielveracruz.com/og-image.jpg",
              url: `https://mipielveracruz.com/blog/${post.slug}`,
            }),
          }}
        />
      </div>
    </article>
  );
}

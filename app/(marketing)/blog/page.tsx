import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { BookOpen, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog de Depilación Láser en Veracruz | Mi Piel Veracruz",
  description:
    "Guías, consejos y artículos sobre depilación láser, cuidado de la piel y tratamientos estéticos. Blog especializado en dermatología estética.",
  alternates: { canonical: "https://mipielveracruz.com/blog" },
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      include: {
        author: { select: { name: true } },
        category: { select: { name: true, slug: true } },
      },
      orderBy: { publishedAt: "desc" },
      take: 20,
    }),
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="py-20">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge-premium mb-4">✦ Blog</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Aprende sobre{" "}
            <span className="text-gradient font-display italic">depilación láser</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Artículos especializados sobre cuidado de la piel, depilación láser y tratamientos
            estéticos en Veracruz.
          </p>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/blog?category=${cat.slug}`}
                className="px-4 py-2 rounded-full text-sm font-medium border border-border hover:border-primary/40 hover:bg-primary/5 transition-all"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* Posts grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Blog en construcción</h3>
            <p className="text-muted-foreground">Pronto publicaremos artículos sobre depilación láser.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <div className="card-premium overflow-hidden hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
                  {/* Cover image placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-rose-50 to-pink-50 relative overflow-hidden">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <BookOpen className="w-10 h-10 text-primary/30" />
                      </div>
                    )}
                    {post.category && (
                      <div className="absolute top-4 left-4">
                        <Badge variant="premium">{post.category.name}</Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="font-bold text-foreground text-lg leading-snug mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                      <div className="text-xs text-muted-foreground">
                        {post.publishedAt && formatDate(post.publishedAt)}
                        {post.readTime && ` · ${post.readTime} min`}
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BookOpen, Eye, Clock } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata = { title: "Blog | Admin Mi Piel" };

export default async function AdminBlogPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  const posts = await prisma.blogPost.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Blog</h1>
          <p className="text-sm text-muted-foreground mt-1">{posts.length} artículos</p>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="card-premium p-12 text-center">
          <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium text-foreground">Sin artículos aún</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {posts.map((post) => (
            <div key={post.id} className="card-premium p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/8 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm truncate">{post.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {post.category?.name ?? "Sin categoría"} ·{" "}
                  <span className="flex-inline items-center gap-1">
                    <Clock className="w-3 h-3 inline" /> {post.readTime} min
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  post.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-600" :
                  post.status === "DRAFT" ? "bg-muted text-muted-foreground" :
                  "bg-amber-50 text-amber-600"
                }`}>
                  {post.status === "PUBLISHED" ? "Publicado" : post.status === "DRAFT" ? "Borrador" : post.status}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

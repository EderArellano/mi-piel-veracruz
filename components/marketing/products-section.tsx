import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ShoppingBag, Star, ArrowRight } from "lucide-react";

async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { isActive: true, isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
}

function formatPrice(n: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
}

export async function ProductsSection() {
  const products = await getFeaturedProducts();
  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2596be]/10 text-[#2596be] text-sm font-medium mb-4">
            <ShoppingBag className="w-3.5 h-3.5" />
            Tienda
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2B2B2B] mb-3">
            Productos recomendados
          </h2>
          <p className="text-[#6B6B6B] max-w-xl mx-auto">
            Selección profesional para complementar y mantener los resultados de tus tratamientos.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/productos/${p.slug}`}
              className="group bg-white rounded-[22px] border border-[#E7E3DC] overflow-hidden shadow-[0_4px_18px_rgba(0,0,0,.05)] hover:shadow-[0_12px_36px_rgba(0,0,0,.09)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-square bg-[#F4F2EE] overflow-hidden">
                {p.images[0] ? (
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-[#C8C4BD]" />
                  </div>
                )}
                {p.comparePrice && p.comparePrice > p.price && (
                  <div className="absolute top-3 left-3 bg-[#2596be] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    -{Math.round(((p.comparePrice - p.price) / p.comparePrice) * 100)}%
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <p className="text-xs text-[#2596be] font-medium uppercase tracking-wider mb-1">{p.brand ?? p.category}</p>
                <h3 className="font-display font-semibold text-[#2B2B2B] text-base leading-snug mb-2 group-hover:text-[#2596be] transition-colors line-clamp-2">
                  {p.name}
                </h3>
                {p.shortDesc && (
                  <p className="text-sm text-[#6B6B6B] mb-3 line-clamp-2">{p.shortDesc}</p>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-[#2B2B2B]">{formatPrice(p.price)}</span>
                  {p.comparePrice && p.comparePrice > p.price && (
                    <span className="text-sm text-[#9CA3AF] line-through">{formatPrice(p.comparePrice)}</span>
                  )}
                </div>

                {/* Stars placeholder */}
                <div className="flex items-center gap-0.5 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#C8A96A] text-[#C8A96A]" />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#2596be] text-white font-semibold hover:bg-[#4d6860] transition-colors shadow-[0_4px_14px_rgba(37,150,190,.35)]"
          >
            Ver todos los productos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

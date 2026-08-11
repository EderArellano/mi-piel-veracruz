import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCategory } from "@prisma/client";
import { ShoppingBag, Star, Filter } from "lucide-react";

export const metadata: Metadata = {
  title: "Tienda de Productos Dermatológicos | Mi Piel Veracruz",
  description:
    "Productos dermatológicos y de skincare recomendados por nuestros especialistas. Cremas, suplementos, kits y accesorios para cuidar tu piel en casa.",
  alternates: { canonical: "https://mipielveracruz.com/productos" },
  openGraph: {
    title: "Tienda — Mi Piel Centro Dermocosmético",
    description: "Productos profesionales para complementar tus tratamientos.",
    url: "https://mipielveracruz.com/productos",
    type: "website",
  },
};

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  SKINCARE: "Skincare",
  COSMETICOS: "Cosméticos",
  SUPLEMENTOS: "Suplementos",
  KITS: "Kits",
  ACCESORIOS: "Accesorios",
};

function formatPrice(n: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
}

interface Props {
  searchParams: Promise<{ categoria?: string; q?: string }>;
}

export default async function ProductosPage({ searchParams }: Props) {
  const { categoria, q } = await searchParams;

  const category = categoria as ProductCategory | undefined;

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(category && Object.values(ProductCategory).includes(category) && { category }),
      ...(q && {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { brand: { contains: q, mode: "insensitive" } },
          { tags: { has: q } },
        ],
      }),
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  const allCategories = Object.values(ProductCategory);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2596be]/10 text-[#2596be] text-sm font-medium mb-4">
            <ShoppingBag className="w-3.5 h-3.5" />
            Tienda
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#2B2B2B] mb-4">
            Productos <span className="text-[#2596be]">recomendados</span>
          </h1>
          <p className="text-[#6B6B6B] max-w-xl mx-auto text-lg">
            Selección profesional para complementar y mantener los resultados de tus tratamientos.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-20 bg-white/95 backdrop-blur border-b border-[#E7E3DC] py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-3 overflow-x-auto scrollbar-none">
          <Filter className="w-4 h-4 text-[#9CA3AF] shrink-0" />
          <Link
            href="/productos"
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !category ? "bg-[#2596be] text-white" : "bg-[#F4F2EE] text-[#6B6B6B] hover:bg-[#E7E3DC]"
            }`}
          >
            Todos
          </Link>
          {allCategories.map((cat) => (
            <Link
              key={cat}
              href={`/productos?categoria=${cat}`}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-[#2596be] text-white"
                  : "bg-[#F4F2EE] text-[#6B6B6B] hover:bg-[#E7E3DC]"
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </Link>
          ))}
        </div>
      </section>

      {/* Products grid */}
      <section className="py-12 bg-[#FAFAF8] min-h-[40vh]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <ShoppingBag className="w-14 h-14 text-[#C8C4BD] mb-4" />
              <h2 className="font-display text-xl font-semibold text-[#2B2B2B] mb-2">
                No hay productos disponibles
              </h2>
              <p className="text-[#6B6B6B]">Pronto agregaremos más productos a nuestra tienda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
                        <ShoppingBag className="w-10 h-10 text-[#C8C4BD]" />
                      </div>
                    )}
                    {p.comparePrice && p.comparePrice > p.price && (
                      <div className="absolute top-3 left-3 bg-[#2596be] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        -{Math.round(((p.comparePrice - p.price) / p.comparePrice) * 100)}%
                      </div>
                    )}
                    {p.isFeatured && (
                      <div className="absolute top-3 right-3 bg-[#C8A96A] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        Destacado
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-xs text-[#2596be] font-medium uppercase tracking-wider mb-1">
                      {p.brand ?? CATEGORY_LABELS[p.category]}
                    </p>
                    <h3 className="font-display font-semibold text-[#2B2B2B] text-sm leading-snug mb-1.5 group-hover:text-[#2596be] transition-colors line-clamp-2">
                      {p.name}
                    </h3>
                    {p.shortDesc && (
                      <p className="text-xs text-[#6B6B6B] mb-2 line-clamp-2">{p.shortDesc}</p>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-[#2B2B2B]">{formatPrice(p.price)}</span>
                      {p.comparePrice && p.comparePrice > p.price && (
                        <span className="text-xs text-[#9CA3AF] line-through">{formatPrice(p.comparePrice)}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5 mt-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#C8A96A] text-[#C8A96A]" />
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-14 bg-gradient-to-r from-[#2596be] to-[#4d6860]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            ¿No sabes qué producto elegir?
          </h2>
          <p className="text-white/80 mb-6">
            Agenda tu consulta gratis y nuestros especialistas te recomendarán el protocolo ideal para tu tipo de piel.
          </p>
          <a
            href="https://wa.me/522291234567?text=Hola%2C%20me%20gustar%C3%ADa%20que%20me%20recomienden%20productos%20para%20mi%20piel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-[#2596be] font-semibold hover:bg-[#F4F2EE] transition-colors"
          >
            Habla con un especialista
          </a>
        </div>
      </section>
    </>
  );
}

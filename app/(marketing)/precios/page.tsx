import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Zap, Star, MessageCircle } from "lucide-react";

const WA_NUMBER = "522299330014";
const WA_MSG = encodeURIComponent("Hola, quiero información sobre precios y paquetes de depilación láser. ¿Pueden orientarme?");

export const metadata: Metadata = {
  title: "Precio Depilación Láser Veracruz — Tarifas 2025 | Mi Piel",
  description:
    "¿Cuánto cuesta la depilación láser en Veracruz? Desde $500 MXN por sesión. Precios transparentes por zona: axilas, bikini, piernas, facial. Paga desde $42/mes a 12 MSI. Primera consulta gratis.",
  keywords: [
    "precio depilación láser Veracruz",
    "cuánto cuesta depilación láser Veracruz",
    "costo depilación láser axilas Veracruz",
    "paquete depilación láser Boca del Río precio",
    "precio sesión láser Veracruz 2025",
    "depilación láser meses sin intereses Veracruz",
    "financiamiento depilación láser Veracruz",
  ],
  alternates: { canonical: "https://mipielveracruz.com/precios" },
  openGraph: {
    title: "Precio Depilación Láser Veracruz — Desde $500 MXN | Mi Piel",
    description: "Precios transparentes por zona. Axilas desde $600, piernas desde $1,200. 12 MSI disponibles. Primera consulta gratis.",
    url: "https://mipielveracruz.com/precios",
  },
};

const tiers = [
  {
    name: "Bronce",
    tag: "Comienza aquí",
    price: 500,
    monthly: 42,
    highlight: false,
    accent: "#9b7b5b",
    desc: "Una zona a elegir. Ideal para explorar el tratamiento sin comprometerte a un paquete grande.",
    features: [
      "1 zona a elegir",
      "Evaluación de tipo de piel",
      "Tecnología láser Diodo médico",
      "Sin contratos ni letras chicas",
      "Pago por sesión",
    ],
    cta: "Agendar consulta gratis",
    href: "/agendar",
  },
  {
    name: "Plata",
    tag: "Más popular — 70% lo elige",
    price: 2100,
    monthly: 175,
    highlight: true,
    accent: "#2596be",
    desc: "Axilas + Bikini + Media pierna. El combo favorito de nuestras pacientes. Ahorra 20% vs. precio por zona.",
    features: [
      "Axilas + Bikini + Media pierna",
      "6 sesiones incluidas",
      "Evaluación personalizada Skin Analyzer",
      "20% de descuento vs. precio individual",
      "Seguimiento personalizado",
      "Reagendado sin costo",
    ],
    cta: "Quiero este paquete",
    href: "/agendar",
  },
  {
    name: "Oro",
    tag: "Máximo resultado",
    price: 4500,
    monthly: 375,
    highlight: false,
    accent: "#c9a96e",
    desc: "Cuerpo completo. La solución definitiva: todas las zonas, plan 360°, seguimiento mensual.",
    features: [
      "Todas las zonas incluidas",
      "Plan de tratamiento 360°",
      "Tecnología láser Diodo grado médico",
      "40% de descuento vs. precio individual",
      "Seguimiento mensual",
      "Reagendado sin costo",
      "Acceso prioritario a citas",
      "Consulta Skin Analyzer incluida",
    ],
    cta: "Agendar consulta gratis",
    href: "/agendar",
  },
];

const zones = [
  { name: "Labio superior", price: 500, slug: null },
  { name: "Mentón / Cara completa", price: 900, slug: "facial" },
  { name: "Axilas", price: 600, slug: "axilas" },
  { name: "Brazos completos", price: 900, slug: null },
  { name: "Media pierna", price: 900, slug: "piernas" },
  { name: "Pierna completa", price: 1200, slug: "piernas" },
  { name: "Bikini clásico", price: 800, slug: "bikini-brasileno" },
  { name: "Bikini brasileño", price: 1000, slug: "bikini-brasileno" },
  { name: "Bikini integral", price: 1200, slug: "bikini-brasileno" },
  { name: "Abdomen", price: 700, slug: "abdomen" },
  { name: "Espalda (caballeros)", price: 1500, slug: "espalda" },
  { name: "Pecho (caballeros)", price: 1000, slug: "espalda" },
];

const priceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Precio Depilación Láser Veracruz 2025",
  url: "https://mipielveracruz.com/precios",
  itemListElement: [
    { "@type": "ListItem", position: 1, item: { "@type": "Offer", name: "Depilación Láser Labio Superior Veracruz", price: "500", priceCurrency: "MXN", seller: { "@id": "https://mipielveracruz.com/#clinic" } } },
    { "@type": "ListItem", position: 2, item: { "@type": "Offer", name: "Depilación Láser Axilas Veracruz", price: "600", priceCurrency: "MXN", seller: { "@id": "https://mipielveracruz.com/#clinic" } } },
    { "@type": "ListItem", position: 3, item: { "@type": "Offer", name: "Depilación Láser Media Pierna Veracruz", price: "900", priceCurrency: "MXN", seller: { "@id": "https://mipielveracruz.com/#clinic" } } },
    { "@type": "ListItem", position: 4, item: { "@type": "Offer", name: "Depilación Láser Pierna Completa Veracruz", price: "1200", priceCurrency: "MXN", seller: { "@id": "https://mipielveracruz.com/#clinic" } } },
    { "@type": "ListItem", position: 5, item: { "@type": "Offer", name: "Depilación Láser Bikini Brasileño Veracruz", price: "1000", priceCurrency: "MXN", seller: { "@id": "https://mipielveracruz.com/#clinic" } } },
    { "@type": "ListItem", position: 6, item: { "@type": "Offer", name: "Paquete Cuerpo Completo Depilación Láser Veracruz", price: "4500", priceCurrency: "MXN", seller: { "@id": "https://mipielveracruz.com/#clinic" } } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://mipielveracruz.com" },
    { "@type": "ListItem", position: 2, name: "Precio Depilación Láser Veracruz", item: "https://mipielveracruz.com/precios" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "¿Cuánto cuesta la depilación láser en Veracruz?", acceptedAnswer: { "@type": "Answer", text: "La depilación láser en MiPiel Veracruz comienza desde $500 MXN por sesión para zonas pequeñas como el labio superior. Las axilas cuestan $600, media pierna $900 y pierna completa $1,200. El paquete más popular (axilas + bikini + media pierna, 6 sesiones) es $2,100 MXN." } },
    { "@type": "Question", name: "¿Tienen financiamiento o meses sin intereses?", acceptedAnswer: { "@type": "Answer", text: "Sí. Puedes pagar tus sesiones a 12 meses sin intereses con MercadoPago. El paquete Plata equivale a $175/mes. El paquete Bronce desde $42/mes por sesión." } },
    { "@type": "Question", name: "¿Cuántas sesiones necesito?", acceptedAnswer: { "@type": "Answer", text: "La mayoría de las zonas requieren 6 a 8 sesiones para resultados permanentes, con citas cada 4–8 semanas dependiendo de la zona. Los resultados visibles aparecen desde la 2ª o 3ª sesión." } },
    { "@type": "Question", name: "¿Qué incluye la primera consulta gratis?", acceptedAnswer: { "@type": "Answer", text: "La primera consulta incluye análisis completo de tu tipo de piel con Skin Analyzer (cámara de imágenes clínicas), evaluación de zonas a tratar, y plan de tratamiento personalizado. Sin compromiso de pago." } },
  ],
};

export default function PreciosPage() {
  return (
    <div style={{ background: "#070d14", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(priceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary/12 blur-[180px] pointer-events-none" />
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.18em] mb-6 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/8">
            <Zap className="w-3.5 h-3.5" />
            Precios 2025
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4">
            Precio Depilación Láser{" "}
            <span style={{ background: "linear-gradient(125deg, #2596be, #56cfe1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              en Veracruz
            </span>
          </h1>
          <p className="text-white/50 text-xl mb-4">
            Sin letras pequeñas. Sin costos ocultos. Primera consulta siempre gratis.
          </p>
          <p className="text-white/35 text-sm mb-10">
            Financiamiento disponible · 12 meses sin intereses con MercadoPago
          </p>

          {/* Stars */}
          <div className="inline-flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-white/40 text-sm ml-1">4.9 · 49 reseñas verificadas en Google</span>
          </div>
        </div>
      </section>

      {/* Anchor pricing tiers */}
      <section className="pb-20 section-container">
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="relative rounded-3xl overflow-hidden flex flex-col"
              style={{
                background: tier.highlight ? `linear-gradient(160deg, #0f2233 0%, #1a3a52 100%)` : "#111a24",
                border: tier.highlight ? `1.5px solid ${tier.accent}50` : "1px solid rgba(255,255,255,0.07)",
                boxShadow: tier.highlight ? `0 0 60px ${tier.accent}20` : "none",
              }}
            >
              {tier.highlight && (
                <div
                  className="absolute top-0 inset-x-0 text-center text-[10px] font-black uppercase tracking-widest py-2"
                  style={{ background: tier.accent, color: "#fff" }}
                >
                  {tier.tag}
                </div>
              )}
              <div className={`h-1 w-full ${tier.highlight ? "mt-7" : ""}`} style={{ background: `linear-gradient(90deg, ${tier.accent}, ${tier.accent}80)` }} />

              <div className="p-7 flex flex-col flex-1">
                {!tier.highlight && (
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest mb-5 inline-block"
                    style={{ color: tier.accent }}
                  >
                    {tier.tag}
                  </span>
                )}

                <div className="mb-1">
                  <span className="font-display text-lg font-black text-white/40 mr-2">{tier.name}</span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-display text-4xl font-black text-white">${tier.price.toLocaleString("es-MX")}</span>
                  <span className="text-white/40 text-sm">MXN / sesión</span>
                </div>
                <p className="text-sm mb-2" style={{ color: tier.accent }}>
                  o desde ${tier.monthly}/mes a 12 MSI
                </p>
                <p className="text-white/40 text-sm mb-6">{tier.desc}</p>

                <ul className="space-y-3 flex-1 mb-7">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/60">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: tier.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.href}
                  className="w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                  style={
                    tier.highlight
                      ? { background: tier.accent, color: "#fff", boxShadow: `0 0 30px ${tier.accent}40` }
                      : { background: `${tier.accent}18`, color: tier.accent, border: `1px solid ${tier.accent}35` }
                  }
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* MSI note */}
        <div className="mt-6 text-center">
          <p className="text-white/30 text-sm">
            Financiamiento a 12 MSI disponible con MercadoPago · Sin penalización por pago anticipado
          </p>
        </div>
      </section>

      {/* Price per zone */}
      <section className="py-16" style={{ background: "#0a1520" }}>
        <div className="section-container">
          <div className="text-center mb-10">
            <div className="text-primary text-xs font-bold uppercase tracking-[0.18em] mb-3">Tarifario completo</div>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-3">
              Precio por zona
            </h2>
            <p className="text-white/40 text-sm">
              El precio final se confirma en tu consulta gratuita según tu tipo de piel y densidad de vello.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {zones.map((z) => {
              const msi = Math.ceil(z.price / 12);
              const inner = (
                <div
                  className="flex items-center justify-between px-5 py-4 rounded-2xl border transition-all duration-200 group-hover:border-primary/30"
                  style={{ background: "#111a24", borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors">{z.name}</span>
                  <div className="text-right">
                    <div className="text-primary font-bold text-sm">${z.price}</div>
                    <div className="text-white/25 text-xs">desde ${msi}/mes</div>
                  </div>
                </div>
              );
              return z.slug ? (
                <Link key={z.name} href={`/servicios/${z.slug}`} className="group block">
                  {inner}
                </Link>
              ) : (
                <div key={z.name} className="group">{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16" style={{ background: "#070d14" }}>
        <div className="section-container max-w-3xl">
          <div className="text-center mb-10">
            <div className="text-primary text-xs font-bold uppercase tracking-[0.18em] mb-3">FAQ</div>
            <h2 className="font-display text-3xl font-black text-white">Preguntas sobre precios</h2>
          </div>
          <div className="space-y-4">
            {faqSchema.mainEntity.map(({ name: q, acceptedAnswer }) => (
              <div
                key={q}
                className="rounded-2xl p-6"
                style={{ background: "#0f1c2a", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <h3 className="font-semibold text-white mb-3">{q}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #0e1e2e, #1a3a52, #0e1e2e)" }}>
        <div className="section-container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-4">
            ¿Dudas sobre qué paquete elegir?
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            Tu primera consulta con Skin Analyzer es gratis. Te decimos exactamente qué necesitas y cuánto costará.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/agendar"
              className="inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-bold px-9 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
              style={{ boxShadow: "0 0 35px rgba(37,150,190,0.4)" }}
            >
              Consulta gratis — Sin compromiso
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 border border-white/15 text-white/65 hover:text-white hover:border-white/35 hover:bg-white/5 font-semibold px-8 py-4 rounded-2xl transition-all duration-200"
            >
              <MessageCircle className="w-5 h-5 text-[#22c55e]" />
              Preguntar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

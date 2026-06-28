import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Star, Zap, Shield, Clock } from "lucide-react";
import { PackageBuilder } from "@/components/marketing/package-builder";

export const metadata: Metadata = {
  title: "Depilación Láser en Veracruz — Servicios y Zonas | Mi Piel",
  description:
    "Depilación láser en Veracruz y Boca del Río: facial, axilas, piernas, bikini y cuerpo completo. Láser Diodo grado médico. Apta para todo tipo de piel. Arma tu paquete personalizado. Primera consulta gratis.",
  keywords: [
    "depilación láser Veracruz zonas",
    "depilación láser axilas Veracruz",
    "depilación láser piernas Veracruz",
    "depilación láser bikini Veracruz",
    "depilación láser facial Veracruz",
    "depilación láser caballeros Veracruz",
    "paquete depilación láser Veracruz",
  ],
  alternates: { canonical: "https://mipielveracruz.com/servicios" },
  openGraph: {
    title: "Depilación Láser en Veracruz — Arma tu Paquete | Mi Piel",
    description: "Facial, axilas, piernas, bikini y cuerpo completo. Láser Diodo médico. Elige tus zonas y obtén hasta 20% de descuento.",
    url: "https://mipielveracruz.com/servicios",
  },
};

const services = [
  {
    name: "Depilación Facial",
    slug: "facial",
    emoji: "✨",
    tag: "Zona de precisión",
    tagColor: "#9b7b5b",
    headline: "Rostro perfectamente limpio",
    description: "Labio superior, mentón, mejillas y cara completa. Elimina el vello que afecta tu confianza — sin manchas, sin incomodidad, sin regresos.",
    sessions: "6–10 sesiones",
    price: "Desde $500",
    unit: "MXN / sesión",
    href: "/servicios/facial",
  },
  {
    name: "Axilas",
    slug: "axilas",
    emoji: "🙌",
    tag: "Más solicitada",
    tagColor: "#2596be",
    headline: "Adiós al rasurado diario",
    description: "La zona más popular en Veracruz. Sin rasuradora, sin cera, sin foliculitis. Piel suave y sin manchas todo el año — incluso en temporada de calor.",
    sessions: "6–8 sesiones",
    price: "Desde $600",
    unit: "MXN / sesión",
    href: "/servicios/axilas",
  },
  {
    name: "Piernas",
    slug: "piernas",
    emoji: "🦵",
    tag: "Para la playa",
    tagColor: "#0891b2",
    headline: "Piernas listas todo el año",
    description: "Media pierna o pierna completa. Perfectas para el calor y la playa veracruzana. Olvídate de la cera para siempre — sin vellos encarnados, sin irritación.",
    sessions: "6–8 sesiones",
    price: "Desde $900",
    unit: "MXN / sesión",
    href: "/servicios/piernas",
  },
  {
    name: "Zona Íntima",
    slug: "bikini-brasileno",
    emoji: "🌺",
    tag: "Total discreción",
    tagColor: "#7c3aed",
    headline: "Libertad total, sin incomodidad",
    description: "Bikini clásico, brasileño o integral. Procedimiento completamente privado y profesional. Sin irritación, sin hongos, sin inseguridades en la playa.",
    sessions: "6–8 sesiones",
    price: "Desde $800",
    unit: "MXN / sesión",
    href: "/servicios/bikini-brasileno",
  },
  {
    name: "Abdomen",
    slug: "abdomen",
    emoji: "💎",
    tag: "Resultado rápido",
    tagColor: "#059669",
    headline: "Línea umbilical sin rastros",
    description: "Ideal antes de temporada de playa. Elimina la línea umbilical y el vello abdominal en sesiones de solo 20 minutos. Sin tiempo de recuperación.",
    sessions: "6–8 sesiones",
    price: "Desde $700",
    unit: "MXN / sesión",
    href: "/servicios/abdomen",
  },
  {
    name: "Caballeros",
    slug: "espalda",
    emoji: "🏋️",
    tag: "Para ellos",
    tagColor: "#c9a96e",
    headline: "Espalda y pecho sin vello",
    description: "Espalda, pecho, hombros y cuello. Diseñado para el vello masculino grueso. Más comodidad, mejor higiene y confianza total — en el calor de Veracruz.",
    sessions: "6–8 sesiones",
    price: "Desde $1,000",
    unit: "MXN / sesión",
    href: "/servicios/espalda",
  },
];

const whyUs = [
  { icon: Zap, title: "Láser Diodo FDA-cleared", desc: "Tecnología grado médico segura para piel morena y bronceada — la más común en Veracruz." },
  { icon: Shield, title: "Sin dolor garantizado", desc: "Sistema de enfriamiento integrado en cada disparo. La mayoría lo describe como una liga suave." },
  { icon: Star, title: "8 años de experiencia", desc: "Más de 5,000 pacientes tratadas en Veracruz y Boca del Río. Especialistas en piel mexicana." },
  { icon: CheckCircle2, title: "Resultados desde la 1ª sesión", desc: "Reducción visible desde la primera cita. Resultados permanentes en 6–8 sesiones." },
  { icon: Clock, title: "Sin tiempo de recuperación", desc: "Regresa a tus actividades de inmediato. Sesiones de 15 a 60 minutos según la zona." },
  { icon: CheckCircle2, title: "Primera consulta GRATIS", desc: "Análisis Skin Analyzer sin costo. Te decimos exactamente qué necesitas y cuánto costará." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Servicios de Depilación Láser en Veracruz",
  url: "https://mipielveracruz.com/servicios",
  itemListElement: [
    { "@type": "ListItem", position: 1, item: { "@type": "Service", name: "Depilación Láser Facial Veracruz", provider: { "@id": "https://mipielveracruz.com/#clinic" }, offers: { "@type": "Offer", price: "500", priceCurrency: "MXN" } } },
    { "@type": "ListItem", position: 2, item: { "@type": "Service", name: "Depilación Láser Axilas Veracruz", provider: { "@id": "https://mipielveracruz.com/#clinic" }, offers: { "@type": "Offer", price: "600", priceCurrency: "MXN" } } },
    { "@type": "ListItem", position: 3, item: { "@type": "Service", name: "Depilación Láser Piernas Veracruz", provider: { "@id": "https://mipielveracruz.com/#clinic" }, offers: { "@type": "Offer", price: "900", priceCurrency: "MXN" } } },
    { "@type": "ListItem", position: 4, item: { "@type": "Service", name: "Depilación Láser Bikini Veracruz", provider: { "@id": "https://mipielveracruz.com/#clinic" }, offers: { "@type": "Offer", price: "800", priceCurrency: "MXN" } } },
    { "@type": "ListItem", position: 5, item: { "@type": "Service", name: "Depilación Láser Abdomen Veracruz", provider: { "@id": "https://mipielveracruz.com/#clinic" }, offers: { "@type": "Offer", price: "700", priceCurrency: "MXN" } } },
    { "@type": "ListItem", position: 6, item: { "@type": "Service", name: "Depilación Láser Caballeros Veracruz", provider: { "@id": "https://mipielveracruz.com/#clinic" }, offers: { "@type": "Offer", price: "1000", priceCurrency: "MXN" } } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://mipielveracruz.com" },
    { "@type": "ListItem", position: 2, name: "Servicios de Depilación Láser", item: "https://mipielveracruz.com/servicios" },
  ],
};

export default function ServiciosPage() {
  return (
    <div style={{ background: "#070d14", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-primary/12 blur-[180px] pointer-events-none" />
        <div className="section-container relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.18em] mb-6 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/8">
            <Zap className="w-3.5 h-3.5" />
            Láser Diodo Grado Médico · Veracruz
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-5">
            Depilación Láser en{" "}
            <span style={{ background: "linear-gradient(125deg, #2596be, #56cfe1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Veracruz
            </span>
            <br />
            <span className="text-white/35 text-3xl md:text-4xl font-bold">para cada zona de tu cuerpo</span>
          </h1>

          <p className="text-white/55 text-xl mb-8 max-w-2xl mx-auto">
            Tecnología FDA-cleared adaptada para piel mexicana. Resultados permanentes desde la primera sesión — sin dolor, sin tiempo de recuperación.
          </p>

          {/* Social proof row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              <span className="text-white/50 text-sm">4.9 · 49 reseñas</span>
            </div>
            <div className="w-px h-4 bg-white/15 hidden sm:block" />
            <span className="text-white/50 text-sm">+5,000 pacientes en Veracruz</span>
            <div className="w-px h-4 bg-white/15 hidden sm:block" />
            <span className="text-white/50 text-sm">8 años de experiencia clínica</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/agendar"
              className="group inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-base px-9 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
              style={{ boxShadow: "0 0 40px rgba(37,150,190,0.4)" }}
            >
              Consulta gratis con Skin Analyzer
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#paquete"
              className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/65 hover:text-white hover:border-white/35 hover:bg-white/5 font-semibold text-base px-8 py-4 rounded-2xl transition-all duration-200"
            >
              🌿 Armar mi paquete
            </a>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16" style={{ background: "#070d14" }}>
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="text-primary text-xs font-bold uppercase tracking-[0.18em] mb-3">Zonas disponibles</div>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-3">
              Cada zona, un resultado permanente
            </h2>
            <p className="text-white/40 text-base max-w-xl mx-auto">
              Haz clic en cualquier zona para ver precios, sesiones y todo lo que necesitas saber.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <Link key={s.slug} href={s.href} className="group block">
                <div
                  className="relative h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
                  style={{
                    background: "#111a24",
                    boxShadow: "0 2px 20px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 0% 0%, ${s.tagColor}18 0%, transparent 65%)` }}
                  />
                  <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${s.tagColor}, ${s.tagColor}60)` }} />

                  <div className="p-6 relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ color: s.tagColor, background: `${s.tagColor}18`, border: `1px solid ${s.tagColor}35` }}
                      >
                        {s.tag}
                      </span>
                      <span className="text-2xl">{s.emoji}</span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-white mb-1">{s.name}</h3>
                    <p className="text-primary text-sm font-semibold mb-3">{s.headline}</p>
                    <p className="text-white/45 text-sm leading-relaxed mb-6">{s.description}</p>

                    <div className="flex items-end justify-between pt-4 border-t border-white/8">
                      <div>
                        <div className="font-display text-xl font-extrabold" style={{ color: s.tagColor }}>{s.price}</div>
                        <div className="text-white/30 text-xs mt-0.5">{s.sessions}</div>
                      </div>
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                        style={{ background: `${s.tagColor}22`, border: `1px solid ${s.tagColor}40` }}
                      >
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" style={{ color: s.tagColor }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Package Builder */}
      <div id="paquete">
        <PackageBuilder />
      </div>

      {/* Why us */}
      <section className="py-16" style={{ background: "#070d14" }}>
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="text-primary text-xs font-bold uppercase tracking-[0.18em] mb-3">¿Por qué MiPiel?</div>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-3">
              La clínica que Veracruz eligió
            </h2>
            <p className="text-white/40 text-base">
              8 años de resultados reales en piel mexicana.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-2xl"
                style={{ background: "#111a24", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #0e1e2e, #1a3a52, #0e1e2e)" }}>
        <div className="section-container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-4">
            ¿Lista para empezar?
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            Tu primera consulta con Skin Analyzer es completamente gratis. Sin compromiso, sin pago anticipado.
          </p>
          <Link
            href="/agendar"
            className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
            style={{ boxShadow: "0 0 35px rgba(37,150,190,0.4)" }}
          >
            Agendar mi consulta gratis — Sin compromiso
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-white/30 text-sm mt-4">Primera consulta con Skin Analyzer · Sin pago anticipado · 1 por persona</p>
        </div>
      </section>
    </div>
  );
}

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
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: "900px", height: "500px", background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37,150,190,.08) 0%, transparent 70%)" }}
        />
        <div className="section-container relative z-10 text-center max-w-4xl mx-auto">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] mb-6 px-3 py-1.5 rounded-full"
            style={{ color: "#2596be", border: "1px solid rgba(37,150,190,.2)", background: "rgba(37,150,190,.08)" }}
          >
            <Zap className="w-3.5 h-3.5" />
            Láser Diodo Grado Médico · Veracruz
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-black leading-tight tracking-tight mb-5" style={{ color: "#2B2B2B" }}>
            Depilación Láser en{" "}
            <span style={{ background: "linear-gradient(125deg, #2596be, #C8A96A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Veracruz
            </span>
            <br />
            <span className="text-3xl md:text-4xl font-bold" style={{ color: "#6F6F6F" }}>para cada zona de tu cuerpo</span>
          </h1>

          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: "#6F6F6F" }}>
            Tecnología FDA-cleared adaptada para piel mexicana. Resultados permanentes desde la primera sesión — sin dolor, sin tiempo de recuperación.
          </p>

          {/* Social proof row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              <span className="text-sm" style={{ color: "#6F6F6F" }}>4.9 · 49 reseñas</span>
            </div>
            <div className="w-px h-4 hidden sm:block" style={{ background: "#E7E3DC" }} />
            <span className="text-sm" style={{ color: "#6F6F6F" }}>+5,000 pacientes en Veracruz</span>
            <div className="w-px h-4 hidden sm:block" style={{ background: "#E7E3DC" }} />
            <span className="text-sm" style={{ color: "#6F6F6F" }}>8 años de experiencia clínica</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/agendar"
              className="group inline-flex items-center justify-center gap-2.5 text-white font-bold text-base px-9 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
              style={{ background: "#2596be", borderRadius: "18px", boxShadow: "0 0 40px rgba(37,150,190,.25)" }}
            >
              Consulta gratis con Skin Analyzer
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#paquete"
              className="inline-flex items-center justify-center gap-2 font-semibold text-base px-8 py-4 transition-all duration-200 hover:border-[#2596be] hover:text-[#2596be]"
              style={{ border: "1.5px solid #E7E3DC", color: "#6F6F6F", background: "white", borderRadius: "18px" }}
            >
              Armar mi paquete personalizado
            </a>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16" style={{ background: "#FAFAF8" }}>
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "#2596be" }}>Zonas disponibles</div>
            <h2 className="font-display text-3xl md:text-4xl font-black mb-3" style={{ color: "#2B2B2B" }}>
              Cada zona, un resultado permanente
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#6F6F6F" }}>
              Haz clic en cualquier zona para ver precios, sesiones y todo lo que necesitas saber.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <Link key={s.slug} href={s.href} className="group block">
                <div
                  className="relative h-full overflow-hidden transition-all duration-[250ms] ease-out hover:-translate-y-[6px] hover:shadow-[0_18px_45px_rgba(0,0,0,.08)]"
                  style={{
                    background: "white",
                    border: "1px solid #E7E3DC",
                    borderRadius: "22px",
                    boxShadow: "0 10px 35px rgba(0,0,0,.05)",
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 0% 0%, ${s.tagColor}08 0%, transparent 65%)` }}
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

                    <h3 className="font-display text-lg font-bold mb-1" style={{ color: "#2B2B2B" }}>{s.name}</h3>
                    <p className="text-sm font-semibold mb-3" style={{ color: s.tagColor }}>{s.headline}</p>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: "#6F6F6F" }}>{s.description}</p>

                    <div className="flex items-end justify-between pt-4" style={{ borderTop: "1px solid #E7E3DC" }}>
                      <div>
                        <div className="font-display text-xl font-extrabold" style={{ color: s.tagColor }}>{s.price}</div>
                        <div className="text-xs mt-0.5" style={{ color: "#9A9A9A" }}>{s.sessions}</div>
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
      <section className="py-16" style={{ background: "#F4F2EE" }}>
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "#2596be" }}>¿Por qué MiPiel?</div>
            <h2 className="font-display text-3xl md:text-4xl font-black mb-3" style={{ color: "#2B2B2B" }}>
              La clínica que Veracruz eligió
            </h2>
            <p className="text-base" style={{ color: "#6F6F6F" }}>
              8 años de resultados reales en piel mexicana.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6"
                style={{ background: "white", border: "1px solid #E7E3DC", borderRadius: "22px" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(37,150,190,.1)", border: "1px solid rgba(37,150,190,.2)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#2596be" }} />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: "#2B2B2B" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6F6F6F" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #2596be, #1e7a9e)" }}>
        <div className="section-container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-4">
            ¿Lista para empezar?
          </h2>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,.75)" }}>
            Tu primera consulta con Skin Analyzer es completamente gratis. Sin compromiso, sin pago anticipado.
          </p>
          <Link
            href="/agendar"
            className="inline-flex items-center gap-2.5 text-white font-bold px-10 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20"
            style={{ background: "rgba(255,255,255,.15)", border: "1.5px solid rgba(255,255,255,.4)", borderRadius: "18px" }}
          >
            Agendar mi consulta gratis — Sin compromiso
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm mt-4" style={{ color: "rgba(255,255,255,.5)" }}>Primera consulta con Skin Analyzer · Sin pago anticipado · 1 por persona</p>
        </div>
      </section>
    </div>
  );
}

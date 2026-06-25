import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Star, MessageCircle, Clock, Shield, Zap } from "lucide-react";

const WA_NUMBER = "522299330014";

const zones = {
  axilas: {
    title: "Depilación Láser Axilas",
    slug: "axilas",
    headline: "Depilación Láser Axilas en Veracruz",
    subheadline: "Sin vello para siempre. Sin irritación. Sin manchas.",
    price: 600,
    sessions: "6–8",
    duration: "15 min",
    zone: "Axilas",
    waMsg: "Hola, quiero información sobre depilación láser en axilas. ¿Cuándo tienen disponibilidad?",
    seoDesc: "Depilación láser axilas Veracruz desde $600 MXN. Tecnología diodo médica, sin irritación, resultados permanentes. Agenda tu consulta gratis con Skin Analyzer.",
    keywords: ["depilación láser axilas Veracruz", "laser axilas boca del río", "precio depilación axilas Veracruz", "quitar vello axilas definitivo Veracruz"],
    benefits: [
      "Sin irritación ni foliculitis post-afeitado",
      "Reduce manchas causadas por el roce",
      "Sesiones de solo 15 minutos",
      "Resultados visibles desde la 3ª sesión",
      "Sin tiempo de recuperación",
    ],
    faq: [
      { q: "¿Cuánto cuesta la depilación láser de axilas en Veracruz?", a: "Desde $600 MXN por sesión. Ofrecemos paquetes de 6 sesiones con descuento. El precio final se confirma en tu consulta gratuita con Skin Analyzer." },
      { q: "¿Cuántas sesiones necesito para eliminar el vello de axilas?", a: "La mayoría de nuestras pacientes logran resultados permanentes en 6 a 8 sesiones, con citas cada 4–6 semanas. Los resultados visibles aparecen desde la 2ª o 3ª sesión." },
      { q: "¿Duele la depilación láser en axilas?", a: "El láser diodo tiene sistema de enfriamiento integrado. La sensación es mínima — la mayoría lo describe como una liga suave. Las axilas son una zona de alta tolerancia." },
      { q: "¿Puedo hacerme láser en axilas en verano en Veracruz?", a: "Sí. Solo debes evitar exposición solar directa en la zona 2 semanas antes y después de cada sesión, y usar ropa holgada el día del procedimiento." },
    ],
  },
  "bikini-brasileno": {
    title: "Depilación Láser Bikini Brasileño",
    slug: "bikini-brasileno",
    headline: "Depilación Láser Bikini Brasileño Veracruz",
    subheadline: "Libertad total. Zona íntima sin vello, sin incomodidad.",
    price: 1000,
    sessions: "6–8",
    duration: "20–30 min",
    zone: "Bikini brasileño",
    waMsg: "Hola, me interesa depilación láser en bikini brasileño. ¿Pueden darme información?",
    seoDesc: "Depilación láser bikini brasileño Veracruz desde $1,000 MXN. Resultados permanentes, privacidad total, láser diodo médico. Primera consulta gratis.",
    keywords: ["depilación láser bikini brasileño Veracruz", "laser zona íntima Veracruz", "depilación definitiva bikini boca del río", "laser pubis Veracruz precio"],
    benefits: [
      "Eliminación permanente del vello en zona íntima",
      "Sin irritación, hongos ni foliculitis",
      "Procedimiento completamente privado y profesional",
      "Reduce hiperpigmentación por depilación mecánica",
      "Resultados desde la 2ª sesión",
    ],
    faq: [
      { q: "¿Cuánto cuesta la depilación láser bikini brasileño en Veracruz?", a: "Desde $1,000 MXN por sesión. Los paquetes de 6 sesiones tienen un descuento de hasta el 20%. El precio exacto se confirma en tu evaluación gratuita." },
      { q: "¿El procedimiento es seguro en zona íntima?", a: "Completamente. Nuestro láser diodo está calibrado específicamente para piel sensible. El ambiente es privado, profesional y libre de juicios." },
      { q: "¿Qué diferencia hay entre bikini clásico y brasileño?", a: "El bikini clásico retira solo el vello que sobresale del traje de baño. El brasileño incluye toda la zona púbica, ingles y periné. El integral cubre todo incluyendo área anal." },
      { q: "¿Cuánto tiempo dura la sesión?", a: "Entre 20 y 30 minutos para el bikini brasileño completo. Puedes retomar tus actividades de inmediato." },
    ],
  },
  piernas: {
    title: "Depilación Láser Piernas",
    slug: "piernas",
    headline: "Depilación Láser Piernas Veracruz",
    subheadline: "Piernas lisas todo el año. Sin rastrillos. Sin cera.",
    price: 1200,
    sessions: "6–8",
    duration: "45–60 min",
    zone: "Pierna completa",
    waMsg: "Hola, quiero información sobre depilación láser en piernas completas. ¿Tienen disponibilidad?",
    seoDesc: "Depilación láser piernas Veracruz desde $1,200 MXN. Pierna completa o media pierna. Tecnología diodo FDA, resultados permanentes. Consulta gratis.",
    keywords: ["depilación láser piernas Veracruz", "laser piernas boca del río precio", "depilación definitiva piernas Veracruz", "laser media pierna Veracruz"],
    benefits: [
      "Elimina vello en toda la pierna de forma permanente",
      "Reduce vellos encarnados y foliculitis",
      "Piel más suave y uniforme desde la 1ª sesión",
      "Ahorra $600+ al año en cera y rastrillos",
      "Ideal para el calor y humedad de Veracruz",
    ],
    faq: [
      { q: "¿Cuánto cuesta la depilación láser de piernas en Veracruz?", a: "Pierna completa desde $1,200 MXN/sesión, media pierna desde $900 MXN/sesión. Los paquetes de 6 sesiones incluyen descuento. Primera consulta siempre gratis." },
      { q: "¿Cuántas sesiones necesito para depilación permanente en piernas?", a: "6 a 8 sesiones espaciadas cada 6–8 semanas. Las piernas tienen ciclos de crecimiento de vello más largos que otras zonas, por eso el intervalo entre citas es mayor." },
      { q: "¿El láser funciona en pieles morenas o bronceadas típicas de Veracruz?", a: "Sí. Nuestro láser diodo está calibrado para fototipos III, IV y V (piel morena y bronceada), que son los más comunes en Veracruz. Es seguro y eficaz en piel oscura." },
      { q: "¿Qué incluye media pierna vs pierna completa?", a: "Media pierna cubre de rodilla a tobillo. Pierna completa incluye de muslo a tobillo. Si tienes vello denso en muslos, el paquete completo te dará mejores resultados generales." },
    ],
  },
  facial: {
    title: "Depilación Láser Facial",
    slug: "facial",
    headline: "Depilación Láser Facial Veracruz",
    subheadline: "Rostro limpio. Sin bello, sin regresos, sin manchas.",
    price: 900,
    sessions: "6–10",
    duration: "20–30 min",
    zone: "Rostro completo",
    waMsg: "Hola, me interesa depilación láser facial. ¿Pueden orientarme sobre el tratamiento?",
    seoDesc: "Depilación láser facial Veracruz desde $600 MXN (labio superior). Elimina vello de labio, mentón, mejillas y rostro completo. Consulta gratis con Skin Analyzer.",
    keywords: ["depilación láser facial Veracruz", "laser labio superior Veracruz", "depilación bigote láser Veracruz", "laser mentón Veracruz precio"],
    benefits: [
      "Elimina vello de labio, mentón, mejillas y cuello",
      "Reduce manchas oscuras causadas por depilación mecánica",
      "Sin irritación post-tratamiento",
      "Compatibilidad total con maquillaje (desde las 24h)",
      "Resultados visibles desde la 2ª sesión",
    ],
    faq: [
      { q: "¿Cuánto cuesta la depilación láser facial en Veracruz?", a: "Labio superior desde $500 MXN, mentón desde $500 MXN, cara completa desde $900 MXN por sesión. Los paquetes de 6 sesiones tienen descuento incluido." },
      { q: "¿Cuántas sesiones necesito para el bigote o el labio superior?", a: "6 a 10 sesiones para la mayoría de las pacientes. El área facial puede requerir sesiones adicionales en casos de vello hormonal o PCOS." },
      { q: "¿El láser mancha la cara o deja marcas?", a: "No. Nuestro láser diodo no produce marcas ni manchas cuando se siguen las indicaciones de protección solar. De hecho, reduce la hiperpigmentación causada por el rasurado frecuente." },
      { q: "¿Puedo maquillarme después de la sesión?", a: "Sí, desde las 24 horas posteriores. El día de la sesión se recomienda llegar sin maquillaje y evitar aplicarlo durante las primeras horas post-tratamiento." },
    ],
  },
  espalda: {
    title: "Depilación Láser Espalda",
    slug: "espalda",
    headline: "Depilación Láser Espalda Veracruz",
    subheadline: "Especial caballeros. Espalda despejada para siempre.",
    price: 1500,
    sessions: "6–8",
    duration: "45–60 min",
    zone: "Espalda completa",
    waMsg: "Hola, me interesa la depilación láser de espalda para caballeros. ¿Tienen disponibilidad?",
    seoDesc: "Depilación láser espalda caballeros Veracruz desde $1,500 MXN. Tratamiento masculino, resultados permanentes, tecnología diodo FDA. Primera consulta gratis.",
    keywords: ["depilación láser espalda hombres Veracruz", "laser espalda caballeros Veracruz", "depilación masculina Veracruz", "laser espalda precio Veracruz"],
    benefits: [
      "Cobertura total de espalda alta y baja",
      "Tratamiento diseñado para vello masculino grueso",
      "Reduce vellos encarnados post-afeitado",
      "Mejora la transpiración y comodidad en el calor de Veracruz",
      "Sesiones rápidas que se adaptan a tu horario",
    ],
    faq: [
      { q: "¿Cuánto cuesta la depilación láser de espalda para hombres en Veracruz?", a: "Desde $1,500 MXN por sesión para espalda completa. Pecho desde $1,000 MXN. Los paquetes de 6 sesiones incluyen descuento de hasta 20%." },
      { q: "¿El láser funciona para vello masculino oscuro y grueso?", a: "Sí, es precisamente el perfil más efectivo. El láser diodo actúa sobre la melanina del folículo piloso — el vello grueso y oscuro absorbe mejor la energía, dando mejores resultados." },
      { q: "¿Cuánto tiempo dura la sesión de espalda completa?", a: "Entre 45 y 60 minutos. La espalda es una zona amplia, pero con nuestro equipo de última generación el proceso es ágil y cómodo." },
      { q: "¿Necesito preparación especial para la depilación de espalda?", a: "Afeitar la zona 24 horas antes de la sesión (no depilar con cera). Evitar exposición solar intensa 2 semanas previas. Llegar con piel limpia sin bronceador o aceites." },
    ],
  },
  abdomen: {
    title: "Depilación Láser Abdomen",
    slug: "abdomen",
    headline: "Depilación Láser Abdomen Veracruz",
    subheadline: "Abdomen liso. Ideal antes de temporada de playa.",
    price: 700,
    sessions: "6–8",
    duration: "20 min",
    zone: "Abdomen",
    waMsg: "Hola, me interesa depilación láser en abdomen. ¿Pueden darme información?",
    seoDesc: "Depilación láser abdomen Veracruz desde $700 MXN. Elimina vello umbilical y abdominal de forma permanente. Primera consulta gratis en Boca del Río.",
    keywords: ["depilación láser abdomen Veracruz", "laser ombligo Veracruz", "depilación abdomen precio Veracruz", "laser línea umbilical Veracruz"],
    benefits: [
      "Elimina la línea umbilical (línea alba) sin rastros",
      "Zona de acceso rápido — solo 20 min por sesión",
      "Sin tiempo de recuperación",
      "Resultados visibles desde la 2ª sesión",
      "Ideal combinado con bikini en paquetes",
    ],
    faq: [
      { q: "¿Cuánto cuesta la depilación láser de abdomen en Veracruz?", a: "Desde $700 MXN por sesión. Se puede combinar con bikini o media pierna en paquetes con descuento." },
      { q: "¿Incluye la línea umbilical (línea alba)?", a: "Sí, el tratamiento de abdomen cubre toda el área abdominal incluyendo la línea de vello que va del ombligo hacia abajo." },
      { q: "¿Cuánto tarda la sesión?", a: "Aproximadamente 20 minutos. Una de las zonas más rápidas. Puedes volver a tus actividades de inmediato." },
      { q: "¿Cuándo es el mejor momento para empezar antes de la temporada de playa?", a: "Idealmente 6 meses antes de la playa. En Veracruz la temporada alta es junio–agosto, así que iniciar en enero–febrero garantiza resultados óptimos para el verano." },
    ],
  },
};

type ZoneKey = keyof typeof zones;

export async function generateStaticParams() {
  return Object.keys(zones).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const zone = zones[slug as ZoneKey];
  if (!zone) return {};

  return {
    title: `${zone.title} — Desde $${zone.price} MXN | Mi Piel Veracruz`,
    description: zone.seoDesc,
    keywords: zone.keywords,
    alternates: { canonical: `https://mipielveracruz.com/servicios/${slug}` },
    openGraph: {
      title: `${zone.headline} — Desde $${zone.price} MXN`,
      description: zone.seoDesc,
      url: `https://mipielveracruz.com/servicios/${slug}`,
    },
  };
}

export default async function ZonePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const zone = zones[slug as ZoneKey];
  if (!zone) notFound();

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(zone.waMsg)}`;
  const msiPrice = Math.ceil(zone.price / 12);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: zone.headline,
    description: zone.seoDesc,
    provider: { "@id": "https://mipielveracruz.com/#clinic" },
    areaServed: [
      { "@type": "City", name: "Veracruz" },
      { "@type": "City", name: "Boca del Río" },
    ],
    offers: {
      "@type": "Offer",
      price: zone.price,
      priceCurrency: "MXN",
      availability: "https://schema.org/InStock",
      url: `https://mipielveracruz.com/servicios/${slug}`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: zone.faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://mipielveracruz.com" },
      { "@type": "ListItem", position: 2, name: "Servicios", item: "https://mipielveracruz.com/servicios" },
      { "@type": "ListItem", position: 3, name: zone.title, item: `https://mipielveracruz.com/servicios/${slug}` },
    ],
  };

  return (
    <div style={{ background: "#070d14", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary/12 blur-[180px] pointer-events-none" />
        <div className="section-container relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/35 text-sm mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/servicios" className="hover:text-white/60 transition-colors">Servicios</Link>
            <span>/</span>
            <span className="text-white/60">{zone.title}</span>
          </nav>

          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.18em] mb-6 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/8">
              <Zap className="w-3.5 h-3.5" />
              Láser Diodo Grado Médico
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4">
              {zone.headline}
            </h1>
            <p className="text-white/55 text-xl leading-relaxed mb-10">
              {zone.subheadline}
            </p>

            {/* Quick facts — GEO block */}
            <div className="grid grid-cols-3 gap-4 mb-10 p-5 rounded-2xl border border-white/8 bg-white/3">
              <div className="text-center">
                <div className="font-display text-2xl font-black text-white">${zone.price}</div>
                <div className="text-white/40 text-xs mt-0.5">MXN / sesión</div>
              </div>
              <div className="text-center border-x border-white/8">
                <div className="font-display text-2xl font-black text-white">{zone.sessions}</div>
                <div className="text-white/40 text-xs mt-0.5">Sesiones</div>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl font-black text-white">{zone.duration}</div>
                <div className="text-white/40 text-xs mt-0.5">Por sesión</div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/agendar"
                className="group inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ boxShadow: "0 0 35px rgba(37,150,190,0.4)" }}
              >
                Consulta gratis — Skin Analyzer
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/12 text-white/65 hover:text-white hover:border-white/30 hover:bg-white/5 font-semibold text-base px-7 py-4 rounded-2xl transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5 text-[#22c55e]" />
                Preguntar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16" style={{ background: "#0a1520" }}>
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-primary text-xs font-bold uppercase tracking-[0.18em] mb-4">Beneficios</div>
              <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-6">
                Por qué elegir el láser diodo para{" "}
                <span style={{ color: "#56cfe1" }}>{zone.zone.toLowerCase()}</span>
              </h2>
              <ul className="space-y-4">
                {zone.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-white/65 leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price card */}
            <div className="rounded-3xl overflow-hidden" style={{ background: "#111a24", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="h-1" style={{ background: "linear-gradient(90deg, #2596be, #56cfe1)" }} />
              <div className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-white/40 text-xs ml-1">4.9 · 49 reseñas</span>
                </div>

                <div className="mb-1">
                  <span className="font-display text-5xl font-black text-white">${zone.price}</span>
                  <span className="text-white/40 text-sm ml-2">MXN / sesión</span>
                </div>
                <p className="text-white/35 text-sm mb-2">
                  o desde <span className="text-primary font-semibold">${msiPrice}/mes</span> a 12 MSI con MercadoPago
                </p>
                <div className="text-white/30 text-xs mb-8">{zone.sessions} sesiones · resultados permanentes</div>

                <div className="space-y-3 mb-8">
                  {[
                    { icon: Shield, text: "Láser diodo FDA-cleared" },
                    { icon: Clock, text: `Sesiones de solo ${zone.duration}` },
                    { icon: CheckCircle2, text: "Primera consulta GRATIS" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-white/55 text-sm">
                      <Icon className="w-4 h-4 text-primary/70 shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>

                <Link
                  href="/agendar"
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-2xl transition-all duration-200"
                >
                  Agenda mi consulta gratis
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-white/25 text-xs text-center mt-3">Sin compromiso · Sin pago anticipado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16" style={{ background: "#070d14" }}>
        <div className="section-container max-w-3xl">
          <div className="text-primary text-xs font-bold uppercase tracking-[0.18em] mb-3 text-center">Preguntas frecuentes</div>
          <h2 className="font-display text-3xl md:text-4xl font-black text-white text-center mb-12">
            Todo lo que necesitas saber
          </h2>

          <div className="space-y-4">
            {zone.faq.map(({ q, a }) => (
              <div
                key={q}
                className="rounded-2xl p-6"
                style={{ background: "#0f1c2a", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <h3 className="font-semibold text-white mb-3">{q}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{a}</p>
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
            Tu primera consulta con Skin Analyzer es completamente gratis. Sin compromiso, sin presión.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/agendar"
              className="inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-bold px-9 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
              style={{ boxShadow: "0 0 35px rgba(37,150,190,0.4)" }}
            >
              Agendar consulta gratis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 border border-white/15 text-white/65 hover:text-white hover:border-white/35 hover:bg-white/5 font-semibold px-8 py-4 rounded-2xl transition-all duration-200"
            >
              <MessageCircle className="w-5 h-5 text-[#22c55e]" />
              WhatsApp directo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

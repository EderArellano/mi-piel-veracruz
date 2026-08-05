import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { HeroSection } from "@/components/marketing/hero-section";
import { SocialProofBar } from "@/components/marketing/social-proof-bar";
import { ProblemsSection } from "@/components/marketing/problems-section";
import { BeforeAfterSection } from "@/components/marketing/before-after-section";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { ServicesSection } from "@/components/marketing/services-section";
import { StatsSection } from "@/components/marketing/stats-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaSection } from "@/components/marketing/cta-section";

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": "https://mipielveracruz.com/#business",
  name: "Mi Piel Centro Dermocosmético",
  alternateName: ["Mi Piel Veracruz", "Clínica Mi Piel Boca del Río", "Mi Piel Depilación Láser Veracruz"],
  description:
    "Clínica de depilación láser y tratamientos estéticos en Boca del Río, Veracruz. Láser Diodo grado médico, Hidrofacial, Celluma LED y Skin Analyzer gratis. Más de 5,000 pacientes tratados.",
  url: "https://mipielveracruz.com",
  telephone: "+52-229-933-0014",
  email: "contacto@mipielveracruz.com",
  image: "https://mipielveracruz.com/opengraph-image",
  priceRange: "$$",
  currenciesAccepted: "MXN",
  paymentAccepted: "Cash, Credit Card, Debit Card, Bank Transfer",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Ruiz Cortines",
    addressLocality: "Boca del Río",
    addressRegion: "Veracruz",
    postalCode: "94290",
    addressCountry: "MX",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 19.108,
    longitude: -96.132,
  },
  areaServed: [
    { "@type": "City", name: "Boca del Río", containedInPlace: { "@type": "State", name: "Veracruz" } },
    { "@type": "City", name: "Veracruz", containedInPlace: { "@type": "State", name: "Veracruz" } },
    { "@type": "City", name: "Medellín", containedInPlace: { "@type": "State", name: "Veracruz" } },
    { "@type": "City", name: "Alvarado", containedInPlace: { "@type": "State", name: "Veracruz" } },
  ],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "15:00" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "49",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Valentina R.", addressLocality: "Boca del Río" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "Después de años de cera, finalmente tomé la decisión de hacerme láser aquí. Los resultados son increíbles desde la primera sesión. El personal es muy profesional.",
      name: "Depilación Láser Piernas Veracruz",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Daniela M.", addressLocality: "Veracruz" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "Las chicas son muy amables y me explicaron todo el proceso. Ya van 4 sesiones y mi piel está perfecta. ¡Lo recomiendo!",
      name: "Depilación Láser Axilas y Bikini Veracruz",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Andrea K.", addressLocality: "Boca del Río" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "Tengo piel morena y siempre tuve miedo del láser. Aquí me explicaron que su tecnología es apta para mi tipo de piel. El resultado es excelente, nada de manchas.",
      name: "Depilación Láser Piel Morena Veracruz",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios Dermocosmética Mi Piel Veracruz",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Depilación Láser Diodo Veracruz", description: "Depilación láser grado médico para todo tipo de piel, desde $500 MXN/sesión" }, price: "500", priceCurrency: "MXN" },
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Hidrofacial Boca del Río", description: "Limpieza facial profunda con hidratación inmediata, desde $800 MXN" }, price: "800", priceCurrency: "MXN" },
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Fototerapia Celluma LED Veracruz", description: "Tratamiento con luz LED para colágeno y acné, desde $600 MXN" }, price: "600", priceCurrency: "MXN" },
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Skin Analyzer — Análisis de Piel Gratis" }, price: "0", priceCurrency: "MXN" },
    ],
  },
  sameAs: [
    "https://www.instagram.com/mipielveracruz",
    "https://www.facebook.com/mipielveracruz",
    "https://wa.me/522299330014",
  ],
};

export const metadata: Metadata = {
  title: "Depilación Láser en Veracruz y Boca del Río | Mi Piel Centro Dermocosmético",
  description:
    "Clínica #1 de depilación láser en Veracruz y Boca del Río. Láser Diodo grado médico, Hidrofacial, Celluma LED y Skin Analyzer gratis. +5,000 pacientes satisfechos. Precios desde $500 MXN. Primera consulta sin costo.",
  keywords: [
    // Short-tail
    "depilación láser Veracruz",
    "depilación láser Boca del Río",
    "clínica estética Veracruz",
    "hidrofacial Veracruz",
    "láser diodo Veracruz",
    "clínica dermocosmética Veracruz",
    "skin care Veracruz",
    "depilación definitiva Veracruz",
    // Mid-tail
    "depilación láser axilas Veracruz",
    "depilación láser piernas Veracruz",
    "depilación láser bikini Veracruz",
    "depilación láser facial Veracruz",
    "depilación láser espalda Veracruz",
    "hidrofacial Boca del Río",
    "tratamientos faciales Veracruz",
    "precio depilación láser Veracruz",
    "mejor clínica estética Veracruz",
    "Celluma LED Veracruz",
    "fototerapia LED Veracruz",
    "análisis de piel Veracruz",
    "depilación láser hombres Veracruz",
    "skin analyzer Veracruz",
    "rejuvenecimiento facial Veracruz",
    "tratamiento manchas piel Veracruz",
    "paquetes depilación láser Veracruz",
    "clínica láser Boca del Río",
    "tratamiento acné Veracruz",
    "consulta dermatológica Veracruz",
    "peeling facial Veracruz",
    "médico estético Boca del Río",
    // Long-tail
    "cuánto cuesta la depilación láser en Veracruz",
    "depilación láser para todo el cuerpo Veracruz precio",
    "mejores clínicas de depilación láser Boca del Río",
    "depilación láser definitiva Boca del Río Veracruz",
    "primera consulta gratis depilación láser Veracruz",
    "paquetes depilación láser con descuento Veracruz",
    "cuántas sesiones de láser necesito Veracruz",
    "depilación láser diodo grado médico Veracruz",
    "depilación láser piel morena Veracruz",
    "skin analyzer análisis de piel gratis Veracruz",
    "análisis piel inteligencia artificial Veracruz",
    "limpieza facial profunda Boca del Río",
    "fototerapia Celluma precio Veracruz",
    "depilación láser bikini brasileño precio Veracruz",
    "cuidado de piel grasa Veracruz",
    "reducción vello permanente Boca del Río",
    "clínica estética confiable Boca del Río",
    "depilación láser cuerpo completo precio Veracruz",
    "tratamiento antiedad facial Veracruz",
    "spa médico dermocosmético Veracruz",
  ],
  alternates: { canonical: "https://mipielveracruz.com" },
  openGraph: {
    title: "Depilación Láser en Veracruz y Boca del Río | Mi Piel Centro Dermocosmético",
    description:
      "+5,000 pacientes. Tecnología Láser Diodo grado médico. Hidrofacial, Celluma LED. Primera consulta con Skin Analyzer gratis. Resultados desde la primera sesión.",
    url: "https://mipielveracruz.com",
    type: "website",
    siteName: "Mi Piel Centro Dermocosmético",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: "Depilación Láser Veracruz | Mi Piel Centro Dermocosmético",
    description: "+5,000 pacientes. Skin Analyzer gratis. Desde $500 MXN/sesión.",
  },
};

const HOW_TO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cómo funciona la depilación láser en Mi Piel Veracruz",
  description: "Proceso paso a paso para obtener depilación láser permanente en nuestra clínica de Boca del Río, Veracruz. Desde la consulta gratis hasta los resultados definitivos.",
  totalTime: "P6M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "MXN", value: "500" },
  supply: [{ "@type": "HowToSupply", name: "Piel limpia y sin protector solar" }],
  tool: [{ "@type": "HowToTool", name: "Láser Diodo Grado Médico" }],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Agenda tu consulta gratis",
      text: "Reserva tu valoración inicial gratuita en línea o por WhatsApp. Te atendemos en menos de 24 horas en nuestra clínica en Boca del Río, Veracruz.",
      url: "https://mipielveracruz.com/agendar",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Análisis de piel con Skin Analyzer",
      text: "Una especialista analiza tu tipo de piel, fototipo y características del vello para diseñar tu plan de tratamiento 100% personalizado con tecnología de imágenes clínicas.",
      url: "https://mipielveracruz.com/analisis",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Sesiones de depilación láser Diodo",
      text: "Realizamos tus sesiones con láser Diodo grado médico, el estándar de oro para piel morena veracruzana. Cada sesión dura 15–60 minutos según la zona tratada.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Resultados permanentes",
      text: "Tras 6–8 sesiones espaciadas cada 4–8 semanas, lograrás reducción permanente del 85–95% del vello. Seguimiento post-tratamiento incluido sin costo adicional.",
    },
  ],
};

async function getLiveStats() {
  try {
    const [, clientCount] = await Promise.all([
      prisma.appointment.count({ where: { status: "COMPLETED" } }),
      prisma.user.count({ where: { role: "CLIENT", isActive: true } }),
    ]);
    return {
      patients: Math.max(5000, clientCount),
      yearsOpen: new Date().getFullYear() - 2016,
    };
  } catch {
    return undefined;
  }
}

export default async function HomePage() {
  const liveStats = await getLiveStats();

  return (
    <>
      {/* LocalBusiness + MedicalBusiness JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
      />
      {/* HowTo schema for "cómo funciona el láser" featured snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOW_TO_SCHEMA) }}
      />
      <HeroSection />
      <SocialProofBar />
      <ProblemsSection />
      <BeforeAfterSection />
      <HowItWorksSection />
      <ServicesSection />
      <StatsSection live={liveStats} />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}

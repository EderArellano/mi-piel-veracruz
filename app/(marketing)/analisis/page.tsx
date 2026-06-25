import type { Metadata } from "next";
import { SkinAnalyzerClient } from "@/components/marketing/skin-analyzer-client";

export const metadata: Metadata = {
  title: "Skin Analyzer Gratis Veracruz — Análisis de Piel con IA | Mi Piel",
  description:
    "Analiza tu piel gratis con inteligencia artificial. Descubre tu tipo de piel, manchas, poros y tratamientos recomendados. Consulta presencial gratis en Boca del Río, Veracruz.",
  keywords: [
    "skin analyzer Veracruz",
    "análisis de piel gratis Veracruz",
    "diagnóstico piel IA Veracruz",
    "análisis facial gratis Veracruz",
    "tipo de piel análisis Veracruz",
  ],
  alternates: { canonical: "https://mipielveracruz.com/analisis" },
  openGraph: {
    title: "Skin Analyzer Gratis — Análisis de Piel con IA | Mi Piel Veracruz",
    description: "Sube una foto y obtén tu análisis de piel personalizado en segundos. Gratis, sin registro, sin compromiso.",
    url: "https://mipielveracruz.com/analisis",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Skin Analyzer — MiPiel Veracruz",
  description: "Herramienta gratuita de análisis de piel con inteligencia artificial para pacientes en Veracruz.",
  url: "https://mipielveracruz.com/analisis",
  applicationCategory: "HealthApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "MXN" },
  provider: { "@id": "https://mipielveracruz.com/#clinic" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://mipielveracruz.com" },
    { "@type": "ListItem", position: 2, name: "Skin Analyzer", item: "https://mipielveracruz.com/analisis" },
  ],
};

export default function AnalisisPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SkinAnalyzerClient />
    </>
  );
}

import type { Metadata } from "next";
import { NosotrosContent } from "@/components/marketing/nosotros-content";

export const metadata: Metadata = {
  title: "Quiénes Somos | Clínica Dermocosmética en Veracruz — Mi Piel",
  description:
    "Mi Piel Centro Dermocosmético: 8 años de experiencia en depilación láser, hidrofacial y cuidado de piel en Veracruz y Boca del Río. Tecnología FDA-cleared, equipo certificado y más de 5,000 pacientes atendidas.",
  keywords: [
    "clínica dermocosmética Veracruz",
    "clínica depilación láser Veracruz historia",
    "especialistas depilación láser Boca del Río",
    "tecnología FDA depilación láser Veracruz",
    "quiénes somos Mi Piel Veracruz",
  ],
  alternates: { canonical: "https://mipielveracruz.com/nosotros" },
  openGraph: {
    title: "Quiénes Somos — Mi Piel Centro Dermocosmético Veracruz",
    description: "8 años, 5,000+ pacientes, equipo certificado. La clínica dermocosmética que Veracruz necesitaba.",
    url: "https://mipielveracruz.com/nosotros",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "@id": "https://mipielveracruz.com/#clinic",
  name: "Mi Piel Centro Dermocosmético",
  description: "Clínica de depilación láser, hidrofacial y análisis de piel en Veracruz y Boca del Río",
  url: "https://mipielveracruz.com",
  foundingDate: "2016",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 5 },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. R. Flores Magón & Alacio Pérez",
    addressLocality: "Veracruz",
    addressRegion: "Veracruz",
    postalCode: "91700",
    addressCountry: "MX",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "49",
    bestRating: "5",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://mipielveracruz.com" },
    { "@type": "ListItem", position: 2, name: "Quiénes Somos", item: "https://mipielveracruz.com/nosotros" },
  ],
};

export default function NosotrosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <NosotrosContent />
    </>
  );
}

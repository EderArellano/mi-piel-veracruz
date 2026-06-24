import type { Metadata } from "next";
import { ContactoContent } from "@/components/marketing/contacto-content";

export const metadata: Metadata = {
  title: "Contacto | Depilación Láser Veracruz — Mi Piel Centro Dermocosmético",
  description:
    "Contacta a Mi Piel Centro Dermocosmético en Veracruz. WhatsApp, teléfono o correo. Primera consulta con Skin Analyzer gratis. Respondemos en menos de 24 horas.",
  keywords: [
    "contacto clínica depilación láser Veracruz",
    "teléfono depilación láser Veracruz",
    "WhatsApp clínica estética Veracruz",
    "cita depilación láser Boca del Río",
    "dirección Mi Piel Veracruz",
  ],
  alternates: { canonical: "https://mipielveracruz.com/contacto" },
  openGraph: {
    title: "Contacto — Mi Piel Depilación Láser Veracruz",
    description: "Primera consulta gratis. WhatsApp, teléfono o agenda en línea. Respondemos en 24 h.",
    url: "https://mipielveracruz.com/contacto",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://mipielveracruz.com/#clinic",
  name: "Mi Piel Centro Dermocosmético",
  telephone: "+52-229-933-0014",
  email: "contacto@mipielveracruz.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. R. Flores Magón & Alacio Pérez",
    addressLocality: "Veracruz",
    addressRegion: "Veracruz",
    postalCode: "91700",
    addressCountry: "MX",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "15:00" },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://mipielveracruz.com" },
    { "@type": "ListItem", position: 2, name: "Contacto", item: "https://mipielveracruz.com/contacto" },
  ],
};

export default function ContactoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ContactoContent />
    </>
  );
}

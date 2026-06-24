import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Zap, Star, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Depilación Láser en Veracruz — Servicios y Zonas | Mi Piel",
  description:
    "Depilación láser en Veracruz y Boca del Río: facial, axilas, piernas, bikini y cuerpo completo. Láser Diodo grado médico. Apta para todo tipo de piel. Primera consulta gratis.",
  keywords: [
    "depilación láser Veracruz zonas",
    "depilación láser axilas Veracruz",
    "depilación láser piernas Veracruz",
    "depilación láser bikini Veracruz",
    "depilación láser facial Veracruz",
    "depilación láser caballeros Veracruz",
    "depilación láser cuerpo completo Boca del Río",
  ],
  alternates: { canonical: "https://mipielveracruz.com/servicios" },
  openGraph: {
    title: "Depilación Láser en Veracruz — Todas las Zonas | Mi Piel",
    description: "Facial, axilas, piernas, bikini y cuerpo completo. Láser Diodo grado médico en Veracruz.",
    url: "https://mipielveracruz.com/servicios",
  },
};

const services = [
  {
    name: "Depilación Facial",
    slug: "facial",
    description: "Labio superior, mentón, patillas, cejas y frente. Resultados precisos en zonas delicadas.",
    sessions: "6–8 sesiones",
    price: "Desde $500 MXN",
    areas: ["Labio superior", "Mentón", "Patillas", "Cejas", "Frente"],
  },
  {
    name: "Axilas",
    slug: "axilas",
    description: "Olvídate de la rasuradora. Piel suave y sin manchas todo el año.",
    sessions: "6–8 sesiones",
    price: "Desde $600 MXN",
    areas: ["Axilas completas"],
  },
  {
    name: "Piernas Completas",
    slug: "piernas",
    description: "Media pierna, pierna completa o muslos. Cobertura total con resultados permanentes.",
    sessions: "8–10 sesiones",
    price: "Desde $1,200 MXN",
    areas: ["Media pierna", "Pierna completa", "Muslos"],
  },
  {
    name: "Bikini y Línea de Bikini",
    slug: "bikini",
    description: "Bikini clásico, brasileño o integral. Total discreción y comodidad.",
    sessions: "8–10 sesiones",
    price: "Desde $800 MXN",
    areas: ["Línea de bikini", "Bikini clásico", "Bikini brasileño", "Bikini integral"],
  },
  {
    name: "Cuerpo Completo",
    slug: "cuerpo-completo",
    description: "El paquete más completo. Ahorra hasta un 40% vs. contratar zonas por separado.",
    sessions: "8–10 sesiones",
    price: "Desde $4,500 MXN",
    areas: ["Cara", "Axilas", "Brazos", "Abdomen", "Piernas", "Bikini"],
  },
  {
    name: "Caballeros",
    slug: "hombres",
    description: "Espalda, hombros, pecho, barba y más. Sin incomodidad, con resultados duraderos.",
    sessions: "8–12 sesiones",
    price: "Desde $800 MXN",
    areas: ["Espalda", "Hombros", "Pecho", "Barba", "Cuello"],
  },
];

const benefits = [
  "Tecnología láser Diodo de última generación",
  "Especialistas certificadas",
  "Apta para todo tipo de piel",
  "Sin dolor — con sistema de enfriamiento integrado",
  "Resultados desde la primera sesión",
  "Instalaciones clínicas certificadas",
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Servicios de Depilación Láser en Veracruz",
  url: "https://mipielveracruz.com/servicios",
  itemListElement: [
    { "@type": "Service", position: 1, name: "Depilación Láser Facial Veracruz", provider: { "@id": "https://mipielveracruz.com/#clinic" }, areaServed: "Veracruz, México", offers: { "@type": "Offer", price: "500", priceCurrency: "MXN" } },
    { "@type": "Service", position: 2, name: "Depilación Láser Axilas Veracruz", provider: { "@id": "https://mipielveracruz.com/#clinic" }, areaServed: "Veracruz, México", offers: { "@type": "Offer", price: "600", priceCurrency: "MXN" } },
    { "@type": "Service", position: 3, name: "Depilación Láser Piernas Veracruz", provider: { "@id": "https://mipielveracruz.com/#clinic" }, areaServed: "Veracruz, México", offers: { "@type": "Offer", price: "1200", priceCurrency: "MXN" } },
    { "@type": "Service", position: 4, name: "Depilación Láser Bikini Veracruz", provider: { "@id": "https://mipielveracruz.com/#clinic" }, areaServed: "Veracruz, México", offers: { "@type": "Offer", price: "800", priceCurrency: "MXN" } },
    { "@type": "Service", position: 5, name: "Depilación Láser Cuerpo Completo Veracruz", provider: { "@id": "https://mipielveracruz.com/#clinic" }, areaServed: "Veracruz, México", offers: { "@type": "Offer", price: "4500", priceCurrency: "MXN" } },
    { "@type": "Service", position: 6, name: "Depilación Láser Caballeros Veracruz", provider: { "@id": "https://mipielveracruz.com/#clinic" }, areaServed: "Veracruz, México", offers: { "@type": "Offer", price: "800", priceCurrency: "MXN" } },
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
    <div className="py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge-premium mb-4">✦ Nuestros Servicios</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Depilación Láser en Veracruz —{" "}
            <span className="text-gradient font-display italic">Cada Zona</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tratamientos personalizados para damas y caballeros. Tecnología de punta con resultados
            permanentes desde la primera sesión.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service) => (
            <div key={service.slug} className="card-premium p-6 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">{service.name}</h2>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-sky-400 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{service.description}</p>

              <div className="space-y-1 mb-4">
                {service.areas.map((area) => (
                  <div key={area} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    {area}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">{service.sessions}</div>
                  <div className="font-semibold text-foreground">{service.price}</div>
                </div>
                <Link href="/agendar">
                  <Button size="sm" className="btn-gradient rounded-full">
                    Agendar <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="card-premium p-8 md:p-12 text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h2 className="text-2xl font-bold text-foreground">¿Por qué elegirnos?</h2>
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-2 text-sm text-left">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            ¿Lista para empezar?
          </h2>
          <p className="text-muted-foreground mb-8">
            Primera consulta gratis — sin compromiso.
          </p>
          <Link href="/agendar">
            <Button size="lg" className="btn-gradient rounded-full px-10">
              Agendar mi consulta gratis <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

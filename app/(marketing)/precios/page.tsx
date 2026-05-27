import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Precios de Depilación Láser | Mi Piel Veracruz",
  description:
    "Precios transparentes y accesibles para depilación láser en Boca del Río, Veracruz. Paquetes individuales y cuerpo completo. Primera consulta gratis.",
  alternates: { canonical: "https://mipielveracruz.com/precios" },
};

const packages = [
  {
    name: "Esencial",
    description: "Perfecta para comenzar con una zona específica",
    price: "Desde $500",
    period: "por sesión",
    highlight: false,
    features: [
      "1 zona a elegir",
      "Evaluación de tipo de piel",
      "Tecnología láser Diodo",
      "Sin contratos",
      "Pago por sesión",
    ],
  },
  {
    name: "Popular",
    description: "Las zonas más solicitadas en un solo paquete",
    price: "Desde $1,800",
    period: "por sesión",
    highlight: true,
    badge: "Más popular",
    features: [
      "Axilas + Bikini + Media pierna",
      "Evaluación personalizada",
      "Tecnología láser Diodo",
      "Descuento del 20%",
      "Seguimiento por sesión",
      "Reagendado sin costo",
    ],
  },
  {
    name: "Cuerpo Completo",
    description: "La solución definitiva para una piel perfecta",
    price: "Desde $4,500",
    period: "por sesión",
    highlight: false,
    features: [
      "Todas las zonas incluidas",
      "Plan de tratamiento 360°",
      "Tecnología láser Diodo",
      "Descuento del 40%",
      "Seguimiento mensual",
      "Reagendado sin costo",
      "Acceso prioritario a citas",
    ],
  },
];

const zones = [
  { name: "Labio superior", price: "$500" },
  { name: "Mentón / Cara", price: "$600" },
  { name: "Axilas", price: "$600" },
  { name: "Brazos completos", price: "$900" },
  { name: "Media pierna", price: "$900" },
  { name: "Pierna completa", price: "$1,200" },
  { name: "Bikini clásico", price: "$800" },
  { name: "Bikini brasileño", price: "$1,000" },
  { name: "Bikini integral", price: "$1,200" },
  { name: "Abdomen", price: "$700" },
  { name: "Espalda (caballeros)", price: "$1,500" },
  { name: "Pecho (caballeros)", price: "$1,000" },
];

export default function PreciosPage() {
  return (
    <div className="py-20">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge-premium mb-4">✦ Precios</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Precios{" "}
            <span className="text-gradient font-display italic">transparentes</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sin letras pequeñas. Sin costos ocultos. Primera consulta siempre gratis.
          </p>
        </div>

        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`card-premium p-8 flex flex-col relative ${
                pkg.highlight ? "border-primary/40 ring-2 ring-primary/20" : ""
              }`}
            >
              {pkg.highlight && pkg.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge-premium text-xs px-4 py-1">{pkg.badge}</span>
                </div>
              )}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className={`w-5 h-5 ${pkg.highlight ? "text-primary" : "text-muted-foreground"}`} />
                  <h2 className="text-xl font-bold text-foreground">{pkg.name}</h2>
                </div>
                <p className="text-sm text-muted-foreground">{pkg.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-foreground">{pkg.price}</span>
                <span className="text-sm text-muted-foreground ml-1">{pkg.period}</span>
              </div>

              <ul className="space-y-2 flex-1 mb-6">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/agendar">
                <Button
                  className={`w-full rounded-full ${pkg.highlight ? "btn-gradient" : ""}`}
                  variant={pkg.highlight ? "default" : "outline"}
                >
                  Agendar consulta gratis <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Price per zone */}
        <div className="card-premium p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-2 text-center">Precio por zona</h2>
          <p className="text-muted-foreground text-center mb-8 text-sm">
            Precios aproximados por sesión. El precio final se determina en la consulta según tu tipo de piel.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {zones.map((z) => (
              <div
                key={z.name}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-muted/40 border border-border/50"
              >
                <span className="text-sm text-foreground">{z.name}</span>
                <span className="text-sm font-semibold text-primary">{z.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            ¿Tienes dudas sobre qué paquete es mejor para ti? Te asesoramos sin compromiso.
          </p>
          <Link href="/agendar">
            <Button size="lg" className="btn-gradient rounded-full px-10">
              Agenda tu consulta gratis <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

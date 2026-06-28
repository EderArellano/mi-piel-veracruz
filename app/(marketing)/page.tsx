import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/hero-section";
import { ProblemsSection } from "@/components/marketing/problems-section";
import { ServicesSection } from "@/components/marketing/services-section";
import { StatsSection } from "@/components/marketing/stats-section";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { ProductsSection } from "@/components/marketing/products-section";

export const metadata: Metadata = {
  title: "Depilación Láser en Veracruz y Boca del Río | Mi Piel Centro Dermocosmético",
  description:
    "Clínica #1 de depilación láser en Veracruz y Boca del Río. Láser Diodo grado médico, Hidrofacial, Celluma LED y Skin Analyzer gratis. Más de 5,000 pacientes satisfechas. Agenda hoy.",
  keywords: [
    "depilación láser Veracruz",
    "depilación láser Boca del Río",
    "clínica dermocosmética Veracruz",
    "hidrofacial Veracruz",
    "Celluma LED Veracruz",
    "skin analyzer Veracruz",
    "primera consulta gratis depilación láser Veracruz",
  ],
  alternates: {
    canonical: "https://mipielveracruz.com",
  },
  openGraph: {
    title: "Depilación Láser en Veracruz — Mi Piel Centro Dermocosmético",
    description: "Más de 5,000 pacientes. Tecnología grado médico. Primera consulta con Skin Analyzer gratis.",
    url: "https://mipielveracruz.com",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ProblemsSection />
      <ServicesSection />
      <ProductsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}

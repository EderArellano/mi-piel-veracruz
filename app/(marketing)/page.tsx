import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/hero-section";
import { ProblemsSection } from "@/components/marketing/problems-section";
import { ServicesSection } from "@/components/marketing/services-section";
import { StatsSection } from "@/components/marketing/stats-section";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "Depilación Láser Premium en Veracruz y Boca del Río | Mi Piel Veracruz",
  description:
    "La mejor clínica de depilación láser en Veracruz y Boca del Río. Tecnología grado médico, resultados permanentes. Skin Analyzer gratis — agenda hoy.",
  alternates: {
    canonical: "https://mipielveracruz.com",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemsSection />
      <ServicesSection />
      <StatsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}

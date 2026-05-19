import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/hero-section";
import { ServicesSection } from "@/components/marketing/services-section";
import { BenefitsSection } from "@/components/marketing/benefits-section";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { BeforeAfterSection } from "@/components/marketing/before-after-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { MapSection } from "@/components/marketing/map-section";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "Depilación Láser Premium en Veracruz y Boca del Río | Mi Piel Veracruz",
  description:
    "La mejor clínica de depilación láser en Veracruz y Boca del Río. Tecnología de última generación, resultados permanentes. Agenda tu cita hoy y obtén tu primera consulta gratis.",
  alternates: {
    canonical: "https://mipielveracruz.com",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <BeforeAfterSection />
      <FaqSection />
      <MapSection />
      <CtaSection />
    </>
  );
}

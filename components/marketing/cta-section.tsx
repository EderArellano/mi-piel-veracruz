"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Blob parallax
      gsap.to(".cta-blob", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Content reveal
      gsap.from(".cta-content > *", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Pulse the CTA button glow
      gsap.to(".cta-btn-glow", {
        scale: 1.4,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#070b14] py-32 md:py-44 overflow-hidden"
    >
      {/* Blob */}
      <div className="cta-blob absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/12 blur-[160px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-sky-400/8 blur-[120px]" />
      </div>

      {/* Hex grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34zm28-33l-28 17v34l28-17V33z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="section-container relative z-10">
        <div className="cta-content max-w-3xl mx-auto text-center">
          {/* Label */}
          <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
            <span className="w-8 h-px bg-primary/60" />
            Sin costo · Sin compromiso
            <span className="w-8 h-px bg-primary/60" />
          </div>

          {/* Headline */}
          <h2 className="font-display text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tighter mb-6">
            Tu piel te está{" "}
            <span className="text-gradient">esperando.</span>
          </h2>

          {/* Sub */}
          <p className="text-white/50 text-xl leading-relaxed mb-12 max-w-xl mx-auto">
            Únete a más de 5,000 pacientes en Veracruz que ya disfrutan de una piel
            libre, radiante y sin preocupaciones.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {/* Primary */}
            <div className="relative inline-flex">
              <div className="cta-btn-glow absolute inset-0 rounded-2xl bg-primary" />
              <Link
                href="/agendar"
                className="relative group inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-base px-10 py-4 rounded-2xl transition-all duration-200 shadow-glow hover:shadow-glow-intense hover:-translate-y-0.5 z-10"
              >
                Agenda tu Skin Analyzer Gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Phone */}
            <a
              href="tel:+522299330014"
              className="inline-flex items-center justify-center gap-2.5 border border-white/15 text-white/75 hover:text-white hover:border-white/30 hover:bg-white/5 font-semibold text-base px-8 py-4 rounded-2xl transition-all duration-200"
            >
              <Phone className="w-4 h-4 shrink-0" />
              229 933 00 14
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-6 text-white/30 text-sm">
            {[
              "Sin compromisos",
              "Precios transparentes",
              "Especialistas certificadas",
              "Boca del Río, Veracruz",
            ].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="text-primary">✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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

      gsap.from(".cta-content > *", {
        y: 18,
        opacity: 0,
        stagger: 0.07,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

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
      className="relative bg-hexpattern-warm py-16 md:py-24 overflow-hidden"
    >
      {/* Soft glow blobs */}
      <div className="cta-blob absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/6 blur-[160px]" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-[#c9a96e]/8 blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        <div className="cta-content max-w-3xl mx-auto text-center">
          {/* Label */}
          <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
            <span className="w-8 h-px bg-primary/40" />
            Sin costo · Sin compromiso
            <span className="w-8 h-px bg-primary/40" />
          </div>

          {/* Headline */}
          <h2 className="font-display text-5xl md:text-7xl font-black text-gray-900 leading-[0.95] tracking-tighter mb-6">
            Tu piel te está{" "}
            <span className="text-gradient">esperando.</span>
          </h2>

          {/* Sub */}
          <p className="text-gray-500 text-xl leading-relaxed mb-8 max-w-xl mx-auto">
            Únete a más de 5,000 pacientes en Veracruz que ya disfrutan de una piel
            libre, radiante y sin preocupaciones.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
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

            <a
              href="tel:+522299330014"
              className="inline-flex items-center justify-center gap-2.5 border border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400 hover:bg-white font-semibold text-base px-8 py-4 rounded-2xl transition-all duration-200"
            >
              <Phone className="w-4 h-4 shrink-0" />
              229 933 00 14
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
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

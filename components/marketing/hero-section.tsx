"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, Star, Shield, Award, Clock } from "lucide-react";

const trust = [
  { icon: Shield, text: "Médicos certificados" },
  { icon: Award, text: "Equipo FDA-cleared" },
  { icon: Clock, text: "Cita en 24 horas" },
];

const LOGO_PATTERN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cpath d='M60 16 L98 38 L98 82 L60 104 L22 82 L22 38 Z' fill='none' stroke='%23c9a96e' stroke-width='2' opacity='0.12'/%3E%3Cpath d='M60 82 C60 82 35 67 35 50 C35 39 43 32 52 36 C55.5 37.5 58 41 60 45 C62 41 64.5 37.5 68 36 C77 32 85 39 85 50 C85 67 60 82 60 82 Z' fill='none' stroke='%23c9a96e' stroke-width='1.8' opacity='0.09'/%3E%3C/svg%3E")`;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(blob1Ref.current, {
        yPercent: 55,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(blob2Ref.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.8,
        },
      });

      gsap.to(gridRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2.5,
        },
      });

      gsap.from(".hero-badge", {
        scale: 0.85,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      });

      gsap.from(".hero-line", {
        y: 90,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.15,
      });

      gsap.from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
      });

      gsap.from(".hero-actions", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.85,
        ease: "power3.out",
      });

      gsap.to(".hero-content", {
        y: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "60% top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#faf7f2] flex items-center overflow-x-hidden"
    >
      {/* Parallax blob 1 — soft primary + café glow */}
      <div ref={blob1Ref} className="absolute inset-0 -top-1/4 pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-[700px] h-[700px] rounded-full bg-primary/8 blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-[#c9a96e]/6 blur-[130px]" />
      </div>

      {/* Parallax blob 2 */}
      <div ref={blob2Ref} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-2/3 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[90px]" />
        <div className="absolute top-1/3 right-10 w-[180px] h-[180px] rounded-full bg-[#c9a96e]/5 blur-[60px]" />
      </div>

      {/* Parallax logo grid layer */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: LOGO_PATTERN, backgroundSize: "120px 120px" }}
      />

      {/* Hero content */}
      <div className="hero-content relative z-10 section-container py-32 lg:py-40 w-full">
        <div className="max-w-5xl">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2.5 mb-10 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-gray-500 text-xs font-medium">
              4.9 / 5 · Más de 5,000 pacientes en Veracruz
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-black leading-[0.92] tracking-tighter mb-8">
            <span className="hero-line block text-gray-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]">
              Deja de
            </span>
            <span className="hero-line block text-gray-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]">
              rasurar.
            </span>
            <span className="hero-line block text-gradient text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]">
              Empieza
            </span>
            <span className="hero-line block text-gradient text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]">
              a vivir.
            </span>
          </h1>

          {/* Subhead */}
          <p className="hero-sub text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
            Depilación láser grado médico, hidrofacial y análisis personalizado en Boca del Río,
            Veracruz. Sin vello. Sin manchas. Sin perder tiempo.
          </p>

          {/* CTAs */}
          <div className="hero-actions flex flex-col sm:flex-row gap-4 mb-14">
            <Link
              href="/agendar"
              className="group inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all duration-200 shadow-glow hover:shadow-glow-intense hover:-translate-y-0.5"
            >
              Agenda tu Skin Analyzer — Es Gratis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400 hover:bg-white font-semibold text-base px-8 py-4 rounded-2xl transition-all duration-200"
            >
              Ver servicios y precios
            </Link>
          </div>

          {/* Trust row */}
          <div className="hero-actions flex flex-wrap gap-5">
            {trust.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-gray-400 text-sm">
                <Icon className="w-4 h-4 text-primary shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-300 pointer-events-none">
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gray-400/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

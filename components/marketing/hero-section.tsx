"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, Star, Shield, Award, Clock } from "lucide-react";

const trust = [
  { icon: Shield, text: "Tecnología FDA-cleared" },
  { icon: Award, text: "8 años de experiencia" },
  { icon: Clock, text: "Primera consulta gratis" },
];

const DOT_GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='1' cy='1' r='1' fill='%232596be' opacity='0.18'/%3E%3C/svg%3E")`;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".hero-badge", {
        scale: 0.88,
        opacity: 0,
        duration: 0.65,
        ease: "back.out(1.6)",
        delay: 0.1,
      });

      gsap.from(".hero-line", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
        delay: 0.25,
      });

      gsap.from(".hero-sub", {
        y: 22,
        opacity: 0,
        duration: 0.65,
        delay: 0.75,
        ease: "power2.out",
      });

      gsap.from(".hero-actions", {
        y: 18,
        opacity: 0,
        duration: 0.55,
        delay: 0.9,
        ease: "power2.out",
      });

      gsap.from(".hero-trust", {
        y: 14,
        opacity: 0,
        duration: 0.5,
        delay: 1.05,
        ease: "power2.out",
      });

      gsap.to(".hero-glow", {
        yPercent: 45,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".hero-content", {
        y: -50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "68% top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#070d14] flex items-center overflow-hidden"
    >
      {/* Primary blue ambient halo — top center */}
      <div className="hero-glow absolute -top-48 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full bg-primary/14 blur-[200px] pointer-events-none" />
      {/* Gold accent — bottom right */}
      <div className="absolute -bottom-20 -right-20 w-[550px] h-[550px] rounded-full bg-[#c9a96e]/8 blur-[160px] pointer-events-none" />
      {/* Secondary blue — left */}
      <div className="absolute top-1/3 -left-32 w-[380px] h-[380px] rounded-full bg-sky-600/6 blur-[110px] pointer-events-none" />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-100"
        style={{ backgroundImage: DOT_GRID, backgroundSize: "40px 40px" }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-primary/8 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="hero-content relative z-10 section-container py-28 lg:py-36 w-full">
        <div className="max-w-5xl">

          {/* Rating badge */}
          <div className="hero-badge inline-flex items-center gap-3 mb-9 pl-3 pr-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-white/60 text-xs font-medium">
              4.9 · 49 reseñas verificadas en Google
            </span>
            <span className="hidden sm:block w-px h-3.5 bg-white/15" />
            <span className="hidden sm:block text-primary text-xs font-bold tracking-wide">
              +5,000 pacientes
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-black leading-[0.87] tracking-[-0.03em] mb-8">
            <span className="hero-line block text-white text-[clamp(2.8rem,7vw,5.5rem)]">
              Depilación
            </span>
            <span className="hero-line block text-white text-[clamp(2.8rem,7vw,5.5rem)]">
              Láser en
            </span>
            <span
              className="hero-line block text-[clamp(2.8rem,7vw,5.5rem)]"
              style={{
                background: "linear-gradient(125deg, #2596be 0%, #56cfe1 45%, #c9a96e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Veracruz.
            </span>
            <span className="hero-line block text-white/35 text-[clamp(1.8rem,4.5vw,3.5rem)] mt-2 font-bold tracking-[-0.01em]">
              Para siempre.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="hero-sub text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
            Láser diodo grado médico, Hidrofacial, Celluma LED y Skin Analyzer personalizado.
            Sin vello. Sin manchas. Sin perder tiempo — en Boca del Río, Veracruz.
          </p>

          {/* CTAs */}
          <div className="hero-actions flex flex-col sm:flex-row gap-4 mb-11">
            <Link
              href="/agendar"
              className="group relative inline-flex items-center justify-center gap-2.5 bg-primary text-white font-bold text-base px-9 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              style={{ boxShadow: "0 0 40px rgba(37,150,190,0.45), 0 4px 24px rgba(37,150,190,0.3)" }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-sky-400/0 via-white/8 to-sky-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              Agenda tu Skin Analyzer — Es Gratis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/65 hover:text-white hover:border-white/35 hover:bg-white/5 font-semibold text-base px-8 py-4 rounded-2xl transition-all duration-200"
            >
              Ver servicios y precios
            </Link>
          </div>

          {/* Trust row */}
          <div className="hero-trust flex flex-wrap gap-7">
            {trust.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/38 text-sm">
                <Icon className="w-4 h-4 text-primary/60 shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

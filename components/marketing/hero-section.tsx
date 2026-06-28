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

const DOT_GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='1' cy='1' r='1' fill='%235F7C71' opacity='0.03'/%3E%3C/svg%3E")`;

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
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#FAFAF8" }}
    >
      {/* Soft sage radial gradient top-right */}
      <div
        className="hero-glow absolute pointer-events-none"
        style={{
          top: "-10%",
          right: 0,
          width: "70%",
          height: "70%",
          background: "radial-gradient(ellipse 60% 50% at 70% -10%, rgba(95,124,113,.08) 0%, transparent 60%)",
        }}
      />
      {/* Warm gold bottom-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 0,
          left: 0,
          width: "60%",
          height: "60%",
          background: "radial-gradient(ellipse 50% 40% at -5% 110%, rgba(200,169,106,.07) 0%, transparent 55%)",
        }}
      />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: DOT_GRID, backgroundSize: "40px 40px" }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, #FAFAF8, transparent)" }}
      />

      {/* Content */}
      <div className="hero-content relative z-10 section-container py-28 lg:py-36 w-full">
        <div className="max-w-5xl">

          {/* Rating badge */}
          <div
            className="hero-badge inline-flex items-center gap-3 mb-9 pl-3 pr-5 py-2 rounded-full"
            style={{
              background: "white",
              border: "1px solid #E7E3DC",
              boxShadow: "0 8px 20px rgba(0,0,0,.04)",
            }}
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-medium" style={{ color: "#6F6F6F" }}>
              4.9 · 49 reseñas verificadas en Google
            </span>
            <span className="hidden sm:block w-px h-3.5 bg-black/10" />
            <span className="hidden sm:block text-xs font-bold tracking-wide" style={{ color: "#5F7C71" }}>
              +5,000 pacientes
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-black leading-[0.87] tracking-[-0.03em] mb-8">
            <span className="hero-line block text-[clamp(2.8rem,7vw,5.5rem)]" style={{ color: "#2B2B2B" }}>
              Depilación
            </span>
            <span className="hero-line block text-[clamp(2.8rem,7vw,5.5rem)]" style={{ color: "#2B2B2B" }}>
              Láser en
            </span>
            <span
              className="hero-line block text-[clamp(2.8rem,7vw,5.5rem)]"
              style={{
                background: "linear-gradient(125deg, #5F7C71 0%, #C8A96A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Veracruz.
            </span>
            <span
              className="hero-line block text-[clamp(1.8rem,4.5vw,3.5rem)] mt-2 font-bold tracking-[-0.01em]"
              style={{ color: "#6F6F6F" }}
            >
              Para siempre.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="hero-sub text-lg md:text-xl leading-relaxed max-w-2xl mb-10" style={{ color: "#6F6F6F" }}>
            Láser diodo grado médico, Hidrofacial, Celluma LED y Skin Analyzer personalizado.
            Sin vello. Sin manchas. Sin perder tiempo — en Boca del Río, Veracruz.
          </p>

          {/* CTAs */}
          <div className="hero-actions flex flex-col sm:flex-row gap-4 mb-11">
            <Link
              href="/agendar"
              className="group relative inline-flex items-center justify-center gap-2.5 text-white font-bold text-base px-9 py-4 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              style={{
                background: "#5F7C71",
                borderRadius: "18px",
                boxShadow: "0 0 40px rgba(95,124,113,.25), 0 4px 24px rgba(95,124,113,.18)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#4D675E"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#5F7C71"; }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/8 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              Agenda tu Skin Analyzer — Es Gratis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center gap-2 font-semibold text-base px-8 py-4 transition-all duration-200"
              style={{
                border: "1.5px solid #E7E3DC",
                color: "#6F6F6F",
                background: "white",
                borderRadius: "18px",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#5F7C71";
                el.style.color = "#5F7C71";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#E7E3DC";
                el.style.color = "#6F6F6F";
              }}
            >
              Ver servicios y precios
            </Link>
          </div>

          {/* Trust row */}
          <div className="hero-trust flex flex-wrap gap-7">
            {trust.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm" style={{ color: "#6F6F6F" }}>
                <Icon className="w-4 h-4 shrink-0" style={{ color: "#5F7C71" }} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

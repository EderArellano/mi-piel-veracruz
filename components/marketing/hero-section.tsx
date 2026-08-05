"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";

const DOT_GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='1' cy='1' r='1' fill='%235F7C71' opacity='0.035'/%3E%3C/svg%3E")`;
const WA = "https://wa.me/522299330014?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20depilaci%C3%B3n%20l%C3%A1ser%20en%20Veracruz.";

const results = [
  { label: "Reducción permanente", value: "85–95%" },
  { label: "Sesiones", value: "6–8" },
  { label: "Desde", value: "$500 MXN" },
];

const checks = [
  "Sin contrato ni pago por adelantado",
  "Piel morena y todo tipo de piel",
  "Primera consulta gratis con Skin Analyzer",
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".hero-badge", { scale: 0.88, opacity: 0, duration: 0.6, ease: "back.out(1.6)", delay: 0.1 });
      gsap.from(".hero-line", { y: 56, opacity: 0, duration: 0.85, stagger: 0.09, ease: "power3.out", delay: 0.25 });
      gsap.from(".hero-sub", { y: 20, opacity: 0, duration: 0.6, delay: 0.7, ease: "power2.out" });
      gsap.from(".hero-checks", { y: 16, opacity: 0, duration: 0.5, delay: 0.85, ease: "power2.out" });
      gsap.from(".hero-actions", { y: 16, opacity: 0, duration: 0.5, delay: 1.0, ease: "power2.out" });
      gsap.from(".hero-card", { x: 40, opacity: 0, duration: 0.8, delay: 0.5, ease: "power3.out" });

      gsap.to(".hero-glow", {
        yPercent: 40,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[95vh] flex items-center overflow-hidden"
      style={{ background: "#FAFAF8" }}
    >
      {/* Backgrounds */}
      <div className="hero-glow absolute pointer-events-none" style={{ top: "-15%", right: 0, width: "65%", height: "75%", background: "radial-gradient(ellipse 60% 55% at 75% -5%, rgba(95,124,113,.09) 0%, transparent 60%)" }} />
      <div className="absolute pointer-events-none" style={{ bottom: 0, left: 0, width: "55%", height: "55%", background: "radial-gradient(ellipse 50% 40% at -5% 110%, rgba(200,169,106,.07) 0%, transparent 55%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: DOT_GRID, backgroundSize: "40px 40px" }} />
      <div className="absolute bottom-0 inset-x-0 h-40 pointer-events-none" style={{ background: "linear-gradient(to top, #FAFAF8, transparent)" }} />

      <div className="relative z-10 section-container py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — Copy */}
          <div>
            {/* Rating badge */}
            <div
              className="hero-badge inline-flex items-center gap-2.5 mb-8 pl-3 pr-5 py-2 rounded-full"
              style={{ background: "white", border: "1px solid #E7E3DC", boxShadow: "0 6px 18px rgba(0,0,0,.05)" }}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 12 12" width="13" height="13">
                    <path fill="#FBBF24" d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.09L6 7.82l-2.78 1.73.53-3.09L1.5 4.27l3.11-.45z"/>
                  </svg>
                ))}
              </div>
              <span className="text-xs font-medium" style={{ color: "#6F6F6F" }}>
                4.9 · 49 reseñas Google
              </span>
              <span className="w-px h-3.5 bg-black/10 hidden sm:block" />
              <span className="text-xs font-bold hidden sm:block" style={{ color: "#5F7C71" }}>+5,000 pacientes</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-black leading-[0.88] tracking-[-0.03em] mb-7">
              <span className="hero-line block text-[clamp(3rem,7vw,5.5rem)]" style={{ color: "#2B2B2B" }}>Sin vello.</span>
              <span className="hero-line block text-[clamp(3rem,7vw,5.5rem)]" style={{ color: "#2B2B2B" }}>Para siempre.</span>
              <span
                className="hero-line block text-[clamp(2rem,4.5vw,3.5rem)] font-bold mt-2"
                style={{ background: "linear-gradient(125deg, #5F7C71 0%, #C8A96A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                En Veracruz.
              </span>
            </h1>

            {/* Sub */}
            <p className="hero-sub text-lg md:text-xl leading-relaxed max-w-xl mb-7" style={{ color: "#6F6F6F" }}>
              Láser Diodo grado médico en Boca del Río. Resultados permanentes para piel morena desde la primera sesión. Sin cuchillas. Sin cera. Sin regresos.
            </p>

            {/* Checks */}
            <div className="hero-checks space-y-2.5 mb-9">
              {checks.map((c) => (
                <div key={c} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#5F7C71" }} />
                  <span className="text-sm font-medium" style={{ color: "#4A4A4A" }}>{c}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-actions flex flex-col sm:flex-row gap-3">
              <Link
                href="/agendar"
                className="group relative inline-flex items-center justify-center gap-2.5 text-white font-bold text-base px-8 py-4 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ background: "#5F7C71", borderRadius: "18px", boxShadow: "0 0 40px rgba(95,124,113,.28), 0 4px 20px rgba(95,124,113,.2)" }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/8 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                Agenda — Skin Analyzer Gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-semibold text-base px-7 py-4 transition-all duration-200 hover:-translate-y-0.5"
                style={{ border: "1.5px solid #E7E3DC", color: "#6F6F6F", background: "white", borderRadius: "18px" }}
              >
                <MessageCircle className="w-5 h-5" style={{ color: "#22c55e" }} />
                WhatsApp
              </a>
            </div>
          </div>

          {/* RIGHT — Results card */}
          <div className="hero-card hidden lg:block">
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ background: "white", border: "1px solid #E7E3DC", boxShadow: "0 30px 70px rgba(0,0,0,.09)" }}
            >
              {/* Top gradient bar */}
              <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #5F7C71, #C8A96A)" }} />

              {/* Before / After visual */}
              <div className="relative h-52 overflow-hidden">
                {/* Before */}
                <div className="absolute inset-0 left-0 right-1/2" style={{ background: "linear-gradient(135deg, #E8E0D5 0%, #D4C8BB 100%)" }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#9A9A9A" }}>Antes</span>
                    <div className="flex flex-col gap-1.5 items-center">
                      {[60, 80, 55, 70, 45].map((w, i) => (
                        <div key={i} className="rounded-full" style={{ width: w, height: 3, background: "rgba(100,80,60,.3)" }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* After */}
                <div className="absolute inset-0 left-1/2" style={{ background: "linear-gradient(135deg, #EAF0ED 0%, #D6E6DF 100%)" }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#5F7C71" }}>Después</span>
                    <div className="flex flex-col gap-1.5 items-center opacity-10">
                      {[60, 80, 55, 70, 45].map((w, i) => (
                        <div key={i} className="rounded-full" style={{ width: w, height: 3, background: "#5F7C71" }} />
                      ))}
                    </div>
                    <span className="text-2xl font-black" style={{ color: "#5F7C71" }}>✓</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5" style={{ background: "white", zIndex: 10 }} />
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center z-20"
                  style={{ background: "white", boxShadow: "0 4px 12px rgba(0,0,0,.15)" }}
                >
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                    <path d="M5 8h6M8 5l3 3-3 3" stroke="#5F7C71" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3" style={{ borderTop: "1px solid #E7E3DC" }}>
                {results.map(({ label, value }, i) => (
                  <div key={label} className="py-5 px-4 text-center" style={i > 0 ? { borderLeft: "1px solid #E7E3DC" } : {}}>
                    <div className="font-display text-xl font-black mb-0.5" style={{ color: "#2B2B2B" }}>{value}</div>
                    <div className="text-[11px] leading-tight" style={{ color: "#9A9A9A" }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Zone tags */}
              <div className="px-5 pb-4 pt-3 flex flex-wrap gap-2" style={{ borderTop: "1px solid #E7E3DC" }}>
                {["Axilas", "Bikini", "Piernas", "Facial", "Espalda"].map((z) => (
                  <span key={z} className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: "#EAF0ED", color: "#5F7C71" }}>
                    {z}
                  </span>
                ))}
                <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: "#FBF7EE", color: "#C8A96A" }}>
                  +6 zonas más
                </span>
              </div>

              {/* CTA bottom */}
              <div className="px-5 pb-5">
                <Link
                  href="/agendar"
                  className="block w-full text-center text-white font-bold text-sm py-3.5 rounded-2xl transition-all hover:opacity-90"
                  style={{ background: "#5F7C71" }}
                >
                  Ver precios y zonas →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: "depilacion",
    emoji: "✦",
    title: "Depilación Láser",
    tag: "Más popular",
    tagColor: "bg-primary/15 text-primary border-primary/20",
    price: "Desde $500 MXN",
    sessions: "6–8 sesiones",
    desc: "Láser diodo grado médico para todo tipo de piel. Elimina vello permanentemente, reduce manchas y mejora la textura de la piel desde la primera sesión.",
    href: "/precios",
    accent: "from-sky-950/80 to-brand-950/80",
    border: "border-primary/15 hover:border-primary/35",
    glow: "rgba(37,150,190,0.15)",
  },
  {
    id: "hidrofacial",
    emoji: "◈",
    title: "Hidrofacial",
    tag: "Resultados en 1 sesión",
    tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    price: "Desde $800 MXN",
    sessions: "Efecto inmediato",
    desc: "Limpieza profunda, exfoliación, extracción e hidratación en 60 minutos. Sin tiempo de recuperación. Tu piel sale radiante del consultorio.",
    href: "/agendar",
    accent: "from-cyan-950/80 to-sky-950/80",
    border: "border-cyan-500/15 hover:border-cyan-500/30",
    glow: "rgba(6,182,212,0.12)",
  },
  {
    id: "celluma",
    emoji: "◉",
    title: "Celluma LED",
    tag: "Fototerapia médica",
    tagColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    price: "Desde $600 MXN",
    sessions: "Por sesión",
    desc: "Luz LED de espectro médico que estimula el colágeno, reduce acné e inflamación y revierte el daño solar acumulado en la piel veracruzana.",
    href: "/agendar",
    accent: "from-violet-950/80 to-sky-950/80",
    border: "border-violet-500/15 hover:border-violet-500/30",
    glow: "rgba(139,92,246,0.12)",
  },
  {
    id: "skin-analyzer",
    emoji: "⬡",
    title: "Skin Analyzer",
    tag: "Gratis · Sin compromiso",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    price: "GRATIS",
    sessions: "Primera consulta",
    desc: "Análisis clínico completo de tu piel con tecnología de imágenes avanzada. Detectamos problemas invisibles al ojo y diseñamos tu plan personalizado.",
    href: "/agendar",
    accent: "from-emerald-950/80 to-sky-950/80",
    border: "border-emerald-500/15 hover:border-emerald-500/30",
    glow: "rgba(16,185,129,0.12)",
  },
  {
    id: "skin-care",
    emoji: "◇",
    title: "Skin Care",
    tag: "Mantenimiento",
    tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    price: "Consultar",
    sessions: "Uso diario",
    desc: "Productos de grado médico recomendados por nuestros especialistas para mantener tu piel radiante entre sesiones en el clima de Veracruz.",
    href: "/agendar",
    accent: "from-amber-950/80 to-sky-950/80",
    border: "border-amber-500/15 hover:border-amber-500/30",
    glow: "rgba(245,158,11,0.12)",
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header
      gsap.from(".svc-header", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".svc-header",
          start: "top 85%",
        },
      });

      // Cards — stagger from bottom
      gsap.from(".svc-card", {
        y: 70,
        opacity: 0,
        stagger: 0.12,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".svc-grid",
          start: "top 80%",
        },
      });

      // Parallax depth on each card background
      gsap.utils.toArray<HTMLElement>(".svc-bg").forEach((bg) => {
        gsap.to(bg, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: bg.closest(".svc-card") as Element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="servicios" className="py-28 md:py-36 bg-white bg-hexpattern overflow-hidden">
      <div className="section-container">

        {/* Header */}
        <div className="svc-header text-center mb-16">
          <div className="inline-flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-5">
            <span className="w-10 h-px bg-primary/40" />
            Tratamientos disponibles
            <span className="w-10 h-px bg-primary/40" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4">
            Todo lo que tu piel{" "}
            <span className="text-gradient">necesita</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tecnología grado médico diseñada para la piel mexicana en el clima tropical de Veracruz.
          </p>
        </div>

        {/* Cards */}
        <div className="svc-grid grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <Link key={s.id} href={s.href} className="svc-card group block">
              <div
                className={`relative h-full rounded-3xl bg-[#0a0f1e] border ${s.border} p-7 overflow-hidden transition-all duration-400 hover:-translate-y-1.5 hover:shadow-2xl`}
              >
                {/* Glowing bg gradient (parallax target) */}
                <div
                  className={`svc-bg absolute inset-0 bg-gradient-to-br ${s.accent} pointer-events-none`}
                />

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                  style={{ boxShadow: `inset 0 0 60px ${s.glow}` }}
                />

                <div className="relative z-10">
                  {/* Tag */}
                  <div className={`inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border mb-5 ${s.tagColor}`}>
                    {s.tag}
                  </div>

                  {/* Icon */}
                  <div className="text-2xl text-primary/60 mb-4 font-mono">{s.emoji}</div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-white mb-3">{s.title}</h3>

                  {/* Description */}
                  <p className="text-white/45 text-sm leading-relaxed mb-6">{s.desc}</p>

                  {/* Footer */}
                  <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/6">
                    <div>
                      <div className="font-display text-xl font-extrabold text-white">{s.price}</div>
                      <div className="text-white/35 text-xs mt-0.5">{s.sessions}</div>
                    </div>
                    <div className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-200">
                      <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/agendar"
            className="inline-flex items-center gap-2.5 bg-foreground text-white font-bold text-base px-8 py-4 rounded-2xl transition-all duration-200 hover:bg-foreground/90 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Agendar mi primera sesión — Gratis
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-muted-foreground text-sm mt-3">
            Primera consulta con Skin Analyzer sin costo · Cancela cuando quieras
          </p>
        </div>
      </div>
    </section>
  );
}

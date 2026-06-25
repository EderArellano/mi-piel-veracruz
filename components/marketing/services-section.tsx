"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: "depilacion",
    title: "Depilación Láser",
    tag: "Más popular",
    price: "Desde $500",
    unit: "MXN / sesión",
    sessions: "6–8 sesiones · resultados permanentes",
    desc: "Láser diodo grado médico para todo tipo de piel. Elimina vello permanentemente, reduce manchas y mejora la textura desde la primera sesión.",
    href: "/precios",
    accent: "#2596be",
  },
  {
    id: "hidrofacial",
    title: "Hidrofacial",
    tag: "Resultados inmediatos",
    price: "Desde $800",
    unit: "MXN / sesión",
    sessions: "Efecto visible en 1 sesión",
    desc: "Limpieza profunda, exfoliación, extracción e hidratación en 60 minutos. Sin tiempo de recuperación. Piel radiante al salir.",
    href: "/agendar",
    accent: "#0891b2",
  },
  {
    id: "celluma",
    title: "Celluma LED",
    tag: "Fototerapia médica",
    price: "Desde $600",
    unit: "MXN / sesión",
    sessions: "Ideal combinado",
    desc: "Luz LED de espectro médico que estimula colágeno, reduce acné e inflamación y revierte el daño solar acumulado en piel veracruzana.",
    href: "/agendar",
    accent: "#7c3aed",
  },
  {
    id: "skin-analyzer",
    title: "Skin Analyzer",
    tag: "Gratis · Sin compromiso",
    price: "GRATIS",
    unit: "primera consulta",
    sessions: "Análisis clínico completo",
    desc: "Tecnología de imágenes clínicas que detecta problemas invisibles al ojo. Tu plan de tratamiento 100% personalizado.",
    href: "/agendar",
    accent: "#059669",
  },
  {
    id: "skin-care",
    title: "Skin Care Médico",
    tag: "Mantenimiento",
    price: "Consultar",
    unit: "según plan",
    sessions: "Cosméticos grado médico",
    desc: "Rutina personalizada con productos formulados para el clima tropical de Veracruz. Mantiene resultados entre sesiones.",
    href: "/agendar",
    accent: "#9b7b5b",
  },
  {
    id: "paquete",
    title: "Paquete Popular",
    tag: "Ahorra 20%",
    price: "$2,100",
    unit: "MXN · 6 sesiones",
    sessions: "Axilas + Bikini + Media pierna",
    desc: "El combo favorito de nuestras pacientes. Tres zonas, seis sesiones. Resultados visibles desde la primera semana. Sin letra chica.",
    href: "/precios",
    accent: "#c9a96e",
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".svc-header", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".svc-header", start: "top 85%" },
      });

      gsap.from(".svc-card", {
        y: 24,
        opacity: 0,
        stagger: 0.07,
        duration: 0.45,
        ease: "power2.out",
        scrollTrigger: { trigger: ".svc-grid", start: "top 82%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="servicios" className="relative py-16 md:py-24 overflow-hidden" style={{ background: "#f7f9fc" }}>
      {/* Top border line from stats */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="svc-header text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-5">
            <span className="w-10 h-px bg-primary/40" />
            Tratamientos disponibles
            <span className="w-10 h-px bg-primary/40" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4">
            Todo lo que tu piel{" "}
            <span className="text-gradient">necesita</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Tecnología grado médico diseñada para la piel mexicana en el clima tropical de Veracruz.
          </p>
        </div>

        {/* Cards */}
        <div className="svc-grid grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <Link key={s.id} href={s.href} className="svc-card group block">
              <div
                className="relative h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: "#111a24",
                  boxShadow: `0 2px 20px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.05)`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 0% 0%, ${s.accent}18 0%, transparent 65%)` }}
                />
                {/* Accent top bar */}
                <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${s.accent}, ${s.accent}60)` }} />

                <div className="p-7 relative z-10">
                  {/* Tag */}
                  <span
                    className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-5"
                    style={{
                      color: s.accent,
                      background: `${s.accent}18`,
                      border: `1px solid ${s.accent}35`,
                    }}
                  >
                    {s.tag}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-white mb-3">{s.title}</h3>

                  {/* Description */}
                  <p className="text-white/45 text-sm leading-relaxed mb-7">{s.desc}</p>

                  {/* Footer */}
                  <div className="flex items-end justify-between pt-5 border-t border-white/8">
                    <div>
                      <div className="font-display text-xl font-extrabold" style={{ color: s.accent }}>
                        {s.price}
                      </div>
                      <div className="text-white/30 text-xs mt-0.5">{s.sessions}</div>
                    </div>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:brightness-110"
                      style={{ background: `${s.accent}22`, border: `1px solid ${s.accent}40` }}
                    >
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" style={{ color: s.accent }} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/agendar"
            className="group inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-base px-9 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
            style={{ boxShadow: "0 0 35px rgba(37,150,190,0.35)" }}
          >
            Agendar mi primera sesión — Es gratis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-gray-400 text-sm mt-3">
            Primera consulta con Skin Analyzer sin costo · Sin compromiso
          </p>
        </div>
      </div>
    </section>
  );
}

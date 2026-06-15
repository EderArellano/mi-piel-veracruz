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
    <section ref={sectionRef} id="servicios" className="relative py-14 md:py-20 bg-brand-hex overflow-hidden">
      {/* MiPiel logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <svg
          className="w-full max-w-[540px] h-auto opacity-[0.045]"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
            fill="#2596be"
          />
          <path d="M20 3v4M22 5h-4M4 17v2M5 18H3" stroke="#2596be" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="svc-header text-center mb-8 md:mb-10">
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
              <div className="relative h-full rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 overflow-hidden">
                {/* Accent top bar */}
                <div className="h-0.5 w-full" style={{ background: s.accent }} />

                <div className="p-7">
                  {/* Tag */}
                  <span
                    className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-5"
                    style={{
                      color: s.accent,
                      background: `${s.accent}14`,
                      border: `1px solid ${s.accent}30`,
                    }}
                  >
                    {s.tag}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-3">{s.title}</h3>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{s.desc}</p>

                  {/* Footer */}
                  <div className="flex items-end justify-between pt-5 border-t border-gray-100">
                    <div>
                      <div className="font-display text-xl font-extrabold" style={{ color: s.accent }}>
                        {s.price}
                      </div>
                      <div className="text-gray-400 text-xs mt-0.5">{s.sessions}</div>
                    </div>
                    <div
                      className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                      style={{ borderColor: `${s.accent}40`, background: `${s.accent}10` }}
                    >
                      <ArrowRight
                        className="w-4 h-4 transition-all duration-200 group-hover:translate-x-0.5"
                        style={{ color: s.accent }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/agendar"
            className="group inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all duration-200 shadow-glow hover:shadow-glow-intense hover:-translate-y-0.5"
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

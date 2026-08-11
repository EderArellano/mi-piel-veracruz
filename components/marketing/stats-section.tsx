"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface LiveStats {
  patients: number;
  satisfactionPct: number;
  yearsOpen: number;
  services: number;
}

const DEFAULTS: LiveStats = {
  patients: 5000,
  satisfactionPct: 98,
  yearsOpen: 8,
  services: 14,
};

export function StatsSection({ live }: { live?: Partial<LiveStats> }) {
  const sectionRef = useRef<HTMLElement>(null);

  const merged: LiveStats = { ...DEFAULTS, ...live };

  const stats = [
    { value: merged.patients, suffix: "+", label: "Pacientes atendidas", sub: "En Veracruz y Boca del Río" },
    { value: merged.satisfactionPct, suffix: "%", label: "Satisfacción garantizada", sub: "Avalado por reseñas Google" },
    { value: merged.yearsOpen, suffix: " años", label: "De experiencia clínica", sub: "Especializadas en piel mexicana" },
    { value: merged.services, suffix: "", label: "Servicios disponibles", sub: "Desde $500 MXN por sesión" },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        y: 20, opacity: 0, stagger: 0.08, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = parseFloat(el.dataset.target ?? "0");
        const suffix = el.dataset.suffix ?? "";
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: "power2.out",
          onUpdate() { el.textContent = Math.round(obj.val).toLocaleString("es-MX") + suffix; },
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-14 md:py-18" style={{ background: "#2596be" }}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,.15), transparent)" }} />
      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,.15), transparent)" }} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full blur-[100px]" style={{ background: "rgba(255,255,255,.06)" }} />
      </div>
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23ffffff'/%3E%3C/svg%3E")`, backgroundSize: "60px 60px" }}
      />
      <div className="section-container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((s, i) => (
            <div key={i} className="stat-item text-center">
              <div
                className="stat-num font-display text-5xl md:text-6xl lg:text-7xl font-black mb-2 tabular-nums text-white"
                data-target={s.value}
                data-suffix={s.suffix}
              >
                0{s.suffix}
              </div>
              <div className="font-semibold text-sm md:text-base mb-1" style={{ color: "rgba(255,255,255,.85)" }}>{s.label}</div>
              <div className="text-xs md:text-sm" style={{ color: "rgba(255,255,255,.55)" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

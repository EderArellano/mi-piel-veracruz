"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  {
    value: 5000,
    suffix: "+",
    label: "Pacientes atendidas",
    sub: "En Veracruz y Boca del Río",
  },
  {
    value: 98,
    suffix: "%",
    label: "Satisfacción garantizada",
    sub: "Avalado por reseñas reales",
  },
  {
    value: 8,
    suffix: " años",
    label: "De experiencia clínica",
    sub: "Especializadas en piel mexicana",
  },
  {
    value: 14,
    suffix: "",
    label: "Servicios disponibles",
    sub: "Desde $500 MXN por sesión",
  },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Stagger reveal items
      gsap.from(".stat-item", {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Animated counters
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = parseFloat(el.dataset.target ?? "0");
        const suffix = el.dataset.suffix ?? "";
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: "power2.out",
          onUpdate() {
            const v = target < 100 ? Math.round(obj.val) : Math.round(obj.val);
            el.textContent = v.toLocaleString("es-MX") + suffix;
          },
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-primary overflow-hidden py-12 md:py-16">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cpath d='M60 16 L98 38 L98 82 L60 104 L22 82 L22 38 Z' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3Cpath d='M60 82 C60 82 35 67 35 50 C35 39 43 32 52 36 C55.5 37.5 58 41 60 45 C62 41 64.5 37.5 68 36 C77 32 85 39 85 50 C85 67 60 82 60 82 Z' fill='none' stroke='%23ffffff' stroke-width='1.8'/%3E%3C/svg%3E")`,
          backgroundSize: "120px 120px",
        }}
      />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {stats.map((s, i) => (
            <div key={i} className="stat-item text-center text-white">
              <div
                className="stat-num font-display text-5xl md:text-6xl lg:text-7xl font-black mb-2 tabular-nums"
                data-target={s.value}
                data-suffix={s.suffix}
              >
                0{s.suffix}
              </div>
              <div className="font-semibold text-white/90 text-sm md:text-base mb-1">
                {s.label}
              </div>
              <div className="text-white/55 text-xs md:text-sm">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

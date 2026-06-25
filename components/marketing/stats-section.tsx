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
    <section ref={sectionRef} className="relative overflow-hidden py-14 md:py-18" style={{ background: "linear-gradient(135deg, #0e1e2e 0%, #1a3a52 50%, #0e1e2e 100%)" }}>
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      {/* Bottom accent line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full bg-primary/10 blur-[100px]" />
      </div>
      {/* Texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((s, i) => (
            <div key={i} className="stat-item text-center">
              <div
                className="stat-num font-display text-5xl md:text-6xl lg:text-7xl font-black mb-2 tabular-nums"
                data-target={s.value}
                data-suffix={s.suffix}
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #56cfe1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                0{s.suffix}
              </div>
              <div className="font-semibold text-white/85 text-sm md:text-base mb-1">
                {s.label}
              </div>
              <div className="text-white/45 text-xs md:text-sm">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

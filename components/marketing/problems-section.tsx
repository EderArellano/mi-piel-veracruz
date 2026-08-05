"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const problems = [
  {
    number: "01",
    stat: "7 / 10",
    statSub: "mujeres evitan la playa por el vello",
    title: "La playa que te estás perdiendo",
    desc: "Vivir en Veracruz y no disfrutar el mar por inseguridad no es justo. MiPiel existe para que eso no te limite más.",
    accent: "#2596be",
  },
  {
    number: "02",
    stat: "$3,200",
    statSub: "MXN al año en métodos temporales",
    title: "Dinero que nunca para de salir",
    desc: "Cuchillas, cera, cremas. Año tras año sin parar. Eso equivale a 5–6 sesiones de láser que duran para siempre.",
    accent: "#059669",
  },
  {
    number: "03",
    stat: "68%",
    statSub: "manchas post-depilación en piel morena",
    title: "Hiperpigmentación que se queda",
    desc: "Rasuradora + sol tropical de Veracruz = manchas oscuras que tardan meses en irse. El láser elimina sin dañar la piel.",
    accent: "#f59e0b",
  },
  {
    number: "04",
    stat: "54%",
    statSub: "padecen foliculitis en axilas/bikini",
    title: "Irritación, granitos y piel dañada",
    desc: "La inflamación crónica que causa la cera o la cuchilla destruye la piel. El láser corta ese ciclo de raíz.",
    accent: "#db2777",
  },
];

export function ProblemsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".prb-header", {
        y: 22,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".prb-header", start: "top 85%" },
      });

      gsap.utils.toArray<HTMLElement>(".prb-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          x: i % 2 === 0 ? -24 : 24,
          y: 10,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" },
        });
      });

      gsap.from(".prb-line", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 60%",
          scrub: 1,
        },
      });

      gsap.from(".prb-bridge", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".prb-bridge", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-brand-hex py-14 md:py-20 overflow-hidden">
      <div className="section-container">

        {/* Header */}
        <div className="prb-header text-center mb-10">
          <div className="inline-flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-5">
            <span className="w-10 h-px bg-primary/40" />
            Por qué existimos
            <span className="w-10 h-px bg-primary/40" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold text-gray-900 leading-[1.05] mb-5">
            8 problemas que{" "}
            <span className="text-gradient">MiPiel resuelve</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Datos reales del mercado veracruzano. Si reconoces alguno, ya sabes por qué estás aquí.
          </p>
        </div>

        {/* Cards grid */}
        <div className="relative">
          <div className="prb-line hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />

          <div className="grid md:grid-cols-2 gap-4 lg:gap-5">
            {problems.map((p) => (
              <div
                key={p.number}
                className="prb-card group relative rounded-2xl p-6 border border-gray-100 bg-white hover:border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Hover color wash */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 0% 0%, ${p.accent}08 0%, transparent 70%)` }}
                />

                {/* Ghost number */}
                <div
                  className="absolute right-3 top-2 font-display text-[5.5rem] font-black leading-none select-none pointer-events-none"
                  style={{ color: p.accent, opacity: 0.07 }}
                >
                  {p.number}
                </div>

                <div className="relative z-10">
                  <div className="flex items-baseline gap-2.5 mb-3">
                    <span
                      className="font-display text-3xl md:text-4xl font-black tracking-tight"
                      style={{ color: p.accent }}
                    >
                      {p.stat}
                    </span>
                    <span className="text-gray-400 text-xs leading-tight max-w-[160px]">
                      {p.statSub}
                    </span>
                  </div>

                  <div
                    className="w-8 h-0.5 rounded-full mb-3 opacity-50"
                    style={{ background: p.accent }}
                  />

                  <h3 className="font-display text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bridge */}
        <div className="prb-bridge mt-12 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-[0.25em] mb-4">La solución ya existe en Veracruz</p>
          <p className="font-display text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Una decisión lo cambia todo:{" "}
            <span className="text-gradient">el láser diodo</span>
          </p>
          <p className="text-gray-500 text-base mt-4 max-w-xl mx-auto">
            Y puedes verlo con tus propios ojos — antes de gastar un solo peso.
          </p>
        </div>
      </div>
    </section>
  );
}

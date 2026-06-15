"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const problems = [
  {
    number: "01",
    stat: "72 hrs",
    statSub: "al año rasurandote",
    title: "Tiempo que nunca recuperas",
    desc: "3 días completos de tu vida. Cada año. Solo en la rasuradora. El láser diodo te los devuelve — de por vida.",
    accent: "#ef4444",
  },
  {
    number: "02",
    stat: "68%",
    statSub: "de mujeres con manchas post-depilación",
    title: "Hiperpigmentación que se queda",
    desc: "Rasuradora + sol tropical de Veracruz = manchas oscuras que tardan meses en irse. El láser elimina sin dañar la piel.",
    accent: "#f59e0b",
  },
  {
    number: "03",
    stat: "54%",
    statSub: "padecen pelos encarnados en axilas/bikini",
    title: "Foliculitis: el problema oculto",
    desc: "Granitos, inflamación y piel irritada que la cera y cuchilla provocan. El láser lo elimina definitivamente.",
    accent: "#ec4899",
  },
  {
    number: "04",
    stat: "$3,200",
    statSub: "MXN al año en métodos temporales",
    title: "Dinero que nunca para de salir",
    desc: "Cuchillas, cera, cremas. Año tras año sin parar. Eso equivale a 5-6 sesiones de láser que duran para siempre.",
    accent: "#10b981",
  },
  {
    number: "05",
    stat: "UV 10",
    statSub: "índice solar promedio anual en Veracruz",
    title: "El sol que envejece tu piel",
    desc: "El UV índice 10 de Veracruz destruye colágeno antes de los 35. Celluma LED y Skin Analyzer invierten ese daño.",
    accent: "#f97316",
  },
  {
    number: "06",
    stat: "80%",
    statSub: "humedad relativa anual en la ciudad",
    title: "Poros tapados por el trópico",
    desc: "La humedad de Veracruz es enemiga de los poros limpios. El Hidrofacial los abre, limpia y cierra en 60 minutos.",
    accent: "#06b6d4",
  },
  {
    number: "07",
    stat: "2×",
    statSub: "más rápido el envejecimiento sin protección",
    title: "Colágeno que pierdes cada día",
    desc: "Sin fototerapia activa, el sol tropical destruye colágeno antes de los 35. Celluma LED lo estimula de regreso.",
    accent: "#a78bfa",
  },
  {
    number: "08",
    stat: "7 / 10",
    statSub: "mujeres evitan la playa por el vello",
    title: "La playa que te estás perdiendo",
    desc: "Vivir en Veracruz y no disfrutar el mar por inseguridad no es justo. MiPiel existe para que eso no te limite más.",
    accent: "#2596be",
  },
];

export function ProblemsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(".prb-header", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".prb-header",
          start: "top 85%",
        },
      });

      // Cards: alternate left / right
      gsap.utils.toArray<HTMLElement>(".prb-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          x: i % 2 === 0 ? -60 : 60,
          y: 20,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 87%",
            toggleActions: "play none none none",
          },
        });
      });

      // Vertical connector line draw
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

      // Bridge text
      gsap.from(".prb-bridge", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".prb-bridge",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0f1f30] py-28 md:py-36 overflow-hidden">
      <div className="section-container">

        {/* Header */}
        <div className="prb-header text-center mb-20">
          <div className="inline-flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-5">
            <span className="w-10 h-px bg-primary/60" />
            Por qué existimos
            <span className="w-10 h-px bg-primary/60" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold text-white leading-[1.05] mb-5">
            8 problemas que{" "}
            <span className="text-gradient">MiPiel resuelve</span>
          </h2>
          <p className="text-white/45 text-lg max-w-2xl mx-auto">
            Datos reales del mercado veracruzano. Si reconoces alguno, ya sabes por qué estás aquí.
          </p>
        </div>

        {/* Cards grid */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="prb-line hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          <div className="grid md:grid-cols-2 gap-4 lg:gap-5">
            {problems.map((p, i) => (
              <div
                key={p.number}
                className="prb-card group relative rounded-2xl p-6 border border-white/6 bg-white/[0.025] hover:bg-white/[0.04] hover:border-white/12 transition-all duration-400 overflow-hidden"
              >
                {/* Hover color wash */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 0% 0%, ${p.accent}10 0%, transparent 70%)` }}
                />

                {/* Ghost number */}
                <div
                  className="absolute right-3 top-2 font-display text-[5.5rem] font-black leading-none select-none pointer-events-none"
                  style={{ color: p.accent, opacity: 0.06 }}
                >
                  {p.number}
                </div>

                <div className="relative z-10">
                  {/* Stat */}
                  <div className="flex items-baseline gap-2.5 mb-3">
                    <span
                      className="font-display text-3xl md:text-4xl font-black tracking-tight"
                      style={{ color: p.accent }}
                    >
                      {p.stat}
                    </span>
                    <span className="text-white/35 text-xs leading-tight max-w-[160px]">
                      {p.statSub}
                    </span>
                  </div>

                  {/* Accent line */}
                  <div
                    className="w-8 h-0.5 rounded-full mb-3 opacity-60"
                    style={{ background: p.accent }}
                  />

                  <h3 className="font-display text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bridge */}
        <div className="prb-bridge mt-24 text-center">
          <p className="text-white/25 text-xs uppercase tracking-[0.25em] mb-4">La solución existe en Veracruz</p>
          <p className="font-display text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Todo esto tiene nombre:{" "}
            <span className="text-gradient">MiPiel</span>
          </p>
          <p className="text-white/45 text-base mt-4 max-w-xl mx-auto">
            Un centro dermocosmético en Boca del Río diseñado para resolver exactamente estos 8 problemas.
          </p>
        </div>
      </div>
    </section>
  );
}

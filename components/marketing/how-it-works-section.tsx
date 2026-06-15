"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, CalendarCheck, FlaskConical, Zap, Sparkles } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    number: "01",
    title: "Agenda tu consulta",
    description:
      "Reserva tu valoración inicial gratuita en línea o por teléfono. Te atendemos en menos de 24 horas en Boca del Río.",
    accent: "#2596be",
  },
  {
    icon: FlaskConical,
    number: "02",
    title: "Skin Analyzer gratis",
    description:
      "Una especialista analiza tu tipo de piel, tono y vello para diseñar tu plan de tratamiento 100% personalizado.",
    accent: "#0891b2",
  },
  {
    icon: Zap,
    number: "03",
    title: "Tus sesiones de tratamiento",
    description:
      "Realizamos tus sesiones con láser diodo grado médico. Cada sesión dura 15–120 minutos según la zona.",
    accent: "#059669",
  },
  {
    icon: Sparkles,
    number: "04",
    title: "Piel libre para siempre",
    description:
      "Disfruta de una piel suave, sin vello y sin preocupaciones de forma permanente. Seguimiento post-tratamiento incluido.",
    accent: "#c9a96e",
  },
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".hiw-header", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".hiw-header", start: "top 85%" },
      });

      gsap.from(".hiw-left", {
        x: -50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".hiw-left", start: "top 80%" },
      });

      gsap.from(".hiw-step", {
        x: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: ".hiw-steps", start: "top 80%" },
      });

      gsap.from(".hiw-connector", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ".hiw-steps", start: "top 75%", scrub: 1 },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="como-funciona" className="py-28 md:py-36 bg-hexpattern-warm overflow-hidden">
      <div className="section-container">
        <div className="hiw-header text-center mb-16">
          <div className="inline-flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-5">
            <span className="w-10 h-px bg-primary/40" />
            Proceso
            <span className="w-10 h-px bg-primary/40" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            De la consulta a la{" "}
            <span className="text-gradient">piel perfecta</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            4 pasos diseñados para que tengas los mejores resultados con la máxima comodidad.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div className="hiw-left">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-md p-8">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />
              </div>

              <div className="relative z-10">
                <div className="text-gray-400 text-xs uppercase tracking-widest mb-2">¿Por qué elegir MiPiel?</div>
                <p className="text-gray-900 text-lg font-semibold leading-relaxed mb-6">
                  El proceso es sencillo, seguro y diseñado para la piel de la mujer veracruzana.
                </p>

                {[
                  "Tecnología láser Diodo grado médico",
                  "Especialistas certificadas en dermocosmética",
                  "Adaptado a pieles morenas y sensibles",
                  "Seguimiento personalizado incluido",
                  "Primera consulta con Skin Analyzer gratis",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary text-xs">✓</span>
                    </span>
                    <span className="text-gray-600 text-sm">{item}</span>
                  </div>
                ))}

                <Link
                  href="/agendar"
                  className="mt-8 group inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 shadow-glow hover:shadow-glow-intense hover:-translate-y-0.5"
                >
                  Comenzar ahora — Gratis
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Steps */}
          <div className="hiw-steps relative space-y-4">
            <div className="hiw-connector absolute left-6 top-12 bottom-12 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden sm:block" />

            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="hiw-step flex gap-5 p-6 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 relative"
                >
                  <div
                    className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: `${step.accent}15`, border: `1px solid ${step.accent}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: step.accent }} />
                  </div>
                  <div>
                    <div
                      className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1"
                      style={{ color: step.accent }}
                    >
                      Paso {step.number}
                    </div>
                    <h3 className="font-display font-bold text-gray-900 mb-1.5">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

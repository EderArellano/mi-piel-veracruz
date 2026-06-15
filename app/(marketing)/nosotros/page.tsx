"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Heart, Shield, Award, Users, ArrowRight, Zap, FlaskConical } from "lucide-react";

const stats = [
  { value: "5,000+", label: "Pacientes atendidas", sub: "En Veracruz y Boca del Río" },
  { value: "8 años", label: "De experiencia clínica", sub: "En dermocosmética" },
  { value: "98%", label: "Satisfacción garantizada", sub: "Reseñas verificadas" },
  { value: "100%", label: "Equipo certificado", sub: "Médicos especializados" },
];

const values = [
  {
    icon: Heart,
    color: "#ec4899",
    title: "Cuidado personalizado",
    description: "Cada tratamiento es diseñado para tu tipo de piel, tu tono y tus metas específicas. No existe una solución igual para dos personas.",
  },
  {
    icon: Shield,
    color: "#2596be",
    title: "Seguridad primero",
    description: "Usamos únicamente tecnología grado médico aprobada por la FDA. Todos nuestros procedimientos siguen protocolos de seguridad estrictos.",
  },
  {
    icon: Award,
    color: "#c9a96e",
    title: "Resultados garantizados",
    description: "No prometemos lo que no podemos cumplir. Hacemos una valoración honesta antes de comenzar y te mostramos resultados reales de pacientes.",
  },
  {
    icon: Users,
    color: "#10b981",
    title: "Especialistas certificadas",
    description: "Nuestro equipo tiene certificaciones en láser médico, dermocosmética y estética clínica. Formación continua con los mejores estándares.",
  },
  {
    icon: FlaskConical,
    color: "#06b6d4",
    title: "Tecnología de vanguardia",
    description: "Láser Diodo grado médico, Celluma LED y tecnología de análisis de piel que usan las mejores clínicas del mundo.",
  },
  {
    icon: Zap,
    color: "#a78bfa",
    title: "Atención inmediata",
    description: "Agenda en línea, confirmación en 24 horas y atención puntual. Respetamos tu tiempo tanto como tú respetas el nuestro.",
  },
];

export default function NosotrosPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(".nos-hero > *", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.1,
      });

      // Stats
      gsap.from(".nos-stat", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".nos-stats", start: "top 80%" },
      });

      // Values
      gsap.from(".nos-value", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: ".nos-values", start: "top 80%" },
      });

      // Mission
      gsap.from(".nos-mission", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".nos-mission", start: "top 80%" },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-[#0c1826] min-h-screen">

      {/* Hero */}
      <div className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/15 blur-[120px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="nos-hero max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="w-8 h-px bg-primary/60" />
              Nuestra historia
              <span className="w-8 h-px bg-primary/60" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              La clínica que{" "}
              <span className="text-gradient">Veracruz necesitaba</span>
            </h1>
            <p className="text-white/55 text-lg md:text-xl leading-relaxed">
              Hace 8 años fundamos MiPiel Centro Dermocosmético en Boca del Río con una convicción:
              las mujeres veracruzanas merecen acceso a tecnología dermocosmética de clase mundial,
              adaptada a su piel, su clima y su vida.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="nos-stats py-16 bg-[#0f1f30]">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="nos-stat text-center">
                <div className="font-display text-4xl md:text-5xl font-extrabold text-primary mb-1">{s.value}</div>
                <div className="text-white font-semibold text-sm mb-0.5">{s.label}</div>
                <div className="text-white/35 text-xs">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="py-24 section-container">
        <div className="nos-mission grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-5">
              <span className="w-8 h-px bg-primary/60" />
              Nuestra misión
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white leading-tight mb-5">
              Devolverte la confianza en tu propia piel
            </h2>
            <p className="text-white/50 leading-relaxed mb-4">
              Veracruz tiene un clima único: calor, humedad alta y UV índice de 10 casi todo el año.
              Eso significa que la piel veracruzana enfrenta retos que las clínicas genéricas no entienden.
            </p>
            <p className="text-white/50 leading-relaxed mb-8">
              En MiPiel diseñamos cada tratamiento considerando el fototipo III–V predominante en
              nuestra región, el impacto del sol tropical y el estilo de vida de la mujer veracruzana.
              No somos una franquicia. Somos una clínica local que conoce a sus pacientes.
            </p>
            <Link
              href="/agendar"
              className="group inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 shadow-glow hover:shadow-glow-intense hover:-translate-y-0.5"
            >
              Conoce nuestro equipo — Primera consulta gratis
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="rounded-3xl bg-[#112539] border border-white/8 p-8 space-y-4">
            {[
              { label: "Tecnología", value: "Láser Diodo grado médico + Celluma LED + Skin Analyzer" },
              { label: "Especialidad", value: "Depilación láser, hidrofacial y cuidado de piel tropical" },
              { label: "Ubicación", value: "Boca del Río, Veracruz — Zona metropolitana" },
              { label: "Horario", value: "Lun–Vie 9–20 h · Sáb 9–15 h" },
              { label: "Primera consulta", value: "Gratis, sin compromiso, con análisis de piel incluido" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 py-3 border-b border-white/5 last:border-0">
                <div className="text-white/30 text-xs uppercase tracking-widest w-28 shrink-0 pt-0.5">{item.label}</div>
                <div className="text-white/70 text-sm leading-relaxed">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-24 bg-[#0f1f30]">
        <div className="section-container">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4">
              Lo que nos hace{" "}
              <span className="text-gradient">diferentes</span>
            </h2>
          </div>
          <div className="nos-values grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="nos-value rounded-2xl p-6 bg-[#112539]/60 border border-white/6 hover:border-white/12 hover:bg-[#112539] transition-all duration-300"
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: `${v.color}18`, border: `1px solid ${v.color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: v.color }} />
                  </div>
                  <h3 className="font-display font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 text-center section-container">
        <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-4">
          ¿Lista para conocernos?
        </h2>
        <p className="text-white/45 text-lg mb-8">Primera consulta con Skin Analyzer — sin costo, sin compromiso.</p>
        <Link
          href="/agendar"
          className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-base px-10 py-4 rounded-2xl transition-all duration-200 shadow-glow hover:shadow-glow-intense hover:-translate-y-0.5"
        >
          Agenda tu visita gratis
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

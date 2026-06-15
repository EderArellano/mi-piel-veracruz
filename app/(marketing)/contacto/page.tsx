"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowRight, MessageCircle } from "lucide-react";

const info = [
  {
    icon: MapPin,
    color: "#2596be",
    title: "Ubicación",
    lines: ["Boca del Río, Veracruz, México"],
    sub: "Zona metropolitana de Veracruz",
  },
  {
    icon: Phone,
    color: "#059669",
    title: "Teléfono / WhatsApp",
    lines: ["+52 229 933 00 14"],
    href: "tel:+522299330014",
  },
  {
    icon: Mail,
    color: "#c9a96e",
    title: "Correo electrónico",
    lines: ["contacto@mipielveracruz.com"],
    href: "mailto:contacto@mipielveracruz.com",
  },
  {
    icon: Clock,
    color: "#7c3aed",
    title: "Horario de atención",
    lines: ["Lun–Vie: 9:00 – 20:00 h", "Sábado: 9:00 – 15:00 h"],
    sub: "Domingos cerrado",
  },
];

export default function ContactoPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".con-hero > *", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.from(".con-card", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".con-grid", start: "top 80%" },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen">

      {/* Hero — light */}
      <div className="relative py-28 md:py-36 overflow-hidden bg-hexpattern-warm">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full bg-primary/6 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#c9a96e]/5 blur-[100px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="con-hero max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="w-8 h-px bg-primary/40" />
              Estamos aquí para ti
              <span className="w-8 h-px bg-primary/40" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Hablemos de{" "}
              <span className="text-gradient">tu piel</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              La primera consulta es gratis. Escríbenos, llámanos o agenda directamente en línea.
              Respondemos en menos de 24 horas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/agendar"
                className="group inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 shadow-glow hover:shadow-glow-intense hover:-translate-y-0.5"
              >
                Agendar cita — Es gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/522299330014"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 border border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400 hover:bg-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5 text-emerald-500" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Info cards — clinical light */}
      <div className="bg-brand-hex">
        <div className="con-grid section-container py-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {info.map((item, i) => {
            const Icon = item.icon;
            const Wrapper = item.href ? "a" : "div";
            return (
              <Wrapper
                key={i}
                {...(item.href ? { href: item.href } : {})}
                className="con-card rounded-2xl p-6 bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${item.color}14`, border: `1px solid ${item.color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div className="text-gray-400 text-xs uppercase tracking-widest mb-2">{item.title}</div>
                {item.lines.map((line) => (
                  <div key={line} className="text-gray-900 font-semibold text-sm">{line}</div>
                ))}
                {item.sub && (
                  <div className="text-gray-400 text-xs mt-1">{item.sub}</div>
                )}
              </Wrapper>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA — light */}
      <div className="bg-brand-hex py-20">
        <div className="section-container text-center">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">¿Tienes dudas?</p>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            La primera consulta{" "}
            <span className="text-gradient">siempre es gratis</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-8 text-base leading-relaxed">
            Agenda tu Skin Analyzer sin costo. Analizamos tu piel, diseñamos tu plan y te decimos
            exactamente qué tratamiento necesitas — sin compromiso.
          </p>
          <a
            href="tel:+522299330014"
            className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200 shadow-glow"
          >
            <Phone className="w-4 h-4" />
            229 933 00 14
          </a>
        </div>
      </div>
    </div>
  );
}

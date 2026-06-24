"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  MapPin, Phone, Mail, Clock, ArrowRight,
  MessageCircle, ChevronDown, Star, CheckCircle2,
} from "lucide-react";

const serviceOptions = [
  "Depilación Láser",
  "Hidrofacial",
  "Celluma LED",
  "Skin Analyzer (gratis)",
  "Skin Care Médico",
  "Paquete Popular (Axilas + Bikini + Media pierna)",
  "Tengo una pregunta general",
];

const contactInfo = [
  {
    icon: Phone,
    color: "#2596be",
    label: "Teléfono",
    value: "+52 229 933 00 14",
    href: "tel:+522299330014",
    cta: "Llamar ahora",
  },
  {
    icon: MessageCircle,
    color: "#22c55e",
    label: "WhatsApp",
    value: "Respuesta inmediata",
    href: "https://wa.me/522299330014",
    cta: "Abrir chat",
    external: true,
  },
  {
    icon: Mail,
    color: "#c9a96e",
    label: "Correo",
    value: "contacto@mipielveracruz.com",
    href: "mailto:contacto@mipielveracruz.com",
    cta: "Enviar correo",
  },
  {
    icon: MapPin,
    color: "#7c3aed",
    label: "Ubicación",
    value: "Av. R. Flores Magón & Alacio Pérez",
    sub: "Ignacio Zaragoza, 91700 Veracruz, Ver.",
  },
  {
    icon: Clock,
    color: "#9b7b5b",
    label: "Horario",
    value: "Lun–Vie 9:00 – 20:00",
    sub: "Sáb 9:00 – 15:00 · Dom cerrado",
  },
];

export function ContactoContent() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hola, soy *${form.name}*. Me interesa: *${form.service}*. Mi número: ${form.phone}.${form.message ? ` Mensaje: ${form.message}` : ""}`
    );
    window.open(`https://wa.me/522299330014?text=${text}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".con-hero > *", {
        y: 20, opacity: 0, stagger: 0.07, duration: 0.5, ease: "power2.out", delay: 0.05,
      });
      gsap.from(".con-form", {
        x: -20, opacity: 0, duration: 0.55, ease: "power2.out",
        scrollTrigger: { trigger: ".con-main", start: "top 85%" },
      });
      gsap.from(".con-info", {
        x: 20, opacity: 0, duration: 0.55, ease: "power2.out", delay: 0.07,
        scrollTrigger: { trigger: ".con-main", start: "top 85%" },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#faf7f2]">

      {/* Compact hero */}
      <div className="relative py-14 md:py-20 bg-hexpattern-warm overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[280px] rounded-full bg-primary/6 blur-[100px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="con-hero max-w-2xl">
            <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">
              <span className="w-6 h-px bg-primary/40" />
              Contáctanos
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
              Clínica de Depilación Láser en{" "}
              <span className="text-gradient">Veracruz — Hablemos</span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed max-w-lg">
              Primera consulta gratis · Respondemos en menos de 24 h · Sin compromiso
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 mt-5">
              {["5,000+ pacientes", "Skin Analyzer gratis", "Equipo certificado"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main: form + info side by side */}
      <div className="con-main section-container py-12 md:py-16">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-14 items-start">

          {/* WhatsApp form */}
          <form onSubmit={handleSubmit} className="con-form lg:col-span-3">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-[#22c55e]" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-gray-900 leading-tight">Escríbenos por WhatsApp</h2>
                  <p className="text-gray-400 text-xs mt-0.5">Te responderemos de inmediato</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Nombre *</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="Tu nombre completo"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary focus:bg-white transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Teléfono *</label>
                    <input
                      required
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      placeholder="229 000 0000"
                      type="tel"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Tratamiento de interés *</label>
                  <div className="relative">
                    <select
                      required
                      value={form.service}
                      onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary focus:bg-white transition-all duration-200 pr-10"
                    >
                      <option value="">Selecciona un tratamiento…</option>
                      {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Mensaje (opcional)</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder="Cuéntanos sobre tu piel, zona a tratar o cualquier duda…"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary focus:bg-white transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full group inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-base px-8 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                >
                  {sent ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      ¡Abriendo WhatsApp…
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5" />
                      Enviar por WhatsApp
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
                <p className="text-gray-400 text-xs">¿Prefieres agendar directamente?</p>
                <Link href="/agendar" className="text-primary text-xs font-bold hover:underline">
                  Reservar cita en línea →
                </Link>
              </div>
            </div>

            {/* Rating strip */}
            <div className="mt-4 flex items-center gap-3 px-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-gray-500 text-xs">4.9 / 5 · 49 reseñas en Google</span>
            </div>
          </form>

          {/* Info sidebar */}
          <div className="con-info lg:col-span-2 space-y-3">
            <h3 className="font-display text-base font-bold text-gray-700 mb-4">Información de contacto</h3>

            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              const Tag = item.href ? "a" : "div";
              const tagProps = item.href
                ? { href: item.href, ...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {}) }
                : {};
              return (
                <Tag
                  key={i}
                  {...tagProps}
                  className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 group"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}14`, border: `1px solid ${item.color}28` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-gray-400 text-[10px] uppercase tracking-widest">{item.label}</div>
                    <div className="text-gray-900 font-semibold text-sm mt-0.5 truncate">{item.value}</div>
                    {item.sub && <div className="text-gray-400 text-xs mt-0.5">{item.sub}</div>}
                    {item.cta && item.href && (
                      <div className="text-xs font-bold mt-1.5 group-hover:underline" style={{ color: item.color }}>
                        {item.cta} →
                      </div>
                    )}
                  </div>
                </Tag>
              );
            })}

            {/* First consult highlight */}
            <div className="p-4 rounded-2xl bg-primary/6 border border-primary/15 mt-2">
              <div className="flex items-center gap-2 mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <p className="text-primary text-sm font-bold">Primera consulta gratis</p>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Skin Analyzer incluido. Sin compromiso. Analizamos tu piel y diseñamos tu plan en la misma visita.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps */}
      <div className="section-container pb-12 md:pb-16">
        <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm" style={{ height: "360px" }}>
          <iframe
            title="MiPiel Centro Dermocosmético — Veracruz, México"
            src="https://maps.google.com/maps?q=Av.+R.+Flores+Magón,+Veracruz,+Ver.,+Mexico&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="flex items-center justify-between mt-3 px-1 flex-wrap gap-2">
          <p className="text-gray-400 text-xs flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            Av. R. Flores Magón & Alacio Pérez, 91700 Veracruz, Ver.
          </p>
          <a
            href="https://maps.google.com/?q=Av.+R.+Flores+Magón,+Veracruz,+Ver.,+Mexico"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-primary text-xs font-bold hover:underline"
          >
            Abrir en Google Maps
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

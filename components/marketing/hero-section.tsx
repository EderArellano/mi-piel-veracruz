"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Star, Shield, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "5,000+", label: "Pacientes atendidas", icon: "👩" },
  { value: "98%", label: "Tasa de satisfacción", icon: "⭐" },
  { value: "8 años", label: "De experiencia clínica", icon: "🏆" },
];

const features = [
  "Depilación láser Diodo grado médico — resultados permanentes",
  "Hidrofacial, Celluma LED y tratamientos faciales especializados",
  "Análisis de piel personalizado — siempre gratis",
];

const trustBadges = [
  { icon: Shield, text: "Médicos certificados" },
  { icon: Award, text: "Equipo FDA-cleared" },
  { icon: Clock, text: "Cita en 24 h" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-hex pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/6 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-sky-400/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-sky-100/20 blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">

            {/* Social proof badge — authority + trust */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-white border border-primary/20 px-4 py-2 shadow-premium mb-6"
            >
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-foreground">
                Más de 5,000 pacientes satisfechas en Veracruz
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground mb-6"
            >
              Descubre el secreto de una{" "}
              <span className="text-gradient font-display italic">piel radiante</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              En MiPiel ofrecemos depilación láser, hidrofacial, fototerapia Celluma y análisis
              de piel personalizado. Tecnología grado médico — resultados reales y seguros.
            </motion.p>

            {/* Feature list */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2.5 mb-10"
            >
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 justify-center lg:justify-start">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium text-foreground">{f}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTAs — primary + secondary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/agendar" className="btn-gradient">
                Agenda tu consulta gratis
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/servicios" className="btn-secondary">
                Ver servicios y precios
              </Link>
            </motion.div>

            {/* Risk reversal */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="text-xs text-muted-foreground mt-4"
            >
              Sin costo · Sin compromiso · Cancela cuando quieras
            </motion.p>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              {trustBadges.map(({ icon: Icon, text }) => (
                <div key={text} className="badge-trust">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Visual card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Hero image placeholder */}
              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-sky-100 to-primary/10 aspect-[4/5] shadow-premium-lg border border-primary/10">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    {/* Logo placeholder */}
                    <div className="w-24 h-24 rounded-2xl bg-white shadow-premium mx-auto flex items-center justify-center">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-sky-400 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">M</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">MiPiel</p>
                      <p className="text-xs text-muted-foreground">Centro Dermocosmético</p>
                    </div>
                    <p className="text-xs text-primary/60 max-w-[160px] mx-auto">
                      Coloca aquí tu foto hero del centro o una paciente
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating stat — left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-6 top-1/4 glass rounded-2xl px-5 py-4 shadow-premium border border-white/80"
              >
                <div className="text-2xl font-bold text-foreground">5,000+</div>
                <div className="text-xs text-muted-foreground font-medium">Pacientes felices</div>
              </motion.div>

              {/* Floating stat — right */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-6 bottom-1/4 glass rounded-2xl px-5 py-4 shadow-premium border border-white/80"
              >
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-xl font-bold text-foreground">4.9 / 5</div>
                <div className="text-xs text-muted-foreground font-medium">Google Reviews</div>
              </motion.div>

              {/* Availability chip — scarcity */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full px-5 py-2 shadow-premium border border-border/50 flex items-center gap-2 whitespace-nowrap"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-foreground">Plazas disponibles esta semana</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 grid grid-cols-3 gap-6 rounded-3xl bg-white border border-border/50 shadow-card p-8"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-3xl font-bold text-foreground tracking-tight">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

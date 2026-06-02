"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Star, Shield, Clock, Award, Zap } from "lucide-react";

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

const metrics = [
  { label: "Reducción de vello", value: 92, delay: 0 },
  { label: "Hidratación cutánea", value: 87, delay: 0.15 },
  { label: "Satisfacción del paciente", value: 98, delay: 0.3 },
];

const treatments = ["Láser Diodo", "Hidrofacial", "Celluma LED", "Skin Analyzer"];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-hex pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-sky-400/6 blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-sky-100/15 blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">

            {/* Social proof badge */}
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

            {/* Headline — Plus Jakarta Sans via font-display */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.08] tracking-tight text-foreground mb-6"
            >
              Descubre el secreto
              <br />
              de una{" "}
              <span className="relative inline-block">
                <span className="text-gradient">piel radiante</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-gradient-to-r from-primary to-sky-400 w-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Tecnología grado médico para depilación láser, hidrofacial y análisis de piel.
              Resultados reales, seguros y permanentes.
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

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/agendar" className="btn-gradient group">
                Agenda tu consulta gratis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/servicios" className="btn-secondary">
                Ver servicios y precios
              </Link>
            </motion.div>

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

          {/* Right: Tech dashboard card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-[420px]">
              {/* Main card — dark dashboard */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-brand-950 to-sky-950 p-6 shadow-glow-intense border border-white/10">

                {/* Scan line effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium">
                      Centro Dermocosmético
                    </p>
                    <p className="text-white font-display font-bold text-xl leading-tight">MiPiel</p>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-[11px] font-semibold">Disponible</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="mb-5">
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.12em] font-medium mb-3">
                    Resultados clínicos promedio
                  </p>
                  <div className="space-y-3">
                    {metrics.map((m) => (
                      <div key={m.label}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white/70 text-xs">{m.label}</span>
                          <motion.span
                            className="text-white text-xs font-bold tabular-nums"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 + m.delay }}
                          >
                            {m.value}%
                          </motion.span>
                        </div>
                        <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-sky-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${m.value}%` }}
                            transition={{ duration: 1.4, delay: 0.6 + m.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Treatment pills */}
                <div className="mb-5">
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.12em] font-medium mb-2.5">
                    Tratamientos disponibles
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {treatments.map((t, i) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + i * 0.08 }}
                        className="text-[11px] font-medium bg-white/8 border border-white/12 text-white/80 rounded-lg px-3 py-1.5"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Next appointment CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="rounded-2xl bg-primary/15 border border-primary/25 p-4 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/60 text-[10px] font-medium uppercase tracking-wider">
                      Skin Analyzer
                    </p>
                    <p className="text-white text-sm font-semibold">Primera consulta gratis</p>
                  </div>
                  <Link
                    href="/agendar"
                    className="shrink-0 bg-primary text-white text-[11px] font-bold px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Agendar
                  </Link>
                </motion.div>
              </div>

              {/* Floating stat — left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 top-1/4 glass rounded-2xl px-5 py-4 shadow-premium border border-white/80"
              >
                <div className="text-2xl font-display font-extrabold text-foreground">5,000+</div>
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
                <div className="text-xl font-display font-extrabold text-foreground">4.9 / 5</div>
                <div className="text-xs text-muted-foreground font-medium">Google Reviews</div>
              </motion.div>

              {/* Availability chip */}
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
              <div className="font-display text-3xl font-extrabold text-foreground tracking-tight">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

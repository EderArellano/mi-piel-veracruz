"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "5,000+", label: "Clientes satisfechos" },
  { value: "98%", label: "Tasa de satisfacción" },
  { value: "8 años", label: "De experiencia" },
];

const features = [
  "Tecnología láser de última generación",
  "Resultados permanentes desde la 1ª sesión",
  "Apta para todo tipo de piel",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-brand pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-amber-400/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose-100/30 blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-white border border-rose-100 px-4 py-2 shadow-sm mb-6"
            >
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-primary" />
              </div>
              <span className="text-xs font-semibold text-foreground">
                #1 Clínica de Depilación Láser en Veracruz
              </span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground mb-6"
            >
              Depilación Láser{" "}
              <span className="text-gradient font-display italic">Premium</span>
              <br />
              en Veracruz
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Olvídate del vello para siempre. Tecnología láser de última generación con resultados
              permanentes, seguros y efectivos para todo tipo de piel.
            </motion.p>

            {/* Features list */}
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
              <Button asChild size="xl" variant="premium">
                <Link href="/agendar">
                  Agendar mi cita
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/servicios">Ver servicios y precios</Link>
              </Button>
            </motion.div>

            {/* Trust note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-xs text-muted-foreground mt-4"
            >
              Primera consulta gratis · Sin compromisos · Resultados garantizados
            </motion.p>
          </div>

          {/* Right: Visual card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            {/* Main card */}
            <div className="relative w-full max-w-md">
              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-rose-100 to-pink-50 aspect-[4/5] shadow-premium-lg border border-rose-100">
                {/* Placeholder for hero image */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 rounded-full bg-white shadow-premium mx-auto flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-primary">Mi Piel Veracruz</p>
                    <p className="text-xs text-muted-foreground">Aquí va tu foto hero</p>
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-6 top-1/4 glass rounded-2xl px-5 py-4 shadow-premium border border-white/80"
              >
                <div className="text-2xl font-bold text-foreground">5,000+</div>
                <div className="text-xs text-muted-foreground font-medium">Clientes felices</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-6 bottom-1/4 glass rounded-2xl px-5 py-4 shadow-premium border border-white/80"
              >
                <div className="text-2xl font-bold text-foreground">98%</div>
                <div className="text-xs text-muted-foreground font-medium">Satisfacción</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-3 gap-6 rounded-3xl bg-white border border-border/50 shadow-card p-8"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-foreground tracking-tight">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

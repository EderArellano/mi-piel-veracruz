"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Clock, Heart, Leaf, Award } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Resultados desde la 1ª sesión",
    description: "Notarás una reducción significativa del vello desde tu primera sesión de tratamiento.",
    color: "text-primary",
    bg: "bg-primary/8",
  },
  {
    icon: Shield,
    title: "100% seguro y certificado",
    description: "Tecnología láser médica certificada. Procedimiento realizado por especialistas capacitados.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: Clock,
    title: "Permanente y definitivo",
    description: "Di adiós al vello para siempre. Resultados permanentes que duran toda la vida.",
    color: "text-primary",
    bg: "bg-secondary",
  },
  {
    icon: Heart,
    title: "Apto para piel sensible",
    description: "Tecnología adaptada a todo tipo de piel, incluyendo pieles sensibles y más oscuras.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Leaf,
    title: "Sin efectos secundarios",
    description: "Procedimiento no invasivo, sin dolor significativo y sin tiempo de recuperación.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: Award,
    title: "Especialistas certificados",
    description: "Nuestro equipo cuenta con certificación internacional en tecnología láser médica.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-24 bg-muted/30" id="beneficios">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="badge-premium mb-4">✦ ¿Por qué elegirnos?</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Los{" "}
            <span className="text-gradient font-display italic">beneficios</span>{" "}
            de elegir Mi Piel
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Más que una clínica, somos tu aliado en el camino hacia una piel perfecta y libre
            de vello para siempre.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-premium p-7 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className={`w-12 h-12 rounded-2xl ${benefit.bg} flex items-center justify-center mb-5`}>
                <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
              </div>
              <h3 className="font-bold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

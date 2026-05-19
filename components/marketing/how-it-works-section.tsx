"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Agenda tu consulta",
    description: "Reserva tu valoración inicial gratuita en línea o por teléfono. Te atendemos en menos de 24 horas.",
  },
  {
    number: "02",
    title: "Valoración personalizada",
    description: "Una especialista evalúa tu tipo de piel, tono y vello para diseñar tu plan de tratamiento ideal.",
  },
  {
    number: "03",
    title: "Tus sesiones de láser",
    description: "Realizamos tus sesiones con la tecnología láser más avanzada. Cada sesión dura entre 15–60 minutos.",
  },
  {
    number: "04",
    title: "Piel perfecta para siempre",
    description: "Disfruta de una piel suave y libre de vello de forma permanente. Seguimiento incluido.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-white" id="como-funciona">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="badge-premium mb-4">✦ Proceso</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              ¿Cómo funciona la{" "}
              <span className="text-gradient font-display italic">depilación láser?</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              El proceso es sencillo, seguro y diseñado para que obtengas los mejores resultados con
              la máxima comodidad. Nuestras especialistas te acompañan en cada paso.
            </p>
            <Button asChild variant="premium" size="lg">
              <Link href="/agendar">
                Comenzar ahora
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Right: Steps */}
          <div className="space-y-5">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5 p-6 rounded-2xl hover:bg-muted/50 transition-colors duration-200"
              >
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{step.number}</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

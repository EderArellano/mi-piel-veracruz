"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const cases = [
  { zone: "Axilas", sessions: "6 sesiones", reduction: "95%" },
  { zone: "Piernas", sessions: "8 sesiones", reduction: "90%" },
  { zone: "Bikini", sessions: "10 sesiones", reduction: "92%" },
  { zone: "Facial", sessions: "8 sesiones", reduction: "88%" },
];

export function BeforeAfterSection() {
  return (
    <section className="py-24 bg-white" id="antes-despues">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="badge-premium mb-4">✦ Resultados reales</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Antes y{" "}
            <span className="text-gradient font-display italic">después</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Resultados reales de nuestras clientes. La depilación láser transforma tu piel de
            forma permanente y visible.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl overflow-hidden border border-border/50 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              {/* Before/After image placeholder */}
              <div className="aspect-[3/4] bg-gradient-to-br from-sky-50 to-primary/8 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm mx-auto flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground">Foto {c.zone}</p>
                    <p className="text-xs text-muted-foreground">Antes / Después</p>
                  </div>
                </div>
                {/* Labels */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between">
                  <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full text-muted-foreground">
                    Antes
                  </span>
                  <span className="bg-primary/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full text-white">
                    Después
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 bg-white">
                <h3 className="font-bold text-foreground">{c.zone}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{c.sessions}</span>
                  <span className="text-sm font-bold text-primary">{c.reduction} reducción</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground">
          * Los resultados pueden variar según el tipo de piel, color de vello y zona tratada.
          Fotos de clientes reales con consentimiento.
        </p>
      </div>
    </section>
  );
}

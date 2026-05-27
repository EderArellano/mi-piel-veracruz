"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-24 bg-foreground relative overflow-hidden">
      {/* Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-white/80 font-medium">Primera consulta gratis</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Comienza tu transformación{" "}
            <span className="text-gradient font-display italic">hoy</span>
          </h2>

          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            Únete a más de 5,000 personas que ya disfrutan de una piel suave y libre de vello para
            siempre. Agenda tu consulta gratuita ahora.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="xl" variant="premium">
              <Link href="/agendar">
                Agendar mi consulta gratis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
            >
              <Link href="/servicios">Ver todos los servicios</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-8 text-white/50 text-sm">
            <span>✓ Sin compromisos</span>
            <span>✓ Precios transparentes</span>
            <span>✓ Resultados garantizados</span>
            <span>✓ Especialistas certificadas</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

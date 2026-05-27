"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    id: "depilacion",
    title: "Depilación Láser",
    description: "Láser diodo grado médico para una piel suave, clara y libre de vello. Resultados permanentes desde la primera sesión para todo tipo de piel.",
    price: "Desde $500",
    sessions: "6–8 sesiones",
    href: "/precios",
    icon: "✨",
    popular: true,
    badge: "⭐ Más popular",
    gradient: "from-sky-50 to-primary/5",
    iconBg: "bg-primary/10",
  },
  {
    id: "hidrofacial",
    title: "Hidrofacial",
    description: "Revitalizamos tu rostro hidratando y rejuveneciendo. Limpieza profunda, exfoliación y nutrición en un solo tratamiento sin tiempo de recuperación.",
    price: "Desde $800",
    sessions: "Sesión única",
    href: "/agendar",
    icon: "💧",
    popular: false,
    gradient: "from-cyan-50 to-sky-50",
    iconBg: "bg-cyan-100",
  },
  {
    id: "celluma",
    title: "Celluma LED",
    description: "Fototerapia grado médico que mejora la salud y aspecto de tu piel. Estimula el colágeno, reduce imperfecciones y retrasa el envejecimiento.",
    price: "Desde $600",
    sessions: "Por sesión",
    href: "/agendar",
    icon: "💡",
    popular: false,
    gradient: "from-teal-50 to-sky-50",
    iconBg: "bg-teal-100",
  },
  {
    id: "skin-analyzer",
    title: "Skin Analyzer",
    description: "Analizamos tu piel con tecnología de vanguardia para brindarte un tratamiento 100% personalizado. Sin costo, sin compromiso.",
    price: "GRATIS",
    sessions: "Primera consulta",
    href: "/agendar",
    icon: "🔬",
    popular: false,
    badge: "✓ Gratis",
    gradient: "from-emerald-50 to-teal-50",
    iconBg: "bg-emerald-100",
  },
  {
    id: "skin-care",
    title: "Skin Care",
    description: "Productos personalizados recomendados por nuestros especialistas para mantener tu piel radiante y saludable entre sesiones.",
    price: "Consultar",
    sessions: "Uso diario",
    href: "/agendar",
    icon: "🌿",
    popular: false,
    gradient: "from-blue-50 to-sky-50",
    iconBg: "bg-blue-100",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ServicesSection() {
  return (
    <section className="py-24 bg-white bg-hexpattern" id="servicios">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge-premium mb-4">✦ Conoce nuestros servicios</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Todo lo que tu piel{" "}
            <span className="text-gradient font-display italic">necesita</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Desde depilación láser grado médico hasta hidrofacial y fototerapia Celluma.
            Tratamientos especializados con tecnología de vanguardia.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Link href={service.href} className="block group h-full">
                <div
                  className={`relative h-full rounded-3xl bg-gradient-to-br ${service.gradient} border border-border/40 p-7
                  hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
                >
                  {"badge" in service && service.badge && (
                    <div className="absolute -top-3 left-6">
                      <Badge variant="premium" className="text-xs">
                        {service.badge}
                      </Badge>
                    </div>
                  )}

                  <div
                    className={`w-12 h-12 rounded-2xl ${service.iconBg} flex items-center justify-center text-2xl mb-5`}
                  >
                    {service.icon}
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-xl font-bold text-foreground">{service.price}</div>
                      <div className="text-xs text-muted-foreground">{service.sessions}</div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild variant="premium" size="lg">
            <Link href="/agendar">
              Agendar mi sesión ahora
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Primera consulta sin costo · Valoración personalizada
          </p>
        </div>
      </div>
    </section>
  );
}

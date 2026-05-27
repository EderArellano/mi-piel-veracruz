"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    id: "facial",
    title: "Depilación Facial",
    description: "Labio, mentón, patillas, cejas y más. Resultados suaves y precisos.",
    price: "Desde $499",
    sessions: "6–8 sesiones",
    href: "/servicios/facial",
    icon: "✨",
    popular: false,
    gradient: "from-sky-50 to-primary/5",
    iconBg: "bg-primary/10",
  },
  {
    id: "piernas",
    title: "Depilación Piernas",
    description: "Piernas completas, medias piernas o muslos. Piel suave y sin esfuerzo.",
    price: "Desde $899",
    sessions: "6–8 sesiones",
    href: "/servicios/piernas",
    icon: "🦵",
    popular: false,
    gradient: "from-teal-50 to-sky-50",
    iconBg: "bg-teal-100",
  },
  {
    id: "axilas",
    title: "Depilación Axilas",
    description: "El área más popular. Rápido, efectivo y sin manchas oscuras.",
    price: "Desde $399",
    sessions: "6–8 sesiones",
    href: "/servicios/axilas",
    icon: "💎",
    popular: true,
    gradient: "from-violet-50 to-purple-50",
    iconBg: "bg-violet-100",
  },
  {
    id: "bikini",
    title: "Depilación Bikini",
    description: "Línea de bikini, bikini completo o brasileño. Discreta y efectiva.",
    price: "Desde $599",
    sessions: "6–10 sesiones",
    href: "/servicios/bikini",
    icon: "🌸",
    popular: false,
    gradient: "from-cyan-50 to-sky-50",
    iconBg: "bg-cyan-100",
  },
  {
    id: "cuerpo-completo",
    title: "Cuerpo Completo",
    description: "Paquete integral para máximo resultado. ¡El más solicitado!",
    price: "Desde $2,499",
    sessions: "6–10 sesiones",
    href: "/servicios/cuerpo-completo",
    icon: "⭐",
    popular: true,
    gradient: "from-emerald-50 to-teal-50",
    iconBg: "bg-emerald-100",
  },
  {
    id: "hombres",
    title: "Depilación Hombres",
    description: "Espalda, pecho, hombros, barba y más. Para hombres modernos.",
    price: "Desde $699",
    sessions: "6–8 sesiones",
    href: "/servicios/hombres",
    icon: "🧔",
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
    <section className="py-24 bg-white" id="servicios">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge-premium mb-4">✦ Nuestros Servicios</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Depilación láser para{" "}
            <span className="text-gradient font-display italic">cada zona</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tecnología láser Alexandrita y Diodo de última generación. Resultados permanentes,
            seguros y efectivos desde la primera sesión.
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
                  {service.popular && (
                    <div className="absolute -top-3 left-6">
                      <Badge variant="premium" className="text-xs">
                        ⭐ Más popular
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

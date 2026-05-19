"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "¿Cuánto cuesta la depilación láser en Veracruz?",
    answer:
      "Los precios varían según la zona a tratar. En Mi Piel Veracruz los precios comienzan desde $399 para axilas, $499 para facial, $599 para bikini, $899 para piernas y $2,499 para cuerpo completo. Ofrecemos planes de pago y paquetes con descuento. La primera consulta es gratuita.",
  },
  {
    question: "¿Cuántas sesiones de depilación láser necesito?",
    answer:
      "El número de sesiones varía según la zona, tipo de piel y color del vello. En promedio se requieren entre 6 y 10 sesiones espaciadas cada 4–8 semanas. Durante tu consulta inicial, nuestra especialista evaluará tu caso y te dará un plan personalizado.",
  },
  {
    question: "¿Duele la depilación láser?",
    answer:
      "La sensación es mínima. La mayoría de nuestros clientes describen la sensación como un leve chasquido o calor tolerable. Nuestra tecnología cuenta con sistema de enfriamiento integrado que hace el tratamiento mucho más cómodo. Las zonas más sensibles pueden requerir crema anestésica.",
  },
  {
    question: "¿La depilación láser es segura para todo tipo de piel?",
    answer:
      "Sí. Contamos con tecnología láser Alexandrita y Diodo que se adapta a todos los fototipos de piel, incluyendo pieles morenas y sensibles. Realizamos una prueba de parche previa para garantizar la seguridad del tratamiento en tu tipo de piel específico.",
  },
  {
    question: "¿Cuáles son los cuidados después de la depilación láser?",
    answer:
      "Los cuidados post-tratamiento son simples: evitar el sol directo por 48–72 horas, no usar desodorante en axilas por 24 horas, aplicar gel de aloe vera si hay sensación de calor, no exfoliar la zona por 48 horas y evitar piscinas o vapor por 24 horas. Te entregamos una guía completa de cuidados.",
  },
  {
    question: "¿Cuándo veré resultados de la depilación láser?",
    answer:
      "Los primeros resultados son visibles después de la primera sesión. El vello comienza a caer entre 1–3 semanas después del tratamiento. Con cada sesión sucesiva, la reducción del vello es mayor. Después del ciclo completo de sesiones, la mayoría de los clientes logran una reducción permanente del 85–95%.",
  },
  {
    question: "¿Puedo hacerme láser si tengo piel sensible o acné?",
    answer:
      "Sí, la depilación láser es apta para pieles sensibles. De hecho, muchos clientes con acné reportan mejoría en su piel tras el tratamiento. Evaluamos cada caso individualmente y ajustamos los parámetros del láser según las necesidades específicas de tu piel.",
  },
  {
    question: "¿Cuánto tiempo dura cada sesión de depilación láser?",
    answer:
      "La duración varía según la zona. Axilas: 10–15 minutos. Facial: 15–20 minutos. Bikini: 20–30 minutos. Piernas completas: 45–60 minutos. Cuerpo completo: 90–120 minutos. Podrás reanudar tus actividades normales inmediatamente después.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-muted/30" id="preguntas-frecuentes">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="badge-premium mb-4">✦ Preguntas frecuentes</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Todo lo que necesitas{" "}
            <span className="text-gradient font-display italic">saber</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Resolvemos tus dudas sobre la depilación láser en Veracruz. Si tienes más preguntas,
            contáctanos.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="card-premium overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors"
              >
                <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                <span className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {openIndex === i ? (
                    <Minus className="w-4 h-4 text-primary" />
                  ) : (
                    <Plus className="w-4 h-4 text-primary" />
                  )}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed text-sm">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Schema FAQ markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}

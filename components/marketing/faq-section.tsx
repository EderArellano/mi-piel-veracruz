"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "¿Cuánto cuesta la depilación láser en Veracruz?",
    answer:
      "Los precios comienzan desde $500 MXN por sesión. Axilas $600, Facial $500, Bikini $800–$1,000, Pierna completa $1,200, Cuerpo completo $4,500. La primera consulta con Skin Analyzer es completamente gratis. Ofrecemos planes de pago y paquetes con descuento.",
  },
  {
    question: "¿Cuántas sesiones de depilación láser necesito?",
    answer:
      "En promedio entre 6 y 8 sesiones espaciadas cada 4–8 semanas. Durante tu consulta inicial, nuestra especialista evaluará tu tipo de piel y vello para darte un plan exacto y personalizado. La mayoría logran resultados permanentes del 85–95%.",
  },
  {
    question: "¿Duele la depilación láser?",
    answer:
      "La sensación es mínima. La mayoría de nuestras pacientes lo describen como un leve chasquido tolerable. Nuestra tecnología Diodo cuenta con sistema de enfriamiento integrado que hace el tratamiento mucho más cómodo, especialmente en zonas sensibles.",
  },
  {
    question: "¿La depilación láser es segura para pieles morenas?",
    answer:
      "Sí. Contamos con tecnología láser Diodo especialmente efectiva para pieles morenas (fototipos III–VI comunes en Veracruz). Realizamos una prueba de parche previa y ajustamos todos los parámetros para garantizar seguridad y resultados óptimos.",
  },
  {
    question: "¿Qué cuidados necesito después del tratamiento?",
    answer:
      "Son muy simples: evitar sol directo por 48–72 horas, aplicar gel de aloe vera si hay sensación de calor, no exfoliar la zona por 48 horas y evitar albercas o vapor por 24 horas. Te entregamos una guía completa de cuidados en cada sesión.",
  },
  {
    question: "¿Cuándo veo los primeros resultados?",
    answer:
      "Los primeros resultados son visibles después de la primera sesión. El vello comienza a caer entre 1–3 semanas. Con cada sesión la reducción es mayor. Después del ciclo completo la mayoría logra reducción permanente del 85–95%.",
  },
  {
    question: "¿El Hidrofacial y Celluma LED son aptos para toda edad?",
    answer:
      "Sí, desde los 18 años. El Hidrofacial es ideal para poros tapados, manchas y piel sin brillo — muy común por la humedad de Veracruz. Celluma LED estimula colágeno y reduce acné. Ambos son no invasivos y sin tiempo de recuperación.",
  },
  {
    question: "¿Cuánto dura cada sesión?",
    answer:
      "Varía por zona: Axilas 10–15 min, Facial 15–20 min, Bikini 20–30 min, Piernas completas 45–60 min, Cuerpo completo 90–120 min. Puedes reanudar tus actividades normales inmediatamente después de cada sesión.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".faq-header", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".faq-header", start: "top 85%" },
      });

      gsap.from(".faq-item", {
        y: 14,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: { trigger: ".faq-list", start: "top 82%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="preguntas-frecuentes" className="py-14 md:py-20 bg-hexpattern-warm">
      <div className="section-container">
        <div className="faq-header text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-5">
            <span className="w-10 h-px bg-primary/40" />
            Preguntas frecuentes
            <span className="w-10 h-px bg-primary/40" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Todo lo que necesitas{" "}
            <span className="text-gradient">saber</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Resolvemos tus dudas sobre depilación láser y tratamientos faciales en Veracruz.
          </p>
        </div>

        <div className="faq-list max-w-3xl mx-auto space-y-2.5">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="faq-item rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-colors duration-200 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left group"
              >
                <span className="font-semibold text-gray-700 group-hover:text-gray-900 text-sm leading-snug pr-4 transition-colors">
                  {faq.question}
                </span>
                <span className="shrink-0 w-7 h-7 rounded-full bg-gray-100 group-hover:bg-primary/10 border border-gray-200 flex items-center justify-center transition-colors duration-200">
                  {openIndex === i ? (
                    <Minus className="w-3.5 h-3.5 text-primary" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary transition-colors" />
                  )}
                </span>
              </button>

              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: openIndex === i ? "400px" : "0" }}
              >
                <div className="px-5 pb-5">
                  <div className="w-full h-px bg-gray-100 mb-4" />
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}

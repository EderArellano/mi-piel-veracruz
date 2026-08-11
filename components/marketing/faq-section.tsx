"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";

const faqs = [
  // ── Precio / Costo ──────────────────────────────────────────────────────
  {
    question: "¿Cuánto cuesta la depilación láser en Veracruz y Boca del Río?",
    answer:
      "Los precios en Mi Piel Centro Dermocosmético comienzan desde $500 MXN por sesión. Axilas desde $600, Facial desde $500, Bikini línea $700, Bikini brasileño $900, Pierna completa desde $1,200, Espalda desde $1,200, Cuerpo completo desde $4,500. Ofrecemos paquetes de 6 sesiones con hasta 20% de descuento y planes de pago a 12 MSI. La primera consulta con Skin Analyzer es completamente gratis y sin compromiso.",
  },
  // ── Sesiones ────────────────────────────────────────────────────────────
  {
    question: "¿Cuántas sesiones de depilación láser necesito para resultados permanentes?",
    answer:
      "En promedio entre 6 y 8 sesiones, espaciadas cada 4 a 8 semanas según el ciclo capilar de cada zona. Axilas y bikini suelen necesitar 6 sesiones; piernas y espalda, 6 a 8. Durante tu consulta inicial gratuita en nuestra clínica de Boca del Río, evaluamos tu tipo de piel (fototipo de Fitzpatrick) y el grosor del vello para darte un plan exacto y personalizado. La mayoría de nuestros pacientes logra reducción permanente del 85 al 95% después del ciclo completo.",
  },
  // ── Dolor ───────────────────────────────────────────────────────────────
  {
    question: "¿Duele la depilación láser? ¿Puedo ir en mi hora de comida?",
    answer:
      "La sensación es mínima: la mayoría de nuestras pacientes lo describe como un leve chasquido o calor pasajero. Nuestro equipo láser Diodo cuenta con sistema de crioenfriamiento integrado que hace el tratamiento muy cómodo, especialmente en zonas sensibles como bikini o facial. Las sesiones son rápidas — axilas en 10-15 min, facial 15-20 min, piernas completas 45-60 min — por lo que sí puedes venir en tu descanso y reanudar actividades de inmediato.",
  },
  // ── Piel morena ─────────────────────────────────────────────────────────
  {
    question: "¿La depilación láser es segura para pieles morenas como las de Veracruz?",
    answer:
      "Absolutamente. Mi Piel cuenta con tecnología Láser Diodo especialmente calibrada para fototipos III al VI, que son los más comunes en Veracruz y el sureste de México. A diferencia del láser Alejandrita (que favorece pieles claras), el Diodo penetra con seguridad en piel morena y trigueña. Realizamos prueba de parche en la primera visita y ajustamos los parámetros de energía individualmente para garantizar eficacia y cero quemaduras.",
  },
  // ── Primeros resultados ──────────────────────────────────────────────────
  {
    question: "¿Cuándo veo los primeros resultados de la depilación láser?",
    answer:
      "Resultados visibles desde la primera semana: el vello tratado comienza a caer entre 7 y 21 días después de la sesión. Con cada sesión la reducción es acumulativa. A partir de la tercera sesión la mayoría de nuestros pacientes nota una reducción del 50-60%, y al completar el ciclo de 6-8 sesiones en nuestra clínica de Boca del Río, los resultados suelen ser permanentes en el 85-95% de la zona tratada.",
  },
  // ── Zonas disponibles ────────────────────────────────────────────────────
  {
    question: "¿Qué zonas puedo depilar con láser en Mi Piel Veracruz?",
    answer:
      "Tratamos todas las zonas del cuerpo: axilas, bikini línea, bikini brasileño, labio superior, mentón, patillas, facial completo, piernas (media pierna, pierna completa), muslos, brazos, espalda, abdomen, pecho, glúteos y cuerpo completo. También atendemos depilación láser para hombres en espalda, hombros, pecho y cuello. Con nuestro armador de paquetes puedes combinar zonas y obtener hasta 20% de descuento.",
  },
  // ── Cuidados post-tratamiento ────────────────────────────────────────────
  {
    question: "¿Qué cuidados necesito después de cada sesión de láser?",
    answer:
      "Son muy simples y compatibles con el día a día: evitar exposición solar directa en la zona tratada por 48-72 horas (usa protector solar SPF 50), aplicar gel de aloe vera si sientes calor o enrojecimiento, no exfoliar la zona por 48 horas, y evitar albercas, vapor o sauna por 24 horas. En cada sesión te entregamos una guía impresa de cuidados adaptada al clima cálido y húmedo de Veracruz.",
  },
  // ── Hidrofacial ─────────────────────────────────────────────────────────
  {
    question: "¿Qué es el Hidrofacial y para qué tipo de piel es ideal en Veracruz?",
    answer:
      "El Hidrofacial es un tratamiento de limpieza facial profunda que en un solo paso realiza exfoliación, extracción de impurezas e hidratación intensa. Es ideal para el clima cálido-húmedo de Veracruz, donde la piel tiende a producir más grasa, tener poros dilatados y acumular daño solar. El resultado es inmediato: piel más luminosa, poros visiblemente reducidos y textura suavizada. No tiene tiempo de recuperación y la sesión dura aproximadamente 60 minutos. Recomendamos una sesión mensual de mantenimiento.",
  },
  // ── Celluma LED ─────────────────────────────────────────────────────────
  {
    question: "¿Para qué sirve la Fototerapia Celluma LED y quién es candidato?",
    answer:
      "Celluma LED es un dispositivo de fototerapia de espectro médico (luz roja, infrarroja y azul) aprobado por la FDA que estimula la producción de colágeno, reduce inflamación, combate el acné activo y revierte el daño solar acumulado. Es apto desde los 18 años, no invasivo y sin tiempo de recuperación. En Veracruz es especialmente popular para tratar manchas de sol, acné hormonal y para potenciar los resultados de la depilación láser. Se puede combinar en la misma sesión con Hidrofacial.",
  },
  // ── Skin Analyzer ────────────────────────────────────────────────────────
  {
    question: "¿En qué consiste el Skin Analyzer que ofrecen gratis?",
    answer:
      "El Skin Analyzer es nuestra consulta inicial gratuita que usa tecnología de imágenes clínicas para detectar, incluso bajo la superficie de la piel, problemas como: daño solar, tamaño de poros, nivel de hidratación, distribución de melanina y manchas no visibles a simple vista. Con esa información, nuestra especialista diseña un plan de tratamiento 100% personalizado para tu tipo de piel veracruzana. La consulta dura 30-45 minutos, no duele y es completamente sin compromiso de compra.",
  },
  // ── Hombres ─────────────────────────────────────────────────────────────
  {
    question: "¿Atienden a hombres? ¿Cuáles son los tratamientos más solicitados?",
    answer:
      "Sí, atendemos a hombres con los mismos protocolos y tecnología. Los tratamientos más solicitados por hombres en nuestra clínica de Boca del Río son: depilación láser de espalda, hombros, cuello (zona barba y entradas), pecho, y axilas. También Hidrofacial para piel grasa con poros dilatados, y Celluma LED para acné. Contamos con horarios en la tarde-noche para mayor comodidad.",
  },
  // ── Diferenciación ───────────────────────────────────────────────────────
  {
    question: "¿Por qué elegir Mi Piel y no otra clínica de depilación láser en Veracruz?",
    answer:
      "Tres razones clave: (1) Tecnología — usamos Láser Diodo grado médico con enfriamiento dinámico, no equipos de uso estético general. (2) Especialización — 8 años exclusivamente en tratamientos de piel en la zona veracruzana; conocemos los fototipos locales. (3) Transparencia — el precio cotizado es el precio final, sin cargos ocultos, y ofrecemos la primera consulta con Skin Analyzer sin costo para que tomes la decisión informada. +5,000 pacientes en Veracruz, Boca del Río y Medellín avalan nuestros resultados.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".faq-header", {
        y: 20, opacity: 0, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: ".faq-header", start: "top 85%" },
      });
      gsap.from(".faq-item", {
        y: 14, opacity: 0, stagger: 0.04, duration: 0.4, ease: "power2.out",
        scrollTrigger: { trigger: ".faq-list", start: "top 82%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="preguntas-frecuentes" className="py-14 md:py-20 bg-[#FAFAF8]">
      <div className="section-container">
        <div className="faq-header text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-3 text-[#2596be] text-xs font-bold uppercase tracking-[0.2em] mb-5">
            <span className="w-10 h-px bg-[#2596be]/40" />
            Preguntas frecuentes
            <span className="w-10 h-px bg-[#2596be]/40" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[#2B2B2B] leading-tight mb-4">
            Todo lo que necesitas{" "}
            <span style={{ background: "linear-gradient(135deg,#2596be,#C8A96A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              saber
            </span>
          </h2>
          <p className="text-[#6B6B6B] text-lg max-w-2xl mx-auto">
            Resolvemos tus dudas sobre depilación láser, hidrofacial y tratamientos de piel
            en Veracruz y Boca del Río.
          </p>
        </div>

        {/* Two-column layout on desktop */}
        <div className="faq-list max-w-5xl mx-auto grid md:grid-cols-2 gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="faq-item rounded-2xl bg-white border border-[#E7E3DC] hover:border-[#C8A96A]/40 transition-colors duration-200 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left group"
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-[#2B2B2B] group-hover:text-[#2596be] text-sm leading-snug pr-4 transition-colors">
                  {faq.question}
                </span>
                <span className="shrink-0 w-7 h-7 rounded-full bg-[#F4F2EE] group-hover:bg-[#2596be]/10 border border-[#E7E3DC] flex items-center justify-center transition-colors duration-200">
                  {openIndex === i
                    ? <Minus className="w-3.5 h-3.5 text-[#2596be]" />
                    : <Plus className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#2596be] transition-colors" />
                  }
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: openIndex === i ? "500px" : "0" }}
              >
                <div className="px-5 pb-5">
                  <div className="w-full h-px bg-[#E7E3DC] mb-4" />
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQPage structured data */}
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

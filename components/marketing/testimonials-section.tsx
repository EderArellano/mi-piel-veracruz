"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Valentina R.",
    location: "Boca del Río",
    rating: 5,
    text: "Después de años de cera, finalmente tomé la decisión de hacerme láser aquí. Los resultados son increíbles desde la primera sesión. El personal es muy profesional.",
    service: "Piernas completas",
    sessions: 6,
    initial: "V",
    color: "#2596be",
  },
  {
    name: "Daniela M.",
    location: "Veracruz Centro",
    rating: 5,
    text: "Las chicas son muy amables y me explicaron todo el proceso. Tenía miedo de que doliera pero fue muy tolerable. Ya van 4 sesiones y mi piel está perfecta. ¡Lo recomiendo!",
    service: "Bikini brasileño + Axilas",
    sessions: 4,
    initial: "D",
    color: "#0891b2",
  },
  {
    name: "Sofía L.",
    location: "Xalapa, Veracruz",
    rating: 5,
    text: "Vine desde Xalapa y valió completamente la pena. La tecnología es de lo mejor. Mi piel está increíblemente suave y sin irritaciones. Primera consulta fue gratis.",
    service: "Cuerpo completo",
    sessions: 5,
    initial: "S",
    color: "#059669",
  },
  {
    name: "Andrea K.",
    location: "Boca del Río",
    rating: 5,
    text: "Tengo piel morena y siempre tuve miedo del láser. Aquí me explicaron que su tecnología es apta para mi tipo de piel. El resultado es excelente, nada de manchas.",
    service: "Facial + Axilas",
    sessions: 8,
    initial: "A",
    color: "#c9a96e",
  },
  {
    name: "Carlos V.",
    location: "Veracruz",
    rating: 5,
    text: "Como hombre dudé mucho en venir, pero el trato es muy profesional y discreto. Me hice la espalda y el pecho. Los resultados son perfectos y el ambiente es muy cómodo.",
    service: "Espalda y pecho",
    sessions: 7,
    initial: "C",
    color: "#7c3aed",
  },
  {
    name: "Mariana P.",
    location: "Boca del Río",
    rating: 5,
    text: "El sistema de citas en línea es muy fácil. Me mandaron recordatorio por correo y la atención fue puntual. El precio es muy justo para la calidad del servicio.",
    service: "Axilas + Bikini",
    sessions: 3,
    initial: "M",
    color: "#9b7b5b",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".test-header", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".test-header", start: "top 85%" },
      });

      gsap.from(".test-card", {
        y: 22,
        opacity: 0,
        stagger: 0.07,
        duration: 0.45,
        ease: "power2.out",
        scrollTrigger: { trigger: ".test-grid", start: "top 82%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testimonios" className="py-14 md:py-20 bg-brand-hex overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="test-header text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-5">
            <span className="w-10 h-px bg-primary/40" />
            Testimonios reales
            <span className="w-10 h-px bg-primary/40" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Lo que dicen nuestras{" "}
            <span className="text-gradient">pacientes</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-5">
            Más de 5,000 personas en Veracruz ya confían en MiPiel.
          </p>
          <div className="inline-flex items-center gap-2.5 bg-white border border-gray-200 shadow-sm rounded-full px-5 py-2.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-gray-900 font-bold text-sm">4.9</span>
            <span className="text-gray-400 text-sm">/ 5.0 · 49 reseñas en Google</span>
          </div>
        </div>

        {/* Grid */}
        <div className="test-grid grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="test-card relative rounded-2xl p-6 bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Top */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-gray-200" />
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold"
                  style={{ background: `${t.color}20`, border: `1px solid ${t.color}40`, color: t.color }}
                >
                  {t.initial}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-400 truncate">
                    {t.location} · {t.service} · {t.sessions} ses.
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

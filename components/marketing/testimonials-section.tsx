"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Valentina R.",
    location: "Boca del Río",
    rating: 5,
    text: "Después de años de depilarme con cera, finalmente tomé la decisión de hacerme láser aquí. Los resultados son increíbles desde la primera sesión. El personal es muy profesional y el lugar es súper limpio y bonito.",
    service: "Piernas completas",
    sessions: 6,
  },
  {
    name: "Daniela M.",
    location: "Veracruz Centro",
    rating: 5,
    text: "Las chicas son muy amables y me explicaron todo el proceso. Tenía miedo de que doliera pero fue muy tolerable. Ya van 4 sesiones y mi piel está perfecta. ¡Lo recomiendo al 100%!",
    service: "Bikini brasileño + Axilas",
    sessions: 4,
  },
  {
    name: "Sofía L.",
    location: "Xalapa, Veracruz",
    rating: 5,
    text: "Vine desde Xalapa y valió completamente la pena. La tecnología que tienen es de lo mejor que he probado. Mi piel está increíblemente suave y sin irritaciones. Primera consulta fue gratis.",
    service: "Cuerpo completo",
    sessions: 5,
  },
  {
    name: "Andrea K.",
    location: "Boca del Río",
    rating: 5,
    text: "Tengo piel morena y siempre tuve miedo de hacerme láser. Aquí me explicaron que su tecnología es apta para mi tipo de piel. El resultado es excelente, nada de manchas ni irritaciones.",
    service: "Facial + Axilas",
    sessions: 8,
  },
  {
    name: "Carlos V.",
    location: "Veracruz",
    rating: 5,
    text: "Como hombre dudé mucho en venir, pero el trato es muy profesional y discreto. Me hice la espalda y el pecho. Los resultados son perfectos y el ambiente es muy cómodo.",
    service: "Espalda y pecho",
    sessions: 7,
  },
  {
    name: "Mariana P.",
    location: "Boca del Río",
    rating: 5,
    text: "El sistema de citas en línea es súper fácil de usar. Me mandaron recordatorio por correo y la atención fue puntual. El precio es muy justo para la calidad del servicio.",
    service: "Axilas + Bikini",
    sessions: 3,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-brand" id="testimonios">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="badge-premium mb-4">✦ Testimonios</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Lo que dicen nuestras{" "}
            <span className="text-gradient font-display italic">clientas</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Más de 5,000 personas ya confían en Mi Piel Veracruz
          </p>
          {/* Stars average */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-foreground">4.9</span>
            <span className="text-muted-foreground text-sm">/ 5.0 · 847 reseñas</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-premium p-7 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-primary/30" />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-border/50">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-rose-400 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.location} · {t.service} · {t.sessions} sesiones
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

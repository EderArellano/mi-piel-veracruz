"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Star, ArrowRight, ArrowLeft } from "lucide-react";

const REVIEWS = [
  {
    name: "Valentina R.",
    location: "Boca del Río",
    initial: "V",
    color: "#2596be",
    rating: 5,
    date: "hace 2 semanas",
    service: "Piernas completas",
    text: "Después de años de cera, finalmente tomé la decisión de hacerme láser aquí. Los resultados son increíbles desde la primera sesión. El personal es muy profesional y el ambiente muy cómodo.",
  },
  {
    name: "Daniela M.",
    location: "Veracruz Centro",
    initial: "D",
    color: "#0891b2",
    rating: 5,
    date: "hace 1 mes",
    service: "Bikini brasileño + Axilas",
    text: "Las chicas son muy amables y me explicaron todo el proceso. Tenía miedo de que doliera pero fue muy tolerable. Ya van 4 sesiones y mi piel está perfecta. ¡Lo recomiendo completamente!",
  },
  {
    name: "Sofía L.",
    location: "Xalapa, Veracruz",
    initial: "S",
    color: "#059669",
    rating: 5,
    date: "hace 3 semanas",
    service: "Cuerpo completo",
    text: "Vine desde Xalapa y valió completamente la pena. La tecnología es de lo mejor. Mi piel está increíblemente suave y sin irritaciones. La primera consulta fue gratis y eso me convenció.",
  },
  {
    name: "Andrea K.",
    location: "Boca del Río",
    initial: "A",
    color: "#c9a96e",
    rating: 5,
    date: "hace 2 meses",
    service: "Facial + Axilas",
    text: "Tengo piel morena y siempre tuve miedo del láser. Aquí me explicaron que su tecnología es apta para mi tipo de piel. El resultado es excelente, nada de manchas ni irritación.",
  },
  {
    name: "Carlos V.",
    location: "Veracruz",
    initial: "C",
    color: "#7c3aed",
    rating: 5,
    date: "hace 6 semanas",
    service: "Espalda y pecho",
    text: "Como hombre dudé mucho en venir, pero el trato es muy profesional y discreto. Me hice la espalda y el pecho. Los resultados son perfectos y el ambiente es muy cómodo.",
  },
  {
    name: "Mariana P.",
    location: "Boca del Río",
    initial: "M",
    color: "#9b7b5b",
    rating: 5,
    date: "hace 1 mes",
    service: "Axilas + Bikini",
    text: "El sistema de citas en línea es muy fácil. Me mandaron recordatorio por correo y la atención fue puntual. El precio es muy justo para la calidad del servicio. Totalmente recomendado.",
  },
];

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function ReviewCard({ review }: { review: (typeof REVIEWS)[0] }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 120;
  const displayText = !isLong || expanded ? review.text : review.text.slice(0, 120) + "…";

  return (
    <div
      className="flex flex-col h-full p-5"
      style={{
        background: "white",
        border: "1px solid #E7E3DC",
        borderRadius: 20,
        boxShadow: "0 2px 12px rgba(0,0,0,.06)",
      }}
    >
      {/* Top row: avatar + name + Google badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{ background: review.color }}
          >
            {review.initial}
          </div>
          <div>
            <p className="font-semibold text-sm leading-tight" style={{ color: "#2B2B2B" }}>{review.name}</p>
            <p className="text-xs" style={{ color: "#9A9A9A" }}>{review.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <GoogleG />
          <span className="text-xs font-semibold" style={{ color: "#5F5F5F" }}>Google</span>
        </div>
      </div>

      {/* Stars + date */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-0.5">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="text-xs" style={{ color: "#AAAAAA" }}>{review.date}</span>
      </div>

      {/* Review text */}
      <p className="text-sm leading-relaxed flex-1 mb-3" style={{ color: "#4B4B4B" }}>
        {displayText}
        {isLong && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="ml-1 font-semibold"
            style={{ color: "#2596be", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            {expanded ? " Ver menos" : " Ver más"}
          </button>
        )}
      </p>

      {/* Service tag */}
      <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: "1px solid #F0EDE8" }}>
        <span
          className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full"
          style={{ background: "rgba(37,150,190,.08)", color: "#2596be", border: "1px solid rgba(37,150,190,.15)" }}
        >
          {review.service}
        </span>
        <span className="text-xs" style={{ color: "#BBBBBB" }}>Reseña verificada</span>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 10);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24 overflow-hidden" style={{ background: "#F4F2EE" }}>
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.16em] mb-4"
              style={{ color: "#2596be", background: "rgba(37,150,190,.08)", border: "1px solid rgba(37,150,190,.18)" }}
            >
              <GoogleG />
              Reseñas verificadas en Google
            </div>
            <h2
              className="font-display font-black tracking-tight"
              style={{ color: "#2B2B2B", fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
            >
              Lo que dicen nuestras pacientes
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-sm" style={{ color: "#2B2B2B" }}>4.9</span>
              <span className="text-sm" style={{ color: "#9A9A9A" }}>· 49 reseñas en Google</span>
            </div>
          </div>

          {/* Scroll arrows desktop */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canLeft}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30"
              style={{ background: "white", border: "1px solid #E7E3DC" }}
            >
              <ArrowLeft className="w-4 h-4" style={{ color: "#2596be" }} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canRight}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30"
              style={{ background: "white", border: "1px solid #E7E3DC" }}
            >
              <ArrowRight className="w-4 h-4" style={{ color: "#2596be" }} />
            </button>
          </div>
        </div>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {REVIEWS.map((r) => (
            <div key={r.name} className="shrink-0 w-[300px] sm:w-[320px]">
              <ReviewCard review={r} />
            </div>
          ))}
        </div>

        {/* Google CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6" style={{ borderTop: "1px solid #E7E3DC" }}>
          <p className="text-sm text-center sm:text-left" style={{ color: "#6F6F6F" }}>
            ¿Ya fuiste a Mi Piel? Tu reseña ayuda a otras personas a tomar la decisión.
          </p>
          <div className="flex gap-3">
            <a
              href="https://g.page/r/mipielveracruz/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "white", border: "1px solid #E7E3DC", color: "#2596be" }}
            >
              <GoogleG />
              Dejar reseña en Google
            </a>
            <Link
              href="/agendar"
              className="inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-full text-white transition-all duration-200 hover:opacity-90"
              style={{ background: "#2596be" }}
            >
              Agendar cita
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <style>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}

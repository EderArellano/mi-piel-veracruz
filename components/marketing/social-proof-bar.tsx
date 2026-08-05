"use client";

import { useEffect, useRef } from "react";

const items = [
  {
    label: "4.9 en Google",
    sub: "49 reseñas verificadas",
    visual: "stars",
  },
  {
    label: "+5,000 pacientes",
    sub: "En Veracruz y Boca del Río",
    visual: "dot",
  },
  {
    label: "8 años",
    sub: "De experiencia clínica",
    visual: "dot",
  },
  {
    label: "Láser Diodo FDA",
    sub: "Tecnología grado médico",
    visual: "dot",
  },
  {
    label: "1ª consulta gratis",
    sub: "Sin compromiso",
    visual: "dot",
  },
];

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-label="Google">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

export function SocialProofBar() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf: number;
    let x = 0;
    const speed = 0.4;
    const clone = track.innerHTML;
    track.innerHTML += clone;

    const animate = () => {
      x -= speed;
      if (Math.abs(x) >= track.scrollWidth / 2) x = 0;
      track.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pill = (item: typeof items[0], key: string) => (
    <div
      key={key}
      className="inline-flex items-center gap-3 px-5 shrink-0"
      style={{ borderRight: "1px solid rgba(95,124,113,.12)" }}
    >
      {item.visual === "stars" ? (
        <div className="flex items-center gap-2">
          <GoogleG />
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 12 12" width="11" height="11">
                <path fill="#FBBF24" d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.09L6 7.82l-2.78 1.73.53-3.09L1.5 4.27l3.11-.45z"/>
              </svg>
            ))}
          </div>
        </div>
      ) : (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: "#C8A96A" }}
        />
      )}
      <div className="leading-none">
        <span className="text-sm font-bold" style={{ color: "#2B2B2B" }}>{item.label}</span>
        <span className="text-xs ml-1.5" style={{ color: "#9A9A9A" }}>{item.sub}</span>
      </div>
    </div>
  );

  return (
    <div
      className="relative overflow-hidden py-3.5"
      style={{ background: "white", borderTop: "1px solid #E7E3DC", borderBottom: "1px solid #E7E3DC" }}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, white, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, white, transparent)" }} />

      <div ref={trackRef} className="flex items-center whitespace-nowrap will-change-transform">
        {items.map((item, i) => pill(item, `a-${i}`))}
      </div>
    </div>
  );
}

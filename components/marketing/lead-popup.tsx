"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { X, MessageCircle, Star } from "lucide-react";

const STORAGE_KEY = "mp_popup_dismissed";
const WA_NUMBER = "522299330014";

// Never show on these pages — counter-productive
const SKIP_PATHS = ["/agendar", "/dashboard", "/admin", "/login", "/registro"];

export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const pathname = usePathname();

  const shouldSkip = SKIP_PATHS.some((p) => pathname?.startsWith(p));

  const tryOpen = useCallback(() => {
    if (shouldSkip) return;
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed && Date.now() - Number(dismissed) < 7 * 24 * 60 * 60 * 1000) return;
    setOpen(true);
  }, [shouldSkip]);

  useEffect(() => {
    if (shouldSkip) return;

    // Check dismissal before attaching any listeners
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed && Date.now() - Number(dismissed) < 7 * 24 * 60 * 60 * 1000) return;

    // 1) Time-based: 60 seconds
    const byTime = setTimeout(tryOpen, 60_000);

    // 2) Scroll-based: 65% of page
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (pct > 0.65) { tryOpen(); window.removeEventListener("scroll", onScroll); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // 3) Exit-intent: mouse leaves viewport from top
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 5 && e.relatedTarget === null) tryOpen();
    };
    document.addEventListener("mouseleave", onMouseOut);

    return () => {
      clearTimeout(byTime);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseOut);
    };
  }, [shouldSkip, tryOpen]);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setOpen(false);
  };

  const handleWA = () => {
    const msg = encodeURIComponent(
      `Hola, quiero reclamar mi 15% de descuento${phone ? ` — Mi número: ${phone}` : ""}. Me interesa una consulta gratis 😊`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
    dismiss();
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] backdrop-blur-[4px]"
        style={{ background: "rgba(43,43,43,.4)" }}
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="fixed z-[61] inset-x-4 bottom-6 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:inset-x-auto sm:w-full sm:max-w-md">
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{ background: "white", border: "1px solid #E7E3DC", boxShadow: "0 30px 80px rgba(0,0,0,.14)" }}
        >
          <button
            onClick={dismiss}
            aria-label="Cerrar"
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(43,43,43,.08)", color: "#6F6F6F" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(43,43,43,.14)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(43,43,43,.08)"; }}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Gradient top bar */}
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #2596be, #C8A96A)" }} />

          <div className="p-7">
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs ml-2 mt-0.5" style={{ color: "#9A9A9A" }}>4.9 · 49 reseñas Google</span>
            </div>

            <h2 className="font-display text-2xl font-black leading-tight mb-1" style={{ color: "#2B2B2B" }}>
              15% de descuento
            </h2>
            <p
              className="font-display text-2xl font-black mb-4"
              style={{
                background: "linear-gradient(125deg, #2596be, #C8A96A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              en tu primera sesión
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#6F6F6F" }}>
              Escríbenos por WhatsApp y reserva tu consulta gratuita con Skin Analyzer.
              Oferta solo para nuevas pacientes.
            </p>

            <input
              type="tel"
              placeholder="Tu WhatsApp (229 000 0000)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mb-3 px-4 py-3 text-sm transition-all outline-none"
              style={{ height: "52px", borderRadius: "14px", border: "1px solid #E7E3DC", background: "#FAFAF8", color: "#2B2B2B" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#2596be"; e.currentTarget.style.boxShadow = "0 0 0 4px rgba(37,150,190,.12)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#E7E3DC"; e.currentTarget.style.boxShadow = "none"; }}
            />

            <button
              onClick={handleWA}
              className="w-full flex items-center justify-center gap-2.5 text-white font-bold py-3.5 transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "#22c55e", borderRadius: "18px", boxShadow: "0 4px 20px rgba(34,197,94,.3)" }}
            >
              <MessageCircle className="w-5 h-5" />
              Reclamar mi 15% de descuento
            </button>

            <p className="text-xs text-center mt-3" style={{ color: "#9A9A9A" }}>
              Sin compromiso · Cancelable sin costo · 1 por persona
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

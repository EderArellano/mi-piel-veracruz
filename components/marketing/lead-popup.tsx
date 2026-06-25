"use client";

import { useState, useEffect } from "react";
import { X, MessageCircle, Star } from "lucide-react";

const STORAGE_KEY = "mp_popup_dismissed";
const WA_NUMBER = "522299330014";

export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // Don't show if dismissed in last 7 days
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed && Date.now() - Number(dismissed) < 7 * 24 * 60 * 60 * 1000) return;

    // Show after 45s
    const byTime = setTimeout(() => setOpen(true), 45000);

    // OR on 65% scroll
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (pct > 0.65) { setOpen(true); window.removeEventListener("scroll", onScroll); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => { clearTimeout(byTime); window.removeEventListener("scroll", onScroll); };
  }, []);

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
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="fixed z-[61] inset-x-4 bottom-6 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:inset-x-auto sm:w-full sm:max-w-md">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ background: "#070d14", border: "1px solid rgba(255,255,255,0.08)" }}>

          {/* Close */}
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          {/* Top gradient bar */}
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #2596be, #56cfe1, #c9a96e)" }} />

          <div className="p-7">
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-white/40 text-xs ml-2 mt-0.5">4.9 · 49 reseñas</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-2xl font-black text-white leading-tight mb-1">
              15% de descuento
            </h2>
            <p
              className="font-display text-2xl font-black mb-4"
              style={{ background: "linear-gradient(125deg, #2596be, #56cfe1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              en tu primera sesión
            </p>
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              Escríbenos por WhatsApp ahora y reserva tu consulta gratuita con Skin Analyzer.
              Oferta válida solo hoy para nuevas pacientes.
            </p>

            {/* Phone input */}
            <input
              type="tel"
              placeholder="Tu WhatsApp (229 000 0000)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl bg-white/8 border border-white/12 text-white placeholder:text-white/30 px-4 py-3 text-sm mb-3 focus:outline-none focus:border-primary/60 focus:bg-white/12 transition-all"
            />

            {/* CTA */}
            <button
              onClick={handleWA}
              className="w-full flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-3.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Reclamar mi 15% de descuento
            </button>

            <p className="text-white/25 text-xs text-center mt-3">
              Sin compromiso · Cancelable sin costo · 1 por persona
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

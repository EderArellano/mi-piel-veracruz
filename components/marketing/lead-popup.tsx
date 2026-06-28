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
        className="fixed inset-0 z-[60] backdrop-blur-[4px]"
        style={{ background: "rgba(43,43,43,.4)" }}
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="fixed z-[61] inset-x-4 bottom-6 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:inset-x-auto sm:w-full sm:max-w-md">
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{ background: "white", border: "1px solid #E7E3DC", boxShadow: "0 30px 80px rgba(0,0,0,.12)" }}
        >

          {/* Close */}
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(43,43,43,.08)", color: "#6F6F6F" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(43,43,43,.14)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(43,43,43,.08)"; }}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top gradient bar */}
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #5F7C71, #C8A96A)" }} />

          <div className="p-7">
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs ml-2 mt-0.5" style={{ color: "#9A9A9A" }}>4.9 · 49 reseñas</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-2xl font-black leading-tight mb-1" style={{ color: "#2B2B2B" }}>
              15% de descuento
            </h2>
            <p
              className="font-display text-2xl font-black mb-4"
              style={{
                background: "linear-gradient(125deg, #5F7C71, #C8A96A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              en tu primera sesión
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#6F6F6F" }}>
              Escríbenos por WhatsApp ahora y reserva tu consulta gratuita con Skin Analyzer.
              Oferta válida solo hoy para nuevas pacientes.
            </p>

            {/* Phone input */}
            <input
              type="tel"
              placeholder="Tu WhatsApp (229 000 0000)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mb-3 px-4 py-3 text-sm transition-all outline-none"
              style={{
                height: "52px",
                borderRadius: "14px",
                border: "1px solid #E7E3DC",
                background: "#FAFAF8",
                color: "#2B2B2B",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#5F7C71";
                e.currentTarget.style.boxShadow = "0 0 0 4px rgba(95,124,113,.15)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#E7E3DC";
                e.currentTarget.style.boxShadow = "none";
              }}
            />

            {/* CTA */}
            <button
              onClick={handleWA}
              className="w-full flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-3.5 transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
              style={{ borderRadius: "18px" }}
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

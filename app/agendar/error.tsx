"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, MessageCircle, ArrowRight, Calendar } from "lucide-react";

const WA_BOOKING =
  "https://wa.me/522299330014?text=Hola%2C%20quiero%20agendar%20una%20cita.%20Tuve%20un%20problema%20con%20el%20sistema%20en%20l%C3%ADnea.";
const WA_HELP =
  "https://wa.me/522299330014?text=Hola%2C%20tuve%20un%20error%20al%20intentar%20agendar%20mi%20cita.%20%C2%BFPueden%20ayudarme%3F";

export default function AgendarError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[agendar]", error);
  }, [error]);

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      {/* Top accent line */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #5F7C71, #C8A96A)" }} />

      <div className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4 py-16">

        {/* Icon */}
        <div
          className="w-20 h-20 flex items-center justify-center mb-7"
          style={{
            background: "white",
            border: "1px solid #E7E3DC",
            borderRadius: 24,
            boxShadow: "0 8px 25px rgba(0,0,0,.06)",
          }}
        >
          <Calendar className="w-9 h-9" style={{ color: "#5F7C71" }} />
        </div>

        {/* Headline */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          style={{ background: "rgba(95,124,113,.08)", color: "#5F7C71" }}
        >
          Problema al cargar el calendario
        </div>

        <h1
          className="font-display font-black mb-3"
          style={{ color: "#2B2B2B", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.02em" }}
        >
          No pudimos cargar el formulario
        </h1>
        <p className="max-w-md mb-2" style={{ color: "#6F6F6F", fontSize: "15px", lineHeight: 1.65 }}>
          El sistema de citas tuvo un problema técnico. Puedes intentarlo de nuevo
          o agendar directamente por WhatsApp —{" "}
          <strong style={{ color: "#2B2B2B" }}>es igual de rápido.</strong>
        </p>
        <p className="mb-10" style={{ color: "#9A9A9A", fontSize: "13px" }}>
          Tu consulta Skin Analyzer sigue siendo completamente gratis.
        </p>

        {/* PRIMARY: WhatsApp booking */}
        <a
          href={WA_BOOKING}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 font-bold text-white px-9 py-4 mb-4 transition-opacity hover:opacity-90"
          style={{
            background: "#22c55e",
            borderRadius: "18px",
            textDecoration: "none",
            fontSize: "16px",
            boxShadow: "0 4px 20px rgba(34,197,94,.3)",
          }}
        >
          <MessageCircle className="w-5 h-5" />
          Agendar por WhatsApp — Es gratis
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>

        {/* Secondary: retry + home */}
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 font-semibold px-6 py-3 transition-opacity hover:opacity-80"
            style={{
              background: "white",
              border: "1.5px solid #E7E3DC",
              color: "#5F7C71",
              borderRadius: "14px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            <RefreshCw className="w-4 h-4" />
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-semibold px-6 py-3 transition-colors hover:text-[#5F7C71]"
            style={{
              border: "1px solid #E7E3DC",
              color: "#6F6F6F",
              borderRadius: "14px",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Ir al inicio
          </Link>
        </div>

        {/* Contact card */}
        <div
          className="mt-12 w-full max-w-sm p-5 text-center"
          style={{
            background: "white",
            border: "1px solid #E7E3DC",
            borderRadius: "18px",
          }}
        >
          <p className="font-semibold text-sm mb-1" style={{ color: "#2B2B2B" }}>
            ¿Prefieres llamarnos?
          </p>
          <a
            href="tel:+522299330014"
            style={{ color: "#5F7C71", fontSize: "18px", fontWeight: 700, textDecoration: "none" }}
          >
            +52 229 933 0014
          </a>
          <p style={{ color: "#9A9A9A", fontSize: "11px", marginTop: 4 }}>
            Lun–Vie 9:00–20:00 · Sáb 9:00–15:00
          </p>
        </div>

        {error.digest && (
          <p className="mt-6 font-mono text-xs" style={{ color: "#CCCCCC" }}>
            Referencia: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}

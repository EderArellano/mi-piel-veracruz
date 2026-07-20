"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, MessageCircle, Home, AlertTriangle } from "lucide-react";

const WA = "https://wa.me/522299330014?text=Hola%2C%20tuve%20un%20error%20en%20la%20p%C3%A1gina%20web.%20%C2%BFPueden%20ayudarme%3F";

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[marketing]", error);
  }, [error]);

  return (
    <section
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-20"
      style={{ background: "#FAFAF8" }}
    >
      {/* Icon */}
      <div
        className="w-16 h-16 flex items-center justify-center mb-6"
        style={{
          background: "rgba(95,124,113,.08)",
          border: "1px solid rgba(95,124,113,.18)",
          borderRadius: 20,
        }}
      >
        <AlertTriangle className="w-7 h-7" style={{ color: "#5F7C71" }} />
      </div>

      {/* Text */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
        style={{ background: "rgba(95,124,113,.08)", color: "#5F7C71" }}
      >
        Error temporal
      </div>

      <h1
        className="font-display font-black mb-3"
        style={{ color: "#2B2B2B", fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}
      >
        Algo salió mal
      </h1>
      <p className="max-w-sm mb-2" style={{ color: "#6F6F6F", fontSize: "15px", lineHeight: 1.65 }}>
        Esta sección no pudo cargar. Puedes intentarlo de nuevo —
        suele funcionar en el segundo intento.
      </p>
      <p className="mb-10" style={{ color: "#9A9A9A", fontSize: "13px" }}>
        ¿El error persiste? Escríbenos por WhatsApp y te ayudamos al instante.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 font-bold px-7 py-3.5 transition-opacity hover:opacity-90"
          style={{ background: "#5F7C71", color: "white", borderRadius: "14px", border: "none", cursor: "pointer", fontSize: "14px" }}
        >
          <RefreshCw className="w-4 h-4" />
          Intentar de nuevo
        </button>
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-semibold px-6 py-3.5 transition-opacity hover:opacity-90"
          style={{ background: "#22c55e", color: "white", borderRadius: "14px", textDecoration: "none", fontSize: "14px" }}
        >
          <MessageCircle className="w-4 h-4" />
          Ayuda por WhatsApp
        </a>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-semibold px-6 py-3.5 transition-colors hover:border-[#5F7C71] hover:text-[#5F7C71]"
          style={{ border: "1px solid #E7E3DC", color: "#6F6F6F", borderRadius: "14px", textDecoration: "none", fontSize: "14px" }}
        >
          <Home className="w-4 h-4" />
          Ir al inicio
        </Link>
      </div>

      {error.digest && (
        <p className="mt-8 font-mono text-xs" style={{ color: "#BBBBBB" }}>
          ID: {error.digest}
        </p>
      )}
    </section>
  );
}

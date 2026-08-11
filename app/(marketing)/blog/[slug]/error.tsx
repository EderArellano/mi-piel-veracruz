"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, ArrowLeft, MessageCircle } from "lucide-react";

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[blog/slug]", error);
  }, [error]);

  return (
    <section
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-20"
      style={{ background: "#FAFAF8" }}
    >
      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
        style={{ background: "rgba(37,150,190,.08)", color: "#2596be" }}
      >
        Error al cargar el artículo
      </div>

      <h1
        className="font-display font-black mb-3"
        style={{ color: "#2B2B2B", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", letterSpacing: "-0.02em" }}
      >
        No pudimos cargar este artículo
      </h1>
      <p className="max-w-sm mb-10" style={{ color: "#6F6F6F", fontSize: "15px", lineHeight: 1.65 }}>
        Ocurrió un error temporal. Intenta de nuevo o explora otros artículos.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 font-bold px-6 py-3.5 transition-opacity hover:opacity-90"
          style={{ background: "#2596be", color: "white", borderRadius: "14px", border: "none", cursor: "pointer", fontSize: "14px" }}
        >
          <RefreshCw className="w-4 h-4" />
          Reintentar
        </button>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-semibold px-6 py-3.5 transition-colors hover:border-[#2596be] hover:text-[#2596be]"
          style={{ border: "1px solid #E7E3DC", color: "#6F6F6F", borderRadius: "14px", textDecoration: "none", fontSize: "14px" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>
        <a
          href="https://wa.me/522299330014?text=Hola%2C%20quer%C3%ADa%20leer%20un%20art%C3%ADculo%20del%20blog%20pero%20tuve%20un%20error."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-semibold px-6 py-3.5 transition-opacity hover:opacity-90"
          style={{ background: "#22c55e", color: "white", borderRadius: "14px", textDecoration: "none", fontSize: "14px" }}
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>
    </section>
  );
}

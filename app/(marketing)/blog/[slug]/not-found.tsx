import Link from "next/link";
import { FileText, ArrowRight, MessageCircle } from "lucide-react";

export default function BlogPostNotFound() {
  return (
    <section
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-20"
      style={{ background: "#FAFAF8" }}
    >
      <div
        className="w-16 h-16 flex items-center justify-center mb-6"
        style={{ background: "rgba(37,150,190,.08)", border: "1px solid rgba(37,150,190,.18)", borderRadius: 20 }}
      >
        <FileText className="w-7 h-7" style={{ color: "#2596be" }} />
      </div>

      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
        style={{ background: "rgba(37,150,190,.08)", color: "#2596be" }}
      >
        Artículo no encontrado
      </div>

      <h1
        className="font-display font-black mb-3"
        style={{ color: "#2B2B2B", fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}
      >
        Este artículo no existe
      </h1>
      <p className="max-w-sm mb-10" style={{ color: "#6F6F6F", fontSize: "15px", lineHeight: 1.65 }}>
        Es posible que el enlace haya cambiado o el artículo fue retirado.
        Explora nuestros artículos más recientes.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-bold px-7 py-3.5 transition-opacity hover:opacity-90"
          style={{ background: "#2596be", color: "white", borderRadius: "14px", textDecoration: "none", fontSize: "14px" }}
        >
          Ver todos los artículos
          <ArrowRight className="w-4 h-4" />
        </Link>
        <a
          href="https://wa.me/522299330014?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20depilaci%C3%B3n%20l%C3%A1ser."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-semibold px-6 py-3.5 transition-opacity hover:opacity-90"
          style={{ background: "#22c55e", color: "white", borderRadius: "14px", textDecoration: "none", fontSize: "14px" }}
        >
          <MessageCircle className="w-4 h-4" />
          Preguntar por WhatsApp
        </a>
      </div>
    </section>
  );
}

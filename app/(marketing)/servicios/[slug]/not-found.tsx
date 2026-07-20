import Link from "next/link";
import { Sparkles, ArrowRight, MessageCircle } from "lucide-react";

const QUICK_ZONES = [
  { href: "/servicios/axilas", label: "Axilas", price: "$600" },
  { href: "/servicios/bikini-brasileno", label: "Bikini Brasileño", price: "$1,000" },
  { href: "/servicios/piernas", label: "Piernas", price: "$1,200" },
  { href: "/servicios/facial", label: "Facial", price: "$900" },
];

export default function ServicioNotFound() {
  return (
    <section
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-20"
      style={{ background: "#FAFAF8" }}
    >
      <div
        className="w-16 h-16 flex items-center justify-center mb-6"
        style={{ background: "rgba(95,124,113,.08)", border: "1px solid rgba(95,124,113,.18)", borderRadius: 20 }}
      >
        <Sparkles className="w-7 h-7" style={{ color: "#5F7C71" }} />
      </div>

      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
        style={{ background: "rgba(95,124,113,.08)", color: "#5F7C71" }}
      >
        Zona no encontrada
      </div>

      <h1
        className="font-display font-black mb-3"
        style={{ color: "#2B2B2B", fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}
      >
        Esta zona no está disponible
      </h1>
      <p className="max-w-sm mb-8" style={{ color: "#6F6F6F", fontSize: "15px", lineHeight: 1.65 }}>
        Quizás el enlace cambió. Estos son nuestros tratamientos disponibles:
      </p>

      {/* Quick zone links */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs mb-8">
        {QUICK_ZONES.map(({ href, label, price }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col items-center py-3 px-2 transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "white", border: "1px solid #E7E3DC", borderRadius: "14px", textDecoration: "none" }}
          >
            <span
              className="font-semibold text-sm group-hover:text-[#5F7C71] transition-colors"
              style={{ color: "#2B2B2B" }}
            >
              {label}
            </span>
            <span style={{ color: "#5F7C71", fontSize: "11px", fontWeight: 700 }}>{price} MXN</span>
          </Link>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/servicios"
          className="inline-flex items-center gap-2 font-bold px-7 py-3.5 transition-opacity hover:opacity-90"
          style={{ background: "#5F7C71", color: "white", borderRadius: "14px", textDecoration: "none", fontSize: "14px" }}
        >
          Ver todos los servicios
          <ArrowRight className="w-4 h-4" />
        </Link>
        <a
          href="https://wa.me/522299330014?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20depilaci%C3%B3n%20l%C3%A1ser%20en%20Veracruz."
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

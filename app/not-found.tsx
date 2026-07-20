import Link from "next/link";
import { Home, Calendar, Tag, Phone, MessageCircle, ArrowRight, Sparkles } from "lucide-react";

const WA = "https://wa.me/522299330014?text=Hola%2C%20vine%20desde%20la%20p%C3%A1gina%20web%20y%20necesito%20ayuda.";

const LINKS = [
  { href: "/", label: "Inicio", icon: Home, desc: "Página principal" },
  { href: "/servicios", label: "Servicios", icon: Sparkles, desc: "Depilación láser y más" },
  { href: "/precios", label: "Precios", icon: Tag, desc: "Desde $500 MXN/sesión" },
  { href: "/agendar", label: "Agendar cita", icon: Calendar, desc: "Primera consulta gratis" },
  { href: "/contacto", label: "Contacto", icon: Phone, desc: "Llámanos o escríbenos" },
];

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAFAF8",
        fontFamily: "var(--font-inter, system-ui, sans-serif)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Minimal nav */}
      <header
        style={{
          borderBottom: "1px solid #E7E3DC",
          background: "white",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-manrope, system-ui, sans-serif)",
            fontWeight: 800,
            fontSize: "18px",
            color: "#2B2B2B",
            textDecoration: "none",
          }}
        >
          Mi Piel <span style={{ color: "#5F7C71" }}>Veracruz</span>
        </Link>
        <Link
          href="/agendar"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "#5F7C71",
            color: "white",
            fontWeight: 600,
            fontSize: "13px",
            padding: "8px 18px",
            borderRadius: "12px",
            textDecoration: "none",
          }}
        >
          <Calendar className="w-3.5 h-3.5" />
          Agendar gratis
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* Giant 404 */}
        <div
          className="font-display font-black select-none mb-6"
          style={{
            fontSize: "clamp(100px, 20vw, 180px)",
            lineHeight: 1,
            background: "linear-gradient(135deg, rgba(95,124,113,.12) 0%, rgba(200,169,106,.10) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.05em",
          }}
        >
          404
        </div>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
          style={{
            background: "rgba(95,124,113,.08)",
            border: "1px solid rgba(95,124,113,.2)",
            color: "#5F7C71",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#C8A96A",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          Página no encontrada
        </div>

        <h1
          className="font-display font-black text-center mb-3"
          style={{ color: "#2B2B2B", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.02em" }}
        >
          Esta página no existe
        </h1>
        <p className="text-center max-w-md mb-10" style={{ color: "#6F6F6F", fontSize: "16px", lineHeight: 1.6 }}>
          Quizás el enlace cambió o hay un error en la URL. Pero no te preocupes —
          tu consulta de Skin Analyzer sigue siendo{" "}
          <span style={{ color: "#5F7C71", fontWeight: 600 }}>completamente gratis</span>.
        </p>

        {/* Nav grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xl mb-10">
          {LINKS.map(({ href, label, icon: Icon, desc }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col gap-1.5 p-4 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "white",
                border: "1px solid #E7E3DC",
                borderRadius: "16px",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "10px",
                  background: "rgba(95,124,113,.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 4,
                }}
              >
                <Icon className="w-4 h-4" style={{ color: "#5F7C71" }} />
              </div>
              <span
                className="font-semibold text-sm group-hover:text-[#5F7C71] transition-colors"
                style={{ color: "#2B2B2B" }}
              >
                {label}
              </span>
              <span style={{ color: "#9A9A9A", fontSize: "11px" }}>{desc}</span>
            </Link>
          ))}
        </div>

        {/* WhatsApp fallback */}
        <div
          className="w-full max-w-xl p-5 flex flex-col sm:flex-row items-center gap-4"
          style={{
            background: "white",
            border: "1px solid #E7E3DC",
            borderRadius: "18px",
          }}
        >
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold text-sm" style={{ color: "#2B2B2B" }}>
              ¿Necesitas ayuda directa?
            </p>
            <p style={{ color: "#6F6F6F", fontSize: "13px", marginTop: 2 }}>
              Escríbenos por WhatsApp y te respondemos en minutos.
            </p>
          </div>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold text-white px-6 py-3 transition-opacity hover:opacity-90 whitespace-nowrap"
            style={{ background: "#22c55e", borderRadius: "14px", textDecoration: "none", fontSize: "14px" }}
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </main>

      {/* Footer strip */}
      <footer
        className="text-center py-5"
        style={{ borderTop: "1px solid #E7E3DC", color: "#9A9A9A", fontSize: "12px" }}
      >
        Mi Piel Centro Dermocosmético · Boca del Río, Veracruz ·{" "}
        <a href="tel:+522299330014" style={{ color: "#5F7C71" }}>
          +52 229 933 0014
        </a>
      </footer>
    </div>
  );
}

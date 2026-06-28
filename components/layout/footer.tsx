"use client";

import Link from "next/link";
import { Sparkles, MapPin, Phone, Mail, Instagram, Facebook, Clock } from "lucide-react";

const services = [
  { href: "/servicios", label: "Depilación Láser" },
  { href: "/servicios", label: "Hidrofacial" },
  { href: "/servicios", label: "Celluma LED" },
  { href: "/servicios", label: "Skin Analyzer" },
  { href: "/servicios", label: "Skin Care" },
  { href: "/precios", label: "Ver precios" },
];

const blogLinks = [
  { href: "/blog/cuanto-cuesta-depilacion-laser-veracruz", label: "¿Cuánto cuesta?" },
  { href: "/blog/que-es-hidrofacial", label: "¿Qué es el Hidrofacial?" },
  { href: "/blog", label: "Beneficios del láser" },
  { href: "/blog", label: "¿Duele la depilación láser?" },
];

export function Footer() {
  return (
    <footer style={{ background: "#F4F2EE", borderTop: "1px solid #E7E3DC" }}>
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #5F7C71, #C8A96A)" }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="leading-none">
                <span className="text-[15px] font-bold block" style={{ color: "#2B2B2B" }}>Mi Piel</span>
                <span className="text-[11px] tracking-widest uppercase block" style={{ color: "#6F6F6F" }}>Veracruz</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "#6F6F6F" }}>
              Clínica de depilación láser premium en Veracruz y Boca del Río. Tecnología de última
              generación, resultados permanentes.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/mipielveracruz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: "white", border: "1px solid #E7E3DC", color: "#6F6F6F" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#5F7C71";
                  el.style.color = "white";
                  el.style.borderColor = "#5F7C71";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "white";
                  el.style.color = "#6F6F6F";
                  el.style.borderColor = "#E7E3DC";
                }}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/mipielveracruz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: "white", border: "1px solid #E7E3DC", color: "#6F6F6F" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#5F7C71";
                  el.style.color = "white";
                  el.style.borderColor = "#5F7C71";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "white";
                  el.style.color = "#6F6F6F";
                  el.style.borderColor = "#E7E3DC";
                }}
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-4" style={{ color: "#2B2B2B" }}>
              Servicios
            </h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.href + s.label}>
                  <Link
                    href={s.href}
                    className="text-sm transition-colors"
                    style={{ color: "#6F6F6F" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#5F7C71"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6F6F6F"; }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-4" style={{ color: "#2B2B2B" }}>
              Blog
            </h3>
            <ul className="space-y-2.5">
              {blogLinks.map((b) => (
                <li key={b.href + b.label}>
                  <Link
                    href={b.href}
                    className="text-sm transition-colors"
                    style={{ color: "#6F6F6F" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#5F7C71"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6F6F6F"; }}
                  >
                    {b.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-4" style={{ color: "#2B2B2B" }}>
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#5F7C71" }} />
                <span className="text-sm" style={{ color: "#6F6F6F" }}>
                  Boca del Río, Veracruz, México
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" style={{ color: "#5F7C71" }} />
                <a
                  href="tel:+522299330014"
                  className="text-sm transition-colors"
                  style={{ color: "#6F6F6F" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#2B2B2B"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6F6F6F"; }}
                >
                  +52 229 933 00 14
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0" style={{ color: "#5F7C71" }} />
                <a
                  href="mailto:contacto@mipielveracruz.com"
                  className="text-sm transition-colors"
                  style={{ color: "#6F6F6F" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#2B2B2B"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6F6F6F"; }}
                >
                  contacto@mipielveracruz.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#5F7C71" }} />
                <div className="text-sm" style={{ color: "#6F6F6F" }}>
                  <p>Lun–Vie: 9:00 – 20:00</p>
                  <p>Sáb: 9:00 – 15:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid #E7E3DC" }}>
        <div className="section-container py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: "#9A9A9A" }}>
            © {new Date().getFullYear()} Mi Piel Veracruz. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacidad"
              className="text-xs transition-colors"
              style={{ color: "#9A9A9A" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#6F6F6F"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#9A9A9A"; }}
            >
              Aviso de Privacidad
            </Link>
            <Link
              href="/terminos"
              className="text-xs transition-colors"
              style={{ color: "#9A9A9A" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#6F6F6F"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#9A9A9A"; }}
            >
              Términos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

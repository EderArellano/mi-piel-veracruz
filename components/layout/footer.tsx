import Link from "next/link";
import { Sparkles, MapPin, Phone, Mail, Instagram, Facebook, Clock } from "lucide-react";

const services = [
  { href: "/servicios/facial", label: "Depilación Facial" },
  { href: "/servicios/piernas", label: "Depilación Piernas" },
  { href: "/servicios/axilas", label: "Depilación Axilas" },
  { href: "/servicios/bikini", label: "Depilación Bikini" },
  { href: "/servicios/cuerpo-completo", label: "Cuerpo Completo" },
  { href: "/servicios/hombres", label: "Depilación Hombres" },
];

const blogLinks = [
  { href: "/blog/cuanto-cuesta-depilacion-laser-veracruz", label: "¿Cuánto cuesta?" },
  { href: "/blog/cuantas-sesiones-necesito", label: "¿Cuántas sesiones?" },
  { href: "/blog/beneficios-depilacion-laser", label: "Beneficios del láser" },
  { href: "/blog/depilacion-laser-duele", label: "¿Duele la depilación láser?" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-sky-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="leading-none">
                <span className="text-[15px] font-bold text-white block">Mi Piel</span>
                <span className="text-[11px] text-white/60 tracking-widest uppercase block">Veracruz</span>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              Clínica de depilación láser premium en Veracruz y Boca del Río. Tecnología de última
              generación, resultados permanentes.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/mipielveracruz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/mipielveracruz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-4">
              Servicios
            </h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-4">
              Blog
            </h3>
            <ul className="space-y-2.5">
              {blogLinks.map((b) => (
                <li key={b.href}>
                  <Link
                    href={b.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {b.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-4">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-white/60">
                  Boca del Río, Veracruz, México
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="tel:+522299330014"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  +52 229 933 00 14
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="mailto:contacto@mipielveracruz.com"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  contacto@mipielveracruz.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div className="text-sm text-white/60">
                  <p>Lun–Vie: 9:00 – 20:00</p>
                  <p>Sáb: 9:00 – 15:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Mi Piel Veracruz. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacidad" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Aviso de Privacidad
            </Link>
            <Link href="/terminos" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Términos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

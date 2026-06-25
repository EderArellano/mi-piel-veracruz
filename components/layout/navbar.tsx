"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/servicios", label: "Servicios" },
  { href: "/precios", label: "Precios" },
  { href: "/analisis", label: "Skin Analyzer", badge: "Gratis" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0c1826]/97 backdrop-blur-xl border-b border-white/8 shadow-lg shadow-black/30"
          : "bg-[#0c1826]/90 backdrop-blur-md"
      )}
    >
      <div className="section-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-sky-400 flex items-center justify-center shadow-glow group-hover:shadow-glow-intense transition-shadow duration-200">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="leading-none">
              <span className="text-[15px] font-bold text-white tracking-tight block">Mi Piel</span>
              <span className="text-[11px] text-white/45 tracking-widest uppercase block">Veracruz</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-white/60 hover:text-white hover:bg-white/6"
                )}
              >
                {link.label}
                {"badge" in link && link.badge && (
                  <span className="absolute -top-1.5 -right-1 text-[9px] font-black uppercase tracking-wider bg-[#22c55e] text-white px-1.5 py-0.5 rounded-full leading-none">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {session ? (
              <Link
                href="/dashboard"
                className="text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                Mi cuenta
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-white/60 hover:text-white text-sm font-medium transition-colors px-3 py-2"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/agendar"
                  className="bg-primary hover:bg-primary/90 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-glow hover:shadow-glow-intense hover:-translate-y-0.5"
                >
                  Agendar cita
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/8 transition-colors"
            aria-label="Menú"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/8 bg-[#0c1826]"
          >
            <div className="section-container py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-primary bg-primary/10"
                      : "text-white/60 hover:text-white hover:bg-white/6"
                  )}
                >
                  {link.label}
                  {"badge" in link && link.badge && (
                    <span className="text-[9px] font-black uppercase tracking-wider bg-[#22c55e] text-white px-1.5 py-0.5 rounded-full leading-none">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              <div className="pt-3 pb-1 flex flex-col gap-2">
                {session ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-primary text-white font-bold py-3 rounded-xl"
                  >
                    Mi cuenta
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center text-white/70 hover:text-white border border-white/15 py-3 rounded-xl text-sm font-medium transition-colors"
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      href="/agendar"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center bg-primary text-white font-bold py-3 rounded-xl"
                    >
                      Agendar cita
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

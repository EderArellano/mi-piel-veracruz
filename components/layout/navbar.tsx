"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MiPielLogo } from "@/components/ui/mi-piel-logo";

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
          ? "border-b"
          : ""
      )}
      style={
        scrolled
          ? {
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              borderBottomColor: "#E7E3DC",
              boxShadow: "0 1px 20px rgba(25,25,25,.06)",
            }
          : {
              background: "rgba(250,250,248,0.7)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
            }
      }
    >
      <div className="section-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <MiPielLogo size={34} showText showTagline />
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
                    ? "font-semibold"
                    : "hover:bg-black/5"
                )}
                style={{
                  color: pathname === link.href ? "#2596be" : "#6F6F6F",
                }}
              >
                {link.label}
                {pathname === link.href && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    style={{ background: "#2596be" }}
                  />
                )}
                {"badge" in link && link.badge && (
                  <span className="absolute -top-1.5 -right-1 text-[9px] font-black uppercase tracking-wider text-white px-1.5 py-0.5 rounded-full leading-none" style={{ background: "#4CAF72" }}>
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
                className="text-sm font-medium transition-colors"
                style={{ color: "#6F6F6F" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#2B2B2B"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6F6F6F"; }}
              >
                Mi cuenta
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium transition-colors px-3 py-2"
                  style={{ color: "#6F6F6F" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#2B2B2B"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6F6F6F"; }}
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/agendar"
                  className="text-sm font-bold px-5 py-2.5 transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "#2596be",
                    color: "white",
                    borderRadius: "18px",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "#1e7a9e";
                    el.style.boxShadow = "0 12px 30px rgba(37,150,190,.18)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "#2596be";
                    el.style.boxShadow = "none";
                  }}
                >
                  Agendar cita
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl transition-colors hover:bg-black/5"
            style={{ color: "#2B2B2B" }}
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
            className="md:hidden"
            style={{ background: "#FFFFFF", borderBottom: "1px solid #E7E3DC" }}
          >
            <div className="section-container py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    color: pathname === link.href ? "#2596be" : "#6F6F6F",
                    background: pathname === link.href ? "rgba(37,150,190,.08)" : "transparent",
                  }}
                >
                  {link.label}
                  {"badge" in link && link.badge && (
                    <span className="text-[9px] font-black uppercase tracking-wider text-white px-1.5 py-0.5 rounded-full leading-none" style={{ background: "#4CAF72" }}>
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
                    className="block w-full text-center text-white font-bold py-3 rounded-xl"
                    style={{ background: "#2596be" }}
                  >
                    Mi cuenta
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center py-3 rounded-xl text-sm font-medium transition-colors border"
                      style={{ color: "#6F6F6F", borderColor: "#E7E3DC" }}
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      href="/agendar"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center text-white font-bold py-3 rounded-xl"
                      style={{ background: "#2596be" }}
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

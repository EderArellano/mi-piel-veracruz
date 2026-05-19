import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-brand flex">
      {/* Left panel – branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-foreground">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-rose-400/10 blur-3xl" />
        </div>
        <div className="relative flex flex-col justify-between p-12 w-full">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-rose-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="leading-none">
              <span className="text-base font-bold text-white block">Mi Piel</span>
              <span className="text-[11px] text-white/60 tracking-widest uppercase block">Veracruz</span>
            </div>
          </Link>

          <div>
            <blockquote className="text-2xl font-medium text-white leading-relaxed mb-4">
              "La depilación láser en Mi Piel Veracruz cambió mi vida. Resultados increíbles desde
              la primera sesión."
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-rose-400 flex items-center justify-center">
                <span className="text-sm font-bold text-white">V</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Valentina R.</div>
                <div className="text-xs text-white/60">Cliente · Boca del Río</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "5,000+", label: "Clientes felices" },
              { value: "98%", label: "Satisfacción" },
              { value: "8 años", label: "Experiencia" },
              { value: "100%", label: "Seguro y certificado" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/8 border border-white/10 p-4">
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel – form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-rose-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="leading-none">
                <span className="text-base font-bold text-foreground block">Mi Piel</span>
                <span className="text-[11px] text-muted-foreground tracking-widest uppercase block">Veracruz</span>
              </div>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

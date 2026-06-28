"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles, Tag } from "lucide-react";

const WA_NUMBER = "522299330014";

const ZONES = [
  { id: "labio", label: "Labio superior", emoji: "💋", price: 500, category: "Facial" },
  { id: "menton", label: "Mentón", emoji: "✨", price: 500, category: "Facial" },
  { id: "cara", label: "Cara completa", emoji: "🌟", price: 900, category: "Facial" },
  { id: "axilas", label: "Axilas", emoji: "🙌", price: 600, category: "Cuerpo" },
  { id: "abdomen", label: "Abdomen", emoji: "💎", price: 700, category: "Cuerpo" },
  { id: "brazos", label: "Brazos completos", emoji: "💪", price: 900, category: "Cuerpo" },
  { id: "media-pierna", label: "Media pierna", emoji: "🦵", price: 900, category: "Piernas" },
  { id: "pierna", label: "Pierna completa", emoji: "✦", price: 1200, category: "Piernas" },
  { id: "bikini-clasico", label: "Bikini clásico", emoji: "🌊", price: 800, category: "Íntima" },
  { id: "bikini-brasileno", label: "Bikini brasileño", emoji: "🌺", price: 1000, category: "Íntima" },
  { id: "bikini-integral", label: "Bikini integral", emoji: "🔥", price: 1200, category: "Íntima" },
  { id: "espalda", label: "Espalda ♂", emoji: "🏋️", price: 1500, category: "Caballeros" },
  { id: "pecho", label: "Pecho ♂", emoji: "💈", price: 1000, category: "Caballeros" },
];

const CATEGORIES = ["Facial", "Cuerpo", "Piernas", "Íntima", "Caballeros"];

const DISCOUNT_TIERS = [
  { min: 1, max: 1, pct: 0, label: "" },
  { min: 2, max: 2, pct: 5, label: "5% por combinar 2 zonas" },
  { min: 3, max: 3, pct: 10, label: "10% por combinar 3 zonas" },
  { min: 4, max: 4, pct: 15, label: "15% por combinar 4 zonas" },
  { min: 5, max: 99, pct: 20, label: "20% por combinar 5+ zonas 🎉" },
];

function getDiscount(count: number) {
  return DISCOUNT_TIERS.find((t) => count >= t.min && count <= t.max) ?? DISCOUNT_TIERS[0];
}

export function PackageBuilder() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const { subtotal, discount, total, msi, tier } = useMemo(() => {
    const zones = ZONES.filter((z) => selected.has(z.id));
    const subtotal = zones.reduce((s, z) => s + z.price, 0);
    const tier = getDiscount(zones.length);
    const discount = Math.round(subtotal * (tier.pct / 100));
    const total = subtotal - discount;
    const msi = Math.ceil(total / 12);
    return { subtotal, discount, total, msi, tier };
  }, [selected]);

  const selectedZones = ZONES.filter((z) => selected.has(z.id));

  const waMsg = useMemo(() => {
    if (selectedZones.length === 0)
      return encodeURIComponent("Hola, me interesa armar un paquete de depilación láser. ¿Pueden orientarme?");
    const zonasList = selectedZones.map((z) => z.label).join(", ");
    const descuento = tier.pct > 0 ? ` Con un ${tier.pct}% de descuento el total sería $${total.toLocaleString("es-MX")} MXN.` : ` El total sería $${total.toLocaleString("es-MX")} MXN.`;
    return encodeURIComponent(
      `Hola, armé mi paquete personalizado con estas zonas: ${zonasList}.${descuento} ¿Cuándo tienen disponibilidad para mi consulta gratis? 😊`
    );
  }, [selectedZones, tier, total]);

  return (
    <section className="py-16 md:py-20" style={{ background: "#0a1520" }}>
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[#c9a96e] text-xs font-bold uppercase tracking-[0.18em] mb-5 px-4 py-2 rounded-full border border-[#c9a96e]/25 bg-[#c9a96e]/8">
            <Sparkles className="w-3.5 h-3.5" />
            Armador de paquete
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-black text-white mb-4">
            🌿 Arma tu paquete
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            Personaliza tu depilación eligiendo las zonas que necesitas y obtén mejores beneficios mientras más agregas. Ideal para adaptar tu experiencia a tu rutina.
          </p>
          {/* Discount ladder */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {DISCOUNT_TIERS.filter((t) => t.pct > 0).map((t) => (
              <div
                key={t.pct}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={
                  selected.size >= t.min && selected.size <= t.max
                    ? { background: "#c9a96e22", border: "1px solid #c9a96e60", color: "#c9a96e" }
                    : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)" }
                }
              >
                <Tag className="w-3 h-3" />
                {t.min === 5 ? "5+ zonas" : `${t.min} zonas`} → -{t.pct}%
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Zone selector */}
          <div className="lg:col-span-2 space-y-6">
            {CATEGORIES.map((cat) => {
              const catZones = ZONES.filter((z) => z.category === cat);
              return (
                <div key={cat}>
                  <div className="text-white/35 text-xs font-bold uppercase tracking-[0.18em] mb-3">{cat}</div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {catZones.map((zone) => {
                      const isActive = selected.has(zone.id);
                      return (
                        <button
                          key={zone.id}
                          onClick={() => toggle(zone.id)}
                          className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-200 hover:scale-[1.01]"
                          style={{
                            background: isActive ? "rgba(37,150,190,0.12)" : "rgba(255,255,255,0.03)",
                            border: isActive ? "1.5px solid rgba(37,150,190,0.5)" : "1.5px solid rgba(255,255,255,0.06)",
                            boxShadow: isActive ? "0 0 20px rgba(37,150,190,0.12)" : "none",
                          }}
                        >
                          {/* Checkbox */}
                          <div
                            className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all duration-200"
                            style={{
                              background: isActive ? "#2596be" : "transparent",
                              border: isActive ? "2px solid #2596be" : "2px solid rgba(255,255,255,0.2)",
                            }}
                          >
                            {isActive && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>

                          <span className="text-lg">{zone.emoji}</span>

                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-semibold transition-colors ${isActive ? "text-white" : "text-white/60"}`}>
                              {zone.label}
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className={`text-sm font-bold transition-colors ${isActive ? "text-primary" : "text-white/35"}`}>
                              ${zone.price.toLocaleString("es-MX")}
                            </div>
                            <div className="text-white/25 text-[10px]">/ sesión</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary card — sticky */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24 rounded-3xl overflow-hidden"
              style={{ background: "#111a24", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="h-1" style={{ background: "linear-gradient(90deg, #2596be, #56cfe1, #c9a96e)" }} />
              <div className="p-6">
                <div className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">Tu paquete</div>

                {selectedZones.length === 0 ? (
                  <div className="py-8 text-center">
                    <div className="text-4xl mb-3">🌿</div>
                    <p className="text-white/30 text-sm">Selecciona las zonas que quieres tratar</p>
                  </div>
                ) : (
                  <>
                    {/* Selected zones list */}
                    <div className="space-y-1.5 mb-5 max-h-48 overflow-y-auto pr-1">
                      {selectedZones.map((z) => (
                        <div key={z.id} className="flex items-center justify-between text-sm">
                          <span className="text-white/65 flex items-center gap-1.5">
                            <span>{z.emoji}</span> {z.label}
                          </span>
                          <span className="text-white/45">${z.price.toLocaleString("es-MX")}</span>
                        </div>
                      ))}
                    </div>

                    {/* Subtotal */}
                    <div className="border-t border-white/8 pt-4 space-y-2 mb-5">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/45">Subtotal</span>
                        <span className="text-white/60">${subtotal.toLocaleString("es-MX")}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[#c9a96e] font-semibold flex items-center gap-1">
                            <Tag className="w-3 h-3" /> Descuento {tier.pct}%
                          </span>
                          <span className="text-[#c9a96e] font-semibold">-${discount.toLocaleString("es-MX")}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-baseline">
                        <span className="text-white font-bold">Total / sesión</span>
                        <span className="font-display text-2xl font-black text-white">${total.toLocaleString("es-MX")}</span>
                      </div>
                      <div className="text-primary text-xs text-right">
                        o desde <span className="font-bold">${msi}/mes</span> a 12 MSI
                      </div>
                    </div>

                    {/* Discount badge */}
                    {tier.label && (
                      <div
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold mb-5"
                        style={{ background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.3)", color: "#c9a96e" }}
                      >
                        🎉 {tier.label}
                      </div>
                    )}
                  </>
                )}

                {/* CTAs */}
                <div className="space-y-2">
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-3.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {selectedZones.length > 0 ? "Enviar mi paquete por WhatsApp" : "Consultar por WhatsApp"}
                  </a>
                  <Link
                    href="/agendar"
                    className="w-full flex items-center justify-center gap-2 text-white/60 hover:text-white border border-white/10 hover:border-white/25 font-semibold py-3 rounded-2xl text-sm transition-all duration-200"
                  >
                    Agendar consulta gratis
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <p className="text-white/20 text-[10px] text-center mt-3">
                  Sin compromiso · Precios por sesión · Sujetos a evaluación
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

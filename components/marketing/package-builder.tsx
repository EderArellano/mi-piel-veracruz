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
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
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
    <section className="py-16 md:py-20" style={{ background: "#FAFAF8" }}>
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] mb-5 px-4 py-2 rounded-full"
            style={{ color: "#C8A96A", border: "1px solid rgba(200,169,106,.25)", background: "rgba(200,169,106,.08)" }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Armador de paquete
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-black mb-4" style={{ color: "#2B2B2B" }}>
            Arma tu paquete personalizado
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6F6F6F" }}>
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
                    ? { background: "rgba(95,124,113,.1)", border: "1px solid rgba(95,124,113,.35)", color: "#5F7C71" }
                    : { background: "white", border: "1px solid #E7E3DC", color: "#9A9A9A" }
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
                  <div className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "#9A9A9A" }}>{cat}</div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {catZones.map((zone) => {
                      const isActive = selected.has(zone.id);
                      return (
                        <button
                          key={zone.id}
                          onClick={() => toggle(zone.id)}
                          className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-200 hover:scale-[1.01]"
                          style={{
                            background: isActive ? "rgba(95,124,113,.06)" : "white",
                            border: isActive ? "1.5px solid rgba(95,124,113,.45)" : "1.5px solid #E7E3DC",
                            boxShadow: isActive ? "0 4px 16px rgba(95,124,113,.1)" : "0 2px 8px rgba(0,0,0,.03)",
                          }}
                        >
                          {/* Checkbox */}
                          <div
                            className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all duration-200"
                            style={{
                              background: isActive ? "#5F7C71" : "white",
                              border: isActive ? "2px solid #5F7C71" : "2px solid #E7E3DC",
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
                            <div
                              className="text-sm font-semibold transition-colors"
                              style={{ color: isActive ? "#2B2B2B" : "#6F6F6F" }}
                            >
                              {zone.label}
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div
                              className="text-sm font-bold transition-colors"
                              style={{ color: isActive ? "#5F7C71" : "#9A9A9A" }}
                            >
                              ${zone.price.toLocaleString("es-MX")}
                            </div>
                            <div className="text-[10px]" style={{ color: "#9A9A9A" }}>/ sesión</div>
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
              style={{ background: "white", border: "1px solid #E7E3DC", borderRadius: "22px", boxShadow: "0 10px 35px rgba(0,0,0,.05)" }}
            >
              <div className="h-1" style={{ background: "linear-gradient(90deg, #5F7C71, #C8A96A)" }} />
              <div className="p-6">
                <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#2B2B2B" }}>Tu paquete</div>

                {selectedZones.length === 0 ? (
                  <div className="py-6 text-center">
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                      style={{ background: "rgba(95,124,113,.08)", border: "1px solid rgba(95,124,113,.2)" }}
                    >
                      <Sparkles className="w-4 h-4" style={{ color: "#5F7C71" }} />
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#5F7C71" }}>Paquete Personalizado</span>
                    </div>
                    <p className="text-sm" style={{ color: "#9A9A9A" }}>Selecciona las zonas que quieres tratar</p>
                  </div>
                ) : (
                  <>
                    {/* Selected zones list */}
                    <div className="space-y-1.5 mb-5 max-h-48 overflow-y-auto pr-1">
                      {selectedZones.map((z) => (
                        <div key={z.id} className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1.5" style={{ color: "#2B2B2B" }}>
                            <span>{z.emoji}</span> {z.label}
                          </span>
                          <span style={{ color: "#6F6F6F" }}>${z.price.toLocaleString("es-MX")}</span>
                        </div>
                      ))}
                    </div>

                    {/* Subtotal */}
                    <div className="pt-4 space-y-2 mb-5" style={{ borderTop: "1px solid #E7E3DC" }}>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: "#6F6F6F" }}>Subtotal</span>
                        <span style={{ color: "#6F6F6F" }}>${subtotal.toLocaleString("es-MX")}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold flex items-center gap-1" style={{ color: "#C8A96A" }}>
                            <Tag className="w-3 h-3" /> Descuento {tier.pct}%
                          </span>
                          <span className="font-semibold" style={{ color: "#C8A96A" }}>-${discount.toLocaleString("es-MX")}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold" style={{ color: "#2B2B2B" }}>Total / sesión</span>
                        <span className="font-display text-2xl font-black" style={{ color: "#2B2B2B" }}>${total.toLocaleString("es-MX")}</span>
                      </div>
                      <div className="text-xs text-right" style={{ color: "#5F7C71" }}>
                        o desde <span className="font-bold">${msi}/mes</span> a 12 MSI
                      </div>
                    </div>

                    {/* Discount badge */}
                    {tier.label && (
                      <div
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold mb-5"
                        style={{ background: "rgba(200,169,106,.1)", border: "1px solid rgba(200,169,106,.3)", color: "#A07840" }}
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
                    className="w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-2xl text-sm transition-all duration-200"
                    style={{ border: "1.5px solid #E7E3DC", color: "#6F6F6F", background: "white" }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "#5F7C71";
                      el.style.color = "#5F7C71";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "#E7E3DC";
                      el.style.color = "#6F6F6F";
                    }}
                  >
                    Agendar consulta gratis
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <p className="text-[10px] text-center mt-3" style={{ color: "#9A9A9A" }}>
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

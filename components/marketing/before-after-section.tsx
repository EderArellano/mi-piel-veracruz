"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ZoomIn } from "lucide-react";

const ZONES = [
  {
    id: "axilas",
    label: "Axilas",
    sessions: 6,
    duration: "4 meses",
    reduction: "94%",
    beforeNote: "Foliculitis · Manchas oscuras",
    afterNote: "Piel suave · Sin irritación",
    beforeBg: "linear-gradient(155deg,#C4A882 0%,#A8845A 40%,#B89060 100%)",
    afterBg: "linear-gradient(155deg,#F5EDE0 0%,#EDE0CC 40%,#F8F2E8 100%)",
  },
  {
    id: "piernas",
    label: "Piernas",
    sessions: 8,
    duration: "6 meses",
    reduction: "91%",
    beforeNote: "Vellos encarnados · Rasurado diario",
    afterNote: "Piernas lisas · Resultado permanente",
    beforeBg: "linear-gradient(155deg,#BFA882 0%,#A08860 40%,#B89870 100%)",
    afterBg: "linear-gradient(155deg,#F2EBE0 0%,#EAE0D4 40%,#F5F0E8 100%)",
  },
  {
    id: "bikini",
    label: "Bikini Brasileño",
    sessions: 7,
    duration: "5 meses",
    reduction: "96%",
    beforeNote: "Irritación · Pelos encarnados",
    afterNote: "Libertad total · Sin molestias",
    beforeBg: "linear-gradient(155deg,#C2A07A 0%,#A87A50 40%,#BC9060 100%)",
    afterBg: "linear-gradient(155deg,#F4ECD8 0%,#ECDFCA 40%,#F8F2E5 100%)",
  },
  {
    id: "facial",
    label: "Facial",
    sessions: 8,
    duration: "6 meses",
    reduction: "89%",
    beforeNote: "Vello visible · Manchas por rasurado",
    afterNote: "Rostro limpio · Sin marcas",
    beforeBg: "linear-gradient(155deg,#C8AA88 0%,#AC8860 40%,#C0986A 100%)",
    afterBg: "linear-gradient(155deg,#F6EEE2 0%,#EEE2D2 40%,#F9F4EC 100%)",
  },
];

const DOT_SVG = `url("data:image/svg+xml,%3Csvg width='6' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1' fill='%23000' opacity='0.18'/%3E%3C/svg%3E")`;

function ComparisonSlider({ zone }: { zone: (typeof ZONES)[0] }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const clamp = (v: number) => Math.min(95, Math.max(5, v));

  const updatePos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging.current) updatePos(e.clientX); };
    const onUp = () => { dragging.current = false; };
    const onTouchMove = (e: TouchEvent) => { if (dragging.current) updatePos(e.touches[0].clientX); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [updatePos]);

  const touched = pos !== 50;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl select-none cursor-ew-resize"
      style={{ height: "clamp(260px, 38vw, 400px)" }}
      onMouseDown={(e) => { e.preventDefault(); dragging.current = true; updatePos(e.clientX); }}
      onTouchStart={(e) => { dragging.current = true; updatePos(e.touches[0].clientX); }}
    >
      {/* BEFORE */}
      <div className="absolute inset-0" style={{ background: zone.beforeBg }}>
        <div className="absolute inset-0" style={{ backgroundImage: DOT_SVG, backgroundSize: "6px 6px" }} />
        <span className="absolute top-4 right-4 text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: "rgba(0,0,0,.45)", color: "white" }}>Antes</span>
        <span className="absolute bottom-4 right-4 text-xs font-medium px-2.5 py-1 rounded-full text-right" style={{ background: "rgba(0,0,0,.35)", color: "white", backdropFilter: "blur(4px)", maxWidth: "55%" }}>{zone.beforeNote}</span>
      </div>

      {/* AFTER — clipped */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <div className="absolute inset-0" style={{ background: zone.afterBg }} />
        <span className="absolute top-4 left-4 text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: "rgba(95,124,113,.85)", color: "white" }}>Después</span>
        <span className="absolute bottom-4 left-4 text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: "rgba(95,124,113,.8)", color: "white", backdropFilter: "blur(4px)", maxWidth: "55%" }}>{zone.afterNote}</span>
      </div>

      {/* Divider */}
      <div className="absolute top-0 bottom-0 w-px pointer-events-none" style={{ left: `${pos}%`, background: "white", boxShadow: "0 0 8px rgba(0,0,0,.3)" }} />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full flex items-center justify-center pointer-events-none"
        style={{ left: `${pos}%`, width: 44, height: 44, background: "white", boxShadow: "0 4px 20px rgba(0,0,0,.25)", border: "2px solid rgba(255,255,255,.9)" }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 10H13M7 10L4 7M7 10L4 13M13 10L16 7M13 10L16 13" stroke="#5F7C71" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Drag hint */}
      {!touched && (
        <div className="absolute bottom-12 inset-x-0 flex justify-center pointer-events-none">
          <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: "rgba(0,0,0,.3)", color: "rgba(255,255,255,.85)" }}>
            Arrastra para comparar
          </span>
        </div>
      )}
    </div>
  );
}

export function BeforeAfterSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const zone = ZONES[activeIdx];

  return (
    <section className="py-16 md:py-24" style={{ background: "#FAFAF8" }}>
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.16em] mb-5"
            style={{ color: "#5F7C71", background: "rgba(95,124,113,.08)", border: "1px solid rgba(95,124,113,.18)" }}
          >
            <ZoomIn className="w-3.5 h-3.5" />
            Resultados reales · Pacientes de Veracruz
          </div>
          <h2
            className="font-display font-black tracking-tight mb-3"
            style={{ color: "#2B2B2B", fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Antes y después del{" "}
            <span style={{ background: "linear-gradient(125deg, #5F7C71, #C8A96A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Láser Diodo
            </span>
          </h2>
          <p style={{ color: "#6F6F6F", fontSize: "16px" }}>
            Piel morena veracruzana · Con autorización de pacientes
          </p>
        </div>

        {/* Zone tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {ZONES.map((z, i) => (
            <button
              key={z.id}
              onClick={() => setActiveIdx(i)}
              className="text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200"
              style={
                i === activeIdx
                  ? { background: "#5F7C71", color: "white", boxShadow: "0 4px 14px rgba(95,124,113,.3)" }
                  : { background: "white", color: "#6F6F6F", border: "1px solid #E7E3DC" }
              }
            >
              {z.label}
            </button>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <ComparisonSlider zone={zone} />

          {/* Stats bar */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "Reducción de vello", value: zone.reduction },
              { label: "Sesiones", value: `${zone.sessions} ses.` },
              { label: "Duración tratam.", value: zone.duration },
            ].map(({ label, value }) => (
              <div key={label} className="text-center py-3" style={{ background: "white", border: "1px solid #E7E3DC", borderRadius: 14 }}>
                <div className="font-display font-black text-lg" style={{ color: "#5F7C71" }}>{value}</div>
                <div className="text-xs mt-0.5" style={{ color: "#9A9A9A" }}>{label}</div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs mt-3" style={{ color: "#C0C0C0" }}>
            Resultados individuales pueden variar · Fotos con autorización escrita de las pacientes
          </p>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/agendar"
            className="group inline-flex items-center gap-2.5 font-bold text-white px-9 py-4 transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "#5F7C71", borderRadius: "18px", boxShadow: "0 0 35px rgba(95,124,113,.25)" }}
          >
            Quiero resultados así — Consulta gratis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Upload, Camera, ArrowRight, Star, CheckCircle2, Loader2, AlertCircle, MessageCircle, RotateCcw } from "lucide-react";

const WA_NUMBER = "522299330014";

type Hallazgo = { area: string; nivel: "leve" | "moderado" | "significativo"; descripcion: string };
type Tratamiento = { tratamiento: string; prioridad: "alta" | "media"; razon: string };
type Analysis = {
  puntuacion: number;
  tipo_piel: string;
  tono: string;
  hallazgos: Hallazgo[];
  tratamientos_recomendados: Tratamiento[];
  rutina_sugerida: string[];
  mensaje_motivador: string;
  siguiente_paso: string;
};

const nivelColor: Record<string, string> = {
  leve: "#22c55e",
  moderado: "#f59e0b",
  significativo: "#ef4444",
};

const scoreColor = (n: number) =>
  n >= 8 ? "#22c55e" : n >= 6 ? "#f59e0b" : "#ef4444";

export function SkinAnalyzerClient() {
  const [image, setImage] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<string>("image/jpeg");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Solo se aceptan imágenes (JPG, PNG, WebP).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("La imagen no puede superar 10 MB.");
      return;
    }
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const base64 = dataUrl.split(",")[1];
      setImage(base64);
      setMediaType(file.type || "image/jpeg");
      setPreview(dataUrl);
      setAnalysis(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const analyze = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/skin-analyzer/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: image, mediaType }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Error al procesar el análisis. Intenta de nuevo.");
        return;
      }
      setAnalysis(data.analysis);
    } catch {
      setError("Error de conexión. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setPreview(null);
    setAnalysis(null);
    setError(null);
  };

  const waMsg = analysis
    ? encodeURIComponent(`Hola, acabo de hacer mi análisis de piel con el Skin Analyzer de MiPiel. Mi puntuación fue ${analysis.puntuacion}/10 (piel ${analysis.tipo_piel.toLowerCase()}). Me interesa agendar mi consulta presencial gratuita. 😊`)
    : encodeURIComponent("Hola, quiero agendar mi consulta gratuita con el Skin Analyzer presencial. ¿Tienen disponibilidad?");

  return (
    <div style={{ background: "#070d14", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary/12 blur-[180px] pointer-events-none" />
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[#22c55e] text-xs font-bold uppercase tracking-[0.18em] mb-6 px-3 py-1.5 rounded-full border border-[#22c55e]/25 bg-[#22c55e]/8">
            <CheckCircle2 className="w-3.5 h-3.5" />
            100% Gratuito · Sin registro
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4">
            Skin Analyzer{" "}
            <span style={{ background: "linear-gradient(125deg, #2596be, #56cfe1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              con IA
            </span>
          </h1>
          <p className="text-white/55 text-xl mb-4">
            Sube una foto de tu piel y obtén tu análisis personalizado en segundos.
            Manchas, poros, tipo de piel, tratamientos recomendados.
          </p>
          <div className="flex items-center justify-center gap-2 text-white/35 text-sm">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
            <span>4.9 · 49 reseñas · 5,000+ pacientes en Veracruz</span>
          </div>
        </div>
      </section>

      <div className="section-container pb-20 max-w-4xl mx-auto">
        {!analysis ? (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload zone */}
            <div>
              <div
                className="rounded-3xl overflow-hidden"
                style={{ background: "#111a24", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="h-1" style={{ background: "linear-gradient(90deg, #2596be, #56cfe1)" }} />
                <div className="p-7">
                  <h2 className="font-display text-xl font-bold text-white mb-2">Sube tu foto</h2>
                  <p className="text-white/40 text-sm mb-6">
                    Foto de rostro con buena iluminación, sin filtros. JPG, PNG o WebP. Máx. 10 MB.
                  </p>

                  {!preview ? (
                    <div
                      className="border-2 border-dashed border-white/15 rounded-2xl p-10 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                      onDrop={onDrop}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() => fileRef.current?.click()}
                    >
                      <Upload className="w-10 h-10 text-white/25 mx-auto mb-4" />
                      <p className="text-white/50 text-sm mb-1">Arrastra tu foto aquí</p>
                      <p className="text-white/30 text-xs">o haz clic para seleccionar</p>
                    </div>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={preview} alt="Preview" className="w-full h-56 object-cover" />
                      <button
                        onClick={reset}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
                      >
                        <RotateCcw className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  )}

                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                  <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onFileChange} />

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="flex-1 flex items-center justify-center gap-2 text-white/60 hover:text-white text-sm py-2.5 rounded-xl border border-white/10 hover:border-white/25 transition-all"
                    >
                      <Upload className="w-4 h-4" /> Galería
                    </button>
                    <button
                      onClick={() => cameraRef.current?.click()}
                      className="flex-1 flex items-center justify-center gap-2 text-white/60 hover:text-white text-sm py-2.5 rounded-xl border border-white/10 hover:border-white/25 transition-all"
                    >
                      <Camera className="w-4 h-4" /> Cámara
                    </button>
                  </div>

                  {error && (
                    <div className="mt-4 flex items-start gap-2 text-red-400 text-sm p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      {error}
                    </div>
                  )}

                  <button
                    onClick={analyze}
                    disabled={!image || loading}
                    className="w-full mt-5 flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                    style={{ boxShadow: image ? "0 0 30px rgba(37,150,190,0.4)" : "none" }}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analizando tu piel…
                      </>
                    ) : (
                      <>
                        Analizar mi piel gratis
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <p className="text-white/25 text-xs text-center mt-3">
                    Tu foto no se almacena · Análisis 100% privado
                  </p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="space-y-4">
              <div
                className="rounded-2xl p-5"
                style={{ background: "#111a24", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <h3 className="text-white font-semibold mb-3 text-sm">Para mejores resultados</h3>
                <ul className="space-y-2">
                  {[
                    "Luz natural o blanca directa al rostro",
                    "Sin maquillaje, sin filtros",
                    "Foto frontal, enfocada y nítida",
                    "Toma la foto a 30–40 cm de distancia",
                  ].map((tip) => (
                    <li key={tip} className="flex items-center gap-2.5 text-white/50 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary/70 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-2xl p-5"
                style={{ background: "#111a24", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <h3 className="text-white font-semibold mb-3 text-sm">¿Qué analiza la IA?</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["Tipo de piel", "Manchas solares", "Tamaño de poros", "Hidratación", "Signos de edad", "Rojeces", "Vello visible", "Uniformidad de tono"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-white/45 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="rounded-2xl p-5"
                style={{ background: "linear-gradient(135deg, #059669/15, #111a24)", border: "1px solid rgba(5,150,105,0.2)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                  <span className="text-[#22c55e] font-semibold text-sm">Después del análisis</span>
                </div>
                <p className="text-white/50 text-sm">
                  Agenda tu consulta presencial gratis con el Skin Analyzer clínico. Diagnóstico preciso con cámara de imágenes médicas.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Results */
          <div className="space-y-6">
            {/* Header card */}
            <div
              className="rounded-3xl overflow-hidden"
              style={{ background: "#111a24", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="h-1" style={{ background: "linear-gradient(90deg, #2596be, #56cfe1, #c9a96e)" }} />
              <div className="p-7 md:p-10 flex flex-col md:flex-row gap-8 items-start">
                {/* Score */}
                <div className="shrink-0 text-center">
                  <div
                    className="w-28 h-28 rounded-full flex items-center justify-center mb-2 mx-auto"
                    style={{ background: `${scoreColor(analysis.puntuacion)}18`, border: `3px solid ${scoreColor(analysis.puntuacion)}50` }}
                  >
                    <span className="font-display text-4xl font-black" style={{ color: scoreColor(analysis.puntuacion) }}>
                      {analysis.puntuacion}
                    </span>
                  </div>
                  <div className="text-white/50 text-sm">de 10</div>
                  <div className="text-white/30 text-xs mt-1">Salud general</div>
                </div>

                <div className="flex-1">
                  <h2 className="font-display text-2xl font-black text-white mb-2">Tu análisis de piel</h2>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-primary bg-primary/15 border border-primary/25">
                      Piel {analysis.tipo_piel}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-white/60 bg-white/8 border border-white/12">
                      Tono {analysis.tono}
                    </span>
                  </div>
                  <p className="text-white/60 leading-relaxed text-sm">{analysis.mensaje_motivador}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Hallazgos */}
              <div
                className="rounded-2xl p-6"
                style={{ background: "#111a24", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <h3 className="font-semibold text-white mb-4">Hallazgos detectados</h3>
                <div className="space-y-3">
                  {analysis.hallazgos.map((h) => (
                    <div key={h.area} className="flex items-start gap-3">
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                        style={{ background: nivelColor[h.nivel] }}
                      />
                      <div>
                        <div className="text-white/80 text-sm font-medium">{h.area}</div>
                        <div className="text-white/40 text-xs">{h.descripcion}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tratamientos */}
              <div
                className="rounded-2xl p-6"
                style={{ background: "#111a24", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <h3 className="font-semibold text-white mb-4">Tratamientos recomendados</h3>
                <div className="space-y-3">
                  {analysis.tratamientos_recomendados.map((t) => (
                    <div
                      key={t.tratamiento}
                      className="p-3 rounded-xl"
                      style={{ background: t.prioridad === "alta" ? "rgba(37,150,190,0.1)" : "rgba(255,255,255,0.04)", border: t.prioridad === "alta" ? "1px solid rgba(37,150,190,0.25)" : "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white/85 text-sm font-medium">{t.tratamiento}</span>
                        {t.prioridad === "alta" && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/15 px-2 py-0.5 rounded-full">Prioritario</span>
                        )}
                      </div>
                      <p className="text-white/40 text-xs">{t.razon}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rutina sugerida */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "#111a24", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h3 className="font-semibold text-white mb-4">Rutina sugerida</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {analysis.rutina_sugerida.map((paso, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl text-center"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="font-display text-2xl font-black text-primary/60 mb-1">{i + 1}</div>
                    <p className="text-white/60 text-xs">{paso}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div
              className="rounded-3xl p-8 text-center"
              style={{ background: "linear-gradient(135deg, #0e1e2e, #1a3a52, #0e1e2e)", border: "1px solid rgba(37,150,190,0.2)" }}
            >
              <h3 className="font-display text-2xl font-black text-white mb-2">
                {analysis.siguiente_paso}
              </h3>
              <p className="text-white/45 text-sm mb-6 max-w-lg mx-auto">
                Este análisis es orientativo. El Skin Analyzer clínico de MiPiel usa cámara de imágenes médicas para un diagnóstico preciso y personalizado. Completamente gratis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/agendar"
                  className="inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                  style={{ boxShadow: "0 0 35px rgba(37,150,190,0.4)" }}
                >
                  Agendar Skin Analyzer presencial — Gratis
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 border border-white/15 text-white/65 hover:text-white hover:border-white/35 hover:bg-white/5 font-semibold px-8 py-4 rounded-2xl transition-all duration-200"
                >
                  <MessageCircle className="w-5 h-5 text-[#22c55e]" />
                  Enviar mi análisis por WhatsApp
                </a>
              </div>
              <button onClick={reset} className="mt-4 text-white/30 hover:text-white/60 text-sm transition-colors flex items-center gap-1.5 mx-auto">
                <RotateCcw className="w-3.5 h-3.5" />
                Analizar otra foto
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

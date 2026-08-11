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

      if (res.status === 503 && data.error === "not_configured") {
        setError("coming_soon");
        return;
      }
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
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        {/* Soft sage radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: "800px", height: "500px", background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37,150,190,.08) 0%, transparent 70%)" }}
        />
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] mb-6 px-3 py-1.5 rounded-full"
            style={{ color: "#4CAF72", border: "1px solid rgba(76,175,114,.25)", background: "rgba(76,175,114,.1)" }}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            100% Gratuito · Sin registro
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black leading-tight tracking-tight mb-4" style={{ color: "#2B2B2B" }}>
            Skin Analyzer{" "}
            <span style={{ background: "linear-gradient(125deg, #2596be, #C8A96A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              con IA
            </span>
          </h1>
          <p className="text-xl mb-4" style={{ color: "#6F6F6F" }}>
            Sube una foto de tu piel y obtén tu análisis personalizado en segundos.
            Manchas, poros, tipo de piel, tratamientos recomendados.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm" style={{ color: "#9A9A9A" }}>
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
                className="overflow-hidden"
                style={{ background: "white", border: "1px solid #E7E3DC", borderRadius: "22px", boxShadow: "0 10px 35px rgba(0,0,0,.05)" }}
              >
                <div className="h-1" style={{ background: "linear-gradient(90deg, #2596be, #C8A96A)" }} />
                <div className="p-7">
                  <h2 className="font-display text-xl font-bold mb-2" style={{ color: "#2B2B2B" }}>Sube tu foto</h2>
                  <p className="text-sm mb-6" style={{ color: "#6F6F6F" }}>
                    Foto de rostro con buena iluminación, sin filtros. JPG, PNG o WebP. Máx. 10 MB.
                  </p>

                  {!preview ? (
                    <div
                      className="border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200"
                      style={{ borderColor: "#E7E3DC", background: "#FAFAF8" }}
                      onDrop={onDrop}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() => fileRef.current?.click()}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "#2596be";
                        el.style.background = "rgba(37,150,190,.03)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "#E7E3DC";
                        el.style.background = "#FAFAF8";
                      }}
                    >
                      <Upload className="w-10 h-10 mx-auto mb-4" style={{ color: "#9A9A9A" }} />
                      <p className="text-sm mb-1" style={{ color: "#6F6F6F" }}>Arrastra tu foto aquí</p>
                      <p className="text-xs" style={{ color: "#9A9A9A" }}>o haz clic para seleccionar</p>
                    </div>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={preview} alt="Preview" className="w-full h-56 object-cover" />
                      <button
                        onClick={reset}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        style={{ background: "rgba(43,43,43,.6)", color: "white" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(43,43,43,.8)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(43,43,43,.6)"; }}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                  <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onFileChange} />

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="flex-1 flex items-center justify-center gap-2 text-sm py-2.5 rounded-xl transition-all"
                      style={{ border: "1px solid #E7E3DC", color: "#6F6F6F", background: "white" }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "#2596be";
                        el.style.color = "#2596be";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "#E7E3DC";
                        el.style.color = "#6F6F6F";
                      }}
                    >
                      <Upload className="w-4 h-4" /> Galería
                    </button>
                    <button
                      onClick={() => cameraRef.current?.click()}
                      className="flex-1 flex items-center justify-center gap-2 text-sm py-2.5 rounded-xl transition-all"
                      style={{ border: "1px solid #E7E3DC", color: "#6F6F6F", background: "white" }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "#2596be";
                        el.style.color = "#2596be";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "#E7E3DC";
                        el.style.color = "#6F6F6F";
                      }}
                    >
                      <Camera className="w-4 h-4" /> Cámara
                    </button>
                  </div>

                  {error && error !== "coming_soon" && (
                    <div className="mt-4 flex items-start gap-2 text-red-400 text-sm p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      {error}
                    </div>
                  )}

                  {error === "coming_soon" && (
                    <div
                      className="mt-4 p-4 rounded-xl text-center"
                      style={{ background: "rgba(37,150,190,.06)", border: "1px solid rgba(37,150,190,.2)" }}
                    >
                      <p className="font-semibold text-sm mb-1" style={{ color: "#2596be" }}>Próximamente disponible</p>
                      <p className="text-xs mb-3" style={{ color: "#6F6F6F" }}>
                        Mientras tanto, agenda tu análisis presencial — es gratis y más completo.
                      </p>
                      <Link
                        href="/agendar"
                        className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors"
                        style={{ color: "#2596be" }}
                      >
                        Agendar consulta gratis <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}

                  <button
                    onClick={analyze}
                    disabled={!image || loading}
                    className="w-full mt-5 flex items-center justify-center gap-2.5 text-white font-bold py-3.5 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background: "#2596be",
                      borderRadius: "18px",
                      boxShadow: image ? "0 0 30px rgba(37,150,190,.25)" : "none",
                    }}
                    onMouseEnter={(e) => { if (image && !loading) (e.currentTarget as HTMLElement).style.background = "#1e7a9e"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#2596be"; }}
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
                  <p className="text-xs text-center mt-3" style={{ color: "#9A9A9A" }}>
                    Tu foto no se almacena · Análisis 100% privado
                  </p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="space-y-4">
              <div
                className="rounded-2xl p-5"
                style={{ background: "white", border: "1px solid #E7E3DC", borderRadius: "16px" }}
              >
                <h3 className="font-semibold mb-3 text-sm" style={{ color: "#2B2B2B" }}>Para mejores resultados</h3>
                <ul className="space-y-2">
                  {[
                    "Luz natural o blanca directa al rostro",
                    "Sin maquillaje, sin filtros",
                    "Foto frontal, enfocada y nítida",
                    "Toma la foto a 30–40 cm de distancia",
                  ].map((tip) => (
                    <li key={tip} className="flex items-center gap-2.5 text-sm" style={{ color: "#6F6F6F" }}>
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#2596be" }} />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-2xl p-5"
                style={{ background: "white", border: "1px solid #E7E3DC", borderRadius: "16px" }}
              >
                <h3 className="font-semibold mb-3 text-sm" style={{ color: "#2B2B2B" }}>¿Qué analiza la IA?</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["Tipo de piel", "Manchas solares", "Tamaño de poros", "Hidratación", "Signos de edad", "Rojeces", "Vello visible", "Uniformidad de tono"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs" style={{ color: "#6F6F6F" }}>
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "rgba(37,150,190,.6)" }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="rounded-2xl p-5"
                style={{ background: "rgba(37,150,190,.06)", border: "1px solid rgba(37,150,190,.2)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4" style={{ color: "#4CAF72" }} />
                  <span className="font-semibold text-sm" style={{ color: "#4CAF72" }}>Después del análisis</span>
                </div>
                <p className="text-sm" style={{ color: "#6F6F6F" }}>
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
              className="overflow-hidden"
              style={{ background: "white", border: "1px solid #E7E3DC", borderRadius: "22px" }}
            >
              <div className="h-1" style={{ background: "linear-gradient(90deg, #2596be, #C8A96A)" }} />
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
                  <div className="text-sm" style={{ color: "#6F6F6F" }}>de 10</div>
                  <div className="text-xs mt-1" style={{ color: "#9A9A9A" }}>Salud general</div>
                </div>

                <div className="flex-1">
                  <h2 className="font-display text-2xl font-black mb-2" style={{ color: "#2B2B2B" }}>Tu análisis de piel</h2>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ color: "#2596be", background: "rgba(37,150,190,.1)", border: "1px solid rgba(37,150,190,.25)" }}
                    >
                      Piel {analysis.tipo_piel}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ color: "#6F6F6F", background: "#F4F2EE", border: "1px solid #E7E3DC" }}
                    >
                      Tono {analysis.tono}
                    </span>
                  </div>
                  <p className="leading-relaxed text-sm" style={{ color: "#6F6F6F" }}>{analysis.mensaje_motivador}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Hallazgos */}
              <div
                className="rounded-2xl p-6"
                style={{ background: "white", border: "1px solid #E7E3DC", borderRadius: "16px" }}
              >
                <h3 className="font-semibold mb-4" style={{ color: "#2B2B2B" }}>Hallazgos detectados</h3>
                <div className="space-y-3">
                  {analysis.hallazgos.map((h) => (
                    <div key={h.area} className="flex items-start gap-3">
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                        style={{ background: nivelColor[h.nivel] }}
                      />
                      <div>
                        <div className="text-sm font-medium" style={{ color: "#2B2B2B" }}>{h.area}</div>
                        <div className="text-xs" style={{ color: "#6F6F6F" }}>{h.descripcion}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tratamientos */}
              <div
                className="rounded-2xl p-6"
                style={{ background: "white", border: "1px solid #E7E3DC", borderRadius: "16px" }}
              >
                <h3 className="font-semibold mb-4" style={{ color: "#2B2B2B" }}>Tratamientos recomendados</h3>
                <div className="space-y-3">
                  {analysis.tratamientos_recomendados.map((t) => (
                    <div
                      key={t.tratamiento}
                      className="p-3 rounded-xl"
                      style={{
                        background: t.prioridad === "alta" ? "rgba(37,150,190,.05)" : "#FAFAF8",
                        border: t.prioridad === "alta" ? "1px solid rgba(37,150,190,.15)" : "1px solid #E7E3DC",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium" style={{ color: "#2B2B2B" }}>{t.tratamiento}</span>
                        {t.prioridad === "alta" && (
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{ color: "#2596be", background: "rgba(37,150,190,.1)" }}
                          >
                            Prioritario
                          </span>
                        )}
                      </div>
                      <p className="text-xs" style={{ color: "#6F6F6F" }}>{t.razon}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rutina sugerida */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "white", border: "1px solid #E7E3DC", borderRadius: "16px" }}
            >
              <h3 className="font-semibold mb-4" style={{ color: "#2B2B2B" }}>Rutina sugerida</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {analysis.rutina_sugerida.map((paso, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl text-center"
                    style={{ background: "#FAFAF8", border: "1px solid #E7E3DC" }}
                  >
                    <div
                      className="font-display text-2xl font-black mb-1"
                      style={{ color: "rgba(37,150,190,.6)" }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-xs" style={{ color: "#6F6F6F" }}>{paso}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div
              className="rounded-3xl p-8 text-center"
              style={{ background: "linear-gradient(135deg, #2596be, #1e7a9e)" }}
            >
              <h3 className="font-display text-2xl font-black text-white mb-2">
                {analysis.siguiente_paso}
              </h3>
              <p className="text-sm mb-6 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,.75)" }}>
                Este análisis es orientativo. El Skin Analyzer clínico de MiPiel usa cámara de imágenes médicas para un diagnóstico preciso y personalizado. Completamente gratis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/agendar"
                  className="inline-flex items-center justify-center gap-2.5 font-bold px-8 py-4 transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: "white", color: "#2596be", borderRadius: "18px" }}
                >
                  Agendar Skin Analyzer presencial — Gratis
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 font-semibold px-8 py-4 transition-all duration-200"
                  style={{ border: "1.5px solid rgba(255,255,255,.4)", color: "white", background: "rgba(255,255,255,.08)", borderRadius: "18px" }}
                >
                  <MessageCircle className="w-5 h-5 text-[#22c55e]" />
                  Enviar mi análisis por WhatsApp
                </a>
              </div>
              <button
                onClick={reset}
                className="mt-4 text-sm flex items-center gap-1.5 mx-auto transition-colors"
                style={{ color: "rgba(255,255,255,.5)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.5)"; }}
              >
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

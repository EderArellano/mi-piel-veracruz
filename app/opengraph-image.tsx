import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mi Piel Veracruz — Depilación Láser en Veracruz y Boca del Río";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAFAF8",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "72px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Sage radial glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(95,124,113,0.14) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        {/* Gold glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -80,
            width: 440,
            height: 440,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(200,169,106,0.10) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top pill badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(95,124,113,0.10)",
            border: "1px solid rgba(95,124,113,0.30)",
            borderRadius: 100,
            padding: "6px 20px",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#5F7C71",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Clínica Dermocosmética · Boca del Río, Veracruz
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: 74,
            fontWeight: 900,
            color: "#2B2B2B",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginBottom: 8,
            display: "flex",
          }}
        >
          Depilación Láser
        </div>
        <div
          style={{
            fontSize: 74,
            fontWeight: 900,
            color: "#2B2B2B",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginBottom: 8,
            display: "flex",
          }}
        >
          en Veracruz.
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#5F7C71",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: 36,
            display: "flex",
          }}
        >
          Para siempre.
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: "#6F6F6F",
            marginBottom: 48,
            lineHeight: 1.45,
            maxWidth: 680,
            display: "flex",
          }}
        >
          Láser Diodo grado médico · 5,000+ pacientes atendidos ·
          Primera consulta gratis
        </div>

        {/* Bottom info row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} style={{ color: "#F59E0B", fontSize: 22 }}>
                ★
              </span>
            ))}
          </div>
          <span style={{ fontSize: 16, color: "#6F6F6F" }}>
            4.9 · 49 reseñas Google
          </span>
          <div
            style={{
              width: 1,
              height: 20,
              background: "#E7E3DC",
              display: "flex",
            }}
          />
          <span
            style={{ fontSize: 16, fontWeight: 700, color: "#5F7C71" }}
          >
            mipielveracruz.com
          </span>
        </div>

        {/* Right accent stripe */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 6,
            background: "linear-gradient(to bottom, #5F7C71, #C8A96A)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}

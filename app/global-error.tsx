"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global-error]", error);
  }, [error]);

  return (
    <html lang="es">
      <head>
        <title>Error — Mi Piel Veracruz</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#FAFAF8",
          fontFamily: "system-ui, -apple-system, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          textAlign: "center",
          color: "#2B2B2B",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: "rgba(37,150,190,.10)",
            border: "1px solid rgba(37,150,190,.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            fontSize: 32,
          }}
        >
          ⚡
        </div>

        <h1 style={{ margin: "0 0 10px", fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em" }}>
          Algo salió mal
        </h1>
        <p style={{ margin: "0 0 32px", color: "#6F6F6F", fontSize: 15, maxWidth: 400, lineHeight: 1.6 }}>
          Ocurrió un error inesperado en la aplicación. Intenta recargar la página.
          Si el problema persiste, puedes contactarnos directamente.
        </p>

        {error.digest && (
          <p
            style={{
              margin: "0 0 20px",
              fontSize: 11,
              color: "#9A9A9A",
              fontFamily: "monospace",
              background: "#F4F2EE",
              padding: "6px 12px",
              borderRadius: 8,
            }}
          >
            Error ID: {error.digest}
          </p>
        )}

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={reset}
            style={{
              background: "#2596be",
              color: "white",
              border: "none",
              borderRadius: 14,
              padding: "12px 28px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Reintentar
          </button>
          <a
            href="https://wa.me/522299330014?text=Hola%2C%20tuve%20un%20error%20en%20la%20p%C3%A1gina%20web."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#22c55e",
              color: "white",
              borderRadius: 14,
              padding: "12px 24px",
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            WhatsApp
          </a>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "white",
              border: "1px solid #E7E3DC",
              color: "#6F6F6F",
              borderRadius: 14,
              padding: "12px 24px",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Ir al inicio
          </a>
        </div>
      </body>
    </html>
  );
}

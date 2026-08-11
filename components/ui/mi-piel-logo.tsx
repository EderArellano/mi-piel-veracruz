"use client";

interface MiPielLogoProps {
  size?: number;
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
}

export function MiPielLogo({
  size = 40,
  showText = true,
  showTagline = false,
  className = "",
}: MiPielLogoProps) {
  const h = Math.round(size * 50 / 44);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon mark */}
      <svg width={size} height={h} viewBox="0 0 44 50" fill="none" aria-hidden>
        {/* Hexagon — pointy top, thick rounded stroke, sky blue */}
        <path
          d="M22 2.5 L40.5 13 L40.5 37 L22 47.5 L3.5 37 L3.5 13 Z"
          stroke="#2596be"
          strokeWidth="3.8"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />

        {/* Heart outline — gray blue, stroke only */}
        <path
          d="M22 37
             C 11 29.5 5 20.5 9.5 14
             C 12 9.5 17.5 9.5 22 16
             C 26.5 9.5 32 9.5 34.5 14
             C 39 20.5 33 29.5 22 37 Z"
          stroke="#8BB0C0"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Water drop — centered inside heart, outline only */}
        <path
          d="M22 16
             C 22 16 15.5 22.5 15.5 28
             C 15.5 31.6 18.4 34.5 22 34.5
             C 25.6 34.5 28.5 31.6 28.5 28
             C 28.5 22.5 22 16 22 16 Z"
          stroke="#8BB0C0"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {showText && (
        <div className="leading-none select-none">
          {/* Wordmark: Mi (gray) + Piel (blue) */}
          <div
            style={{
              fontSize: Math.round(size * 0.78),
              lineHeight: 1,
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ color: "#8BB0C0", fontWeight: 300, fontFamily: "inherit" }}>Mi</span>
            <span style={{ color: "#2596be", fontWeight: 700, fontFamily: "inherit" }}>Piel</span>
          </div>
          {showTagline && (
            <div
              style={{
                color: "#9EB3C0",
                fontSize: Math.round(size * 0.19),
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                marginTop: 3,
                fontWeight: 400,
              }}
            >
              Centro Dermocosmético
            </div>
          )}
        </div>
      )}
    </div>
  );
}

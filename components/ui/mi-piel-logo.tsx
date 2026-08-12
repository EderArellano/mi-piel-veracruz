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
  /*
    ViewBox 100×100. Flat-top hexagon, center (50,50), R=42.
    Vertices: (71,14)(92,50)(71,86)(29,86)(8,50)(29,14)
    Width=84 > Height=72 — wider than tall, matches the Mi Piel logo.

    Heart: single continuous stroke, self-intersects at (50,38).
    Fills the hex interior to match the original logo proportions:
      Bottom (50,84) ≈ 2px above hex bottom (y=86)
      Outer  (15,45) ≈ at the hex left edge
      Lobes  CP y=20 ≈ near hex top edge (y=14)
    All control points exactly mirrored around x=50.
    Drop tip at (50,60).
  */

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>

        {/* Hexagon — flat-top, thick rounded stroke, sky blue */}
        <path
          d="M71,14 L92,50 L71,86 L29,86 L8,50 L29,14 Z"
          stroke="#2596be"
          strokeWidth="5.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />

        {/*
          Heart — single continuous stroke, self-intersects at (50,38),
          enclosing a drop shape (tip at 50,60). Fills the hex interior
          like the original logo. All CPs mirrored exactly around x=50.
        */}
        <path
          d="
            M50,84
            C34,76 10,60 15,45
            C16,32 30,20 40,26
            C44,28 48,35 50,38
            C54,41 58,50 50,60
            C42,50 46,41 50,38
            C52,35 56,28 60,26
            C70,20 84,32 85,45
            C90,60 66,76 50,84 Z
          "
          stroke="#9BB5C0"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />

      </svg>

      {showText && (
        <div className="leading-none select-none">
          <div
            style={{
              fontSize: Math.round(size * 0.78),
              lineHeight: 1,
              letterSpacing: "-0.015em",
            }}
          >
            <span style={{ color: "#9BB5C0", fontWeight: 300 }}>Mi</span>
            <span style={{ color: "#2596be", fontWeight: 400 }}>Piel</span>
          </div>

          {showTagline && (
            <div
              style={{
                color: "#A8BCC3",
                fontSize: Math.round(size * 0.175),
                letterSpacing: "0.22em",
                textTransform: "uppercase" as const,
                marginTop: 4,
                fontWeight: 300,
              }}
            >
              Centro Dermocosmetico
            </div>
          )}
        </div>
      )}
    </div>
  );
}

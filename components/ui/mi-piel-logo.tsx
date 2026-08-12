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
    ViewBox 100×100 (square). Flat-top hexagon, center (50,50), R=42.
    Flat edges at top and bottom; vertices on left and right.
    Vertices (clockwise from top-right):
      (71,14) (92,50) (71,86) (29,86) (8,50) (29,14)
    Width=84, Height=72 — wider than tall, matches the Mi Piel logo.

    Heart: single continuous stroke, self-intersects at (50,42).
    All control points exactly mirrored around x=50.
    Drop tip at (50,62), width ≈16 units.
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
          Heart — single continuous stroke that self-intersects at (50,42),
          enclosing a drop shape between the two passes through that point.
          Perfectly symmetric: every CP mirrored around x=50.
        */}
        <path
          d="
            M50,82
            C36,74 14,60 19,46
            C21,35 30,28 42,33
            C45,35 48,39 50,42
            C54,45 58,53 50,62
            C42,53 46,45 50,42
            C52,39 55,35 58,33
            C70,28 79,35 81,46
            C86,60 64,74 50,82 Z
          "
          stroke="#9BB5C0"
          strokeWidth="2.6"
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

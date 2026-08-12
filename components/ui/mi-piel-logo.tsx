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
    ViewBox 100×110. Hex center (50, 52), outer radius 44.
    POINTY-TOP orientation: single vertex at top and bottom.
    Vertices (R=44, center 50,52):
      Top         (50, 8)
      Top-right   (88, 30)
      Bottom-right(88, 74)
      Bottom      (50, 96)
      Bottom-left (12, 74)
      Top-left    (12, 30)
  */
  const h = Math.round((size * 110) / 100);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={h} viewBox="0 0 100 110" fill="none" aria-hidden>

        {/* Hexagon — pointy-top, thick rounded stroke, sky blue */}
        <path
          d="M50,8 L88,30 L88,74 L50,96 L12,74 L12,30 Z"
          stroke="#2596be"
          strokeWidth="5.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />

        {/*
          Single continuous stroke: heart that self-intersects at (50,44),
          forming a closed drop shape between the two passes.
          All control points are exact mirrors around x=50 for uniform lobes.
          Drop width ≈16 units, tip at (50,64).
        */}
        <path
          d="
            M50,84
            C36,76 14,62 19,48
            C21,37 30,30 42,35
            C45,37 48,41 50,44
            C54,47 58,55 50,64
            C42,55 46,47 50,44
            C52,41 55,37 58,35
            C70,30 79,37 81,48
            C86,62 64,76 50,84 Z
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
          {/*
            Wordmark: same visual weight, color only distinguishes Mi vs Piel.
            Mi = light gray-blue (300), Piel = brand blue (400, not bold).
          */}
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

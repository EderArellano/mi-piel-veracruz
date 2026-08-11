"use client";

interface MiPielLogoProps {
  size?: number;
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
}

export function MiPielLogo({
  size = 38,
  showText = true,
  showTagline = false,
  className = "",
}: MiPielLogoProps) {
  const h = Math.round(size * 1.15);

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Hexagon mark */}
      <svg width={size} height={h} viewBox="0 0 44 50" fill="none" aria-hidden>
        {/* Hexagon outline — flat sides top/bottom, points left/right */}
        <path
          d="M22 2 L41.05 12.5 L41.05 37.5 L22 48 L2.95 37.5 L2.95 12.5 Z"
          stroke="#2596be"
          strokeWidth="2.8"
          fill="none"
          strokeLinejoin="round"
        />
        {/* Water drop / teardrop mark centered inside hex */}
        <path
          d="M22 13 C22 13 13.5 21 13.5 28 C13.5 32.7 17.3 36.5 22 36.5 C26.7 36.5 30.5 32.7 30.5 28 C30.5 21 22 13 22 13 Z"
          fill="#94a3b8"
        />
        {/* Highlight inside drop */}
        <ellipse cx="19" cy="24" rx="2.2" ry="3.5" fill="white" opacity="0.45" />
      </svg>

      {showText && (
        <div className="leading-none">
          <div className="font-display text-[1.1rem] tracking-tight">
            <span style={{ color: "#4B5563", fontWeight: 300 }}>Mi</span>
            <span style={{ color: "#2596be", fontWeight: 700 }}>Piel</span>
          </div>
          {showTagline && (
            <div
              className="text-[0.55rem] uppercase tracking-[0.18em] mt-0.5"
              style={{ color: "#9CA3AF" }}
            >
              Centro Dermocosmético
            </div>
          )}
        </div>
      )}
    </div>
  );
}

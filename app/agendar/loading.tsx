export default function AgendarLoading() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      {/* Top accent */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #2596be, #C8A96A)" }} />

      <div className="section-container py-16 max-w-3xl">
        {/* Heading skeleton */}
        <div className="text-center mb-10">
          <div
            className="animate-pulse rounded-full mx-auto mb-5"
            style={{ height: 26, width: 200, background: "#E7E3DC" }}
          />
          <div
            className="animate-pulse rounded-lg mx-auto mb-3"
            style={{ height: 44, width: "65%", background: "#E7E3DC" }}
          />
          <div
            className="animate-pulse rounded mx-auto"
            style={{ height: 18, width: "45%", background: "#EEEBE5" }}
          />
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-3 mb-10">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center gap-3">
              <div
                className="animate-pulse rounded-full"
                style={{
                  width: 36,
                  height: 36,
                  background: n === 1 ? "#E7E3DC" : "#F4F2EE",
                }}
              />
              {n < 3 && (
                <div
                  className="animate-pulse"
                  style={{ width: 48, height: 2, background: "#E7E3DC" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Calendar skeleton */}
        <div
          className="animate-pulse"
          style={{
            background: "white",
            border: "1px solid #E7E3DC",
            borderRadius: 22,
            padding: 32,
            boxShadow: "0 8px 25px rgba(0,0,0,.04)",
          }}
        >
          {/* Month header */}
          <div className="flex justify-between items-center mb-6">
            <div style={{ width: 32, height: 32, background: "#E7E3DC", borderRadius: 10 }} />
            <div style={{ height: 22, width: 140, background: "#E7E3DC", borderRadius: 6 }} />
            <div style={{ width: 32, height: 32, background: "#E7E3DC", borderRadius: 10 }} />
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-3">
            {["D", "L", "M", "M", "J", "V", "S"].map((d, i) => (
              <div
                key={`${d}-${i}`}
                style={{ height: 16, background: "#F4F2EE", borderRadius: 4 }}
              />
            ))}
          </div>

          {/* Day cells */}
          {Array.from({ length: 5 }).map((_, row) => (
            <div key={row} className="grid grid-cols-7 gap-1 mb-1">
              {Array.from({ length: 7 }).map((_, col) => (
                <div
                  key={col}
                  style={{
                    height: 40,
                    background: (row + col) % 7 === 0 ? "#F4F2EE" : "#E7E3DC",
                    borderRadius: 10,
                    opacity: 0.6 + (row * col) % 3 * 0.13,
                  }}
                />
              ))}
            </div>
          ))}

          {/* Time slots skeleton */}
          <div className="mt-8">
            <div style={{ height: 16, width: 120, background: "#E7E3DC", borderRadius: 4, marginBottom: 12 }} />
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 38,
                    background: i % 3 === 0 ? "#F4F2EE" : "#E7E3DC",
                    borderRadius: 10,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Helper text */}
        <p
          className="text-center mt-6 animate-pulse"
          style={{ color: "#C0C0C0", fontSize: "13px" }}
        >
          Cargando disponibilidad en tiempo real...
        </p>
      </div>
    </div>
  );
}

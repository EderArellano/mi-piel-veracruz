export default function MarketingLoading() {
  return (
    <>
      {/* Top progress bar */}
      <div
        className="fixed top-0 inset-x-0 z-50 h-[3px] overflow-hidden"
        aria-hidden="true"
        style={{ background: "#E7E3DC" }}
      >
        <div
          className="h-full animate-pulse"
          style={{
            width: "100%",
            background: "linear-gradient(90deg, #2596be, #C8A96A, #2596be)",
            backgroundSize: "200% 100%",
            animation: "slide 1.6s ease-in-out infinite",
          }}
        />
      </div>

      {/* Hero skeleton */}
      <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
        <div className="section-container py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div
              className="animate-pulse rounded-full mb-8"
              style={{ height: 28, width: 240, background: "#E7E3DC" }}
            />
            {/* Title lines */}
            <div className="animate-pulse rounded-lg mb-3" style={{ height: 64, width: "80%", background: "#E7E3DC" }} />
            <div className="animate-pulse rounded-lg mb-3" style={{ height: 64, width: "65%", background: "#E7E3DC" }} />
            <div className="animate-pulse rounded-lg mb-8" style={{ height: 48, width: "50%", background: "#EEEBE5" }} />
            {/* Subtitle */}
            <div className="animate-pulse rounded mb-2" style={{ height: 20, width: "90%", background: "#E7E3DC" }} />
            <div className="animate-pulse rounded mb-10" style={{ height: 20, width: "70%", background: "#E7E3DC" }} />
            {/* Buttons */}
            <div className="flex gap-3">
              <div className="animate-pulse rounded-[18px]" style={{ height: 52, width: 220, background: "#E7E3DC" }} />
              <div className="animate-pulse rounded-[18px]" style={{ height: 52, width: 180, background: "#EEEBE5" }} />
            </div>
          </div>
        </div>

        {/* Cards row skeleton */}
        <div style={{ background: "#F4F2EE", padding: "64px 0" }}>
          <div className="section-container">
            <div className="animate-pulse rounded mb-8 mx-auto" style={{ height: 36, width: 340, background: "#E7E3DC" }} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse"
                  style={{
                    height: 200,
                    background: "white",
                    border: "1px solid #E7E3DC",
                    borderRadius: 22,
                    opacity: 1 - i * 0.08,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
}

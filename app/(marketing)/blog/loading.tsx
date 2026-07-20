function CardSkeleton({ wide = false }: { wide?: boolean }) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #E7E3DC",
        borderRadius: 20,
        overflow: "hidden",
        gridColumn: wide ? "span 2" : undefined,
      }}
    >
      {/* Image placeholder */}
      <div className="animate-pulse" style={{ height: wide ? 240 : 180, background: "#E7E3DC" }} />
      <div className="p-5">
        {/* Category pill */}
        <div className="animate-pulse rounded-full mb-3" style={{ height: 20, width: 80, background: "#E7E3DC" }} />
        {/* Title */}
        <div className="animate-pulse rounded mb-2" style={{ height: 22, width: "90%", background: "#E7E3DC" }} />
        <div className="animate-pulse rounded mb-4" style={{ height: 22, width: "70%", background: "#EEEBE5" }} />
        {/* Excerpt */}
        <div className="animate-pulse rounded mb-1" style={{ height: 14, width: "100%", background: "#E7E3DC" }} />
        <div className="animate-pulse rounded mb-5" style={{ height: 14, width: "85%", background: "#E7E3DC" }} />
        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="animate-pulse rounded" style={{ height: 12, width: 90, background: "#E7E3DC" }} />
          <div className="animate-pulse rounded-full" style={{ height: 28, width: 90, background: "#E7E3DC" }} />
        </div>
      </div>
    </div>
  );
}

export default function BlogLoading() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      {/* Header skeleton */}
      <div className="section-container pt-24 pb-10 text-center">
        <div className="animate-pulse rounded-full mx-auto mb-5" style={{ height: 26, width: 120, background: "#E7E3DC" }} />
        <div className="animate-pulse rounded-lg mx-auto mb-3" style={{ height: 44, width: 360, background: "#E7E3DC" }} />
        <div className="animate-pulse rounded mx-auto" style={{ height: 18, width: 280, background: "#EEEBE5" }} />
      </div>

      {/* Featured post */}
      <div className="section-container mb-10">
        <div
          className="animate-pulse"
          style={{ height: 320, background: "white", border: "1px solid #E7E3DC", borderRadius: 22 }}
        />
      </div>

      {/* Grid */}
      <div className="section-container pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

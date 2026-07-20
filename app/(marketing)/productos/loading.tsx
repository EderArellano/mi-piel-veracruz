function ProductCardSkeleton() {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #E7E3DC",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <div className="animate-pulse" style={{ height: 200, background: "#E7E3DC" }} />
      <div className="p-5">
        {/* Brand */}
        <div className="animate-pulse rounded mb-2" style={{ height: 12, width: 60, background: "#EEEBE5" }} />
        {/* Name */}
        <div className="animate-pulse rounded mb-1" style={{ height: 18, width: "85%", background: "#E7E3DC" }} />
        <div className="animate-pulse rounded mb-4" style={{ height: 18, width: "60%", background: "#E7E3DC" }} />
        {/* Desc */}
        <div className="animate-pulse rounded mb-1" style={{ height: 12, width: "100%", background: "#EEEBE5" }} />
        <div className="animate-pulse rounded mb-5" style={{ height: 12, width: "75%", background: "#EEEBE5" }} />
        {/* Price */}
        <div className="flex justify-between items-center">
          <div className="animate-pulse rounded" style={{ height: 22, width: 80, background: "#E7E3DC" }} />
          <div className="animate-pulse rounded-xl" style={{ height: 36, width: 110, background: "#E7E3DC" }} />
        </div>
      </div>
    </div>
  );
}

export default function ProductosLoading() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      {/* Header */}
      <div className="section-container pt-24 pb-10">
        <div className="animate-pulse rounded-full mx-auto mb-5 text-center" style={{ height: 26, width: 180, background: "#E7E3DC", display: "block", marginLeft: "auto", marginRight: "auto" }} />
        <div className="animate-pulse rounded-lg mx-auto mb-3" style={{ height: 44, width: "50%", background: "#E7E3DC", display: "block", marginLeft: "auto", marginRight: "auto" }} />
      </div>

      {/* Filter pills */}
      <div className="section-container mb-8">
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-full"
              style={{ height: 34, width: 80 + i * 18, background: "#E7E3DC" }}
            />
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="section-container pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

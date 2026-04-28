function SkeletonBox({ width = "100%", height = "16px", borderRadius = "6px", style }: {
  width?: string; height?: string; borderRadius?: string; style?: React.CSSProperties;
}) {
  return (
    <div style={{ width, height, borderRadius, background: "var(--bg-surface)", border: "1px solid var(--bg-border)", animation: "skeleton-pulse 1.5s ease-in-out infinite", ...style }} />
  );
}

export function CardSkeleton() {
  return (
    <div style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: "16px", overflow: "hidden" }}>
      <SkeletonBox height="200px" borderRadius="0" />
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", gap: "6px" }}>
          <SkeletonBox width="60px" height="22px" borderRadius="9999px" />
          <SkeletonBox width="80px" height="22px" borderRadius="9999px" />
        </div>
        <SkeletonBox height="20px" />
        <SkeletonBox height="20px" width="80%" />
        <SkeletonBox height="14px" />
        <SkeletonBox height="14px" />
        <SkeletonBox height="14px" width="60%" />
      </div>
      <style>{`
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

export function ListSkeletons({ count = 6 }: { count?: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
      {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );
}

export function ContentPageSkeleton() {
  return (
    <div className="container-max" style={{ padding: "48px 24px 96px" }}>
      <SkeletonBox height="400px" borderRadius="16px" style={{ marginBottom: "48px" }} />
      <div style={{ display: "flex", gap: "6px", marginBottom: "24px" }}>
        <SkeletonBox width="60px" height="22px" borderRadius="9999px" />
        <SkeletonBox width="80px" height="22px" borderRadius="9999px" />
      </div>
      <SkeletonBox height="48px" style={{ marginBottom: "16px" }} />
      <SkeletonBox height="24px" width="60%" style={{ marginBottom: "48px" }} />
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonBox key={i} height="18px" width={`${70 + Math.random() * 30}%`} style={{ marginBottom: "12px" }} />
      ))}
    </div>
  );
}

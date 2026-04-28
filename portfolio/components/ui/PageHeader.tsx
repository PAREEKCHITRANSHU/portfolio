interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  count?: number;
  countLabel?: string;
}

export function PageHeader({ eyebrow, title, description, count, countLabel }: PageHeaderProps) {
  return (
    <div style={{ padding: "80px 0 48px", position: "relative" }}>
      {/* Soft glow behind headline */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse, rgba(28,61,110,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "relative" }}>
        <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", color: "var(--accent-teal)", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "12px" }}>
          {eyebrow}
        </div>
        <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(36px, 6vw, 56px)", color: "var(--text-primary)", marginBottom: "16px", lineHeight: 1.1 }}>
          {title}
        </h1>
        {description && (
          <p style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "18px", color: "var(--text-secondary)", maxWidth: "520px", lineHeight: 1.6 }}>
            {description}
          </p>
        )}
        {count !== undefined && countLabel && (
          <p style={{ marginTop: "16px", fontSize: "13px", color: "var(--text-tertiary)" }}>
            {count} {countLabel}
          </p>
        )}
      </div>
    </div>
  );
}

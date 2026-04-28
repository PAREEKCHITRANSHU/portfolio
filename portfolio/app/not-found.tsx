import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-base)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(28,61,110,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ textAlign: "center", position: "relative" }}>
        <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(80px, 15vw, 160px)", color: "rgba(28,61,110,0.08)", lineHeight: 1, marginBottom: "0", userSelect: "none" }}>
          404
        </div>
        <div style={{ marginTop: "-20px" }}>
          <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", color: "var(--accent-teal)", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "16px" }}>
            Page not found
          </div>
          <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(24px, 4vw, 40px)", color: "var(--text-primary)", marginBottom: "16px" }}>
            Nothing here.
          </h1>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "16px", color: "var(--text-secondary)", marginBottom: "32px" }}>
            The page you&apos;re looking for doesn&apos;t exist or was moved.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Link href="/" className="btn-primary" style={{ fontSize: "14px", padding: "12px 24px" }}>
              Go home
            </Link>
            <Link href="/case-studies" className="btn-ghost" style={{ fontSize: "14px", padding: "12px 24px" }}>
              See my work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

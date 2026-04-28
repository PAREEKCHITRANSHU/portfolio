import Link from "next/link";
import Image from "next/image";
import { AnimateIn } from "@/components/motion/AnimateIn";
import type { ExperienceEntry } from "@/lib/types";

function fmt(d: string) { return new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" }); }
function dateRange(start: string, end: string | null, isCurrent: boolean) {
  return `${fmt(start)} — ${isCurrent ? "Present" : end ? fmt(end) : ""}`;
}

export function ExperiencePreview({ experience }: { experience: ExperienceEntry[] }) {
  if (experience.length === 0) return null;
  const preview = experience.slice(0, 3);

  return (
    <section style={{ padding: "96px 0", background: "var(--bg-subtle)", borderTop: "1px solid var(--bg-border)", borderBottom: "1px solid var(--bg-border)" }}>
      <div className="container-max">
        <AnimateIn>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "44px", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>04</div>
              <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(26px, 3vw, 36px)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                Where I&apos;ve worked.
              </h2>
            </div>
            <Link href="/experience" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}>
              Full timeline →
            </Link>
          </div>
        </AnimateIn>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: "32px", maxWidth: "720px" }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: "7px", top: "8px", bottom: "8px", width: "1px", background: "var(--bg-border)" }} />

          {preview.map((entry, i) => (
            <AnimateIn key={entry.id} delay={i * 0.08}>
              <div style={{ position: "relative", marginBottom: i < preview.length - 1 ? "40px" : "0" }}>
                {/* Timeline dot */}
                <div style={{ position: "absolute", left: "-32px", top: "6px", width: "14px", height: "14px", borderRadius: "50%", border: `2px solid var(--accent)`, background: entry.is_current ? "var(--accent)" : "var(--bg-base)", zIndex: 1, boxShadow: entry.is_current ? "0 0 0 4px rgba(184,92,16,0.1)" : "none" }} />

                <div style={{ background: "white", border: "1px solid var(--bg-border)", borderRadius: "14px", padding: "20px 22px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                  {/* Company + logo */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid var(--bg-border)", overflow: "hidden", position: "relative", flexShrink: 0, background: "var(--bg-surface)" }}>
                      {entry.logo_url ? (
                        <Image src={entry.logo_url} alt={entry.company} fill style={{ objectFit: "contain", padding: "4px" }} sizes="32px" />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "14px", color: "var(--accent)" }}>{entry.company[0]}</span>
                        </div>
                      )}
                    </div>
                    <span style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "17px", color: "var(--text-primary)" }}>{entry.company}</span>
                    {entry.is_current && <span className="tag-chip tag-chip-teal" style={{ fontSize: "10px" }}>Current</span>}
                  </div>

                  {/* Role + dates */}
                  <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginBottom: "10px" }}>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500, fontSize: "14px", color: "var(--text-secondary)" }}>{entry.role}</span>
                    <span style={{ color: "var(--text-tertiary)", fontSize: "12px" }}>·</span>
                    <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "12px", color: "var(--text-tertiary)" }}>{dateRange(entry.start_date, entry.end_date, entry.is_current)}</span>
                  </div>

                  {entry.description && (
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.65, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: "12px" }}>
                      {entry.description}
                    </p>
                  )}

                  {entry.tags.length > 0 && (
                    <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                      {entry.tags.slice(0, 4).map(t => <span key={t} className="tag-chip">{t}</span>)}
                    </div>
                  )}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

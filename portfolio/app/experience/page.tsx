import type { Metadata } from "next";
import Image from "next/image";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageHeader } from "@/components/ui/PageHeader";
import { getExperience, getSiteConfig } from "@/lib/api";

export const metadata: Metadata = { title: "Experience", description: "My career timeline and professional experience." };

function formatDateRange(start: string, end: string | null, isCurrent: boolean): string {
  const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  return `${fmt(start)} — ${isCurrent ? "Present" : end ? fmt(end) : ""}`;
}

export default async function ExperiencePage() {
  const [config, experience] = await Promise.all([getSiteConfig(), getExperience()]);

  return (
    <PageWrapper config={config}>
      <div className="container-max" style={{ padding: "0 24px" }}>
        <PageHeader eyebrow="Career" title="Experience" description="My professional journey and the teams I've been a part of." />
      </div>

      <div className="container-max" style={{ padding: "0 24px 96px" }}>
        <div style={{ position: "relative" }}>
          {/* Timeline line */}
          <div style={{ position: "absolute", left: "31px", top: "8px", bottom: "8px", width: "1px", background: "linear-gradient(to bottom, var(--accent), transparent)" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {experience.map((entry, i) => (
              <div key={entry.id} style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: "24px", paddingBottom: i < experience.length - 1 ? "48px" : "0" }}>
                {/* Logo / dot */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1 }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--bg-surface)", border: "1px solid var(--bg-border)", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                    {entry.logo_url ? (
                      <Image src={entry.logo_url} alt={entry.company} fill style={{ objectFit: "contain", padding: "8px" }} sizes="48px" />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(28,61,110,0.07)" }}>
                        <span style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "18px", color: "var(--accent)" }}>
                          {entry.company[0]}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: "16px", padding: "24px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", marginBottom: "12px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "4px" }}>
                        <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "20px", color: "var(--text-primary)" }}>
                          {entry.role}
                        </h2>
                        {entry.is_current && <span className="tag-chip tag-chip-teal">Current</span>}
                      </div>
                      <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", color: "var(--text-secondary)" }}>
                        {entry.company}
                      </div>
                    </div>
                    <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "12px", color: "var(--text-tertiary)", whiteSpace: "nowrap" }}>
                      {formatDateRange(entry.start_date, entry.end_date, entry.is_current)}
                    </div>
                  </div>

                  {entry.description && (
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "16px", whiteSpace: "pre-line" }}>
                      {entry.description}
                    </p>
                  )}

                  {entry.tags.length > 0 && (
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {entry.tags.map((t) => <span key={t} className="tag-chip">{t}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

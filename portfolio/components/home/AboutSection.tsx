"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimateIn } from "@/components/motion/AnimateIn";
import type { SiteConfig } from "@/lib/types";

const QUICK_FACTS = [
  { label: "Location",   value: "Jaipur, Rajasthan" },
  { label: "Experience", value: "1.5 Years Product Work" },
  { label: "Tools",      value: "n8n, Claude, Stitch, Figma" },
  { label: "Status",     value: "Actively Interviewing" },
];

export function AboutSection({ config }: { config: SiteConfig }) {
  const about  = config.about;
  const social = config.social;
  if (!about?.bio) return null;

  return (
    <section style={{ padding: "96px 0", background: "var(--bg-subtle)", borderTop: "1px solid var(--bg-border)", borderBottom: "1px solid var(--bg-border)" }}>
      <div className="container-max">
        <div className="about-layout" style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: "80px", alignItems: "start" }}>

          {/* Left: photo + facts */}
          <AnimateIn>
            <div>
              <div style={{ position: "relative", maxWidth: "260px", marginBottom: "20px" }}>
                <div style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "4/5", border: "1px solid var(--bg-border)", boxShadow: "0 8px 40px rgba(0,0,0,0.1)", background: "var(--bg-surface)" }}>
                  {about.photo_url ? (
                    <Image src={about.photo_url} alt="Profile photo" fill
                      style={{ objectFit: "cover", filter: "saturate(0.9) contrast(1.02)", transition: "filter 400ms ease" }}
                      className="about-photo"
                      sizes="260px"
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, rgba(184,92,16,0.08), rgba(42,122,90,0.06))" }}>
                      <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "80px", color: "rgba(184,92,16,0.2)" }}>A</span>
                    </div>
                  )}
                </div>

                {config.contact?.available && (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", marginTop: "14px", background: "rgba(46,139,87,0.08)", border: "1px solid rgba(46,139,87,0.18)", borderRadius: "9999px", padding: "5px 13px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-green)", animation: "pulse-dot 2s ease-in-out infinite", flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500, fontSize: "12px", color: "var(--accent-green)" }}>Open to PM roles</span>
                  </div>
                )}
              </div>

              {/* Quick facts */}
              <div>
                {QUICK_FACTS.map((fact, i) => (
                  <div key={fact.label} style={{ padding: "10px 0", borderBottom: i < QUICK_FACTS.length - 1 ? "1px solid var(--bg-border)" : "none" }}>
                    <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "3px" }}>{fact.label}</div>
                    <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "var(--text-secondary)" }}>{fact.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Right: story */}
          <AnimateIn delay={0.1}>
            <div>
              <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", color: "var(--text-tertiary)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "14px" }}>
                02 / About
              </div>
              <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(26px, 3vw, 36px)", color: "var(--text-primary)", marginBottom: "28px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                {about.tagline ?? "The builder behind the brief."}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "36px" }}>
                {about.bio.split("\n\n").filter(Boolean).map((para, i) => (
                  <p key={i} style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "500px" }}>
                    {para}
                  </p>
                ))}
              </div>

              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                <Link href="/case-studies"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500, fontSize: "14px", color: "var(--accent)", textDecoration: "none", transition: "color 150ms" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent-hover)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}>
                  See all case studies →
                </Link>
                {about.resume_url && (
                  <a href={about.resume_url} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500, fontSize: "14px", color: "var(--accent)", textDecoration: "none", transition: "color 150ms" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent-hover)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}>
                    Download resume ↓
                  </a>
                )}
                {social?.linkedin && (
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500, fontSize: "14px", color: "var(--accent)", textDecoration: "none", transition: "color 150ms" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent-hover)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}>
                    LinkedIn →
                  </a>
                )}
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.4); opacity: 0.4; } }
        .about-photo:hover { filter: saturate(1) contrast(1) !important; }
        @media (max-width: 900px) {
          .about-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

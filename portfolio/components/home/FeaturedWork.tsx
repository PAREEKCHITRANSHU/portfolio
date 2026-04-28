"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimateIn } from "@/components/motion/AnimateIn";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import type { CaseStudy, Project } from "@/lib/types";

function LargeCard({ href, title, subtitle, coverImage, tags, badge }: {
  href: string; title: string; subtitle?: string | null;
  coverImage?: string | null; tags: string[]; badge?: string;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <article
        style={{ position: "relative", borderRadius: "16px", overflow: "hidden", height: "360px", border: "1px solid var(--bg-border)", cursor: "pointer", transition: "border-color 300ms, box-shadow 300ms", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(184,92,16,0.4)"; el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.14)"; const img = el.querySelector(".lc-img") as HTMLElement; if (img) img.style.transform = "scale(1.04)"; }}
        onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--bg-border)"; el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; const img = el.querySelector(".lc-img") as HTMLElement; if (img) img.style.transform = "scale(1)"; }}
      >
        {coverImage ? (
          <Image src={coverImage} alt={title} fill className="lc-img" style={{ objectFit: "cover", transition: "transform 500ms ease" }} sizes="(max-width: 768px) 100vw, 60vw" />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #F3EDE6 0%, #EDE5DC 100%)" }} />
        )}

        {/* Overlay — darker on light images for text legibility */}
        <div style={{ position: "absolute", inset: 0, background: coverImage ? "linear-gradient(110deg, rgba(28,23,20,0.88) 35%, rgba(28,23,20,0.4) 100%)" : "none" }} />

        <div style={{ position: "absolute", inset: 0, padding: "28px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          {badge && <span className="tag-chip tag-chip-teal" style={{ alignSelf: "flex-start", marginBottom: "14px", background: "rgba(42,122,90,0.9)", color: "white", border: "none" }}>{badge}</span>}
          <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(18px, 2vw, 26px)", color: coverImage ? "#FAF8F5" : "var(--text-primary)", marginBottom: "8px", lineHeight: 1.2, maxWidth: "460px" }}>
            {title}
          </h3>
          {subtitle && (
            <p style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "14px", color: coverImage ? "rgba(250,248,245,0.8)" : "var(--text-secondary)", marginBottom: "20px", maxWidth: "380px", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {subtitle}
            </p>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {tags.slice(0, 3).map(t => <span key={t} style={{ background: coverImage ? "rgba(250,248,245,0.15)" : "rgba(184,92,16,0.08)", color: coverImage ? "rgba(250,248,245,0.9)" : "var(--accent)", border: `1px solid ${coverImage ? "rgba(250,248,245,0.2)" : "rgba(184,92,16,0.2)"}`, borderRadius: "9999px", padding: "2px 9px", fontSize: "10px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>{t}</span>)}
            </div>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: coverImage ? "rgba(250,248,245,0.85)" : "var(--accent)" }}>Read more →</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function SmallCard({ href, title, subtitle, tags, badge, index }: {
  href: string; title: string; subtitle?: string | null;
  tags: string[]; badge?: string; index: number;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <article
        style={{ background: "white", border: "1px solid var(--bg-border)", borderRadius: "14px", padding: "24px", height: "100%", display: "flex", flexDirection: "column", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", transition: "transform 250ms var(--ease-smooth), border-color 250ms, box-shadow 250ms" }}
        onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.borderColor = "rgba(184,92,16,0.3)"; el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"; }}
        onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.borderColor = "var(--bg-border)"; el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)"; }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
          {badge && <span className={badge === "Case Study" ? "tag-chip tag-chip-teal" : "tag-chip"}>{badge}</span>}
          <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--text-tertiary)" }}>0{index + 1}</span>
        </div>
        <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "19px", color: "var(--text-primary)", lineHeight: 1.25, marginBottom: "8px" }}>
          {title}
        </h3>
        {subtitle && (
          <p style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {subtitle}
          </p>
        )}
        <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
            {tags.slice(0, 2).map(t => <span key={t} className="tag-chip">{t}</span>)}
          </div>
          <span style={{ fontSize: "13px", color: "var(--accent)", fontWeight: 500 }}>Read →</span>
        </div>
      </article>
    </Link>
  );
}

export function FeaturedWork({ caseStudies, projects }: { caseStudies: CaseStudy[]; projects: Project[] }) {
  const allItems = [
    ...caseStudies.map(cs => ({ href: `/case-studies/${cs.slug}`, title: cs.title, subtitle: cs.subtitle, cover: cs.cover_image_url, tags: cs.tags, badge: "Case Study" })),
    ...projects.map(p  => ({ href: `/projects/${p.slug}`,     title: p.title,  subtitle: p.description, cover: p.cover_image_url,  tags: p.tags,  badge: p.type ?? "Project" })),
  ];
  if (allItems.length === 0) return null;
  const [first, ...rest] = allItems;

  return (
    <section id="proof" style={{ padding: "96px 0", background: "var(--bg-base)", borderTop: "1px solid var(--bg-border)" }}>
      <div className="container-max">
        <AnimateIn>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "44px", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>01</div>
              <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(26px, 3vw, 36px)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                Work that speaks.
              </h2>
            </div>
            <Link href="/case-studies" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}>
              All case studies →
            </Link>
          </div>
        </AnimateIn>

        {allItems.length >= 2 ? (
          <StaggerGrid style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: "20px" }} className="featured-grid">
            <StaggerItem>
              <LargeCard href={first.href} title={first.title} subtitle={first.subtitle} coverImage={first.cover} tags={first.tags} badge={first.badge} />
            </StaggerItem>
            <StaggerItem>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", height: "360px" }}>
                {rest.slice(0, 2).map((item, i) => (
                  <SmallCard key={item.href} href={item.href} title={item.title} subtitle={item.subtitle} tags={item.tags} badge={item.badge} index={i + 1} />
                ))}
              </div>
            </StaggerItem>
          </StaggerGrid>
        ) : (
          <StaggerGrid style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {allItems.map((item, i) => (
              <StaggerItem key={item.href}>
                <SmallCard href={item.href} title={item.title} subtitle={item.subtitle} tags={item.tags} badge={item.badge} index={i} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) { .featured-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

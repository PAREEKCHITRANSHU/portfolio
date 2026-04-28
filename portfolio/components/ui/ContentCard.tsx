"use client";

import Link from "next/link";
import Image from "next/image";

interface ContentCardProps {
  href: string;
  title: string;
  summary?: string | null;
  tags: string[];
  date?: string | null;
  coverImage?: string | null;
  badge?: string;
  readingTime?: number | null;
}

function GradientPlaceholder({ title }: { title: string }) {
  const initials = title.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, rgba(28,61,110,0.08), rgba(45,106,79,0.06))", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "48px", color: "rgba(28,61,110,0.2)" }}>{initials}</span>
    </div>
  );
}

export function ContentCard({ href, title, summary, tags, date, coverImage, badge, readingTime }: ContentCardProps) {
  return (
    <Link href={href} style={{ textDecoration: "none", display: "block" }}>
      <article
        style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: "16px", overflow: "hidden", height: "100%", transition: "transform 250ms var(--ease-smooth), box-shadow 250ms var(--ease-smooth), border-color 250ms" }}
        onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(28,61,110,0.12)"; el.style.borderColor = "rgba(28,61,110,0.25)"; }}
        onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = ""; el.style.borderColor = "var(--bg-border)"; }}
      >
        {/* Cover image */}
        <div style={{ height: "200px", position: "relative", overflow: "hidden" }}>
          {coverImage ? (
            <Image src={coverImage} alt={title} fill style={{ objectFit: "cover", transition: "transform 500ms ease" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
            />
          ) : <GradientPlaceholder title={title} />}
        </div>

        {/* Body */}
        <div style={{ padding: "20px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
            {badge && <span className="tag-chip tag-chip-teal">{badge}</span>}
            {tags.slice(0, 2).map((tag) => <span key={tag} className="tag-chip">{tag}</span>)}
          </div>
          <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 600, fontSize: "20px", color: "var(--text-primary)", marginBottom: "8px", lineHeight: "1.3", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {title}
          </h3>
          {summary && (
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: "16px", fontWeight: 300 }}>
              {summary}
            </p>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
              {date ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
              {readingTime ? ` · ~${readingTime}m` : ""}
            </span>
            <span style={{ fontSize: "13px", color: "var(--accent)" }}>Read →</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

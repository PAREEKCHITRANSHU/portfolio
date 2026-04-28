"use client";

import Link from "next/link";
import { AnimateIn } from "@/components/motion/AnimateIn";
import type { BlogPost } from "@/lib/types";

export function LatestWriting({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section style={{ padding: "96px 0", background: "var(--bg-base)", borderTop: "1px solid var(--bg-border)" }}>
      <div className="container-max">
        <AnimateIn>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>05</div>
              <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(26px, 3vw, 36px)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                Thinking out loud.
              </h2>
            </div>
            <Link href="/blog" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}>
              All posts →
            </Link>
          </div>
        </AnimateIn>

        <div style={{ maxWidth: "760px" }}>
          {posts.map((post, i) => (
            <AnimateIn key={post.id} delay={i * 0.06}>
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
                <article
                  className="writing-row"
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "24px", padding: "24px 12px", borderTop: "1px solid var(--bg-border)", cursor: "pointer", transition: "background 200ms", borderRadius: "4px", margin: "0 -12px" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(184,92,16,0.03)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "8px" }}>
                      {post.tags.slice(0, 2).map(t => <span key={t} className="tag-chip">{t}</span>)}
                    </div>
                    <h3 className="writing-title" style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 600, fontSize: "18px", color: "var(--text-primary)", lineHeight: 1.35, marginBottom: "6px", transition: "color 150ms" }}>
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", fontWeight: 300 }}>
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: "12px", color: "var(--text-tertiary)", marginBottom: "4px", whiteSpace: "nowrap" }}>
                      {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                    </div>
                    {post.reading_time && <div style={{ fontSize: "12px", color: "var(--text-tertiary)", marginBottom: "8px" }}>~{post.reading_time}m</div>}
                    <div className="writing-arrow" style={{ fontSize: "14px", color: "var(--text-tertiary)", transition: "color 200ms, transform 200ms", display: "inline-block" }}>→</div>
                  </div>
                </article>
              </Link>
            </AnimateIn>
          ))}
          <div style={{ height: "1px", background: "var(--bg-border)" }} />
        </div>
      </div>

      <style>{`
        .writing-row:hover .writing-title { color: var(--accent) !important; }
        .writing-row:hover .writing-arrow { color: var(--accent) !important; transform: translateX(4px); }
      `}</style>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { Block } from "@/lib/types";

interface TocEntry { id: string; text: string; level: number }

function buildToc(blocks: Block[]): TocEntry[] {
  const toc: TocEntry[] = [];
  for (const block of blocks) {
    if (block.type === "rich_text") {
      const html = (block.data.html as string) ?? "";
      const matches = [...html.matchAll(/<h([23])[^>]*id="([^"]*)"[^>]*>([^<]*)</g)];
      for (const m of matches) {
        toc.push({ id: m[2], text: m[3].replace(/&amp;/g, "&").replace(/&#39;/g, "'"), level: Number(m[1]) });
      }
    }
  }
  return toc;
}

function TableOfContents({ toc, activeId }: { toc: TocEntry[]; activeId: string }) {
  if (toc.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "16px" }}>
        On this page
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "2px" }}>
        {toc.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              style={{
                display: "block",
                fontSize: "13px",
                lineHeight: 1.5,
                padding: "4px 0 4px",
                paddingLeft: entry.level === 3 ? "16px" : "0",
                color: activeId === entry.id ? "var(--accent)" : "var(--text-tertiary)",
                textDecoration: "none",
                borderLeft: activeId === entry.id ? "2px solid var(--accent)" : "2px solid transparent",
                transition: "color 150ms, border-color 150ms",
              }}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface ContentPageLayoutProps {
  blocks: Block[];
  children: React.ReactNode;
}

export function ContentPageLayout({ blocks, children }: ContentPageLayoutProps) {
  const toc = buildToc(blocks);
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (toc.length === 0) return;
    const ids = toc.map((t) => t.id);
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [toc]);

  const hasToc = toc.length > 0;

  return (
    <div
      className="container-max"
      style={{ padding: "48px 24px 96px", display: "grid", gridTemplateColumns: hasToc ? "1fr 240px" : "1fr", gap: "64px", alignItems: "start" }}
    >
      <main>{children}</main>
      {hasToc && (
        <aside
          className="toc-sidebar"
          style={{ position: "sticky", top: "88px", display: "block" }}
        >
          <TableOfContents toc={toc} activeId={activeId} />
        </aside>
      )}
    </div>
  );
}

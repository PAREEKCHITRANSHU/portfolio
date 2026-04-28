"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function FilterBar({ tags }: { tags: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("tag") ?? "";

  function select(tag: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (tag) params.set("tag", tag);
    else params.delete("tag");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div style={{
      position: "sticky", top: "64px", zIndex: 50,
      background: "rgba(250,248,245,0.95)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--bg-border)", padding: "12px 0",
    }}>
      <div className="container-max">
        <div style={{ display: "flex", alignItems: "center", gap: "8px", overflowX: "auto", paddingBottom: "2px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-tertiary)", fontFamily: "var(--font-dm-sans)", whiteSpace: "nowrap" }}>Filter by:</span>
          {["All", ...tags].map((tag) => {
            const isActive = (tag === "All" && active === "") || active === tag;
            return (
              <button key={tag} type="button"
                onClick={() => select(tag === "All" ? "" : tag)}
                style={{
                  padding: "4px 12px", borderRadius: "9999px", border: "1px solid", whiteSpace: "nowrap",
                  fontSize: "11px", fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-dm-sans)",
                  textTransform: "uppercase", letterSpacing: "0.06em", transition: "all 150ms",
                  background: isActive ? "var(--accent)" : "rgba(28,61,110,0.06)",
                  color: isActive ? "#FAF8F5" : "var(--text-secondary)",
                  borderColor: isActive ? "var(--accent)" : "rgba(28,61,110,0.15)",
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

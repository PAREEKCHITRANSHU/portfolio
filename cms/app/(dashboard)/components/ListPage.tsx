"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Search, Edit, Archive } from "lucide-react";

interface ListItem {
  id: string;
  title: string;
  status: string;
  published_at?: string | null;
  updated_at: string;
  featured?: boolean;
  type?: string;
  reading_time?: number;
}

interface ListPageConfig {
  contentType: string;         // "Case Studies"
  apiBase: string;             // "/api/case-studies"
  newHref: string;             // "/dashboard/case-studies/new"
  editBase: string;            // "/dashboard/case-studies" — id appended at runtime
  showType?: boolean;
  showReadingTime?: boolean;
  showFeatured?: boolean;
}

interface Props {
  config: ListPageConfig;
  initialItems: ListItem[];
}

const statusBadgeClass = (s: string) =>
  s === "published" ? "badge-published" : s === "draft" ? "badge-draft" : "badge-archived";

const STATUS_TABS = ["all", "published", "draft", "archived"];

export function ListPage({ config, initialItems }: Props) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [archiving, setArchiving] = useState<string | null>(null);

  const filtered = items.filter((item) => {
    const matchStatus = statusFilter === "all" || item.status === statusFilter;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  async function handleArchive(id: string) {
    setArchiving(id);
    await fetch(`${config.apiBase}/${id}`, { method: "DELETE" });
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: "archived" } : i));
    setArchiving(null);
  }

  async function handleFeaturedToggle(id: string, current: boolean) {
    await fetch(`${config.apiBase}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !current }),
    });
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, featured: !current } : i));
  }

  return (
    <div style={{ padding: "40px", maxWidth: "1000px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "24px", color: "var(--text-primary)" }}>{config.contentType}</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>{items.length} total</p>
        </div>
        <Link href={config.newHref} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px" }}>
          <Plus size={14} /> New {config.contentType.replace(/s$/, "")}
        </Link>
      </div>

      {/* Filter + Search */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "4px", background: "var(--bg-elevated)", borderRadius: "8px", padding: "3px" }}>
          {STATUS_TABS.map((tab) => (
            <button key={tab} type="button" onClick={() => setStatusFilter(tab)}
              style={{ padding: "5px 12px", borderRadius: "6px", border: "none", fontSize: "13px", cursor: "pointer", textTransform: "capitalize", background: statusFilter === tab ? "var(--bg-surface)" : "transparent", color: statusFilter === tab ? "var(--text-primary)" : "var(--text-secondary)", fontFamily: "var(--font-dm-sans)", transition: "all 150ms" }}>
              {tab}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, position: "relative", minWidth: "200px" }}>
          <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title…"
            className="input-field"
            style={{ paddingLeft: "32px" }}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: "12px", overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "var(--text-tertiary)", fontSize: "14px" }}>
            {items.length === 0 ? (
              <div>
                <p style={{ marginBottom: "16px" }}>No {config.contentType.toLowerCase()} yet.</p>
                <Link href={config.newHref} className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
                  <Plus size={14} /> Create your first {config.contentType.replace(/s$/, "").toLowerCase()}
                </Link>
              </div>
            ) : "No items match your filters."}
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--bg-border)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 400 }}>Title</th>
                {config.showType && <th style={{ padding: "12px 16px", textAlign: "left", fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 400 }}>Type</th>}
                <th style={{ padding: "12px 16px", textAlign: "left", fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 400 }}>Status</th>
                {config.showReadingTime && <th style={{ padding: "12px 16px", textAlign: "left", fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 400 }}>Read</th>}
                <th style={{ padding: "12px 16px", textAlign: "left", fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 400 }}>Published</th>
                {config.showFeatured && <th style={{ padding: "12px 16px", textAlign: "center", fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 400 }}>Featured</th>}
                <th style={{ padding: "12px 16px" }} />
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid var(--bg-border)" }}>
                  <td style={{ padding: "12px 16px" }}>
                    <button
                      type="button"
                      onClick={() => router.push(`${config.editBase}/${item.id}`)}
                      style={{ background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", fontSize: "14px", color: "var(--text-primary)", fontFamily: "var(--font-dm-sans)", maxWidth: "280px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    >
                      {item.title}
                    </button>
                  </td>
                  {config.showType && (
                    <td style={{ padding: "12px 16px", fontSize: "13px", color: "var(--text-secondary)", textTransform: "capitalize" }}>{item.type ?? "—"}</td>
                  )}
                  <td style={{ padding: "12px 16px" }}><span className={statusBadgeClass(item.status)}>{item.status}</span></td>
                  {config.showReadingTime && (
                    <td style={{ padding: "12px 16px", fontSize: "13px", color: "var(--text-tertiary)" }}>{item.reading_time ? `~${item.reading_time}m` : "—"}</td>
                  )}
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "var(--text-tertiary)" }}>
                    {item.published_at ? new Date(item.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                  </td>
                  {config.showFeatured && (
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>
                      <button type="button" onClick={() => handleFeaturedToggle(item.id, item.featured ?? false)}
                        style={{ width: "32px", height: "18px", borderRadius: "9999px", border: "none", cursor: "pointer", background: item.featured ? "var(--accent)" : "var(--bg-elevated)", position: "relative", transition: "background 150ms" }}>
                        <span style={{ position: "absolute", top: "2px", left: item.featured ? "16px" : "2px", width: "14px", height: "14px", borderRadius: "9999px", background: "white", transition: "left 150ms" }} />
                      </button>
                    </td>
                  )}
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <Link href={`${config.editBase}/${item.id}`} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "var(--accent)", textDecoration: "none" }}>
                        <Edit size={12} /> Edit
                      </Link>
                      {item.status !== "archived" && (
                        <button type="button" onClick={() => handleArchive(item.id)} disabled={archiving === item.id}
                          style={{ display: "flex", alignItems: "center", gap: "4px", background: "none", border: "none", fontSize: "13px", color: "var(--text-tertiary)", cursor: "pointer" }}>
                          <Archive size={12} />{archiving === item.id ? "…" : "Archive"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

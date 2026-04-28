"use client";

import { RefreshCw } from "lucide-react";

interface SlugInputProps {
  value: string;
  onChange: (v: string) => void;
  onRegenerate: () => void;
  portfolioBase: string;
  error?: string;
}

export function SlugInput({ value, onChange, onRegenerate, portfolioBase, error }: SlugInputProps) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px", fontFamily: "var(--font-dm-sans)" }}>
        URL Slug
      </label>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-"))}
          className="input-field"
          style={{ borderColor: error ? "var(--accent-amber)" : undefined }}
          placeholder="url-slug"
        />
        <button
          type="button"
          onClick={onRegenerate}
          title="Regenerate slug from title"
          style={{ padding: "10px", background: "var(--bg-elevated)", border: "1px solid var(--bg-border)", borderRadius: "8px", color: "var(--text-secondary)", cursor: "pointer", flexShrink: 0 }}
        >
          <RefreshCw size={14} />
        </button>
      </div>
      {value && (
        <div style={{ marginTop: "4px", fontSize: "11px", color: "var(--text-tertiary)", fontFamily: "var(--font-jetbrains-mono)" }}>
          aman.dev/{portfolioBase}/{value}
        </div>
      )}
      {error && <div style={{ marginTop: "4px", fontSize: "12px", color: "var(--accent-amber)" }}>{error}</div>}
    </div>
  );
}

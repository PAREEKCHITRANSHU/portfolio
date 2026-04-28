"use client";

type Status = "draft" | "published" | "archived";

interface StatusControlProps {
  value: Status;
  onChange: (v: Status) => void;
}

const options: { value: Status; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

export function StatusControl({ value, onChange }: StatusControlProps) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px", fontFamily: "var(--font-dm-sans)" }}>
        Status
      </label>
      <div style={{ display: "flex", background: "var(--bg-elevated)", borderRadius: "8px", padding: "3px", gap: "2px" }}>
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1,
              padding: "7px 12px",
              borderRadius: "6px",
              border: "none",
              fontSize: "13px",
              fontFamily: "var(--font-dm-sans)",
              fontWeight: value === opt.value ? 500 : 400,
              cursor: "pointer",
              transition: "all 150ms",
              background: value === opt.value ? (opt.value === "published" ? "rgba(61,220,132,0.15)" : opt.value === "draft" ? "rgba(245,166,35,0.15)" : "rgba(90,90,122,0.15)") : "transparent",
              color: value === opt.value ? (opt.value === "published" ? "var(--accent-green)" : opt.value === "draft" ? "var(--accent-amber)" : "var(--text-tertiary)") : "var(--text-secondary)",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

interface DividerData { style: "solid" | "dashed" | "gradient" }
interface Props { data: DividerData; onChange: (d: DividerData) => void }

const styles = ["solid", "dashed", "gradient"] as const;

export function DividerEditor({ data, onChange }: Props) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}>Divider Style</label>
      <div style={{ display: "flex", gap: "8px" }}>
        {styles.map((s) => (
          <button key={s} type="button" onClick={() => onChange({ style: s })}
            style={{ padding: "6px 16px", borderRadius: "6px", border: "1px solid", fontSize: "13px", cursor: "pointer", textTransform: "capitalize", borderColor: data.style === s ? "var(--accent)" : "var(--bg-border)", background: data.style === s ? "rgba(123,110,246,0.1)" : "transparent", color: data.style === s ? "var(--accent)" : "var(--text-secondary)" }}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

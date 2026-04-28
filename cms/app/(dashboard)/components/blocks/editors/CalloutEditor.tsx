"use client";

interface CalloutData { variant: "info" | "warning" | "insight" | "quote"; text: string; icon?: string }
interface Props { data: CalloutData; onChange: (d: CalloutData) => void }

const variants = [
  { value: "info", label: "Info" },
  { value: "warning", label: "Warning" },
  { value: "insight", label: "Insight" },
  { value: "quote", label: "Quote" },
] as const;

export function CalloutEditor({ data, onChange }: Props) {
  return (
    <div>
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Variant</label>
        <div style={{ display: "flex", gap: "6px" }}>
          {variants.map((v) => (
            <button key={v.value} type="button" onClick={() => onChange({ ...data, variant: v.value })}
              style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid", fontSize: "12px", cursor: "pointer", borderColor: data.variant === v.value ? "var(--accent)" : "var(--bg-border)", background: data.variant === v.value ? "rgba(123,110,246,0.1)" : "transparent", color: data.variant === v.value ? "var(--accent)" : "var(--text-secondary)" }}>
              {v.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Text</label>
        <textarea value={data.text} onChange={(e) => onChange({ ...data, text: e.target.value })} rows={3} className="input-field" style={{ resize: "vertical" }} placeholder="Callout content…" />
      </div>
    </div>
  );
}

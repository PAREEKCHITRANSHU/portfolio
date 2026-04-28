"use client";

interface CTAData { headline: string; subtext: string; button_label: string; button_url: string; variant: "primary" | "secondary" }
interface Props { data: CTAData; onChange: (d: CTAData) => void }

export function CTAEditor({ data, onChange }: Props) {
  const up = (f: Partial<CTAData>) => onChange({ ...data, ...f });
  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Headline</label>
        <input value={data.headline} onChange={(e) => up({ headline: e.target.value })} className="input-field" placeholder="Compelling headline" />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Subtext</label>
        <input value={data.subtext} onChange={(e) => up({ subtext: e.target.value })} className="input-field" placeholder="Supporting text" />
      </div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Button Label</label>
          <input value={data.button_label} onChange={(e) => up({ button_label: e.target.value })} className="input-field" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Button URL</label>
          <input value={data.button_url} onChange={(e) => up({ button_url: e.target.value })} className="input-field" placeholder="https://" />
        </div>
      </div>
      <div>
        <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Variant</label>
        <div style={{ display: "flex", gap: "6px" }}>
          {(["primary", "secondary"] as const).map((v) => (
            <button key={v} type="button" onClick={() => up({ variant: v })}
              style={{ padding: "6px 14px", borderRadius: "6px", border: "1px solid", fontSize: "13px", cursor: "pointer", textTransform: "capitalize", borderColor: data.variant === v ? "var(--accent)" : "var(--bg-border)", background: data.variant === v ? "rgba(123,110,246,0.1)" : "transparent", color: data.variant === v ? "var(--accent)" : "var(--text-secondary)" }}>
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

interface EmbedData { url: string; type: "figma" | "notion" | "pdf"; height_px: number }
interface Props { data: EmbedData; onChange: (d: EmbedData) => void }

export function EmbedEditor({ data, onChange }: Props) {
  const up = (f: Partial<EmbedData>) => onChange({ ...data, ...f });
  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Embed URL</label>
        <input value={data.url} onChange={(e) => up({ url: e.target.value })} className="input-field" placeholder="https://figma.com/..." />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Type</label>
          <select value={data.type} onChange={(e) => up({ type: e.target.value as EmbedData["type"] })} className="input-field">
            {(["figma", "notion", "pdf"] as const).map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Height (px)</label>
          <input type="number" value={data.height_px} onChange={(e) => up({ height_px: parseInt(e.target.value) || 400 })} className="input-field" placeholder="600" />
        </div>
      </div>
    </div>
  );
}

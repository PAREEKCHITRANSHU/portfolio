import { BlockWrapper } from "./BlockWrapper";

interface Metric { id: string; value: string; unit: string; label: string; description?: string }
interface MetricsData { metrics: Metric[] }

export function MetricsBlock({ data }: { data: MetricsData }) {
  if (!data.metrics?.length) return null;
  return (
    <BlockWrapper>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(data.metrics.length, 4)}, 1fr)`, gap: "16px" }}>
        {data.metrics.map((m) => (
          <div key={m.id} style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "40px", lineHeight: 1, color: "var(--text-primary)" }}>
              {m.value}<span style={{ fontSize: "22px", color: "var(--accent)" }}>{m.unit}</span>
            </div>
            <div style={{ marginTop: "8px", fontSize: "13px", fontWeight: 500, color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--font-dm-sans)" }}>{m.label}</div>
            {m.description && <div style={{ marginTop: "4px", fontSize: "12px", color: "var(--text-tertiary)" }}>{m.description}</div>}
          </div>
        ))}
      </div>
    </BlockWrapper>
  );
}

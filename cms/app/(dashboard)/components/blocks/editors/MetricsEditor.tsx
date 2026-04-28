"use client";

import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface Metric { id: string; value: string; unit: string; label: string; description: string }
interface MetricsData { metrics: Metric[] }
interface Props { data: MetricsData; onChange: (d: MetricsData) => void }

export function MetricsEditor({ data, onChange }: Props) {
  const metrics = data.metrics ?? [];

  function add() {
    onChange({ metrics: [...metrics, { id: uuidv4(), value: "", unit: "", label: "", description: "" }] });
  }

  function remove(id: string) {
    onChange({ metrics: metrics.filter((m) => m.id !== id) });
  }

  function update(id: string, field: keyof Metric, val: string) {
    onChange({ metrics: metrics.map((m) => m.id === id ? { ...m, [field]: val } : m) });
  }

  return (
    <div>
      {metrics.map((m) => (
        <div key={m.id} style={{ padding: "12px", background: "var(--bg-elevated)", borderRadius: "8px", marginBottom: "8px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "8px" }}>
            <div>
              <label style={{ fontSize: "11px", color: "var(--text-tertiary)", display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Value</label>
              <input value={m.value} onChange={(e) => update(m.id, "value", e.target.value)} className="input-field" style={{ padding: "6px 10px", fontSize: "13px" }} placeholder="e.g. 47" />
            </div>
            <div>
              <label style={{ fontSize: "11px", color: "var(--text-tertiary)", display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Unit</label>
              <input value={m.unit} onChange={(e) => update(m.id, "unit", e.target.value)} className="input-field" style={{ padding: "6px 10px", fontSize: "13px" }} placeholder="e.g. %" />
            </div>
            <div>
              <label style={{ fontSize: "11px", color: "var(--text-tertiary)", display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Label</label>
              <input value={m.label} onChange={(e) => update(m.id, "label", e.target.value)} className="input-field" style={{ padding: "6px 10px", fontSize: "13px" }} placeholder="e.g. Retention Lift" />
            </div>
            <div>
              <label style={{ fontSize: "11px", color: "var(--text-tertiary)", display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Description</label>
              <input value={m.description} onChange={(e) => update(m.id, "description", e.target.value)} className="input-field" style={{ padding: "6px 10px", fontSize: "13px" }} placeholder="Context" />
            </div>
          </div>
          <button type="button" onClick={() => remove(m.id)} style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
            <Trash2 size={12} /> Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="btn-ghost" style={{ fontSize: "13px", padding: "8px 14px", display: "flex", alignItems: "center", gap: "6px" }}>
        <Plus size={14} /> Add Metric
      </button>
    </div>
  );
}

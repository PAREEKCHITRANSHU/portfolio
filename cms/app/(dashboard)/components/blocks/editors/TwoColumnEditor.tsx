"use client";

// TwoColumnEditor renders two block lists side by side.
// It uses a simplified nested editor (no DnD in nested columns to avoid complexity).
import { v4 as uuidv4 } from "uuid";
import { Plus, Trash2 } from "lucide-react";

interface Block { id: string; type: string; order: number; data: Record<string, unknown> }
interface TwoColumnData { left_blocks: Block[]; right_blocks: Block[] }
interface Props { data: TwoColumnData; onChange: (d: TwoColumnData) => void }

function SimpleBlockList({ blocks, onChange, side }: { blocks: Block[]; onChange: (b: Block[]) => void; side: string }) {
  function addText() {
    onChange([...blocks, { id: uuidv4(), type: "rich_text", order: blocks.length, data: { html: "" } }]);
  }
  function remove(id: string) {
    onChange(blocks.filter((b) => b.id !== id).map((b, i) => ({ ...b, order: i })));
  }
  return (
    <div>
      <div style={{ fontSize: "11px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>{side} Column</div>
      {blocks.map((b) => (
        <div key={b.id} style={{ padding: "8px 10px", background: "var(--bg-elevated)", borderRadius: "6px", marginBottom: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "capitalize" }}>{b.type.replace("_", " ")}</span>
          <button type="button" onClick={() => remove(b.id)} style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer" }}><Trash2 size={12} /></button>
        </div>
      ))}
      <button type="button" onClick={addText} style={{ background: "none", border: "1px dashed var(--bg-border)", borderRadius: "6px", padding: "6px 12px", fontSize: "12px", color: "var(--text-tertiary)", cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
        <Plus size={12} /> Add text block
      </button>
    </div>
  );
}

export function TwoColumnEditor({ data, onChange }: Props) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
      <SimpleBlockList blocks={data.left_blocks ?? []} onChange={(left_blocks) => onChange({ ...data, left_blocks })} side="Left" />
      <SimpleBlockList blocks={data.right_blocks ?? []} onChange={(right_blocks) => onChange({ ...data, right_blocks })} side="Right" />
    </div>
  );
}

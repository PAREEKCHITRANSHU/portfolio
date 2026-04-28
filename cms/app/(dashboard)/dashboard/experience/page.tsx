"use client";

import { useState, useEffect } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Trash2, Save } from "lucide-react";
import { ImageUpload } from "../../components/forms/ImageUpload";
import { ToggleSwitch } from "../../components/forms/ToggleSwitch";
import { v4 as uuidv4 } from "uuid";

interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  description: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  tags: string[];
  logo_url: string;
  order_index: number;
  visible: boolean;
  isNew?: boolean;
}

function ExperienceCard({ entry, onUpdate, onDelete }: { entry: ExperienceEntry; onUpdate: (e: ExperienceEntry) => void; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: entry.id });
  const [expanded, setExpanded] = useState(entry.isNew ?? false);

  const up = (f: Partial<ExperienceEntry>) => onUpdate({ ...entry, ...f });

  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition, background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: "10px", marginBottom: "8px", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", cursor: "pointer" }} onClick={() => setExpanded(!expanded)}>
        <button type="button" {...attributes} {...listeners} style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "grab", touchAction: "none", display: "flex" }}>
          <GripVertical size={14} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "15px", fontWeight: 500, color: "var(--text-primary)", fontFamily: "var(--font-dm-sans)" }}>{entry.company || "New Entry"}</div>
          <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{entry.role}</div>
        </div>
        {entry.is_current && <span className="badge-published">Current</span>}
        {!entry.visible && <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>Hidden</span>}
      </div>

      {expanded && (
        <div style={{ padding: "16px", borderTop: "1px solid var(--bg-border)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Company</label>
              <input value={entry.company} onChange={(e) => up({ company: e.target.value })} className="input-field" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Role</label>
              <input value={entry.role} onChange={(e) => up({ role: e.target.value })} className="input-field" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Start Date</label>
              <input type="date" value={entry.start_date} onChange={(e) => up({ start_date: e.target.value })} className="input-field" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>End Date</label>
              <input type="date" value={entry.end_date} onChange={(e) => up({ end_date: e.target.value })} disabled={entry.is_current} className="input-field" style={{ opacity: entry.is_current ? 0.4 : 1 }} />
            </div>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <ToggleSwitch id={`current-${entry.id}`} label="Current Role" value={entry.is_current} onChange={(is_current) => up({ is_current, end_date: is_current ? "" : entry.end_date })} />
            <ToggleSwitch id={`visible-${entry.id}`} label="Visible on Portfolio" value={entry.visible} onChange={(visible) => up({ visible })} />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Description</label>
            <textarea value={entry.description} onChange={(e) => up({ description: e.target.value })} maxLength={400} rows={3} className="input-field" style={{ resize: "vertical" }} />
            <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>{entry.description.length}/400</span>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Skills / Tags (comma separated)</label>
            <input value={entry.tags.join(", ")} onChange={(e) => up({ tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} className="input-field" placeholder="React, TypeScript, Figma" />
          </div>

          <ImageUpload value={entry.logo_url} onChange={(logo_url) => up({ logo_url })} label="Company Logo" accept="image/jpeg,image/png,image/svg+xml" />

          <button type="button" onClick={onDelete} style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer", fontSize: "13px", display: "flex", alignItems: "center", gap: "4px", marginTop: "8px" }}>
            <Trash2 size={13} /> Remove Entry
          </button>
        </div>
      )}
    </div>
  );
}

export default function ExperiencePage() {
  const [entries, setEntries] = useState<ExperienceEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    fetch("/api/experience?all=true")
      .then((r) => r.json())
      .then((json) => {
        setEntries(
          (json.data ?? []).map((e: ExperienceEntry) => ({
            ...e,
            start_date: e.start_date ? new Date(e.start_date).toISOString().split("T")[0] : "",
            end_date: e.end_date ? new Date(e.end_date).toISOString().split("T")[0] : "",
          }))
        );
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = entries.findIndex((e) => e.id === active.id);
    const newIdx = entries.findIndex((e) => e.id === over.id);
    const reordered = [...entries];
    const [moved] = reordered.splice(oldIdx, 1);
    reordered.splice(newIdx, 0, moved);
    setEntries(reordered.map((e, i) => ({ ...e, order_index: i })));
  }

  async function handleSave() {
    setSaving(true);
    for (const entry of entries) {
      const payload = { company: entry.company, role: entry.role, description: entry.description, start_date: entry.start_date, end_date: entry.end_date || null, is_current: entry.is_current, tags: entry.tags, logo_url: entry.logo_url || null, order_index: entry.order_index, visible: entry.visible };
      if (entry.isNew) {
        const res = await fetch("/api/experience", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        const json = await res.json();
        setEntries((prev) => prev.map((e) => e.id === entry.id ? { ...e, id: json.data.id, isNew: false } : e));
      } else {
        await fetch(`/api/experience/${entry.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      }
    }
    setSaving(false);
    setSaveMsg("Saved");
    setTimeout(() => setSaveMsg(""), 2000);
  }

  return (
    <div style={{ padding: "40px", maxWidth: "760px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "24px", color: "var(--text-primary)" }}>Experience</h1>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {saveMsg && <span style={{ fontSize: "13px", color: "var(--accent-green)" }}>{saveMsg}</span>}
          <button type="button" onClick={() => setEntries([...entries, { id: uuidv4(), company: "", role: "", description: "", start_date: "", end_date: "", is_current: false, tags: [], logo_url: "", order_index: entries.length, visible: true, isNew: true }])}
            className="btn-ghost" style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
            <Plus size={14} /> Add Experience
          </button>
          <button type="button" onClick={handleSave} disabled={saving} className="btn-primary" style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
            <Save size={14} /> {saving ? "Saving…" : "Save All"}
          </button>
        </div>
      </div>

      {!loaded ? (
        <div style={{ color: "var(--text-tertiary)", fontSize: "14px" }}>Loading…</div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={entries.map((e) => e.id)} strategy={verticalListSortingStrategy}>
            {entries.map((entry) => (
              <ExperienceCard
                key={entry.id}
                entry={entry}
                onUpdate={(updated) => setEntries((prev) => prev.map((e) => e.id === entry.id ? updated : e))}
                onDelete={() => setEntries((prev) => prev.filter((e) => e.id !== entry.id))}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

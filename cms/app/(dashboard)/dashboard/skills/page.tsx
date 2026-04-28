"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface Skill {
  id: string;
  name: string;
  category: string;
  icon_url: string;
  proficiency: number;
  order_index: number;
  visible: boolean;
  isNew?: boolean;
}

const CATEGORIES = ["Product", "AI Tools", "Technical", "Design"];

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    fetch("/api/skills?all=true")
      .then((r) => r.json())
      .then((json) => {
        const flat: Skill[] = [];
        const grouped = json.data ?? {};
        for (const cat of Object.keys(grouped)) {
          for (const s of grouped[cat]) flat.push(s);
        }
        setSkills(flat.sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)));
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  function up(id: string, field: Partial<Skill>) {
    setSkills((prev) => prev.map((s) => s.id === id ? { ...s, ...field } : s));
  }

  async function handleSave() {
    setSaving(true);
    for (const skill of skills) {
      const payload = { name: skill.name, category: skill.category || null, icon_url: skill.icon_url || null, proficiency: skill.proficiency, order_index: skill.order_index, visible: skill.visible };
      if (skill.isNew) {
        const res = await fetch("/api/skills", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        const json = await res.json();
        setSkills((prev) => prev.map((s) => s.id === skill.id ? { ...s, id: json.data.id, isNew: false } : s));
      } else {
        await fetch(`/api/skills/${skill.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      }
    }
    setSaving(false);
    setSaveMsg("Saved");
    setTimeout(() => setSaveMsg(""), 2000);
  }

  async function handleDelete(skill: Skill) {
    if (skill.isNew) { setSkills((prev) => prev.filter((s) => s.id !== skill.id)); return; }
    if (!window.confirm(`Remove "${skill.name}" from your portfolio?`)) return;
    await fetch(`/api/skills/${skill.id}`, { method: "DELETE" });
    setSkills((prev) => prev.filter((s) => s.id !== skill.id));
  }

  const grouped = CATEGORIES.reduce<Record<string, Skill[]>>((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat);
    return acc;
  }, {});
  const uncategorized = skills.filter((s) => !s.category || !CATEGORIES.includes(s.category));

  return (
    <div style={{ padding: "40px", maxWidth: "900px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "24px", color: "var(--text-primary)" }}>Skills</h1>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {saveMsg && <span style={{ fontSize: "13px", color: "var(--accent-green)" }}>{saveMsg}</span>}
          <button type="button" onClick={() => setSkills([...skills, { id: uuidv4(), name: "", category: "Product", icon_url: "", proficiency: 3, order_index: skills.length, visible: true, isNew: true }])}
            className="btn-ghost" style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
            <Plus size={14} /> Add Skill
          </button>
          <button type="button" onClick={handleSave} disabled={saving} className="btn-primary" style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
            <Save size={14} /> {saving ? "Saving…" : "Save All"}
          </button>
        </div>
      </div>

      {!loaded ? <div style={{ color: "var(--text-tertiary)", fontSize: "14px" }}>Loading…</div> : (
        <>
          {[...CATEGORIES, ...(uncategorized.length > 0 ? ["Other"] : [])].map((cat) => {
            const catSkills = cat === "Other" ? uncategorized : grouped[cat];
            if (!catSkills || catSkills.length === 0) return null;
            return (
              <div key={cat} style={{ marginBottom: "32px" }}>
                <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>{cat}</div>
                {catSkills.map((skill) => (
                  <div key={skill.id} style={{ display: "grid", gridTemplateColumns: "1fr 160px 100px 80px 40px auto", gap: "10px", alignItems: "center", background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: "8px", padding: "10px 14px", marginBottom: "6px" }}>
                    <input value={skill.name} onChange={(e) => up(skill.id, { name: e.target.value })} className="input-field" style={{ padding: "6px 10px", fontSize: "14px" }} placeholder="Skill name" />
                    <select value={skill.category ?? ""} onChange={(e) => up(skill.id, { category: e.target.value })} className="input-field" style={{ padding: "6px 10px", fontSize: "13px" }}>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button key={n} type="button" onClick={() => up(skill.id, { proficiency: n })}
                          style={{ width: "16px", height: "16px", borderRadius: "50%", border: "1px solid", cursor: "pointer", borderColor: n <= (skill.proficiency ?? 0) ? "var(--accent)" : "var(--bg-border)", background: n <= (skill.proficiency ?? 0) ? "var(--accent)" : "transparent" }} />
                      ))}
                    </div>
                    <button type="button" onClick={() => up(skill.id, { visible: !skill.visible })}
                      style={{ padding: "5px 10px", borderRadius: "6px", border: "1px solid", fontSize: "12px", cursor: "pointer", borderColor: skill.visible ? "var(--accent)" : "var(--bg-border)", background: skill.visible ? "rgba(123,110,246,0.1)" : "transparent", color: skill.visible ? "var(--accent)" : "var(--text-tertiary)" }}>
                      {skill.visible ? "Visible" : "Hidden"}
                    </button>
                    <button type="button" onClick={() => handleDelete(skill)} style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer", display: "flex" }}><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

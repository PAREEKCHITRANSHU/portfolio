"use client";

import { TagCombobox } from "../../forms/TagCombobox";

interface TagsDisplayData { tags: string[]; label: string }
interface Props { data: TagsDisplayData; onChange: (d: TagsDisplayData) => void }

export function TagsDisplayEditor({ data, onChange }: Props) {
  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Label</label>
        <input value={data.label} onChange={(e) => onChange({ ...data, label: e.target.value })} className="input-field" placeholder="e.g. Technologies Used" />
      </div>
      <TagCombobox value={data.tags} onChange={(tags) => onChange({ ...data, tags })} label="Tags" />
    </div>
  );
}

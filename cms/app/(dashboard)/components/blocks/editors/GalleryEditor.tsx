"use client";

import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { ImageUpload } from "../../forms/ImageUpload";

interface GalleryImage { id: string; url: string; alt: string; caption: string }
interface GalleryData { images: GalleryImage[] }
interface Props { data: GalleryData; onChange: (d: GalleryData) => void }

export function GalleryEditor({ data, onChange }: Props) {
  const images = data.images ?? [];

  function add() {
    onChange({ images: [...images, { id: uuidv4(), url: "", alt: "", caption: "" }] });
  }

  function remove(id: string) {
    onChange({ images: images.filter((i) => i.id !== id) });
  }

  function update(id: string, field: keyof GalleryImage, val: string) {
    onChange({ images: images.map((i) => i.id === id ? { ...i, [field]: val } : i) });
  }

  return (
    <div>
      {images.map((img, idx) => (
        <div key={img.id} style={{ padding: "12px", background: "var(--bg-elevated)", borderRadius: "8px", marginBottom: "8px" }}>
          <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Image {idx + 1}</div>
          <ImageUpload value={img.url} onChange={(url) => update(img.id, "url", url)} label="" />
          <input value={img.alt} onChange={(e) => update(img.id, "alt", e.target.value)} className="input-field" placeholder="Alt text" style={{ marginBottom: "6px" }} />
          <input value={img.caption} onChange={(e) => update(img.id, "caption", e.target.value)} className="input-field" placeholder="Caption (optional)" />
          <button type="button" onClick={() => remove(img.id)} style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", gap: "4px", marginTop: "8px" }}>
            <Trash2 size={12} /> Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="btn-ghost" style={{ fontSize: "13px", padding: "8px 14px", display: "flex", alignItems: "center", gap: "6px" }}>
        <Plus size={14} /> Add Image
      </button>
    </div>
  );
}

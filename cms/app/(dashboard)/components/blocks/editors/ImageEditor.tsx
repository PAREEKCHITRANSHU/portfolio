"use client";

import { ImageUpload } from "../../forms/ImageUpload";
import { TextInput } from "../../forms/TextInput";

interface ImageData {
  url: string;
  alt: string;
  caption: string;
  layout: "contained" | "full" | "float_left" | "float_right";
}

interface ImageEditorProps {
  data: ImageData;
  onChange: (data: ImageData) => void;
}

const layouts = [
  { value: "contained", label: "Contained" },
  { value: "full", label: "Full Width" },
  { value: "float_left", label: "Float Left" },
  { value: "float_right", label: "Float Right" },
] as const;

export function ImageEditor({ data, onChange }: ImageEditorProps) {
  const up = (field: Partial<ImageData>) => onChange({ ...data, ...field });
  return (
    <div>
      <ImageUpload value={data.url} onChange={(url) => up({ url })} label="Image" />
      <TextInput id="img-alt" label="Alt Text" value={data.alt} onChange={(alt) => up({ alt })} placeholder="Describe the image" />
      <TextInput id="img-caption" label="Caption (optional)" value={data.caption} onChange={(caption) => up({ caption })} />
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Layout</label>
        <div style={{ display: "flex", gap: "6px" }}>
          {layouts.map((l) => (
            <button key={l.value} type="button" onClick={() => up({ layout: l.value })}
              style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid", fontSize: "12px", cursor: "pointer", borderColor: data.layout === l.value ? "var(--accent)" : "var(--bg-border)", background: data.layout === l.value ? "rgba(123,110,246,0.1)" : "transparent", color: data.layout === l.value ? "var(--accent)" : "var(--text-secondary)" }}>
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

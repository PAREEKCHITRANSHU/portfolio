"use client";

import { ImageUpload } from "../../forms/ImageUpload";

interface HeroBannerData { title: string; subtitle: string; bg_image_url: string; cta_label: string; cta_url: string }
interface Props { data: HeroBannerData; onChange: (d: HeroBannerData) => void }

export function HeroBannerEditor({ data, onChange }: Props) {
  const up = (f: Partial<HeroBannerData>) => onChange({ ...data, ...f });
  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Title</label>
        <input value={data.title} onChange={(e) => up({ title: e.target.value })} className="input-field" />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Subtitle</label>
        <input value={data.subtitle} onChange={(e) => up({ subtitle: e.target.value })} className="input-field" />
      </div>
      <ImageUpload value={data.bg_image_url} onChange={(url) => up({ bg_image_url: url })} label="Background Image" />
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>CTA Label</label>
          <input value={data.cta_label} onChange={(e) => up({ cta_label: e.target.value })} className="input-field" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>CTA URL</label>
          <input value={data.cta_url} onChange={(e) => up({ cta_url: e.target.value })} className="input-field" placeholder="https://" />
        </div>
      </div>
    </div>
  );
}

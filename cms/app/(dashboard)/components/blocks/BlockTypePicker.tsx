"use client";

import { X, Type, Image, Images, AlertCircle, BarChart2, Columns, Video, Code, Minus, MousePointerClick, Globe, Tag, Layout } from "lucide-react";

interface BlockType {
  type: string;
  label: string;
  icon: React.ReactNode;
  defaultData: Record<string, unknown>;
}

const BLOCK_TYPES: BlockType[] = [
  { type: "rich_text", label: "Rich Text", icon: <Type size={20} />, defaultData: { html: "" } },
  { type: "image", label: "Image", icon: <Image size={20} />, defaultData: { url: "", alt: "", caption: "", layout: "contained" } },
  { type: "image_gallery", label: "Gallery", icon: <Images size={20} />, defaultData: { images: [] } },
  { type: "callout", label: "Callout", icon: <AlertCircle size={20} />, defaultData: { variant: "info", text: "", icon: "" } },
  { type: "metrics_row", label: "Metrics", icon: <BarChart2 size={20} />, defaultData: { metrics: [] } },
  { type: "two_column", label: "Two Column", icon: <Columns size={20} />, defaultData: { left_blocks: [], right_blocks: [] } },
  { type: "video_embed", label: "Video", icon: <Video size={20} />, defaultData: { url: "", caption: "" } },
  { type: "code_snippet", label: "Code", icon: <Code size={20} />, defaultData: { language: "typescript", code: "", filename: "" } },
  { type: "divider", label: "Divider", icon: <Minus size={20} />, defaultData: { style: "solid" } },
  { type: "cta_block", label: "CTA Block", icon: <MousePointerClick size={20} />, defaultData: { headline: "", subtext: "", button_label: "Learn more", button_url: "", variant: "primary" } },
  { type: "embed", label: "Embed", icon: <Globe size={20} />, defaultData: { url: "", type: "figma", height_px: 600 } },
  { type: "tags_display", label: "Tags Display", icon: <Tag size={20} />, defaultData: { tags: [], label: "Technologies" } },
  { type: "hero_banner", label: "Hero Banner", icon: <Layout size={20} />, defaultData: { title: "", subtitle: "", bg_image_url: "", cta_label: "", cta_url: "" } },
];

interface BlockTypePickerProps {
  onSelect: (type: string, defaultData: Record<string, unknown>) => void;
  onClose: () => void;
}

export function BlockTypePicker({ onSelect, onClose }: BlockTypePickerProps) {
  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: "16px", padding: "24px", width: "100%", maxWidth: "560px", maxHeight: "80vh", overflow: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "18px", color: "var(--text-primary)" }}>Add Block</h3>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}><X size={18} /></button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
          {BLOCK_TYPES.map((bt) => (
            <button
              key={bt.type}
              type="button"
              onClick={() => { onSelect(bt.type, bt.defaultData); onClose(); }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: "16px 8px", background: "var(--bg-elevated)", border: "1px solid var(--bg-border)", borderRadius: "10px", cursor: "pointer", color: "var(--text-secondary)", fontSize: "12px", fontFamily: "var(--font-dm-sans)", transition: "all 150ms" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(123,110,246,0.06)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--bg-border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-elevated)"; }}
            >
              <span style={{ color: "var(--accent)" }}>{bt.icon}</span>
              {bt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

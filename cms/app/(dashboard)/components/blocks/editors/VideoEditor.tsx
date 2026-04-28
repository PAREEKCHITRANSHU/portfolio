"use client";

interface VideoData { url: string; caption: string }
interface Props { data: VideoData; onChange: (d: VideoData) => void }

export function VideoEditor({ data, onChange }: Props) {
  return (
    <div>
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Video URL</label>
        <input value={data.url} onChange={(e) => onChange({ ...data, url: e.target.value })} className="input-field" placeholder="https://youtube.com/... or https://loom.com/..." />
      </div>
      <div>
        <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Caption (optional)</label>
        <input value={data.caption} onChange={(e) => onChange({ ...data, caption: e.target.value })} className="input-field" placeholder="Video description" />
      </div>
    </div>
  );
}

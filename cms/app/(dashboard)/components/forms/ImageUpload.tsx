"use client";

import { useState, useRef, DragEvent } from "react";
import { Upload, X, AlertCircle } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
}

export function ImageUpload({ value, onChange, label = "Cover Image", accept = "image/jpeg,image/png,image/webp" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setUploading(true);
    setError(null);
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error?.message ?? "Upload failed");
      } else {
        onChange(json.data.url);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) upload(file);
  }

  if (value) {
    return (
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px", fontFamily: "var(--font-dm-sans)" }}>{label}</label>
        <div style={{ position: "relative", display: "inline-block", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--bg-border)" }}>
          <Image src={value} alt="Preview" width={240} height={140} style={{ objectFit: "cover", display: "block" }} />
          <button type="button" onClick={() => onChange("")} style={{ position: "absolute", top: "6px", right: "6px", background: "rgba(10,10,15,0.8)", border: "none", borderRadius: "9999px", padding: "4px", cursor: "pointer", color: "var(--text-primary)", display: "flex" }}>
            <X size={12} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px", fontFamily: "var(--font-dm-sans)" }}>{label}</label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{ border: `2px dashed ${dragOver ? "var(--accent)" : "var(--bg-border)"}`, borderRadius: "8px", padding: "32px 16px", textAlign: "center", cursor: "pointer", background: dragOver ? "rgba(123,110,246,0.04)" : "var(--bg-surface)", transition: "all 150ms" }}
      >
        {uploading ? (
          <div style={{ color: "var(--text-secondary)", fontSize: "13px" }}>Uploading…</div>
        ) : (
          <>
            <Upload size={20} style={{ color: "var(--text-tertiary)", margin: "0 auto 8px" }} />
            <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Drop image or click to upload</div>
            <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginTop: "4px" }}>JPG, PNG, WEBP · Max 5MB</div>
          </>
        )}
      </div>
      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px", fontSize: "12px", color: "var(--accent-amber)" }}>
          <AlertCircle size={12} />{error}
        </div>
      )}
      <input ref={inputRef} type="file" accept={accept} onChange={handleFileInput} style={{ display: "none" }} />
    </div>
  );
}

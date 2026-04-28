"use client";

interface CodeData { language: string; code: string; filename: string }
interface Props { data: CodeData; onChange: (d: CodeData) => void }

const LANGUAGES = ["typescript", "javascript", "python", "bash", "sql", "json", "html", "css", "go", "rust", "yaml", "markdown", "plaintext"];

export function CodeEditor({ data, onChange }: Props) {
  const up = (f: Partial<CodeData>) => onChange({ ...data, ...f });
  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Language</label>
          <select value={data.language} onChange={(e) => up({ language: e.target.value })} className="input-field">
            {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Filename (optional)</label>
          <input value={data.filename} onChange={(e) => up({ filename: e.target.value })} className="input-field" placeholder="e.g. index.ts" />
        </div>
      </div>
      <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Code</label>
      <textarea value={data.code} onChange={(e) => up({ code: e.target.value })} rows={10} className="input-field"
        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "13px", resize: "vertical", lineHeight: "1.5" }} placeholder="// paste code here" />
    </div>
  );
}

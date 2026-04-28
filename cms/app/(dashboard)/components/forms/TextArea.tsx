"use client";

interface TextAreaProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  hint?: string;
}

export function TextArea({ id, label, value, onChange, placeholder, maxLength, rows = 4, hint }: TextAreaProps) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label htmlFor={id} style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px", fontFamily: "var(--font-dm-sans)" }}>
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className="input-field"
        style={{ resize: "vertical", lineHeight: "1.6" }}
      />
      {maxLength && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
          {hint && <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>{hint}</span>}
          <span style={{ fontSize: "11px", color: value.length > maxLength * 0.9 ? "var(--accent-amber)" : "var(--text-tertiary)", marginLeft: "auto" }}>
            {value.length}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
}

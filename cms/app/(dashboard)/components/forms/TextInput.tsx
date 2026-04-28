"use client";

interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  hint?: string;
}

export function TextInput({ id, label, value, onChange, placeholder, required, maxLength, hint }: TextInputProps) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label htmlFor={id} style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px", fontFamily: "var(--font-dm-sans)" }}>
        {label}{required && <span style={{ color: "var(--accent)", marginLeft: "3px" }}>*</span>}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="input-field"
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

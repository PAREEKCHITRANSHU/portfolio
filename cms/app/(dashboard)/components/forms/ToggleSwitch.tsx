"use client";

interface ToggleSwitchProps {
  id: string;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  description?: string;
}

export function ToggleSwitch({ id, label, value, onChange, description }: ToggleSwitchProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--bg-border)", marginBottom: "4px" }}>
      <div>
        <label htmlFor={id} style={{ fontSize: "14px", color: "var(--text-primary)", fontFamily: "var(--font-dm-sans)", cursor: "pointer" }}>
          {label}
        </label>
        {description && <div style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "2px" }}>{description}</div>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        style={{
          width: "40px",
          height: "22px",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          background: value ? "var(--accent)" : "var(--bg-elevated)",
          position: "relative",
          transition: "background 150ms",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "3px",
            left: value ? "21px" : "3px",
            width: "16px",
            height: "16px",
            borderRadius: "9999px",
            background: "white",
            transition: "left 150ms",
          }}
        />
      </button>
    </div>
  );
}

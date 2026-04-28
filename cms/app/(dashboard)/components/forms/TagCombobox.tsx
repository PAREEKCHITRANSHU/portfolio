"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

interface TagComboboxProps {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  label?: string;
}

export function TagCombobox({ value, onChange, suggestions = [], label = "Tags" }: TagComboboxProps) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = suggestions.filter(
    (s) => s.toLowerCase().includes(input.toLowerCase()) && !value.includes(s)
  );

  function addTag(tag: string) {
    const t = tag.trim();
    if (t && !value.includes(t)) onChange([...value, t]);
    setInput("");
    setShowSuggestions(false);
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (input.trim()) addTag(input);
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  }

  return (
    <div style={{ marginBottom: "16px", position: "relative" }}>
      <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px", fontFamily: "var(--font-dm-sans)" }}>
        {label}
      </label>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: "6px", padding: "8px 12px", background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: "8px", minHeight: "42px", cursor: "text" }}
        onClick={() => document.getElementById("tag-input")?.focus()}
      >
        {value.map((tag) => (
          <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "rgba(123,110,246,0.1)", color: "#9b8ff8", border: "1px solid rgba(123,110,246,0.2)", borderRadius: "9999px", padding: "2px 8px", fontSize: "12px" }}>
            {tag}
            <button type="button" onClick={() => removeTag(tag)} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: "0", lineHeight: 1, display: "flex" }}>
              <X size={10} />
            </button>
          </span>
        ))}
        <input
          id="tag-input"
          type="text"
          value={input}
          onChange={(e) => { setInput(e.target.value); setShowSuggestions(true); }}
          onKeyDown={handleKey}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder={value.length === 0 ? "Type a tag and press Enter" : ""}
          style={{ border: "none", background: "transparent", color: "var(--text-primary)", fontSize: "14px", outline: "none", minWidth: "120px", flex: 1 }}
        />
      </div>
      {showSuggestions && filtered.length > 0 && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "var(--bg-elevated)", border: "1px solid var(--bg-border)", borderRadius: "8px", marginTop: "4px", zIndex: 20, overflow: "hidden" }}>
          {filtered.slice(0, 8).map((s) => (
            <button key={s} type="button" onMouseDown={() => addTag(s)} style={{ display: "block", width: "100%", padding: "8px 14px", textAlign: "left", background: "none", border: "none", color: "var(--text-secondary)", fontSize: "14px", cursor: "pointer" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(123,110,246,0.08)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "none"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)"; }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
      <div style={{ marginTop: "4px", fontSize: "11px", color: "var(--text-tertiary)" }}>Press Enter or comma to add</div>
    </div>
  );
}

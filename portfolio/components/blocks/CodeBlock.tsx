import { BlockWrapper } from "./BlockWrapper";

interface CodeData { language: string; code: string; filename?: string }

export function CodeBlock({ data }: { data: CodeData }) {
  return (
    <BlockWrapper>
      <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid var(--bg-border)" }}>
        {(data.filename || data.language) && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px", background: "var(--bg-elevated)", borderBottom: "1px solid var(--bg-border)" }}>
            <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "12px", color: "var(--text-secondary)" }}>{data.filename}</span>
            <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{data.language}</span>
          </div>
        )}
        <pre style={{ padding: "20px", background: "var(--bg-subtle)", overflowX: "auto", margin: 0 }}>
          <code style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "13px", color: "var(--text-primary)", lineHeight: "1.6" }}>
            {data.code}
          </code>
        </pre>
      </div>
    </BlockWrapper>
  );
}

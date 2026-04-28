import { Info, AlertTriangle, Lightbulb, Quote } from "lucide-react";
import { BlockWrapper } from "./BlockWrapper";

interface CalloutData { variant: "info" | "warning" | "insight" | "quote"; text: string; icon?: string }

const VARIANT_STYLES: Record<string, { bg: string; border: string; color: string; icon: React.ReactNode }> = {
  info:    { bg: "rgba(45,106,79,0.06)",   border: "rgba(45,106,79,0.2)",   color: "var(--accent-teal)", icon: <Info size={16} /> },
  warning: { bg: "rgba(160,82,45,0.06)",   border: "rgba(160,82,45,0.2)",   color: "var(--accent-amber)", icon: <AlertTriangle size={16} /> },
  insight: { bg: "rgba(28,61,110,0.06)",   border: "rgba(28,61,110,0.2)",   color: "var(--accent)", icon: <Lightbulb size={16} /> },
  quote:   { bg: "var(--bg-subtle)",        border: "var(--accent)",         color: "var(--text-secondary)", icon: <Quote size={16} /> },
};

export function CalloutBlock({ data }: { data: CalloutData }) {
  const style = VARIANT_STYLES[data.variant] ?? VARIANT_STYLES.info;
  const isQuote = data.variant === "quote";
  return (
    <BlockWrapper>
      <div style={{ background: style.bg, border: `1px solid ${style.border}`, borderRadius: "10px", padding: "16px 20px", display: "flex", gap: "12px", alignItems: "flex-start", ...(isQuote && { borderLeft: `3px solid ${style.border}`, borderRadius: "0 10px 10px 0" }) }}>
        {!isQuote && <span style={{ color: style.color, flexShrink: 0, marginTop: "2px" }}>{style.icon}</span>}
        <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: "1.7", fontFamily: "var(--font-dm-sans)", ...(isQuote && { fontStyle: "italic", fontSize: "17px", color: "var(--text-primary)" }) }}>
          {data.text}
        </p>
      </div>
    </BlockWrapper>
  );
}

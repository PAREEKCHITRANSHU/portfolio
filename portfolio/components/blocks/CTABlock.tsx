import Link from "next/link";
import { BlockWrapper } from "./BlockWrapper";

interface CTAData { headline: string; subtext?: string; button_label: string; button_url: string; variant: "primary" | "secondary" }

export function CTABlock({ data }: { data: CTAData }) {
  return (
    <BlockWrapper>
      <div style={{ background: data.variant === "primary" ? "rgba(28,61,110,0.05)" : "var(--bg-surface)", border: `1px solid ${data.variant === "primary" ? "rgba(28,61,110,0.18)" : "var(--bg-border)"}`, borderRadius: "16px", padding: "32px", textAlign: "center" }}>
        <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "24px", color: "var(--text-primary)", marginBottom: "8px" }}>{data.headline}</h3>
        {data.subtext && <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "24px", maxWidth: "480px", margin: "0 auto 24px" }}>{data.subtext}</p>}
        <Link href={data.button_url} className={data.variant === "primary" ? "btn-primary" : "btn-ghost"}>{data.button_label}</Link>
      </div>
    </BlockWrapper>
  );
}

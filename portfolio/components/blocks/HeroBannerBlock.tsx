import Image from "next/image";
import Link from "next/link";
import { BlockWrapper } from "./BlockWrapper";

interface HeroBannerData { title: string; subtitle?: string; bg_image_url?: string; cta_label?: string; cta_url?: string }

export function HeroBannerBlock({ data }: { data: HeroBannerData }) {
  return (
    <BlockWrapper>
      <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", minHeight: "280px", display: "flex", alignItems: "center", background: "var(--bg-surface)", border: "1px solid var(--bg-border)" }}>
        {data.bg_image_url && (
          <Image src={data.bg_image_url} alt="" fill style={{ objectFit: "cover", opacity: 0.3 }} />
        )}
        <div style={{ position: "relative", zIndex: 1, padding: "40px 48px" }}>
          <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "32px", color: "var(--text-primary)", marginBottom: "8px" }}>{data.title}</h2>
          {data.subtitle && <p style={{ color: "var(--text-secondary)", fontSize: "16px", marginBottom: "24px", maxWidth: "480px" }}>{data.subtitle}</p>}
          {data.cta_label && data.cta_url && <Link href={data.cta_url} className="btn-primary">{data.cta_label}</Link>}
        </div>
      </div>
    </BlockWrapper>
  );
}

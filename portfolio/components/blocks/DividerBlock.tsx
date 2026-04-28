import { BlockWrapper } from "./BlockWrapper";

interface DividerData { style: "solid" | "dashed" | "gradient" }

export function DividerBlock({ data }: { data: DividerData }) {
  const gradientBg = "linear-gradient(90deg, transparent, #252535 20%, #252535 80%, transparent)";
  return (
    <BlockWrapper style={{ marginBottom: "48px", marginTop: "16px" }}>
      <hr style={{
        border: "none",
        height: "1px",
        background: data.style === "gradient" ? gradientBg : "var(--bg-border)",
        borderTop: data.style === "dashed" ? "1px dashed var(--bg-border)" : "none",
        maxWidth: "100%",
      }} />
    </BlockWrapper>
  );
}

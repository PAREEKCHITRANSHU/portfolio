import { BlockWrapper } from "./BlockWrapper";

interface EmbedData { url: string; type: "figma" | "notion" | "pdf"; height_px: number }

export function EmbedBlock({ data }: { data: EmbedData }) {
  if (!data.url) return null;
  return (
    <BlockWrapper>
      <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid var(--bg-border)" }}>
        <iframe
          src={data.url}
          style={{ width: "100%", height: `${data.height_px ?? 600}px`, border: "none", background: "var(--bg-surface)" }}
          title={`Embedded ${data.type}`}
          allowFullScreen
        />
      </div>
    </BlockWrapper>
  );
}

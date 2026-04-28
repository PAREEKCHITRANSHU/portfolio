import { BlockWrapper } from "./BlockWrapper";

interface VideoData { url: string; caption?: string }

function getEmbedUrl(url: string): string {
  if (url.includes("youtube.com/watch")) {
    const id = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("loom.com/share/")) {
    const id = url.split("loom.com/share/")[1]?.split("?")[0];
    return `https://www.loom.com/embed/${id}`;
  }
  return url;
}

export function VideoBlock({ data }: { data: VideoData }) {
  if (!data.url) return null;
  return (
    <BlockWrapper>
      <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid var(--bg-border)", aspectRatio: "16/9", position: "relative" }}>
        <iframe
          src={getEmbedUrl(data.url)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded video"
        />
      </div>
      {data.caption && (
        <p style={{ marginTop: "8px", fontSize: "13px", color: "var(--text-tertiary)", textAlign: "center" }}>{data.caption}</p>
      )}
    </BlockWrapper>
  );
}

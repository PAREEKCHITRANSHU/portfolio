import Image from "next/image";
import { BlockWrapper } from "./BlockWrapper";

interface GalleryImage { id: string; url: string; alt: string; caption?: string }
interface GalleryData { images: GalleryImage[] }

export function GalleryBlock({ data }: { data: GalleryData }) {
  if (!data.images?.length) return null;
  return (
    <BlockWrapper>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {data.images.map((img) => (
          <figure key={img.id}>
            <div style={{ position: "relative", aspectRatio: "4/3", borderRadius: "10px", overflow: "hidden", border: "1px solid var(--bg-border)" }}>
              <Image src={img.url} alt={img.alt ?? ""} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            {img.caption && (
              <figcaption style={{ marginTop: "6px", fontSize: "12px", color: "var(--text-tertiary)", textAlign: "center" }}>{img.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>
    </BlockWrapper>
  );
}

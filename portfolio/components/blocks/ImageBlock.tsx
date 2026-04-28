import Image from "next/image";
import { BlockWrapper } from "./BlockWrapper";

interface ImageData {
  url: string;
  alt: string;
  caption?: string;
  layout: "contained" | "full" | "float_left" | "float_right";
}

export function ImageBlock({ data }: { data: ImageData }) {
  if (!data.url) return null;

  const isFloat = data.layout === "float_left" || data.layout === "float_right";
  const isFull = data.layout === "full";

  return (
    <BlockWrapper
      style={{
        ...(isFloat && {
          float: data.layout === "float_left" ? "left" : "right",
          marginRight: data.layout === "float_left" ? "32px" : "0",
          marginLeft: data.layout === "float_right" ? "32px" : "0",
          maxWidth: "320px",
          marginBottom: "24px",
        }),
      }}
    >
      <figure>
        <div
          style={{
            position: "relative",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid var(--bg-border)",
            ...(isFull ? { width: "100%", aspectRatio: "16/9" } : { aspectRatio: "4/3" }),
          }}
        >
          <Image
            src={data.url}
            alt={data.alt ?? ""}
            fill
            style={{ objectFit: "cover" }}
            sizes={isFull ? "100vw" : "(max-width: 768px) 100vw, 60vw"}
          />
        </div>
        {data.caption && (
          <figcaption
            style={{
              marginTop: "8px",
              fontSize: "13px",
              color: "var(--text-tertiary)",
              fontFamily: "var(--font-dm-sans)",
              textAlign: "center",
            }}
          >
            {data.caption}
          </figcaption>
        )}
      </figure>
    </BlockWrapper>
  );
}

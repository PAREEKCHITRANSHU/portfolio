import type { Block } from "@/lib/types";
import { RichTextBlock } from "./RichTextBlock";
import { ImageBlock } from "./ImageBlock";
import { GalleryBlock } from "./GalleryBlock";
import { CalloutBlock } from "./CalloutBlock";
import { MetricsBlock } from "./MetricsBlock";
import { TwoColumnBlock } from "./TwoColumnBlock";
import { VideoBlock } from "./VideoBlock";
import { CodeBlock } from "./CodeBlock";
import { DividerBlock } from "./DividerBlock";
import { CTABlock } from "./CTABlock";
import { EmbedBlock } from "./EmbedBlock";
import { TagsBlock } from "./TagsBlock";
import { HeroBannerBlock } from "./HeroBannerBlock";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BLOCK_MAP: Record<string, React.FC<{ data: any }>> = {
  rich_text:     RichTextBlock,
  image:         ImageBlock,
  image_gallery: GalleryBlock,
  callout:       CalloutBlock,
  metrics_row:   MetricsBlock,
  two_column:    TwoColumnBlock,
  video_embed:   VideoBlock,
  code_snippet:  CodeBlock,
  divider:       DividerBlock,
  cta_block:     CTABlock,
  embed:         EmbedBlock,
  tags_display:  TagsBlock,
  hero_banner:   HeroBannerBlock,
};

interface BlockRendererProps {
  blocks: Block[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  const sorted = [...blocks].sort((a, b) => a.order - b.order);
  return (
    <>
      {sorted.map((block) => {
        const Component = BLOCK_MAP[block.type];
        if (!Component) return null;
        return <Component key={block.id} data={block.data} />;
      })}
    </>
  );
}

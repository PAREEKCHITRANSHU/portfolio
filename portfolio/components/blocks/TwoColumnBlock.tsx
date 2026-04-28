import type { Block } from "@/lib/types";
import { BlockWrapper } from "./BlockWrapper";
import { BlockRenderer } from "./BlockRenderer";

interface TwoColumnData { left_blocks: Block[]; right_blocks: Block[] }

export function TwoColumnBlock({ data }: { data: TwoColumnData }) {
  return (
    <BlockWrapper>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        <div><BlockRenderer blocks={data.left_blocks ?? []} /></div>
        <div><BlockRenderer blocks={data.right_blocks ?? []} /></div>
      </div>
    </BlockWrapper>
  );
}

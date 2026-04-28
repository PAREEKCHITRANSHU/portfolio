import { BlockWrapper } from "./BlockWrapper";

interface RichTextData { html: string }

export function RichTextBlock({ data }: { data: RichTextData }) {
  return (
    <BlockWrapper>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: data.html }}
      />
    </BlockWrapper>
  );
}

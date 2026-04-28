import { BlockWrapper } from "./BlockWrapper";

interface TagsData { tags: string[]; label?: string }

export function TagsBlock({ data }: { data: TagsData }) {
  if (!data.tags?.length) return null;
  return (
    <BlockWrapper>
      {data.label && (
        <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>
          {data.label}
        </div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {data.tags.map((tag) => (
          <span key={tag} className="tag-chip">{tag}</span>
        ))}
      </div>
    </BlockWrapper>
  );
}

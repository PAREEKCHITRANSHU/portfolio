import { Suspense } from "react";
import { FilterBar } from "./FilterBar";
import { PageHeader } from "./PageHeader";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";

interface ListPageLayoutProps<T extends { tags: string[] }> {
  eyebrow: string;
  title: string;
  description: string;
  countLabel: string;
  items: T[];
  allTags: string[];
  tag?: string;
  renderItem: (item: T) => React.ReactNode;
  gridCols?: string;
  listMode?: boolean;
}

export function ListPageLayout<T extends { tags: string[] }>({
  eyebrow, title, description, countLabel, items, allTags, tag, renderItem,
  gridCols = "repeat(auto-fill, minmax(320px, 1fr))", listMode = false,
}: ListPageLayoutProps<T>) {
  const filtered = tag ? items.filter((item) => item.tags.includes(tag)) : items;

  return (
    <>
      <div className="container-max">
        <PageHeader eyebrow={eyebrow} title={title} description={description} count={items.length} countLabel={countLabel} />
      </div>

      {allTags.length > 0 && (
        <Suspense>
          <FilterBar tags={allTags} />
        </Suspense>
      )}

      <div className="container-max" style={{ padding: "48px 24px 96px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-tertiary)", fontSize: "16px" }}>
            No items match this filter.
          </div>
        ) : listMode ? (
          <div>{filtered.map(renderItem)}</div>
        ) : (
          <StaggerGrid style={{ display: "grid", gridTemplateColumns: gridCols, gap: "24px" }}>
            {filtered.map((item, i) => (
              <StaggerItem key={i}>
                {renderItem(item)}
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ListPageLayout } from "@/components/ui/ListPageLayout";
import { ContentCard } from "@/components/ui/ContentCard";
import { getResearch, getSiteConfig } from "@/lib/api";
import type { ResearchPiece } from "@/lib/types";

export const metadata: Metadata = { title: "Research", description: "Market research and strategic analysis." };

export default async function ResearchPage({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const { tag } = await searchParams;
  const [config, items] = await Promise.all([getSiteConfig(), getResearch()]);
  const allTags = [...new Set(items.flatMap((i) => i.tags))].sort();

  return (
    <PageWrapper config={config}>
      <ListPageLayout<ResearchPiece>
        eyebrow="Research"
        title="Market Research"
        description="Market analysis, competitive research, and strategic insights."
        countLabel="pieces"
        items={items}
        allTags={allTags}
        tag={tag}
        renderItem={(item) => (
          <ContentCard
            key={item.id}
            href={`/research/${item.slug}`}
            title={item.title}
            summary={item.subtitle}
            tags={item.tags}
            date={item.published_at}
            coverImage={item.cover_image_url}
          />
        )}
      />
    </PageWrapper>
  );
}

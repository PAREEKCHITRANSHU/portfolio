import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ListPageLayout } from "@/components/ui/ListPageLayout";
import { ContentCard } from "@/components/ui/ContentCard";
import { getCaseStudies, getSiteConfig } from "@/lib/api";
import type { CaseStudy } from "@/lib/types";

export const metadata: Metadata = { title: "Case Studies", description: "In-depth product case studies." };

export default async function CaseStudiesPage({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const { tag } = await searchParams;
  const [config, items] = await Promise.all([getSiteConfig(), getCaseStudies()]);
  const allTags = [...new Set(items.flatMap((i) => i.tags))].sort();

  return (
    <PageWrapper config={config}>
      <ListPageLayout<CaseStudy>
        eyebrow="Work"
        title="Case Studies"
        description="Deep dives into product problems, decisions, and outcomes."
        countLabel="case studies"
        items={items}
        allTags={allTags}
        tag={tag}
        renderItem={(item) => (
          <ContentCard
            key={item.id}
            href={`/case-studies/${item.slug}`}
            title={item.title}
            summary={item.subtitle}
            tags={item.tags}
            date={item.published_at}
            coverImage={item.cover_image_url}
            badge={item.featured ? "Featured" : undefined}
          />
        )}
      />
    </PageWrapper>
  );
}

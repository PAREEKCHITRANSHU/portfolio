import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ListPageLayout } from "@/components/ui/ListPageLayout";
import { ContentCard } from "@/components/ui/ContentCard";
import { getProjects, getSiteConfig } from "@/lib/api";
import type { Project } from "@/lib/types";

export const metadata: Metadata = { title: "Projects", description: "A collection of projects I've built or shipped." };

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const { tag } = await searchParams;
  const [config, items] = await Promise.all([getSiteConfig(), getProjects()]);
  const allTags = [...new Set(items.flatMap((i) => i.tags))].sort();

  return (
    <PageWrapper config={config}>
      <ListPageLayout<Project>
        eyebrow="Work"
        title="Projects"
        description="Side projects, experiments, and shipped products."
        countLabel="projects"
        items={items}
        allTags={allTags}
        tag={tag}
        renderItem={(item) => (
          <ContentCard
            key={item.id}
            href={`/projects/${item.slug}`}
            title={item.title}
            summary={item.description}
            tags={item.tags}
            date={item.published_at}
            coverImage={item.cover_image_url}
            badge={item.type ?? undefined}
          />
        )}
      />
    </PageWrapper>
  );
}

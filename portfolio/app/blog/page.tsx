import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ListPageLayout } from "@/components/ui/ListPageLayout";
import { ContentCard } from "@/components/ui/ContentCard";
import { getBlogPosts, getSiteConfig } from "@/lib/api";
import type { BlogPost } from "@/lib/types";

export const metadata: Metadata = { title: "Blog", description: "Writing on product, strategy, and building." };

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const { tag } = await searchParams;
  const [config, items] = await Promise.all([getSiteConfig(), getBlogPosts()]);
  const allTags = [...new Set(items.flatMap((i) => i.tags))].sort();

  return (
    <PageWrapper config={config}>
      <ListPageLayout<BlogPost>
        eyebrow="Writing"
        title="Blog"
        description="Thoughts on product management, strategy, and building things."
        countLabel="posts"
        items={items}
        allTags={allTags}
        tag={tag}
        renderItem={(item) => (
          <ContentCard
            key={item.id}
            href={`/blog/${item.slug}`}
            title={item.title}
            summary={item.excerpt}
            tags={item.tags}
            date={item.published_at}
            coverImage={item.cover_image_url}
            readingTime={item.reading_time}
          />
        )}
        gridCols="repeat(auto-fill, minmax(320px, 1fr))"
      />
    </PageWrapper>
  );
}

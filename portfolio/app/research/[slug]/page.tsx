import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { ContentPageLayout } from "@/components/ui/ContentPageLayout";
import { getResearchBySlug, getAllResearchSlugs, getSiteConfig } from "@/lib/api";

export async function generateStaticParams() {
  const slugs = await getAllResearchSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const item = await getResearchBySlug(slug);
    return {
      title: item.title,
      description: item.subtitle ?? undefined,
      openGraph: item.cover_image_url ? { images: [item.cover_image_url] } : undefined,
    };
  } catch {
    return { title: "Research" };
  }
}

export default async function ResearchPiecePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [config, item] = await Promise.all([getSiteConfig(), getResearchBySlug(slug)]);

  return (
    <PageWrapper config={config}>
      <div style={{ position: "relative", height: "480px", overflow: "hidden", background: "linear-gradient(135deg, rgba(45,106,79,0.09), rgba(28,61,110,0.07))" }}>
        {item.cover_image_url && (
          <Image src={item.cover_image_url} alt={item.title} fill style={{ objectFit: "cover" }} priority sizes="100vw" />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 60%)" }} />
      </div>

      <div className="container-max" style={{ padding: "0 24px" }}>
        <div style={{ marginTop: "-80px", position: "relative", paddingBottom: "40px", borderBottom: "1px solid var(--bg-border)" }}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
            <span className="tag-chip tag-chip-teal">Research</span>
            {item.tags.map((t) => <span key={t} className="tag-chip">{t}</span>)}
          </div>
          <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(32px, 5vw, 56px)", color: "var(--text-primary)", marginBottom: "16px", lineHeight: 1.1 }}>
            {item.title}
          </h1>
          {item.subtitle && (
            <p style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "20px", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "640px", marginBottom: "20px" }}>
              {item.subtitle}
            </p>
          )}
          <div style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
            {item.published_at ? new Date(item.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
          </div>
        </div>
      </div>

      <ContentPageLayout blocks={item.blocks}>
        <BlockRenderer blocks={item.blocks} />
        <div style={{ marginTop: "64px", paddingTop: "32px", borderTop: "1px solid var(--bg-border)" }}>
          <Link href="/research" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "var(--accent)", textDecoration: "none" }}>
            ← Back to research
          </Link>
        </div>
      </ContentPageLayout>
    </PageWrapper>
  );
}

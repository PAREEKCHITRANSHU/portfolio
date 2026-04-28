import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { ContentPageLayout } from "@/components/ui/ContentPageLayout";
import { getBlogPostBySlug, getAllBlogSlugs, getSiteConfig } from "@/lib/api";

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const item = await getBlogPostBySlug(slug);
    return {
      title: item.title,
      description: item.excerpt ?? undefined,
      openGraph: item.cover_image_url ? { images: [item.cover_image_url] } : undefined,
    };
  } catch {
    return { title: "Blog Post" };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [config, item] = await Promise.all([getSiteConfig(), getBlogPostBySlug(slug)]);

  return (
    <PageWrapper config={config}>
      {item.cover_image_url && (
        <div style={{ position: "relative", height: "400px", overflow: "hidden" }}>
          <Image src={item.cover_image_url} alt={item.title} fill style={{ objectFit: "cover" }} priority sizes="100vw" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,15,0.8) 0%, transparent 60%)" }} />
        </div>
      )}

      <div className="container-max" style={{ padding: "48px 24px 0" }}>
        <div style={{ maxWidth: "760px", paddingBottom: "40px", borderBottom: "1px solid var(--bg-border)" }}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
            {item.tags.map((t) => <span key={t} className="tag-chip">{t}</span>)}
          </div>
          <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", color: "var(--text-primary)", marginBottom: "16px", lineHeight: 1.15 }}>
            {item.title}
          </h1>
          {item.excerpt && (
            <p style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "20px" }}>
              {item.excerpt}
            </p>
          )}
          <div style={{ fontSize: "13px", color: "var(--text-tertiary)", display: "flex", gap: "16px" }}>
            {item.published_at && (
              <span>{new Date(item.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            )}
            {item.reading_time && <span>~{item.reading_time} min read</span>}
          </div>
        </div>
      </div>

      <ContentPageLayout blocks={item.blocks}>
        <div style={{ maxWidth: "760px" }}>
          <BlockRenderer blocks={item.blocks} />
        </div>
        <div style={{ marginTop: "64px", paddingTop: "32px", borderTop: "1px solid var(--bg-border)", maxWidth: "760px" }}>
          <Link href="/blog" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "var(--accent)", textDecoration: "none" }}>
            ← Back to blog
          </Link>
        </div>
      </ContentPageLayout>
    </PageWrapper>
  );
}

import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { AboutSection } from "@/components/home/AboutSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { LatestWriting } from "@/components/home/LatestWriting";
import { ContactCTA } from "@/components/home/ContactCTA";
import { getSiteConfig, getCaseStudies, getProjects, getSkills, getExperience, getBlogPosts } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  return {
    title: { absolute: config.seo?.site_title ?? "Aman — Product Manager" },
    description: config.seo?.description ?? "PM portfolio",
    openGraph: config.seo?.og_image_url ? { images: [config.seo.og_image_url] } : undefined,
  };
}

export default async function HomePage() {
  const [config, featuredCS, featuredProjects, skills, experience, latestPosts] = await Promise.all([
    getSiteConfig(),
    getCaseStudies({ featured: true, limit: 4 }),
    getProjects({ featured: true, limit: 2 }),
    getSkills(),
    getExperience(),
    getBlogPosts({ limit: 3 }),
  ]);

  return (
    <PageWrapper config={config}>
      <HeroSection config={config} />
      <FeaturedWork caseStudies={featuredCS} projects={featuredProjects} />
      <AboutSection config={config} />
      <SkillsSection skills={skills} />
      <ExperiencePreview experience={experience} />
      <LatestWriting posts={latestPosts} />
      <ContactCTA config={config} />
    </PageWrapper>
  );
}

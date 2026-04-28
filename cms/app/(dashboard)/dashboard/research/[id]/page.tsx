import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { EditorPage } from "../../../components/EditorPage";

const CONFIG = {
  contentType: "Research", apiBase: "/api/research", listHref: "/dashboard/research", portfolioBase: "research",
  fields: { hasSubtitle: true, hasExcerpt: false, hasType: false, hasLiveUrl: false, hasGithubUrl: false, hasFeatured: false, hasBlocks: true },
};

export default async function EditResearchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let item: any = null;
  try { item = await prisma.market_research.findUnique({ where: { id } }); } catch { notFound(); }
  if (!item) notFound();
  return (
    <EditorPage config={CONFIG} initialData={{
      id: item.id, title: item.title, slug: item.slug, subtitle: item.subtitle ?? "", cover_image_url: item.cover_image_url ?? "",
      tags: item.tags, status: item.status as "draft" | "published" | "archived", meta_description: "",
      blocks: (item.blocks as unknown[]) as never,
    }} />
  );
}

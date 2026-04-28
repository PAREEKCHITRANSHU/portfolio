import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { EditorPage } from "../../../components/EditorPage";

const CONFIG = {
  contentType: "Projects", apiBase: "/api/projects", listHref: "/dashboard/projects", portfolioBase: "projects",
  fields: { hasSubtitle: false, hasExcerpt: false, hasType: true, hasLiveUrl: true, hasGithubUrl: true, hasFeatured: true, hasBlocks: true },
};

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let item: any = null;
  try { item = await prisma.projects.findUnique({ where: { id } }); } catch { notFound(); }
  if (!item) notFound();
  return (
    <EditorPage config={CONFIG} initialData={{
      id: item.id, title: item.title, slug: item.slug, cover_image_url: item.cover_image_url ?? "",
      tags: item.tags, status: item.status as "draft" | "published" | "archived", featured: item.featured, type: item.type ?? "",
      live_url: item.live_url ?? "", github_url: item.github_url ?? "", blocks: (item.blocks as unknown[]) as never,
    }} />
  );
}

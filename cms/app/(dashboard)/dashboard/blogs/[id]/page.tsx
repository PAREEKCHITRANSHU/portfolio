import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { EditorPage } from "../../../components/EditorPage";

const CONFIG = {
  contentType: "Blog Posts", apiBase: "/api/blogs", listHref: "/dashboard/blogs", portfolioBase: "blog",
  fields: { hasSubtitle: false, hasExcerpt: true, hasType: false, hasLiveUrl: false, hasGithubUrl: false, hasFeatured: false, hasBlocks: true },
};

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let item: any = null;
  try { item = await prisma.blogs.findUnique({ where: { id } }); } catch { notFound(); }
  if (!item) notFound();
  return (
    <EditorPage config={CONFIG} initialData={{
      id: item.id, title: item.title, slug: item.slug, excerpt: item.excerpt ?? "", cover_image_url: item.cover_image_url ?? "",
      tags: item.tags, status: item.status as "draft" | "published" | "archived", meta_description: "",
      blocks: (item.blocks as unknown[]) as never,
    }} />
  );
}

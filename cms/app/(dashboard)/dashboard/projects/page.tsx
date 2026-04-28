import { prisma } from "@/lib/db";
import { ListPage } from "../../components/ListPage";

export default async function ProjectsPage() {
  let items: any[] = [];
  try { items = await prisma.projects.findMany({ orderBy: { updated_at: "desc" }, select: { id: true, title: true, status: true, type: true, published_at: true, updated_at: true, featured: true } }); } catch {}
  return (
    <ListPage
      config={{ contentType: "Projects", apiBase: "/api/projects", newHref: "/dashboard/projects/new", editBase: "/dashboard/projects", showType: true, showFeatured: true }}
      initialItems={items.map((i: any) => ({ ...i, published_at: i.published_at?.toISOString() ?? null, updated_at: i.updated_at.toISOString() }))}
    />
  );
}

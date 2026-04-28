import { prisma } from "@/lib/db";
import { ListPage } from "../../components/ListPage";

export default async function CaseStudiesPage() {
  let items: any[] = [];
  try { items = await prisma.case_studies.findMany({ orderBy: { updated_at: "desc" }, select: { id: true, title: true, status: true, published_at: true, updated_at: true, featured: true } }); } catch {}
  return (
    <ListPage
      config={{ contentType: "Case Studies", apiBase: "/api/case-studies", newHref: "/dashboard/case-studies/new", editBase: "/dashboard/case-studies", showFeatured: true }}
      initialItems={items.map((i: any) => ({ ...i, published_at: i.published_at?.toISOString() ?? null, updated_at: i.updated_at.toISOString() }))}
    />
  );
}

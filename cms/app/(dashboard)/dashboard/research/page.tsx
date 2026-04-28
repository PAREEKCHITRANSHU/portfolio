import { prisma } from "@/lib/db";
import { ListPage } from "../../components/ListPage";

export default async function ResearchPage() {
  let items: any[] = [];
  try { items = await prisma.market_research.findMany({ orderBy: { updated_at: "desc" }, select: { id: true, title: true, status: true, published_at: true, updated_at: true } }); } catch {}
  return (
    <ListPage
      config={{ contentType: "Research", apiBase: "/api/research", newHref: "/dashboard/research/new", editBase: "/dashboard/research" }}
      initialItems={items.map((i: any) => ({ ...i, published_at: i.published_at?.toISOString() ?? null, updated_at: i.updated_at.toISOString() }))}
    />
  );
}

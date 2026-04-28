import { prisma } from "@/lib/db";
import { ListPage } from "../../components/ListPage";

export default async function BlogsPage() {
  let items: any[] = [];
  try { items = await prisma.blogs.findMany({ orderBy: { updated_at: "desc" }, select: { id: true, title: true, status: true, published_at: true, updated_at: true, reading_time: true } }); } catch {}
  return (
    <ListPage
      config={{ contentType: "Blog Posts", apiBase: "/api/blogs", newHref: "/dashboard/blogs/new", editBase: "/dashboard/blogs", showReadingTime: true }}
      initialItems={items.map((i: any) => ({ ...i, published_at: i.published_at?.toISOString() ?? null, updated_at: i.updated_at.toISOString(), reading_time: i.reading_time ?? undefined }))}
    />
  );
}

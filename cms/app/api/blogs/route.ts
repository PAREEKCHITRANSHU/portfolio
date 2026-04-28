import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ok, err, withAuth, withPublicRead } from "@/lib/handler";
import { generateSlug, ensureUniqueSlug } from "@/lib/slug";

function calculateReadingTime(blocks: unknown[]): number {
  let wordCount = 0;
  for (const block of blocks) {
    if (
      typeof block === "object" &&
      block !== null &&
      "type" in block &&
      (block as { type: string }).type === "rich_text" &&
      "data" in block &&
      typeof (block as { data: unknown }).data === "object" &&
      (block as { data: { html?: string } }).data !== null &&
      "html" in (block as { data: { html?: string } }).data
    ) {
      const html = (block as { data: { html: string } }).data.html;
      const text = html.replace(/<[^>]+>/g, " ");
      wordCount += text.split(/\s+/).filter(Boolean).length;
    }
  }
  return Math.max(1, Math.ceil(wordCount / 200));
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  return withPublicRead(async () => {
    const { searchParams } = req.nextUrl;
    const tag = searchParams.get("tag");
    const limit = searchParams.get("limit");

    const where: Record<string, unknown> = { status: "published" };
    if (tag) where.tags = { has: tag };

    const [items, total, published, draft] = await Promise.all([
      prisma.blogs.findMany({
        where,
        orderBy: { published_at: "desc" },
        ...(limit ? { take: parseInt(limit) } : {}),
      }),
      prisma.blogs.count(),
      prisma.blogs.count({ where: { status: "published" } }),
      prisma.blogs.count({ where: { status: "draft" } }),
    ]);

    return ok(items, { total, published, draft });
  });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  return withAuth(req, async () => {
    const body = await req.json();
    const { title, excerpt, cover_image_url, tags, status, blocks } = body;

    if (!title) return err("VALIDATION", "Title is required", 400);

    const baseSlug = body.slug || generateSlug(title);
    const slug = await ensureUniqueSlug(baseSlug, "blogs");
    const reading_time = calculateReadingTime(blocks ?? []);

    const item = await prisma.blogs.create({
      data: {
        slug,
        title,
        excerpt: excerpt ?? null,
        cover_image_url: cover_image_url ?? null,
        tags: tags ?? [],
        reading_time,
        status: status ?? "draft",
        blocks: blocks ?? [],
        published_at: status === "published" ? new Date() : null,
      },
    });

    return ok(item);
  });
}

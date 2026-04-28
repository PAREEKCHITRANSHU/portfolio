import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ok, err, withAuth, withPublicRead } from "@/lib/handler";
import { generateSlug, ensureUniqueSlug } from "@/lib/slug";

export async function GET(req: NextRequest): Promise<NextResponse> {
  return withPublicRead(async () => {
    const { searchParams } = req.nextUrl;
    const tag = searchParams.get("tag");
    const limit = searchParams.get("limit");

    const where: Record<string, unknown> = { status: "published" };
    if (tag) where.tags = { has: tag };

    const [items, total, published, draft] = await Promise.all([
      prisma.market_research.findMany({
        where,
        orderBy: { published_at: "desc" },
        ...(limit ? { take: parseInt(limit) } : {}),
      }),
      prisma.market_research.count(),
      prisma.market_research.count({ where: { status: "published" } }),
      prisma.market_research.count({ where: { status: "draft" } }),
    ]);

    return ok(items, { total, published, draft });
  });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  return withAuth(req, async () => {
    const body = await req.json();
    const { title, subtitle, cover_image_url, tags, status, blocks } = body;

    if (!title) return err("VALIDATION", "Title is required", 400);

    const baseSlug = body.slug || generateSlug(title);
    const slug = await ensureUniqueSlug(baseSlug, "market_research");

    const item = await prisma.market_research.create({
      data: {
        slug,
        title,
        subtitle: subtitle ?? null,
        cover_image_url: cover_image_url ?? null,
        tags: tags ?? [],
        status: status ?? "draft",
        blocks: blocks ?? [],
        published_at: status === "published" ? new Date() : null,
      },
    });

    return ok(item);
  });
}

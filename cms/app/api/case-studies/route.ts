import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ok, err, withAuth, withPublicRead } from "@/lib/handler";
import { generateSlug, ensureUniqueSlug } from "@/lib/slug";

export async function GET(req: NextRequest): Promise<NextResponse> {
  return withPublicRead(async () => {
    const { searchParams } = req.nextUrl;
    const featured = searchParams.get("featured");
    const tag = searchParams.get("tag");
    const limit = searchParams.get("limit");

    const where: Record<string, unknown> = { status: "published" };
    if (featured === "true") where.featured = true;
    if (tag) where.tags = { has: tag };

    const [items, total, published, draft] = await Promise.all([
      prisma.case_studies.findMany({
        where,
        orderBy: { published_at: "desc" },
        ...(limit ? { take: parseInt(limit) } : {}),
      }),
      prisma.case_studies.count(),
      prisma.case_studies.count({ where: { status: "published" } }),
      prisma.case_studies.count({ where: { status: "draft" } }),
    ]);

    return ok(items, { total, published, draft });
  });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  return withAuth(req, async () => {
    const body = await req.json();
    const { title, subtitle, cover_image_url, tags, status, featured, meta_description, blocks } = body;

    if (!title) return err("VALIDATION", "Title is required", 400);

    const baseSlug = body.slug || generateSlug(title);
    const slug = await ensureUniqueSlug(baseSlug, "case_studies");

    const item = await prisma.case_studies.create({
      data: {
        slug,
        title,
        subtitle: subtitle ?? null,
        cover_image_url: cover_image_url ?? null,
        tags: tags ?? [],
        status: status ?? "draft",
        featured: featured ?? false,
        meta_description: meta_description ?? null,
        blocks: blocks ?? [],
        published_at: status === "published" ? new Date() : null,
      },
    });

    return ok(item);
  });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ok, err, withAuth, withPublicRead } from "@/lib/handler";
import { generateSlug, ensureUniqueSlug } from "@/lib/slug";

export async function GET(req: NextRequest): Promise<NextResponse> {
  return withPublicRead(async () => {
    const { searchParams } = req.nextUrl;
    const featured = searchParams.get("featured");
    const type = searchParams.get("type");
    const limit = searchParams.get("limit");

    const where: Record<string, unknown> = { status: "published" };
    if (featured === "true") where.featured = true;
    if (type) where.type = type;

    const [items, total, published, draft] = await Promise.all([
      prisma.projects.findMany({
        where,
        orderBy: { published_at: "desc" },
        ...(limit ? { take: parseInt(limit) } : {}),
      }),
      prisma.projects.count(),
      prisma.projects.count({ where: { status: "published" } }),
      prisma.projects.count({ where: { status: "draft" } }),
    ]);

    return ok(items, { total, published, draft });
  });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  return withAuth(req, async () => {
    const body = await req.json();
    const { title, description, cover_image_url, type, tags, live_url, github_url, status, featured, blocks } = body;

    if (!title) return err("VALIDATION", "Title is required", 400);

    const baseSlug = body.slug || generateSlug(title);
    const slug = await ensureUniqueSlug(baseSlug, "projects");

    const item = await prisma.projects.create({
      data: {
        slug,
        title,
        description: description ?? null,
        cover_image_url: cover_image_url ?? null,
        type: type ?? null,
        tags: tags ?? [],
        live_url: live_url ?? null,
        github_url: github_url ?? null,
        status: status ?? "draft",
        featured: featured ?? false,
        blocks: blocks ?? [],
        published_at: status === "published" ? new Date() : null,
      },
    });

    return ok(item);
  });
}

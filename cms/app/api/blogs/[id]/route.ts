import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ok, err, withAuth, withPublicRead } from "@/lib/handler";
import { emitRevalidation } from "@/lib/revalidate";

function calculateReadingTime(blocks: unknown[]): number {
  let wordCount = 0;
  for (const block of blocks) {
    if (typeof block === "object" && block !== null && "type" in block && (block as { type: string }).type === "rich_text" && "data" in block) {
      const html = ((block as { data: { html?: string } }).data.html ?? "");
      wordCount += html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    }
  }
  return Math.max(1, Math.ceil(wordCount / 200));
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  return withPublicRead(async () => {
    const isUuid = /^[0-9a-f-]{36}$/.test(id);
    const item = isUuid
      ? await prisma.blogs.findUnique({ where: { id } })
      : await prisma.blogs.findUnique({ where: { slug: id } });
    if (!item) return err("NOT_FOUND", "Blog post not found", 404);
    return ok(item);
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  return withAuth(req, async () => {
    const body = await req.json();
    const { title, excerpt, slug, cover_image_url, tags, status, blocks } = body;
    const existing = await prisma.blogs.findUnique({ where: { id }, select: { status: true, slug: true } });
    if (!existing) return err("NOT_FOUND", "Blog post not found", 404);
    const wasPublished = existing.status === "published";
    const isPublishing = status === "published" && !wasPublished;
    const isUnpublishing = status !== "published" && wasPublished;
    const reading_time = blocks ? calculateReadingTime(blocks) : undefined;
    const item = await prisma.blogs.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(excerpt !== undefined && { excerpt }),
        ...(slug !== undefined && { slug }),
        ...(cover_image_url !== undefined && { cover_image_url }),
        ...(tags !== undefined && { tags }),
        ...(status !== undefined && { status }),
        ...(blocks !== undefined && { blocks }),
        ...(reading_time !== undefined && { reading_time }),
        ...(isPublishing && { published_at: new Date() }),
        updated_at: new Date(),
      },
    });
    if (status === "published" || isUnpublishing) {
      await emitRevalidation({ type: "blog", slug: item.slug, action: isUnpublishing ? "unpublish" : "publish" });
    }
    return ok(item);
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  return withAuth(req, async () => {
    const existing = await prisma.blogs.findUnique({ where: { id }, select: { slug: true } });
    if (!existing) return err("NOT_FOUND", "Blog post not found", 404);
    const item = await prisma.blogs.update({ where: { id }, data: { status: "archived", updated_at: new Date() } });
    await emitRevalidation({ type: "blog", slug: existing.slug, action: "delete" });
    return ok(item);
  });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ok, err, withAuth, withPublicRead } from "@/lib/handler";
import { emitRevalidation } from "@/lib/revalidate";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  return withPublicRead(async () => {
    const isUuid = /^[0-9a-f-]{36}$/.test(id);
    const item = isUuid
      ? await prisma.market_research.findUnique({ where: { id } })
      : await prisma.market_research.findUnique({ where: { slug: id } });
    if (!item) return err("NOT_FOUND", "Research piece not found", 404);
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
    const { title, subtitle, slug, cover_image_url, tags, status, blocks } = body;
    const existing = await prisma.market_research.findUnique({ where: { id }, select: { status: true, slug: true } });
    if (!existing) return err("NOT_FOUND", "Research piece not found", 404);
    const wasPublished = existing.status === "published";
    const isPublishing = status === "published" && !wasPublished;
    const isUnpublishing = status !== "published" && wasPublished;
    const item = await prisma.market_research.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(subtitle !== undefined && { subtitle }),
        ...(slug !== undefined && { slug }),
        ...(cover_image_url !== undefined && { cover_image_url }),
        ...(tags !== undefined && { tags }),
        ...(status !== undefined && { status }),
        ...(blocks !== undefined && { blocks }),
        ...(isPublishing && { published_at: new Date() }),
        updated_at: new Date(),
      },
    });
    if (status === "published" || isUnpublishing) {
      await emitRevalidation({ type: "research", slug: item.slug, action: isUnpublishing ? "unpublish" : "publish" });
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
    const existing = await prisma.market_research.findUnique({ where: { id }, select: { slug: true } });
    if (!existing) return err("NOT_FOUND", "Research piece not found", 404);
    const item = await prisma.market_research.update({ where: { id }, data: { status: "archived", updated_at: new Date() } });
    await emitRevalidation({ type: "research", slug: existing.slug, action: "delete" });
    return ok(item);
  });
}

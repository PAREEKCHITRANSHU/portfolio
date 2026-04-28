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
      ? await prisma.case_studies.findUnique({ where: { id } })
      : await prisma.case_studies.findUnique({ where: { slug: id } });
    if (!item) return err("NOT_FOUND", "Case study not found", 404);
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
    const { title, subtitle, slug, cover_image_url, tags, status, featured, meta_description, blocks } = body;

    const existing = await prisma.case_studies.findUnique({ where: { id }, select: { status: true, slug: true, published_at: true } });
    if (!existing) return err("NOT_FOUND", "Case study not found", 404);

    const wasPublished = existing.status === "published";
    const isPublishing = status === "published" && !wasPublished;
    const isUnpublishing = status !== "published" && wasPublished;

    const item = await prisma.case_studies.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(subtitle !== undefined && { subtitle }),
        ...(slug !== undefined && slug !== existing.slug && { slug }),
        ...(cover_image_url !== undefined && { cover_image_url }),
        ...(tags !== undefined && { tags }),
        ...(status !== undefined && { status }),
        ...(featured !== undefined && { featured }),
        ...(meta_description !== undefined && { meta_description }),
        ...(blocks !== undefined && { blocks }),
        ...(isPublishing && { published_at: new Date() }),
        updated_at: new Date(),
      },
    });

    if (status === "published" || isUnpublishing) {
      await emitRevalidation({ type: "case_study", slug: item.slug, action: isUnpublishing ? "unpublish" : "publish" });
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
    const existing = await prisma.case_studies.findUnique({ where: { id }, select: { slug: true } });
    if (!existing) return err("NOT_FOUND", "Case study not found", 404);
    const item = await prisma.case_studies.update({ where: { id }, data: { status: "archived", updated_at: new Date() } });
    await emitRevalidation({ type: "case_study", slug: existing.slug, action: "delete" });
    return ok(item);
  });
}

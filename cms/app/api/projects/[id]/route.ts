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
      ? await prisma.projects.findUnique({ where: { id } })
      : await prisma.projects.findUnique({ where: { slug: id } });
    if (!item) return err("NOT_FOUND", "Project not found", 404);
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
    const { title, description, slug, cover_image_url, type, tags, live_url, github_url, status, featured, blocks } = body;
    const existing = await prisma.projects.findUnique({ where: { id }, select: { status: true, slug: true } });
    if (!existing) return err("NOT_FOUND", "Project not found", 404);
    const wasPublished = existing.status === "published";
    const isPublishing = status === "published" && !wasPublished;
    const isUnpublishing = status !== "published" && wasPublished;
    const item = await prisma.projects.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(slug !== undefined && { slug }),
        ...(cover_image_url !== undefined && { cover_image_url }),
        ...(type !== undefined && { type }),
        ...(tags !== undefined && { tags }),
        ...(live_url !== undefined && { live_url }),
        ...(github_url !== undefined && { github_url }),
        ...(status !== undefined && { status }),
        ...(featured !== undefined && { featured }),
        ...(blocks !== undefined && { blocks }),
        ...(isPublishing && { published_at: new Date() }),
        updated_at: new Date(),
      },
    });
    if (status === "published" || isUnpublishing) {
      await emitRevalidation({ type: "project", slug: item.slug, action: isUnpublishing ? "unpublish" : "publish" });
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
    const existing = await prisma.projects.findUnique({ where: { id }, select: { slug: true } });
    if (!existing) return err("NOT_FOUND", "Project not found", 404);
    const item = await prisma.projects.update({ where: { id }, data: { status: "archived", updated_at: new Date() } });
    await emitRevalidation({ type: "project", slug: existing.slug, action: "delete" });
    return ok(item);
  });
}

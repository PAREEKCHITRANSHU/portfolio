import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ok, err, withAuth } from "@/lib/handler";
import { emitRevalidation } from "@/lib/revalidate";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  return withAuth(req, async () => {
    const body = await req.json();
    const { name, category, icon_url, proficiency, order_index, visible } = body;
    const existing = await prisma.skills.findUnique({ where: { id } });
    if (!existing) return err("NOT_FOUND", "Skill not found", 404);
    const item = await prisma.skills.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(category !== undefined && { category }),
        ...(icon_url !== undefined && { icon_url }),
        ...(proficiency !== undefined && { proficiency }),
        ...(order_index !== undefined && { order_index }),
        ...(visible !== undefined && { visible }),
      },
    });
    await emitRevalidation({ type: "skills", slug: null, action: "publish" });
    return ok(item);
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  return withAuth(req, async () => {
    const existing = await prisma.skills.findUnique({ where: { id } });
    if (!existing) return err("NOT_FOUND", "Skill not found", 404);
    await prisma.skills.delete({ where: { id } });
    await emitRevalidation({ type: "skills", slug: null, action: "delete" });
    return ok({ id });
  });
}

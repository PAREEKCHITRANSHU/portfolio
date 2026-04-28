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
    const { company, role, description, start_date, end_date, is_current, tags, logo_url, order_index, visible } = body;
    const existing = await prisma.experience.findUnique({ where: { id } });
    if (!existing) return err("NOT_FOUND", "Experience entry not found", 404);
    const item = await prisma.experience.update({
      where: { id },
      data: {
        ...(company !== undefined && { company }),
        ...(role !== undefined && { role }),
        ...(description !== undefined && { description }),
        ...(start_date !== undefined && { start_date: new Date(start_date) }),
        ...(end_date !== undefined && { end_date: end_date ? new Date(end_date) : null }),
        ...(is_current !== undefined && { is_current }),
        ...(tags !== undefined && { tags }),
        ...(logo_url !== undefined && { logo_url }),
        ...(order_index !== undefined && { order_index }),
        ...(visible !== undefined && { visible }),
      },
    });
    await emitRevalidation({ type: "experience", slug: null, action: "publish" });
    return ok(item);
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  return withAuth(req, async () => {
    const existing = await prisma.experience.findUnique({ where: { id } });
    if (!existing) return err("NOT_FOUND", "Experience entry not found", 404);
    await prisma.experience.delete({ where: { id } });
    await emitRevalidation({ type: "experience", slug: null, action: "delete" });
    return ok({ id });
  });
}

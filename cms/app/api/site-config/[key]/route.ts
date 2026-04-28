import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ok, err, withAuth } from "@/lib/handler";
import { emitRevalidation } from "@/lib/revalidate";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
): Promise<NextResponse> {
  const { key } = await params;
  return withAuth(req, async () => {
    const body = await req.json();
    const { value } = body;
    if (value === undefined) return err("VALIDATION", "Value is required", 400);
    const item = await prisma.site_config.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    await emitRevalidation({ type: "site_config", slug: null, action: "publish" });
    return ok(item);
  });
}

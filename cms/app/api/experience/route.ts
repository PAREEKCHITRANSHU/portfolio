import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ok, withAuth, withPublicRead } from "@/lib/handler";
import { emitRevalidation } from "@/lib/revalidate";

export async function GET(req: NextRequest): Promise<NextResponse> {
  return withPublicRead(async () => {
    const all = req.nextUrl.searchParams.get("all") === "true";
    const items = await prisma.experience.findMany({
      where: all ? {} : { visible: true },
      orderBy: { order_index: "asc" },
    });
    return ok(items);
  });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  return withAuth(req, async () => {
    const body = await req.json();
    const { company, role, description, start_date, end_date, is_current, tags, logo_url, order_index, visible } = body;

    const item = await prisma.experience.create({
      data: {
        company,
        role,
        description: description ?? null,
        start_date: new Date(start_date),
        end_date: end_date ? new Date(end_date) : null,
        is_current: is_current ?? false,
        tags: tags ?? [],
        logo_url: logo_url ?? null,
        order_index: order_index ?? 0,
        visible: visible ?? true,
      },
    });

    await emitRevalidation({ type: "experience", slug: null, action: "publish" });
    return ok(item);
  });
}

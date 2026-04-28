import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ok, withAuth, withPublicRead } from "@/lib/handler";
import { emitRevalidation } from "@/lib/revalidate";

export async function GET(req: NextRequest): Promise<NextResponse> {
  return withPublicRead(async () => {
    const all = req.nextUrl.searchParams.get("all") === "true";
    const items = await prisma.skills.findMany({
      where: all ? {} : { visible: true },
      orderBy: [{ category: "asc" }, { order_index: "asc" }],
    });

    // Group by category
    const grouped: Record<string, typeof items> = {};
    for (const skill of items) {
      const cat = skill.category ?? "Other";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(skill);
    }

    return ok(grouped);
  });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  return withAuth(req, async () => {
    const body = await req.json();
    const { name, category, icon_url, proficiency, order_index, visible } = body;

    const item = await prisma.skills.create({
      data: {
        name,
        category: category ?? null,
        icon_url: icon_url ?? null,
        proficiency: proficiency ?? null,
        order_index: order_index ?? 0,
        visible: visible ?? true,
      },
    });

    await emitRevalidation({ type: "skills", slug: null, action: "publish" });
    return ok(item);
  });
}

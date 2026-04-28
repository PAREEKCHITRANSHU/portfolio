import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ok, withPublicRead } from "@/lib/handler";

export async function GET(): Promise<NextResponse> {
  return withPublicRead(async () => {
    const rows = await prisma.site_config.findMany();
    const map: Record<string, unknown> = {};
    for (const row of rows) {
      map[row.key] = row.value;
    }
    return ok(map);
  });
}

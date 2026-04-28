import { NextRequest, NextResponse } from "next/server";
import { ok, err } from "@/lib/handler";

// This endpoint on the CMS side is a pass-through — the actual revalidation
// endpoint lives on the Portfolio. This route is for internal health checks.
export async function GET(): Promise<NextResponse> {
  return ok({ status: "CMS revalidation emitter active" });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const secret = req.headers.get("x-revalidate-secret");
  if (secret !== process.env.CMS_API_SECRET) {
    return err("UNAUTHORIZED", "Invalid revalidation secret", 401);
  }
  return ok({ received: true });
}

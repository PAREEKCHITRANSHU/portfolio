import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

const TYPE_TO_TAG: Record<string, string> = {
  case_study: "case_study",
  project: "project",
  blog: "blog",
  research: "research",
  experience: "experience",
  skills: "skills",
  site_config: "site_config",
};

const TYPE_TO_PATH_PREFIX: Record<string, string> = {
  case_study: "/case-studies",
  project: "/projects",
  blog: "/blog",
  research: "/research",
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  const secret = req.headers.get("x-revalidate-secret");
  if (secret !== process.env.CMS_API_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const body = await req.json();
  const { type, slug, action } = body as { type: string; slug?: string | null; action: string };

  const tag = TYPE_TO_TAG[type];
  if (tag) {
    revalidateTag(tag);
    // Also revalidate per-slug tag
    if (slug) revalidateTag(`${tag}_${slug}`);
  }

  const pathPrefix = TYPE_TO_PATH_PREFIX[type];
  if (pathPrefix && slug) {
    revalidatePath(`${pathPrefix}/${slug}`);
  }

  // Site config changes affect homepage and /contact
  if (type === "site_config") {
    revalidatePath("/");
    revalidatePath("/contact");
  }

  // Experience/skills changes affect homepage
  if (type === "experience" || type === "skills") {
    revalidatePath("/");
  }

  return NextResponse.json({ revalidated: true, type, slug, action });
}

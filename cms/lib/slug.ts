import { prisma } from "./db";

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type SlugModel = "case_studies" | "projects" | "blogs" | "market_research";

export async function ensureUniqueSlug(
  baseSlug: string,
  model: SlugModel,
  excludeId?: string
): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    let existing: { id: string } | null = null;

    if (model === "case_studies") {
      existing = await prisma.case_studies.findUnique({
        where: { slug },
        select: { id: true },
      });
    } else if (model === "projects") {
      existing = await prisma.projects.findUnique({
        where: { slug },
        select: { id: true },
      });
    } else if (model === "blogs") {
      existing = await prisma.blogs.findUnique({
        where: { slug },
        select: { id: true },
      });
    } else if (model === "market_research") {
      existing = await prisma.market_research.findUnique({
        where: { slug },
        select: { id: true },
      });
    }

    if (!existing || existing.id === excludeId) return slug;

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

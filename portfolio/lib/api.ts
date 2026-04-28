import { notFound } from "next/navigation";
import type {
  CaseStudy, Project, BlogPost, ResearchPiece,
  ExperienceEntry, Skill, SiteConfig,
} from "./types";
import {
  MOCK_CONFIG, MOCK_CASE_STUDIES, MOCK_PROJECTS,
  MOCK_BLOG_POSTS, MOCK_RESEARCH, MOCK_EXPERIENCE, MOCK_SKILLS,
} from "./mock-data";

const CMS = (process.env.NEXT_PUBLIC_CMS_URL ?? "").replace(/\/$/, "");

if (!CMS) {
  console.warn("[portfolio] NEXT_PUBLIC_CMS_URL is not set — API calls will fail.");
}

async function apiFetch<T>(url: string, tags: string[]): Promise<T> {
  if (!CMS) return notFound() as never;
  const res = await fetch(url, { next: { tags } });
  if (!res.ok) return notFound() as never;
  const json = await res.json();
  return json.data as T;
}

async function safeListFetch<T>(url: string, tags: string[]): Promise<T[]> {
  if (!CMS) return [];
  try {
    const res = await fetch(url, { next: { tags } });
    if (!res.ok) return [];
    return ((await res.json()).data ?? []) as T[];
  } catch {
    return [];
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function applyListOpts<T extends { tags: string[]; featured?: boolean; published_at?: string | null }>(
  items: T[],
  opts?: { featured?: boolean; tag?: string; limit?: number }
): T[] {
  let result = items;
  if (opts?.featured) result = result.filter((i) => i.featured);
  if (opts?.tag) result = result.filter((i) => i.tags.includes(opts.tag!));
  if (opts?.limit) result = result.slice(0, opts.limit);
  return result;
}

// ─── Case Studies ─────────────────────────────────────────────────────────────

export async function getCaseStudies(opts?: { featured?: boolean; tag?: string; limit?: number }): Promise<CaseStudy[]> {
  const p = new URLSearchParams();
  if (opts?.featured) p.set("featured", "true");
  if (opts?.tag) p.set("tag", opts.tag);
  if (opts?.limit) p.set("limit", String(opts.limit));
  const items = await safeListFetch<CaseStudy>(`${CMS}/api/case-studies?${p}`, ["case_study"]);
  return items.length > 0 ? items : applyListOpts(MOCK_CASE_STUDIES, opts);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy> {
  if (CMS) {
    try { return await apiFetch<CaseStudy>(`${CMS}/api/case-studies/${slug}`, [`case_study_${slug}`]); } catch {}
  }
  const mock = MOCK_CASE_STUDIES.find((i) => i.slug === slug);
  if (!mock) notFound();
  return mock;
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  const items = await getCaseStudies();
  return items.map((i) => i.slug);
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function getProjects(opts?: { type?: string; featured?: boolean; limit?: number }): Promise<Project[]> {
  const p = new URLSearchParams();
  if (opts?.type) p.set("type", opts.type);
  if (opts?.featured) p.set("featured", "true");
  if (opts?.limit) p.set("limit", String(opts.limit));
  const items = await safeListFetch<Project>(`${CMS}/api/projects?${p}`, ["project"]);
  return items.length > 0 ? items : applyListOpts(MOCK_PROJECTS, opts);
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  if (CMS) {
    try { return await apiFetch<Project>(`${CMS}/api/projects/${slug}`, [`project_${slug}`]); } catch {}
  }
  const mock = MOCK_PROJECTS.find((i) => i.slug === slug);
  if (!mock) notFound();
  return mock;
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const items = await getProjects();
  return items.map((i) => i.slug);
}

// ─── Blogs ────────────────────────────────────────────────────────────────────

export async function getBlogPosts(opts?: { tag?: string; limit?: number }): Promise<BlogPost[]> {
  const p = new URLSearchParams();
  if (opts?.tag) p.set("tag", opts.tag);
  if (opts?.limit) p.set("limit", String(opts.limit));
  const items = await safeListFetch<BlogPost>(`${CMS}/api/blogs?${p}`, ["blog"]);
  return items.length > 0 ? items : applyListOpts(MOCK_BLOG_POSTS, opts);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  if (CMS) {
    try { return await apiFetch<BlogPost>(`${CMS}/api/blogs/${slug}`, [`blog_${slug}`]); } catch {}
  }
  const mock = MOCK_BLOG_POSTS.find((i) => i.slug === slug);
  if (!mock) notFound();
  return mock;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const items = await getBlogPosts();
  return items.map((i) => i.slug);
}

// ─── Research ─────────────────────────────────────────────────────────────────

export async function getResearch(opts?: { tag?: string; limit?: number }): Promise<ResearchPiece[]> {
  const p = new URLSearchParams();
  if (opts?.tag) p.set("tag", opts.tag);
  if (opts?.limit) p.set("limit", String(opts.limit));
  const items = await safeListFetch<ResearchPiece>(`${CMS}/api/research?${p}`, ["research"]);
  return items.length > 0 ? items : applyListOpts(MOCK_RESEARCH, opts);
}

export async function getResearchBySlug(slug: string): Promise<ResearchPiece> {
  if (CMS) {
    try { return await apiFetch<ResearchPiece>(`${CMS}/api/research/${slug}`, [`research_${slug}`]); } catch {}
  }
  const mock = MOCK_RESEARCH.find((i) => i.slug === slug);
  if (!mock) notFound();
  return mock;
}

export async function getAllResearchSlugs(): Promise<string[]> {
  const items = await getResearch();
  return items.map((i) => i.slug);
}

// ─── Experience ───────────────────────────────────────────────────────────────

export async function getExperience(): Promise<ExperienceEntry[]> {
  const items = await safeListFetch<ExperienceEntry>(`${CMS}/api/experience`, ["experience"]);
  return items.length > 0 ? items : MOCK_EXPERIENCE;
}

// ─── Skills ───────────────────────────────────────────────────────────────────

export async function getSkills(): Promise<Record<string, Skill[]>> {
  if (CMS) {
    try {
      const res = await fetch(`${CMS}/api/skills`, { next: { tags: ["skills"] } });
      if (res.ok) {
        const data = (await res.json()).data ?? {};
        if (Object.keys(data).length > 0) return data as Record<string, Skill[]>;
      }
    } catch {}
  }
  return MOCK_SKILLS;
}

// ─── Site Config ──────────────────────────────────────────────────────────────

export async function getSiteConfig(): Promise<SiteConfig> {
  if (CMS) {
    try {
      const res = await fetch(`${CMS}/api/site-config`, { next: { tags: ["site_config"] } });
      if (res.ok) {
        const data = (await res.json()).data ?? {};
        if (Object.keys(data).length > 0) return data as SiteConfig;
      }
    } catch {}
  }
  return MOCK_CONFIG;
}

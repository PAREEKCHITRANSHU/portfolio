export interface Block {
  id: string;
  type: string;
  order: number;
  data: Record<string, unknown>;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  cover_image_url: string | null;
  tags: string[];
  status: string;
  published_at: string | null;
  featured: boolean;
  meta_description: string | null;
  blocks: Block[];
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  type: string | null;
  tags: string[];
  live_url: string | null;
  github_url: string | null;
  status: string;
  published_at: string | null;
  featured: boolean;
  blocks: Block[] | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  tags: string[];
  reading_time: number | null;
  status: string;
  published_at: string | null;
  blocks: Block[];
  created_at: string;
  updated_at: string;
}

export interface ResearchPiece {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  cover_image_url: string | null;
  tags: string[];
  status: string;
  published_at: string | null;
  blocks: Block[];
  created_at: string;
  updated_at: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  tags: string[];
  logo_url: string | null;
  order_index: number | null;
  visible: boolean;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string | null;
  icon_url: string | null;
  proficiency: number | null;
  order_index: number | null;
  visible: boolean;
  created_at: string;
}

export interface SiteConfigHero {
  headline_1: string;
  headline_2: string;
  subheadline: string;
  cta_label: string;
  cta_url: string;
}

export interface SiteConfigAbout {
  bio: string;
  photo_url: string;
  tagline: string;
  resume_url: string;
}

export interface SiteConfigSocial {
  linkedin: string;
  github: string;
  twitter: string;
  email: string;
}

export interface SiteConfigSEO {
  site_title: string;
  description: string;
  og_image_url: string;
}

export interface SiteConfigContact {
  email: string;
  calendly_url: string;
  availability_note: string;
  available: boolean;
}

export interface SiteConfig {
  hero?: SiteConfigHero;
  about?: SiteConfigAbout;
  social?: SiteConfigSocial;
  seo?: SiteConfigSEO;
  contact?: SiteConfigContact;
}

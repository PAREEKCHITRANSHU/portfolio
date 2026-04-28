import type {
  SiteConfig, CaseStudy, Project, BlogPost,
  ResearchPiece, ExperienceEntry, Skill, Block,
} from "./types";

// ─── Helpers ────────────────────────────────────────────────────────────────

function richText(html: string): Block {
  return { id: "b1", type: "rich_text", order: 0, data: { html } };
}

function metricBlock(metrics: { label: string; value: string; delta?: string }[]): Block {
  return { id: "b2", type: "metrics", order: 1, data: { metrics } };
}

function callout(title: string, body: string, variant = "info"): Block {
  return { id: "b3", type: "callout", order: 2, data: { title, body, variant } };
}

// ─── Site Config ─────────────────────────────────────────────────────────────

export const MOCK_CONFIG: SiteConfig = {
  hero: {
    headline_1: "Building products",
    headline_2: "people love to use.",
    subheadline: "Product Manager with 6 years shipping B2B SaaS, fintech, and AI tools. I turn ambiguous problems into clear roadmaps and measurable outcomes.",
    cta_label: "See my work",
    cta_url: "/case-studies",
  },
  about: {
    bio: "I'm Aman, a Product Manager who has spent the last 6 years at the intersection of user empathy, business strategy, and engineering constraints. I've shipped features used by 500k+ users, run 200+ user interviews, and helped two startups grow from Series A to Series C. When I'm not writing PRDs, I'm building side projects, tinkering with AI tools, or writing about product thinking.",
    photo_url: "",
    tagline: "Product clarity from chaos.",
    resume_url: "#",
  },
  social: {
    linkedin: "https://linkedin.com/in/aman",
    github: "https://github.com/aman",
    twitter: "https://x.com/aman",
    email: "aman@example.com",
  },
  seo: {
    site_title: "Aman — Product Manager",
    description: "PM portfolio — case studies, projects, and writing on product strategy, growth, and AI.",
    og_image_url: "",
  },
  contact: {
    email: "aman@example.com",
    calendly_url: "https://calendly.com/aman",
    availability_note: "Open to full-time PM roles and advisory work.",
    available: true,
  },
};

// ─── Case Studies ─────────────────────────────────────────────────────────────

export const MOCK_CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-1",
    slug: "onboarding-drop-off",
    title: "Cutting B2B Onboarding Drop-off by 42%",
    subtitle: "How a cross-functional sprint rebuilt the activation funnel for a 10k-seat enterprise SaaS.",
    cover_image_url: null,
    tags: ["Growth", "Onboarding", "B2B", "Enterprise"],
    status: "published",
    published_at: "2024-09-15T00:00:00Z",
    featured: true,
    meta_description: "A deep-dive into rebuilding a broken activation funnel that was costing $2M ARR per year.",
    created_at: "2024-09-01T00:00:00Z",
    updated_at: "2024-09-15T00:00:00Z",
    blocks: [
      richText(`<h2 id="the-problem">The Problem</h2><p>Our enterprise onboarding flow had a 68% drop-off before users reached the first "aha moment" — the moment they connected their first integration. Churned accounts in the first 90 days were costing us ~$2M ARR annually.</p><h2 id="discovery">Discovery</h2><p>I ran 34 user interviews over 3 weeks, shadowing new users through setup. The core insight: users were overwhelmed by a 14-step setup wizard that asked for information they didn't yet have.</p>`),
      metricBlock([
        { label: "Drop-off reduction", value: "42%", delta: "+42%" },
        { label: "Time-to-first-value", value: "8 min", delta: "-61%" },
        { label: "ARR recovered", value: "$840k", delta: "+$840k" },
        { label: "CSAT score", value: "4.7/5", delta: "+0.9" },
      ]),
      callout("Key Insight", "Users weren't failing because the product was hard — they were failing because we asked for enterprise SSO credentials before they'd seen any value. Flipping the order of steps unlocked everything.", "success"),
      richText(`<h2 id="solution">The Solution</h2><p>We redesigned the onboarding as a progressive disclosure flow: show value first, ask for setup later. The new flow had 4 steps to first integration (down from 14), with deferred enterprise config.</p><h2 id="outcome">Outcome</h2><p>After a 6-week A/B test on 4,200 new accounts, the redesigned flow showed 42% improvement in activation rate and a 61% reduction in time-to-first-value.</p>`),
    ],
  },
  {
    id: "cs-2",
    slug: "ai-search-redesign",
    title: "AI-Powered Search: 3× Engagement in 90 Days",
    subtitle: "Replacing a keyword search with semantic AI search across a 2M-document knowledge base.",
    cover_image_url: null,
    tags: ["AI", "Search", "NLP", "Growth"],
    status: "published",
    published_at: "2024-06-10T00:00:00Z",
    featured: true,
    meta_description: "How we built and shipped semantic AI search to 60k daily active users in 12 weeks.",
    created_at: "2024-06-01T00:00:00Z",
    updated_at: "2024-06-10T00:00:00Z",
    blocks: [
      richText(`<h2 id="context">Context</h2><p>Our internal knowledge base had 2M+ documents. The legacy keyword search returned irrelevant results 40% of the time. Users were abandoning search and going to Slack to ask colleagues — a massive knowledge-sharing failure.</p><h2 id="approach">Approach</h2><p>I partnered with our ML team to evaluate embedding-based semantic search. We ran a 3-week prototype with 50 power users before committing to a full rebuild.</p>`),
      metricBlock([
        { label: "Search success rate", value: "87%", delta: "+47%" },
        { label: "Avg. sessions/user/day", value: "6.2", delta: "+3×" },
        { label: "Support tickets (search)", value: "-65%", delta: "-65%" },
        { label: "NPS lift", value: "+18pts", delta: "+18" },
      ]),
      richText(`<h2 id="tradeoffs">Key Tradeoffs</h2><p>The hardest call was whether to build on GPT-4 embeddings (better accuracy, higher cost) or a fine-tuned open-source model (cheaper, 2 months more dev time). We chose GPT-4 with aggressive caching — resulting in $0.0003 per query at scale.</p><h2 id="lessons">Lessons</h2><p>Ship prototypes to power users, not average users. Our early adopters found 11 critical edge cases we'd have missed in QA.</p>`),
    ],
  },
  {
    id: "cs-3",
    slug: "mobile-retention",
    title: "Mobile Retention Overhaul: D30 from 12% to 31%",
    subtitle: "Diagnosing and fixing silent churn in a fintech mobile app through behavioral cohort analysis.",
    cover_image_url: null,
    tags: ["Mobile", "Retention", "Fintech", "Analytics"],
    status: "published",
    published_at: "2024-03-20T00:00:00Z",
    featured: false,
    meta_description: "A retention deep-dive that turned a 12% D30 retention into 31% using cohort segmentation and targeted interventions.",
    created_at: "2024-03-01T00:00:00Z",
    updated_at: "2024-03-20T00:00:00Z",
    blocks: [
      richText(`<h2 id="situation">Situation</h2><p>Day-30 retention was 12% — well below the 25% industry benchmark for fintech apps. The team had tried push notifications and in-app tips with no measurable improvement.</p>`),
      metricBlock([
        { label: "D30 retention", value: "31%", delta: "+19pts" },
        { label: "D7 retention", value: "54%", delta: "+12pts" },
        { label: "Monthly active users", value: "+38%" },
        { label: "Avg. transactions/user", value: "4.1", delta: "+2.3" },
      ]),
    ],
  },
  {
    id: "cs-4",
    slug: "checkout-optimisation",
    title: "Checkout Redesign: +28% Conversion Rate",
    subtitle: "Eliminating friction in a 7-step checkout that was costing $1.4M in monthly cart abandonment.",
    cover_image_url: null,
    tags: ["E-commerce", "Conversion", "UX", "A/B Testing"],
    status: "published",
    published_at: "2023-11-05T00:00:00Z",
    featured: false,
    meta_description: "How removing one form field and adding a progress bar lifted checkout conversion by 28%.",
    created_at: "2023-10-20T00:00:00Z",
    updated_at: "2023-11-05T00:00:00Z",
    blocks: [
      richText(`<h2 id="the-problem">The Problem</h2><p>Cart abandonment at checkout was 74% — 8 points above industry average. Heatmaps showed users dropping at the address confirmation step, despite having already entered their address.</p>`),
      metricBlock([
        { label: "Checkout conversion", value: "+28%", delta: "+28%" },
        { label: "Monthly revenue", value: "+$390k" },
        { label: "Cart abandonment", value: "61%", delta: "-13pts" },
        { label: "Support tickets (orders)", value: "-22%" },
      ]),
    ],
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export const MOCK_PROJECTS: Project[] = [
  {
    id: "p-1",
    slug: "pm-dashboard",
    title: "PM Metrics Dashboard",
    description: "A Notion-based dashboard template for tracking product KPIs, sprint velocity, and user feedback in one place. Used by 800+ PMs.",
    cover_image_url: null,
    type: "Template",
    tags: ["Productivity", "Notion", "Analytics"],
    live_url: "#",
    github_url: null,
    status: "published",
    published_at: "2024-08-01T00:00:00Z",
    featured: true,
    created_at: "2024-07-01T00:00:00Z",
    updated_at: "2024-08-01T00:00:00Z",
    blocks: [
      richText(`<h2 id="about">About</h2><p>Built out of frustration with juggling 6 different tools for product metrics. This Notion template consolidates KPIs, sprint tracking, user feedback, and roadmap in a single workspace. Shared on ProductHunt and Twitter — reached 800+ downloads in the first month.</p><h2 id="features">Features</h2><ul><li>Weekly KPI tracking with automated variance alerts</li><li>Sprint retrospective templates</li><li>User interview synthesis board</li><li>OKR alignment matrix</li></ul>`),
    ],
  },
  {
    id: "p-2",
    slug: "interview-prep-tracker",
    title: "PM Interview Prep Tracker",
    description: "Open-source tool for structured PM interview preparation. Covers product design, metrics, strategy, and behavioral questions with spaced repetition.",
    cover_image_url: null,
    type: "Open Source",
    tags: ["Career", "Interviews", "Open Source"],
    live_url: "#",
    github_url: "https://github.com/aman/pm-prep",
    status: "published",
    published_at: "2024-04-15T00:00:00Z",
    featured: true,
    created_at: "2024-04-01T00:00:00Z",
    updated_at: "2024-04-15T00:00:00Z",
    blocks: [],
  },
  {
    id: "p-3",
    slug: "ai-prd-generator",
    title: "AI PRD Generator",
    description: "A Claude-powered tool that turns a one-paragraph problem statement into a structured PRD with success metrics, user stories, and edge cases.",
    cover_image_url: null,
    type: "AI Tool",
    tags: ["AI", "Writing", "PRD", "Claude"],
    live_url: "#",
    github_url: "https://github.com/aman/ai-prd",
    status: "published",
    published_at: "2024-11-20T00:00:00Z",
    featured: false,
    created_at: "2024-11-01T00:00:00Z",
    updated_at: "2024-11-20T00:00:00Z",
    blocks: [],
  },
  {
    id: "p-4",
    slug: "okr-tracker",
    title: "Lightweight OKR Tracker",
    description: "A minimal web app for tracking OKRs at the team level, with weekly check-in prompts and confidence scoring. Built in a weekend.",
    cover_image_url: null,
    type: "Side Project",
    tags: ["OKRs", "Strategy", "Next.js"],
    live_url: "#",
    github_url: "https://github.com/aman/okr-tracker",
    status: "published",
    published_at: "2023-09-10T00:00:00Z",
    featured: false,
    created_at: "2023-09-01T00:00:00Z",
    updated_at: "2023-09-10T00:00:00Z",
    blocks: [],
  },
];

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "why-product-roadmaps-fail",
    title: "Why Most Product Roadmaps Fail (And How to Fix Yours)",
    excerpt: "Roadmaps fail not because of bad prioritisation frameworks, but because they're used as commitment documents instead of communication tools.",
    cover_image_url: null,
    tags: ["Strategy", "Roadmaps", "Leadership"],
    reading_time: 7,
    status: "published",
    published_at: "2024-10-12T00:00:00Z",
    created_at: "2024-10-10T00:00:00Z",
    updated_at: "2024-10-12T00:00:00Z",
    blocks: [
      richText(`<h2 id="the-problem">The Problem With Roadmaps</h2><p>I've reviewed roadmaps at a dozen companies. They almost always have the same flaw: they're output-focused, not outcome-focused. "Build feature X in Q3" is not a strategy — it's a to-do list with deadlines.</p><p>When a roadmap becomes a contract, PMs stop updating it when evidence changes. They become attached to the work, not the outcome. This is how you ship things nobody uses.</p><h2 id="the-fix">The Fix: Outcome-Based Roadmaps</h2><p>Structure your roadmap around problems to solve, not features to ship. Instead of "Q3: Launch notification center," write "Q3: Reduce missed-action rate by 30%." The outcome stays stable even as your solution evolves.</p><h3 id="practical-template">Practical Template</h3><p>Each roadmap item should answer three questions: <strong>What problem are we solving?</strong> <strong>How will we know we solved it?</strong> <strong>What's our current best hypothesis for how to solve it?</strong></p><h2 id="stakeholder-alignment">Communicating to Stakeholders</h2><p>The hardest part isn't writing the roadmap — it's selling the shift to executives who want feature lists. Frame it as risk reduction: outcome roadmaps mean you commit to results, not the specific implementation. That's actually a stronger commitment.</p>`),
    ],
  },
  {
    id: "blog-2",
    slug: "writing-better-prds",
    title: "The PM's Guide to Writing PRDs That Engineers Actually Read",
    excerpt: "Most PRDs are either too long or too vague. Here's the format I've refined over 100+ PRDs that consistently ships on time.",
    cover_image_url: null,
    tags: ["Writing", "PRD", "Engineering", "Process"],
    reading_time: 9,
    status: "published",
    published_at: "2024-07-28T00:00:00Z",
    created_at: "2024-07-25T00:00:00Z",
    updated_at: "2024-07-28T00:00:00Z",
    blocks: [
      richText(`<h2 id="the-format">The 6-Section PRD</h2><p>After writing 100+ PRDs and watching most of them either gather dust or generate re-work, I've landed on a 6-section format that consistently ships cleanly.</p><h3 id="section-1">1. Problem Statement (2 paragraphs max)</h3><p>Who is experiencing what problem, and what's the evidence? No solution here. If you're already describing your solution in the problem statement, you haven't done enough discovery.</p><h3 id="section-2">2. Success Metrics</h3><p>Define the primary metric that moves, the guardrail metrics that must not regress, and the measurement window. Be specific: "DAU increases by 8% in the 30 days post-launch, measured in Amplitude cohort X."</p><h2 id="common-mistakes">Common Mistakes</h2><p>The most common PRD mistake is writing for yourself, not your audience. Engineers need constraints and edge cases. Designers need user context. Executives need business justification. One document, three audiences — structure it accordingly.</p>`),
    ],
  },
  {
    id: "blog-3",
    slug: "ai-tools-pm-workflow",
    title: "How I Use AI Tools in My PM Workflow (Honest Review)",
    excerpt: "I've been using Claude, ChatGPT, Perplexity, and Granola daily for 8 months. Here's what actually saved time and what was just hype.",
    cover_image_url: null,
    tags: ["AI", "Productivity", "Tools", "Workflow"],
    reading_time: 6,
    status: "published",
    published_at: "2024-12-03T00:00:00Z",
    created_at: "2024-11-28T00:00:00Z",
    updated_at: "2024-12-03T00:00:00Z",
    blocks: [
      richText(`<h2 id="tldr">TL;DR</h2><p>AI tools are genuinely useful for about 40% of my PM workflow — but mostly as a thinking partner, not an execution shortcut. The biggest gains are in synthesis, not creation.</p><h2 id="what-works">What Actually Works</h2><p><strong>User interview synthesis:</strong> Pasting 8 interview transcripts into Claude and asking for a structured summary with themes and verbatim quotes saves me 3-4 hours per discovery sprint.</p><p><strong>First-draft PRDs:</strong> I don't write PRDs from scratch anymore. I dictate the problem statement and constraints, ask Claude for a structured draft, then edit. Cuts my writing time by ~60%.</p><h2 id="what-doesnt">What Doesn't Work</h2><p>Anything that requires institutional knowledge. "Should we build X?" requires context no AI has. Prioritisation frameworks filled in by AI are confident-sounding nonsense — you still need to do the judgment work yourself.</p>`),
    ],
  },
];

// ─── Research ─────────────────────────────────────────────────────────────────

export const MOCK_RESEARCH: ResearchPiece[] = [
  {
    id: "r-1",
    slug: "b2b-saas-onboarding-2024",
    title: "State of B2B SaaS Onboarding 2024",
    subtitle: "Analysis of 40 B2B SaaS products' onboarding flows, activation benchmarks, and the tactics that move the needle.",
    cover_image_url: null,
    tags: ["B2B", "Onboarding", "Benchmarks", "SaaS"],
    status: "published",
    published_at: "2024-08-20T00:00:00Z",
    created_at: "2024-08-01T00:00:00Z",
    updated_at: "2024-08-20T00:00:00Z",
    blocks: [
      richText(`<h2 id="methodology">Methodology</h2><p>Signed up for 40 B2B SaaS products across 8 categories (CRM, project management, analytics, HR, finance, devtools, collaboration, marketing). Tracked each step of the onboarding flow, time-to-first-value, and email sequences for 30 days.</p>`),
      metricBlock([
        { label: "Products analysed", value: "40" },
        { label: "Median time-to-value", value: "23 min" },
        { label: "Avg. onboarding steps", value: "11.4" },
        { label: "Products with tooltips", value: "78%" },
      ]),
      richText(`<h2 id="findings">Key Findings</h2><p>The top 10% of onboarding flows share three patterns: they defer account configuration until after first value, they use interactive walkthroughs instead of modals, and they define "activation" as a specific action rather than just account creation.</p>`),
    ],
  },
  {
    id: "r-2",
    slug: "ai-tools-product-teams",
    title: "AI Tools Adoption Among Product Teams",
    subtitle: "Survey of 150 PMs on which AI tools they use, how often, and what impact they report on productivity.",
    cover_image_url: null,
    tags: ["AI", "Survey", "Productivity", "PMs"],
    status: "published",
    published_at: "2024-11-01T00:00:00Z",
    created_at: "2024-10-15T00:00:00Z",
    updated_at: "2024-11-01T00:00:00Z",
    blocks: [
      richText(`<h2 id="overview">Overview</h2><p>Surveyed 150 product managers across company stages (seed to public) about their AI tool usage. 94% reported using at least one AI tool weekly. ChatGPT led adoption (81%), followed by Claude (44%), Perplexity (38%), and Granola for meetings (29%).</p>`),
      metricBlock([
        { label: "Respondents", value: "150" },
        { label: "Weekly AI users", value: "94%" },
        { label: "Reported time saved", value: "4.2 hrs/wk" },
        { label: "Top use case", value: "Writing" },
      ]),
    ],
  },
  {
    id: "r-3",
    slug: "user-interview-best-practices",
    title: "User Interview Best Practices: What the Data Says",
    subtitle: "Meta-analysis of 200+ published studies and practitioner guides on user research quality and common failure modes.",
    cover_image_url: null,
    tags: ["Research", "User Interviews", "Discovery"],
    status: "published",
    published_at: "2024-05-15T00:00:00Z",
    created_at: "2024-05-01T00:00:00Z",
    updated_at: "2024-05-15T00:00:00Z",
    blocks: [
      richText(`<h2 id="finding-1">Finding 1: Sample Size Rarely Matters</h2><p>The research is unambiguous: 5-8 interviews with well-screened participants outperform 20 interviews with poorly screened ones. Screening criteria is the highest-leverage variable in user research quality.</p>`),
    ],
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────

export const MOCK_EXPERIENCE: ExperienceEntry[] = [
  {
    id: "exp-1",
    company: "Cascade HQ",
    role: "Senior Product Manager",
    description: "Leading the core activation and monetisation pod for a 60k-DAU B2B SaaS platform. Rebuilt onboarding (–42% drop-off), shipped AI-powered search (3× engagement), and grew ARR from $8M to $14M in 18 months.",
    start_date: "2023-01-01",
    end_date: null,
    is_current: true,
    tags: ["B2B SaaS", "Growth", "AI", "Onboarding"],
    logo_url: null,
    order_index: 0,
    visible: true,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "exp-2",
    company: "Pineapple Money",
    role: "Product Manager",
    description: "First PM hire at a Series A fintech. Built the savings and investment product from 0→1. Grew D30 retention from 12% to 31%. Led a team of 2 engineers and 1 designer through a complete mobile app redesign.",
    start_date: "2021-03-01",
    end_date: "2022-12-01",
    is_current: false,
    tags: ["Fintech", "Mobile", "0→1", "Retention"],
    logo_url: null,
    order_index: 1,
    visible: true,
    created_at: "2021-03-01T00:00:00Z",
  },
  {
    id: "exp-3",
    company: "Shopwise",
    role: "Associate Product Manager",
    description: "APM on the checkout and payments team. Led a checkout redesign that improved conversion by 28%. Shipped 14 experiments in 12 months. Managed relationships with 3 payment gateway partners.",
    start_date: "2019-07-01",
    end_date: "2021-02-01",
    is_current: false,
    tags: ["E-commerce", "Payments", "A/B Testing", "Conversion"],
    logo_url: null,
    order_index: 2,
    visible: true,
    created_at: "2019-07-01T00:00:00Z",
  },
  {
    id: "exp-4",
    company: "Deloitte Digital",
    role: "Business Analyst",
    description: "Digital transformation consulting for retail and financial services clients. Built business cases, ran stakeholder workshops, and wrote functional requirements for 5 large-scale system implementations.",
    start_date: "2018-07-01",
    end_date: "2019-06-01",
    is_current: false,
    tags: ["Consulting", "Digital Transformation", "Fintech", "Retail"],
    logo_url: null,
    order_index: 3,
    visible: true,
    created_at: "2018-07-01T00:00:00Z",
  },
];

// ─── Skills ───────────────────────────────────────────────────────────────────

export const MOCK_SKILLS: Record<string, Skill[]> = {
  Product: [
    { id: "s-1", name: "Product Strategy", category: "Product", icon_url: null, proficiency: 5, order_index: 0, visible: true, created_at: "2024-01-01T00:00:00Z" },
    { id: "s-2", name: "User Research", category: "Product", icon_url: null, proficiency: 5, order_index: 1, visible: true, created_at: "2024-01-01T00:00:00Z" },
    { id: "s-3", name: "Roadmapping", category: "Product", icon_url: null, proficiency: 5, order_index: 2, visible: true, created_at: "2024-01-01T00:00:00Z" },
    { id: "s-4", name: "A/B Testing", category: "Product", icon_url: null, proficiency: 4, order_index: 3, visible: true, created_at: "2024-01-01T00:00:00Z" },
    { id: "s-5", name: "Stakeholder Mgmt", category: "Product", icon_url: null, proficiency: 4, order_index: 4, visible: true, created_at: "2024-01-01T00:00:00Z" },
    { id: "s-6", name: "OKRs & Metrics", category: "Product", icon_url: null, proficiency: 5, order_index: 5, visible: true, created_at: "2024-01-01T00:00:00Z" },
  ],
  "AI Tools": [
    { id: "s-7", name: "Claude / ChatGPT", category: "AI Tools", icon_url: null, proficiency: 5, order_index: 6, visible: true, created_at: "2024-01-01T00:00:00Z" },
    { id: "s-8", name: "Cursor", category: "AI Tools", icon_url: null, proficiency: 4, order_index: 7, visible: true, created_at: "2024-01-01T00:00:00Z" },
    { id: "s-9", name: "Midjourney", category: "AI Tools", icon_url: null, proficiency: 3, order_index: 8, visible: true, created_at: "2024-01-01T00:00:00Z" },
    { id: "s-10", name: "Perplexity", category: "AI Tools", icon_url: null, proficiency: 4, order_index: 9, visible: true, created_at: "2024-01-01T00:00:00Z" },
  ],
  Technical: [
    { id: "s-11", name: "SQL", category: "Technical", icon_url: null, proficiency: 4, order_index: 10, visible: true, created_at: "2024-01-01T00:00:00Z" },
    { id: "s-12", name: "Amplitude / Mixpanel", category: "Technical", icon_url: null, proficiency: 5, order_index: 11, visible: true, created_at: "2024-01-01T00:00:00Z" },
    { id: "s-13", name: "REST APIs", category: "Technical", icon_url: null, proficiency: 3, order_index: 12, visible: true, created_at: "2024-01-01T00:00:00Z" },
    { id: "s-14", name: "Python (basics)", category: "Technical", icon_url: null, proficiency: 3, order_index: 13, visible: true, created_at: "2024-01-01T00:00:00Z" },
  ],
  Design: [
    { id: "s-15", name: "Figma", category: "Design", icon_url: null, proficiency: 4, order_index: 14, visible: true, created_at: "2024-01-01T00:00:00Z" },
    { id: "s-16", name: "Miro / FigJam", category: "Design", icon_url: null, proficiency: 5, order_index: 15, visible: true, created_at: "2024-01-01T00:00:00Z" },
    { id: "s-17", name: "Framer", category: "Design", icon_url: null, proficiency: 3, order_index: 16, visible: true, created_at: "2024-01-01T00:00:00Z" },
  ],
};

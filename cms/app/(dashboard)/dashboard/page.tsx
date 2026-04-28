import { prisma } from "@/lib/db";
import Link from "next/link";
import { BookOpen, Code2, FileText, FlaskConical } from "lucide-react";

async function getStats() {
  const [csTotal, csPub, csDraft, projTotal, projPub, projDraft, blogTotal, blogPub, blogDraft, resTotal, resPub, resDraft] =
    await Promise.all([
      prisma.case_studies.count(),
      prisma.case_studies.count({ where: { status: "published" } }),
      prisma.case_studies.count({ where: { status: "draft" } }),
      prisma.projects.count(),
      prisma.projects.count({ where: { status: "published" } }),
      prisma.projects.count({ where: { status: "draft" } }),
      prisma.blogs.count(),
      prisma.blogs.count({ where: { status: "published" } }),
      prisma.blogs.count({ where: { status: "draft" } }),
      prisma.market_research.count(),
      prisma.market_research.count({ where: { status: "published" } }),
      prisma.market_research.count({ where: { status: "draft" } }),
    ]);

  return {
    caseStudies: { total: csTotal, published: csPub, draft: csDraft },
    projects: { total: projTotal, published: projPub, draft: projDraft },
    blogs: { total: blogTotal, published: blogPub, draft: blogDraft },
    research: { total: resTotal, published: resPub, draft: resDraft },
  };
}

async function getRecentActivity() {
  const [cs, proj, blog, res] = await Promise.all([
    prisma.case_studies.findMany({ orderBy: { updated_at: "desc" }, take: 10, select: { id: true, title: true, status: true, updated_at: true } }),
    prisma.projects.findMany({ orderBy: { updated_at: "desc" }, take: 10, select: { id: true, title: true, status: true, updated_at: true } }),
    prisma.blogs.findMany({ orderBy: { updated_at: "desc" }, take: 10, select: { id: true, title: true, status: true, updated_at: true } }),
    prisma.market_research.findMany({ orderBy: { updated_at: "desc" }, take: 10, select: { id: true, title: true, status: true, updated_at: true } }),
  ]);

  const all = [
    ...cs.map((i: any) => ({ ...i, type: "Case Study", editUrl: `/dashboard/case-studies/${i.id}` })),
    ...proj.map((i: any) => ({ ...i, type: "Project", editUrl: `/dashboard/projects/${i.id}` })),
    ...blog.map((i: any) => ({ ...i, type: "Blog Post", editUrl: `/dashboard/blogs/${i.id}` })),
    ...res.map((i: any) => ({ ...i, type: "Research", editUrl: `/dashboard/research/${i.id}` })),
  ];

  return all.sort((a, b) => b.updated_at.getTime() - a.updated_at.getTime()).slice(0, 10);
}

const statusBadgeClass = (status: string) => {
  if (status === "published") return "badge-published";
  if (status === "draft") return "badge-draft";
  return "badge-archived";
};

const emptyStats = { caseStudies: { total: 0, published: 0, draft: 0 }, projects: { total: 0, published: 0, draft: 0 }, blogs: { total: 0, published: 0, draft: 0 }, research: { total: 0, published: 0, draft: 0 } };

type Stats = typeof emptyStats;
type ActivityItem = Awaited<ReturnType<typeof getRecentActivity>>[number];

export default async function DashboardPage() {
  const dbReady = !!(process.env.DATABASE_URL);
  let stats: Stats = emptyStats;
  let activity: ActivityItem[] = [];
  if (dbReady) {
    try { [stats, activity] = await Promise.all([getStats(), getRecentActivity()]); } catch {}
  }

  const statCards = [
    { label: "Case Studies", icon: <BookOpen size={18} />, href: "/dashboard/case-studies", ...stats.caseStudies },
    { label: "Projects", icon: <Code2 size={18} />, href: "/dashboard/projects", ...stats.projects },
    { label: "Blog Posts", icon: <FileText size={18} />, href: "/dashboard/blogs", ...stats.blogs },
    { label: "Research", icon: <FlaskConical size={18} />, href: "/dashboard/research", ...stats.research },
  ];

  const quickAdd = [
    { label: "+ New Case Study", href: "/dashboard/case-studies/new" },
    { label: "+ New Blog Post", href: "/dashboard/blogs/new" },
    { label: "+ New Project", href: "/dashboard/projects/new" },
    { label: "+ New Research", href: "/dashboard/research/new" },
  ];

  return (
    <div style={{ padding: "40px", maxWidth: "1000px" }}>
      {!dbReady && (
        <div style={{ background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.3)", borderRadius: "12px", padding: "20px 24px", marginBottom: "32px" }}>
          <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "15px", color: "var(--accent-amber)", marginBottom: "10px" }}>
            Database not configured
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "12px" }}>
            Add your Supabase connection strings to <code style={{ fontFamily: "var(--font-jetbrains-mono)", background: "var(--bg-elevated)", padding: "2px 6px", borderRadius: "4px" }}>cms/.env.local</code>:
          </p>
          <pre style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "12px", color: "var(--accent-teal)", background: "var(--bg-elevated)", padding: "12px 16px", borderRadius: "8px", lineHeight: 1.7, overflowX: "auto" }}>
{`DATABASE_URL=postgresql://postgres.XXXX:PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.XXXX:PASSWORD@aws-0-REGION.pooler.supabase.com:5432/postgres`}
          </pre>
          <p style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "10px" }}>
            Get these from: Supabase Dashboard → Your Project → Project Settings → Database → Connection string (select &quot;URI&quot; mode, enable &quot;Display connection pooler&quot;).
            Then run <code style={{ fontFamily: "var(--font-jetbrains-mono)", background: "var(--bg-elevated)", padding: "2px 6px", borderRadius: "4px" }}>npx prisma db push</code> in the cms folder.
          </p>
        </div>
      )}

      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "28px", color: "var(--text-primary)" }}>
          Dashboard
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>
          Overview of all your content
        </p>
      </div>

      {/* Quick add */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
        {quickAdd.map((q) => (
          <Link key={q.href} href={q.href} className="btn-ghost" style={{ fontSize: "13px", padding: "8px 16px" }}>
            {q.label}
          </Link>
        ))}
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "40px" }}>
        {statCards.map((card) => (
          <Link key={card.label} href={card.href} style={{ textDecoration: "none" }}>
            <div className="card" style={{ cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span style={{ color: "var(--text-tertiary)" }}>{card.icon}</span>
                <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {card.label}
                </span>
              </div>
              <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "36px", color: "var(--text-primary)" }}>
                {card.total}
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <span style={{ fontSize: "12px", color: "var(--accent-green)" }}>{card.published} published</span>
                <span style={{ fontSize: "12px", color: "var(--accent-amber)" }}>{card.draft} draft</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <div>
        <h2 style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 600, fontSize: "16px", color: "var(--text-primary)", marginBottom: "16px" }}>
          Recent Activity
        </h2>
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--bg-border)" }}>
                {["Title", "Type", "Status", "Last Updated", ""].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 400 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activity.map((item) => (
                <tr key={`${item.type}-${item.id}`} style={{ borderBottom: "1px solid var(--bg-border)" }}>
                  <td style={{ padding: "12px 16px", fontSize: "14px", color: "var(--text-primary)", maxWidth: "280px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.title}
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "var(--text-secondary)" }}>{item.type}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span className={statusBadgeClass(item.status)}>{item.status}</span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "var(--text-tertiary)" }}>
                    {new Date(item.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <Link href={item.editUrl} style={{ fontSize: "13px", color: "var(--accent)", textDecoration: "none" }}>
                      Edit →
                    </Link>
                  </td>
                </tr>
              ))}
              {activity.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: "32px 16px", textAlign: "center", color: "var(--text-tertiary)", fontSize: "14px" }}>
                    No content yet. Create your first piece above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

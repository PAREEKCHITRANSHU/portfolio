"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  FileText,
  FlaskConical,
  Briefcase,
  Wrench,
  Settings,
  LogOut,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
  { href: "/dashboard/case-studies", label: "Case Studies", icon: <BookOpen size={16} /> },
  { href: "/dashboard/projects", label: "Projects", icon: <Code2 size={16} /> },
  { href: "/dashboard/blogs", label: "Blog Posts", icon: <FileText size={16} /> },
  { href: "/dashboard/research", label: "Research", icon: <FlaskConical size={16} /> },
  { href: "/dashboard/experience", label: "Experience", icon: <Briefcase size={16} /> },
  { href: "/dashboard/skills", label: "Skills", icon: <Wrench size={16} /> },
  { href: "/dashboard/site-config", label: "Site Config", icon: <Settings size={16} /> },
];

export function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "240px",
        height: "100vh",
        background: "var(--bg-surface)",
        borderRight: "1px solid var(--bg-border)",
        display: "flex",
        flexDirection: "column",
        padding: "24px 0",
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div style={{ padding: "0 20px 24px", borderBottom: "1px solid var(--bg-border)" }}>
        <span
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 700,
            fontSize: "18px",
            color: "var(--text-primary)",
          }}
        >
          Aman<span style={{ color: "var(--accent)" }}>.</span>
        </span>
        <div
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "10px",
            color: "var(--text-tertiary)",
            marginTop: "4px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          CMS
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 8px", overflowY: "auto" }}>
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 12px",
                borderRadius: "8px",
                marginBottom: "2px",
                fontSize: "14px",
                fontFamily: "var(--font-dm-sans)",
                fontWeight: active ? 500 : 400,
                color: active ? "var(--text-primary)" : "var(--text-secondary)",
                background: active ? "rgba(123,110,246,0.1)" : "transparent",
                textDecoration: "none",
                transition: "all 150ms",
              }}
            >
              <span style={{ color: active ? "var(--accent)" : "var(--text-tertiary)" }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div style={{ padding: "16px 8px", borderTop: "1px solid var(--bg-border)" }}>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "9px 12px",
            borderRadius: "8px",
            width: "100%",
            fontSize: "14px",
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 400,
            color: "var(--text-secondary)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            transition: "all 150ms",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
            (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-elevated)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          }}
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}

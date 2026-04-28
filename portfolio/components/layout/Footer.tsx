"use client";

import Link from "next/link";
import { Linkedin, Github } from "lucide-react";
import type { SiteConfigSocial } from "@/lib/types";

interface FooterProps {
  social?: SiteConfigSocial;
  tagline?: string;
}

const PAGE_LINKS = [
  { href: "/case-studies", label: "Work" },
  { href: "/blog", label: "Writing" },
  { href: "/research", label: "Research" },
  { href: "/contact", label: "Contact" },
];

export function Footer({ social, tagline }: FooterProps) {
  return (
    <footer style={{ background: "var(--bg-base)", borderTop: "1px solid var(--bg-border)", padding: "64px 0 40px" }}>
      <div className="container-max">
        {/* Row 1 */}
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "40px", marginBottom: "40px" }}>
          {/* Left */}
          <div>
            <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "20px", color: "var(--text-primary)", marginBottom: "8px" }}>
              Aman<span style={{ color: "var(--accent)" }}>.</span>
            </div>
            {tagline && <p style={{ fontSize: "14px", fontWeight: 300, color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "16px" }}>{tagline}</p>}
            <p style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>Based in Jaipur, India</p>
          </div>

          {/* Center */}
          <div>
            <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>Pages</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {PAGE_LINKS.map((link) => (
                <Link key={link.href} href={link.href}
                  style={{ fontSize: "12px", fontFamily: "var(--font-dm-sans)", color: "var(--text-secondary)", textDecoration: "none", lineHeight: "2.2", transition: "color 150ms" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)"; }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right */}
          <div>
            <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>Find Me On</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {social?.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", transition: "color 150ms" }}>
                  <Linkedin size={16} /> LinkedIn
                </a>
              )}
              {social?.github && (
                <a href={social.github} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", transition: "color 150ms" }}>
                  <Github size={16} /> GitHub
                </a>
              )}
              {social?.email && (
                <a href={`mailto:${social.email}`}
                  style={{ fontSize: "13px", color: "var(--accent)", textDecoration: "none" }}>
                  {social.email}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--bg-border)", paddingTop: "24px" }}>
          <span style={{ fontSize: "12px", fontWeight: 300, color: "var(--text-tertiary)" }}>© {new Date().getFullYear()} Aman.</span>
          <span style={{ fontSize: "12px", fontWeight: 300, color: "var(--text-tertiary)" }}>Designed and built with intention.</span>
        </div>
      </div>
    </footer>
  );
}

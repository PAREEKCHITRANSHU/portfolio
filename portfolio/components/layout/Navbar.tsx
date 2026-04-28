"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Linkedin, Github, Mail } from "lucide-react";
import type { SiteConfigContact, SiteConfigSocial } from "@/lib/types";

interface NavbarProps {
  contact?: SiteConfigContact;
  social?: SiteConfigSocial;
}

const NAV_LINKS = [
  { href: "/case-studies", label: "Work" },
  { href: "/blog",         label: "Writing" },
  { href: "/contact",      label: "Contact" },
];

export function Navbar({ contact, social }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled]     = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 64); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setDrawerOpen(false); }, [pathname]);

  const showAvailability = contact?.available !== false;

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "64px", zIndex: 100,
        transition: "background 300ms var(--ease-smooth), border-color 300ms, box-shadow 300ms",
        background: scrolled ? "rgba(250,248,245,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(160%)" : "none",
        borderBottom: scrolled ? "1px solid var(--bg-border)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.04)" : "none",
      }}>
        <div className="container-max" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "18px", color: "var(--text-primary)", textDecoration: "none" }}>
            Aman<span style={{ color: "var(--accent)" }}>.</span>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden-mobile">
            {NAV_LINKS.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link key={link.href} href={link.href} style={{ position: "relative", fontSize: "14px", fontFamily: "var(--font-dm-sans)", color: active ? "var(--text-primary)" : "var(--text-secondary)", textDecoration: "none", transition: "color 150ms", paddingBottom: "2px", fontWeight: active ? 500 : 400 }}>
                  {link.label}
                  {active && (
                    <span style={{ position: "absolute", bottom: "-4px", left: "50%", transform: "translateX(-50%)", width: "6px", height: "2px", background: "var(--accent)", borderRadius: "9999px" }} />
                  )}
                </Link>
              );
            })}

            <div style={{ width: "1px", height: "16px", background: "var(--bg-border)" }} />

            {showAvailability && (
              <div style={{ display: "flex", alignItems: "center", gap: "7px", background: "rgba(46,139,87,0.08)", border: "1px solid rgba(46,139,87,0.18)", borderRadius: "9999px", padding: "4px 12px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent-green)", animation: "pulse-dot 2s ease-in-out infinite", flexShrink: 0 }} />
                <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-dm-sans)" }}>Open to work</span>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button type="button" onClick={() => setDrawerOpen(true)}
            style={{ background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer", display: "none", padding: "4px" }}
            className="show-mobile" aria-label="Open menu">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {drawerOpen && (
        <div onClick={() => setDrawerOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(28,23,20,0.4)", zIndex: 199, animation: "fadeIn 200ms ease" }} />
      )}

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, height: "100vh", width: "280px",
        background: "var(--bg-base)", borderLeft: "1px solid var(--bg-border)",
        padding: "24px", zIndex: 200,
        transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 300ms var(--ease-smooth)",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <span style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "18px", color: "var(--text-primary)" }}>
            Aman<span style={{ color: "var(--accent)" }}>.</span>
          </span>
          <button type="button" onClick={() => setDrawerOpen(false)}
            style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer" }} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <div style={{ height: "1px", background: "var(--bg-border)", marginBottom: "16px" }} />

        <nav style={{ flex: 1 }}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              style={{ display: "flex", alignItems: "center", height: "56px", fontSize: "20px", fontFamily: "var(--font-dm-sans)", fontWeight: pathname.startsWith(link.href) ? 500 : 400, color: pathname.startsWith(link.href) ? "var(--text-primary)" : "var(--text-secondary)", textDecoration: "none", borderBottom: "1px solid var(--bg-border)" }}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", gap: "20px", marginTop: "24px" }}>
          {social?.linkedin && <a href={social.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)" }}><Linkedin size={20} /></a>}
          {social?.github   && <a href={social.github}   target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)" }}><Github size={20} /></a>}
          {social?.email    && <a href={`mailto:${social.email}`} style={{ color: "var(--text-secondary)" }}><Mail size={20} /></a>}
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.4); opacity: 0.4; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } .hidden-mobile { display: flex !important; } }
      `}</style>
    </>
  );
}

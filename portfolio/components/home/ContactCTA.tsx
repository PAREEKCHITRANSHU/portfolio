"use client";

import Link from "next/link";
import { AnimateIn } from "@/components/motion/AnimateIn";
import { Github, Linkedin, Mail } from "lucide-react";
import type { SiteConfig } from "@/lib/types";

export function ContactCTA({ config }: { config: SiteConfig }) {
  const contact = config.contact;
  const social  = config.social;

  return (
    <section style={{ padding: "96px 0 80px", background: "var(--bg-subtle)", borderTop: "1px solid var(--bg-border)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse, rgba(28,61,110,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container-max" style={{ textAlign: "center", position: "relative" }}>
        <AnimateIn>
          <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "16px" }}>
            06
          </div>
          <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(32px, 5vw, 52px)", color: "var(--text-primary)", marginBottom: "16px", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Worth a conversation?
          </h2>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "18px", color: "var(--text-secondary)", maxWidth: "460px", margin: "0 auto 40px", lineHeight: 1.7 }}>
            Available for PM and AI PM roles. Based in Jaipur, open to remote.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "36px" }}>
            {contact?.email && (
              <a href={`mailto:${contact.email}`} className="btn-primary">Send an email</a>
            )}
            {contact?.calendly_url && (
              <a href={contact.calendly_url} target="_blank" rel="noopener noreferrer" className="btn-ghost">Book a call</a>
            )}
            {!contact?.email && !contact?.calendly_url && (
              <Link href="/contact" className="btn-primary">Get in touch</Link>
            )}
          </div>

          <div style={{ display: "flex", gap: "24px", justifyContent: "center" }}>
            {social?.github && (
              <a href={social.github} target="_blank" rel="noopener noreferrer"
                style={{ color: "var(--text-tertiary)", transition: "color 200ms, transform 200ms", display: "inline-flex" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--accent)"; el.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--text-tertiary)"; el.style.transform = ""; }}>
                <Github size={20} />
              </a>
            )}
            {social?.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer"
                style={{ color: "var(--text-tertiary)", transition: "color 200ms, transform 200ms", display: "inline-flex" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--accent)"; el.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--text-tertiary)"; el.style.transform = ""; }}>
                <Linkedin size={20} />
              </a>
            )}
            {contact?.email && (
              <a href={`mailto:${contact.email}`}
                style={{ color: "var(--text-tertiary)", transition: "color 200ms, transform 200ms", display: "inline-flex" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--accent)"; el.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--text-tertiary)"; el.style.transform = ""; }}>
                <Mail size={20} />
              </a>
            )}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

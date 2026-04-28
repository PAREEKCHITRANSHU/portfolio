"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeroNetwork } from "./HeroNetwork";
import { Linkedin, Github } from "lucide-react";
import type { SiteConfig } from "@/lib/types";

const fadeUp = (delay = 0, y = 18) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
});

export function HeroSection({ config }: { config: SiteConfig }) {
  const hero    = config.hero;
  const about   = config.about;
  const contact = config.contact;
  const social  = config.social;

  return (
    <section style={{ minHeight: "100vh", position: "relative", overflow: "hidden", background: "var(--bg-base)", display: "flex", alignItems: "center" }}>

      {/* Background layers */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        {/* Soft warm glow behind text */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 18% 52%, rgba(28,61,110,0.05) 0%, transparent 58%), radial-gradient(ellipse at 82% 18%, rgba(45,106,79,0.04) 0%, transparent 48%)" }} />
        {/* Fade at bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "180px", background: "linear-gradient(to bottom, transparent, var(--bg-base))" }} />
        {/* Network — occupies right 65% */}
        <div style={{ position: "absolute", right: "-5%", top: 0, width: "68%", height: "100%", opacity: 0.9 }}>
          <HeroNetwork />
        </div>
      </div>

      {/* Content */}
      <div className="container-max" style={{ position: "relative", zIndex: 1, paddingTop: "80px", paddingBottom: "80px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "48px" }}>

        {/* Left: text */}
        <div style={{ maxWidth: "620px", flex: "0 1 auto" }}>

          {/* Eyebrow */}
          <motion.div {...fadeUp(0.1)} style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", color: "var(--accent-teal)", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "28px" }}>
            Product Manager · AI Tools · Jaipur, IN
          </motion.div>

          {/* Headline */}
          <motion.h1 {...fadeUp(0.2, 24)} style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(38px, 5vw, 68px)", lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: "24px" }}>
            <span style={{ color: "var(--text-primary)", display: "block" }}>
              {hero?.headline_1 ?? "Building products"}
            </span>
            <span style={{ display: "block", color: "var(--accent)" }}>
              {hero?.headline_2 ?? "that make sense."}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p {...fadeUp(0.35)} style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "clamp(16px, 1.5vw, 19px)", color: "var(--text-secondary)", maxWidth: "490px", lineHeight: 1.7, marginBottom: "40px" }}>
            {hero?.subheadline ?? "I turn complex problems into clear product decisions — focused on growth, clarity, and shipping things that matter."}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.5)} style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href={hero?.cta_url ?? "/#proof"} className="btn-primary">
              {hero?.cta_label ?? "See my work"}
            </Link>
            {about?.resume_url ? (
              <a href={about.resume_url} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Download Resume
              </a>
            ) : (
              <Link href="/contact" className="btn-ghost">Get in touch</Link>
            )}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div {...fadeUp(0.85)} style={{ marginTop: "60px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "1px", height: "44px", background: "var(--bg-border)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", width: "100%", height: "38%", background: "var(--accent)", animation: "scroll-dot 2s ease-in-out infinite" }} />
            </div>
            <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-tertiary)", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>scroll</span>
          </motion.div>
        </div>

        {/* Right: status card — desktop only */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="hero-status-card"
          style={{ width: "210px", flexShrink: 0, background: "rgba(250,248,245,0.97)", backdropFilter: "blur(12px)", border: "1px solid var(--bg-border)", borderRadius: "12px", padding: "20px", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", transition: "border-color 300ms, box-shadow 300ms" }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(28,61,110,0.35)"; el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--bg-border)"; el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.07)"; }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent-green)", flexShrink: 0, animation: "pulse-dot 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500, fontSize: "13px", color: "var(--text-primary)" }}>
              {contact?.available ? "Available for roles" : "Not available"}
            </span>
          </div>
          <div style={{ height: "1px", background: "var(--bg-border)", marginBottom: "14px" }} />

          {[
            { label: "CURRENTLY",  value: "Product Lead" },
            { label: "TARGETING",  value: "PM / AI PM Roles" },
            { label: "EXPERIENCE", value: "1.5 Years" },
          ].map(({ label, value }) => (
            <div key={label} style={{ marginBottom: "12px" }}>
              <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--text-tertiary)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>{label}</div>
              <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "var(--text-secondary)" }}>{value}</div>
            </div>
          ))}

          <div style={{ height: "1px", background: "var(--bg-border)", marginBottom: "12px" }} />
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            {social?.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--text-secondary)", textDecoration: "none", transition: "color 150ms" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}>
                <Linkedin size={13} /> LinkedIn
              </a>
            )}
            {social?.github && (
              <a href={social.github} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--text-secondary)", textDecoration: "none", transition: "color 150ms" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}>
                <Github size={13} /> GitHub
              </a>
            )}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes scroll-dot { 0% { top: -40%; } 100% { top: 140%; } }
        @keyframes pulse-dot  { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.4); opacity: 0.4; } }
        @media (max-width: 1024px) { .hero-status-card { display: none !important; } }
      `}</style>
    </section>
  );
}

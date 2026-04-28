"use client";

import { useState, useEffect } from "react";
import { ImageUpload } from "../../components/forms/ImageUpload";
import { ExternalLink } from "lucide-react";

interface SiteConfigMap {
  hero?: { headline_1: string; headline_2: string; subheadline: string; cta_label: string; cta_url: string };
  about?: { bio: string; photo_url: string; tagline: string; resume_url: string };
  social?: { linkedin: string; github: string; twitter: string; email: string };
  seo?: { site_title: string; description: string; og_image_url: string };
  contact?: { email: string; calendly_url: string; availability_note: string; available: boolean };
}

const TABS = ["Hero", "About", "Social & Contact", "SEO"] as const;
type Tab = typeof TABS[number];

function Field({ label, value, onChange, maxLength, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; maxLength?: number; placeholder?: string; type?: string }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <label style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{label}</label>
        {maxLength && <span style={{ fontSize: "11px", color: value.length > maxLength * 0.9 ? "var(--accent-amber)" : "var(--text-tertiary)" }}>{value.length}/{maxLength}</span>}
      </div>
      {type === "textarea" ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} maxLength={maxLength} rows={4} className="input-field" style={{ resize: "vertical" }} placeholder={placeholder} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} maxLength={maxLength} className="input-field" placeholder={placeholder} />
      )}
    </div>
  );
}

export default function SiteConfigPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Hero");
  const [config, setConfig] = useState<SiteConfigMap>({});
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    fetch("/api/site-config").then((r) => r.json()).then((json) => {
      setConfig(json.data ?? {});
    });
  }, []);

  async function save(key: string, value: unknown) {
    setSaving(true);
    await fetch(`/api/site-config/${key}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });
    setSaving(false);
    setSaveMsg("Saved");
    setTimeout(() => setSaveMsg(""), 2000);
  }

  const hero = config.hero ?? { headline_1: "", headline_2: "", subheadline: "", cta_label: "", cta_url: "" };
  const about = config.about ?? { bio: "", photo_url: "", tagline: "", resume_url: "" };
  const social = config.social ?? { linkedin: "", github: "", twitter: "", email: "" };
  const seo = config.seo ?? { site_title: "", description: "", og_image_url: "" };
  const contact = config.contact ?? { email: "", calendly_url: "", availability_note: "", available: true };

  function upHero(f: Partial<typeof hero>) { setConfig((c) => ({ ...c, hero: { ...hero, ...f } })); }
  function upAbout(f: Partial<typeof about>) { setConfig((c) => ({ ...c, about: { ...about, ...f } })); }
  function upSocial(f: Partial<typeof social>) { setConfig((c) => ({ ...c, social: { ...social, ...f } })); }
  function upSeo(f: Partial<typeof seo>) { setConfig((c) => ({ ...c, seo: { ...seo, ...f } })); }
  function upContact(f: Partial<typeof contact>) { setConfig((c) => ({ ...c, contact: { ...contact, ...f } })); }

  const portfolioUrl = process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? "https://aman.dev";

  return (
    <div style={{ padding: "40px", maxWidth: "680px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "24px", color: "var(--text-primary)" }}>Site Config</h1>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {saveMsg && <span style={{ fontSize: "13px", color: "var(--accent-green)" }}>{saveMsg}</span>}
          <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "var(--text-tertiary)", textDecoration: "none" }}>
            <ExternalLink size={13} /> Preview portfolio
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", background: "var(--bg-elevated)", borderRadius: "8px", padding: "3px", marginBottom: "28px" }}>
        {TABS.map((tab) => (
          <button key={tab} type="button" onClick={() => setActiveTab(tab)}
            style={{ flex: 1, padding: "7px 12px", borderRadius: "6px", border: "none", fontSize: "13px", cursor: "pointer", background: activeTab === tab ? "var(--bg-surface)" : "transparent", color: activeTab === tab ? "var(--text-primary)" : "var(--text-secondary)", fontFamily: "var(--font-dm-sans)", transition: "all 150ms" }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Hero */}
      {activeTab === "Hero" && (
        <div>
          <Field label="Headline Line 1" value={hero.headline_1} onChange={(v) => upHero({ headline_1: v })} maxLength={40} placeholder="Building products" />
          <Field label="Headline Line 2" value={hero.headline_2} onChange={(v) => upHero({ headline_2: v })} maxLength={40} placeholder="that make sense." />
          <Field label="Subheadline" value={hero.subheadline} onChange={(v) => upHero({ subheadline: v })} maxLength={120} placeholder="One sentence about what you do" />
          <Field label="CTA Label" value={hero.cta_label} onChange={(v) => upHero({ cta_label: v })} maxLength={20} placeholder="See my work" />
          <Field label="CTA URL" value={hero.cta_url} onChange={(v) => upHero({ cta_url: v })} placeholder="https://..." />
          <button type="button" onClick={() => save("hero", hero)} disabled={saving} className="btn-primary" style={{ marginTop: "8px" }}>{saving ? "Saving…" : "Save Hero"}</button>
        </div>
      )}

      {/* About */}
      {activeTab === "About" && (
        <div>
          <Field label="Bio" value={about.bio} onChange={(v) => upAbout({ bio: v })} maxLength={600} type="textarea" placeholder="3-4 sentences about yourself…" />
          <ImageUpload value={about.photo_url} onChange={(url) => upAbout({ photo_url: url })} label="Photo" />
          <Field label="Tagline" value={about.tagline} onChange={(v) => upAbout({ tagline: v })} maxLength={60} placeholder="Short phrase" />
          <Field label="Resume URL" value={about.resume_url} onChange={(v) => upAbout({ resume_url: v })} placeholder="https://..." />
          <button type="button" onClick={() => save("about", about)} disabled={saving} className="btn-primary" style={{ marginTop: "8px" }}>{saving ? "Saving…" : "Save About"}</button>
        </div>
      )}

      {/* Social & Contact */}
      {activeTab === "Social & Contact" && (
        <div>
          <div style={{ marginBottom: "24px" }}>
            <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>Social Links</div>
            <Field label="LinkedIn URL" value={social.linkedin} onChange={(v) => upSocial({ linkedin: v })} placeholder="https://linkedin.com/in/..." />
            <Field label="GitHub URL" value={social.github} onChange={(v) => upSocial({ github: v })} placeholder="https://github.com/..." />
            <Field label="Twitter/X URL" value={social.twitter} onChange={(v) => upSocial({ twitter: v })} placeholder="https://x.com/..." />
            <Field label="Email Address" value={social.email} onChange={(v) => upSocial({ email: v })} placeholder="you@example.com" type="email" />
            <button type="button" onClick={() => save("social", social)} disabled={saving} className="btn-primary">{saving ? "Saving…" : "Save Social"}</button>
          </div>

          <div style={{ marginTop: "32px" }}>
            <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>Contact Page</div>
            <Field label="Contact Email" value={contact.email} onChange={(v) => upContact({ email: v })} type="email" />
            <Field label="Calendly URL (optional)" value={contact.calendly_url} onChange={(v) => upContact({ calendly_url: v })} placeholder="https://calendly.com/..." />
            <Field label="Availability Note" value={contact.availability_note} onChange={(v) => upContact({ availability_note: v })} placeholder="Available for PM roles…" />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--bg-border)", marginBottom: "16px" }}>
              <div>
                <div style={{ fontSize: "14px", color: "var(--text-primary)" }}>Available for Roles</div>
                <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>Shows green "Open to work" indicator</div>
              </div>
              <button type="button" onClick={() => upContact({ available: !contact.available })}
                style={{ width: "40px", height: "22px", borderRadius: "9999px", border: "none", cursor: "pointer", background: contact.available ? "var(--accent)" : "var(--bg-elevated)", position: "relative", transition: "background 150ms" }}>
                <span style={{ position: "absolute", top: "3px", left: contact.available ? "21px" : "3px", width: "16px", height: "16px", borderRadius: "9999px", background: "white", transition: "left 150ms" }} />
              </button>
            </div>
            <button type="button" onClick={() => save("contact", contact)} disabled={saving} className="btn-primary">{saving ? "Saving…" : "Save Contact"}</button>
          </div>
        </div>
      )}

      {/* SEO */}
      {activeTab === "SEO" && (
        <div>
          <Field label="Site Title" value={seo.site_title} onChange={(v) => upSeo({ site_title: v })} placeholder="Aman — PM Portfolio" />
          <Field label="Default Description" value={seo.description} onChange={(v) => upSeo({ description: v })} maxLength={160} type="textarea" placeholder="Default meta description for pages without one" />
          <ImageUpload value={seo.og_image_url} onChange={(url) => upSeo({ og_image_url: url })} label="OG Image (1200×630px recommended)" />
          <button type="button" onClick={() => save("seo", seo)} disabled={saving} className="btn-primary" style={{ marginTop: "8px" }}>{saving ? "Saving…" : "Save SEO"}</button>
        </div>
      )}
    </div>
  );
}

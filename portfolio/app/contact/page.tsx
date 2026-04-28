import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageHeader } from "@/components/ui/PageHeader";
import { getSiteConfig } from "@/lib/api";

export const metadata: Metadata = { title: "Contact", description: "Get in touch." };

export default async function ContactPage() {
  const config = await getSiteConfig();
  const contact = config.contact;
  const social = config.social;

  return (
    <PageWrapper config={config}>
      <div className="container-max" style={{ padding: "0 24px" }}>
        <PageHeader eyebrow="Contact" title="Let's talk" description="Whether it's a project, opportunity, or just a conversation — I'm happy to connect." />
      </div>

      <div className="container-max" style={{ padding: "0 24px 96px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", maxWidth: "900px" }}>
          {/* Contact options */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {contact?.email && (
              <a href={`mailto:${contact.email}`} className="contact-card contact-card-purple" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px 24px", background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: "16px", textDecoration: "none", transition: "border-color 200ms, box-shadow 200ms" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(28,61,110,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                  ✉️
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500, fontSize: "15px", color: "var(--text-primary)", marginBottom: "2px" }}>Email</div>
                  <div style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>{contact.email}</div>
                </div>
              </a>
            )}

            {contact?.calendly_url && (
              <a href={contact.calendly_url} target="_blank" rel="noopener noreferrer" className="contact-card contact-card-teal" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px 24px", background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: "16px", textDecoration: "none", transition: "border-color 200ms, box-shadow 200ms" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(45,106,79,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                  📅
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500, fontSize: "15px", color: "var(--text-primary)", marginBottom: "2px" }}>Book a call</div>
                  <div style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>30-min intro call via Calendly</div>
                </div>
              </a>
            )}

            {social?.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="contact-card contact-card-purple" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px 24px", background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: "16px", textDecoration: "none", transition: "border-color 200ms, box-shadow 200ms" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(28,61,110,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                  💼
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500, fontSize: "15px", color: "var(--text-primary)", marginBottom: "2px" }}>LinkedIn</div>
                  <div style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>Connect professionally</div>
                </div>
              </a>
            )}

            {social?.github && (
              <a href={social.github} target="_blank" rel="noopener noreferrer" className="contact-card contact-card-purple" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px 24px", background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: "16px", textDecoration: "none", transition: "border-color 200ms, box-shadow 200ms" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(28,61,110,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                  🐙
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500, fontSize: "15px", color: "var(--text-primary)", marginBottom: "2px" }}>GitHub</div>
                  <div style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>See what I&apos;m building</div>
                </div>
              </a>
            )}
          </div>

          {/* Right column */}
          <div>
            {contact?.availability_note && (
              <div style={{ padding: "24px", background: "rgba(45,106,79,0.06)", border: "1px solid rgba(45,106,79,0.18)", borderRadius: "16px", marginBottom: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: contact.available ? "var(--accent-teal)" : "var(--text-tertiary)", display: "inline-block" }} />
                  <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", color: "var(--accent-teal)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    {contact.available ? "Available" : "Not currently available"}
                  </span>
                </div>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {contact.availability_note}
                </p>
              </div>
            )}
            <div style={{ padding: "24px", background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: "16px" }}>
              <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "18px", color: "var(--text-primary)", marginBottom: "12px" }}>
                What I&apos;m open to
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Full-time PM roles", "Contract / advisory work", "Speaking engagements", "Collaborative projects"].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--text-secondary)" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        .contact-card:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .contact-card-purple:hover {
          border-color: rgba(28,61,110,0.3) !important;
        }
        .contact-card-teal:hover {
          border-color: rgba(45,106,79,0.3) !important;
        }
      `}</style>
    </PageWrapper>
  );
}

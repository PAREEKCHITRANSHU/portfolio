import Image from "next/image";
import { AnimateIn } from "@/components/motion/AnimateIn";
import type { Skill } from "@/lib/types";

function SkillChip({ skill }: { skill: Skill }) {
  const isActive = (skill.proficiency ?? 0) >= 4;
  return (
    <div className="skill-chip-item" style={{
      display: "inline-flex", alignItems: "center", gap: "7px",
      background: "white",
      border: `1px solid ${isActive ? "rgba(42,122,90,0.3)" : "var(--bg-border)"}`,
      borderLeft: isActive ? "2px solid var(--accent-teal)" : "1px solid var(--bg-border)",
      borderRadius: "8px", padding: "7px 13px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      transition: "border-color 200ms, transform 200ms, box-shadow 200ms",
    }}>
      {skill.icon_url ? (
        <div style={{ width: "15px", height: "15px", position: "relative", flexShrink: 0 }}>
          <Image src={skill.icon_url} alt={skill.name} fill style={{ objectFit: "contain" }} sizes="15px" />
        </div>
      ) : (
        <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(184,92,16,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--accent)", fontWeight: 400 }}>{skill.name[0]}</span>
        </div>
      )}
      <span style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500, fontSize: "13px", color: "var(--text-primary)" }}>{skill.name}</span>
    </div>
  );
}

export function SkillsSection({ skills }: { skills: Record<string, Skill[]> }) {
  const categories = Object.keys(skills);
  if (categories.length === 0) return null;

  return (
    <section style={{ padding: "96px 0", background: "var(--bg-base)", borderTop: "1px solid var(--bg-border)" }}>
      <div className="container-max">
        <AnimateIn style={{ marginBottom: "52px" }}>
          <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>03</div>
          <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(26px, 3vw, 36px)", color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: "10px" }}>
            What I work with.
          </h2>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "15px", color: "var(--text-secondary)", maxWidth: "460px" }}>
            Tools, methods, and frameworks I use in day-to-day product work.
            <span style={{ marginLeft: "8px", fontSize: "12px", color: "var(--accent-teal)" }}>
              — green border = actively using
            </span>
          </p>
        </AnimateIn>

        <div>
          {categories.map((cat, i) => (
            <AnimateIn key={cat} delay={i * 0.05}>
              <div className="skills-band" style={{
                display: "flex", alignItems: "flex-start", gap: "24px",
                padding: "20px 0",
                borderBottom: i < categories.length - 1 ? "1px solid var(--bg-border)" : "none",
              }}>
                <div style={{ width: "110px", flexShrink: 0, paddingTop: "9px" }}>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    {cat}
                  </span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", flex: 1 }}>
                  {skills[cat].map((skill) => <SkillChip key={skill.id} skill={skill} />)}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>

      <style>{`
        .skill-chip-item:hover { border-color: var(--accent) !important; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important; }
        @media (max-width: 600px) {
          .skills-band { flex-direction: column !important; gap: 12px !important; }
          .skills-band > div:first-child { width: auto !important; padding-top: 0 !important; }
        }
      `}</style>
    </section>
  );
}

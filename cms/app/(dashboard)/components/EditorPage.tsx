"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { TextInput } from "./forms/TextInput";
import { TextArea } from "./forms/TextArea";
import { SlugInput } from "./forms/SlugInput";
import { TagCombobox } from "./forms/TagCombobox";
import { ImageUpload } from "./forms/ImageUpload";
import { StatusControl } from "./forms/StatusControl";
import { ToggleSwitch } from "./forms/ToggleSwitch";
import { BlockList, Block } from "./blocks/BlockList";
import { generateSlug } from "@/lib/slug-client";

export interface EditorConfig {
  contentType: string;
  apiBase: string;
  listHref: string;
  portfolioBase: string;
  fields: {
    hasSubtitle: boolean;
    hasExcerpt: boolean;
    hasType: boolean;
    hasLiveUrl: boolean;
    hasGithubUrl: boolean;
    hasFeatured: boolean;
    hasBlocks: boolean;
  };
}

interface EditorState {
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  cover_image_url: string;
  tags: string[];
  status: "draft" | "published" | "archived";
  featured: boolean;
  meta_description: string;
  type: string;
  live_url: string;
  github_url: string;
  blocks: Block[];
}

interface Props {
  config: EditorConfig;
  initialData?: Partial<EditorState> & { id?: string };
}

function SaveBanner({ state }: { state: "idle" | "saving" | "saved" | "error" | "published" }) {
  if (state === "idle") return null;
  const styles: Record<string, { bg: string; color: string; border: string; text: string }> = {
    saving: { bg: "rgba(123,110,246,0.1)", color: "var(--accent)", border: "rgba(123,110,246,0.3)", text: "Saving…" },
    saved: { bg: "rgba(61,220,132,0.1)", color: "var(--accent-green)", border: "rgba(61,220,132,0.3)", text: "Saved" },
    published: { bg: "rgba(61,220,132,0.1)", color: "var(--accent-green)", border: "rgba(61,220,132,0.3)", text: "Published successfully." },
    error: { bg: "rgba(245,166,35,0.1)", color: "var(--accent-amber)", border: "rgba(245,166,35,0.3)", text: "Save failed. Please try again." },
  };
  const s = styles[state];
  if (!s) return null;
  return (
    <div style={{ position: "fixed", top: "16px", right: "16px", padding: "10px 16px", background: s.bg, border: `1px solid ${s.border}`, borderRadius: "8px", color: s.color, fontSize: "13px", zIndex: 200, fontFamily: "var(--font-dm-sans)" }}>
      {s.text}
    </div>
  );
}

export function EditorPage({ config, initialData }: Props) {
  const router = useRouter();
  const isNew = !initialData?.id;
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error" | "published">("idle");
  const [dirty, setDirty] = useState(false);
  const [webhookWarning, setWebhookWarning] = useState(false);

  const [form, setForm] = useState<EditorState>({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    subtitle: initialData?.subtitle ?? "",
    excerpt: initialData?.excerpt ?? "",
    cover_image_url: initialData?.cover_image_url ?? "",
    tags: initialData?.tags ?? [],
    status: (initialData?.status as EditorState["status"]) ?? "draft",
    featured: initialData?.featured ?? false,
    meta_description: initialData?.meta_description ?? "",
    type: initialData?.type ?? "",
    live_url: initialData?.live_url ?? "",
    github_url: initialData?.github_url ?? "",
    blocks: (initialData?.blocks as Block[]) ?? [],
  });

  function up(field: Partial<EditorState>) {
    setForm((prev) => ({ ...prev, ...field }));
    setDirty(true);
  }

  // Auto-generate slug when title changes on new items
  useEffect(() => {
    if (isNew && form.title) {
      up({ slug: generateSlug(form.title) });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title, isNew]);

  // Warn on unload if dirty
  useEffect(() => {
    function handler(e: BeforeUnloadEvent) {
      if (dirty) { e.preventDefault(); e.returnValue = ""; }
    }
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const handleSave = useCallback(async () => {
    setSaveState("saving");
    setWebhookWarning(false);

    const payload: Record<string, unknown> = {
      title: form.title,
      slug: form.slug,
      cover_image_url: form.cover_image_url || null,
      tags: form.tags,
      status: form.status,
      meta_description: form.meta_description || null,
    };

    if (config.fields.hasSubtitle) payload.subtitle = form.subtitle || null;
    if (config.fields.hasExcerpt) payload.excerpt = form.excerpt || null;
    if (config.fields.hasFeatured) payload.featured = form.featured;
    if (config.fields.hasType) payload.type = form.type || null;
    if (config.fields.hasLiveUrl) payload.live_url = form.live_url || null;
    if (config.fields.hasGithubUrl) payload.github_url = form.github_url || null;
    if (config.fields.hasBlocks) payload.blocks = form.blocks;

    try {
      const url = isNew ? config.apiBase : `${config.apiBase}/${initialData?.id}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setSaveState("error");
        setTimeout(() => setSaveState("idle"), 4000);
        return;
      }

      const json = await res.json();
      const newState = form.status === "published" ? "published" : "saved";
      setSaveState(newState);
      setDirty(false);
      setTimeout(() => setSaveState("idle"), 2000);

      if (isNew && json.data?.id) {
        router.replace(`${config.listHref}/${json.data.id}`);
      }

      // Check if webhook warning needed (only set by server error response for webhook)
      if (json.webhookFailed) setWebhookWarning(true);

    } catch {
      setSaveState("error");
      setTimeout(() => setSaveState("idle"), 4000);
    }
  }, [form, config, initialData, isNew, router]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <SaveBanner state={saveState} />

      {/* Top bar */}
      <div style={{ padding: "16px 32px", borderBottom: "1px solid var(--bg-border)", display: "flex", alignItems: "center", gap: "16px", background: "var(--bg-surface)", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href={config.listHref} style={{ color: "var(--text-tertiary)", display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", textDecoration: "none" }}>
          <ArrowLeft size={14} /> {config.contentType}
        </Link>
        <span style={{ color: "var(--bg-border)" }}>·</span>
        <span style={{ fontSize: "14px", color: "var(--text-secondary)", flex: 1 }}>
          {isNew ? `New ${config.contentType.replace(/s$/, "")}` : form.title || "Untitled"}
        </span>
        {dirty && <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>Unsaved changes</span>}
        {!isNew && form.slug && (
          <a href={`${process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? "https://aman.dev"}/${config.portfolioBase}/${form.slug}`} target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "var(--text-tertiary)", textDecoration: "none" }}>
            <ExternalLink size={12} /> View
          </a>
        )}
        <button type="button" onClick={handleSave} disabled={saveState === "saving"} className="btn-primary" style={{ fontSize: "14px", padding: "8px 20px" }}>
          {saveState === "saving" ? "Saving…" : form.status === "published" ? "Save & Publish" : "Save Draft"}
        </button>
      </div>

      {webhookWarning && (
        <div style={{ background: "rgba(245,166,35,0.08)", borderBottom: "1px solid rgba(245,166,35,0.2)", padding: "10px 32px", fontSize: "13px", color: "var(--accent-amber)" }}>
          Published but portfolio update may be delayed — webhook could not be reached.
        </div>
      )}

      {/* Two-panel layout */}
      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", minHeight: "calc(100vh - 65px)" }}>
        {/* Left: Metadata */}
        <div style={{ borderRight: "1px solid var(--bg-border)", padding: "28px 24px", overflowY: "auto", height: "calc(100vh - 65px)", position: "sticky", top: "65px" }}>
          <TextInput id="title" label="Title" value={form.title} onChange={(title) => up({ title })} required maxLength={500} />
          <SlugInput value={form.slug} onChange={(slug) => up({ slug })} onRegenerate={() => up({ slug: generateSlug(form.title) })} portfolioBase={config.portfolioBase} />

          {config.fields.hasSubtitle && (
            <TextInput id="subtitle" label="Subtitle" value={form.subtitle} onChange={(subtitle) => up({ subtitle })} />
          )}

          {config.fields.hasExcerpt && (
            <TextArea id="excerpt" label="Excerpt" value={form.excerpt} onChange={(excerpt) => up({ excerpt })} maxLength={300} rows={3} hint="2-3 sentences" />
          )}

          {config.fields.hasType && (
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Project Type</label>
              <div style={{ display: "flex", gap: "6px" }}>
                {(["personal", "work"] as const).map((t) => (
                  <button key={t} type="button" onClick={() => up({ type: t })}
                    style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid", fontSize: "13px", cursor: "pointer", textTransform: "capitalize", borderColor: form.type === t ? "var(--accent)" : "var(--bg-border)", background: form.type === t ? "rgba(123,110,246,0.1)" : "transparent", color: form.type === t ? "var(--accent)" : "var(--text-secondary)" }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <ImageUpload value={form.cover_image_url} onChange={(url) => up({ cover_image_url: url })} />
          <TagCombobox value={form.tags} onChange={(tags) => up({ tags })} />
          <TextArea id="meta-desc" label="Meta Description" value={form.meta_description} onChange={(meta_description) => up({ meta_description })} maxLength={160} rows={3} />

          {config.fields.hasLiveUrl && (
            <TextInput id="live-url" label="Live URL" value={form.live_url} onChange={(live_url) => up({ live_url })} placeholder="https://" />
          )}
          {config.fields.hasGithubUrl && (
            <TextInput id="github-url" label="GitHub URL" value={form.github_url} onChange={(github_url) => up({ github_url })} placeholder="https://github.com/" />
          )}

          <div style={{ borderTop: "1px solid var(--bg-border)", paddingTop: "16px", marginTop: "8px" }}>
            <StatusControl value={form.status} onChange={(status) => up({ status })} />
            {config.fields.hasFeatured && (
              <ToggleSwitch id="featured" label="Featured" value={form.featured} onChange={(featured) => up({ featured })} description="Show on homepage" />
            )}
          </div>

          {!isNew && initialData?.id && (
            <div style={{ marginTop: "16px", fontSize: "12px", color: "var(--text-tertiary)", fontFamily: "var(--font-jetbrains-mono)" }}>
              ID: {initialData.id}
            </div>
          )}
        </div>

        {/* Right: Block editor */}
        {config.fields.hasBlocks && (
          <div style={{ padding: "28px 32px", overflowY: "auto" }}>
            <div style={{ marginBottom: "16px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)", fontFamily: "var(--font-dm-sans)" }}>Content Blocks</h2>
              <p style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "2px" }}>Drag to reorder. Changes save on "Save".</p>
            </div>
            <BlockList blocks={form.blocks} onChange={(blocks) => up({ blocks })} />
          </div>
        )}
      </div>
    </div>
  );
}

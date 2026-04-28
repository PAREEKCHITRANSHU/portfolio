"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Quote, Code, Heading2, Heading3, Heading4 } from "lucide-react";
import { useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Start writing…" }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        style: "min-height:200px;outline:none;font-family:var(--font-dm-sans);font-size:15px;line-height:1.7;color:var(--text-primary)",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  if (!editor) return null;

  const ToolBtn = ({ onClick, active, title, children }: { onClick: () => void; active?: boolean; title: string; children: React.ReactNode }) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      style={{
        padding: "5px 8px",
        borderRadius: "4px",
        border: "none",
        background: active ? "rgba(123,110,246,0.15)" : "transparent",
        color: active ? "var(--accent)" : "var(--text-secondary)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        transition: "all 100ms",
      }}
    >
      {children}
    </button>
  );

  function setLink() {
    const url = window.prompt("URL", editor?.getAttributes("link").href ?? "");
    if (!url) { editor?.chain().focus().extendMarkRange("link").unsetLink().run(); return; }
    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  return (
    <div style={{ border: "1px solid var(--bg-border)", borderRadius: "8px", overflow: "hidden" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2px", padding: "6px 8px", borderBottom: "1px solid var(--bg-border)", background: "var(--bg-elevated)" }}>
        <ToolBtn title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={14} /></ToolBtn>
        <ToolBtn title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={14} /></ToolBtn>
        <ToolBtn title="Heading 4" active={editor.isActive("heading", { level: 4 })} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}><Heading4 size={14} /></ToolBtn>
        <div style={{ width: "1px", background: "var(--bg-border)", margin: "2px 4px" }} />
        <ToolBtn title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={14} /></ToolBtn>
        <ToolBtn title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={14} /></ToolBtn>
        <ToolBtn title="Inline Code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}><Code size={14} /></ToolBtn>
        <div style={{ width: "1px", background: "var(--bg-border)", margin: "2px 4px" }} />
        <ToolBtn title="Bullet List" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={14} /></ToolBtn>
        <ToolBtn title="Numbered List" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={14} /></ToolBtn>
        <ToolBtn title="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={14} /></ToolBtn>
        <ToolBtn title="Link" active={editor.isActive("link")} onClick={setLink}><LinkIcon size={14} /></ToolBtn>
      </div>
      <div style={{ padding: "12px 14px", background: "var(--bg-surface)" }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

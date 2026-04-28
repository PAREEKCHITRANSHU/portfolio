"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, ChevronDown, ChevronUp, Trash2, Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { BlockTypePicker } from "./BlockTypePicker";
import { RichTextEditor } from "./editors/RichTextEditor";
import { ImageEditor } from "./editors/ImageEditor";
import { GalleryEditor } from "./editors/GalleryEditor";
import { CalloutEditor } from "./editors/CalloutEditor";
import { MetricsEditor } from "./editors/MetricsEditor";
import { TwoColumnEditor } from "./editors/TwoColumnEditor";
import { VideoEditor } from "./editors/VideoEditor";
import { CodeEditor } from "./editors/CodeEditor";
import { DividerEditor } from "./editors/DividerEditor";
import { CTAEditor } from "./editors/CTAEditor";
import { EmbedEditor } from "./editors/EmbedEditor";
import { TagsDisplayEditor } from "./editors/TagsDisplayEditor";
import { HeroBannerEditor } from "./editors/HeroBannerEditor";

export interface Block {
  id: string;
  type: string;
  order: number;
  data: Record<string, unknown>;
}

interface BlockListProps {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}

function BlockEditor({ block, onChange }: { block: Block; onChange: (data: Record<string, unknown>) => void }) {
  const { type, data } = block;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = { data: data as any, onChange: onChange as any };
  switch (type) {
    case "rich_text": return <RichTextEditor value={(data.html as string) ?? ""} onChange={(html) => onChange({ ...data, html })} />;
    case "image": return <ImageEditor {...props} />;
    case "image_gallery": return <GalleryEditor {...props} />;
    case "callout": return <CalloutEditor {...props} />;
    case "metrics_row": return <MetricsEditor {...props} />;
    case "two_column": return <TwoColumnEditor {...props} />;
    case "video_embed": return <VideoEditor {...props} />;
    case "code_snippet": return <CodeEditor {...props} />;
    case "divider": return <DividerEditor {...props} />;
    case "cta_block": return <CTAEditor {...props} />;
    case "embed": return <EmbedEditor {...props} />;
    case "tags_display": return <TagsDisplayEditor {...props} />;
    case "hero_banner": return <HeroBannerEditor {...props} />;
    default: return <div style={{ color: "var(--text-tertiary)", fontSize: "13px" }}>Unknown block type: {type}</div>;
  }
}

function BlockLabel(type: string) {
  return type.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function SortableBlock({
  block,
  onUpdate,
  onDelete,
}: {
  block: Block;
  onUpdate: (data: Record<string, unknown>) => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={{ ...style, background: "var(--bg-surface)", border: "1px solid var(--bg-border)", borderRadius: "10px", marginBottom: "8px", overflow: "hidden" }}>
      {/* Block header */}
      <div style={{ display: "flex", alignItems: "center", padding: "10px 12px", background: "var(--bg-elevated)", gap: "8px" }}>
        <button type="button" {...attributes} {...listeners} style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "grab", display: "flex", padding: "2px", touchAction: "none" }}>
          <GripVertical size={14} />
        </button>
        <span style={{ flex: 1, fontSize: "13px", fontFamily: "var(--font-dm-sans)", fontWeight: 500, color: "var(--text-secondary)" }}>
          {BlockLabel(block.type)}
        </span>
        <button type="button" onClick={() => setExpanded(!expanded)} style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer", display: "flex", padding: "2px" }}>
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {confirmDelete ? (
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "var(--accent-amber)" }}>Delete?</span>
            <button type="button" onClick={onDelete} style={{ fontSize: "11px", background: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.3)", borderRadius: "4px", padding: "2px 8px", color: "var(--accent-amber)", cursor: "pointer" }}>Confirm</button>
            <button type="button" onClick={() => setConfirmDelete(false)} style={{ fontSize: "11px", background: "transparent", border: "1px solid var(--bg-border)", borderRadius: "4px", padding: "2px 8px", color: "var(--text-secondary)", cursor: "pointer" }}>Cancel</button>
          </div>
        ) : (
          <button type="button" onClick={() => setConfirmDelete(true)} style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer", display: "flex", padding: "2px" }}>
            <Trash2 size={14} />
          </button>
        )}
      </div>
      {/* Block content */}
      {expanded && (
        <div style={{ padding: "14px" }}>
          <BlockEditor block={block} onChange={onUpdate} />
        </div>
      )}
    </div>
  );
}

export function BlockList({ blocks, onChange }: BlockListProps) {
  const [showPicker, setShowPicker] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);
    const reordered = [...blocks];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);
    onChange(reordered.map((b, i) => ({ ...b, order: i })));
  }

  function addBlock(type: string, defaultData: Record<string, unknown>) {
    onChange([...blocks, { id: uuidv4(), type, order: blocks.length, data: defaultData }]);
  }

  function updateBlock(id: string, data: Record<string, unknown>) {
    onChange(blocks.map((b) => b.id === id ? { ...b, data } : b));
  }

  function deleteBlock(id: string) {
    onChange(blocks.filter((b) => b.id !== id).map((b, i) => ({ ...b, order: i })));
  }

  return (
    <div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          {blocks.map((block) => (
            <SortableBlock
              key={block.id}
              block={block}
              onUpdate={(data) => updateBlock(block.id, data)}
              onDelete={() => deleteBlock(block.id)}
            />
          ))}
        </SortableContext>
      </DndContext>

      {blocks.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-tertiary)", fontSize: "14px", border: "1px dashed var(--bg-border)", borderRadius: "10px", marginBottom: "12px" }}>
          No blocks yet. Click "+ Add Block" to start building.
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowPicker(true)}
        className="btn-ghost"
        style={{ width: "100%", justifyContent: "center", display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}
      >
        <Plus size={14} /> Add Block
      </button>

      {showPicker && (
        <BlockTypePicker onSelect={addBlock} onClose={() => setShowPicker(false)} />
      )}
    </div>
  );
}

import { ListSkeletons } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="container-max" style={{ padding: "80px 24px 96px" }}>
      <div style={{ marginBottom: "48px" }}>
        <div style={{ width: "80px", height: "12px", borderRadius: "6px", background: "var(--bg-surface)", border: "1px solid var(--bg-border)", marginBottom: "12px" }} />
        <div style={{ width: "200px", height: "48px", borderRadius: "8px", background: "var(--bg-surface)", border: "1px solid var(--bg-border)" }} />
      </div>
      <ListSkeletons count={6} />
    </div>
  );
}

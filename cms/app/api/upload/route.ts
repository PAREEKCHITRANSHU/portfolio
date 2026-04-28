import { NextRequest, NextResponse } from "next/server";
import { supabase, STORAGE_BUCKET } from "@/lib/supabase";
import { ok, err, withAuth } from "@/lib/handler";
import { v4 as uuidv4 } from "uuid";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];

export async function POST(req: NextRequest): Promise<NextResponse> {
  return withAuth(req, async () => {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) return err("VALIDATION", "No file provided", 400);
    if (file.size > MAX_FILE_SIZE) return err("VALIDATION", "File too large. Maximum size is 5MB.", 400);
    if (!ALLOWED_TYPES.includes(file.type)) {
      return err("VALIDATION", "Unsupported file type. Allowed: JPG, PNG, WEBP, SVG.", 400);
    }

    const ext = file.name.split(".").pop() ?? "bin";
    const fileName = `${uuidv4()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return err("UPLOAD_FAILED", "Failed to upload file. Please try again.", 500);
    }

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fileName);

    return ok({ url: data.publicUrl });
  });
}

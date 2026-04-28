import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./auth";

export interface ApiSuccess<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiError {
  error: { code: string; message: string };
}

export function ok<T>(data: T, meta?: Record<string, unknown>): NextResponse {
  return NextResponse.json({ data, ...(meta ? { meta } : {}) });
}

export function err(code: string, message: string, status: number): NextResponse {
  return NextResponse.json({ error: { code, message } }, { status });
}

export async function requireAuth(): Promise<NextResponse | null> {
  const session = await getServerSession(authOptions);
  if (!session) return err("UNAUTHORIZED", "Authentication required", 401);
  return null;
}

export function handleDbError(error: unknown): NextResponse {
  console.error(error);
  // Prisma initialization error — DATABASE_URL not set
  if (
    typeof error === "object" &&
    error !== null &&
    "constructor" in error &&
    (error as { constructor: { name: string } }).constructor.name === "PrismaClientInitializationError"
  ) {
    return err("DB_NOT_CONFIGURED", "Database not configured. Set DATABASE_URL in .env.local", 503);
  }
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: string }).code === "P2025"
  ) {
    return err("NOT_FOUND", "Record not found", 404);
  }
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: string }).code === "P2002"
  ) {
    return err("CONFLICT", "A record with this slug already exists", 409);
  }
  return err("INTERNAL_ERROR", "An unexpected error occurred", 500);
}

export async function withAuth(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const authError = await requireAuth();
  if (authError) return authError;
  try {
    return await handler(req);
  } catch (error) {
    return handleDbError(error);
  }
}

export async function withPublicRead(
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    return await handler();
  } catch (error) {
    return handleDbError(error);
  }
}

type ContentType =
  | "case_study"
  | "project"
  | "blog"
  | "research"
  | "experience"
  | "skills"
  | "site_config";

type Action = "publish" | "unpublish" | "delete";

interface RevalidatePayload {
  type: ContentType;
  slug?: string | null;
  action: Action;
}

export async function emitRevalidation(payload: RevalidatePayload): Promise<void> {
  const portfolioUrl = process.env.PORTFOLIO_URL;
  const secret = process.env.CMS_API_SECRET;

  if (!portfolioUrl || !secret) {
    console.error("Missing PORTFOLIO_URL or CMS_API_SECRET — revalidation skipped");
    return;
  }

  try {
    const res = await fetch(`${portfolioUrl}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-revalidate-secret": secret,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error(`Revalidation webhook failed: ${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.error("Revalidation webhook error:", err);
  }
}

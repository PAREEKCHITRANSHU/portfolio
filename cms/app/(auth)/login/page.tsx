"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) { setError("Email is required."); return; }
    if (!password) { setError("Password is required."); return; }

    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div
      style={{ background: "var(--bg-base)" }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      <div
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--bg-border)",
          borderRadius: "16px",
          padding: "48px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "24px",
              color: "var(--text-primary)",
              marginBottom: "8px",
            }}
          >
            Aman<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            CMS — Sign in to manage content
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {error && (
            <div
              style={{
                background: "rgba(245,166,35,0.1)",
                border: "1px solid rgba(245,166,35,0.3)",
                borderRadius: "8px",
                padding: "12px 16px",
                marginBottom: "20px",
                color: "var(--accent-amber)",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: "13px",
                color: "var(--text-secondary)",
                marginBottom: "6px",
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="you@example.com"
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontSize: "13px",
                color: "var(--text-secondary)",
                marginBottom: "6px",
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

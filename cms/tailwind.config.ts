import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "var(--bg-base)",
          surface: "var(--bg-surface)",
          elevated: "var(--bg-elevated)",
          border: "var(--bg-border)",
          subtle: "var(--bg-subtle)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
          inverse: "var(--text-inverse)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          press: "var(--accent-press)",
          teal: "var(--accent-teal)",
          amber: "var(--accent-amber)",
          green: "var(--accent-green)",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        xs: ["11px", { lineHeight: "1.5", letterSpacing: "0.08em" }],
        sm: ["13px", { lineHeight: "1.6", letterSpacing: "0.02em" }],
        base: ["16px", { lineHeight: "1.7", letterSpacing: "0" }],
        md: ["18px", { lineHeight: "1.6", letterSpacing: "-0.01em" }],
        lg: ["22px", { lineHeight: "1.4", letterSpacing: "-0.02em" }],
        xl: ["28px", { lineHeight: "1.3", letterSpacing: "-0.03em" }],
        "2xl": ["36px", { lineHeight: "1.2", letterSpacing: "-0.04em" }],
        "3xl": ["48px", { lineHeight: "1.1", letterSpacing: "-0.05em" }],
        "4xl": ["64px", { lineHeight: "1.0", letterSpacing: "-0.06em" }],
        "5xl": ["80px", { lineHeight: "0.95", letterSpacing: "-0.07em" }],
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
        20: "80px",
        24: "96px",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(123,110,246,0.06)",
        "card-hover":
          "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(123,110,246,0.2)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "in-out": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      transitionDuration: {
        instant: "80ms",
        fast: "150ms",
        base: "250ms",
        slow: "400ms",
        slower: "600ms",
        crawl: "1200ms",
      },
    },
  },
  plugins: [],
};

export default config;

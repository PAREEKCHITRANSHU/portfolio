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
        base: ["16px", { lineHeight: "1.7" }],
        md: ["18px", { lineHeight: "1.6", letterSpacing: "-0.01em" }],
        lg: ["22px", { lineHeight: "1.4", letterSpacing: "-0.02em" }],
        xl: ["28px", { lineHeight: "1.3", letterSpacing: "-0.03em" }],
        "2xl": ["36px", { lineHeight: "1.2", letterSpacing: "-0.04em" }],
        "3xl": ["48px", { lineHeight: "1.1", letterSpacing: "-0.05em" }],
        "4xl": ["64px", { lineHeight: "1.0", letterSpacing: "-0.06em" }],
        "5xl": ["80px", { lineHeight: "0.95", letterSpacing: "-0.07em" }],
      },
      maxWidth: {
        container: "var(--container-max)",
        text: "var(--container-text)",
        narrow: "var(--container-narrow)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

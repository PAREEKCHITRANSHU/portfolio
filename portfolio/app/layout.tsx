import type { Metadata } from "next";
import { DM_Sans, Syne, JetBrains_Mono } from "next/font/google";
import { PageTransition } from "@/components/motion/PageTransition";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-dm-sans", display: "swap" });
const syne = Syne({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-syne", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Aman", template: "%s — Aman" },
  description: "PM Portfolio",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aman.dev"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${syne.variable} ${jetbrainsMono.variable}`}>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}

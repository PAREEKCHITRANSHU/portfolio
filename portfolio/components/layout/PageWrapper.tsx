import { getSiteConfig } from "@/lib/api";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import type { SiteConfig } from "@/lib/types";

interface PageWrapperProps {
  children: React.ReactNode;
  config?: SiteConfig;
}

export async function PageWrapper({ children, config: configProp }: PageWrapperProps) {
  const config = configProp ?? await getSiteConfig();
  return (
    <>
      <Navbar contact={config.contact} social={config.social} />
      <main style={{ paddingTop: "64px" }}>
        {children}
      </main>
      <Footer social={config.social} tagline={config.about?.tagline} />
    </>
  );
}

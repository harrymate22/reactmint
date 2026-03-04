import { ReactNode } from "react";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

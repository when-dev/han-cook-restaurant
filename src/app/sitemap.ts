import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { localeTags, locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [localeTags[l].intl, `${siteConfig.siteUrl}/${l}`]));
  return locales.map((l) => ({
    url: `${siteConfig.siteUrl}/${l}`,
    changeFrequency: "weekly",
    priority: l === "sk" ? 1 : 0.8,
    alternates: { languages },
  }));
}

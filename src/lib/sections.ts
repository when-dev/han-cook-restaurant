import type { Dictionary } from "@/i18n";

/** In-page sections, in page order. Ids double as URL hashes. */
export const sectionIds = ["about", "signature", "menu", "gallery", "reviews", "contact"] as const;
export type SectionId = (typeof sectionIds)[number];

export function navItems(dict: Dictionary): { id: SectionId; label: string }[] {
  return sectionIds.map((id) => ({ id, label: dict.nav[id] }));
}

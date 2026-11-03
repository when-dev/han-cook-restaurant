export const locales = ["sk", "en", "ko"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "sk";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** BCP 47 tags used for <html lang>, hreflang and OpenGraph. */
export const localeTags: Record<Locale, { intl: string; og: string; label: string; name: string }> = {
  sk: { intl: "sk-SK", og: "sk_SK", label: "SK", name: "Slovenčina" },
  en: { intl: "en-GB", og: "en_GB", label: "EN", name: "English" },
  ko: { intl: "ko-KR", og: "ko_KR", label: "한", name: "한국어" },
};

/** Text that exists in all three languages (menu data, reviews, gallery captions…). */
export type Localized = Record<Locale, string>;

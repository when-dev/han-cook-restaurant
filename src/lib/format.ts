import { localeTags, type Locale } from "@/i18n/config";

/** Replace `{name}` placeholders in a dictionary string. */
export function fmt(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (m, key: string) => (key in vars ? String(vars[key]) : m));
}

const priceFormatters = new Map<Locale, Intl.NumberFormat>();

/** "10,90 €" in Slovak, "€10.90" in English/Korean. */
export function formatPrice(locale: Locale, value: number): string {
  let f = priceFormatters.get(locale);
  if (!f) {
    f = new Intl.NumberFormat(localeTags[locale].intl, {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    });
    priceFormatters.set(locale, f);
  }
  return f.format(value);
}

/** Pick the plural form (Slovak has one / few / other) and fill in `{count}`. */
export function plural(locale: Locale, count: number, forms: { one: string; few: string; other: string }): string {
  const rule = new Intl.PluralRules(localeTags[locale].intl).select(count);
  const template = rule === "one" ? forms.one : rule === "few" ? forms.few : forms.other;
  return fmt(template, { count });
}

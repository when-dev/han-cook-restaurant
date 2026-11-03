import { Flame, Leaf, Sparkles } from "lucide-react";
import type { MenuItem, MenuTag } from "@/data/menu";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { fmt, formatPrice } from "@/lib/format";
import { ChiliIcon } from "@/components/ui/Icons";
import { DishMedia, categoryTone } from "./DishMedia";

/** Headline is the romanised name in SK/EN and the Hangul name in KO; the subline is the other one. */
export function dishNames(item: MenuItem, locale: Locale) {
  if (locale === "ko") return { headline: item.name.ko, subline: item.romanized };
  const translated = item.name[locale];
  const same = translated.toLowerCase() === item.romanized.toLowerCase();
  return { headline: item.romanized, subline: same ? item.name.ko : translated, hangul: same ? undefined : item.name.ko };
}

const tagStyle: Record<MenuTag, { cls: string; Icon: typeof Flame }> = {
  bestseller: { cls: "bg-ink text-amber", Icon: Sparkles },
  new: { cls: "bg-neon-pink text-white", Icon: Sparkles },
  vegetarian: { cls: "bg-[#2f7d46] text-white", Icon: Leaf },
};

export function TagBadge({ tag, label }: { tag: MenuTag; label: string }) {
  const { cls, Icon } = tagStyle[tag];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.68rem] font-bold tracking-wide uppercase shadow-sm ${cls}`}>
      <Icon className="size-3" aria-hidden="true" />
      {label}
    </span>
  );
}

export function SpicyMeter({ level, label }: { level: number; label: string }) {
  if (!level) return null;
  return (
    <span className="inline-flex items-center" role="img" aria-label={label} title={label}>
      {[1, 2, 3].map((n) => (
        <ChiliIcon key={n} className={`size-4 ${n <= level ? "text-chili" : "text-ink/15"}`} />
      ))}
    </span>
  );
}

export function MenuCard({
  item,
  locale,
  dict,
  priority = false,
}: {
  item: MenuItem;
  locale: Locale;
  dict: Dictionary;
  priority?: boolean;
}) {
  const { headline, subline, hangul } = dishNames(item, locale);
  return (
    <article className="group bg-cream relative flex flex-col overflow-hidden rounded-[1.6rem] border-2 border-ink shadow-[5px_5px_0_var(--color-ink)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[8px_10px_0_var(--color-chili)]">
      <DishMedia
        image={item.image}
        alt={`${item.romanized} — ${item.name[locale]}`}
        art={item.art}
        itemId={item.id}
        hangul={item.name.ko}
        tone={categoryTone[item.category]}
        priority={priority}
        className="aspect-[16/11] border-b-2 border-ink"
      />
      {item.tags && item.tags.length > 0 && (
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {item.tags.map((t) => (
            <TagBadge key={t} tag={t} label={dict.menu.tags[t]} />
          ))}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-ink text-xl leading-tight font-extrabold tracking-[-0.02em]">{headline}</h3>
            <p className="text-mute-ink mt-0.5 text-sm font-medium">
              {subline}
              {hangul && <span className="text-chili ml-2 font-bold">{hangul}</span>}
            </p>
          </div>
          <p className="font-display bg-chili shrink-0 rounded-full px-3 py-1 text-base font-extrabold whitespace-nowrap text-white">
            {formatPrice(locale, item.price)}
          </p>
        </div>
        <p className="text-ink/75 text-sm leading-relaxed text-pretty">{item.description[locale]}</p>
        {!!item.spicy && (
          <div className="mt-auto flex items-center gap-2 pt-2 text-xs font-semibold text-chili">
            <SpicyMeter level={item.spicy} label={fmt(dict.a11y.spicyLevel, { level: item.spicy })} />
            {dict.menu.tags.spicy}
          </div>
        )}
      </div>
    </article>
  );
}

"use client";

import { Flame } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { categoryIds, categoryLabels, menuItems, type CategoryId, type MenuItem } from "@/data/menu";
import { useI18n } from "@/i18n/client";
import { plural } from "@/lib/format";
import { CategorySlider, type SliderOption } from "./CategorySlider";
import { MenuCard } from "./MenuCard";

type Filter = "all" | "top" | CategoryId;

const filters: Filter[] = ["all", "top", ...categoryIds];
const isTop = (item: MenuItem) => item.signature || item.tags?.includes("bestseller");
const isFilter = (v: unknown): v is Filter => typeof v === "string" && (filters as string[]).includes(v);

/** Remembers the selection for this tab, so switching language keeps the same category. */
const STORAGE_KEY = "hancook:menu-filter";

function matches(item: MenuItem, filter: Filter, spicyOnly: boolean) {
  if (spicyOnly && !item.spicy) return false;
  if (filter === "all") return true;
  if (filter === "top") return isTop(item);
  return item.category === filter;
}

function SpicySwitch({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={`flex h-11 shrink-0 items-center gap-2 rounded-full border-2 px-4 text-sm font-bold whitespace-nowrap transition-colors max-sm:h-9 max-sm:self-start max-sm:px-3 max-sm:text-xs ${
        on ? "border-chili bg-chili/10 text-chili" : "border-ink/15 text-ink/70 hover:border-ink/50"
      }`}
    >
      <Flame className="size-4" aria-hidden="true" />
      {label}
      <span
        aria-hidden="true"
        className={`ml-0.5 inline-block h-4 w-7 rounded-full p-0.5 transition-colors ${on ? "bg-chili" : "bg-ink/20"}`}
      >
        <span className={`block size-3 rounded-full bg-white transition-transform ${on ? "translate-x-3" : ""}`} />
      </span>
    </button>
  );
}

export function MenuExplorer() {
  const { locale, dict } = useI18n();
  const [filter, setFilter] = useState<Filter>("all");
  const [spicyOnly, setSpicyOnly] = useState(false);

  // Restore after hydration (server always renders "all"), then persist every change.
  const [restored, setRestored] = useState(false);
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null") as { f?: unknown; s?: unknown } | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time restore from storage after hydration
      if (saved && isFilter(saved.f)) setFilter(saved.f);
      if (saved?.s === true) setSpicyOnly(true);
    } catch {
      /* storage unavailable — keep defaults */
    }
    setRestored(true);
  }, []);
  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ f: filter, s: spicyOnly }));
    } catch {
      /* ignore */
    }
  }, [filter, spicyOnly, restored]);

  const visible = useMemo(() => menuItems.filter((item) => matches(item, filter, spicyOnly)), [filter, spicyOnly]);

  // Counts come straight from the data and respect the spicy toggle.
  const options: SliderOption<Filter>[] = filters.map((f) => ({
    value: f,
    label: f === "all" ? dict.menu.all : f === "top" ? dict.menu.top : categoryLabels[f][locale],
    hangul: locale === "ko" || f === "all" ? undefined : f === "top" ? "인기" : categoryLabels[f].hangul,
    count: menuItems.filter((m) => matches(m, f, spicyOnly)).length,
  }));

  const grouped = filter === "all";
  const categoriesShown = categoryIds.filter((c) => visible.some((i) => i.category === c));

  return (
    <div className="flex flex-col gap-10">
      {/* Filter bar — sticks under the header while browsing */}
      <div className="sticky top-16 z-20 -mx-5 px-5 py-2 md:top-[4.5rem] md:-mx-8 md:px-8">
        <div
          aria-hidden="true"
          className="paper absolute inset-0 -z-10 opacity-95 shadow-[0_10px_20px_-16px_rgba(0,0,0,.5)]"
        />
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <CategorySlider
            options={options}
            value={filter}
            onChange={setFilter}
            label={dict.menu.filtersLabel}
            prevLabel={dict.a11y.scrollPrev}
            nextLabel={dict.a11y.scrollNext}
          />
          <SpicySwitch on={spicyOnly} onToggle={() => setSpicyOnly((v) => !v)} label={dict.menu.spicyOnly} />
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {plural(locale, visible.length, dict.menu.count)}
      </p>

      {visible.length === 0 && <p className="text-mute-ink py-10 text-center">{dict.menu.empty}</p>}

      {grouped ? (
        categoriesShown.map((c) => {
          const items = visible.filter((i) => i.category === c);
          return (
            <section key={c} aria-labelledby={`cat-${c}`} className="flex flex-col gap-6">
              <header className="flex items-end gap-4">
                <h3
                  id={`cat-${c}`}
                  className="bg-chili halftone font-display inline-flex items-center gap-3 rounded-xl border-2 border-ink px-4 py-2 text-xl font-extrabold tracking-tight text-white shadow-[4px_4px_0_var(--color-ink)] md:text-2xl"
                >
                  <span className="text-amber font-black">{categoryLabels[c].hangul}</span>
                  {locale !== "ko" && categoryLabels[c][locale]}
                </h3>
                <span aria-hidden="true" className="bg-ink/15 mb-3 h-0.5 flex-1 rounded-full" />
                <span className="text-ink/50 mb-1.5 text-sm font-semibold tabular-nums">
                  {plural(locale, items.length, dict.menu.count)}
                </span>
              </header>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <MenuCard key={item.id} item={item} locale={locale} dict={dict} />
                ))}
              </div>
            </section>
          );
        })
      ) : (
        <div key={`${filter}-${spicyOnly}`} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, i) => (
            <div key={item.id} className="animate-rise grid" style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}>
              <MenuCard item={item} locale={locale} dict={dict} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { Flame } from "lucide-react";
import { useMemo, useState } from "react";
import { categoryIds, categoryLabels, menuItems, type CategoryId, type MenuItem } from "@/data/menu";
import { useI18n } from "@/i18n/client";
import { plural } from "@/lib/format";
import { MenuCard } from "./MenuCard";

type Filter = "all" | "top" | CategoryId;

const isTop = (item: MenuItem) => item.signature || item.tags?.includes("bestseller");

function Pill({
  active,
  onClick,
  children,
  hangul,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  hangul?: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex h-11 shrink-0 items-center gap-2 rounded-full border-2 px-4 text-sm font-bold whitespace-nowrap transition-all duration-200 ${
        active
          ? "bg-chili border-ink text-white shadow-[3px_3px_0_var(--color-ink)]"
          : "border-ink/15 bg-cream/80 text-ink hover:border-ink/60"
      }`}
    >
      {hangul && <span className={`text-[0.9rem] font-black ${active ? "text-amber" : "text-chili"}`}>{hangul}</span>}
      {children}
      <span className={`text-xs tabular-nums ${active ? "text-white/70" : "text-ink/40"}`}>{count}</span>
    </button>
  );
}

export function MenuExplorer() {
  const { locale, dict } = useI18n();
  const [filter, setFilter] = useState<Filter>("all");
  const [spicyOnly, setSpicyOnly] = useState(false);

  const visible = useMemo(
    () =>
      menuItems.filter((item) => {
        if (spicyOnly && !item.spicy) return false;
        if (filter === "all") return true;
        if (filter === "top") return isTop(item);
        return item.category === filter;
      }),
    [filter, spicyOnly],
  );

  const pool = spicyOnly ? menuItems.filter((m) => m.spicy) : menuItems;
  const countFor = (f: Filter) =>
    f === "all" ? pool.length : f === "top" ? pool.filter(isTop).length : pool.filter((m) => m.category === f).length;

  const grouped = filter === "all";
  const categoriesShown = categoryIds.filter((c) => visible.some((i) => i.category === c));

  return (
    <div className="flex flex-col gap-10">
      {/* Filter bar — sticks under the header while browsing */}
      <div className="sticky top-16 z-20 -mx-5 px-5 py-3 md:top-[4.5rem] md:-mx-8 md:px-8">
        <div aria-hidden="true" className="paper absolute inset-0 -z-10 opacity-95 shadow-[0_10px_20px_-16px_rgba(0,0,0,.5)]" />
        <div className="flex items-center gap-3">
          <div
            role="group"
            aria-label={dict.menu.filtersLabel}
            className="no-scrollbar -my-1 flex flex-1 gap-2 overflow-x-auto py-1 [mask-image:linear-gradient(90deg,#000_92%,transparent)]"
          >
            <Pill active={filter === "all"} onClick={() => setFilter("all")} count={countFor("all")}>
              {dict.menu.all}
            </Pill>
            <Pill active={filter === "top"} onClick={() => setFilter("top")} count={countFor("top")} hangul="인기">
              {dict.menu.top}
            </Pill>
            {categoryIds.map((c) => (
              <Pill
                key={c}
                active={filter === c}
                onClick={() => setFilter(c)}
                count={countFor(c)}
                hangul={locale === "ko" ? undefined : categoryLabels[c].hangul}
              >
                {categoryLabels[c][locale]}
              </Pill>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setSpicyOnly((v) => !v)}
            aria-pressed={spicyOnly}
            className={`hidden h-11 shrink-0 items-center gap-2 rounded-full border-2 px-4 text-sm font-bold transition-colors sm:flex ${
              spicyOnly ? "border-chili bg-chili/10 text-chili" : "border-ink/15 text-ink/70 hover:border-ink/50"
            }`}
          >
            <Flame className="size-4" />
            {dict.menu.spicyOnly}
          </button>
        </div>
        <button
          type="button"
          onClick={() => setSpicyOnly((v) => !v)}
          aria-pressed={spicyOnly}
          className={`mt-2 inline-flex items-center gap-1.5 text-xs font-bold sm:hidden ${spicyOnly ? "text-chili" : "text-ink/60"}`}
        >
          <Flame className="size-3.5" />
          {dict.menu.spicyOnly}
          <span className={`ml-1 inline-block h-4 w-7 rounded-full p-0.5 transition-colors ${spicyOnly ? "bg-chili" : "bg-ink/20"}`}>
            <span className={`block size-3 rounded-full bg-white transition-transform ${spicyOnly ? "translate-x-3" : ""}`} />
          </span>
        </button>
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

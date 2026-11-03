"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";

export interface SliderOption<T extends string> {
  value: T;
  label: string;
  /** Small Hangul tag shown before the label (omitted in Korean, where the label already is Hangul). */
  hangul?: string;
  count: number;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Single-row, natively scrolling category pills.
 * - Touch / trackpad: plain `overflow-x: auto` with snap and momentum, scrollbar hidden.
 * - Desktop (md+): prev/next arrows sit *beside* the row (never on top of pills) and only render
 *   when the row actually overflows; they disable at either end.
 * - Edge fades appear only on the side that still has hidden pills.
 * - The selected pill is scrolled into view (horizontally only — the page never jumps).
 */
export function CategorySlider<T extends string>({
  options,
  value,
  onChange,
  label,
  prevLabel,
  nextLabel,
}: {
  options: SliderOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ overflow: false, start: true, end: true });

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const next = { overflow: max > 1, start: el.scrollLeft <= 1, end: el.scrollLeft >= max - 1 };
    setEdges((prev) =>
      prev.overflow === next.overflow && prev.start === next.start && prev.end === next.end ? prev : next,
    );
  }, []);

  /** Scroll a pill into view horizontally, centring it, only if it is (partly) hidden. */
  const reveal = useCallback((target: T, smooth: boolean) => {
    const el = scroller.current;
    const pill = el?.querySelector<HTMLElement>(`[data-value="${target}"]`);
    if (!el || !pill) return;
    const pad = parseFloat(getComputedStyle(el).scrollPaddingInlineStart) || 0;
    const left = pill.offsetLeft;
    const right = left + pill.offsetWidth;
    if (left >= el.scrollLeft + pad && right <= el.scrollLeft + el.clientWidth - pad) return;
    el.scrollTo({
      left: left - (el.clientWidth - pill.offsetWidth) / 2,
      behavior: smooth && !prefersReducedMotion() ? "smooth" : "auto",
    });
  }, []);

  // Track overflow on scroll, on resize of the row, and when pills change (language, counts).
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(() => {
      measure();
      reveal(value, false);
    });
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  }, [measure, reveal, value]);

  // On first paint (e.g. after a language switch restores the selection) jump straight to it.
  const mounted = useRef(false);
  useLayoutEffect(() => {
    reveal(value, mounted.current);
    mounted.current = true;
  }, [value, reveal]);

  const page = (dir: -1 | 1) => {
    const el = scroller.current;
    if (!el) return;
    const pills = el.querySelectorAll<HTMLElement>("[data-value]");
    const avg = pills.length ? el.scrollWidth / pills.length : 160;
    // ~2.5 pills per click, but never more than most of the visible row.
    const step = Math.min(avg * 2.5, el.clientWidth * 0.8);
    el.scrollBy({ left: dir * step, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  // Arrow keys / Home / End move between pills like a toolbar; Enter/Space still activate.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(e.key)) return;
    const pills = Array.from(scroller.current?.querySelectorAll<HTMLButtonElement>("[data-value]") ?? []);
    const i = pills.indexOf(document.activeElement as HTMLButtonElement);
    if (i === -1) return;
    e.preventDefault();
    const n =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? pills.length - 1
          : (i + (e.key === "ArrowRight" ? 1 : -1) + pills.length) % pills.length;
    pills[n].focus({ preventScroll: true });
    reveal(pills[n].dataset.value as T, true);
  };

  const arrow =
    "hidden size-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-cream text-ink shadow-[2px_2px_0_var(--color-ink)] transition-all duration-200 hover:bg-chili hover:text-white active:translate-x-px active:translate-y-px active:shadow-none disabled:pointer-events-none disabled:border-ink/15 disabled:text-ink/25 disabled:shadow-none md:flex";

  return (
    <div className="flex min-w-0 flex-1 items-center gap-2">
      {edges.overflow && (
        <button
          type="button"
          className={arrow}
          onClick={() => page(-1)}
          disabled={edges.start}
          aria-label={prevLabel}
          aria-controls="menu-category-row"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
      )}

      <div className="relative min-w-0 flex-1">
        <div
          ref={scroller}
          id="menu-category-row"
          role="group"
          aria-label={label}
          onKeyDown={onKeyDown}
          className="no-scrollbar flex snap-x snap-proximity scroll-px-9 flex-nowrap overflow-x-auto overscroll-x-contain motion-safe:scroll-smooth"
        >
          {/* Inner row carries the padding so focus rings and the 3px pill shadow are never clipped. */}
          <div className="flex flex-nowrap gap-2 px-1 py-2 pr-2">
            {options.map((o) => {
              const active = o.value === value;
              return (
                <button
                  key={o.value}
                  type="button"
                  data-value={o.value}
                  aria-pressed={active}
                  onClick={() => onChange(o.value)}
                  className={`flex h-11 shrink-0 snap-start items-center gap-2 rounded-full border-2 px-4 text-sm font-bold whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-200 focus-visible:outline-offset-2 ${
                    active
                      ? "bg-chili border-ink text-white shadow-[3px_3px_0_var(--color-ink)]"
                      : "border-ink/15 bg-cream/80 text-ink hover:border-ink/60"
                  } ${o.count === 0 && !active ? "opacity-50" : ""}`}
                >
                  {o.hangul && (
                    <span
                      aria-hidden="true"
                      className={`text-[0.9rem] font-black ${active ? "text-amber" : "text-chili"}`}
                    >
                      {o.hangul}
                    </span>
                  )}
                  {o.label}
                  <span className={`text-xs tabular-nums ${active ? "text-white/75" : "text-ink/45"}`}>{o.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Edge fades — only where more pills are hidden. */}
        <span
          aria-hidden="true"
          className={`from-cream pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r to-transparent transition-opacity duration-200 ${edges.overflow && !edges.start ? "opacity-100" : "opacity-0"}`}
        />
        <span
          aria-hidden="true"
          className={`from-cream pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l to-transparent transition-opacity duration-200 ${edges.overflow && !edges.end ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      {edges.overflow && (
        <button
          type="button"
          className={arrow}
          onClick={() => page(1)}
          disabled={edges.end}
          aria-label={nextLabel}
          aria-controls="menu-category-row"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

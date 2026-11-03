"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n/client";
import { localeTags, locales, type Locale } from "@/i18n/config";
import { currentSectionId } from "@/lib/smoothScroll";

function remember(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/** Segmented SK / EN / 한 switch. Keeps the section you are reading when switching. */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, dict } = useI18n();
  const router = useRouter();
  return (
    <nav aria-label={dict.a11y.language} className={className}>
      <ul className="flex items-center rounded-full border border-white/15 bg-white/[0.06] p-1 backdrop-blur-md">
        {locales.map((l) => {
          const active = l === locale;
          return (
            <li key={l}>
              <Link
                href={`/${l}`}
                hrefLang={localeTags[l].intl}
                lang={localeTags[l].intl}
                aria-current={active ? "page" : undefined}
                title={localeTags[l].name}
                onClick={(e) => {
                  remember(l);
                  if (active || e.metaKey || e.ctrlKey || e.shiftKey) return;
                  // Land on the same section in the new language (e.g. /en#menu), whatever
                  // the visitor scrolled to — not a stale hash from an earlier click.
                  const section = currentSectionId();
                  if (section) {
                    e.preventDefault();
                    router.push(`/${l}#${section}`);
                  }
                }}
                className={`flex h-8 min-w-10 items-center justify-center rounded-full px-2.5 text-xs font-bold tracking-wider transition-colors ${
                  active
                    ? "bg-chili text-white shadow-[0_0_18px_-2px_rgba(227,36,43,.8)]"
                    : "text-cream/70 hover:text-white"
                } ${l === "ko" ? "text-sm tracking-normal" : ""}`}
              >
                {localeTags[l].label}
                <span className="sr-only"> — {localeTags[l].name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/client";
import { navItems, sectionIds, type SectionId } from "@/lib/sections";
import { buttonClass } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/Icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Wordmark } from "./Wordmark";

export function Header() {
  const { locale, dict } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);
  const items = navItems(dict);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Lock page scroll and close on Escape while the mobile sheet is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
          scrolled || open
            ? "bg-ink/85 shadow-[0_1px_0_rgba(255,255,255,.06),0_10px_30px_-10px_rgba(0,0,0,.6)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container-site flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <Link
            href={`/${locale}`}
            aria-label={siteConfig.fullName}
            onClick={() => setOpen(false)}
            className="shrink-0"
          >
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? "true" : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                      active === item.id
                        ? "text-white"
                        : "text-cream/70 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`bg-chili absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full shadow-[0_0_10px_#e3242b] transition-transform duration-300 ${
                        active === item.id ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <LanguageSwitcher className="hidden sm:block" />
            <a
              href="#order"
              className={buttonClass("primary", "md", "max-md:hidden")}
            >
              {dict.nav.order}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? dict.a11y.closeMenu : dict.a11y.openMenu}
              className="text-cream flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet — a sibling of <header>, because the header's backdrop-filter would
          otherwise become the containing block for this fixed element and clip it. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="bg-ink grain fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto md:top-[4.5rem] lg:hidden"
      >
        <div className="container-site flex min-h-full flex-col gap-8 py-8">
          <LanguageSwitcher className="self-start sm:hidden" />
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {items.map((item, i) => (
                <li
                  key={item.id}
                  className="animate-rise border-b border-white/10"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="font-display text-cream flex items-center justify-between py-4 text-3xl font-extrabold tracking-tight"
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-chili text-xl">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto flex flex-col gap-3 pb-6">
            <a
              href="#order"
              onClick={() => setOpen(false)}
              className={buttonClass("primary", "lg")}
            >
              {dict.hero.ctaOrder}
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={siteConfig.phoneHref}
                className={buttonClass("outline", "lg")}
              >
                <Phone className="size-4" /> {dict.contact.call}
              </a>
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("outline", "lg")}
              >
                <InstagramIcon className="size-4" /> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

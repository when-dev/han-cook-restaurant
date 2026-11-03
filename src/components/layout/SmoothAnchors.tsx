"use client";

import { useEffect } from "react";
import { headerOffset, scrollToSection } from "@/lib/smoothScroll";

/**
 * One delegated listener turns every same-page `#section` link on the site (header, footer,
 * hero CTAs, mobile action bar…) into a smooth scroll, without adding history entries.
 * Also re-aligns a deep link (e.g. /sk#menu) once web fonts have settled the layout.
 * Renders nothing.
 */
export function SmoothAnchors() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href^='#']");
      if (!a) return;
      const id = decodeURIComponent(a.getAttribute("href")!.slice(1));
      if (!id) return;
      // The skip link keeps the hash out of the URL; everything else records its section.
      if (scrollToSection(id, { updateHash: id !== "main" })) e.preventDefault();
    };
    document.addEventListener("click", onClick);

    // Deep link: the browser already jumped to the anchor; correct it if fonts shifted the layout,
    // but only if the visitor hasn't started scrolling in the meantime.
    const id = decodeURIComponent(window.location.hash.slice(1));
    const el = id ? document.getElementById(id) : null;
    let cancelled = false;
    if (el) {
      const startY = window.scrollY;
      document.fonts?.ready.then(() => {
        if (cancelled || Math.abs(window.scrollY - startY) > 2) return;
        const want = el.getBoundingClientRect().top - headerOffset();
        if (Math.abs(want) > 24) el.scrollIntoView({ behavior: "auto", block: "start" });
      });
    }
    return () => {
      cancelled = true;
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}

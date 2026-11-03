"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/client";
import { scrollToTop } from "@/lib/smoothScroll";

const SHOW_AFTER = 400;

/**
 * Floating back-to-top button. Sits above the phone action bar (and the iOS home indicator) on
 * mobile, bottom-right on desktop. While hidden it is `inert`, so keyboard users never tab onto
 * an invisible control. z-30 keeps it under the header and the open mobile menu sheet (z-40).
 */
export function BackToTop() {
  const { dict } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > SHOW_AFTER);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label={dict.a11y.backToTop}
      title={dict.a11y.backToTop}
      inert={!visible}
      onClick={(e) => {
        scrollToTop();
        // Keyboard activation (detail 0): move focus to the top so the next Tab starts there.
        if (e.detail === 0) document.querySelector<HTMLElement>("header a")?.focus({ preventScroll: true });
      }}
      className={`bg-chili fixed right-4 bottom-[calc(max(0.75rem,env(safe-area-inset-bottom))+4.6rem)] z-30 flex size-12 items-center justify-center rounded-full border-2 border-white/90 text-white shadow-[0_0_0_1px_rgba(255,140,120,.35),0_8px_22px_-6px_rgba(227,36,43,.8),0_0_26px_-8px_rgba(255,90,60,.7)] transition-[opacity,translate,box-shadow,background-color] duration-300 ease-out hover:-translate-y-1 hover:bg-[#f2333a] hover:shadow-[0_0_0_1px_rgba(255,150,130,.5),0_12px_28px_-6px_rgba(227,36,43,.95),0_0_36px_-6px_rgba(255,90,60,.85)] focus-visible:outline-offset-4 active:translate-y-0 active:scale-95 md:right-6 md:bottom-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="size-5" strokeWidth={2.5} aria-hidden="true" />
    </button>
  );
}

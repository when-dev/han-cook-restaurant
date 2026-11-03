/**
 * Library-free scrolling helpers shared by the header, back-to-top button and the
 * global in-page link handler. All of them honour `prefers-reduced-motion`.
 */

/** Fired on window right before a programmatic section scroll, `detail` = section id (or null for top). */
export const NAVIGATE_EVENT = "hancook:navigate";
/** Fired when that scroll has finished (or was interrupted by the visitor). */
export const NAVIGATE_END_EVENT = "hancook:navigate-end";

/**
 * What to do when the visitor's OS asks for reduced motion (on Windows this is
 * Settings → Accessibility → Visual effects → "Animation effects" turned off):
 * - "instant": jump straight to the target (strictest accessibility reading)
 * - "gentle":  a short 300 ms ease instead of the full animation
 * - "ignore":  always use the full smooth animation
 */
export const REDUCED_MOTION_MODE: "instant" | "gentle" | "ignore" = "gentle";

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Height of the fixed header, read from the same CSS variable that drives `scroll-margin-top`. */
export function headerOffset(): number {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--header-h").trim();
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  return v.endsWith("rem") ? parseFloat(v) * rem : parseFloat(v) || 64;
}

/** Replace (never push) the hash, keeping Next.js' history state intact. */
function setHash(hash: string) {
  const url = `${window.location.pathname}${window.location.search}${hash}`;
  window.history.replaceState(window.history.state, "", url);
}

let cancelRunning: (() => void) | null = null;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Animate the page scroll to `getTop()` — re-read every frame, so late layout shifts (fonts,
 * the lazy map) can't make us miss. 700–900 ms depending on distance, ease-in-out.
 * Native `behavior: "smooth"` isn't used because browsers may silently disable it (OS settings,
 * flags) and give no control over duration. Any wheel/touch/key input hands control straight
 * back to the visitor (no scroll-jacking). Reduced motion → one instant jump.
 */
export function animateScrollTo(getTop: () => number, onDone?: () => void) {
  cancelRunning?.();
  const clamp = (y: number) => Math.max(0, Math.min(y, document.documentElement.scrollHeight - window.innerHeight));
  const finish = () => {
    cancelRunning = null;
    window.dispatchEvent(new Event(NAVIGATE_END_EVENT));
    onDone?.();
  };
  const start = window.scrollY;
  const distance = Math.abs(clamp(getTop()) - start);
  const reduced = REDUCED_MOTION_MODE !== "ignore" && prefersReducedMotion();
  if ((reduced && REDUCED_MOTION_MODE === "instant") || distance < 2) {
    window.scrollTo({ top: clamp(getTop()), behavior: "instant" });
    finish();
    return;
  }
  const duration = reduced ? 300 : Math.min(900, Math.max(700, 650 + distance * 0.018)); // ~1 screen 700ms … long page 900ms
  const t0 = performance.now();
  let frame = 0;
  const interrupt = () => stop(true);
  const events = ["wheel", "touchstart", "keydown", "mousedown"] as const;
  const stop = (done: boolean) => {
    cancelAnimationFrame(frame);
    events.forEach((e) => window.removeEventListener(e, interrupt));
    if (done) finish();
    else cancelRunning = null;
  };
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / duration);
    window.scrollTo({ top: start + (clamp(getTop()) - start) * easeInOutCubic(p), behavior: "instant" });
    if (p < 1) frame = requestAnimationFrame(step);
    else stop(true);
  };
  events.forEach((e) => window.addEventListener(e, interrupt, { passive: true }));
  cancelRunning = () => stop(false);
  frame = requestAnimationFrame(step);
}

/** Document Y at which `el` sits right below the header (honours its CSS scroll-margin-top). */
function targetTop(el: HTMLElement) {
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  return el.getBoundingClientRect().top + window.scrollY - margin;
}

/**
 * Smoothly scroll to a section. The header offset comes from `scroll-margin-top` in CSS, so the
 * heading always lands just below the navbar. Focus moves to the section for keyboard and
 * screen-reader users without causing a second scroll.
 */
export function scrollToSection(id: string, { updateHash = true } = {}): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  window.dispatchEvent(new CustomEvent(NAVIGATE_EVENT, { detail: id }));
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  // Starts on the very next frame. Safe even while the mobile sheet's scroll lock is still
  // being released: overflow:hidden only blocks user scrolling, not scripted scrollTo().
  animateScrollTo(() => targetTop(el));
  if (updateHash) setHash(`#${id}`);
  return true;
}

export function scrollToTop() {
  window.dispatchEvent(new CustomEvent(NAVIGATE_EVENT, { detail: null }));
  animateScrollTo(() => 0);
  if (window.location.hash) setHash("");
}

/**
 * Which page section is "current": the last one whose top has passed a reading line a third of
 * the way down the viewport (below the header). Position-based, so it is equally accurate
 * scrolling up or down and cannot flicker between neighbours. At the very bottom the last
 * section wins even if it is short. Returns null over the hero.
 */
export function currentSectionId(): string | null {
  const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
  if (!sections.length) return null;
  const doc = document.documentElement;
  if (window.scrollY + window.innerHeight >= doc.scrollHeight - 2) return sections[sections.length - 1].id;
  const line = headerOffset() + window.innerHeight * 0.3;
  let current: string | null = null;
  for (const s of sections) {
    if (s.getBoundingClientRect().top <= line) current = s.id;
    else break;
  }
  return current;
}

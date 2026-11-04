"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * TEMPORARY diagnostics for the hero neon intro on real devices: open any page with
 * `?debugNeon=1`. Renders nothing otherwise (and nothing during SSR / hydration).
 * Remove once the iPhone behaviour is confirmed.
 */

type NeonLog = { el: Element | null; ev: string[]; err: string[] };
declare global {
  interface Window {
    __neon?: NeonLog;
  }
}

const noopSubscribe = () => () => {};
const HERO = 'section[aria-labelledby="hero-title"]';
const PARTS: [label: string, selector: string][] = [
  ["drop", ".sign-drop"],
  ["한쿡", ".sign-lit-red"],
  ["frame", ".sign-frame-lit"],
  ["HANCOOK", ".sign-lit-amber"],
  ["ambient", ".sign-ambient"],
];

function phase(state: string | null, t: number | null) {
  if (state === null) return "no intro (resting lit state)";
  if (state === "wait") return "waiting for first visible frame";
  if (state === "off") return "reset";
  if (t === null) return "play — no running hum to time it";
  if (t < 700) return "1 drop";
  if (t < 1400) return "2 한쿡 flicker";
  if (t < 1900) return "3 frame + HANCOOK + glow";
  if (t < 2100) return "4 settling";
  return "5 lit, idle hum";
}

function collect() {
  const hero = document.querySelector(HERO);
  const log = window.__neon;
  const q = (s: string) => hero?.querySelector<HTMLElement>(s) ?? null;
  const state = hero?.getAttribute("data-hero-intro") ?? null;
  const anims = document
    .getAnimations()
    .filter((a) => a.effect instanceof KeyframeEffect && hero?.contains(a.effect.target));
  const name = (a: Animation) => (a as CSSAnimation).animationName ?? a.id;
  const hum = anims.find(
    (a) => name(a) === "neon-hum" && (a.effect as KeyframeEffect).target?.classList.contains("sign-lit-red"),
  );
  const t = hum?.currentTime == null ? null : Math.round(Number(hum.currentTime));
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  const css = (el: HTMLElement | null, p: string) => (el ? getComputedStyle(el).getPropertyValue(p) : "—");

  return {
    build: {
      js: process.env.NEXT_PUBLIC_BUILD_ID ?? "dev",
      html: document.querySelector<HTMLMetaElement>('meta[name="hancook-build"]')?.content ?? "missing",
    },
    device: `${innerWidth}×${innerHeight} @${devicePixelRatio}x · ${navigator.userAgent}`,
    page: `age ${Math.round(performance.now())}ms · nav ${nav?.type ?? "?"} · ${document.visibilityState} · scrollY ${Math.round(scrollY)}`,
    reducedMotion: `reduce=${matchMedia("(prefers-reduced-motion: reduce)").matches} no-preference=${matchMedia("(prefers-reduced-motion: no-preference)").matches}`,
    intro: `data-hero-intro=${state ?? "(none)"} · hero element from page load: ${log ? (log.el === hero ? "yes" : "NO — re-rendered by React") : "no __neon (script did not run)"}`,
    phase: `${phase(state, t)}${t === null ? "" : ` · t=${t}ms`}`,
    parts: PARTS.map(([label, sel]) => {
      const el = q(sel);
      if (!el) return `${label}: missing`;
      const s = getComputedStyle(el);
      return `${label}: anim=${s.animationName} dur=${s.animationDuration} state=${s.animationPlayState} opacity=${(+s.opacity).toFixed(2)}${label === "drop" ? ` transform=${s.transform}` : ""}`;
    }),
    animations: anims.map((a) => {
      const el = (a.effect as KeyframeEffect).target as Element;
      const cls = [...el.classList].find((c) => c.startsWith("sign-") || c.startsWith("hero-")) ?? el.tagName;
      return `${name(a)} on .${cls}: ${a.playState} t=${a.currentTime == null ? "null" : Math.round(Number(a.currentTime))}`;
    }),
    textShadow: css(q(".sign-lit-red"), "text-shadow"),
    boxShadow: css(q(".sign-frame-lit"), "box-shadow"),
    events: log?.ev ?? [],
    errors: log?.err ?? [],
  };
}

function replay() {
  const hero = document.querySelector(HERO);
  if (!hero) return;
  window.__neon?.ev.push(`${Math.round(performance.now())} manual replay`);
  hero.setAttribute("data-hero-intro", "off");
  void (hero as HTMLElement).offsetWidth;
  hero.setAttribute("data-hero-intro", "wait");
  requestAnimationFrame(() => requestAnimationFrame(() => hero.setAttribute("data-hero-intro", "play")));
}

function Panel() {
  const [data, setData] = useState(collect);
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const started = performance.now();
    let id = 0;
    const tick = () => {
      setData(collect());
      id = window.setTimeout(tick, performance.now() - started < 4000 ? 100 : 500);
    };
    tick();
    return () => clearTimeout(id);
  }, []);

  const copy = async () => {
    const text = JSON.stringify(collect(), null, 2);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      window.prompt("Copy the report:", text);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const btn = "rounded border border-white/30 px-2 py-1 font-bold";
  return (
    <div
      role="region"
      aria-label="Neon debug"
      className="fixed inset-x-2 bottom-2 z-[200] max-h-[46vh] overflow-auto rounded-lg border border-amber/60 bg-black/90 p-2 font-mono text-[10px] leading-snug text-white"
    >
      <div className="sticky top-0 flex flex-wrap items-center gap-1.5 bg-black/90 pb-1">
        <strong className="text-amber">debugNeon</strong>
        <button type="button" className={btn} onClick={replay}>
          Replay
        </button>
        <button type="button" className={btn} onClick={copy}>
          {copied ? "Copied" : "Copy report"}
        </button>
        <button type="button" className={btn} onClick={() => setOpen((o) => !o)}>
          {open ? "Hide" : "Show"}
        </button>
      </div>
      {open && (
        <div className="space-y-1 break-all">
          <p>
            build js {data.build.js} · html {data.build.html}
          </p>
          <p>{data.page}</p>
          <p className={data.reducedMotion.startsWith("reduce=true") ? "text-red-400" : ""}>{data.reducedMotion}</p>
          <p>{data.intro}</p>
          <p className="text-amber">phase: {data.phase}</p>
          {data.parts.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="text-white/60">getAnimations() ({data.animations.length}):</p>
          {data.animations.map((a, i) => (
            <p key={i}>· {a}</p>
          ))}
          <p className="text-white/60">events:</p>
          {data.events.map((e, i) => (
            <p key={i}>· {e}</p>
          ))}
          {data.errors.length > 0 && <p className="text-red-400">errors: {data.errors.join(" | ")}</p>}
          <p className="text-white/60">text-shadow 한쿡: {data.textShadow}</p>
          <p className="text-white/60">box-shadow frame: {data.boxShadow}</p>
          <p className="text-white/60">{data.device}</p>
        </div>
      )}
    </div>
  );
}

export function NeonDebug() {
  const on = useSyncExternalStore(
    noopSubscribe,
    () => /[?&]debugNeon=1/.test(location.search),
    () => false,
  );
  return on ? <Panel /> : null;
}

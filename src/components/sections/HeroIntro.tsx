import { SsrScript } from "@/components/layout/SsrScript";

/**
 * Decides *when* the hero neon intro plays (the animation itself is CSS in globals.css).
 * Render it as the FIRST child of the hero <section>: the inline script runs while the page is
 * still parsing, before any sign markup exists, and marks its parent section:
 *   data-hero-intro="wait"  intro armed, every animation held on its first frame
 *   data-hero-intro="play"  running; the CSS animations play once and rest on their final, lit
 *                           frame (the idle hum keeps going) — nothing has to detect an "end".
 *
 * Root causes this fixes:
 *  - The intro was a plain CSS animation starting at HTML parse time. Mobile Safari often loads
 *    pages before showing them (address-bar / favourites preload, restored tabs, back/forward
 *    cache), so it could finish unseen. Now it only starts on a rendered frame while visible
 *    (requestAnimationFrame + visibilitychange / prerenderingchange; 1 s fallback so the hero
 *    copy can never stay hidden).
 *  - The previous version kept its state on <html> and removed it when a getAnimations()
 *    snapshot reported "all finished" — a snapshot whose timing depends on DOMContentLoaded and
 *    the engine, so on slow mobile loads it could end the intro right after the drop and the neon
 *    jumped straight to "lit". State now lives on the section and is never removed.
 *  - A language switch renders a new section without this script (see SsrScript), so the intro
 *    never replays there; scrolling never touches it.
 *  - Back/forward cache restore with the hero in view: replay ("off" for one style flush resets
 *    every animation incl. the hum, then re-arm — within one task, so never painted).
 * Reduced motion: the script does nothing and the CSS resting state is the fully lit sign.
 */
const script = `(function(){try{
var s=document.currentScript&&document.currentScript.parentElement,A="data-hero-intro",fb=0;
if(!s||!window.matchMedia||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
function visible(){return document.visibilityState!=="hidden"&&!document.prerendering}
function play(){if(!s.isConnected||s.getAttribute(A)!=="wait"||!visible())return;clearTimeout(fb);s.setAttribute(A,"play")}
function arm(){s.setAttribute(A,"wait");requestAnimationFrame(play);fb=setTimeout(play,1000)}
function onShow(){if(visible())requestAnimationFrame(play)}
document.addEventListener("visibilitychange",onShow);
document.addEventListener("prerenderingchange",onShow);
addEventListener("pageshow",function(e){
if(!e.persisted||!s.isConnected||scrollY>innerHeight*0.6)return;
s.setAttribute(A,"off");void s.offsetWidth;arm();
});
arm();
}catch(e){}})();`;

export function HeroIntro() {
  return <SsrScript code={script} />;
}

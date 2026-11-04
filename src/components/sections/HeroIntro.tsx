import { SsrScript } from "@/components/layout/SsrScript";

/**
 * Decides *when* the hero neon intro plays (the animation itself is CSS in globals.css).
 * Render it as the FIRST child of the hero <section>: the inline script runs while the page is
 * still parsing, before any sign markup exists, and marks its parent section:
 *   data-hero-intro="wait"  intro armed, every animation held on its first frame
 *   data-hero-intro="play"  running; the CSS animations play once and rest on their final, lit
 *                           frame (the idle hum keeps going) — nothing has to detect an "end".
 *
 * The intro must start on the first frame the visitor can actually see. Signals, in order:
 *  - page visible (visibilitychange / prerenderingchange cover background tabs and prerenders);
 *  - first contentful paint reported (Paint Timing; skipped where unsupported);
 *  - then the next requestAnimationFrame tick, i.e. the page is really producing frames.
 * There is deliberately NO plain timer that starts the intro: iOS Safari ("Preload Top Hit") and
 * Chrome for iOS ("Preload pages") load pages in a web view that is not on screen and produces no
 * frames, while timers keep running — a timer fallback played the whole intro there, unseen, and
 * the visitor got an already-lit sign. Without frames nothing is painted, so "wait" (copy hidden)
 * can never be seen; if frames run but Paint Timing never reports, a frame-armed fallback starts.
 *
 *  - A language switch renders a new section without this script (see SsrScript), so the intro
 *    never replays there; scrolling never touches it.
 *  - Back/forward cache restore with the hero in view: replay ("off" for one style flush resets
 *    every animation incl. the hum, then re-arm — within one task, so never painted).
 * Reduced motion: the script does nothing and the CSS resting state is the fully lit sign.
 * `window.__neon` keeps a tiny event log for the `?debugNeon=1` panel (NeonDebug).
 */
const script = `(function(){try{
var s=document.currentScript&&document.currentScript.parentElement,A="data-hero-intro",P=performance,painted=false,fb=0;
var N=window.__neon={el:s,ev:[],err:[]};
function log(e){N.ev.push(Math.round(P.now())+" "+e+" ["+document.visibilityState+"]")}
if(/[?&]debugNeon=1/.test(location.search)){
addEventListener("error",function(e){N.err.push(String(e.message||e.error))});
var ce=console.error;console.error=function(){N.err.push([].map.call(arguments,String).join(" ").slice(0,300));return ce.apply(console,arguments)};
}
log("script");
if(!s||!window.matchMedia)return;
if(matchMedia("(prefers-reduced-motion: reduce)").matches){log("reduced-motion: intro off");return}
function visible(){return document.visibilityState!=="hidden"&&!document.prerendering}
function start(){if(s.isConnected&&s.getAttribute(A)==="wait"&&visible()){s.setAttribute(A,"play");log("play")}}
function go(){if(s.getAttribute(A)!=="wait"||!visible())return;
requestAnimationFrame(function(){
if(!painted&&!fb)fb=setTimeout(function(){log("no paint entry, frame fallback");painted=true;go()},1200);
if(painted)start()})}
function arm(){s.setAttribute(A,"wait");log("wait");go()}
try{if(PerformanceObserver.supportedEntryTypes.indexOf("paint")<0)throw 0;
new PerformanceObserver(function(l,o){l.getEntries().forEach(function(e){if(e.name==="first-contentful-paint"&&!painted){painted=true;clearTimeout(fb);o.disconnect();log("fcp@"+Math.round(e.startTime));go()}})}).observe({type:"paint",buffered:true});
}catch(e){painted=true}
function onShow(){log("visibility");go()}
document.addEventListener("visibilitychange",onShow);
document.addEventListener("prerenderingchange",onShow);
addEventListener("pageshow",function(e){log("pageshow"+(e.persisted?" (bfcache)":""));
if(!e.persisted||!s.isConnected||scrollY>innerHeight*0.6)return;
s.setAttribute(A,"off");void s.offsetWidth;arm();
});
arm();
}catch(e){}})();`;

export function HeroIntro() {
  return <SsrScript code={script} />;
}

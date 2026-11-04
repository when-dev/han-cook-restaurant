import { SsrScript } from "./SsrScript";

/**
 * Start every *reload* at the top of the page — without breaking Back/Forward.
 *
 * Root cause: Next.js' App Router leaves `history.scrollRestoration` at the browser default
 * ("auto"), so browsers restore the old position on refresh. In addition our section links keep
 * `#section` in the URL, so a refresh also jumped to that anchor.
 *
 * Browsers read the restoration mode at different moments: Chrome and Firefox take it from the
 * history entry when the reload *starts* (setting it in the reloaded page is too late), WebKit /
 * iOS Safari reads it during the new load. So both ends are covered:
 *  - `pagehide` (fires on reload/leave in all browsers, incl. iOS) switches the outgoing entry to
 *    "manual" and remembers its scroll position;
 *  - in <head> of the new page, before first paint and before hydration: on a reload, keep
 *    "manual", drop the stale #hash (replaceState, no history entry) and sit at 0,0;
 *    on Back/Forward without bfcache, put the remembered position back (as the browser would);
 *  - iOS restores scroll partly in the app layer after the first layout, on its own schedule, so a
 *    reload also arms a one-shot guard: if the page moves *by itself* before the visitor touches,
 *    scrolls or presses a key, it goes straight back to 0 (no smooth scroll). The guard stops at the
 *    first user input or 1.5 s after `load`;
 *  - 1.5 s after `load`, restoration goes back to "auto" so in-app Back/Forward (e.g. after a
 *    language switch) behaves normally; a bfcache return (`pageshow.persisted`) does the same.
 * Fresh visits and deep links (/sk#menu) are untouched, and nothing is forced after that.
 * Listeners live for the document's lifetime only. Static markup → no hydration mismatch.
 */
const script = `(function(){try{
var h=history,K="hancook:scroll",canSet="scrollRestoration" in h,guard=null;
var n=performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];
var t=n?n.type:({1:"reload",2:"back_forward"})[performance.navigation&&performance.navigation.type]||"navigate";
var saved=null;try{saved=JSON.parse(sessionStorage.getItem(K)||"null");sessionStorage.removeItem(K)}catch(e){}
if(t==="reload"){
if(canSet)h.scrollRestoration="manual";
if(location.hash)h.replaceState(h.state,"",location.pathname+location.search);
scrollTo(0,0);
var touched=false,user=function(){touched=true};
["touchstart","wheel","keydown","mousedown"].forEach(function(e){addEventListener(e,user,{passive:true,once:true})});
guard=function(){if(!touched&&scrollY>0)scrollTo(0,0)};
addEventListener("scroll",guard,{passive:true});
}
addEventListener("load",function(){
setTimeout(function(){if(t==="back_forward"&&saved&&saved.u===location.href&&scrollY===0)scrollTo(0,saved.y)},0);
setTimeout(function(){if(guard)removeEventListener("scroll",guard);if(canSet)h.scrollRestoration="auto"},1500);
},{once:true});
addEventListener("pagehide",function(){
if(canSet)h.scrollRestoration="manual";
try{sessionStorage.setItem(K,JSON.stringify({u:location.href,y:Math.round(scrollY)}))}catch(e){}
});
addEventListener("pageshow",function(e){if(e.persisted&&canSet)h.scrollRestoration="auto"});
}catch(e){}})();`;

export function ScrollReset() {
  return <SsrScript code={script} />;
}

import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Every page is prerendered at build time (SSG, no revalidation), so serve that HTML/RSC from
 * Workers static assets instead of rendering on each request.
 *
 * Root cause of the dead mobile UI: with no cache configured OpenNext uses its "dummy" cache, so
 * every page view (and every RSC prefetch) re-rendered the whole page in the Worker. Under load
 * the Worker answered with 503s or stalled mid-response; a page whose HTML stream never finished
 * shows its server markup but React never hydrates — logo link reloads, menu/filters dead.
 * `enableCacheInterception` answers cached routes before Next.js is even loaded.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});

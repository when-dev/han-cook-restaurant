import { execSync } from "node:child_process";
import type { NextConfig } from "next";

/** Short commit + build time, shown by the `?debugNeon=1` panel to spot stale HTML / JS caches.
 *  Cloudflare Workers Builds exposes the commit as WORKERS_CI_COMMIT_SHA. */
function buildId() {
  let sha = process.env.WORKERS_CI_COMMIT_SHA;
  if (!sha) {
    try {
      sha = execSync("git rev-parse HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
    } catch {
      sha = "local";
    }
  }
  return `${sha.slice(0, 7)} ${new Date().toISOString().slice(0, 16)}Z`;
}

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  env: { NEXT_PUBLIC_BUILD_ID: buildId() },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    localPatterns: [{ pathname: "/images/**", search: "" }],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());

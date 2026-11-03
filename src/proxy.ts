import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

/**
 * Paths without a locale prefix redirect to Slovak (the default). A visitor who picked another
 * language before gets it back on "/" via the NEXT_LOCALE cookie set by the language switcher.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";
  // Files (robots.txt, sitemap.xml, images…) and already-prefixed paths pass through.
  if (isLocale(first) || /\.[\w]+$/.test(pathname)) return NextResponse.next();

  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  const locale = pathname === "/" && cookie && isLocale(cookie) ? cookie : defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/((?!_next|api|icon|apple-icon|opengraph-image|robots.txt|sitemap.xml|manifest.webmanifest).*)"],
};

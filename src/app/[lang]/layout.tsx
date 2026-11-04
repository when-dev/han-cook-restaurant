import type { Metadata, Viewport } from "next";
import { Black_Han_Sans, Bricolage_Grotesque, Noto_Sans_KR, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n";
import { I18nProvider } from "@/i18n/client";
import { isLocale, localeTags, locales } from "@/i18n/config";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BackToTop } from "@/components/layout/BackToTop";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { ScrollReset } from "@/components/layout/ScrollReset";
import { SmoothAnchors } from "@/components/layout/SmoothAnchors";
import { RestaurantJsonLd } from "@/components/JsonLd";
import "../globals.css";

// Latin display + body (with Slovak diacritics).
const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});
// Hangul: signage-style display + clean body. Google serves Korean in unicode-range slices,
// so only the glyphs actually used are downloaded; no preload to keep SK/EN pages lean.
const blackHan = Black_Han_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-blackhan",
  display: "swap",
  preload: false,
});
const notoKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-notokr",
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: { default: dict.meta.title, template: `%s · ${siteConfig.fullName}` },
    description: dict.meta.description,
    applicationName: siteConfig.fullName,
    keywords: [
      "HanCook",
      "한쿡",
      "Korean restaurant Bratislava",
      "kórejská reštaurácia Bratislava",
      "kimchi jjigae",
      "tteokbokki",
      "corn dog",
      "cup-bab",
      "Korean fried chicken",
      "soju",
    ],
    alternates: {
      canonical: `/${lang}`,
      languages: { ...Object.fromEntries(locales.map((l) => [localeTags[l].intl, `/${l}`])), "x-default": "/sk" },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.fullName,
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${lang}`,
      locale: localeTags[lang].og,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => localeTags[l].og),
    },
    twitter: { card: "summary_large_image", title: dict.meta.title, description: dict.meta.description },
    formatDetection: { telephone: false, address: false, email: false },
    // Proposal build: keep out of search indexes until the owner approves.
    robots: siteConfig.showConceptNote ? { index: false, follow: false } : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: "#0c0a0b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    // suppressHydrationWarning: browser translators/extensions add classes to <html> before
    // React hydrates. It only silences attribute diffs on this element, not its children.
    <html
      lang={localeTags[lang].intl}
      className={`${bricolage.variable} ${jakarta.variable} ${blackHan.variable} ${notoKr.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Must run before first paint: reset scroll on reload (see ScrollReset). */}
        <ScrollReset />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="bg-chili sr-only z-50 rounded-full px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {dict.a11y.skipToContent}
        </a>
        <I18nProvider locale={lang} dict={dict}>
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer dict={dict} />
          <MobileActionBar />
          <BackToTop />
          <SmoothAnchors />
        </I18nProvider>
        <RestaurantJsonLd locale={lang} description={dict.meta.description} />
      </body>
    </html>
  );
}

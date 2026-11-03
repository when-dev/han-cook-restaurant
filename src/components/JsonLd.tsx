import { siteConfig } from "@/config/site";
import { localeTags, type Locale } from "@/i18n/config";

/** schema.org Restaurant data for rich results. */
export function RestaurantJsonLd({ locale, description }: { locale: Locale; description: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.fullName,
    alternateName: siteConfig.koreanName,
    description,
    url: `${siteConfig.siteUrl}/${locale}`,
    image: `${siteConfig.siteUrl}/${locale}/opengraph-image`,
    telephone: siteConfig.phone,
    servesCuisine: ["Korean", "Korean street food"],
    priceRange: `€${siteConfig.priceRange.min}–${siteConfig.priceRange.max}`,
    inLanguage: localeTags[locale].intl,
    acceptsReservations: false,
    hasMenu: `${siteConfig.siteUrl}/${locale}#menu`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      postalCode: siteConfig.address.postalCode,
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: siteConfig.address.geo.lat, longitude: siteConfig.address.geo.lng },
    sameAs: [siteConfig.instagram.url],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

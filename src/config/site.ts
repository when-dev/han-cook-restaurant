/**
 * Single source of truth for business facts. Everything the owner may want to change
 * (phone, links, delivery platforms, hours) lives here — components never hardcode it.
 */

const mapsQuery = encodeURIComponent("HanCook Korean Restaurant, Obchodná 531/54, 811 03 Bratislava");

export type OrderPlatformId = "wolt" | "bolt" | "bistro" | "google";

export interface OrderPlatform {
  id: OrderPlatformId;
  name: string;
  /** Leave `null` until the real link is known — the UI renders an elegant "coming soon" state. */
  url: string | null;
  /** Brand-ish accent used for the platform chip. */
  accent: string;
}

export const siteConfig = {
  name: "HanCook",
  fullName: "HanCook Korean Restaurant",
  koreanName: "한쿡 한식당",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hancook.eu",

  address: {
    street: "Obchodná 531/54",
    postalCode: "811 03",
    city: "Bratislava",
    country: "SK",
    plusCode: "44X6+6P Bratislava",
    /** Decoded from the Plus Code. */
    geo: { lat: 48.1481, lng: 17.1116 },
  },

  /** Shown as dialled; `phoneHref` is used for tel: links. Verify with the owner. */
  phone: "+420 608 405 268",
  phoneHref: "tel:+420608405268",

  instagram: { handle: "@hancook.eu", url: "https://www.instagram.com/hancook.eu/" },

  maps: {
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
    placeUrl: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
    embedUrl: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
    /** Google reviews deep link — replace with the place's "write a review" link once known. */
    reviewsUrl: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  },

  /** Known from Google: "closes 10 pm". Confirm full weekly hours with the owner. */
  closingTime: "22:00",

  priceRange: { min: 10, max: 15, currency: "EUR" },

  order: [
    { id: "wolt", name: "Wolt", url: null, accent: "#00C2E8" },
    { id: "bolt", name: "Bolt Food", url: null, accent: "#34D186" },
    { id: "bistro", name: "Bistro.sk", url: null, accent: "#FF6B3D" },
    { id: "google", name: "Google Maps", url: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`, accent: "#FFC23D" },
  ] satisfies OrderPlatform[] as OrderPlatform[],

  /** Small footer note while this is a proposal build. Set to false once approved. */
  showConceptNote: true,
} as const;

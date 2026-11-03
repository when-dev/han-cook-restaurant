"use client";

import { Navigation, Phone, ShoppingBag } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/client";

/** Thumb-reach bar on phones: call, directions, order. */
export function MobileActionBar() {
  const { dict } = useI18n();
  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[0.7rem] font-semibold";
  return (
    <div className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-30 md:hidden">
      <div className="bg-ink/85 text-cream flex overflow-hidden rounded-2xl border border-white/10 shadow-[0_10px_40px_-8px_rgba(0,0,0,.8)] backdrop-blur-xl">
        <a href={siteConfig.phoneHref} className={item}>
          <Phone className="size-[1.1rem]" /> {dict.contact.call}
        </a>
        <a
          href={siteConfig.maps.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${item} border-x border-white/10`}
        >
          <Navigation className="size-[1.1rem]" /> {dict.contact.directions}
        </a>
        <a href="#order" className={`${item} bg-chili text-white`}>
          <ShoppingBag className="size-[1.1rem]" /> {dict.nav.order}
        </a>
      </div>
    </div>
  );
}

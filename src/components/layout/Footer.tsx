import { MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { fmt } from "@/lib/format";
import { navItems } from "@/lib/sections";
import { InstagramIcon } from "@/components/ui/Icons";
import { Wordmark } from "./Wordmark";

export function Footer({ dict }: { dict: Dictionary }) {
  const year = new Date().getFullYear();
  const heading = "mb-4 text-xs font-bold tracking-[0.2em] text-amber uppercase";
  const link = "text-cream/75 transition-colors hover:text-white";
  return (
    <footer className="bg-ink grain relative overflow-hidden border-t border-white/10 pt-16 pb-28 md:pb-12">
      <span
        aria-hidden="true"
        className="font-hangul pointer-events-none absolute -right-6 -bottom-10 text-[10rem] leading-none text-white/[0.03] select-none md:text-[16rem]"
      >
        한쿡
      </span>
      <div className="container-site relative grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Wordmark size="lg" />
          <p className="text-mute max-w-xs text-sm leading-relaxed">{dict.footer.tagline}</p>
          <p className="text-chili text-sm font-bold">{siteConfig.koreanName}</p>
        </div>

        <div>
          <h2 className={heading}>{dict.footer.navigation}</h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            {navItems(dict).map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>{dict.footer.visit}</h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a
                href={siteConfig.maps.placeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${link} flex gap-2`}
              >
                <MapPin className="text-chili mt-0.5 size-4 shrink-0" />
                <span>
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                </span>
              </a>
            </li>
            <li>
              <a href={siteConfig.phoneHref} className={`${link} flex gap-2`}>
                <Phone className="text-chili mt-0.5 size-4 shrink-0" />
                {siteConfig.phone}
              </a>
            </li>
            <li className="text-cream/75">{fmt(dict.contact.hoursValue, { time: siteConfig.closingTime })}</li>
          </ul>
        </div>

        <div>
          <h2 className={heading}>{dict.footer.follow}</h2>
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-colors hover:border-neon-pink/60"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#ffb627,#ff3d8b_55%,#7a3dff)] text-white">
              <InstagramIcon className="size-5" />
            </span>
            <span className="text-sm font-semibold text-cream group-hover:text-white">
              {siteConfig.instagram.handle}
            </span>
          </a>
        </div>
      </div>

      <div className="container-site relative mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-mute md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {siteConfig.fullName}. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}

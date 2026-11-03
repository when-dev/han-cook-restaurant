import { Clock, Hash, MapPin, Navigation, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { fmt } from "@/lib/format";
import { ButtonA } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact({ dict }: { dict: Dictionary }) {
  const c = dict.contact;
  const rows = [
    {
      icon: MapPin,
      label: c.address,
      value: `${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city}`,
      href: siteConfig.maps.placeUrl,
      external: true,
    },
    { icon: Phone, label: c.phone, value: siteConfig.phone, href: siteConfig.phoneHref },
    { icon: InstagramIcon, label: c.instagram, value: siteConfig.instagram.handle, href: siteConfig.instagram.url, external: true },
    { icon: Clock, label: c.hours, value: fmt(c.hoursValue, { time: siteConfig.closingTime }) },
    { icon: Hash, label: c.plusCode, value: siteConfig.address.plusCode },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-night grain relative overflow-hidden py-24 md:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col gap-10">
          <SectionHeading id="contact-title" kicker={c.kicker} hangul="오시는 길" title={c.title} />
          <dl className="flex flex-col divide-y divide-white/10 border-y border-white/10">
            {rows.map(({ icon: Icon, label, value, href, external }) => (
              <div key={label} className="flex items-center gap-4 py-4">
                <span className="bg-chili/15 text-chili flex size-11 shrink-0 items-center justify-center rounded-xl">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <dt className="text-mute text-xs font-bold tracking-[0.18em] uppercase">{label}</dt>
                  <dd className="text-cream mt-0.5 text-base font-semibold md:text-lg">
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="decoration-chili underline-offset-4 hover:underline"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3">
            <ButtonA href={siteConfig.phoneHref} variant="primary" size="lg">
              <Phone className="size-4" />
              {c.call}
            </ButtonA>
            <ButtonA href={siteConfig.maps.directionsUrl} external variant="cream" size="lg">
              <Navigation className="size-4" />
              {c.directions}
            </ButtonA>
            <ButtonA href={siteConfig.instagram.url} external variant="outline" size="lg">
              <InstagramIcon className="size-4" />
              Instagram
            </ButtonA>
          </div>
        </div>

        <div className="relative isolate min-h-[22rem] lg:min-h-full">
          <div aria-hidden="true" className="bg-chili absolute -inset-2 -z-10 rotate-[1.5deg] rounded-[2rem] opacity-70 blur-[2px]" />
          <div className="border-ink relative h-full min-h-[22rem] overflow-hidden rounded-[2rem] border-4 bg-coal">
            <iframe
              title={c.mapTitle}
              src={siteConfig.maps.embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full [filter:invert(.92)_hue-rotate(180deg)_saturate(.6)_contrast(.9)]"
            />
            <a
              href={siteConfig.maps.placeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ink/90 absolute right-4 bottom-4 left-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 p-4 backdrop-blur-md transition-colors hover:border-chili/60"
            >
              <span className="flex items-center gap-3">
                <span className="neon-frame flex size-10 font-black items-center justify-center rounded-lg text-sm">
                  <span className="neon-soft">한쿡</span>
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-cream font-bold">{siteConfig.fullName}</span>
                  <span className="text-mute text-sm">{siteConfig.address.street}</span>
                </span>
              </span>
              <span className="text-amber hidden text-sm font-bold whitespace-nowrap sm:inline">{c.maps} ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

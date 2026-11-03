import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { gallery } from "@/data/gallery";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { ButtonA } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DishMedia } from "@/components/menu/DishMedia";

function NeonTile() {
  return (
    <div className="bg-night absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,rgba(227,36,43,.35),transparent_60%)]">
      <div className="neon-frame flex flex-col items-center rounded-2xl px-8 py-5">
        <span className="font-hangul neon-red animate-flicker text-6xl leading-none md:text-7xl">한쿡</span>
        <span className="font-display neon-amber mt-2 text-lg font-extrabold tracking-[0.25em]">HANCOOK</span>
      </div>
    </div>
  );
}

export function Gallery({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const g = dict.gallery;
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-ink grain relative overflow-hidden py-24 md:py-32">
      <div className="container-site flex flex-col gap-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="gallery-title" kicker={g.kicker} hangul="갤러리" title={g.title} lead={g.lead} />
          <ButtonA href={siteConfig.instagram.url} external variant="outline" size="lg" className="self-start md:self-auto">
            <InstagramIcon className="size-4" />
            {g.follow}
            <ArrowUpRight className="size-4" />
          </ButtonA>
        </div>

        <ul className="grid auto-rows-[15rem] grid-cols-2 gap-3 md:auto-rows-[17rem] md:grid-cols-4 md:gap-4">
          {gallery.map((item) => (
            <li
              key={item.id}
              className={`group relative overflow-hidden rounded-[1.4rem] border border-white/10 ${item.wide ? "col-span-2" : ""}`}
            >
              {item.art === "sign" && !item.image ? (
                <NeonTile />
              ) : (
                <div className="absolute inset-0">
                <DishMedia
                  image={item.image}
                  alt={item.caption[locale]}
                  art={item.art}
                  hangul={item.hangul}
                  tone={item.tone}
                  sizes={item.wide ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  className="h-full w-full"
                />
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 pt-12">
                <p className="text-sm font-semibold text-white">{item.caption[locale]}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

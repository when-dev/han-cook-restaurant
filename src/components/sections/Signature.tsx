import { ArrowRight } from "lucide-react";
import { categoryLabels, signatureItems } from "@/data/menu";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { fmt, formatPrice } from "@/lib/format";
import { buttonClass } from "@/components/ui/Button";
import { DishMedia } from "@/components/menu/DishMedia";
import { SpicyMeter, dishNames } from "@/components/menu/MenuCard";

export function Signature({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const s = dict.signature;
  const [spotlight, ...rest] = signatureItems;
  if (!spotlight) return null;
  const spot = dishNames(spotlight, locale);

  return (
    <section id="signature" aria-labelledby="signature-title" className="bg-chili halftone relative overflow-hidden py-24 md:py-32">
      <span
        aria-hidden="true"
        className="font-hangul text-chili-deep/50 pointer-events-none absolute -top-8 -left-6 text-[9rem] leading-none whitespace-nowrap select-none md:text-[15rem]"
      >
        대표메뉴
      </span>
      <div className="container-site relative flex flex-col gap-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <p className="text-amber text-xs font-bold tracking-[0.22em] uppercase">{s.kicker}</p>
            <h2
              id="signature-title"
              className="font-display max-w-2xl text-[clamp(2.1rem,6vw,4rem)] leading-[0.98] font-extrabold tracking-[-0.03em] text-balance text-white"
            >
              {s.title}
            </h2>
            <p className="max-w-md text-base text-white/85 md:text-lg">{s.lead}</p>
          </div>
          <a href="#menu" className={buttonClass("cream", "lg", "self-start md:self-auto")}>
            {s.cta}
            <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
          </a>
        </div>

        {/* Spotlight */}
        <article className="group border-ink bg-ink grid overflow-hidden rounded-[2rem] border-4 shadow-[10px_10px_0_var(--color-ink)] md:grid-cols-[1.15fr_1fr]">
          <DishMedia
            image={spotlight.image}
            alt={`${spotlight.romanized} — ${spotlight.name[locale]}`}
            art={spotlight.art}
            itemId={spotlight.id}
            hangul={spotlight.name.ko}
            tone="ink"
            sizes="(min-width: 768px) 55vw, 100vw"
            className="aspect-[4/3] md:aspect-auto md:min-h-[26rem]"
          />
          <div className="paper flex flex-col justify-center gap-5 p-7 md:p-10">
            <span className="bg-ink text-amber w-fit rounded-full px-3 py-1 text-xs font-bold tracking-[0.18em] uppercase">
              ★ {s.spotlightLabel}
            </span>
            <div>
              <p className="font-hangul text-chili text-3xl leading-none md:text-4xl">{spotlight.name.ko}</p>
              <h3 className="font-display text-ink mt-2 text-4xl leading-[0.95] font-extrabold tracking-[-0.03em] md:text-5xl">
                {spot.headline}
              </h3>
              {locale !== "ko" && <p className="text-mute-ink mt-1 font-semibold">{spot.subline}</p>}
            </div>
            <p className="text-ink/75 max-w-md leading-relaxed">{spotlight.description[locale]}</p>
            <div className="flex items-center gap-4">
              <span className="font-display bg-chili rounded-full px-5 py-2 text-2xl font-extrabold text-white">
                {formatPrice(locale, spotlight.price)}
              </span>
              <SpicyMeter level={spotlight.spicy ?? 0} label={fmt(dict.a11y.spicyLevel, { level: spotlight.spicy ?? 0 })} />
            </div>
          </div>
        </article>

        {/* The rest of the signatures */}
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((item) => {
            const n = dishNames(item, locale);
            return (
              <li key={item.id}>
                <article className="group border-ink bg-cream flex h-full flex-col overflow-hidden rounded-[1.5rem] border-[3px] shadow-[6px_6px_0_var(--color-ink)] transition-transform duration-300 hover:-translate-y-1 hover:-rotate-1">
                  <DishMedia
                    image={item.image}
                    alt={`${item.romanized} — ${item.name[locale]}`}
                    art={item.art}
                    itemId={item.id}
                    hangul={item.name.ko}
                    tone={item.category === "chicken" ? "ink" : item.category === "corndog" ? "amber" : "cream"}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="border-ink aspect-square border-b-[3px]"
                  />
                  <div className="flex flex-1 flex-col gap-1 p-4">
                    <p className="text-chili text-[0.68rem] font-bold tracking-[0.18em] uppercase">
                      {categoryLabels[item.category][locale]}
                    </p>
                    <h3 className="font-display text-ink text-xl leading-tight font-extrabold tracking-tight">{n.headline}</h3>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <span className="text-mute-ink text-sm">{n.subline}</span>
                      <span className="font-display text-ink text-lg font-extrabold">{formatPrice(locale, item.price)}</span>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

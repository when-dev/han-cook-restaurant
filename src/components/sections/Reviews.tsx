import { Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import { reviews } from "@/data/reviews";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { fmt } from "@/lib/format";
import { ButtonA } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.8 3.3-8Z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.7c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.8A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.8 14.2a6.6 6.6 0 0 1 0-4.3V7H2.1a11 11 0 0 0 0 9.9l3.7-2.8Z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7l3.7 2.9C6.7 7.3 9.1 5.4 12 5.4Z" />
    </svg>
  );
}

export function Reviews({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const r = dict.reviews;
  const hasSamples = reviews.some((rv) => rv.sample);
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="paper relative overflow-hidden py-24 md:py-32">
      <span
        aria-hidden="true"
        className="font-hangul text-chili/[0.07] pointer-events-none absolute -right-10 bottom-0 text-[10rem] leading-none select-none md:text-[16rem]"
      >
        맛있다
      </span>
      <div className="container-site relative flex flex-col gap-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="reviews-title" tone="light" kicker={r.kicker} hangul="리뷰" title={r.title} lead={r.lead}>
            {hasSamples && <p className="text-ink/45 text-xs font-medium italic">{r.sample}</p>}
          </SectionHeading>
          <ButtonA
            href={siteConfig.maps.reviewsUrl}
            external
            variant="primary"
            size="lg"
            className="self-start md:self-auto"
          >
            <GoogleG className="size-5 rounded-full bg-white p-0.5" />
            {r.cta}
          </ButtonA>
        </div>

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((rv, i) => (
            <li key={rv.id}>
              <figure
                className={`border-ink bg-cream flex h-full flex-col gap-4 rounded-[1.5rem] border-2 p-6 shadow-[5px_5px_0_var(--color-ink)] ${i % 2 ? "lg:translate-y-6" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex gap-0.5" role="img" aria-label={fmt(dict.a11y.rating, { rating: rv.rating })}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className={`size-4 ${n <= rv.rating ? "fill-amber text-amber" : "text-ink/20"}`} />
                    ))}
                  </span>
                  <GoogleG className="size-5" />
                </div>
                <blockquote className="text-ink/85 flex-1 text-[0.95rem] leading-relaxed">“{rv.text[locale]}”</blockquote>
                <figcaption className="border-ink/10 flex items-center justify-between gap-3 border-t pt-4">
                  <span className="flex min-w-0 items-center gap-2.5">
                    {/* Fixed 36px circle: never stretched or squeezed by the flex row. */}
                    <span className="bg-ink text-amber font-display flex size-9 shrink-0 items-center justify-center rounded-full text-xs leading-none font-extrabold">
                      {rv.author.replace(/[^A-Z]/g, "").slice(0, 2)}
                    </span>
                    <span className="flex min-w-0 flex-col leading-tight">
                      <span className="text-ink text-sm font-bold">{rv.author}</span>
                      <span className="text-mute-ink text-xs">{r.source}</span>
                    </span>
                  </span>
                  {rv.dish && (
                    <span className="bg-chili/10 text-chili rounded-full px-2.5 py-1 text-[0.68rem] font-bold whitespace-nowrap">
                      {rv.dish}
                    </span>
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

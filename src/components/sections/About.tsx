import { Bike, ShoppingBag, UtensilsCrossed } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DishIllustration } from "@/components/menu/DishArt";

const pillarIcons = [UtensilsCrossed, ShoppingBag, Bike];

export function About({ dict }: { dict: Dictionary }) {
  const a = dict.about;
  return (
    <section id="about" aria-labelledby="about-title" className="bg-night grain relative overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="bg-ember/10 absolute top-1/2 -right-40 size-[28rem] -translate-y-1/2 rounded-full blur-[100px]" />
      <div className="container-site relative grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="flex flex-col gap-8">
          <SectionHeading id="about-title" kicker={a.kicker} hangul="이야기" title={a.title} />
          <div className="text-cream/80 flex max-w-xl flex-col gap-4 text-base leading-relaxed md:text-lg">
            {a.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="flex flex-wrap gap-2">
            {a.highlights.map((h) => (
              <li key={h} className="text-cream/85 rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-sm font-semibold">
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative isolate">
          <div className="paper relative overflow-hidden rounded-[2rem] p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,.9)] md:p-8">
            <span
              aria-hidden="true"
              className="font-hangul text-chili/10 pointer-events-none absolute -top-6 -right-4 text-[9rem] leading-none select-none"
            >
              한식
            </span>
            <div className="relative grid grid-cols-3 gap-3">
              {(["stew", "corndog", "chicken"] as const).map((art, i) => (
                <div key={art} className={`rounded-2xl ${i === 1 ? "bg-chili halftone" : "bg-kraft/50"} p-2`}>
                  <DishIllustration art={art} className="aspect-square w-full" />
                </div>
              ))}
            </div>
            <ul className="relative mt-6 flex flex-col divide-y divide-ink/10">
              {a.pillars.map((p, i) => {
                const Icon = pillarIcons[i];
                return (
                  <li key={p.title} className="flex items-center gap-4 py-4">
                    <span className="bg-ink text-amber flex size-11 shrink-0 items-center justify-center rounded-xl">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="font-display text-ink text-lg font-extrabold tracking-tight">{p.title}</p>
                      <p className="text-mute-ink text-sm">{p.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div aria-hidden="true" className="bg-chili absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-[2rem] opacity-80" />
        </div>
      </div>
    </section>
  );
}

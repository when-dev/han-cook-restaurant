import { ArrowUpRight, Phone } from "lucide-react";
import type { CSSProperties } from "react";
import { siteConfig, type OrderPlatform } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { fmt } from "@/lib/format";
import { ButtonA } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

function PlatformCard({ p, dict }: { p: OrderPlatform; dict: Dictionary }) {
  const name = p.id === "direct" ? dict.order.direct : p.name;
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 opacity-80 transition-opacity group-hover:opacity-100"
        style={{ background: p.accent, boxShadow: `0 0 24px ${p.accent}` }}
      />
      <span className="flex items-center justify-between gap-3">
        <span
          className="font-display text-ink flex size-11 shrink-0 items-center justify-center rounded-xl text-lg font-extrabold"
          style={{ background: p.accent }}
          aria-hidden="true"
        >
          {p.id === "direct" ? <span className="text-base font-black">한</span> : p.name[0]}
        </span>
        {p.url ? (
          <ArrowUpRight className="text-cream/50 size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
        ) : (
          <span className="shrink-0 rounded-full border border-white/15 px-2.5 py-1 text-[0.68rem] font-bold tracking-wide whitespace-nowrap text-cream/60 uppercase">
            {dict.order.soon}
          </span>
        )}
      </span>
      {/* Title + one description line, bottom-aligned so every card in a row lines up. */}
      <span className="mt-auto flex min-w-0 flex-col gap-1 pt-6">
        <span className="font-display text-cream text-lg leading-tight font-extrabold tracking-tight text-balance sm:text-xl">
          {name}
        </span>
        <span className="text-mute line-clamp-2 text-sm leading-snug">
          {p.url ? fmt(dict.order.orderVia, { name: p.name }) : dict.order.soonNote}
        </span>
      </span>
    </>
  );
  const cls =
    "group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5";
  if (!p.url) {
    return (
      <div className={`${cls} opacity-70`} aria-disabled="true">
        {inner}
      </div>
    );
  }
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cls} transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]`}
    >
      {inner}
    </a>
  );
}

/** Grid start (in half-card tracks) for the first card of an incomplete last row, per breakpoint. */
function lastRowStart(index: number, total: number): CSSProperties {
  const start = (cols: number) => {
    const rest = total % cols;
    return rest && index === total - rest ? cols - rest + 1 : undefined;
  };
  return { "--start-sm": start(2), "--start-lg": start(3) } as CSSProperties;
}

export function Order({ dict }: { dict: Dictionary }) {
  return (
    <section id="order" aria-labelledby="order-title" className="bg-coal grain relative overflow-hidden py-24 md:py-28">
      <div
        aria-hidden="true"
        className="bg-chili/20 absolute -top-32 left-1/2 size-[34rem] -translate-x-1/2 rounded-full blur-[120px]"
      />
      <div className="container-site relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="flex flex-col gap-8">
          <SectionHeading
            id="order-title"
            kicker={dict.order.kicker}
            hangul="배달"
            title={dict.order.title}
            lead={dict.order.lead}
          />
          <div className="flex flex-col gap-3">
            <p className="text-mute text-sm">{dict.order.callToOrder}</p>
            <ButtonA href={siteConfig.phoneHref} variant="primary" size="lg" className="self-start">
              <Phone className="size-4" />
              {siteConfig.phone}
            </ButtonA>
          </div>
        </div>
        {/* Equal cards: 2 per row on phones/tablets, 3 on desktop. The grid has twice as many
            tracks and every card spans two, so an incomplete last row can sit centred. */}
        <ul className="grid auto-rows-fr grid-cols-4 gap-3 md:gap-4 lg:grid-cols-6">
          {siteConfig.order.map((p, i, all) => (
            <li
              key={p.id}
              style={lastRowStart(i, all.length)}
              className="col-span-2 col-start-[var(--start-sm,auto)] lg:col-start-[var(--start-lg,auto)]"
            >
              <PlatformCard p={p} dict={dict} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

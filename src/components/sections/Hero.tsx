import { ArrowRight, Clock, MapPin, Navigation, Wallet } from "lucide-react";
import { siteConfig } from "@/config/site";
import { menuItems } from "@/data/menu";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { fmt, formatPrice } from "@/lib/format";
import { ButtonA, buttonClass } from "@/components/ui/Button";
import { DishIllustration } from "@/components/menu/DishArt";
import { HeroIntro } from "./HeroIntro";

function Ticket({
  id,
  locale,
  tone,
  className,
}: {
  id: string;
  locale: Locale;
  tone: "cream" | "red";
  /** Position/rotation plus the `hero-card-in` delay variables. */
  className: string;
}) {
  const item = menuItems.find((m) => m.id === id);
  if (!item) return null;
  const red = tone === "red";
  return (
    <div
      aria-hidden="true"
      className={`absolute w-44 rounded-2xl p-3 shadow-[0_24px_50px_-16px_rgba(0,0,0,.9)] ${red ? "bg-chili halftone text-white" : "paper"} ${className}`}
    >
      <div className={`rounded-xl ${red ? "bg-chili-deep/40" : "bg-kraft/40"}`}>
        <DishIllustration art={item.art} itemId={item.id} className="h-24 w-full" />
      </div>
      <p className={`mt-2 text-lg leading-none font-black ${red ? "text-amber" : "text-chili"}`}>{item.name.ko}</p>
      <div className="mt-1 flex items-end justify-between gap-2">
        <p className="font-display text-sm leading-tight font-extrabold">{item.romanized}</p>
        <p className="font-display text-sm font-extrabold whitespace-nowrap">{formatPrice(locale, item.price)}</p>
      </div>
    </div>
  );
}

/** Neon text = unlit glass tube underneath + lit copy on top (only its opacity animates). */
function NeonText({ text, color, ignite }: { text: string; color: "red" | "amber"; ignite: string }) {
  return (
    <span className="relative block">
      <span className={color === "red" ? "sign-tube-red" : "sign-tube-amber"}>{text}</span>
      <span
        aria-hidden="true"
        className={`absolute inset-0 ${color === "red" ? "sign-lit-red" : "sign-lit-amber"} ${ignite}`}
      >
        {text}
      </span>
    </span>
  );
}

function NeonSignboard({ locale }: { locale: Locale }) {
  return (
    <div className="sign-scene relative mx-auto aspect-[16/11] w-full max-w-[22rem] sm:aspect-[5/4] sm:max-w-[26rem] lg:max-w-[34rem]">
      {/* Light the sign throws on the wall: blooms when the neon comes on. */}
      <div aria-hidden="true" className="sign-ambient bg-chili/45 absolute inset-[12%] rounded-full blur-[70px]" />
      <div
        aria-hidden="true"
        className="sign-ambient absolute inset-x-[4%] bottom-[2%] h-[22%] bg-[radial-gradient(ellipse_at_50%_0%,rgba(227,36,43,.32),transparent_70%)]"
      />

      {/* The sign itself drops in on its wires, still dark. */}
      <div className="sign-drop absolute inset-0">
        <span aria-hidden="true" className="absolute -top-40 left-[22%] h-[calc(8%+10rem)] w-px bg-white/25" />
        <span aria-hidden="true" className="absolute -top-40 right-[22%] h-[calc(8%+10rem)] w-px bg-white/25" />
        <div className="sign-frame-off bg-ink/80 absolute inset-[8%_6%_14%] flex flex-col items-center justify-center rounded-[2rem]">
          <span
            aria-hidden="true"
            className="sign-frame-lit sign-ignite-frame pointer-events-none absolute -inset-[2px] rounded-[calc(2rem+2px)]"
          />
          <span
            aria-hidden="true"
            className="sign-boost pointer-events-none absolute -inset-[2px] rounded-[calc(2rem+2px)]"
          />
          <span className="font-hangul relative text-[clamp(4rem,19vw,9.5rem)] leading-[0.9]">
            <NeonText text="한쿡" color="red" ignite="sign-ignite-red" />
          </span>
          <span className="font-display relative mt-3 text-[clamp(1.4rem,6vw,2.4rem)] font-extrabold tracking-[0.2em]">
            <NeonText text="HANCOOK" color="amber" ignite="sign-ignite-amber" />
          </span>
          <span className="sign-subline text-cream/60 relative mt-2 text-[0.65rem] font-semibold tracking-[0.4em] uppercase">
            Korean Restaurant · <span className="font-bold tracking-normal">한식당</span>
          </span>
        </div>
      </div>

      <Ticket
        id="kimchi-jjigae"
        locale={locale}
        tone="cream"
        className="hero-card-in -bottom-6 -left-2 hidden -rotate-6 [--d-sm:1500ms] sm:block lg:-left-10"
      />
      <Ticket
        id="tteokbokki"
        locale={locale}
        tone="red"
        className="hero-card-in -right-2 -bottom-10 hidden rotate-[5deg] [--d-sm:1620ms] sm:block lg:-right-8"
      />
    </div>
  );
}

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = dict.hero;
  const chips = [
    { icon: Clock, text: fmt(h.openUntil, { time: siteConfig.closingTime }), live: true },
    { icon: Wallet, text: fmt(h.price, { min: siteConfig.priceRange.min, max: siteConfig.priceRange.max }) },
    { icon: MapPin, text: h.location },
  ];

  return (
    <section
      aria-labelledby="hero-title"
      className="bg-ink grain relative isolate overflow-hidden pt-20 pb-16 md:pt-32 lg:min-h-[100svh] lg:pb-24"
      // data-hero-intro is set by the inline HeroIntro script before hydration.
      suppressHydrationWarning
    >
      {/* Must stay the first child: marks this section before the sign markup is parsed. */}
      <HeroIntro />
      {/* Night-street atmosphere */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-chili/30 absolute -top-40 right-[-10%] size-[38rem] rounded-full blur-[120px]" />
        <div className="bg-ember/20 absolute bottom-[-12rem] left-[-10rem] size-[30rem] rounded-full blur-[110px]" />
        <div className="bg-neon-pink/15 absolute top-1/3 left-1/3 size-64 rounded-full blur-[90px]" />
        <div className="bg-neon-blue/10 absolute top-10 left-[8%] size-40 rounded-full blur-[70px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,var(--color-ink))]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.025)_0_1px,transparent_1px_120px)]" />
      </div>

      <div className="container-site grid items-center gap-14 lg:min-h-[calc(100svh-12rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="order-2 flex flex-col gap-7 lg:order-1">
          <p className="hero-in inline-flex w-fit items-center [--d-lg:450ms] [--d-sm:0ms] gap-2.5 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-xs font-bold tracking-[0.18em] text-cream/85 uppercase backdrop-blur">
            <span className="relative flex size-2">
              <span className="bg-chili absolute inset-0 animate-ping rounded-full opacity-70" />
              <span className="bg-chili relative size-2 rounded-full" />
            </span>
            {h.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="hero-in font-display flex flex-col [--d-lg:600ms] [--d-sm:60ms] font-extrabold tracking-[-0.035em]"
          >
            <span className="sr-only">HanCook — </span>
            <span className="text-cream text-[clamp(2.4rem,7.5vw,5rem)] leading-[0.95]">{h.titleTop}</span>
            {/* "Seoul at night": readable at once, its neon glow then gently intensifies. */}
            <span className="relative text-[clamp(2.9rem,9.5vw,6.4rem)] leading-[0.98]">
              <span className="neon-soft">{h.titleAccent}</span>
              <span
                aria-hidden="true"
                className="neon-red hero-glow-in absolute inset-0 [--d-lg:1000ms] [--d-sm:700ms]"
              >
                {h.titleAccent}
              </span>
            </span>
            <span className="text-mute mt-2 text-[clamp(1.25rem,3.4vw,2rem)] leading-tight font-bold tracking-[-0.02em]">
              {h.titleBottom}
            </span>
          </h1>

          <p className="hero-in text-cream/80 max-w-xl text-base [--d-lg:900ms] [--d-sm:140ms] leading-relaxed text-pretty md:text-lg">
            {h.lead}
          </p>

          <div className="hero-in flex flex-wrap gap-3 [--d-lg:1100ms] [--d-sm:200ms]">
            <a href="#menu" className={buttonClass("primary", "lg")}>
              {h.ctaMenu}
              <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
            </a>
            <a href="#order" className={buttonClass("cream", "lg")}>
              {h.ctaOrder}
            </a>
            <ButtonA href={siteConfig.maps.directionsUrl} external variant="outline" size="lg">
              <Navigation className="size-4" />
              {h.ctaDirections}
            </ButtonA>
          </div>

          <ul className="hero-in flex flex-wrap gap-x-6 gap-y-3 pt-2 text-sm [--d-lg:1750ms] [--d-sm:320ms]">
            {chips.map(({ icon: Icon, text, live }) => (
              <li key={text} className="text-cream/80 flex items-center gap-2">
                <Icon className={`size-4 ${live ? "text-[#4ade80]" : "text-amber"}`} />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 pt-4 lg:order-2 lg:pt-0">
          <NeonSignboard locale={locale} />
        </div>
      </div>
    </section>
  );
}

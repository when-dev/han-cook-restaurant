import { menuItems } from "@/data/menu";

const featured = [
  "kimchi-jjigae",
  "tteokbokki",
  "crunchy-corndog",
  "bulgogi-cupbab",
  "fried-chicken-yangnyeom",
  "mandu",
  "soju",
];

/** Red poster band with dish names scrolling in Hangul + Latin. */
export function Marquee() {
  const words = featured
    .map((id) => menuItems.find((m) => m.id === id))
    .filter((m) => m !== undefined)
    .flatMap((m) => [m.name.ko, m.romanized]);
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {words.map((w, i) => (
        <li key={`${w}-${i}`} className="flex items-center">
          <span
            className={`px-5 whitespace-nowrap ${i % 2 === 0 ? "font-hangul text-2xl md:text-3xl" : "font-display text-xl font-extrabold tracking-tight uppercase md:text-2xl"}`}
          >
            {w}
          </span>
          <span aria-hidden="true" className="text-amber text-lg">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="relative z-10 overflow-hidden py-3">
      <div className="bg-chili halftone -mx-4 -rotate-[1.2deg] overflow-hidden border-y-4 border-ink py-3.5 text-white shadow-[0_20px_40px_-20px_rgba(227,36,43,.8)]">
        <div className="animate-marquee flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}

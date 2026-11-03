import Image from "next/image";
import type { CategoryId, DishArt } from "@/data/menu";
import { DishIllustration } from "./DishArt";

export type PanelTone = "red" | "cream" | "amber" | "ink";

export const categoryTone: Record<CategoryId, PanelTone> = {
  soups: "red",
  cupbab: "cream",
  corndog: "amber",
  tteokbokki: "cream",
  chicken: "ink",
  snacks: "amber",
  drinks: "ink",
  alcohol: "red",
};

const toneClass: Record<PanelTone, { bg: string; mark: string }> = {
  red: { bg: "bg-chili halftone", mark: "text-chili-deep/70" },
  cream: { bg: "bg-paper", mark: "text-chili/15" },
  amber: { bg: "bg-amber halftone", mark: "text-ember/60" },
  ink: {
    bg: "bg-night bg-[radial-gradient(circle_at_50%_60%,rgba(227,36,43,.45),transparent_65%)]",
    mark: "text-white/[0.07]",
  },
};

/**
 * Dish visual: the real photo when `image` is set, otherwise a poster panel with the
 * illustration and the Hangul name as a big watermark.
 */
export function DishMedia({
  image,
  alt,
  art,
  itemId,
  hangul,
  tone,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  className = "",
}: {
  image?: string;
  alt: string;
  art: DishArt | "sign";
  itemId?: string;
  hangul: string;
  tone: PanelTone;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={image} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  const t = toneClass[tone];
  return (
    <div
      className={`relative isolate overflow-hidden [container-type:size] ${t.bg} ${className}`}
      role="img"
      aria-label={alt}
    >
      <span
        aria-hidden="true"
        style={{ fontSize: `min(${Math.round(88 / Math.max(hangul.length, 2))}cqw, 62cqh)` }}
        className={`font-hangul pointer-events-none absolute inset-0 -z-10 flex items-center justify-center leading-none whitespace-nowrap select-none ${t.mark}`}
      >
        {hangul}
      </span>
      <DishIllustration
        art={art}
        itemId={itemId}
        className="absolute inset-0 m-auto h-[82%] w-[82%] drop-shadow-[0_6px_0_rgba(0,0,0,.18)] transition-transform duration-500 ease-out group-hover:scale-[1.06] group-hover:-rotate-2"
      />
    </div>
  );
}

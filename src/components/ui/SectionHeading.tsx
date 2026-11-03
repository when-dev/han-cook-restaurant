import type { ReactNode } from "react";

/**
 * Section intro: small kicker with a Hangul tag, big display title, optional lead.
 * `tone` picks colours for dark (night) or light (paper) backgrounds.
 */
export function SectionHeading({
  kicker,
  hangul,
  title,
  lead,
  tone = "dark",
  align = "left",
  id,
  children,
}: {
  kicker: string;
  hangul: string;
  title: ReactNode;
  lead?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  id?: string;
  children?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <div className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : ""}`}>
      <p
        className={`inline-flex items-center gap-3 text-xs font-bold tracking-[0.22em] uppercase ${dark ? "text-amber" : "text-chili"}`}
      >
        {/* In Korean the kicker already is Hangul — don't repeat it. */}
        {hangul !== kicker && (
          <>
            <span className={`text-sm font-black tracking-normal ${dark ? "text-chili" : "text-ink"}`}>{hangul}</span>
            <span aria-hidden="true" className={`h-px w-8 ${dark ? "bg-amber/60" : "bg-chili/60"}`} />
          </>
        )}
        {kicker}
      </p>
      <h2
        id={id}
        className={`font-display max-w-3xl text-[clamp(2.1rem,6vw,4rem)] leading-[0.98] font-extrabold tracking-[-0.03em] text-balance ${dark ? "text-cream" : "text-ink"}`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`max-w-xl text-base leading-relaxed text-pretty md:text-lg ${dark ? "text-mute" : "text-mute-ink"}`}>
          {lead}
        </p>
      )}
      {children}
    </div>
  );
}

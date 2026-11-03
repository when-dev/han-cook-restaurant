/** HanCook wordmark: Latin name with the Hangul "한쿡" tag lit like the shop sign. */
export function Wordmark({ size = "md" }: { size?: "md" | "lg" }) {
  const lg = size === "lg";
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={`neon-frame inline-flex font-black items-center justify-center rounded-lg leading-none ${lg ? "h-12 px-3 text-2xl" : "h-9 px-2 text-lg"}`}
      >
        <span className="neon-soft">한쿡</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display font-extrabold tracking-[-0.03em] text-cream ${lg ? "text-3xl" : "text-[1.35rem]"}`}>
          Han<span className="text-chili">Cook</span>
        </span>
        <span
          className={`font-semibold tracking-[0.28em] text-mute uppercase ${lg ? "mt-1.5 text-[0.7rem]" : "mt-1 text-[0.55rem]"}`}
        >
          Korean Restaurant
        </span>
      </span>
    </span>
  );
}

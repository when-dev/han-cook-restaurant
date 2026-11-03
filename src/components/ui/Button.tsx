import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "cream" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight whitespace-nowrap transition-all duration-300 ease-out focus-visible:outline-offset-4 active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary: "bg-chili text-white glow-red hover:bg-[#f2333a] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(255,140,120,.5),0_14px_38px_-8px_rgba(227,36,43,.95),0_0_70px_-8px_rgba(255,90,60,.8)]",
  outline:
    "border border-white/25 bg-white/5 text-cream backdrop-blur-sm hover:border-amber/70 hover:bg-white/10 hover:text-white hover:-translate-y-0.5",
  cream: "bg-cream text-ink hover:bg-white hover:-translate-y-0.5 shadow-[0_8px_24px_-10px_rgba(0,0,0,.5)]",
  ghost: "text-cream/85 hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

/** Internal link (anchor or route) styled as a button. */
export function ButtonLink({
  variant,
  size,
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size; children: ReactNode }) {
  return (
    <Link {...props} className={buttonClass(variant, size, className)}>
      {children}
    </Link>
  );
}

/** External link (tel:, maps, social) styled as a button. */
export function ButtonA({
  variant,
  size,
  className = "",
  external = false,
  children,
  ...props
}: ComponentProps<"a"> & { variant?: Variant; size?: Size; external?: boolean; children: ReactNode }) {
  return (
    <a
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={buttonClass(variant, size, className)}
    >
      {children}
    </a>
  );
}

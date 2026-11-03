import type { SVGProps } from "react";

/** Brand icons that lucide no longer ships. */
export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Little chili used for spice levels. */
export function ChiliIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M15.5 4.5c.4-1.3 1.6-2 2.8-1.8" fill="none" stroke="#3a8c3a" strokeWidth={2} strokeLinecap="round" />
      <path
        d="M14 6.2c2.6-.9 5 1 4.6 3.9-.6 4.8-5.6 10.6-12.4 11.4-1.4.2-1.8-1.3-.6-1.9 4-2 6-5.4 6.4-9.6.2-1.8.6-3.2 2-3.8Z"
        fill="currentColor"
      />
      <path d="M15.2 8.2c-.8.6-1 1.6-1.1 2.6" fill="none" stroke="#fff" strokeOpacity={0.5} strokeWidth={1.4} strokeLinecap="round" />
    </svg>
  );
}

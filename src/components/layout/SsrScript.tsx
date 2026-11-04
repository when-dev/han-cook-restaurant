"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Inline <script> that exists only in the server HTML, where the browser runs it while parsing
 * (before first paint and hydration). It is matched once during hydration and then removed, so
 * React never *creates* a <script> in the browser — e.g. on a language switch — which would not
 * run anyway and logs a warning. Anything the script registers on window/document stays alive.
 */
export function SsrScript({ code }: { code: string }) {
  const hydrating = useSyncExternalStore(
    noopSubscribe,
    () => false, // client renders after hydration
    () => true, // server render + hydration pass
  );
  return hydrating ? <script dangerouslySetInnerHTML={{ __html: code }} /> : null;
}

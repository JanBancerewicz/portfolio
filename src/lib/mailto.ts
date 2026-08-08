import { useEffect, useState } from "react";
import { site } from "../data/site";

/**
 * Address handling, built so the address never sits in a scrapable artefact.
 *
 * Harvesters read two things off a static site: the HTML the server hands out
 * (here, the prerendered files) and the JS bundle next to it. A `mailto:` href
 * loses on both counts, and so does any component that renders the address
 * during SSR. So the address ships base64-of-reversed in `site.ts`, is only
 * ever assembled by `decodeEmail()` — which runs in the browser, after mount or
 * inside an event handler, never during prerender — and links out to Gmail's
 * compose window instead of the `mailto:` protocol, which also means it works
 * for the many visitors with no mail client registered.
 *
 * This stops bulk harvesting, not a determined human: anyone who runs the page
 * and looks gets the address, which is the point.
 */

/** Reverses the obfuscation in `site.emailObfuscated`. Browser-side only. */
export function decodeEmail(): string {
  return [...atob(site.emailObfuscated)].reverse().join("");
}

/** Opens a compose window in the browser — works even when OS `mailto:` is unset. */
export function composeHref(address: string): string {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(address)}`;
}

/**
 * `null` during prerender and on the first client render, the real address
 * afterwards. The null pass is what keeps it out of the static HTML — and it
 * has to be an effect rather than a lazy `useState` initialiser, or hydration
 * would mismatch the markup the server wrote.
 */
export function useEmail(): string | null {
  const [address, setAddress] = useState<string | null>(null);
  useEffect(() => setAddress(decodeEmail()), []);
  return address;
}

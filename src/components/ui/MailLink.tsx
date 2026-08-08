import type { ReactNode } from "react";
import { composeHref, useEmail } from "../../lib/mailto";

/**
 * The only place the email address is ever rendered.
 *
 * Until the address resolves — during prerender, and for the first client
 * render — the link carries no `href` and shows a label instead, so neither
 * the static HTML nor a crawler that does not execute JavaScript ever sees an
 * address. See `src/lib/mailto.ts` for why.
 */
export function MailLink({
  children,
  trailing,
  className,
}: {
  /** Overrides the label. Omit to show the address itself. */
  children?: ReactNode;
  /** Sits after the label — the arrow the button CTAs carry. */
  trailing?: ReactNode;
  className?: string;
}) {
  const address = useEmail();

  return (
    <a
      href={address ? composeHref(address) : undefined}
      target="_blank"
      rel="noreferrer noopener nofollow"
      className={className}
    >
      {children ?? address ?? "Email me"}
      {trailing}
    </a>
  );
}

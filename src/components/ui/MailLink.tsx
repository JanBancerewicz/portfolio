import type { ReactNode } from "react";
import { site } from "../../data/site";
import { gmailComposeHref } from "../../lib/mailto";

/** Email CTA — opens Gmail compose (no clipboard, no mailto protocol). */
export function MailLink({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={gmailComposeHref}
      target="_blank"
      rel="noreferrer noopener"
      className={className}
    >
      {children ?? site.email}
    </a>
  );
}

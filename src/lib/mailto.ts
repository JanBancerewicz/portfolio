import { site } from "../data/site";

/** Opens a compose window in the browser — works even when OS `mailto:` is unset. */
export const gmailComposeHref =
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}` as const;

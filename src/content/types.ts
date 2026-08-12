import type { ComponentType } from "react";
import type { GlossaryEntry } from "../components/mdx/glossaryIds";

export type ContentKind = "project" | "post";

export type ContentLink = {
  label: "GitHub" | "Demo" | "Website" | "Devpost" | "Paper";
  href: string;
};

export type ContentMeta = {
  slug: string;
  title: string;
  summary: string;
  cover: string;
  tags: string[];
  /** Sort key: `YYYY` for projects, `YYYY-MM-DD` for posts. */
  date: string;
  /**
   * Projects only — explicit display rank (lower = earlier).
   * Posts are sorted by `date` instead.
   */
  order?: number;
  /** Eyebrow shown on cards. */
  category: string;
  /** Projects only — pulls the entry into the featured showcase. */
  featured?: boolean;
  /** Projects only. */
  role?: string;
  links?: ContentLink[];

  /**
   * Projects only — the vertical 9:16 still shown on the carousel. Generated
   * as `poster.svg` alongside the entry until a real frame exists.
   */
  poster?: string;
  /**
   * Projects only — 2:1 editorial cover for the homepage #work lead slot.
   * Generated as `cover-featured.svg` when extras includes "featured".
   */
  coverFeatured?: string;
  /**
   * Posts only — ~7:3 editorial cover for /blog ladder rows.
   * Generated as `cover-wide.svg` (1350×555). Falls back to `cover`.
   */
  coverWide?: string;
  /**
   * Projects only — an ~8s vertical clip that autoplays, loops and is muted
   * on the carousel. Drop an `.mp4` next to `index.mdx`, import it, and set
   * this; the poster shows through until it is set.
   */
  reel?: string;
  /**
   * Projects only — one or two lines, written like a short's caption rather
   * than a case-study summary. Falls back to `summary`.
   */
  reelCaption?: string;
  /** Posts only. */
  readingTime?: string;
};

export type MdxComponents = {
  [key: string]: ComponentType<Record<string, unknown>>;
};

export type ContentEntry = {
  kind: ContentKind;
  meta: ContentMeta;
  Component: ComponentType<{ components?: MdxComponents }>;
  /** Term definitions shown above the article body. Empty = structure only. */
  glossary: GlossaryEntry[];
};

export type MdxContentModule = {
  default: ComponentType<{ components?: MdxComponents }>;
  meta: ContentMeta;
  glossary?: GlossaryEntry[];
};

export type { GlossaryEntry };

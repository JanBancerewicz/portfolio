import type { ComponentType } from "react";

export type ContentAccent = "cyan" | "violet" | "amber" | "rose";

export type ContentLink = {
  label: "GitHub" | "Demo" | "Case Study" | "Website" | "Devpost";
  href: string;
};

export type ContentMeta = {
  slug: string;
  title: string;
  summary: string;
  cover: string;
  tags: string[];
  accent: ContentAccent;
  year?: string;
  category?: string;
  result?: string;
  role?: string;
  date?: string;
  links?: ContentLink[];
};

export type ContentEntry = {
  kind: "project" | "hackathon";
  meta: ContentMeta;
  Component: ComponentType;
};

export type MdxContentModule = {
  default: ComponentType;
  meta: ContentMeta;
};

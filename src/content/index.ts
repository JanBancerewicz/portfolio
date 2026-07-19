import type { ContentEntry, MdxContentModule } from "./types";

const projectModules = import.meta.glob<MdxContentModule>(
  "./projects/*/index.mdx",
  { eager: true },
);

const hackathonModules = import.meta.glob<MdxContentModule>(
  "./hackathons/*/index.mdx",
  { eager: true },
);

function byYearDesc(a: ContentEntry, b: ContentEntry) {
  return Number(b.meta.year ?? 0) - Number(a.meta.year ?? 0);
}

function toEntries(
  modules: Record<string, MdxContentModule>,
  kind: ContentEntry["kind"],
) {
  return Object.values(modules)
    .map((module) => ({
      kind,
      meta: module.meta,
      Component: module.default,
    }))
    .sort(byYearDesc);
}

export const projectEntries = toEntries(projectModules, "project");
export const hackathonEntries = toEntries(hackathonModules, "hackathon");

export function findContentEntry(kind: ContentEntry["kind"], slug?: string) {
  const entries = kind === "project" ? projectEntries : hackathonEntries;

  return entries.find((entry) => entry.meta.slug === slug);
}

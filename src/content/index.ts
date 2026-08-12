import type { ContentEntry, ContentKind, MdxContentModule } from "./types";

const projectModules = import.meta.glob<MdxContentModule>(
  "./projects/*/index.mdx",
  { eager: true },
);

const postModules = import.meta.glob<MdxContentModule>("./blog/*/index.mdx", {
  eager: true,
});

function byDateDesc(a: ContentEntry, b: ContentEntry) {
  return b.meta.date.localeCompare(a.meta.date);
}

function toEntries(
  modules: Record<string, MdxContentModule>,
  kind: ContentKind,
): ContentEntry[] {
  return Object.values(modules)
    .map((module) => ({
      kind,
      meta: module.meta,
      Component: module.default,
      glossary: module.glossary ?? [],
    }))
    .sort(byDateDesc);
}

export const projectEntries = toEntries(projectModules, "project");
export const postEntries = toEntries(postModules, "post");

export const featuredProjects = projectEntries.filter(
  (entry) => entry.meta.featured,
);

export function findProject(slug?: string) {
  return projectEntries.find((entry) => entry.meta.slug === slug);
}

export function findPost(slug?: string) {
  return postEntries.find((entry) => entry.meta.slug === slug);
}

/** Every content route, used by the prerender step to emit static directories. */
export const contentRoutes = [
  ...projectEntries.map((entry) => `/projects/${entry.meta.slug}`),
  ...postEntries.map((entry) => `/blog/${entry.meta.slug}`),
];

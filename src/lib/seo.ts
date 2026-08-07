import { postEntries, projectEntries } from "../content";
import { site } from "../data/site";

/**
 * Per-route page metadata.
 *
 * Every prerendered route used to ship the one `<title>` and description baked
 * into `index.html`, so all twelve pages looked identical to a crawler and an
 * article's own title never reached a search result. The prerender step now
 * asks for these and rewrites the head per file.
 */

export type PageMeta = {
  title: string;
  description: string;
  /** Route-relative image path, resolved against the site URL at build time. */
  image?: string;
  type: "website" | "article";
  /** ISO date, articles only. */
  published?: string;
};

const SITE_TITLE = `${site.name} — ${site.role}`;

const STATIC: Record<string, PageMeta> = {
  "/": {
    title: SITE_TITLE,
    description:
      "Applied machine learning — LLM interpretability, computer vision and model optimization — and the software systems that carry them in production. Projects, internships, hackathons and writing.",
    type: "website",
  },
  "/projects": {
    title: `Projects — ${site.name}`,
    description:
      "Selected applied-ML and software work: LLM interpretability research, computer vision pipelines, on-device inference and production systems. Each with a write-up of the decisions and the numbers.",
    type: "website",
  },
  "/blog": {
    title: `Writing — ${site.name}`,
    description:
      "Write-ups on LLMs, computer vision, evaluation and the tooling around them — the things that took longest to figure out.",
    type: "website",
  },
};

export function metaFor(route: string): PageMeta {
  const clean = route.replace(/\/+$/, "") || "/";
  if (STATIC[clean]) return STATIC[clean];

  const slug = clean.split("/").pop();

  const post = postEntries.find((entry) => entry.meta.slug === slug);
  if (post && clean.startsWith("/blog/")) {
    return {
      title: `${post.meta.title} — ${site.name}`,
      description: post.meta.summary,
      image: post.meta.cover,
      type: "article",
      published: post.meta.date,
    };
  }

  const project = projectEntries.find((entry) => entry.meta.slug === slug);
  if (project && clean.startsWith("/projects/")) {
    return {
      title: `${project.meta.title} — ${project.meta.category} — ${site.name}`,
      description: project.meta.summary,
      image: project.meta.cover,
      type: "article",
      published: project.meta.date,
    };
  }

  return { title: SITE_TITLE, description: STATIC["/"].description, type: "website" };
}

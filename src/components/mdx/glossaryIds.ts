/** Stable DOM id for a glossary entry, shared by Term links and Glossary rows. */
export function glossaryTermId(term: string): string {
  return `glossary-${term
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

export type GlossaryEntry = {
  term: string;
  definition: string;
};

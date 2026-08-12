import { glossaryTermId, type GlossaryEntry } from "./glossaryIds";

export type { GlossaryEntry };

/**
 * Collapsible term-definitions panel. Rendered from ArticlePage for every
 * project / post; `<Term>` links jump here and open the panel.
 */
export function Glossary({
  entries,
  title = "Term definitions",
}: {
  entries: GlossaryEntry[];
  title?: string;
}) {
  return (
    <details id="article-glossary" className="glossary">
      <summary className="glossary-summary">
        <span>{title}</span>
        <span className="glossary-count">
          {entries.length === 0
            ? "coming soon"
            : `${entries.length} term${entries.length === 1 ? "" : "s"}`}
        </span>
      </summary>
      {entries.length > 0 ? (
        <dl className="glossary-list">
          {[...entries]
            .sort((a, b) =>
              a.term.localeCompare(b.term, undefined, { sensitivity: "base" }),
            )
            .map((entry) => (
              <div
                key={entry.term}
                id={glossaryTermId(entry.term)}
                className="glossary-entry"
              >
                <dt>{entry.term}</dt>
                <dd>{entry.definition}</dd>
              </div>
            ))}
        </dl>
      ) : (
        <p className="glossary-empty">
          Definitions for this piece will land here. Inline terms in the body
          will link into this panel once they are filled in.
        </p>
      )}
    </details>
  );
}

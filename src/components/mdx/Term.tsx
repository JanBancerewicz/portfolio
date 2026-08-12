import type { ReactNode } from "react";
import { glossaryTermId } from "./glossaryIds";

/**
 * Inline glossary link. Highlights the term and, on click, opens the page
 * glossary panel and scrolls to the matching definition.
 */
export function Term({ children }: { children: ReactNode }) {
  const label = flattenLabel(children);
  const id = glossaryTermId(label);

  return (
    <a
      href={`#${id}`}
      className="term"
      onClick={(event) => {
        event.preventDefault();
        openGlossaryAndFocus(id);
      }}
    >
      {children}
    </a>
  );
}

function flattenLabel(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(flattenLabel).join("");
  }
  return "";
}

function openGlossaryAndFocus(termId: string) {
  const panel = document.getElementById("article-glossary");
  if (panel instanceof HTMLDetailsElement) {
    panel.open = true;
  }

  const target = document.getElementById(termId);
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "nearest" });
  target.classList.remove("glossary-entry--flash");
  // Retrigger the highlight animation if the same term is clicked again.
  void target.offsetWidth;
  target.classList.add("glossary-entry--flash");
  window.setTimeout(() => {
    target.classList.remove("glossary-entry--flash");
  }, 1200);
}

import {
  useEffect,
  useState,
  type MouseEvent,
  type RefObject,
} from "react";

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
  /** True when this h3 sits under a preceding h2 (visual indent). */
  nested: boolean;
};

export type ArticleTocState = {
  items: TocItem[];
  activeId: string | null;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, id: string) => void;
};

/** Scan article headings, track the active section, handle in-page jumps. */
export function useArticleToc(
  contentRef: RefObject<HTMLElement | null>,
  /** Re-scan when the article identity changes (slug / kind). */
  scanKey: string,
): ArticleTocState {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const nextItems = collectTocItems(root);
    setItems(nextItems);
    setActiveId(nextItems[0]?.id ?? null);

    if (nextItems.length === 0) return;

    const elements = nextItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const nextActive = nextItems.find((item) => visible.has(item.id));
        if (nextActive) setActiveId(nextActive.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 1] },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [contentRef, scanKey]);

  function onNavigate(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  }

  return { items, activeId, onNavigate };
}

/**
 * Sticky in-section TOC (left rail). Lives inside the article body grid so it
 * cannot float above the glossary. Term definitions stay out of this list.
 */
export function ArticleTocNav({ toc }: { toc: ArticleTocState }) {
  const { items, activeId, onNavigate } = toc;
  if (items.length === 0) return null;

  return (
    <nav className="article-toc" aria-label="On this page">
      <p className="label article-toc-heading">On this page</p>
      <ol className="article-toc-list">
        {items.map((item) => (
          <li
            key={item.id}
            className={[
              "article-toc-item",
              item.level === 2 ? "article-toc-item--h2" : "article-toc-item--h3",
              item.nested ? "article-toc-item--nested" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <a
              href={`#${item.id}`}
              className={`article-toc-link${activeId === item.id ? " is-active" : ""}`}
              onClick={(event) => onNavigate(event, item.id)}
              aria-current={activeId === item.id ? "location" : undefined}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function collectTocItems(root: HTMLElement): TocItem[] {
  const used = new Set<string>();
  const items: TocItem[] = [];
  let seenH2 = false;

  for (const heading of root.querySelectorAll("h2, h3")) {
    if (!(heading instanceof HTMLElement)) continue;
    const text = heading.textContent?.trim() ?? "";
    if (!text) continue;

    const isH2 = heading.tagName === "H2";
    if (isH2) seenH2 = true;

    const baseId = heading.id || slugify(text);
    const id = uniqueId(baseId, used);
    used.add(id);
    heading.id = id;

    items.push({
      id,
      text,
      level: isH2 ? 2 : 3,
      nested: !isH2 && seenH2,
    });
  }

  return items;
}

function slugify(text: string): string {
  const slug = text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return slug || "section";
}

function uniqueId(base: string, used: Set<string>): string {
  if (!used.has(base)) return base;
  let n = 2;
  while (used.has(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
}

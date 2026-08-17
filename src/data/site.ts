/**
 * Single source of truth for identity, navigation and contact.
 * Everything marked PLACEHOLDER is safe to rewrite without touching components.
 */

export const site = {
  name: "Jan Bancerewicz",
  initials: "JB",
  role: "AI & software developer",
  tagline:
    "I work on applied machine learning: LLM interpretability, computer vision, and model optimization – as well as the full-stack systems needed to carry them in production. Final-year CS student at Gdańsk Tech with over 1 year of commercial experience in IT, spending my free time competing at hackathons and conducting AI research.",
  location: "Gdańsk, Poland",
  timezone: "Europe/Warsaw",
  availability: {
    open: true,
    label: "Open to AI/ML / full-stack roles",
    detail: "Available for full-time roles",
  },
  /**
   * The address, base64 of its own reversal — never a literal anywhere in the
   * repo, the JS bundle or the prerendered HTML. `src/lib/mailto.ts` is the
   * only thing that decodes it, and only in the browser after mount, so an
   * address harvester scraping either artefact finds nothing to match.
   * Regenerate with:
   *   node -e 'console.log(Buffer.from([...process.argv[1]].reverse().join("")).toString("base64"))' you@example.com
   */
  emailObfuscated: "bW9jLmxpYW1nQGp6Y2l3ZXJlY25hYg==",
  links: {
    linkedin: "https://www.linkedin.com/in/jan-bancerewicz/",
    github: "https://github.com/JanBancerewicz",
    orcid: "https://orcid.org/0009-0001-3898-5576",
    /**
     * Served from `public/`, so the path has to carry the deploy base — on a
     * project site the app lives under `/<repo>/` and a bare `/resume.pdf`
     * resolves to the domain root, which is somebody else's 404.
     */
    cv: `${import.meta.env.BASE_URL}pdfs/CV_JanBancerewicz.pdf`,
  },
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Hackathons", href: "/#hackathons" },
  { label: "Experience", href: "/#experience" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
] as const;

/** Numbers shown next to the hero. Keep them to things you can defend. */
export const stats = [
  { value: 23, suffix: "+", label: "Projects shipped" },
  { value: 6, suffix: "", label: "Hackathons entered" },
  { value: 8, suffix: "+", label: "Certifications earned" },
  { value: 1, suffix: "+", label: "Years of commercial xp" },
] as const;

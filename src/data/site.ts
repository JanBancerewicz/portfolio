/**
 * Single source of truth for identity, navigation and contact.
 * Everything marked PLACEHOLDER is safe to rewrite without touching components.
 */

export const site = {
  name: "Jan Bancerewicz",
  initials: "JB",
  role: "AI & software developer",
  tagline:
    // "I work on applied machine learning — LLM interpretability, computer vision and biosignal models — and on the software that has to carry them in production.",
    "I work on applied machine learning — LLM interpretability, computer vision, and model optimization — as well as the software systems needed to carry them in production. Final-year CS student at Gdańsk Tech, spending my free time competing at hackathons and conducting AI research.",
  location: "Gdańsk, Poland",
  timezone: "Europe/Warsaw",
  availability: {
    open: true,
    label: "Open to AI/ML roles & internships",
    detail: "Available for full-time roles",
  },
  email: "bancerewiczj@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/jan-bancerewicz/",
    github: "https://github.com/JanBancerewicz",
    orcid: "https://orcid.org/0009-0001-3898-5576",
    cv: "/resume.pdf",
  },
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Hackathons", href: "/#hackathons" },
  { label: "Certificates", href: "/#certificates" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
] as const;

/** Numbers shown next to the hero. Keep them to things you can defend. */
export const stats = [
  { value: 23, suffix: "+", label: "Projects shipped" },
  { value: 6, suffix: "", label: "Hackathons entered" },
  { value: 8, suffix: "+", label: "Certifications earned" },
] as const;

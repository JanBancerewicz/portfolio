/**
 * Certifications & courses, grouped by issuer.
 *
 * `credential` is either an absolute http(s) verification URL, or a bare PDF
 * filename under `public/pdfs/` (resolved via {@link resolveCredentialHref}).
 */

import academicPartnersLogo from "../assets/logos/AcademicPartners.png";
import datacampLogo from "../assets/logos/Datacamp.png";
import gdanskUniversityLogo from "../assets/logos/GdanskUniversityOfTechnology.png";
import googleLogo from "../assets/logos/Google.png";
import nvidiaLogo from "../assets/logos/NVIDIA.png";
import nvidiaLogoDark from "../assets/logos/NVIDIA-dark.png";
import researchLogo from "../assets/logos/Research.png";

/** Public path prefix for PDF credentials (`public/pdfs/<filename>`). */
export const CERT_PDF_PREFIX = `${import.meta.env.BASE_URL}pdfs/`;

/** Resolve a credential string to a usable `href` (external URL or static PDF). */
export function resolveCredentialHref(credential: string): string {
  if (/^https?:\/\//i.test(credential)) return credential;
  return `${CERT_PDF_PREFIX}${credential}`;
}

export type Certificate = {
  title: string;
  year: string;
  /** External verify URL, or bare PDF filename under `public/pdfs/`. */
  credential?: string;
};

export type CertificateGroup = {
  /** The issuing body – certificates are grouped by source. */
  issuer: string;
  /** Short note on what this issuer's track covers. */
  note: string;
  /** Issuer mark (Vite-imported PNG). */
  logo: string;
  /**
   * Optional dark-theme mark when invert would break brand colors
   * (e.g. NVIDIA green + wordmark).
   */
  logoDark?: string;
  /**
   * Monochrome / dark marks that need invert in dark theme so they stay
   * readable on `paper-sunken`.
   */
  logoTone?: "ink";
  items: Certificate[];
};

export const certificateGroups: CertificateGroup[] = [
  {
    issuer: "Gdańsk University of Technology",
    note: "BSc in Computer Science (4.41 GPA) & leadership roles",
    logo: gdanskUniversityLogo,
    logoTone: "ink",
    items: [
      { title: "Bachelor's thesis – defending 2026", year: "2026" },
      {
        title: "Gradient PG - AI & Machine Learning Science Club – Board Member",
        year: "2025",
      },
      {
        title: "Sfera PG - Algorithmic & Competitive Programming Club – President",
        year: "2024",
      },
    ],
  },
  {
    issuer: "Research & programmes",
    note: "Peer-reviewed publications & research initiatives",
    logo: researchLogo,
    logoTone: "ink",
    items: [
      {
        title:
          "CORE: Comments as a Reasoning – Gradient PG Science Club (Paper in-progress)",
        year: "2026",
        credential:
          "https://journal.mostwiedzy.pl/TASKQuarterly/article/view/3699",
      },
      {
        title:
          "Analysis of HRV Using Mobile Devices and Machine Learning – TASK Quarterly",
        year: "2026",
        credential:
          "https://journal.mostwiedzy.pl/TASKQuarterly/article/view/3699",
      },
      {
        title:
          "Europe AI Summer Research programme - participant (Edition in-progress)",
        year: "2026",
      },
    ],
  },
  {
    issuer: "Google",
    note: "AI business applications & cloud", // AI and cloud infrastracture
    logo: googleLogo,
    items: [
      {
        title: "Umiejetnosci Jutra AI 3.0",
        year: "2026",
        credential:
          "GOOGLE_Umiejetnosci_Jutra.pdf",
      },
    ],
  },
  {
    issuer: "NVIDIA Deep Learning Institute",
    note: "High-performance AI & GPU acceleration",
    logo: nvidiaLogo,
    logoDark: nvidiaLogoDark,
    items: [
      {
        title: "Generative AI with Diffusion Models",
        year: "2026",
        credential:
          "https://learn.nvidia.com/certificates?id=ICjjyqpaRv6XVagcjyVEVw",
      },
      {
        title: "Fundamentals of Deep Learning",
        year: "2026",
        credential:
          "https://learn.nvidia.com/certificates?id=NyNmV1uuTFW7pAEHoC0kiA",
      },
      {
        title: "Fundamentals of Accelerated Computing with CUDA Python",
        year: "2026",
        credential:
          "https://learn.nvidia.com/certificates?id=s35qfFZyTj2Bkf9QnbGYrg",
      },
    ],
  },
  {
    issuer: "DataCamp",
    note: "Deep learning specialisations",
    logo: datacampLogo,
    items: [
      {
        title: "GitHub Foundations",
        year: "2026",
        credential: "DC_Github_Foundations.pdf",
      },
      {
        title: "Deep Learning for Images with PyTorch",
        year: "2025",
        credential: "DC_Deep_Learning_for_Images_with_PyTorch.pdf",
      },
      {
        title: "Intermediate Deep Learning with PyTorch",
        year: "2025",
        credential: "DC_Intermediate_Deep_Learning_with_PyTorch.pdf",
      },
      {
        title: "Introduction to Deep Learning with PyTorch",
        year: "2025",
        credential: "DC_Introduction_to_Deep_Learning_with_PyTorch.pdf",
      },
    ],
  },
  {
    issuer: "Academic Partners",
    note: "Modern AI Stack & Applied Software Architecture",
    logo: academicPartnersLogo,
    logoTone: "ink",
    items: [
      // {
      //   title: "Hacked Yourself with WebGoat & Copilot",
      //   year: "2026",
      //   credential: "Jan_Bancerewicz_HACK.pdf",
      // },
      {
        title: "Empowering Developers with Next-Gen AI",
        year: "2026",
        credential: "Jan_Bancerewicz_EMPO.pdf",
      },
      {
        title: "RAG Applications in Microsoft Fabric",
        year: "2026",
        credential: "Jan_Bancerewicz_APLI.pdf",
      },
      {
        title:
          "Introducing AI in micro-frontend architectures with Web Fragments",
        year: "2026",
        credential: "Jan_Bancerewicz_MICR.pdf",
      },
      {
        title:
          "The impact of artificial intelligence on software engineering",
        year: "2026",
        credential: "Jan_Bancerewicz_THEI.pdf",
      },
      {
        title:
          "Develop and Deploy AI Agents with AI Toolkit & Azure AI Foundry",
        year: "2026",
        credential: "Jan_Bancerewicz_TOOL.pdf",
      },
    ],
  },
];

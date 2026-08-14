export type TechGroup = {
  label: string;
  items: string[];
};

/** Grouped for the stack table; flattened for the marquee. */
export const techGroups: TechGroup[] = [
  {
    label: "Languages",
    items: ["Python", "Java", "SQL", "TypeScript", "C++"],
  },
  {
    label: "ML Frameworks & Training",
    items: ["PyTorch", "Hugging Face", "scikit-learn", "LoRA/PEFT", "MLflow", "Pandas"],
  },
  {
    label: "LLM Serving & RAG",
    items: ["vLLM", "LlamaIndex", "RAG Systems", "Qdrant", "Anthropic/OpenAI API", "Google ADK"],
  },
  {
    label: "AI Domains & Specializations",
    items: ["LLM Interpretability", "Multimodal / VLMs", "Computer Vision", "YOLO", "OpenCV", "Signal Processing", "Model Optimization"],
  },
  {
    label: "Backend & Databases",
    items: ["FastAPI", "Spring Boot", "PostgreSQL", "Redis", "MongoDB", "Android"],
  },
  {
    label: "Cloud & DevOps",
    items: ["Docker", "Kubernetes", "Azure Databricks", "AWS", "CI/CD & GitHub Actions"],
  },
  {
    label: "Web & GenAI Tools",
    items: ["React", "Next.js", "Claude Code", "Cursor IDE"],
  },
];

export const marqueeTech: string[] = techGroups.flatMap((group) => group.items);

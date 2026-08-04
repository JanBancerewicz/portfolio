export type TechGroup = {
  label: string;
  items: string[];
};

/** Grouped for the stack table; flattened for the marquee. */
export const techGroups: TechGroup[] = [
  {
    label: "Languages",
    items: ["Python", "SQL", "TypeScript", "C++", "Java"],
  },
  {
    label: "Core AI / ML Frameworks",
    items: ["PyTorch", "Hugging Face", "scikit-learn", "YOLO", "OpenCV", "vLLM / Ollama"],
  },
  {
    label: "GenAI & LLM Stack",
    items: ["Qdrant / ChromaDB", "LlamaIndex", "LoRA/PEFT", "Quantization", "RAG Systems", "Anthropic/OpenAI API"],
  },
  {
    label: "AI Domains & Architectures",
    items: ["LLM Interpretability", "Multimodal / VLMs", "Computer Vision", "Signal Processing", "Model Optimization"],
  },
  {
    label: "Backend & Data Engineering",
    items: ["FastAPI", "Flask", "PostgreSQL", "Redis", "MongoDB", "Pandas", "NumPy", "PyTest"],
  },
  {
    label: "Cloud, Web & DevOps",
    items: ["Docker", "Kubernetes", "Azure Databricks", "AWS", "React / Next.js", "Linux", "Git", "CI/CD"],
  },
];

export const marqueeTech: string[] = techGroups.flatMap((group) => group.items);

export type TechGroup = {
  label: string;
  items: string[];
};

/** Grouped for the stack table; flattened for the marquee. */
export const techGroups: TechGroup[] = [
  {
    label: "Languages",
    items: ["Python", "SQL", "TypeScript", "C++", "Java / Spring"],
  },
  {
    label: "Core AI / ML Frameworks",
    items: ["PyTorch", "Hugging Face", "scikit-learn", "YOLO", "OpenCV", "vLLM / Ollama", "MLflow"],
  },
  {
    label: "GenAI & LLM Stack",
    items: ["Qdrant / ChromaDB", "LlamaIndex", "LoRA/PEFT", "Quantization", "RAG Systems", "Anthropic/OpenAI API", "Google ADK"],
  },
  {
    label: "AI Domains & Architectures",
    items: ["LLM Interpretability", "Multimodal / VLMs", "Computer Vision", "Signal Processing", "Model Optimization"],
  },
  {
    label: "Backend & Data Engineering",
    items: ["FastAPI", "Android", "PostgreSQL", "Redis", "MongoDB", "REST API", "Numpy / Pandas", "PyTest"],
  },
  {
    label: "Cloud, Web & DevOps",
    items: ["Docker", "Kubernetes", "Azure Databricks", "AWS", "React / Next.js", "Linux", "Tailwind CSS", "CI/CD & GitHub Actions"],
  },
  {
    label: "Tools",
    items: ["Claude Code", "OpenAI Codex", "Cursor IDE"],
    //"GitHub Copilot" "OpenCode"
  },
];

export const marqueeTech: string[] = techGroups.flatMap((group) => group.items);

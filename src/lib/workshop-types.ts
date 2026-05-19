// ─── Workshop Data Types ──────────────────────────────────────────────────────

export interface WorkshopBlockData {
  id: string;
  time: string;
  duration: string;
  title: string;
  bullets: string[];
  assets: string[];
  deliverable: string | null;
  isBreak?: boolean;
}

export interface WorkshopPhase {
  id: string;
  number: string;
  title: string;
  timeRange: string;
  description: string;
  accent: string;
  blocks: WorkshopBlockData[];
}

export interface PillarDetail {
  label: string;
  body: string;
}

export interface WorkshopPillar {
  id: string;
  number: string;
  name: string;
  principle: string;
  promptExample: string;
  proTip: string;
  details: PillarDetail[];
}

export interface WorkshopMeta {
  title: string;
  subtitle: string;
  location: string;
  priceRange: string;
}

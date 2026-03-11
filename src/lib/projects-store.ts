export type Phase = "brief" | "concept" | "development" | "handoff";

export interface Project {
  id: string;
  name: string;
  client: string;
  deadline: number; // Unix ms
  phase: Phase;
  description?: string;
  createdAt: number; // Unix ms
}

export interface Deliverable {
  id: string;
  text: string;
  done: boolean;
}

const PROJECTS_KEY = "studio-os-projects";

const now = Date.now();
const day = 86_400_000;

export const SAMPLE_PROJECTS: Project[] = [
  { id: "1", name: "Aria Chair Collection", client: "Knoll Europe", deadline: now + 14 * day, phase: "brief", description: "Modular seating system for open-plan offices. Three sizes, stackable.", createdAt: now - 2 * day },
  { id: "2", name: "Forma Kitchen System", client: "Boffi", deadline: now + 30 * day, phase: "concept", description: "Handleless kitchen with integrated lighting. Matte lacquer finishes.", createdAt: now - 5 * day },
  { id: "3", name: "Nova Lamp Series", client: "Flos", deadline: now + 45 * day, phase: "concept", description: "Architectural floor lamp. Brushed aluminum and opal glass.", createdAt: now - 8 * day },
  { id: "4", name: "Strata Shelf System", client: "Vitra", deadline: now - 3 * day, phase: "development", description: "Wall-mounted modular shelving. 12 configurations, solid oak.", createdAt: now - 20 * day },
  { id: "5", name: "Cleo Textile Range", client: "Kvadrat", deadline: now + 7 * day, phase: "development", description: "Recycled wool blend upholstery. 24 colorways.", createdAt: now - 15 * day },
  { id: "6", name: "Mono Watch Identity", client: "Braun", deadline: now - 10 * day, phase: "handoff", description: "Minimalist watch line. Bauhaus-inspired dial design.", createdAt: now - 45 * day },
];

export function loadProjects(): Project[] {
  if (typeof window === "undefined") return SAMPLE_PROJECTS;
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Project[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { /* ignore */ }
  return SAMPLE_PROJECTS;
}

export function saveProjects(projects: Project[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch { /* ignore */ }
}

export function getProject(id: string): Project | null {
  return loadProjects().find(p => p.id === id) ?? null;
}

export function loadDeliverables(projectId: string): Deliverable[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`studio-os-del-${projectId}`);
    if (raw) return JSON.parse(raw) as Deliverable[];
  } catch { /* ignore */ }
  return [];
}

export function saveDeliverables(projectId: string, deliverables: Deliverable[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`studio-os-del-${projectId}`, JSON.stringify(deliverables));
  } catch { /* ignore */ }
}

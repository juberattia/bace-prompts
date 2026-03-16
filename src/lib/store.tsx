"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { Phase, Priority, TaskStatus, BriefingStatus } from "./design-tokens";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface Project {
  _id: string;
  name: string;
  client: string;
  deadline: number;
  phase: Phase;
  description?: string;
  priority?: Priority;
  tags?: string[];
  notes?: string;
  createdAt: number;
}

export interface Task {
  _id: string;
  projectId: string;
  title: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  dueDate?: number;
  createdAt: number;
}

export interface Briefing {
  _id: string;
  projectId?: string;
  title: string;
  projectContext?: string;
  targetUser?: string;
  constraints?: string;
  materials?: string;
  dimensions?: string;
  references?: string;
  deliverables?: string;
  deadline?: number;
  status: BriefingStatus;
  createdAt: number;
}

export type ImageSource = "generated" | "uploaded";

export interface LibraryImage {
  _id: string;
  dataUrl: string;
  prompt?: string;
  source: ImageSource;
  tags: string[];
  fileName?: string;
  createdAt: number;
}

// ─── ID generator ───────────────────────────────────────────────────────────

let counter = 0;
function genId(): string {
  counter++;
  return `${Date.now()}_${counter}_${Math.random().toString(36).slice(2, 8)}`;
}

// ─── localStorage helpers ───────────────────────────────────────────────────

const KEYS = {
  projects: "studio-projects",
  tasks: "studio-tasks",
  briefings: "studio-briefings",
  images: "studio-images",
  seeded: "studio-seeded",
} as const;

function load<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T[];
  } catch { /* ignore */ }
  return [];
}

function save<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch { /* ignore */ }
}

// ─── Sample data ────────────────────────────────────────────────────────────

function seedData(): { projects: Project[]; tasks: Task[]; briefings: Briefing[] } {
  const now = Date.now();
  const day = 86_400_000;

  const projects: Project[] = [
    { _id: genId(), name: "Aria Chair Collection", client: "Knoll Europe", deadline: now + 14 * day, phase: "brief", description: "Modular seating system for open-plan offices. Three sizes, stackable.", createdAt: now - 2 * day },
    { _id: genId(), name: "Forma Kitchen System", client: "Boffi", deadline: now + 30 * day, phase: "concept", description: "Handleless kitchen with integrated lighting. Matte lacquer finishes.", createdAt: now - 5 * day },
    { _id: genId(), name: "Nova Lamp Series", client: "Flos", deadline: now + 45 * day, phase: "concept", description: "Architectural floor lamp. Brushed aluminum and opal glass.", createdAt: now - 8 * day },
    { _id: genId(), name: "Strata Shelf System", client: "Vitra", deadline: now - 3 * day, phase: "development", description: "Wall-mounted modular shelving. 12 configurations, solid oak.", createdAt: now - 20 * day },
    { _id: genId(), name: "Cleo Textile Range", client: "Kvadrat", deadline: now + 7 * day, phase: "development", description: "Recycled wool blend upholstery. 24 colorways.", createdAt: now - 15 * day },
    { _id: genId(), name: "Mono Watch Identity", client: "Braun", deadline: now - 10 * day, phase: "handoff", description: "Minimalist watch line. Bauhaus-inspired dial design.", createdAt: now - 45 * day },
  ];

  const tasks: Task[] = [
    { _id: genId(), projectId: projects[0]._id, title: "Review material samples", priority: "high", status: "todo", dueDate: now + 3 * day, createdAt: now },
    { _id: genId(), projectId: projects[0]._id, title: "Prepare mood board", priority: "medium", status: "in_progress", dueDate: now + 5 * day, createdAt: now },
    { _id: genId(), projectId: projects[0]._id, title: "Client kickoff meeting notes", priority: "low", status: "done", createdAt: now },
    { _id: genId(), projectId: projects[1]._id, title: "3D model first iteration", priority: "high", status: "in_progress", dueDate: now + 7 * day, createdAt: now },
    { _id: genId(), projectId: projects[1]._id, title: "Finalize color palette", priority: "medium", status: "todo", dueDate: now + 10 * day, createdAt: now },
    { _id: genId(), projectId: projects[2]._id, title: "Prototype testing", priority: "urgent", status: "review", dueDate: now + 2 * day, createdAt: now },
    { _id: genId(), projectId: projects[2]._id, title: "Technical drawings", priority: "high", status: "todo", dueDate: now + 14 * day, createdAt: now },
    { _id: genId(), projectId: projects[3]._id, title: "Assembly instructions", priority: "medium", status: "in_progress", dueDate: now - 1 * day, createdAt: now },
    { _id: genId(), projectId: projects[4]._id, title: "Weave pattern sampling", priority: "high", status: "todo", dueDate: now + 4 * day, createdAt: now },
    { _id: genId(), projectId: projects[5]._id, title: "Final production files", priority: "urgent", status: "review", dueDate: now - 5 * day, createdAt: now },
  ];

  const briefings: Briefing[] = [
    {
      _id: genId(),
      projectId: projects[0]._id,
      title: "Aria Chair — Initial Design Brief",
      projectContext: "Modular seating system for open-plan offices. Client wants three sizes that stack and nest.",
      targetUser: "Office workers, facilities managers, interior designers",
      constraints: "Must be stackable (min 6 high). Weight under 5kg per unit. BIFMA certified.",
      materials: "Recycled polypropylene shell, powder-coated steel frame, optional upholstered seat pad",
      dimensions: "Seat height 450mm, width range 440–560mm across three sizes",
      references: "Vitra Tip Ton, HAY About a Chair, Arper Catifa",
      deliverables: "Concept sketches, 3D model, material samples, 1:1 prototype",
      deadline: now + 14 * day,
      status: "active",
      createdAt: now,
    },
    {
      _id: genId(),
      projectId: projects[1]._id,
      title: "Forma Kitchen — Concept Development",
      projectContext: "Premium handleless kitchen with integrated LED lighting. Matte lacquer finishes in 12 colors.",
      targetUser: "High-end residential, architects, kitchen showrooms",
      constraints: "Handle-free push-to-open mechanism. IP44 rated lighting. Soft-close throughout.",
      materials: "MDF core, matte lacquer finish, anodized aluminum profiles, opal LED diffuser",
      deliverables: "Detailed concept renders, technical sections, material board",
      deadline: now + 30 * day,
      status: "draft",
      createdAt: now,
    },
    {
      _id: genId(),
      title: "General — Studio Identity Refresh",
      projectContext: "Update studio visual identity for 2026. Modernize logo, stationery, and digital presence.",
      targetUser: "Potential clients, press, design community",
      deliverables: "Logo variations, brand guidelines PDF, social media templates",
      status: "completed",
      createdAt: now,
    },
  ];

  return { projects, tasks, briefings };
}

// ─── Context ────────────────────────────────────────────────────────────────

interface StoreContextValue {
  // Projects
  projects: Project[];
  getProject: (id: string) => Project | null;
  createProject: (data: Omit<Project, "_id" | "createdAt">) => string;
  updateProject: (id: string, data: Partial<Omit<Project, "_id" | "createdAt">>) => void;
  updateProjectPhase: (id: string, phase: Phase) => void;
  removeProject: (id: string) => void;

  // Tasks
  tasks: Task[];
  getTasksByProject: (projectId: string) => Task[];
  createTask: (data: { projectId: string; title: string; priority: Priority; description?: string; status?: TaskStatus; dueDate?: number }) => string;
  updateTask: (id: string, data: Partial<Omit<Task, "_id" | "createdAt">>) => void;
  removeTask: (id: string) => void;

  // Briefings
  briefings: Briefing[];
  getBriefingsByProject: (projectId: string) => Briefing[];
  createBriefing: (data: Omit<Briefing, "_id" | "createdAt">) => string;
  updateBriefing: (id: string, data: Partial<Omit<Briefing, "_id" | "createdAt">>) => void;
  updateBriefingStatus: (id: string, status: BriefingStatus) => void;
  removeBriefing: (id: string) => void;

  // Images
  images: LibraryImage[];
  saveImage: (data: { dataUrl: string; prompt?: string; source: ImageSource; tags?: string[]; fileName?: string }) => string;
  removeImage: (id: string) => void;
  getGeneratedImages: () => LibraryImage[];
  getUploadedImages: () => LibraryImage[];
  imageStorageWarning: boolean;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StudioDataProvider");
  return ctx;
}

// ─── Provider ───────────────────────────────────────────────────────────────

export function StudioDataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [images, setImages] = useState<LibraryImage[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount, seed if needed
  useEffect(() => {
    const seeded = localStorage.getItem(KEYS.seeded);
    setImages(load<LibraryImage>(KEYS.images));
    if (seeded) {
      setProjects(load<Project>(KEYS.projects));
      setTasks(load<Task>(KEYS.tasks));
      setBriefings(load<Briefing>(KEYS.briefings));
    } else {
      const data = seedData();
      setProjects(data.projects);
      setTasks(data.tasks);
      setBriefings(data.briefings);
      save(KEYS.projects, data.projects);
      save(KEYS.tasks, data.tasks);
      save(KEYS.briefings, data.briefings);
      localStorage.setItem(KEYS.seeded, "1");
    }
    setLoaded(true);
  }, []);

  // Persist on changes (skip initial empty state)
  useEffect(() => {
    if (loaded) save(KEYS.projects, projects);
  }, [projects, loaded]);
  useEffect(() => {
    if (loaded) save(KEYS.tasks, tasks);
  }, [tasks, loaded]);
  useEffect(() => {
    if (loaded) save(KEYS.briefings, briefings);
  }, [briefings, loaded]);
  useEffect(() => {
    if (loaded) save(KEYS.images, images);
  }, [images, loaded]);

  // ─── Project operations ─────────────────────────────────────────────────

  const getProject = useCallback(
    (id: string) => projects.find((p) => p._id === id) ?? null,
    [projects]
  );

  const createProject = useCallback(
    (data: Omit<Project, "_id" | "createdAt">) => {
      const id = genId();
      const project: Project = { ...data, _id: id, createdAt: Date.now() };
      setProjects((prev) => [project, ...prev]);
      return id;
    },
    []
  );

  const updateProject = useCallback(
    (id: string, data: Partial<Omit<Project, "_id" | "createdAt">>) => {
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...data } : p))
      );
    },
    []
  );

  const updateProjectPhase = useCallback(
    (id: string, phase: Phase) => {
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? { ...p, phase } : p))
      );
    },
    []
  );

  const removeProject = useCallback(
    (id: string) => {
      setProjects((prev) => prev.filter((p) => p._id !== id));
      setTasks((prev) => prev.filter((t) => t.projectId !== id));
      setBriefings((prev) => prev.filter((b) => b.projectId !== id));
    },
    []
  );

  // ─── Task operations ──────────────────────────────────────────────────

  const getTasksByProject = useCallback(
    (projectId: string) => tasks.filter((t) => t.projectId === projectId),
    [tasks]
  );

  const createTask = useCallback(
    (data: { projectId: string; title: string; priority: Priority; description?: string; status?: TaskStatus; dueDate?: number }) => {
      const id = genId();
      const task: Task = {
        _id: id,
        projectId: data.projectId,
        title: data.title,
        priority: data.priority,
        description: data.description,
        status: data.status ?? "todo",
        dueDate: data.dueDate,
        createdAt: Date.now(),
      };
      setTasks((prev) => [task, ...prev]);
      return id;
    },
    []
  );

  const updateTask = useCallback(
    (id: string, data: Partial<Omit<Task, "_id" | "createdAt">>) => {
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, ...data } : t))
      );
    },
    []
  );

  const removeTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((t) => t._id !== id));
    },
    []
  );

  // ─── Briefing operations ──────────────────────────────────────────────

  const getBriefingsByProject = useCallback(
    (projectId: string) => briefings.filter((b) => b.projectId === projectId),
    [briefings]
  );

  const createBriefing = useCallback(
    (data: Omit<Briefing, "_id" | "createdAt">) => {
      const id = genId();
      const briefing: Briefing = { ...data, _id: id, createdAt: Date.now() };
      setBriefings((prev) => [briefing, ...prev]);
      return id;
    },
    []
  );

  const updateBriefing = useCallback(
    (id: string, data: Partial<Omit<Briefing, "_id" | "createdAt">>) => {
      setBriefings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, ...data } : b))
      );
    },
    []
  );

  const updateBriefingStatus = useCallback(
    (id: string, status: BriefingStatus) => {
      setBriefings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    },
    []
  );

  const removeBriefing = useCallback(
    (id: string) => {
      setBriefings((prev) => prev.filter((b) => b._id !== id));
    },
    []
  );

  // ─── Image operations ───────────────────────────────────────────────

  const saveImage = useCallback(
    (data: { dataUrl: string; prompt?: string; source: ImageSource; tags?: string[]; fileName?: string }) => {
      const id = genId();
      const image: LibraryImage = {
        _id: id,
        dataUrl: data.dataUrl,
        prompt: data.prompt,
        source: data.source,
        tags: data.tags ?? [],
        fileName: data.fileName,
        createdAt: Date.now(),
      };
      setImages((prev) => [image, ...prev]);
      return id;
    },
    []
  );

  const removeImage = useCallback(
    (id: string) => {
      setImages((prev) => prev.filter((img) => img._id !== id));
    },
    []
  );

  const getGeneratedImages = useCallback(
    () => images.filter((img) => img.source === "generated"),
    [images]
  );

  const getUploadedImages = useCallback(
    () => images.filter((img) => img.source === "uploaded"),
    [images]
  );

  const imageStorageWarning = images.length >= 50;

  // ─── Context value ──────────────────────────────────────────────────

  const value: StoreContextValue = {
    projects,
    getProject,
    createProject,
    updateProject,
    updateProjectPhase,
    removeProject,
    tasks,
    getTasksByProject,
    createTask,
    updateTask,
    removeTask,
    briefings,
    getBriefingsByProject,
    createBriefing,
    updateBriefing,
    updateBriefingStatus,
    removeBriefing,
    images,
    saveImage,
    removeImage,
    getGeneratedImages,
    getUploadedImages,
    imageStorageWarning,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

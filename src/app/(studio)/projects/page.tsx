"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Doc } from "../../../../convex/_generated/dataModel";
import SectionHeader from "@/components/studio/SectionHeader";
import StudioCard from "@/components/studio/StudioCard";
import PhaseIndicator from "@/components/studio/PhaseIndicator";
import PriorityBadge from "@/components/studio/PriorityBadge";
import CreateProjectForm from "@/components/studio/CreateProjectForm";
import { PHASE_COLORS, type Phase } from "@/lib/design-tokens";
import { format, isPast, formatDistanceToNow } from "date-fns";
import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  ChevronDown,
  Search,
  User,
} from "lucide-react";

const PHASES: Phase[] = ["brief", "concept", "development", "handoff"];

function ProjectCard({ project }: { project: Doc<"projects"> }) {
  const updatePhase = useMutation(api.projects.updatePhase);
  const [showMove, setShowMove] = useState(false);

  const overdue = isPast(new Date(project.deadline));

  return (
    <div className="relative group">
      <Link href={`/projects/${project._id}`}>
        <StudioCard hover className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[13px] font-mono text-studio-text font-medium leading-snug">
              {project.name}
            </p>
            {project.priority && (
              <PriorityBadge priority={project.priority} />
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-studio-muted">
            <User size={11} />
            {project.client}
          </div>
          {project.description && (
            <p className="text-[12px] font-mono text-studio-secondary line-clamp-2">
              {project.description}
            </p>
          )}
          <div className="flex items-center justify-between pt-1">
            <span
              className={`text-[11px] font-mono flex items-center gap-1 ${
                overdue ? "text-red-500" : "text-studio-muted"
              }`}
            >
              <Clock size={11} />
              {format(new Date(project.deadline), "MMM d")}
              {overdue && " (overdue)"}
            </span>
          </div>
        </StudioCard>
      </Link>
      {/* Move phase dropdown */}
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowMove(!showMove);
          }}
          className="opacity-0 group-hover:opacity-100 p-1 bg-white border border-studio-border rounded text-studio-muted hover:text-studio-text transition-all"
          title="Move to phase..."
        >
          <ChevronDown size={12} />
        </button>
        {showMove && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowMove(false)}
            />
            <div className="absolute right-0 top-7 bg-white border border-studio-border rounded-md shadow-lg py-1 z-20 min-w-[140px]">
              {PHASES.filter((p) => p !== project.phase).map((phase) => (
                <button
                  key={phase}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updatePhase({ id: project._id, phase });
                    setShowMove(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-[12px] font-mono text-studio-secondary hover:bg-studio-bg hover:text-studio-text flex items-center gap-2 transition-colors"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: PHASE_COLORS[phase].dot }}
                  />
                  {PHASE_COLORS[phase].label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const projects = useQuery(api.projects.list) ?? [];
  const [search, setSearch] = useState("");

  const filtered = search
    ? projects.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.client.toLowerCase().includes(search.toLowerCase())
      )
    : projects;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <SectionHeader
        title="Projects"
        subtitle={`${projects.length} projects across ${PHASES.length} phases`}
        action={<CreateProjectForm />}
      />

      {/* Search bar */}
      <div className="relative max-w-sm">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-studio-muted"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full pl-9 pr-3 py-2 bg-white border border-studio-border rounded-md text-[13px] font-mono text-studio-text placeholder:text-studio-muted focus:outline-none focus:border-studio-neon"
        />
      </div>

      {/* Kanban columns — mobile: tabs, desktop: 4-col grid */}
      <KanbanBoard projects={filtered} />
    </div>
  );
}

function KanbanBoard({ projects }: { projects: Doc<"projects">[] }) {
  const [activeTab, setActiveTab] = useState<Phase>("brief");

  const columns = PHASES.map((phase) => ({
    phase,
    colors: PHASE_COLORS[phase],
    items: projects.filter((p) => p.phase === phase),
  }));

  return (
    <>
      {/* Mobile: Tab navigation */}
      <div className="flex gap-1 lg:hidden overflow-x-auto pb-1">
        {columns.map((col) => (
          <button
            key={col.phase}
            onClick={() => setActiveTab(col.phase)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-mono whitespace-nowrap transition-colors ${
              activeTab === col.phase
                ? "bg-studio-text text-white"
                : "bg-white border border-studio-border text-studio-secondary"
            }`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: col.colors.dot }}
            />
            {col.colors.label}
            <span className="opacity-60">({col.items.length})</span>
          </button>
        ))}
      </div>

      {/* Mobile: Single column */}
      <div className="lg:hidden space-y-2">
        {columns
          .filter((col) => col.phase === activeTab)
          .map((col) => (
            <div key={col.phase} className="space-y-2">
              {col.items.length === 0 ? (
                <p className="text-[13px] font-mono text-studio-muted text-center py-8">
                  No projects in {col.colors.label}
                </p>
              ) : (
                col.items.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))
              )}
            </div>
          ))}
      </div>

      {/* Desktop: 4-column grid */}
      <div className="hidden lg:grid grid-cols-4 gap-4">
        {columns.map((col) => (
          <div key={col.phase}>
            <div className="flex items-center gap-2 mb-3 px-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: col.colors.dot }}
              />
              <span className="text-[12px] font-mono font-medium text-studio-text uppercase tracking-wider">
                {col.colors.label}
              </span>
              <span className="text-[11px] font-mono text-studio-muted">
                {col.items.length}
              </span>
            </div>
            <div className="space-y-2 min-h-[200px]">
              {col.items.length === 0 ? (
                <div className="border border-dashed border-studio-border rounded-lg p-6 text-center">
                  <p className="text-[12px] font-mono text-studio-muted">
                    No projects
                  </p>
                </div>
              ) : (
                col.items.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

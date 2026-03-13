"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect } from "react";
import Link from "next/link";
import SectionHeader from "@/components/studio/SectionHeader";
import StudioCard from "@/components/studio/StudioCard";
import PhaseIndicator from "@/components/studio/PhaseIndicator";
import StatusBadge from "@/components/studio/StatusBadge";
import PriorityBadge from "@/components/studio/PriorityBadge";
import { PHASE_COLORS, type Phase } from "@/lib/design-tokens";
import {
  FolderKanban,
  FileText,
  Wand2,
  Plus,
  ArrowRight,
  Clock,
} from "lucide-react";
import { format, formatDistanceToNow, isPast } from "date-fns";

const PHASES: Phase[] = ["brief", "concept", "development", "handoff"];

export default function DashboardPage() {
  const projects = useQuery(api.projects.list) ?? [];
  const tasks = useQuery(api.tasks.list) ?? [];
  const briefings = useQuery(api.briefings.list) ?? [];

  // Seed data on first load
  const seedProjects = useMutation(api.projects.seed);
  const seedTasks = useMutation(api.tasks.seed);
  const seedBriefings = useMutation(api.briefings.seed);

  useEffect(() => {
    seedProjects().catch(() => {});
    // Small delay so projects exist before tasks/briefings seed
    const t = setTimeout(() => {
      seedTasks().catch(() => {});
      seedBriefings().catch(() => {});
    }, 1000);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Stats
  const phaseCounts = PHASES.map((phase) => ({
    phase,
    count: projects.filter((p) => p.phase === phase).length,
    colors: PHASE_COLORS[phase],
  }));

  // Upcoming deadlines: next 5 projects sorted by deadline
  const upcoming = [...projects]
    .sort((a, b) => a.deadline - b.deadline)
    .slice(0, 5);

  // Recent tasks (non-done, most recent first)
  const recentTasks = tasks.filter((t) => t.status !== "done").slice(0, 5);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-studio-text uppercase leading-none">
          Dashboard
        </h1>
        <p className="text-[13px] font-mono text-studio-muted mt-1">
          {projects.length} projects &middot; {tasks.filter((t) => t.status !== "done").length} open tasks &middot; {briefings.length} briefings
        </p>
      </div>

      {/* Phase stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {phaseCounts.map(({ phase, count, colors }) => (
          <StudioCard key={phase} hover>
            <div className="flex items-center justify-between mb-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.dot }}
              />
              <span className="font-display text-2xl font-bold text-studio-text">
                {count}
              </span>
            </div>
            <span
              className="text-[11px] font-mono uppercase tracking-wider"
              style={{ color: colors.text }}
            >
              {colors.label}
            </span>
          </StudioCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming deadlines */}
        <div>
          <SectionHeader
            title="Upcoming Deadlines"
            action={
              <Link
                href="/projects"
                className="text-[12px] font-mono text-studio-secondary hover:text-studio-text transition-colors inline-flex items-center gap-1"
              >
                All projects <ArrowRight size={12} />
              </Link>
            }
          />
          <div className="space-y-2">
            {upcoming.length === 0 ? (
              <p className="text-[13px] font-mono text-studio-muted">
                No projects yet
              </p>
            ) : (
              upcoming.map((project) => (
                <Link key={project._id} href={`/projects/${project._id}`}>
                  <StudioCard hover className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-mono text-studio-text truncate">
                        {project.name}
                      </p>
                      <p className="text-[11px] font-mono text-studio-muted">
                        {project.client}
                      </p>
                    </div>
                    <PhaseIndicator phase={project.phase} />
                    <span
                      className={`text-[11px] font-mono shrink-0 ${
                        isPast(new Date(project.deadline))
                          ? "text-red-500"
                          : "text-studio-muted"
                      }`}
                    >
                      <Clock size={11} className="inline mr-1" />
                      {formatDistanceToNow(new Date(project.deadline), {
                        addSuffix: true,
                      })}
                    </span>
                  </StudioCard>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent tasks */}
        <div>
          <SectionHeader
            title="Open Tasks"
            subtitle={`${recentTasks.length} tasks need attention`}
          />
          <div className="space-y-2">
            {recentTasks.length === 0 ? (
              <p className="text-[13px] font-mono text-studio-muted">
                All clear!
              </p>
            ) : (
              recentTasks.map((task) => (
                <StudioCard key={task._id} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-mono text-studio-text truncate">
                      {task.title}
                    </p>
                  </div>
                  <PriorityBadge priority={task.priority} />
                  <StatusBadge status={task.status} />
                  {task.dueDate && (
                    <span className="text-[11px] font-mono text-studio-muted hidden sm:inline">
                      {format(new Date(task.dueDate), "MMM d")}
                    </span>
                  )}
                </StudioCard>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <SectionHeader title="Quick Actions" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/projects">
            <StudioCard hover className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-studio-bg flex items-center justify-center">
                <FolderKanban size={18} className="text-studio-text" />
              </div>
              <div>
                <p className="text-[13px] font-mono text-studio-text font-medium">
                  Projects
                </p>
                <p className="text-[11px] font-mono text-studio-muted">
                  Kanban board
                </p>
              </div>
            </StudioCard>
          </Link>
          <Link href="/briefings/new">
            <StudioCard hover className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-studio-bg flex items-center justify-center">
                <FileText size={18} className="text-studio-text" />
              </div>
              <div>
                <p className="text-[13px] font-mono text-studio-text font-medium">
                  New Briefing
                </p>
                <p className="text-[11px] font-mono text-studio-muted">
                  Start from scratch
                </p>
              </div>
            </StudioCard>
          </Link>
          <Link href="/prompt-builder">
            <StudioCard hover className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-studio-bg flex items-center justify-center">
                <Wand2 size={18} className="text-studio-text" />
              </div>
              <div>
                <p className="text-[13px] font-mono text-studio-text font-medium">
                  Prompt Builder
                </p>
                <p className="text-[11px] font-mono text-studio-muted">
                  Visual prompts
                </p>
              </div>
            </StudioCard>
          </Link>
        </div>
      </div>
    </div>
  );
}

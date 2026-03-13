"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";
import { useParams } from "next/navigation";
import Link from "next/link";
import SectionHeader from "@/components/studio/SectionHeader";
import StudioCard from "@/components/studio/StudioCard";
import PhaseIndicator from "@/components/studio/PhaseIndicator";
import PriorityBadge from "@/components/studio/PriorityBadge";
import StatusBadge from "@/components/studio/StatusBadge";
import TaskList from "@/components/studio/TaskList";
import { PHASE_COLORS, type Phase } from "@/lib/design-tokens";
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  FileText,
  Tag,
} from "lucide-react";
import {
  format,
  formatDistanceToNow,
  isPast,
  differenceInDays,
} from "date-fns";

const PHASE_ORDER: Phase[] = ["brief", "concept", "development", "handoff"];

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as Id<"projects">;

  const project = useQuery(api.projects.get, { id: projectId });
  const tasks = useQuery(api.tasks.listByProject, { projectId }) ?? [];
  const briefings =
    useQuery(api.briefings.listByProject, { projectId }) ?? [];

  if (project === undefined) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-studio-border rounded w-48" />
          <div className="h-4 bg-studio-border rounded w-32" />
        </div>
      </div>
    );
  }

  if (project === null) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <p className="text-[14px] font-mono text-studio-muted">
          Project not found
        </p>
        <Link
          href="/projects"
          className="text-[13px] font-mono text-studio-secondary hover:text-studio-text mt-2 inline-block"
        >
          &larr; Back to projects
        </Link>
      </div>
    );
  }

  const overdue = isPast(new Date(project.deadline));
  const daysLeft = differenceInDays(new Date(project.deadline), new Date());
  const currentPhaseIdx = PHASE_ORDER.indexOf(project.phase);

  const tasksDone = tasks.filter((t) => t.status === "done").length;
  const tasksTotal = tasks.length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-[13px] font-mono text-studio-secondary hover:text-studio-text transition-colors"
      >
        <ArrowLeft size={14} />
        All Projects
      </Link>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-start gap-3">
          <h1 className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-studio-text uppercase leading-none">
            {project.name}
          </h1>
          <PhaseIndicator phase={project.phase} size="md" />
          {project.priority && (
            <PriorityBadge priority={project.priority} />
          )}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[13px] font-mono text-studio-muted">
          <span className="flex items-center gap-1.5">
            <User size={13} />
            {project.client}
          </span>
          <span
            className={`flex items-center gap-1.5 ${
              overdue ? "text-red-500" : ""
            }`}
          >
            <Calendar size={13} />
            {format(new Date(project.deadline), "MMM d, yyyy")}
            {overdue ? " (overdue)" : ` (${daysLeft}d left)`}
          </span>
        </div>
      </div>

      {/* Phase timeline */}
      <div className="flex items-center gap-1">
        {PHASE_ORDER.map((phase, idx) => {
          const isCompleted = idx < currentPhaseIdx;
          const isCurrent = idx === currentPhaseIdx;
          const colors = PHASE_COLORS[phase];
          return (
            <div key={phase} className="flex-1">
              <div
                className="h-1.5 rounded-full transition-colors"
                style={{
                  backgroundColor: isCurrent
                    ? colors.dot
                    : isCompleted
                    ? colors.dot
                    : "#e8e8e8",
                  opacity: isCompleted ? 0.5 : 1,
                }}
              />
              <p
                className="text-[10px] font-mono mt-1 uppercase tracking-wider"
                style={{
                  color: isCurrent ? colors.text : "#999",
                  fontWeight: isCurrent ? 600 : 400,
                }}
              >
                {colors.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content: 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          {project.description && (
            <div>
              <SectionHeader title="Overview" />
              <StudioCard>
                <p className="text-[13px] font-mono text-studio-secondary leading-relaxed">
                  {project.description}
                </p>
              </StudioCard>
            </div>
          )}

          {project.notes && (
            <div>
              <SectionHeader title="Notes" />
              <StudioCard>
                <p className="text-[13px] font-mono text-studio-secondary leading-relaxed whitespace-pre-wrap">
                  {project.notes}
                </p>
              </StudioCard>
            </div>
          )}

          {/* Tasks */}
          <div>
            <SectionHeader
              title="Tasks"
              subtitle={
                tasksTotal > 0
                  ? `${tasksDone}/${tasksTotal} completed`
                  : undefined
              }
            />
            <StudioCard>
              <TaskList tasks={tasks} projectId={projectId} />
            </StudioCard>
          </div>
        </div>

        {/* Sidebar: 1 col */}
        <div className="space-y-4">
          {/* Info card */}
          <StudioCard className="space-y-3">
            <h3 className="text-[11px] font-mono text-studio-muted uppercase tracking-wider">
              Details
            </h3>
            <div className="space-y-2 text-[13px] font-mono">
              <div className="flex justify-between">
                <span className="text-studio-muted">Created</span>
                <span className="text-studio-text">
                  {format(new Date(project.createdAt), "MMM d, yyyy")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-studio-muted">Deadline</span>
                <span
                  className={overdue ? "text-red-500" : "text-studio-text"}
                >
                  {formatDistanceToNow(new Date(project.deadline), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-studio-muted">Tasks</span>
                <span className="text-studio-text">
                  {tasksDone}/{tasksTotal}
                </span>
              </div>
            </div>
          </StudioCard>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <StudioCard className="space-y-2">
              <h3 className="text-[11px] font-mono text-studio-muted uppercase tracking-wider flex items-center gap-1.5">
                <Tag size={11} />
                Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-studio-bg rounded text-[11px] font-mono text-studio-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </StudioCard>
          )}

          {/* Linked briefings */}
          <StudioCard className="space-y-2">
            <h3 className="text-[11px] font-mono text-studio-muted uppercase tracking-wider flex items-center gap-1.5">
              <FileText size={11} />
              Briefings
            </h3>
            {briefings.length === 0 ? (
              <p className="text-[12px] font-mono text-studio-muted">
                No briefings linked
              </p>
            ) : (
              <div className="space-y-1.5">
                {briefings.map((b) => (
                  <div
                    key={b._id}
                    className="flex items-center gap-2 text-[12px] font-mono"
                  >
                    <span className="text-studio-text truncate flex-1">
                      {b.title}
                    </span>
                    <StatusBadge status={b.status} type="briefing" />
                  </div>
                ))}
              </div>
            )}
            <Link
              href={`/briefings/new`}
              className="inline-block text-[12px] font-mono text-studio-secondary hover:text-studio-text transition-colors mt-1"
            >
              + New briefing
            </Link>
          </StudioCard>
        </div>
      </div>
    </div>
  );
}

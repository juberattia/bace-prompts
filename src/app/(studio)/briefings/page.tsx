"use client";

import { useStore } from "@/lib/store";
import SectionHeader from "@/components/studio/SectionHeader";
import StudioCard from "@/components/studio/StudioCard";
import StatusBadge from "@/components/studio/StatusBadge";
import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, Search, FileText } from "lucide-react";
import type { BriefingStatus } from "@/lib/design-tokens";

const STATUS_FILTERS: { value: BriefingStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export default function BriefingsPage() {
  const { briefings, projects } = useStore();
  const [statusFilter, setStatusFilter] = useState<BriefingStatus | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = briefings
    .filter((b) => statusFilter === "all" || b.status === statusFilter)
    .filter(
      (b) =>
        !search ||
        b.title.toLowerCase().includes(search.toLowerCase())
    );

  const getProjectName = (projectId: string | undefined) => {
    if (!projectId) return null;
    const project = projects.find((p) => p._id === projectId);
    return project?.name ?? null;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <SectionHeader
        title="Briefings"
        subtitle={`${briefings.length} briefings`}
        action={
          <Link
            href="/briefings/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-studio-text text-white rounded-md text-[13px] font-mono hover:bg-black transition-colors"
          >
            <Plus size={15} />
            New Briefing
          </Link>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-studio-muted"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search briefings..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-studio-border rounded-md text-[13px] font-mono text-studio-text placeholder:text-studio-muted focus:outline-none focus:border-studio-neon"
          />
        </div>
        <div className="flex gap-1">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-mono whitespace-nowrap transition-colors ${
                statusFilter === f.value
                  ? "bg-studio-text text-white"
                  : "bg-white border border-studio-border text-studio-secondary hover:bg-studio-bg"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Briefing cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <FileText size={32} className="mx-auto text-studio-border mb-3" />
          <p className="text-[14px] font-mono text-studio-muted">
            {search || statusFilter !== "all"
              ? "No briefings match your filters"
              : "No briefings yet"}
          </p>
          <Link
            href="/briefings/new"
            className="text-[13px] font-mono text-studio-secondary hover:text-studio-text mt-2 inline-block"
          >
            Create your first briefing &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((briefing) => {
            const projectName = getProjectName(briefing.projectId);
            return (
              <StudioCard key={briefing._id} hover className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[14px] font-mono text-studio-text font-medium leading-snug">
                    {briefing.title}
                  </h3>
                  <StatusBadge status={briefing.status} type="briefing" />
                </div>
                {projectName && (
                  <p className="text-[11px] font-mono text-studio-muted">
                    Project: {projectName}
                  </p>
                )}
                {briefing.projectContext && (
                  <p className="text-[12px] font-mono text-studio-secondary line-clamp-2">
                    {briefing.projectContext}
                  </p>
                )}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-mono text-studio-muted">
                    {format(new Date(briefing.createdAt), "MMM d, yyyy")}
                  </span>
                  {briefing.deadline && (
                    <span className="text-[11px] font-mono text-studio-muted">
                      Due {format(new Date(briefing.deadline), "MMM d")}
                    </span>
                  )}
                </div>
              </StudioCard>
            );
          })}
        </div>
      )}
    </div>
  );
}

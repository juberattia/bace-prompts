"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format, isPast } from "date-fns";
import {
  loadProjects,
  saveProjects,
  type Phase,
  type Project,
} from "@/lib/projects-store";

// ─── VALIENTE® Design Language System ────────────────────────────────────────
const RED = "#FF1A00";
const BG = "#DDDBD6";
const DIVIDER = "rgba(255, 26, 0, 0.18)";
// ─────────────────────────────────────────────────────────────────────────────

const PHASES: { key: Phase; label: string }[] = [
  { key: "brief", label: "Brief" },
  { key: "concept", label: "Concept" },
  { key: "development", label: "Development" },
  { key: "handoff", label: "Handoff" },
];

// ─── New Project Dialog ───────────────────────────────────────────────────────

function NewProjectDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreate: (p: Omit<Project, "id" | "createdAt">) => void;
}) {
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [deadline, setDeadline] = useState("");
  const [phase, setPhase] = useState<Phase>("brief");
  const [description, setDescription] = useState("");

  const reset = () => {
    setName("");
    setClient("");
    setDeadline("");
    setPhase("brief");
    setDescription("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !client.trim() || !deadline) return;
    onCreate({
      name: name.trim(),
      client: client.trim(),
      deadline: new Date(deadline).getTime(),
      phase,
      description: description.trim() || undefined,
    });
    reset();
    onOpenChange(false);
  };

  if (!open) return null;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: "40px",
    border: `1px solid rgba(255, 26, 0, 0.35)`,
    borderRadius: 0,
    backgroundColor: "#FFFFFF",
    padding: "0 12px",
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    letterSpacing: "0.03em",
    color: RED,
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "9px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: RED,
    opacity: 0.5,
    display: "block",
    marginBottom: "6px",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.55)" }}
        onClick={() => onOpenChange(false)}
      />
      <div
        style={{
          position: "relative",
          backgroundColor: BG,
          border: `1px solid ${RED}`,
          borderRadius: 0,
          padding: "32px",
          width: "100%",
          maxWidth: "480px",
          margin: "0 16px",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: RED,
            marginBottom: "28px",
          }}
        >
          NEW PROJECT
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "18px" }}
        >
          <div>
            <label style={labelStyle}>Project Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aria Chair Collection"
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Client</label>
            <input
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Knoll Europe"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={labelStyle}>Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
                style={{ ...inputStyle, colorScheme: "light" as React.CSSProperties["colorScheme"] }}
              />
            </div>
            <div>
              <label style={labelStyle}>Phase</label>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value as Phase)}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                {PHASES.map((p) => (
                  <option key={p.key} value={p.key}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle}>
              Description{" "}
              <span style={{ opacity: 0.35 }}>(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of the project scope..."
              rows={3}
              style={{
                ...inputStyle,
                height: "auto",
                padding: "10px 12px",
                resize: "none",
                lineHeight: "1.55",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px", paddingTop: "6px" }}>
            <button
              type="button"
              onClick={() => {
                reset();
                onOpenChange(false);
              }}
              style={{
                flex: 1,
                height: "44px",
                border: `1px solid ${DIVIDER}`,
                borderRadius: 0,
                backgroundColor: "transparent",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: RED,
                opacity: 0.5,
                cursor: "pointer",
              }}
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={!name.trim() || !client.trim() || !deadline}
              style={{
                flex: 2,
                height: "44px",
                border: "none",
                borderRadius: 0,
                backgroundColor: RED,
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                cursor: "pointer",
                opacity: !name.trim() || !client.trim() || !deadline ? 0.4 : 1,
                transition: "opacity 0.15s",
              }}
            >
              CREATE →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  onPhaseChange,
}: {
  project: Project;
  onPhaseChange: (id: string, phase: Phase) => void;
}) {
  const router = useRouter();
  const overdue = isPast(new Date(project.deadline));
  const deadlineLabel = format(new Date(project.deadline), "d MMM yyyy").toUpperCase();

  return (
    <div
      onClick={() => router.push(`/projects/${project.id}`)}
      style={{
        backgroundColor: "#FFFFFF",
        border: `1px solid ${DIVIDER}`,
        borderRadius: 0,
        padding: "16px",
        cursor: "pointer",
        transition: "border-color 0.15s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(255, 26, 0, 0.55)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = DIVIDER;
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "13px",
          letterSpacing: "-0.01em",
          textTransform: "uppercase",
          color: RED,
          lineHeight: 1.2,
          marginBottom: "6px",
        }}
      >
        {project.name}
      </h3>

      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: RED,
          opacity: 0.5,
          marginBottom: project.description ? "10px" : 0,
        }}
      >
        {project.client}
      </p>

      {project.description && (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: RED,
            opacity: 0.4,
            lineHeight: 1.55,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>
      )}

      <div
        style={{
          borderTop: `1px solid ${DIVIDER}`,
          marginTop: "14px",
          paddingTop: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.05em",
            color: RED,
            opacity: overdue ? 1 : 0.4,
            fontWeight: overdue ? 700 : 400,
          }}
        >
          {overdue ? "⚠ OVERDUE" : deadlineLabel}
        </span>

        <select
          value={project.phase}
          onChange={(e) => onPhaseChange(project.id, e.target.value as Phase)}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: RED,
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            outline: "none",
            opacity: 0.55,
            padding: 0,
          }}
        >
          {PHASES.map((p) => (
            <option key={p.key} value={p.key}>
              {p.label.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

// ─── Phase Column ─────────────────────────────────────────────────────────────

function PhaseColumn({
  phaseKey,
  phaseLabel,
  phaseNum,
  projects,
  onPhaseChange,
}: {
  phaseKey: Phase;
  phaseLabel: string;
  phaseNum: string;
  projects: Project[];
  onPhaseChange: (id: string, phase: Phase) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Column header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "12px",
          borderBottom: `1px solid ${DIVIDER}`,
          marginBottom: "16px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: RED,
            fontWeight: 700,
          }}
        >
          {phaseLabel}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: RED,
            opacity: 0.3,
            letterSpacing: "0.05em",
          }}
        >
          ({phaseNum})
        </span>
      </div>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {projects.length === 0 ? (
          <div
            style={{
              border: `1px dashed ${DIVIDER}`,
              padding: "32px 16px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: RED,
                opacity: 0.3,
              }}
            >
              NO PROJECTS
            </p>
          </div>
        ) : (
          projects.map((p) => (
            <ProjectCard key={p.id} project={p} onPhaseChange={onPhaseChange} />
          ))
        )}
      </div>
    </div>
  );
}

// ─── Main Board ───────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProjects(loadProjects());
    setHydrated(true);
  }, []);

  const handleCreate = (data: Omit<Project, "id" | "createdAt">) => {
    const updated = [
      { ...data, id: String(Date.now()), createdAt: Date.now() },
      ...projects,
    ];
    setProjects(updated);
    saveProjects(updated);
  };

  const handlePhaseChange = (id: string, phase: Phase) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, phase } : p));
    setProjects(updated);
    saveProjects(updated);
  };

  const projectsByPhase = PHASES.reduce<Record<Phase, Project[]>>(
    (acc, { key }) => {
      acc[key] = projects.filter((p) => p.phase === key);
      return acc;
    },
    { brief: [], concept: [], development: [], handoff: [] }
  );

  const overdueCount = projects.filter((p) => isPast(new Date(p.deadline))).length;

  return (
    <div style={{ backgroundColor: BG, minHeight: "100vh", color: RED }}>
      {/* ── Header ── */}
      <header
        style={{
          backgroundColor: BG,
          borderBottom: `1px solid ${DIVIDER}`,
          padding: "12px 20px",
          position: "sticky",
          top: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "14px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: RED,
              }}
            >
              STUDIO OS®
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: RED,
                opacity: 0.4,
              }}
            >
              PROJECT BOARD
            </span>
          </div>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {hydrated && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: RED,
                opacity: 0.4,
              }}
            >
              {projects.length} PROJECTS
              {overdueCount > 0 ? ` · ${overdueCount} OVERDUE` : ""}
            </span>
          )}

          <button
            onClick={() => setDialogOpen(true)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: RED,
              border: `1px solid rgba(255, 26, 0, 0.45)`,
              borderRadius: 0,
              backgroundColor: "transparent",
              padding: "8px 18px",
              cursor: "pointer",
              transition: "background-color 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = RED;
              (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = RED;
            }}
          >
            + NEW PROJECT
          </button>
        </div>
      </header>

      {/* ── Board ── */}
      <main
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "48px 20px 80px",
        }}
      >
        {hydrated && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            {PHASES.map((phase) => (
              <PhaseColumn
                key={phase.key}
                phaseKey={phase.key}
                phaseLabel={phase.label}
                phaseNum={String(projectsByPhase[phase.key].length).padStart(2, "0")}
                projects={projectsByPhase[phase.key]}
                onPhaseChange={handlePhaseChange}
              />
            ))}
          </div>
        )}
      </main>

      <NewProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreate={handleCreate}
      />
    </div>
  );
}

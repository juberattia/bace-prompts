"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { format, isPast } from "date-fns";
import {
  getProject,
  loadDeliverables,
  saveDeliverables,
  type Phase,
  type Project,
  type Deliverable,
} from "@/lib/projects-store";

// ─── VALIENTE® Design Language System ────────────────────────────────────────
const RED = "#FF1A00";
const BG = "#DDDBD6";
const DIVIDER = "rgba(255, 26, 0, 0.18)";
// ─────────────────────────────────────────────────────────────────────────────

const PHASES: { key: Phase; label: string; num: string }[] = [
  { key: "brief", label: "BRIEF", num: "01" },
  { key: "concept", label: "CONCEPT", num: "02" },
  { key: "development", label: "DEVELOPMENT", num: "03" },
  { key: "handoff", label: "HANDOFF", num: "04" },
];

const PHASE_ORDER: Phase[] = ["brief", "concept", "development", "handoff"];

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [newDeliverable, setNewDeliverable] = useState("");

  useEffect(() => {
    const p = getProject(id);
    setProject(p);
    if (p) setDeliverables(loadDeliverables(id));
    setLoading(false);
  }, [id]);

  const handleAddDeliverable = () => {
    const text = newDeliverable.trim();
    if (!text) return;
    const updated = [...deliverables, { id: String(Date.now()), text, done: false }];
    setDeliverables(updated);
    saveDeliverables(id, updated);
    setNewDeliverable("");
  };

  const handleToggleDeliverable = (delId: string) => {
    const updated = deliverables.map((d) =>
      d.id === delId ? { ...d, done: !d.done } : d
    );
    setDeliverables(updated);
    saveDeliverables(id, updated);
  };

  const handleDeleteDeliverable = (delId: string) => {
    const updated = deliverables.filter((d) => d.id !== delId);
    setDeliverables(updated);
    saveDeliverables(id, updated);
  };

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: BG,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: RED,
            opacity: 0.4,
          }}
        >
          LOADING...
        </span>
      </div>
    );
  }

  if (!project) {
    return (
      <div
        style={{
          backgroundColor: BG,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "28px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: RED,
            opacity: 0.45,
          }}
        >
          PROJECT NOT FOUND
        </p>
        <button
          onClick={() => router.push("/projects")}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: RED,
            border: `1px solid rgba(255, 26, 0, 0.4)`,
            borderRadius: 0,
            backgroundColor: "transparent",
            padding: "10px 22px",
            cursor: "pointer",
          }}
        >
          ← BACK TO BOARD
        </button>
      </div>
    );
  }

  const currentPhaseIndex = PHASE_ORDER.indexOf(project.phase);
  const overdue = isPast(new Date(project.deadline));
  const doneCount = deliverables.filter((d) => d.done).length;

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
        </Link>

        <button
          onClick={() => router.push("/projects")}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: RED,
            opacity: 0.55,
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          ← BOARD
        </button>
      </header>

      {/* ── Content ── */}
      <main
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "64px 20px 96px",
        }}
      >
        {/* ── Project identity ── */}
        <div style={{ marginBottom: "72px" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: RED,
              opacity: 0.5,
              marginBottom: "14px",
            }}
          >
            {project.client}
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 80px)",
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
              textTransform: "uppercase",
              color: RED,
              marginBottom: "28px",
            }}
          >
            {project.name}
          </h1>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: RED,
              opacity: overdue ? 1 : 0.45,
              fontWeight: overdue ? 700 : 400,
            }}
          >
            {overdue ? "⚠ OVERDUE — " : "DEADLINE — "}
            {format(new Date(project.deadline), "d MMM yyyy").toUpperCase()}
          </span>
        </div>

        {/* ── Phase progress ── */}
        <section style={{ marginBottom: "72px" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: RED,
              opacity: 0.45,
              marginBottom: "24px",
            }}
          >
            PHASE
          </p>

          <div style={{ display: "flex", alignItems: "flex-start" }}>
            {PHASES.map((phase, i) => {
              const phaseIsDone = i < currentPhaseIndex;
              const phaseIsCurrent = i === currentPhaseIndex;
              const phaseIsFuture = i > currentPhaseIndex;

              return (
                <div
                  key={phase.key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: i < 3 ? 1 : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {/* Dot */}
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor:
                          phaseIsDone || phaseIsCurrent ? RED : "transparent",
                        border: `1px solid ${
                          phaseIsFuture ? "rgba(255,26,0,0.22)" : RED
                        }`,
                        borderRadius: 0,
                        flexShrink: 0,
                      }}
                    />
                    {/* Label */}
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "9px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: RED,
                        opacity: phaseIsFuture ? 0.25 : phaseIsCurrent ? 1 : 0.5,
                        fontWeight: phaseIsCurrent ? 700 : 400,
                        whiteSpace: "nowrap",
                      }}
                    >
                      ({phase.num}) {phase.label}
                    </span>
                  </div>

                  {/* Connector line */}
                  {i < 3 && (
                    <div
                      style={{
                        flex: 1,
                        height: "1px",
                        backgroundColor: phaseIsDone
                          ? RED
                          : "rgba(255,26,0,0.18)",
                        margin: "0 6px",
                        marginBottom: "28px",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Brief ── */}
        <section
          style={{
            marginBottom: "64px",
            borderTop: `1px solid ${DIVIDER}`,
            paddingTop: "48px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: RED,
              opacity: 0.45,
              marginBottom: "20px",
            }}
          >
            BRIEF
          </p>

          {project.description ? (
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(16px, 2.2vw, 24px)",
                letterSpacing: "-0.01em",
                lineHeight: 1.35,
                textTransform: "uppercase",
                color: RED,
              }}
            >
              {project.description}
            </p>
          ) : (
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: RED,
                opacity: 0.3,
              }}
            >
              NO BRIEF ATTACHED
            </p>
          )}
        </section>

        {/* ── Deliverables ── */}
        <section
          style={{
            marginBottom: "64px",
            borderTop: `1px solid ${DIVIDER}`,
            paddingTop: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: RED,
                opacity: 0.45,
              }}
            >
              DELIVERABLES
            </p>
            {deliverables.length > 0 && (
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
                {doneCount}/{deliverables.length} DONE
              </span>
            )}
          </div>

          {/* Add row */}
          <div style={{ display: "flex", marginBottom: "16px" }}>
            <input
              value={newDeliverable}
              onChange={(e) => setNewDeliverable(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddDeliverable()}
              placeholder="Add a deliverable and press Enter..."
              style={{
                flex: 1,
                height: "40px",
                border: `1px solid ${DIVIDER}`,
                borderRight: "none",
                borderRadius: 0,
                backgroundColor: "#FFFFFF",
                padding: "0 14px",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                letterSpacing: "0.02em",
                color: RED,
                outline: "none",
              }}
            />
            <button
              onClick={handleAddDeliverable}
              disabled={!newDeliverable.trim()}
              style={{
                height: "40px",
                padding: "0 18px",
                border: `1px solid ${DIVIDER}`,
                borderRadius: 0,
                backgroundColor: newDeliverable.trim() ? RED : "transparent",
                color: newDeliverable.trim() ? "#FFFFFF" : RED,
                opacity: newDeliverable.trim() ? 1 : 0.3,
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: newDeliverable.trim() ? "pointer" : "default",
                transition: "background-color 0.15s, color 0.15s",
              }}
            >
              ADD →
            </button>
          </div>

          {/* List */}
          {deliverables.length === 0 ? (
            <div
              style={{
                border: `1px dashed ${DIVIDER}`,
                padding: "28px",
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
                  opacity: 0.28,
                }}
              >
                NO DELIVERABLES YET
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {deliverables.map((d, i) => (
                <div
                  key={d.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px 0",
                    borderBottom:
                      i < deliverables.length - 1
                        ? `1px solid ${DIVIDER}`
                        : "none",
                  }}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => handleToggleDeliverable(d.id)}
                    style={{
                      width: "16px",
                      height: "16px",
                      border: `1px solid ${d.done ? RED : "rgba(255,26,0,0.3)"}`,
                      borderRadius: 0,
                      backgroundColor: d.done ? RED : "transparent",
                      cursor: "pointer",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0,
                    }}
                  >
                    {d.done && (
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path
                          d="M1 3L3 5L7 1"
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Text */}
                  <span
                    style={{
                      flex: 1,
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      letterSpacing: "0.03em",
                      color: RED,
                      opacity: d.done ? 0.3 : 0.85,
                      textDecoration: d.done ? "line-through" : "none",
                    }}
                  >
                    {d.text}
                  </span>

                  {/* Delete */}
                  <button
                    onClick={() => handleDeleteDeliverable(d.id)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: RED,
                      opacity: 0.2,
                      fontFamily: "var(--font-mono)",
                      fontSize: "16px",
                      lineHeight: 1,
                      padding: "0 4px",
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.opacity = "0.6";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.opacity = "0.2";
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Meta footer ── */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            paddingTop: "32px",
            borderTop: `1px solid ${DIVIDER}`,
          }}
        >
          {[
            { label: "CLIENT", value: project.client },
            { label: "PHASE", value: project.phase.toUpperCase() },
            {
              label: "DEADLINE",
              value: format(new Date(project.deadline), "d MMM yyyy").toUpperCase(),
            },
            {
              label: "CREATED",
              value: format(new Date(project.createdAt), "d MMM yyyy").toUpperCase(),
            },
          ].map(({ label, value }) => (
            <div key={label}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: RED,
                  opacity: 0.38,
                  marginBottom: "5px",
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: RED,
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

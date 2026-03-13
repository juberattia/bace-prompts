"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";
import SectionHeader from "@/components/studio/SectionHeader";
import StudioCard from "@/components/studio/StudioCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Copy, Save, Check, Send } from "lucide-react";

export default function NewBriefingPage() {
  const router = useRouter();
  const projects = useQuery(api.projects.list) ?? [];
  const createBriefing = useMutation(api.briefings.create);

  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState<string>("");
  const [projectContext, setProjectContext] = useState("");
  const [targetUser, setTargetUser] = useState("");
  const [constraints, setConstraints] = useState("");
  const [materials, setMaterials] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [references, setReferences] = useState("");
  const [deliverables, setDeliverables] = useState("");
  const [deadline, setDeadline] = useState("");
  const [copied, setCopied] = useState(false);

  const buildPreview = () => {
    const sections: string[] = [];
    if (title) sections.push(`# ${title}\n`);
    if (projectContext) sections.push(`## Project Context\n${projectContext}`);
    if (targetUser) sections.push(`## Target User\n${targetUser}`);
    if (constraints) sections.push(`## Constraints\n${constraints}`);
    if (materials) sections.push(`## Materials\n${materials}`);
    if (dimensions) sections.push(`## Dimensions\n${dimensions}`);
    if (references) sections.push(`## References\n${references}`);
    if (deliverables) sections.push(`## Deliverables\n${deliverables}`);
    if (deadline) sections.push(`## Deadline\n${deadline}`);
    return sections.join("\n\n");
  };

  const preview = buildPreview();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(preview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async (status: "draft" | "active") => {
    if (!title.trim()) return;
    await createBriefing({
      title: title.trim(),
      projectId: projectId ? (projectId as Id<"projects">) : undefined,
      projectContext: projectContext.trim() || undefined,
      targetUser: targetUser.trim() || undefined,
      constraints: constraints.trim() || undefined,
      materials: materials.trim() || undefined,
      dimensions: dimensions.trim() || undefined,
      references: references.trim() || undefined,
      deliverables: deliverables.trim() || undefined,
      deadline: deadline ? new Date(deadline).getTime() : undefined,
      status,
    });
    router.push("/briefings");
  };

  const inputClass =
    "w-full px-3 py-2 bg-white border border-studio-border rounded-md text-sm font-mono text-studio-text placeholder:text-studio-muted focus:outline-none focus:border-studio-neon focus:ring-1 focus:ring-studio-neon";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Link
        href="/briefings"
        className="inline-flex items-center gap-1.5 text-[13px] font-mono text-studio-secondary hover:text-studio-text transition-colors"
      >
        <ArrowLeft size={14} />
        All Briefings
      </Link>

      <SectionHeader
        title="New Briefing"
        subtitle="Industrial design production briefing"
      />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-1">
              Briefing Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Aria Chair — Initial Design Brief"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-1">
              Link to Project (optional)
            </label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className={inputClass}
            >
              <option value="">No project linked</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} — {p.client}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-1">
              Project Context
            </label>
            <textarea
              value={projectContext}
              onChange={(e) => setProjectContext(e.target.value)}
              placeholder="Describe the project scope, goals, and background..."
              rows={3}
              className={inputClass + " resize-none"}
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-1">
              Target User
            </label>
            <textarea
              value={targetUser}
              onChange={(e) => setTargetUser(e.target.value)}
              placeholder="Who is this designed for?"
              rows={2}
              className={inputClass + " resize-none"}
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-1">
              Constraints
            </label>
            <textarea
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              placeholder="Technical limitations, certifications, budget..."
              rows={2}
              className={inputClass + " resize-none"}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-1">
                Materials
              </label>
              <textarea
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
                placeholder="Aluminum, wood, glass..."
                rows={2}
                className={inputClass + " resize-none"}
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-1">
                Dimensions
              </label>
              <textarea
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder="W × D × H, tolerances..."
                rows={2}
                className={inputClass + " resize-none"}
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-1">
              References
            </label>
            <textarea
              value={references}
              onChange={(e) => setReferences(e.target.value)}
              placeholder="Inspiration, competitor products, mood references..."
              rows={2}
              className={inputClass + " resize-none"}
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-1">
              Deliverables
            </label>
            <textarea
              value={deliverables}
              onChange={(e) => setDeliverables(e.target.value)}
              placeholder="Concept sketches, 3D model, prototype..."
              rows={2}
              className={inputClass + " resize-none"}
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-1">
              Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-studio-border rounded-md text-[13px] font-mono text-studio-secondary hover:text-studio-text hover:border-studio-neon transition-colors"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={() => handleSave("draft")}
              disabled={!title.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-studio-border rounded-md text-[13px] font-mono text-studio-secondary hover:text-studio-text hover:border-studio-neon transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Save size={14} />
              Save Draft
            </button>
            <button
              onClick={() => handleSave("active")}
              disabled={!title.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-studio-text text-white rounded-md text-[13px] font-mono hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={14} />
              Set Active
            </button>
          </div>
        </div>

        {/* Right: Live preview */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-2">
            Live Preview
          </div>
          <StudioCard className="min-h-[300px]">
            {preview ? (
              <pre className="text-[13px] font-mono text-studio-text whitespace-pre-wrap leading-relaxed">
                {preview}
              </pre>
            ) : (
              <p className="text-[13px] font-mono text-studio-muted">
                Start filling in the form to see a live preview...
              </p>
            )}
          </StudioCard>
          {preview && (
            <p className="text-[11px] font-mono text-studio-muted mt-2 text-right">
              {preview.length} characters
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

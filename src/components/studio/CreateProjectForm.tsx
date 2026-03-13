"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import type { Phase, Priority } from "@/lib/design-tokens";

const PHASES: { value: Phase; label: string }[] = [
  { value: "brief", label: "Brief" },
  { value: "concept", label: "Concept" },
  { value: "development", label: "Development" },
  { value: "handoff", label: "Handoff" },
];

const PRIORITIES: { value: Priority; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

export default function CreateProjectForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");
  const [phase, setPhase] = useState<Phase>("brief");
  const [priority, setPriority] = useState<Priority>("medium");
  const [deadline, setDeadline] = useState("");
  const [tags, setTags] = useState("");

  const createProject = useMutation(api.projects.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !client.trim()) return;

    await createProject({
      name: name.trim(),
      client: client.trim(),
      deadline: deadline ? new Date(deadline).getTime() : Date.now() + 30 * 24 * 60 * 60 * 1000,
      phase,
      description: description.trim() || undefined,
    });

    setName("");
    setClient("");
    setDescription("");
    setPhase("brief");
    setPriority("medium");
    setDeadline("");
    setTags("");
    setOpen(false);
  };

  const inputClass =
    "w-full px-3 py-2 bg-white border border-studio-border rounded-md text-sm font-mono text-studio-text placeholder:text-studio-muted focus:outline-none focus:border-studio-neon focus:ring-1 focus:ring-studio-neon";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-studio-text text-white rounded-md text-[13px] font-mono hover:bg-black transition-colors">
          <Plus size={15} />
          New Project
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white border-studio-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-lg font-bold text-studio-text uppercase tracking-tight">
            New Project
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <div>
            <label className="block text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-1">
              Project Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aria Chair Collection"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-1">
              Client
            </label>
            <input
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="e.g. Knoll Europe"
              className={inputClass}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-1">
                Phase
              </label>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value as Phase)}
                className={inputClass}
              >
                {PHASES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className={inputClass}
              >
                {PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
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
          <div>
            <label className="block text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief project description..."
              rows={3}
              className={inputClass + " resize-none"}
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-studio-muted uppercase tracking-wider mb-1">
              Tags (comma-separated)
            </label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="furniture, office, sustainable"
              className={inputClass}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-[13px] font-mono text-studio-secondary hover:text-studio-text transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-studio-text text-white rounded-md text-[13px] font-mono hover:bg-black transition-colors"
            >
              Create Project
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id, Doc } from "../../../convex/_generated/dataModel";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import { format } from "date-fns";
import { Plus, Trash2, Check } from "lucide-react";
import type { Priority, TaskStatus } from "@/lib/design-tokens";

const STATUS_ORDER: TaskStatus[] = ["todo", "in_progress", "review", "done"];
const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  review: "Review",
  done: "Done",
};

interface TaskListProps {
  tasks: Doc<"tasks">[];
  projectId: Id<"projects">;
}

export default function TaskList({ tasks, projectId }: TaskListProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("medium");

  const createTask = useMutation(api.tasks.create);
  const updateTask = useMutation(api.tasks.update);
  const removeTask = useMutation(api.tasks.remove);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await createTask({
      projectId,
      title: newTitle.trim(),
      priority: newPriority,
    });
    setNewTitle("");
    setShowAdd(false);
  };

  const cycleStatus = async (task: Doc<"tasks">) => {
    const currentIdx = STATUS_ORDER.indexOf(task.status);
    const nextStatus = STATUS_ORDER[(currentIdx + 1) % STATUS_ORDER.length];
    await updateTask({ id: task._id, status: nextStatus });
  };

  const grouped = STATUS_ORDER.map((status) => ({
    status,
    label: STATUS_LABELS[status],
    items: tasks.filter((t) => t.status === status),
  }));

  return (
    <div className="space-y-4">
      {grouped.map((group) => (
        <div key={group.status}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono text-studio-muted uppercase tracking-wider">
              {group.label}
            </span>
            <span className="text-[11px] font-mono text-studio-muted">
              ({group.items.length})
            </span>
          </div>
          {group.items.length === 0 ? (
            <p className="text-[12px] font-mono text-studio-muted pl-1 pb-2">
              No tasks
            </p>
          ) : (
            <div className="space-y-1">
              {group.items.map((task) => (
                <div
                  key={task._id}
                  className="flex items-center gap-3 px-3 py-2 bg-white border border-studio-border rounded-md group hover:border-studio-neon/50 transition-colors"
                >
                  <button
                    onClick={() => cycleStatus(task)}
                    className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-colors ${
                      task.status === "done"
                        ? "bg-studio-neon border-studio-neon-dark"
                        : "border-studio-border hover:border-studio-neon"
                    }`}
                  >
                    {task.status === "done" && (
                      <Check size={10} className="text-studio-text" />
                    )}
                  </button>
                  <span
                    className={`flex-1 text-[13px] font-mono ${
                      task.status === "done"
                        ? "text-studio-muted line-through"
                        : "text-studio-text"
                    }`}
                  >
                    {task.title}
                  </span>
                  <PriorityBadge priority={task.priority} />
                  {task.status !== "done" && (
                    <StatusBadge status={task.status} />
                  )}
                  {task.dueDate && (
                    <span className="text-[11px] font-mono text-studio-muted hidden sm:inline">
                      {format(new Date(task.dueDate), "MMM d")}
                    </span>
                  )}
                  <button
                    onClick={() => removeTask({ id: task._id })}
                    className="opacity-0 group-hover:opacity-100 p-1 text-studio-muted hover:text-red-500 transition-all"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Inline add form */}
      {showAdd ? (
        <form onSubmit={handleAdd} className="flex items-center gap-2">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Task title..."
            autoFocus
            className="flex-1 px-3 py-2 bg-white border border-studio-border rounded-md text-sm font-mono text-studio-text placeholder:text-studio-muted focus:outline-none focus:border-studio-neon"
          />
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value as Priority)}
            className="px-2 py-2 bg-white border border-studio-border rounded-md text-[12px] font-mono text-studio-text focus:outline-none focus:border-studio-neon"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
          <button
            type="submit"
            className="px-3 py-2 bg-studio-text text-white rounded-md text-[13px] font-mono hover:bg-black transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setShowAdd(false)}
            className="px-3 py-2 text-[13px] font-mono text-studio-muted hover:text-studio-text transition-colors"
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-1.5 text-[13px] font-mono text-studio-secondary hover:text-studio-text transition-colors"
        >
          <Plus size={14} />
          Add task
        </button>
      )}
    </div>
  );
}

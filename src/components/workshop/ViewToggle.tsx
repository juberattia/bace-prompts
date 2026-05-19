"use client";

import { cn } from "@/lib/utils";

type WorkshopView = "schedule" | "pillars";

interface ViewToggleProps {
  activeView: WorkshopView;
  onChange: (view: WorkshopView) => void;
}

const TABS: { value: WorkshopView; label: string }[] = [
  { value: "schedule", label: "Schedule" },
  { value: "pillars", label: "7 Pillars" },
];

export function ViewToggle({ activeView, onChange }: ViewToggleProps) {
  return (
    <div role="tablist" aria-label="Workshop view" className="inline-flex border border-studio-border">
      {TABS.map((tab) => {
        const isActive = activeView === tab.value;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.value}`}
            id={`tab-${tab.value}`}
            onClick={() => onChange(tab.value)}
            className={cn(
              "font-mono text-xs tracking-widest uppercase px-4 py-2 transition-colors duration-150",
              isActive
                ? "bg-studio-text text-white"
                : "text-studio-muted hover:text-studio-text"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

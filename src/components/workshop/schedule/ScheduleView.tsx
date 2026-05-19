"use client";

import { useState } from "react";
import { WORKSHOP_PHASES } from "@/lib/workshop-data";
import { PhaseSection } from "./PhaseSection";

export function ScheduleView() {
  const [expandedBlockId, setExpandedBlockId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedBlockId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      role="tabpanel"
      id="panel-schedule"
      aria-labelledby="tab-schedule"
      className="space-y-8"
    >
      {WORKSHOP_PHASES.map((phase) => (
        <PhaseSection
          key={phase.id}
          phase={phase}
          expandedBlockId={expandedBlockId}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}

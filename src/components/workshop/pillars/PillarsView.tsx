"use client";

import { useState } from "react";
import { WORKSHOP_PILLARS } from "@/lib/workshop-data";
import { PillarCard } from "./PillarCard";

export function PillarsView() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      role="tabpanel"
      id="panel-pillars"
      aria-labelledby="tab-pillars"
      className="space-y-2"
    >
      {WORKSHOP_PILLARS.map((pillar) => (
        <PillarCard
          key={pillar.id}
          pillar={pillar}
          isExpanded={expandedId === pillar.id}
          onToggle={() => handleToggle(pillar.id)}
        />
      ))}
    </div>
  );
}

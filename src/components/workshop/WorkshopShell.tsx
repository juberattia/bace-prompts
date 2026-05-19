"use client";

import { useState } from "react";
import { WORKSHOP_META } from "@/lib/workshop-data";
import { ViewToggle } from "./ViewToggle";
import { ScheduleView } from "./schedule/ScheduleView";
import { PillarsView } from "./pillars/PillarsView";

type WorkshopView = "schedule" | "pillars";

export function WorkshopShell() {
  const [activeView, setActiveView] = useState<WorkshopView>("schedule");

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
      {/* Header */}
      <div className="mb-8 sm:mb-10">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-studio-muted mb-3">
          {WORKSHOP_META.location} &middot; {WORKSHOP_META.priceRange}&euro;
        </div>
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-studio-text tracking-tight mb-1">
          {WORKSHOP_META.title}
        </h1>
        <p className="font-mono text-xs text-studio-secondary">
          {WORKSHOP_META.subtitle}
        </p>
      </div>

      {/* View toggle */}
      <div className="mb-8">
        <ViewToggle activeView={activeView} onChange={setActiveView} />
      </div>

      {/* Active view */}
      {activeView === "schedule" ? <ScheduleView /> : <PillarsView />}
    </div>
  );
}

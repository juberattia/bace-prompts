import type { WorkshopPhase } from "@/lib/workshop-types";
import { ScheduleBlock } from "./ScheduleBlock";

interface PhaseSectionProps {
  phase: WorkshopPhase;
  expandedBlockId: string | null;
  onToggle: (id: string) => void;
}

export function PhaseSection({ phase, expandedBlockId, onToggle }: PhaseSectionProps) {
  return (
    <section aria-label={`Phase ${phase.number}: ${phase.title}`}>
      {/* Ink-block phase header */}
      <div className="relative bg-studio-text overflow-hidden px-5 py-6 sm:px-6 sm:py-8 mb-4">
        {/* Watermark number */}
        <span
          aria-hidden="true"
          className="absolute right-4 top-1/2 -translate-y-1/2 font-display text-[120px] font-black leading-none text-white/[0.04] select-none pointer-events-none"
        >
          {phase.number}
        </span>

        <div className="relative z-10">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">
            Phase {phase.number} &middot; {phase.timeRange}
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {phase.title}
          </h2>
          <p className="font-mono text-xs text-white/50 mt-2 leading-relaxed max-w-lg">
            {phase.description}
          </p>
        </div>
      </div>

      {/* Block list */}
      <div className="space-y-2" style={{ borderLeftColor: phase.accent }}>
        {phase.blocks.map((block) => (
          <ScheduleBlock
            key={block.id}
            block={block}
            accent={phase.accent}
            isExpanded={expandedBlockId === block.id}
            onToggle={() => onToggle(block.id)}
          />
        ))}
      </div>
    </section>
  );
}

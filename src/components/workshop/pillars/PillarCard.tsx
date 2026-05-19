"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorkshopPillar } from "@/lib/workshop-types";

interface PillarCardProps {
  pillar: WorkshopPillar;
  isExpanded: boolean;
  onToggle: () => void;
}

export function PillarCard({ pillar, isExpanded, onToggle }: PillarCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={cn(
      "border border-studio-border transition-colors duration-150",
      isExpanded && "border-studio-secondary"
    )}>
      {/* Trigger */}
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`pillar-${pillar.id}`}
        className="flex items-center gap-4 px-5 py-4 sm:py-5 w-full text-left group"
      >
        <span className={cn(
          "font-mono text-xs tracking-widest transition-colors duration-150 shrink-0",
          isExpanded ? "text-studio-neon-dark" : "text-studio-muted group-hover:text-studio-neon-dark"
        )}>
          {pillar.number}
        </span>
        <div className="flex-1 min-w-0">
          <div className="font-display text-base font-bold text-studio-text tracking-tight">
            {pillar.name}
          </div>
          <div className="font-mono text-xs text-studio-muted mt-0.5 truncate">
            {pillar.principle}
          </div>
        </div>
        <ChevronDown
          size={16}
          className={cn(
            "text-studio-muted shrink-0 transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`pillar-${pillar.id}`}
            role="region"
            aria-hidden={!isExpanded}
            initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-studio-border pt-4">
              {/* Pillar image */}
              <div className="relative w-full aspect-[4/5] mb-4 overflow-hidden bg-studio-bg">
                <Image
                  src={pillar.image}
                  alt={`${pillar.name} — ${pillar.principle}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 700px"
                />
              </div>

              {/* Detail cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {pillar.details.map((detail) => (
                  <div
                    key={detail.label}
                    className="p-4 bg-studio-bg border border-studio-border"
                  >
                    <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-studio-neon-dark mb-2">
                      {detail.label}
                    </div>
                    <div className="font-mono text-xs text-studio-secondary leading-relaxed">
                      {detail.body}
                    </div>
                  </div>
                ))}
              </div>

              {/* Prompt example */}
              <div className="border-l-[3px] border-studio-neon pl-4 py-3 mb-3 bg-studio-bg/50">
                <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-studio-neon-dark mb-2">
                  Alpha Prompt Example
                </div>
                <div className="font-mono text-xs text-studio-secondary leading-relaxed italic">
                  {pillar.promptExample}
                </div>
              </div>

              {/* Pro tip */}
              <div className="flex gap-3 p-4 bg-studio-bg border border-studio-border">
                <span className="text-studio-neon-dark shrink-0">&rarr;</span>
                <div>
                  <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-studio-neon-dark mb-1.5">
                    Pro tip
                  </div>
                  <div className="font-mono text-xs text-studio-secondary leading-relaxed">
                    {pillar.proTip}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

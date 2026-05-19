"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Package, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorkshopBlockData } from "@/lib/workshop-types";

interface ScheduleBlockProps {
  block: WorkshopBlockData;
  accent: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export function ScheduleBlock({ block, accent, isExpanded, onToggle }: ScheduleBlockProps) {
  const shouldReduceMotion = useReducedMotion();

  if (block.isBreak) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 opacity-40">
        <span className="font-mono text-xs text-studio-muted w-14 shrink-0">{block.time}</span>
        <span className="font-mono text-xs text-studio-muted">{block.title}</span>
        <span className="font-mono text-[10px] text-studio-muted">&middot; {block.duration}</span>
      </div>
    );
  }

  return (
    <div className={cn(
      "border border-studio-border transition-colors duration-150",
      isExpanded && "border-studio-secondary"
    )}>
      {/* Trigger */}
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={block.id}
        className="flex items-center gap-3 sm:gap-4 px-4 py-3 w-full text-left group"
      >
        <span className="font-mono text-xs text-studio-muted w-14 shrink-0">{block.time}</span>
        <span className="hidden sm:inline-block font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 border border-studio-border text-studio-muted shrink-0">
          {block.duration}
        </span>
        <span className="font-display text-sm text-studio-text flex-1 group-hover:text-studio-text/80 transition-colors">
          {block.title}
        </span>
        {block.deliverable && (
          <span className="hidden sm:flex items-center gap-1.5 shrink-0">
            <Package size={12} style={{ color: accent }} />
            <span className="font-mono text-[9px] tracking-wider uppercase" style={{ color: accent }}>
              Output
            </span>
          </span>
        )}
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
            id={block.id}
            role="region"
            aria-hidden={!isExpanded}
            initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-studio-border">
              {/* Deliverable callout */}
              {block.deliverable && (
                <div
                  className="border-l-[3px] pl-3 py-2 mb-4 mt-2"
                  style={{ borderLeftColor: accent }}
                >
                  <div
                    className="font-mono text-[9px] tracking-[0.15em] uppercase mb-1"
                    style={{ color: accent }}
                  >
                    Block output
                  </div>
                  <div className="font-mono text-xs text-studio-secondary leading-relaxed">
                    {block.deliverable}
                  </div>
                </div>
              )}

              {/* Content bullets */}
              {block.bullets.length > 0 && (
                <div className="mb-4">
                  <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-studio-muted mb-3">
                    Content
                  </div>
                  <div className="space-y-2">
                    {block.bullets.map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="shrink-0 mt-1.5" style={{ color: accent }}>
                          &rarr;
                        </span>
                        <span className="font-mono text-xs text-studio-secondary leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Assets */}
              {block.assets.length > 0 && (
                <div>
                  <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-studio-muted mb-3">
                    Assets to prepare
                  </div>
                  <div className="space-y-1.5">
                    {block.assets.map((asset, i) => (
                      <div key={i} className="flex items-start gap-2.5 px-3 py-2.5 bg-studio-bg border border-studio-border">
                        <Square size={10} className="text-studio-muted shrink-0 mt-0.5" />
                        <span className="font-mono text-xs text-studio-secondary leading-relaxed">
                          {asset}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

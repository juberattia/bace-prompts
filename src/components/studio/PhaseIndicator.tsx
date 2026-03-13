import { PHASE_COLORS, type Phase } from "@/lib/design-tokens";

interface PhaseIndicatorProps {
  phase: Phase;
  size?: "sm" | "md";
}

export default function PhaseIndicator({ phase, size = "sm" }: PhaseIndicatorProps) {
  const colors = PHASE_COLORS[phase];
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono"
      style={{
        fontSize: size === "sm" ? 11 : 12,
        color: colors.text,
      }}
    >
      <span
        className="rounded-full shrink-0"
        style={{
          width: size === "sm" ? 6 : 8,
          height: size === "sm" ? 6 : 8,
          backgroundColor: colors.dot,
        }}
      />
      {colors.label}
    </span>
  );
}

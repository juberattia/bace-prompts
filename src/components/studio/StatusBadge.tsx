import { STATUS_COLORS, BRIEFING_STATUS_COLORS, type TaskStatus, type BriefingStatus } from "@/lib/design-tokens";

interface StatusBadgeProps {
  status: TaskStatus | BriefingStatus;
  type?: "task" | "briefing";
}

export default function StatusBadge({ status, type = "task" }: StatusBadgeProps) {
  const colorMap = type === "briefing" ? BRIEFING_STATUS_COLORS : STATUS_COLORS;
  const colors = (colorMap as Record<string, { bg: string; text: string; label: string }>)[status];
  if (!colors) return null;
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {colors.label}
    </span>
  );
}

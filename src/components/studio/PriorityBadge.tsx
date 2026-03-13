import { PRIORITY_COLORS, type Priority } from "@/lib/design-tokens";

interface PriorityBadgeProps {
  priority: Priority;
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const colors = PRIORITY_COLORS[priority];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {colors.label}
    </span>
  );
}

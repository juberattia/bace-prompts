import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function SectionHeader({ title, subtitle, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-end justify-between gap-4 mb-4", className)}>
      <div>
        <h2 className="font-display text-xl font-bold tracking-tight text-studio-text uppercase leading-none">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[13px] font-mono text-studio-muted mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

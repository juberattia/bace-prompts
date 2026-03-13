import { cn } from "@/lib/utils";

interface StudioCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export default function StudioCard({
  children,
  className,
  onClick,
  hover = false,
}: StudioCardProps) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      className={cn(
        "bg-white border border-studio-border rounded-lg p-4 text-left",
        hover && "transition-all duration-150 hover:border-studio-neon hover:shadow-sm",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </Tag>
  );
}

import { cn } from "@/lib/utils";

interface ClinicalBadgeProps {
  level: "success" | "warning" | "danger" | "neutral" | "gold" | "sapphire";
  children: React.ReactNode;
  className?: string;
}

export function ClinicalBadge({ level, children, className }: ClinicalBadgeProps) {
  const styles = {
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    danger: "bg-danger/10 text-danger border-danger/20",
    neutral: "bg-neutral/10 text-neutral border-neutral/20",
    gold: "bg-gold-500/10 text-gold-700 border-gold-500/20",
    sapphire: "bg-sapphire-500/10 text-sapphire-700 border-sapphire-500/20",
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
      styles[level],
      className
    )}>
      {children}
    </span>
  );
}

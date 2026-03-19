import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MedicalCardProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function MedicalCard({ title, icon, children, className }: MedicalCardProps) {
  return (
    <div className={cn(
      "bg-white-pure rounded-2xl border border-sapphire-50/50 shadow-sm overflow-hidden",
      "transition-all duration-300 hover:shadow-md hover:border-sapphire-500/20",
      className
    )}>
      {title && (
        <div className="px-6 py-4 border-b border-sapphire-50 flex items-center gap-3 bg-off-white/50">
          {icon && <div className="text-sapphire-500">{icon}</div>}
          <h3 className="font-display font-semibold text-lg text-sapphire-900">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

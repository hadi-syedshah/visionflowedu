import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  trend = "up",
  className,
}: {
  label: string;
  value: string;
  delta?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  className?: string;
}) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-primary opacity-10 blur-2xl" />
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">{value}</p>
            {delta && (
              <p
                className={cn(
                  "mt-1 text-xs font-medium",
                  trend === "up" && "text-emerald-500",
                  trend === "down" && "text-rose-500",
                  trend === "neutral" && "text-muted-foreground",
                )}
              >
                {delta}
              </p>
            )}
          </div>
          <div className="h-10 w-10 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
            <Icon className="h-5 w-5 text-primary-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
import { cn } from "@/lib/utils";
import { Alert as AlertType } from "@/lib/store";
import { AlertTriangle, Info, XOctagon } from "lucide-react";

const severityIcon: Record<string, React.ElementType> = {
  Low: Info,
  Medium: AlertTriangle,
  Critical: XOctagon,
};

const severityColor: Record<string, string> = {
  Low: "text-success",
  Medium: "text-warning",
  Critical: "text-critical",
};

export default function AlertList({ alerts }: { alerts: AlertType[] }) {
  if (alerts.length === 0) {
    return <p className="text-sm text-muted-foreground py-8 text-center">No alerts yet</p>;
  }

  return (
    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
      {alerts.map((alert, i) => {
        const Icon = severityIcon[alert.severity];
        return (
          <div
            key={alert.id}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg border border-border bg-card transition-all duration-300",
              alert.severity === "Critical" && "pulse-critical",
              "animate-slide-in"
            )}
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", severityColor[alert.severity])} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-foreground">{alert.machineId}</span>
                <span className={cn("text-xs font-medium px-1.5 py-0.5 rounded", {
                  "bg-success/10 text-success": alert.severity === "Low",
                  "bg-warning/10 text-warning": alert.severity === "Medium",
                  "bg-critical/10 text-critical": alert.severity === "Critical",
                })}>
                  {alert.severity}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{alert.message}</p>
              <p className="text-[10px] text-muted-foreground/60 mt-1">
                {alert.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

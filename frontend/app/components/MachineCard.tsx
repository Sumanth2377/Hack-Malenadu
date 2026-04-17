import Link from "next/link";
import { Thermometer, Activity, Gauge, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Machine } from "@/lib/store";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, string> = {
  Running: "bg-success/15 text-success",
  Warning: "bg-warning/15 text-warning",
  Fault: "bg-critical/15 text-critical",
};

const severityVariant: Record<string, string> = {
  Low: "bg-success/15 text-success border-success/20",
  Medium: "bg-warning/15 text-warning border-warning/20",
  Critical: "bg-critical/15 text-critical border-critical/20",
};

export default function MachineCard({ machine }: { machine: Machine }) {
  return (
    <Link
      href={`/machines/${machine.id}`}
      className={cn(
        "card-elevated p-5 block animate-fade-in cursor-pointer",
        machine.severity === "Critical" && "pulse-critical"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-muted-foreground font-medium">{machine.id}</p>
          <h3 className="font-heading font-semibold text-foreground">{machine.name}</h3>
        </div>
        <span className={cn("text-xs font-medium px-2 py-1 rounded-full", statusColors[machine.status])}>
          {machine.status}
        </span>
      </div>

      {/* Sensors */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <SensorItem icon={Thermometer} label="Temp" value={`${machine.sensors.temperature}°C`} />
        <SensorItem icon={Activity} label="Vibration" value={`${machine.sensors.vibration} mm/s`} />
        <SensorItem icon={Gauge} label="RPM" value={`${machine.sensors.rpm}`} />
        <SensorItem icon={Zap} label="Current" value={`${machine.sensors.current} A`} />
      </div>

      {/* Risk Score */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Risk Score</span>
          <span className="font-semibold text-foreground">{Math.round(machine.riskScore)}%</span>
        </div>
        <Progress value={machine.riskScore} className="h-2" />
      </div>

      {/* Severity */}
      <div className="mt-3 flex justify-end">
        <Badge variant="outline" className={cn("text-xs border", severityVariant[machine.severity])}>
          {machine.severity}
        </Badge>
      </div>
    </Link>
  );
}

function SensorItem({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-sm min-w-0">
      <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      <span className="text-muted-foreground shrink-0">{label}:</span>
      <span className="font-medium text-foreground truncate">{value}</span>
    </div>
  );
}

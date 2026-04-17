'use client';
import { useParams } from "next/navigation";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { useStore } from "@/lib/StoreContext";
import { useSensorHistory } from "@/lib/store";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const severityColor: Record<string, string> = {
  Low: "bg-success/15 text-success border-success/20",
  Medium: "bg-warning/15 text-warning border-warning/20",
  Critical: "bg-critical/15 text-critical border-critical/20",
};

export default function MachineDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { machines } = useStore();
  const machine = machines.find((m) => m.id === id);
  const history = useSensorHistory(id || "", machines);

  if (!machine) {
    return (
      <AppLayout>
        <p className="text-muted-foreground">Machine not found.</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div>
          <h2 className="font-heading font-semibold text-xl text-foreground">{machine.name}</h2>
          <p className="text-sm text-muted-foreground">{machine.id}</p>
        </div>
        <Badge variant="outline" className={cn("border ml-auto", severityColor[machine.severity])}>
          {machine.severity}
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Temperature", value: `${machine.sensors.temperature}°C` },
          { label: "Vibration", value: `${machine.sensors.vibration} mm/s` },
          { label: "RPM", value: `${machine.sensors.rpm}` },
          { label: "Current", value: `${machine.sensors.current} A` },
        ].map((s) => (
          <div key={s.label} className="card-elevated p-4 text-center">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-lg font-semibold text-foreground mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card-elevated p-5">
        <h3 className="font-heading font-semibold text-foreground mb-4">Sensor Trends</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 15% 88%)" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="hsl(25 10% 50%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(25 10% 50%)" />
              <Tooltip contentStyle={{ background: "hsl(36 40% 98%)", border: "1px solid hsl(30 15% 88%)", borderRadius: "8px", fontSize: 12 }} />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#e67e22" strokeWidth={2} dot={false} name="Temp (°C)" />
              <Line type="monotone" dataKey="vibration" stroke="#3498db" strokeWidth={2} dot={false} name="Vibration" />
              <Line type="monotone" dataKey="rpm" stroke="#2ecc71" strokeWidth={2} dot={false} name="RPM" />
              <Line type="monotone" dataKey="current" stroke="#9b59b6" strokeWidth={2} dot={false} name="Current (A)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppLayout>
  );
}

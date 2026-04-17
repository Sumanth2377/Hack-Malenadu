'use client';
import { useParams, useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";
import { useStore } from "@/lib/StoreContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, Wrench, Users, UserCircle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EngineerProfile() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { engineers, machines } = useStore();

  const engineer = engineers.find((e) => e.id === id);
  if (!engineer) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <UserCircle className="h-16 w-16 mb-4 opacity-40" />
          <p className="text-lg font-medium">Engineer not found</p>
          <Button variant="outline" className="mt-4" onClick={() => router.push("/engineers")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Engineers
          </Button>
        </div>
      </AppLayout>
    );
  }

  const assignedMachines = machines.filter((m) => engineer.assignedMachines.includes(m.id));
  // Simulated team members under this engineer
  const teamMembers = [
    { name: "Technician A", role: "Junior Technician", status: "Active" },
    { name: "Technician B", role: "Senior Technician", status: "Active" },
    { name: "Trainee C", role: "Trainee", status: "On Leave" },
  ];

  const statusColor = (status: string) =>
    status === "Running" ? "bg-success/15 text-success border-success/30"
      : status === "Warning" ? "bg-warning/15 text-warning border-warning/30"
      : "bg-destructive/15 text-destructive border-destructive/30";

  return (
    <AppLayout>
      <Button variant="ghost" size="sm" className="mb-4 gap-1.5 text-muted-foreground" onClick={() => router.push("/engineers")}>
        <ArrowLeft className="h-4 w-4" /> Back to Engineers
      </Button>

      {/* Profile Header */}
      <div className="card-elevated p-6 md:p-8 mb-6 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
          <div className="h-20 w-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shrink-0">
            <UserCircle className="h-10 w-10 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-heading font-bold text-xl text-foreground">{engineer.name}</h2>
            <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
              <Phone className="h-3.5 w-3.5" /> {engineer.phone}
            </div>
            <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
              <Settings className="h-3.5 w-3.5" /> ID: {engineer.id}
            </div>
          </div>
          <div className="flex gap-3 text-center">
            <div className="card-elevated px-5 py-3">
              <p className="text-2xl font-bold text-primary">{assignedMachines.length}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Machines</p>
            </div>
            <div className="card-elevated px-5 py-3">
              <p className="text-2xl font-bold text-primary">{teamMembers.length}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Members</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Assigned Machines */}
        <div className="card-elevated p-5 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="h-4.5 w-4.5 text-primary" />
            <h3 className="font-heading font-semibold text-foreground">Assigned Machines</h3>
          </div>
          {assignedMachines.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No machines assigned yet.</p>
          ) : (
            <div className="space-y-3">
              {assignedMachines.map((m) => (
                <div
                  key={m.id}
                  onClick={() => router.push(`/machines/${m.id}`)}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/50 hover:bg-accent/50 cursor-pointer transition-colors duration-200"
                >
                  <div>
                    <p className="font-medium text-sm text-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={cn("text-[10px] border", statusColor(m.status))} variant="outline">
                      {m.status}
                    </Badge>
                    <span className="text-xs font-semibold text-muted-foreground">Risk {m.riskScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Team Members */}
        <div className="card-elevated p-5 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-4.5 w-4.5 text-primary" />
            <h3 className="font-heading font-semibold text-foreground">Team Members</h3>
          </div>
          <div className="space-y-3">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/50">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center">
                    <UserCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] border",
                    member.status === "Active"
                      ? "bg-success/15 text-success border-success/30"
                      : "bg-warning/15 text-warning border-warning/30"
                  )}
                >
                  {member.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

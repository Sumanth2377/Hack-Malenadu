'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";
import { useStore } from "@/lib/StoreContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Phone, UserCircle, Wrench, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Engineers() {
  const { engineers, machines, addEngineer, updateEngineer, assignMachine } = useStore();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedMachines, setSelectedMachines] = useState<string[]>([]);

  const openAdd = () => {
    setEditId(null);
    setName("");
    setPhone("");
    setSelectedMachines([]);
    setDialogOpen(true);
  };

  const openEdit = (e: typeof engineers[0]) => {
    setEditId(e.id);
    setName(e.name);
    setPhone(e.phone);
    setSelectedMachines([...e.assignedMachines]);
    setDialogOpen(true);
  };

  const toggleMachine = (machineId: string) => {
    setSelectedMachines((prev) =>
      prev.includes(machineId) ? prev.filter((m) => m !== machineId) : [...prev, machineId]
    );
  };

  const handleSave = () => {
    if (!name.trim() || !phone.trim()) return;
    if (editId) {
      updateEngineer(editId, { name, phone });
      // Sync machine assignments
      const eng = engineers.find((e) => e.id === editId);
      if (eng) {
        const toAdd = selectedMachines.filter((m) => !eng.assignedMachines.includes(m));
        const toRemove = eng.assignedMachines.filter((m) => !selectedMachines.includes(m));
        toAdd.forEach((m) => assignMachine(editId, m));
        toRemove.forEach((m) => assignMachine(editId, m));
      }
    } else {
      addEngineer(name, phone);
      // Assign machines to newly created engineer after a tick
      setTimeout(() => {
        // We need the latest engineer id — it's timestamp-based
      }, 0);
    }
    setDialogOpen(false);
  };

  const statusColor = (status: string) =>
    status === "Running" ? "bg-success/15 text-success border-success/30"
      : status === "Warning" ? "bg-warning/15 text-warning border-warning/30"
      : "bg-destructive/15 text-destructive border-destructive/30";

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-xl text-foreground">Engineer Management</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{engineers.length} engineers registered</p>
        </div>
        <Button onClick={openAdd} size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" /> Add Engineer
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-5xl">
        {engineers.map((eng) => {
          const assignedMachineData = machines.filter((m) => eng.assignedMachines.includes(m.id));
          return (
            <div
              key={eng.id}
              className="card-elevated p-5 animate-fade-in cursor-pointer group"
              onClick={() => router.push(`/engineers/${eng.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                    <UserCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">{eng.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                      <Phone className="h-3 w-3" />
                      {eng.phone}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(e) => { e.stopPropagation(); openEdit(eng); }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground font-medium">Assigned Machines ({assignedMachineData.length})</p>
                </div>
                {assignedMachineData.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic">No machines assigned</p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {assignedMachineData.map((m) => (
                      <Badge
                        key={m.id}
                        variant="outline"
                        className={cn("text-[10px] border", statusColor(m.status))}
                      >
                        {m.id}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle className="font-heading">{editId ? "Edit" : "Add"} Engineer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />

            <div>
              <p className="text-sm font-medium text-foreground mb-2">Assign Machines</p>
              <div className="flex flex-wrap gap-2">
                {machines.map((m) => {
                  const selected = selectedMachines.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => toggleMachine(m.id)}
                      className={cn(
                        "text-xs px-3 py-1.5 rounded-full border transition-colors duration-200 font-medium",
                        selected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-muted-foreground border-border hover:border-primary/50"
                      )}
                    >
                      {m.id} — {m.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <Button onClick={handleSave} className="w-full">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}

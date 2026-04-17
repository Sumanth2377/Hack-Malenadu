"use client";
import MachineCard from "@/components/MachineCard";
import AlertList from "@/components/AlertList";
import CallEscalationPanel from "@/components/CallEscalationPanel";
import ToastAlert from "@/components/ToastAlert";
import CriticalModal from "@/components/CriticalModal";
import { useStore } from "@/lib/StoreContext";
import AppLayout from "@/components/AppLayout";

export default function Index() {
  const { machines, alerts, callEscalation, smsEscalation, newAlert, criticalAlert, dismissCritical, dismissToast, triggerCall, triggerSms } = useStore();

  const handleMediumDismiss = () => {
    if (newAlert) {
      triggerSms(newAlert.machineId, newAlert.message);
    }
    dismissToast();
  };

  const handleCriticalAcknowledge = (machineId: string) => {
    triggerCall(machineId);
  };

  return (
    <AppLayout>
      <ToastAlert alert={newAlert} onDismiss={handleMediumDismiss} />
      <CriticalModal alert={criticalAlert} onDismiss={dismissCritical} onAcknowledge={handleCriticalAcknowledge} />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <CallEscalationPanel escalation={callEscalation} smsEscalation={smsEscalation} />
          <div>
            <h2 className="font-heading font-semibold text-lg text-foreground mb-4">Machine Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {machines.map((m) => (
                <MachineCard key={m.id} machine={m} />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-80 shrink-0">
          <div className="card-elevated p-4">
            <h3 className="font-heading font-semibold text-foreground mb-3">Recent Alerts</h3>
            <AlertList alerts={alerts.slice(0, 20)} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

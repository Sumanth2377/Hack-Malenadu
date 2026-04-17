'use client';
import { useEffect } from "react";
import { toast } from "sonner";
import { Alert } from "@/lib/store";

export default function ToastAlert({ alert, onDismiss }: { alert: Alert | null; onDismiss: () => void }) {
  useEffect(() => {
    if (alert) {
      toast.warning(`${alert.machineId}: ${alert.message}`, {
        description: alert.timestamp.toLocaleTimeString(),
        duration: 4000,
      });
      onDismiss();
    }
  }, [alert, onDismiss]);

  return null;
}

import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction } from "@/components/ui/alert-dialog";
import { XOctagon } from "lucide-react";
import { Alert } from "@/lib/store";

interface CriticalModalProps {
  alert: Alert | null;
  onDismiss: () => void;
  onAcknowledge?: (machineId: string) => void;
}

export default function CriticalModal({ alert, onDismiss, onAcknowledge }: CriticalModalProps) {
  const handleAcknowledge = () => {
    if (alert && onAcknowledge) {
      onAcknowledge(alert.machineId);
    }
    onDismiss();
  };

  return (
    <AlertDialog open={!!alert} onOpenChange={() => onDismiss()}>
      <AlertDialogContent className="bg-card border-critical/30">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-critical/10">
              <XOctagon className="h-6 w-6 text-critical calling-pulse" />
            </div>
            <AlertDialogTitle className="font-heading text-foreground">Critical Alert</AlertDialogTitle>
          </div>
          <AlertDialogDescription asChild className="text-muted-foreground mt-2 space-y-2">
            <div>
              <p className="font-medium text-foreground">{alert?.machineId} — {alert?.message}</p>
              <p>Critical issue detected. Engineer will be called upon acknowledgement.</p>
              <p className="text-xs">{alert?.timestamp.toLocaleString()}</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleAcknowledge}>
            Acknowledge & Call Engineer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

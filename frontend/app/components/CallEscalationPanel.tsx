import { Phone, PhoneCall, PhoneOff, MessageSquare, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CallEscalation, SmsEscalation } from "@/lib/store";

const callStatusConfig = {
  Calling: { icon: Phone, label: "Calling Engineer…", color: "text-warning" },
  Connected: { icon: PhoneCall, label: "Connected", color: "text-success" },
  Failed: { icon: PhoneOff, label: "Call Failed", color: "text-critical" },
  Idle: { icon: Phone, label: "", color: "" },
};

const smsStatusConfig = {
  Sending: { icon: MessageSquare, label: "Sending SMS…", color: "text-warning" },
  Sent: { icon: CheckCircle, label: "SMS Sent", color: "text-success" },
  Failed: { icon: MessageSquare, label: "SMS Failed", color: "text-critical" },
  Idle: { icon: MessageSquare, label: "", color: "" },
};

export default function CallEscalationPanel({ escalation, smsEscalation }: { escalation: CallEscalation | null; smsEscalation?: SmsEscalation | null }) {
  const showCall = escalation && escalation.status !== "Idle";
  const showSms = smsEscalation && smsEscalation.status !== "Idle";

  if (!showCall && !showSms) return null;

  return (
    <div className="space-y-2">
      {showCall && (
        <div className="card-elevated p-4 animate-fade-in border-l-4 border-l-warning">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-full bg-accent", escalation.status === "Calling" && "calling-pulse")}>
              {(() => { const C = callStatusConfig[escalation.status]; return <C.icon className={cn("h-5 w-5", C.color)} />; })()}
            </div>
            <div>
              <p className={cn("text-sm font-semibold", callStatusConfig[escalation.status].color)}>{callStatusConfig[escalation.status].label}</p>
              <p className="text-xs text-muted-foreground">
                {escalation.engineerName} → {escalation.machineId}
              </p>
            </div>
          </div>
        </div>
      )}
      {showSms && (
        <div className="card-elevated p-4 animate-fade-in border-l-4 border-l-primary">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-full bg-accent", smsEscalation.status === "Sending" && "calling-pulse")}>
              {(() => { const C = smsStatusConfig[smsEscalation.status]; return <C.icon className={cn("h-5 w-5", C.color)} />; })()}
            </div>
            <div>
              <p className={cn("text-sm font-semibold", smsStatusConfig[smsEscalation.status].color)}>{smsStatusConfig[smsEscalation.status].label}</p>
              <p className="text-xs text-muted-foreground">
                {smsEscalation.engineerName} → {smsEscalation.machineId}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

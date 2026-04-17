'use client';
import { useState, useCallback, useEffect, useRef } from "react";

export type MachineStatus = "Running" | "Warning" | "Fault";
export type Severity = "Low" | "Medium" | "Critical";
export type CallStatus = "Idle" | "Calling" | "Connected" | "Failed";
export type SmsStatus = "Idle" | "Sending" | "Sent" | "Failed";

export interface SensorData {
  temperature: number;
  vibration: number;
  rpm: number;
  current: number;
}

export interface Machine {
  id: string;
  name: string;
  status: MachineStatus;
  sensors: SensorData;
  riskScore: number;
  severity: Severity;
  assignedEngineer?: string;
}

export interface Alert {
  id: string;
  machineId: string;
  timestamp: Date;
  severity: Severity;
  message: string;
}

export interface Engineer {
  id: string;
  name: string;
  phone: string;
  assignedMachines: string[];
}

export interface CallEscalation {
  engineerId: string;
  engineerName: string;
  machineId: string;
  status: CallStatus;
}

export interface SmsEscalation {
  engineerId: string;
  engineerName: string;
  machineId: string;
  status: SmsStatus;
  message: string;
}

const randomBetween = (min: number, max: number) =>
  Math.round((Math.random() * (max - min) + min) * 10) / 10;

const getSeverity = (risk: number): Severity =>
  risk >= 80 ? "Critical" : risk >= 50 ? "Medium" : "Low";

const getStatus = (risk: number): MachineStatus =>
  risk >= 80 ? "Fault" : risk >= 50 ? "Warning" : "Running";

const initialMachines: Machine[] = [
  { id: "MCH-001", name: "CNC Lathe A1", status: "Running", sensors: { temperature: 62, vibration: 1.2, rpm: 1450, current: 12.3 }, riskScore: 25, severity: "Low" },
  { id: "MCH-002", name: "Hydraulic Press B2", status: "Warning", sensors: { temperature: 78, vibration: 3.5, rpm: 980, current: 18.7 }, riskScore: 58, severity: "Medium" },
  { id: "MCH-003", name: "Assembly Robot C3", status: "Running", sensors: { temperature: 55, vibration: 0.8, rpm: 2200, current: 9.1 }, riskScore: 15, severity: "Low" },
  { id: "MCH-004", name: "Conveyor Motor D4", status: "Fault", sensors: { temperature: 95, vibration: 6.2, rpm: 720, current: 25.4 }, riskScore: 88, severity: "Critical" },
];

const initialEngineers: Engineer[] = [
  { id: "ENG-001", name: "Rajesh Kumar", phone: "+91 98765 43210", assignedMachines: ["MCH-001", "MCH-002"] },
  { id: "ENG-002", name: "Amit Sharma", phone: "+91 87654 32109", assignedMachines: ["MCH-003", "MCH-004"] },
];

const alertMessages: Record<Severity, string[]> = {
  Low: ["Minor temperature fluctuation detected", "Slight vibration increase noted", "Routine check recommended"],
  Medium: ["Temperature exceeding normal range", "Vibration levels elevated — inspect bearings", "RPM inconsistency detected"],
  Critical: ["Critical overheating — immediate shutdown required", "Severe vibration — bearing failure imminent", "Motor current spike — risk of burnout"],
};

export function useMachines() {
  const [machines, setMachines] = useState<Machine[]>(initialMachines);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [engineers, setEngineers] = useState<Engineer[]>(initialEngineers);
  const [callEscalation, setCallEscalation] = useState<CallEscalation | null>(null);
  const [smsEscalation, setSmsEscalation] = useState<SmsEscalation | null>(null);
  const [newAlert, setNewAlert] = useState<Alert | null>(null);
  const [criticalAlert, setCriticalAlert] = useState<Alert | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const simulateUpdate = useCallback(() => {
    setMachines((prev) =>
      prev.map((m) => {
        const tempDelta = randomBetween(-3, 3);
        const vibDelta = randomBetween(-0.3, 0.3);
        const rpmDelta = randomBetween(-30, 30);
        const curDelta = randomBetween(-1, 1);
        const riskDelta = randomBetween(-5, 8);

        const temperature = Math.max(40, Math.min(110, m.sensors.temperature + tempDelta));
        const vibration = Math.max(0.1, Math.min(8, m.sensors.vibration + vibDelta));
        const rpm = Math.max(500, Math.min(3000, m.sensors.rpm + rpmDelta));
        const current = Math.max(5, Math.min(30, m.sensors.current + curDelta));
        const riskScore = Math.max(0, Math.min(100, m.riskScore + riskDelta));
        const severity = getSeverity(riskScore);
        const status = getStatus(riskScore);

        return { ...m, sensors: { temperature, vibration, rpm, current }, riskScore, severity, status };
      })
    );

    // Randomly generate alerts
    if (Math.random() > 0.6) {
      const severities: Severity[] = ["Low", "Medium", "Critical"];
      const weights = [0.5, 0.35, 0.15];
      const r = Math.random();
      const severity = r < weights[0] ? severities[0] : r < weights[0] + weights[1] ? severities[1] : severities[2];
      const machineIdx = Math.floor(Math.random() * 4);
      const machine = initialMachines[machineIdx];
      const msgs = alertMessages[severity];
      const message = msgs[Math.floor(Math.random() * msgs.length)];

      const alert: Alert = {
        id: `ALT-${Date.now()}`,
        machineId: machine.id,
        timestamp: new Date(),
        severity,
        message,
      };

      setAlerts((prev) => [alert, ...prev].slice(0, 50));

      if (severity === "Medium") {
        setNewAlert(alert);
      } else if (severity === "Critical") {
        setCriticalAlert(alert);
      }
    }
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(simulateUpdate, 3000);
    return () => clearInterval(intervalRef.current);
  }, [simulateUpdate]);

  const addEngineer = useCallback((name: string, phone: string) => {
    setEngineers((prev) => [...prev, { id: `ENG-${Date.now()}`, name, phone, assignedMachines: [] }]);
  }, []);

  const updateEngineer = useCallback((id: string, data: Partial<Engineer>) => {
    setEngineers((prev) => prev.map((e) => (e.id === id ? { ...e, ...data } : e)));
  }, []);

  const assignMachine = useCallback((engineerId: string, machineId: string) => {
    setEngineers((prev) =>
      prev.map((e) => {
        if (e.id === engineerId) {
          const machines = e.assignedMachines.includes(machineId)
            ? e.assignedMachines.filter((m) => m !== machineId)
            : [...e.assignedMachines, machineId];
          return { ...e, assignedMachines: machines };
        }
        return e;
      })
    );
  }, []);

  const dismissCritical = useCallback(() => setCriticalAlert(null), []);
  const dismissToast = useCallback(() => setNewAlert(null), []);

  const triggerCall = useCallback((machineId: string) => {
    const engineer = engineers.find((e) => e.assignedMachines.includes(machineId));
    if (engineer) {
      setCallEscalation({ engineerId: engineer.id, engineerName: engineer.name, machineId, status: "Calling" });
      setTimeout(() => setCallEscalation((prev) => prev ? { ...prev, status: "Connected" } : null), 4000);
      setTimeout(() => setCallEscalation(null), 8000);
    }
  }, [engineers]);

  const triggerSms = useCallback((machineId: string, message: string) => {
    const engineer = engineers.find((e) => e.assignedMachines.includes(machineId));
    if (engineer) {
      setSmsEscalation({ engineerId: engineer.id, engineerName: engineer.name, machineId, status: "Sending", message });
      setTimeout(() => setSmsEscalation((prev) => prev ? { ...prev, status: "Sent" } : null), 2000);
      setTimeout(() => setSmsEscalation(null), 5000);
    }
  }, [engineers]);

  return { machines, alerts, engineers, callEscalation, smsEscalation, newAlert, criticalAlert, addEngineer, updateEngineer, assignMachine, dismissCritical, dismissToast, triggerCall, triggerSms };
}

// Sensor history for charts
export function useSensorHistory(machineId: string, machines: Machine[]) {
  const [history, setHistory] = useState<Array<SensorData & { time: string }>>([]);

  useEffect(() => {
    const machine = machines.find((m) => m.id === machineId);
    if (machine) {
      setHistory((prev) => {
        const now = new Date();
        const timeStr = `${now.getMinutes()}:${now.getSeconds().toString().padStart(2, "0")}`;
        const newEntry = { ...machine.sensors, time: timeStr };
        return [...prev, newEntry].slice(-20);
      });
    }
  }, [machines, machineId]);

  return history;
}

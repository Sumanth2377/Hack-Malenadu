'use client';

import { AlertTriangle } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface TriggerStageProps {
  data: {
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    machineId: string;
  };
  onChange: (data: Partial<TriggerStageProps['data']>) => void;
  isActive: boolean;
}

const riskLevels = [
  { value: 'low', label: 'Low', color: 'bg-green-500', borderColor: 'border-green-500' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-500', borderColor: 'border-yellow-500' },
  { value: 'high', label: 'High', color: 'bg-orange-500', borderColor: 'border-orange-500' },
  { value: 'critical', label: 'Critical', color: 'bg-red-500', borderColor: 'border-red-500' },
];

const machines = [
  'CONV-001',
  'PUMP-042',
  'MOTOR-156',
  'COMP-089',
  'TURB-012',
  'BOILER-034',
];

export function TriggerStage({ data, onChange, isActive }: TriggerStageProps) {
  const currentRisk = riskLevels.find((r) => r.value === data.riskLevel);

  return (
    <div
      className={`bg-gradient-to-br from-white to-[#FAF8F5] rounded-xl p-6 border-2 transition-all duration-300 ${
        isActive
          ? 'border-[#C8B896] shadow-xl scale-105'
          : 'border-[#E6DFD0] hover:border-[#C8B896]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-[#2C2416]">Trigger Stage</h3>
          <p className="text-xs text-[#6B5E4F]">Risk Detection</p>
        </div>
      </div>

      {/* Risk Level Selection */}
      <div className="space-y-3 mb-4">
        <Label className="text-sm font-medium text-[#2C2416]">Risk Level</Label>
        <div className="grid grid-cols-2 gap-2">
          {riskLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => onChange({ riskLevel: level.value as any })}
              className={`px-3 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
                data.riskLevel === level.value
                  ? `${level.borderColor} ${level.color} text-white`
                  : 'border-[#E6DFD0] bg-white text-[#6B5E4F] hover:border-[#C8B896]'
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Current Risk Badge */}
      {currentRisk && (
        <div className={`flex items-center gap-2 mb-4 p-3 rounded-lg ${currentRisk.color} bg-opacity-10 border ${currentRisk.borderColor}`}>
          <div className={`w-2 h-2 rounded-full ${currentRisk.color} animate-pulse`}></div>
          <span className="text-sm font-medium text-[#2C2416]">
            {currentRisk.label} Risk Detected
          </span>
        </div>
      )}

      {/* Machine ID Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-[#2C2416]">Machine ID</Label>
        <select
          value={data.machineId}
          onChange={(e) => onChange({ machineId: e.target.value })}
          className="w-full px-4 py-2 bg-white border-2 border-[#E6DFD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8B896] focus:border-transparent transition-all"
        >
          <option value="">Select Machine</option>
          {machines.map((machine) => (
            <option key={machine} value={machine}>
              {machine}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

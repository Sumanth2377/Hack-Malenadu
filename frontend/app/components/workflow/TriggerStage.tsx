'use client';

import { AlertTriangle } from 'lucide-react';

interface TriggerStageProps {
  isActive: boolean;
  data: {
    riskLevel: string;
    machineId: string;
  };
  onChange: (data: any) => void;
}

const riskLevels = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-700 border-green-300' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-700 border-orange-300' },
  { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-700 border-red-300' },
];

export function TriggerStage({ isActive, data, onChange }: TriggerStageProps) {
  return (
    <div
      className={`bg-white rounded-lg p-4 border-2 transition-all ${
        isActive
          ? 'border-primary shadow-lg scale-105'
          : 'border-gray-200 hover:border-primary/50'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Trigger</h3>
          <p className="text-xs text-gray-500">Risk Detection</p>
        </div>
      </div>

      {/* Risk Level Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Risk Level
        </label>
        <div className="space-y-2">
          {riskLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => onChange({ ...data, riskLevel: level.value })}
              className={`w-full px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                data.riskLevel === level.value
                  ? level.color
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>

        {/* Machine ID */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Machine ID
          </label>
          <select
            value={data.machineId}
            onChange={(e) => onChange({ ...data, machineId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Select machine...</option>
            <option value="M-001">Turbine M-001</option>
            <option value="M-002">Compressor M-002</option>
            <option value="M-003">Generator M-003</option>
            <option value="M-004">Pump M-004</option>
          </select>
        </div>
      </div>
    </div>
  );
}

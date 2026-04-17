'use client';

import { Phone, PhoneCall, PhoneOff, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface CallEngineerStageProps {
  data: {
    engineerName: string;
    engineerRole: string;
    status: 'idle' | 'calling' | 'connected' | 'failed';
  };
  onChange: (data: Partial<CallEngineerStageProps['data']>) => void;
  isActive: boolean;
  addLog: (log: any) => void;
}

const engineers = [
  { name: 'David Miller', role: 'Senior Maintenance Engineer' },
  { name: 'Sarah Johnson', role: 'Mechanical Engineer' },
  { name: 'Michael Chen', role: 'Electrical Engineer' },
  { name: 'Emily Rodriguez', role: 'Systems Engineer' },
  { name: 'James Wilson', role: 'Field Technician' },
];

export function CallEngineerStage({
  data,
  onChange,
  isActive,
  addLog,
}: CallEngineerStageProps) {
  const handleCall = async () => {
    onChange({ status: 'calling' });
    addLog({
      type: 'Action',
      message: `Calling ${data.engineerName}...`,
      status: 'info',
    });

    try {
      const response = await fetch('/api/ml-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          machine_id: 'Manual Trigger',
          anomaly: 'Requested immediate engineer assistance via Dashboard',
          risk_score: 100
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        onChange({ status: 'connected' });
        addLog({
          type: 'Action',
          message: `Connected to ${data.engineerName} via Call and SMS.`,
          status: 'success',
        });
      } else {
        throw new Error(result.error || 'Failed to trigger call');
      }
    } catch (error: any) {
      console.error('Call initialization failed:', error);
      onChange({ status: 'failed' });
      addLog({
        type: 'Action',
        message: `Failed to reach ${data.engineerName}: ${error.message}`,
        status: 'error',
      });
    }
  };

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
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <Phone className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-[#2C2416]">Action Stage</h3>
          <p className="text-xs text-[#6B5E4F]">Call Engineer</p>
        </div>
      </div>

      {/* Engineer Selection */}
      <div className="space-y-3 mb-4">
        <Label className="text-sm font-medium text-[#2C2416]">
          Select Engineer
        </Label>
        <select
          value={data.engineerName}
          onChange={(e) => {
            const engineer = engineers.find((eng) => eng.name === e.target.value);
            onChange({
              engineerName: e.target.value,
              engineerRole: engineer?.role || '',
            });
          }}
          className="w-full px-4 py-2 bg-white border-2 border-[#E6DFD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8B896] focus:border-transparent transition-all"
        >
          <option value="">Select Engineer</option>
          {engineers.map((engineer) => (
            <option key={engineer.name} value={engineer.name}>
              {engineer.name}
            </option>
          ))}
        </select>
      </div>

      {/* Engineer Role */}
      {data.engineerRole && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-[#6B5E4F]">Role</p>
          <p className="text-sm font-medium text-[#2C2416]">
            {data.engineerRole}
          </p>
        </div>
      )}

      {/* Call Button */}
      <Button
        onClick={handleCall}
        disabled={!data.engineerName || data.status === 'calling'}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium"
      >
        {data.status === 'calling' ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Calling...
          </>
        ) : (
          <>
            <PhoneCall className="w-4 h-4 mr-2" />
            Call Engineer
          </>
        )}
      </Button>

      {/* Call Status */}
      {data.status !== 'idle' && (
        <div
          className={`mt-4 p-3 rounded-lg border-2 ${
            data.status === 'connected'
              ? 'bg-green-50 border-green-500'
              : data.status === 'failed'
              ? 'bg-red-50 border-red-500'
              : 'bg-blue-50 border-blue-500'
          }`}
        >
          <div className="flex items-center gap-2">
            {data.status === 'calling' && (
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
            )}
            {data.status === 'connected' && (
              <PhoneCall className="w-4 h-4 text-green-600" />
            )}
            {data.status === 'failed' && (
              <PhoneOff className="w-4 h-4 text-red-600" />
            )}
            <span className="text-sm font-medium">
              {data.status === 'calling' && 'Connecting...'}
              {data.status === 'connected' && 'Call Connected'}
              {data.status === 'failed' && 'Call Failed'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

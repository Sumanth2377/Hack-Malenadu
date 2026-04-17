'use client';

import { FileText, Send, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface SendReportStageProps {
  data: {
    reportType: string;
    sendVia: 'sms' | 'email' | 'notification';
    status: 'idle' | 'sending' | 'success' | 'failed';
  };
  onChange: (data: Partial<SendReportStageProps['data']>) => void;
  isActive: boolean;
  addLog: (log: any) => void;
}

const sendOptions = [
  { value: 'sms', label: 'SMS', icon: '📱' },
  { value: 'email', label: 'Email', icon: '✉️' },
  { value: 'notification', label: 'App Notification', icon: '🔔' },
];

export function SendReportStage({
  data,
  onChange,
  isActive,
  addLog,
}: SendReportStageProps) {
  const handleSendReport = async () => {
    onChange({ status: 'sending' });
    addLog({
      type: 'Action',
      message: `Sending report via ${data.sendVia}...`,
      status: 'info',
    });

    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const success = Math.random() > 0.1;
    if (success) {
      onChange({ status: 'success' });
      addLog({
        type: 'Action',
        message: `Report sent successfully via ${data.sendVia}`,
        status: 'success',
      });
    } else {
      onChange({ status: 'failed' });
      addLog({
        type: 'Action',
        message: `Failed to send report via ${data.sendVia}`,
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
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-[#2C2416]">Action Stage</h3>
          <p className="text-xs text-[#6B5E4F]">Send Report</p>
        </div>
      </div>

      {/* Report Type */}
      <div className="space-y-3 mb-4">
        <Label className="text-sm font-medium text-[#2C2416]">Report Type</Label>
        <div className="p-3 bg-[#FAF8F5] border border-[#E6DFD0] rounded-lg">
          <p className="text-sm text-[#6B5E4F]">Auto-generated</p>
          <p className="text-sm font-medium text-[#2C2416]">
            {data.reportType}
          </p>
        </div>
      </div>

      {/* Send Via */}
      <div className="space-y-3 mb-4">
        <Label className="text-sm font-medium text-[#2C2416]">Send Via</Label>
        <div className="grid grid-cols-3 gap-2">
          {sendOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange({ sendVia: option.value as any })}
              className={`px-3 py-2 rounded-lg border-2 transition-all text-xs font-medium ${
                data.sendVia === option.value
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-[#E6DFD0] bg-white text-[#6B5E4F] hover:border-[#C8B896]'
              }`}
            >
              <div className="text-lg mb-1">{option.icon}</div>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Send Button */}
      <Button
        onClick={handleSendReport}
        disabled={data.status === 'sending'}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium"
      >
        {data.status === 'sending' ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Report
          </>
        )}
      </Button>

      {/* Send Status */}
      {data.status !== 'idle' && (
        <div
          className={`mt-4 p-3 rounded-lg border-2 ${
            data.status === 'success'
              ? 'bg-green-50 border-green-500'
              : data.status === 'failed'
              ? 'bg-red-50 border-red-500'
              : 'bg-blue-50 border-blue-500'
          }`}
        >
          <div className="flex items-center gap-2">
            {data.status === 'sending' && (
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
            )}
            {data.status === 'success' && (
              <CheckCircle className="w-4 h-4 text-green-600" />
            )}
            {data.status === 'failed' && (
              <XCircle className="w-4 h-4 text-red-600" />
            )}
            <span className="text-sm font-medium">
              {data.status === 'sending' && 'Sending report...'}
              {data.status === 'success' && 'Report sent successfully'}
              {data.status === 'failed' && 'Failed to send report'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

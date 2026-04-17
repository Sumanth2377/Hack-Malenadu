'use client';

import { FileText, Mail, Download } from 'lucide-react';

interface ReportStageProps {
  isActive: boolean;
  data: {
    recipients: string[];
    format: string;
  };
  onChange: (data: any) => void;
}

const formatOptions = [
  { value: 'pdf', label: 'PDF Report', icon: FileText },
  { value: 'email', label: 'Email Summary', icon: Mail },
  { value: 'csv', label: 'CSV Export', icon: Download },
];

const recipientOptions = [
  { value: 'manager', label: 'Maintenance Manager' },
  { value: 'supervisor', label: 'Operations Supervisor' },
  { value: 'engineer', label: 'Assigned Engineer' },
  { value: 'admin', label: 'System Admin' },
];

export function ReportStage({ isActive, data, onChange }: ReportStageProps) {
  const toggleRecipient = (recipient: string) => {
    const newRecipients = data.recipients.includes(recipient)
      ? data.recipients.filter(r => r !== recipient)
      : [...data.recipients, recipient];
    onChange({ ...data, recipients: newRecipients });
  };

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
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Report</h3>
          <p className="text-xs text-gray-500">Send Summary</p>
        </div>
      </div>

      {/* Report Format */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Report Format
        </label>
        <div className="space-y-2">
          {formatOptions.map((format) => {
            const Icon = format.icon;
            return (
              <button
                key={format.value}
                onClick={() => onChange({ ...data, format: format.value })}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                  data.format === format.value
                    ? 'bg-green-100 text-green-700 border-green-300'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {format.label}
              </button>
            );
          })}
        </div>

        {/* Recipients */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipients
          </label>
          <div className="space-y-2">
            {recipientOptions.map((recipient) => (
              <label
                key={recipient.value}
                className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={data.recipients.includes(recipient.value)}
                  onChange={() => toggleRecipient(recipient.value)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{recipient.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

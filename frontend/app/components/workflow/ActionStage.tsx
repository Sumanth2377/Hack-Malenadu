'use client';

import { Phone, Mail, Bell } from 'lucide-react';

interface ActionStageProps {
  isActive: boolean;
  data: {
    engineerId: string;
    contactMethod: string;
  };
  onChange: (data: any) => void;
}

const engineers = [
  { id: 'ENG-001', name: 'John Smith', specialty: 'Turbines' },
  { id: 'ENG-002', name: 'Sarah Johnson', specialty: 'Electrical' },
  { id: 'ENG-003', name: 'Mike Chen', specialty: 'Hydraulics' },
  { id: 'ENG-004', name: 'Emily Davis', specialty: 'General' },
];

const contactMethods = [
  { value: 'phone', label: 'Phone Call', icon: Phone },
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'sms', label: 'SMS', icon: Bell },
];

export function ActionStage({ isActive, data, onChange }: ActionStageProps) {
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
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Phone className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Action</h3>
          <p className="text-xs text-gray-500">Contact Engineer</p>
        </div>
      </div>

      {/* Engineer Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Assign Engineer
        </label>
        <select
          value={data.engineerId}
          onChange={(e) => onChange({ ...data, engineerId: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">Select engineer...</option>
          {engineers.map((eng) => (
            <option key={eng.id} value={eng.id}>
              {eng.name} ({eng.specialty})
            </option>
          ))}
        </select>

        {/* Contact Method */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Method
          </label>
          <div className="space-y-2">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.value}
                  onClick={() => onChange({ ...data, contactMethod: method.value })}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                    data.contactMethod === method.value
                      ? 'bg-blue-100 text-blue-700 border-blue-300'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {method.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

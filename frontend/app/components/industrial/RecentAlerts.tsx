'use client';

import { AlertTriangle, Clock, TrendingUp } from 'lucide-react';

const alerts = [
  {
    id: '1',
    machine: 'PUMP-042',
    risk: 'critical',
    message: 'Abnormal vibration detected',
    time: '2 min ago',
    status: 'active',
  },
  {
    id: '2',
    machine: 'MOTOR-156',
    risk: 'high',
    message: 'Temperature exceeding threshold',
    time: '15 min ago',
    status: 'active',
  },
  {
    id: '3',
    machine: 'CONV-001',
    risk: 'medium',
    message: 'Bearing wear detected',
    time: '1 hour ago',
    status: 'acknowledged',
  },
  {
    id: '4',
    machine: 'TURB-012',
    risk: 'low',
    message: 'Scheduled maintenance due',
    time: '2 hours ago',
    status: 'resolved',
  },
];

const riskColors = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500',
};

const statusColors = {
  active: 'text-red-600 bg-red-50',
  acknowledged: 'text-yellow-600 bg-yellow-50',
  resolved: 'text-green-600 bg-green-50',
};

export function RecentAlerts() {
  return (
    <div className="bg-white rounded-xl p-6 border border-[#E6DFD0]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#2C2416]">Recent Alerts</h2>
            <p className="text-sm text-[#6B5E4F]">Latest system notifications</p>
          </div>
        </div>
        <button className="text-sm text-[#C8B896] hover:text-[#A69776] font-medium">
          View All
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-4 rounded-lg border border-[#E6DFD0] hover:border-[#C8B896] hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              {/* Risk Indicator */}
              <div className={`w-3 h-3 ${riskColors[alert.risk as keyof typeof riskColors]} rounded-full mt-1 flex-shrink-0`}></div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-medium text-[#2C2416]">{alert.machine}</h3>
                    <p className="text-sm text-[#6B5E4F] mt-1">{alert.message}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[alert.status as keyof typeof statusColors]}`}>
                    {alert.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#A69776]">
                  <Clock className="w-3 h-3" />
                  <span>{alert.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

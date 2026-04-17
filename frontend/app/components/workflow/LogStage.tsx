'use client';

import { ScrollText, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

interface LogStageProps {
  isActive: boolean;
  logs: Array<{
    id: string;
    timestamp: string;
    type: string;
    message: string;
    status: 'success' | 'warning' | 'error' | 'info';
  }>;
}

const statusConfig = {
  success: {
    icon: CheckCircle,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
  },
  error: {
    icon: XCircle,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
  info: {
    icon: Info,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
};

export function LogStage({ isActive, logs }: LogStageProps) {
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
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <ScrollText className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Logs</h3>
          <p className="text-xs text-gray-500">Audit Trail</p>
        </div>
      </div>

      {/* Logs Count */}
      <div className="mb-3 p-2 bg-gray-50 rounded-md">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total Events</span>
          <span className="font-semibold text-gray-900">{logs.length}</span>
        </div>
      </div>

      {/* Logs List */}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {logs.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <ScrollText className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No logs yet</p>
            <p className="text-xs mt-1">Execute workflow to see logs</p>
          </div>
        ) : (
          logs.map((log) => {
            const config = statusConfig[log.status];
            const Icon = config.icon;
            const timestamp = new Date(log.timestamp).toLocaleTimeString();

            return (
              <div
                key={log.id}
                className={`p-2 rounded-md border ${config.border} ${config.bg}`}
              >
                <div className="flex items-start gap-2">
                  <Icon className={`w-4 h-4 ${config.color} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-gray-900">
                        {log.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                      {log.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

'use client';

import { ScrollText, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LogStageProps {
  logs: Array<{
    id: string;
    timestamp: string;
    type: string;
    message: string;
    status: 'success' | 'warning' | 'error' | 'info';
  }>;
  isActive: boolean;
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

export function LogStage({ logs, isActive }: LogStageProps) {
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
        <div className="w-12 h-12 bg-gradient-to-br from-[#C8B896] to-[#A69776] rounded-lg flex items-center justify-center">
          <ScrollText className="w-6 h-6 text-[#2C2416]" />
        </div>
        <div>
          <h3 className="font-bold text-[#2C2416]">Log Stage</h3>
          <p className="text-xs text-[#6B5E4F]">Audit Trail</p>
        </div>
      </div>

      {/* Logs Count */}
      <div className="mb-4 p-3 bg-[#FAF8F5] border border-[#E6DFD0] rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#6B5E4F]">Total Events</span>
          <span className="text-lg font-bold text-[#2C2416]">{logs.length}</span>
        </div>
      </div>

      {/* Logs Timeline */}
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#2C2416]">
            Activity Timeline
          </span>
          {logs.length > 0 && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-[#6B5E4F]">Live</span>
            </div>
          )}
        </div>

        <ScrollArea className="h-[400px] pr-4">
          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ScrollText className="w-12 h-12 text-[#E6DFD0] mb-3" />
              <p className="text-sm text-[#6B5E4F]">No events yet</p>
              <p className="text-xs text-[#A69776] mt-1">
                Execute a workflow to see logs
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log, index) => {
                const config = statusConfig[log.status];
                const Icon = config.icon;
                const timestamp = new Date(log.timestamp).toLocaleTimeString();

                return (
                  <div
                    key={log.id}
                    className={`p-3 rounded-lg border ${config.border} ${config.bg} transition-all duration-300 hover:shadow-md`}
                    style={{
                      animation: `slideIn 0.3s ease-out ${index * 0.1}s backwards`,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`w-4 h-4 ${config.color} flex-shrink-0 mt-0.5`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-medium text-[#2C2416]">
                            {log.type}
                          </span>
                          <span className="text-xs text-[#6B5E4F]">
                            {timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-[#6B5E4F] leading-relaxed">
                          {log.message}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

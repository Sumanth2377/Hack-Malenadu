'use client';

import { Clock, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const activities = [
  {
    id: '1',
    type: 'success',
    title: 'Maintenance Completed',
    description: 'MOTOR-156 preventive maintenance successfully completed',
    time: '5 min ago',
  },
  {
    id: '2',
    type: 'warning',
    title: 'Alert Triggered',
    description: 'PUMP-042 vibration levels above threshold',
    time: '12 min ago',
  },
  {
    id: '3',
    type: 'info',
    title: 'Engineer Assigned',
    description: 'David Miller assigned to CONV-001 inspection',
    time: '28 min ago',
  },
  {
    id: '4',
    type: 'success',
    title: 'Report Sent',
    description: 'Weekly maintenance report sent to operations team',
    time: '1 hour ago',
  },
  {
    id: '5',
    type: 'error',
    title: 'Call Failed',
    description: 'Failed to reach engineer for TURB-012 issue',
    time: '2 hours ago',
  },
  {
    id: '6',
    type: 'info',
    title: 'Workflow Created',
    description: 'New automated workflow for critical alerts',
    time: '3 hours ago',
  },
  {
    id: '7',
    type: 'success',
    title: 'Device Online',
    description: 'BOILER-034 returned to operational status',
    time: '4 hours ago',
  },
];

const typeConfig = {
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

export function ActivityTimeline() {
  return (
    <div className="bg-white rounded-xl p-6 border border-[#E6DFD0] h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-[#C8B896] to-[#A69776] rounded-lg flex items-center justify-center">
          <Clock className="w-5 h-5 text-[#2C2416]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#2C2416]">Activity Timeline</h2>
          <p className="text-sm text-[#6B5E4F]">Recent system events</p>
        </div>
      </div>

      {/* Timeline */}
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-4 pr-4">
          {activities.map((activity, index) => {
            const config = typeConfig[activity.type as keyof typeof typeConfig];
            const Icon = config.icon;

            return (
              <div key={activity.id} className="relative pl-8">
                {/* Timeline Line */}
                {index !== activities.length - 1 && (
                  <div className="absolute left-3 top-8 bottom-0 w-px bg-[#E6DFD0]"></div>
                )}

                {/* Timeline Dot */}
                <div className={`absolute left-0 top-1 w-6 h-6 rounded-full ${config.bg} border-2 ${config.border} flex items-center justify-center`}>
                  <Icon className={`w-3 h-3 ${config.color}`} />
                </div>

                {/* Content */}
                <div className="pb-4">
                  <div className="mb-1">
                    <h3 className="font-medium text-[#2C2416] text-sm">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-[#6B5E4F] mt-1">
                      {activity.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#A69776]">
                    <Clock className="w-3 h-3" />
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

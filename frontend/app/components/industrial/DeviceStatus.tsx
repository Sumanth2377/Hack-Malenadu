'use client';

import { Server, Activity } from 'lucide-react';

const devices = [
  { id: 'CONV-001', name: 'Conveyor Belt A1', status: 'online', health: 95, activity: 'Normal operation' },
  { id: 'PUMP-042', name: 'Hydraulic Pump 42', status: 'warning', health: 72, activity: 'High vibration' },
  { id: 'MOTOR-156', name: 'Motor Unit 156', status: 'critical', health: 45, activity: 'Overheating' },
  { id: 'COMP-089', name: 'Air Compressor 89', status: 'online', health: 88, activity: 'Normal operation' },
  { id: 'TURB-012', name: 'Turbine Generator 12', status: 'online', health: 92, activity: 'Peak performance' },
  { id: 'BOILER-034', name: 'Boiler System 34', status: 'offline', health: 0, activity: 'Maintenance mode' },
];

const statusConfig = {
  online: { color: 'bg-green-500', label: 'Online' },
  warning: { color: 'bg-yellow-500', label: 'Warning' },
  critical: { color: 'bg-red-500', label: 'Critical' },
  offline: { color: 'bg-gray-400', label: 'Offline' },
};

export function DeviceStatus() {
  return (
    <div className="bg-white rounded-xl p-6 border border-[#E6DFD0]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Server className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#2C2416]">Device Status</h2>
            <p className="text-sm text-[#6B5E4F]">Real-time equipment monitoring</p>
          </div>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {devices.map((device) => {
          const config = statusConfig[device.status as keyof typeof statusConfig];
          return (
            <div
              key={device.id}
              className="p-4 rounded-lg border border-[#E6DFD0] hover:border-[#C8B896] hover:shadow-md transition-all duration-200"
            >
              {/* Device Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 ${config.color} rounded-full ${device.status === 'online' ? 'animate-pulse' : ''}`}></div>
                    <span className="text-xs font-medium text-[#6B5E4F]">{device.id}</span>
                  </div>
                  <h3 className="font-medium text-[#2C2416] text-sm">{device.name}</h3>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${config.color} text-white`}>
                  {config.label}
                </span>
              </div>

              {/* Health Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[#6B5E4F]">Health</span>
                  <span className="text-xs font-medium text-[#2C2416]">{device.health}%</span>
                </div>
                <div className="w-full h-2 bg-[#FAF8F5] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      device.health >= 80
                        ? 'bg-green-500'
                        : device.health >= 50
                        ? 'bg-yellow-500'
                        : device.health > 0
                        ? 'bg-red-500'
                        : 'bg-gray-400'
                    }`}
                    style={{ width: `${device.health}%` }}
                  ></div>
                </div>
              </div>

              {/* Activity */}
              <div className="flex items-center gap-2 text-xs text-[#6B5E4F]">
                <Activity className="w-3 h-3" />
                <span>{device.activity}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

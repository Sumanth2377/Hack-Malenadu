'use client';

import { Server, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

const stats = [
  {
    label: 'Active Devices',
    value: '142',
    change: '+12%',
    trend: 'up',
    icon: Server,
    color: 'from-blue-500 to-blue-600',
  },
  {
    label: 'Critical Alerts',
    value: '8',
    change: '-3',
    trend: 'down',
    icon: AlertTriangle,
    color: 'from-red-500 to-red-600',
  },
  {
    label: 'Resolved Today',
    value: '24',
    change: '+8%',
    trend: 'up',
    icon: CheckCircle,
    color: 'from-green-500 to-green-600',
  },
  {
    label: 'Efficiency',
    value: '94.2%',
    change: '+2.1%',
    trend: 'up',
    icon: TrendingUp,
    color: 'from-[#C8B896] to-[#A69776]',
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-6 border border-[#E6DFD0] hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Icon */}
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span
                className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>
            </div>

            {/* Value */}
            <h3 className="text-3xl font-bold text-[#2C2416] mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-[#6B5E4F]">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}

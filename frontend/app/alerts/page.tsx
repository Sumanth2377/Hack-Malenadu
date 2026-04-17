'use client';

import { AlertTriangle, Info, XOctagon, Filter, Clock } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/lib/StoreContext';
import { cn } from '@/lib/utils';
import AppLayout from '@/components/AppLayout';

const severityIcon = {
  Low: Info,
  Medium: AlertTriangle,
  Critical: XOctagon,
};

const severityColor = {
  Low: 'text-success',
  Medium: 'text-warning',
  Critical: 'text-critical',
};

export default function AlertsPage() {
  const { alerts } = useStore();
  const [filter, setFilter] = useState('all');

  const filteredAlerts =
    filter === 'all'
      ? alerts
      : alerts.filter((alert) => alert.severity.toLowerCase() === filter);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Real-time Alerts</h1>
            <p className="text-muted-foreground mt-1">
              Monitor live system alerts from all machines
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Alerts</p>
            <p className="text-2xl font-bold text-foreground">{alerts.length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 bg-card rounded-xl p-4 border border-border">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <div className="flex gap-2">
            {['all', 'critical', 'medium', 'low'].map((severity) => (
              <button
                key={severity}
                onClick={() => setFilter(severity)}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium text-sm transition-all',
                  filter === severity
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {severity.charAt(0).toUpperCase() + severity.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="bg-card rounded-xl p-12 border border-border text-center">
              <p className="text-muted-foreground">No alerts to display</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              const Icon = severityIcon[alert.severity as keyof typeof severityIcon];
              
              return (
                <div
                  key={alert.id}
                  className={cn(
                    'bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300',
                    alert.severity === 'Critical' && 'pulse-critical',
                    'animate-slide-in'
                  )}
                >
                  <div className="flex items-start gap-4">
                    {/* Severity Indicator */}
                    <div className={cn(
                      'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0',
                      alert.severity === 'Critical' && 'bg-critical/10',
                      alert.severity === 'Medium' && 'bg-warning/10',
                      alert.severity === 'Low' && 'bg-success/10'
                    )}>
                      <Icon className={cn('w-6 h-6', severityColor[alert.severity as keyof typeof severityColor])} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-foreground text-lg">
                              {alert.machineId}
                            </h3>
                            <span className={cn(
                              'px-3 py-1 rounded-full text-xs font-medium',
                              alert.severity === 'Critical' && 'bg-critical/10 text-critical',
                              alert.severity === 'Medium' && 'bg-warning/10 text-warning',
                              alert.severity === 'Low' && 'bg-success/10 text-success'
                            )}>
                              {alert.severity.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {alert.message}
                          </p>
                        </div>
                      </div>

                      {/* Timestamp */}
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">
                          {alert.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AppLayout>
  );
}

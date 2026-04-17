'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Cog, Activity, AlertTriangle, CheckCircle, TrendingUp, Search } from 'lucide-react';
import Link from 'next/link';

// Mock machine data
const machines = [
  {
    id: 'M-001',
    name: 'Turbine Generator 1',
    type: 'Turbine',
    status: 'operational',
    health: 92,
    lastMaintenance: '2026-03-15',
    nextMaintenance: '2026-04-30',
    location: 'Building A - Floor 2',
    alerts: 0,
  },
  {
    id: 'M-002',
    name: 'Hydraulic Compressor',
    type: 'Compressor',
    status: 'warning',
    health: 68,
    lastMaintenance: '2026-02-20',
    nextMaintenance: '2026-04-20',
    location: 'Building B - Floor 1',
    alerts: 2,
  },
  {
    id: 'M-003',
    name: 'Power Generator 2',
    type: 'Generator',
    status: 'operational',
    health: 88,
    lastMaintenance: '2026-03-10',
    nextMaintenance: '2026-05-10',
    location: 'Building A - Floor 3',
    alerts: 0,
  },
  {
    id: 'M-004',
    name: 'Cooling Pump System',
    type: 'Pump',
    status: 'critical',
    health: 45,
    lastMaintenance: '2026-01-15',
    nextMaintenance: '2026-04-15',
    location: 'Building C - Basement',
    alerts: 5,
  },
  {
    id: 'M-005',
    name: 'Air Conditioning Unit',
    type: 'HVAC',
    status: 'operational',
    health: 95,
    lastMaintenance: '2026-03-25',
    nextMaintenance: '2026-06-25',
    location: 'Building B - Roof',
    alerts: 0,
  },
  {
    id: 'M-006',
    name: 'Conveyor Belt System',
    type: 'Conveyor',
    status: 'warning',
    health: 72,
    lastMaintenance: '2026-02-28',
    nextMaintenance: '2026-04-28',
    location: 'Warehouse - Zone 3',
    alerts: 1,
  },
];

const statusColors = {
  operational: 'bg-green-100 text-green-700 border-green-300',
  warning: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  critical: 'bg-red-100 text-red-700 border-red-300',
};

const statusIcons = {
  operational: CheckCircle,
  warning: AlertTriangle,
  critical: AlertTriangle,
};

export default function MachinesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredMachines = machines.filter((machine) => {
    const matchesSearch = 
      machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || machine.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Machines</h1>
          <p className="text-gray-600 mt-1">Monitor and manage industrial equipment</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Machines</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{machines.length}</p>
              </div>
              <Cog className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Operational</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {machines.filter(m => m.status === 'operational').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Warnings</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">
                  {machines.filter(m => m.status === 'warning').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical</p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  {machines.filter(m => m.status === 'critical').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search machines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Status</option>
              <option value="operational">Operational</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Machines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMachines.map((machine) => {
            const StatusIcon = statusIcons[machine.status];
            
            return (
              <Link
                key={machine.id}
                href={`/machines/${machine.id}`}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg hover:border-primary/50 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Cog className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{machine.name}</h3>
                      <p className="text-sm text-gray-500">{machine.id}</p>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="mb-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusColors[machine.status]}`}>
                    <StatusIcon className="w-3 h-3" />
                    {machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
                  </span>
                </div>

                {/* Health Score */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Health Score</span>
                    <span className="text-sm font-semibold text-gray-900">{machine.health}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        machine.health >= 80
                          ? 'bg-green-500'
                          : machine.health >= 60
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${machine.health}%` }}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium text-gray-900">{machine.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium text-gray-900 text-right">{machine.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Alerts:</span>
                    <span className={`font-medium ${machine.alerts > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {machine.alerts}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Next Maintenance:</span>
                    <span className="font-medium text-gray-900">{machine.nextMaintenance}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* No Results */}
        {filteredMachines.length === 0 && (
          <div className="bg-white rounded-lg p-12 border border-gray-200 text-center">
            <Cog className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No machines found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

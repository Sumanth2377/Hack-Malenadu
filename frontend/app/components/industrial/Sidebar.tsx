'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Server,
  AlertTriangle,
  Workflow,
  ScrollText,
  Settings,
  Activity,
} from 'lucide-react';

const navItems = [
  {
    label: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    label: 'Devices',
    href: '/devices',
    icon: Server,
  },
  {
    label: 'Alerts',
    href: '/alerts',
    icon: AlertTriangle,
  },
  {
    label: 'Workflow',
    href: '/workflow',
    icon: Workflow,
  },
  {
    label: 'Logs',
    href: '/logs',
    icon: ScrollText,
  },
  {
    label: 'Analytics',
    href: '/analytics',
    icon: Activity,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-[#2C2416] text-[#F5F1E8] flex flex-col border-r border-[#3D3327]">
      {/* Logo */}
      <div className="p-6 border-b border-[#3D3327]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#C8B896] to-[#A69776] rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-[#2C2416]" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Industrial AI</h1>
            <p className="text-xs text-[#A69776]">Predictive Maintenance</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                'hover:bg-[#3D3327] hover:translate-x-1',
                isActive && 'bg-[#C8B896] text-[#2C2416] font-medium shadow-lg'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-[#3D3327]">
        <div className="bg-[#3D3327] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">System Online</span>
          </div>
          <p className="text-xs text-[#A69776]">All services operational</p>
        </div>
      </div>
    </div>
  );
}

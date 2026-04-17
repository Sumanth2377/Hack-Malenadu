'use client';

import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-[#E6DFD0] flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B5E4F]" />
          <input
            type="text"
            placeholder="Search devices, alerts, or engineers..."
            className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#E6DFD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8B896] transition-all"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 ml-6">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-[#FAF8F5]"
        >
          <Bell className="w-5 h-5 text-[#6B5E4F]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-[#E6DFD0]">
          <div className="text-right">
            <p className="text-sm font-medium text-[#2C2416]">John Doe</p>
            <p className="text-xs text-[#6B5E4F]">System Admin</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-[#C8B896] to-[#A69776] rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-[#2C2416]" />
          </div>
        </div>
      </div>
    </header>
  );
}

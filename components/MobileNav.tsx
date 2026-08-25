'use client';

import { Map, Car, Shield } from 'lucide-react';

interface MobileNavProps {
  activeTab: 'map' | 'vehicles' | 'hubs';
  onChangeTab: (tab: 'map' | 'vehicles' | 'hubs') => void;
  savedCount?: number;
}

export default function MobileNav({ activeTab, onChangeTab }: MobileNavProps) {
  const tabs = [
    {
      id: 'map' as const,
      label: 'Explore Map',
      icon: Map
    },
    {
      id: 'vehicles' as const,
      label: 'Browse Cars',
      icon: Car
    },
    {
      id: 'hubs' as const,
      label: 'Agencies',
      icon: Shield
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-2xl flex justify-around items-center h-16 px-4">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 cursor-pointer transition-all ${
              isActive 
                ? 'text-amber-500 font-bold scale-105' 
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-655'
            }`}
          >
            <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
            <span className="text-[10px] uppercase tracking-wider font-semibold">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

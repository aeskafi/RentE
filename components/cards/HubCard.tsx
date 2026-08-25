'use client';

import { RentalHub } from '@/types';
import { MapPin, Phone, Star, Car } from 'lucide-react';

interface HubCardProps {
  hub: RentalHub;
  onSelect: (hub: RentalHub) => void;
  isSelected?: boolean;
}

export default function HubCard({ hub, onSelect, isSelected = false }: HubCardProps) {
  return (
    <div 
      onClick={() => onSelect(hub)}
      className={`group bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'border-amber-500 shadow-md ring-1 ring-amber-500' 
          : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-lg'
      }`}
    >
      {/* Banner visual */}
      <div className="relative h-28 w-full bg-slate-100 dark:bg-slate-950 overflow-hidden">
        {/* Rating overlay */}
        <div className="absolute top-3 right-3 z-10 flex items-center space-x-1 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-xs">
          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{hub.rating}</span>
        </div>

        {/* Fleet Count Badge */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center space-x-1 bg-slate-900/95 dark:bg-slate-950/95 text-white text-[10px] font-bold px-2 py-1 rounded-lg border border-slate-700/50 shadow-xs">
          <Car className="w-3.5 h-3.5 text-amber-400" />
          <span>{hub.fleetCount} FLEET VEHICLES</span>
        </div>

        {/* Banner image */}
        <img 
          src={hub.bannerUrl} 
          alt={hub.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Info Container */}
      <div className="p-4 flex flex-col justify-between h-40">
        <div>
          {/* Logo + Title */}
          <div className="flex items-center space-x-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-100 dark:border-slate-800 flex-shrink-0">
              <img src={hub.logoUrl} alt={hub.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm leading-tight group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
              {hub.name}
            </h3>
          </div>

          {/* Details */}
          <div className="space-y-1.5">
            <div className="flex items-start space-x-2 text-xs text-slate-500 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-2">{hub.address}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
              <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span>{hub.phone}</span>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="border-t border-slate-50 dark:border-slate-850 pt-2.5 mt-2.5 flex justify-between items-center">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase">Permanent Hub</span>
          <span className="text-xs text-amber-500 dark:text-amber-400 font-bold group-hover:translate-x-1 transition-transform duration-200 flex items-center">
            Explore On-Site Fleet &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}

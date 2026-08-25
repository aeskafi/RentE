'use client';

import Image from 'next/image';
import { Vehicle } from '@/types';
import { Heart, Star, Users, Info, Gauge, Zap } from 'lucide-react';
import { useState } from 'react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
  isSelected?: boolean;
}

export default function VehicleCard({ vehicle, onSelect, isSelected = false }: VehicleCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div 
      className={`group bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden transition-all duration-300 ${
        isSelected 
          ? 'border-amber-500 shadow-md ring-1 ring-amber-500' 
          : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-lg'
      }`}
    >
      {/* Visual Container */}
      <div className="relative h-44 w-full bg-slate-50 dark:bg-slate-950 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1.5">
          <span className="bg-slate-950/80 dark:bg-slate-900/90 text-white backdrop-blur-xs text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
            {vehicle.type}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
            vehicle.ownerType === 'individual' 
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300' 
              : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300'
          }`}>
            {vehicle.ownerType === 'individual' ? 'Pickup Ready' : 'Hub Fleet'}
          </span>
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/95 dark:bg-slate-900/90 shadow-xs text-slate-400 hover:text-rose-500 active:scale-95 transition-all"
        >
          <Heart className={`w-4 h-4 transition-colors ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Image */}
        <img 
          src={vehicle.imageUrl} 
          alt={`${vehicle.brand} ${vehicle.name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Available indicator */}
        {!vehicle.isAvailable && (
          <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center backdrop-blur-xs">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              In Use
            </span>
          </div>
        )}
      </div>

      {/* Info Container */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          {/* Header & Rating */}
          <div className="flex justify-between items-start mb-1.5">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-50 text-base leading-tight group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                {vehicle.brand} {vehicle.name}
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">{vehicle.model}</p>
            </div>
            
            <div className="flex items-center space-x-1 bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded-md">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{vehicle.rating}</span>
            </div>
          </div>

          {/* Core Specs Grid */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-3 my-4 border-y border-slate-50 dark:border-slate-800 py-3">
            <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>{vehicle.seats} Seats</span>
            </div>
            
            <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Gauge className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">{vehicle.transmission}</span>
            </div>

            <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Zap className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">{vehicle.fuelType}</span>
            </div>

            <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">{vehicle.range ? vehicle.range : vehicle.mileageLimit}</span>
            </div>
          </div>
        </div>

        {/* Footer: Price & CTA */}
        <div className="flex justify-between items-center mt-2 pt-1">
          <div>
            <span className="text-xl font-black text-slate-900 dark:text-slate-50">${vehicle.price}</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">/ day</span>
          </div>

          <button 
            onClick={() => onSelect(vehicle)}
            className="bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 dark:bg-slate-800 dark:hover:bg-amber-500 dark:hover:text-slate-950 font-semibold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer"
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
}

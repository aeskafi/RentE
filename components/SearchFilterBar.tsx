'use client';

import { useState } from 'react';
import { FilterState } from '@/types';
import { Search, Calendar, SlidersHorizontal, RotateCcw, Shield, User } from 'lucide-react';

interface SearchFilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const CAR_TYPES = ['EV', 'SUV', 'Sedan', 'Luxury', 'Sport', 'Hatchback'];

export default function SearchFilterBar({ filters, onFilterChange }: SearchFilterBarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const handleDateChange = (field: 'pickupDate' | 'returnDate', value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const toggleCarType = (type: string) => {
    const isSelected = filters.carTypes.includes(type);
    const updated = isSelected
      ? filters.carTypes.filter(t => t !== type)
      : [...filters.carTypes, type];
    onFilterChange({ ...filters, carTypes: updated });
  };

  const handleOwnerTypeChange = (type: 'all' | 'hub' | 'individual') => {
    onFilterChange({ ...filters, ownerType: type });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onFilterChange({ ...filters, priceRange: [filters.priceRange[0], value] });
  };

  const resetFilters = () => {
    onFilterChange({
      searchQuery: '',
      carTypes: [],
      priceRange: [0, 500],
      ownerType: 'all',
      transmission: 'all',
      fuelType: 'all',
      pickupDate: '2026-08-25',
      returnDate: '2026-08-28'
    });
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-xs transition-colors duration-300">
      
      {/* Search Input and Basic Date Inputs - Compact Stack */}
      <div className="flex flex-col gap-3">
        
        {/* Search Query */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search brand or model..."
            value={filters.searchQuery}
            onChange={handleTextChange}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-xs font-bold border border-slate-100 dark:border-slate-850 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-600 placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all"
          />
        </div>

        {/* Date Section - Double Column Grid */}
        <div className="grid grid-cols-2 gap-2 w-full">
          {/* Pickup Date */}
          <div className="relative w-full">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <input
              type="date"
              value={filters.pickupDate}
              onChange={(e) => handleDateChange('pickupDate', e.target.value)}
              className="w-full pl-8 pr-2 py-2.5 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-[10px] sm:text-xs font-bold border border-slate-100 dark:border-slate-850 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-600 transition-all cursor-pointer"
            />
          </div>

          {/* Return Date */}
          <div className="relative w-full">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <input
              type="date"
              value={filters.returnDate}
              onChange={(e) => handleDateChange('returnDate', e.target.value)}
              className="w-full pl-8 pr-2 py-2.5 bg-slate-50 dark:bg-slate-955 text-slate-800 dark:text-slate-100 text-[10px] sm:text-xs font-bold border border-slate-100 dark:border-slate-850 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-600 transition-all cursor-pointer"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex-grow flex items-center justify-center space-x-1.5 px-3 py-2.5 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
              showAdvanced || filters.carTypes.length > 0 || filters.ownerType !== 'all' || filters.priceRange[1] < 500
                ? 'bg-blue-50 border-blue-200 text-blue-605 dark:bg-slate-800 dark:border-slate-700 dark:text-white'
                : 'border-slate-100 dark:border-slate-850 text-slate-500 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-955'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          {(filters.searchQuery || filters.carTypes.length > 0 || filters.ownerType !== 'all' || filters.priceRange[1] < 500) && (
            <button
              onClick={resetFilters}
              className="flex items-center justify-center px-3 py-2.5 border border-slate-100 dark:border-slate-850 rounded-xl text-slate-500 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-955 hover:text-rose-500 transition-all cursor-pointer"
              title="Reset Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* Advanced Filters Expandable Container */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-850 flex flex-col gap-4 animate-fadeIn">
          
          {/* Car Type Pills */}
          <div className="space-y-1.5">
            <h4 className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Car Class</h4>
            <div className="flex flex-wrap gap-1">
              {CAR_TYPES.map((type) => {
                const isSelected = filters.carTypes.includes(type);
                return (
                  <button
                    key={type}
                    onClick={() => toggleCarType(type)}
                    className={`text-[9px] px-2.5 py-1.5 rounded-lg border font-bold cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                        : 'border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-950/20'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hosting Option (Hub vs Individual) */}
          <div className="space-y-1.5">
            <h4 className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Listing Source</h4>
            <div className="grid grid-cols-3 gap-1 bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-100 dark:border-slate-850">
              <button
                onClick={() => handleOwnerTypeChange('all')}
                className={`py-1.5 text-[10px] font-bold rounded-lg cursor-pointer transition-all ${
                  filters.ownerType === 'all'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleOwnerTypeChange('hub')}
                className={`py-1.5 text-[10px] font-bold rounded-lg flex items-center justify-center space-x-1 cursor-pointer transition-all ${
                  filters.ownerType === 'hub'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
                }`}
              >
                <Shield className="w-3 h-3 text-blue-500" />
                <span>Hubs</span>
              </button>
              <button
                onClick={() => handleOwnerTypeChange('individual')}
                className={`py-1.5 text-[10px] font-bold rounded-lg flex items-center justify-center space-x-1 cursor-pointer transition-all ${
                  filters.ownerType === 'individual'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
                }`}
              >
                <User className="w-3 h-3 text-blue-500" />
                <span>Ready</span>
              </button>
            </div>
          </div>

          {/* Pricing Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <h4 className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Max Price / Day</h4>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">${filters.priceRange[1]}</span>
            </div>
            <div className="flex items-center space-x-3 pt-1">
              <span className="text-[9px] text-slate-400 font-bold">$0</span>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={filters.priceRange[1]}
                onChange={handlePriceChange}
                className="flex-1 accent-blue-600 cursor-pointer h-1 bg-slate-100 dark:bg-slate-950 rounded-lg appearance-none"
              />
              <span className="text-[9px] text-slate-400 font-bold">$500+</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

'use client';

import { RentalHub, Vehicle } from '@/types';
import { X, Star, MapPin, Phone, Mail, Car, Users } from 'lucide-react';

interface HubDrawerProps {
  hub: RentalHub | null;
  vehicles: Vehicle[];
  onClose: () => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export default function HubDrawer({
  hub,
  vehicles,
  onClose,
  onSelectVehicle
}: HubDrawerProps) {
  if (!hub) return null;

  // Filter vehicles that belong to this specific hub
  const hubFleet = vehicles.filter(v => v.hubId === hub.id);

  return (
    <>
      {/* Backdrop (Only on Mobile) */}
      <div 
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-40 lg:hidden cursor-pointer"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="fixed right-0 bottom-0 z-50 flex flex-col bg-white dark:bg-slate-900 shadow-2xl transition-all duration-300 ease-out border-l border-slate-100 dark:border-slate-800
        w-full h-[85vh] rounded-t-3xl max-h-[85vh]
        lg:top-0 lg:h-full lg:w-[480px] lg:max-h-screen lg:rounded-none lg:rounded-l-3xl lg:translate-y-0
      ">
        {/* Banner with Close Button */}
        <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-955 overflow-hidden flex-shrink-0">
          <img src={hub.bannerUrl} alt={hub.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/40 hover:bg-slate-950/60 border border-white/20 text-white cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Hub Name overlay */}
          <div className="absolute bottom-4 left-5 right-5 flex items-end space-x-3 text-white">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white flex-shrink-0 shadow-md">
              <img src={hub.logoUrl} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="mb-0.5">
              <span className="text-[9px] bg-indigo-500 text-white font-extrabold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">Verified Agency</span>
              <h2 className="font-extrabold text-base leading-tight mt-0.5">{hub.name}</h2>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Agency Rating & Overview */}
          <div className="grid grid-cols-3 gap-2 border-b border-slate-50 dark:border-slate-850 pb-5">
            <div className="text-center py-2 bg-slate-50 dark:bg-slate-950/30 rounded-xl border border-slate-100 dark:border-slate-900">
              <span className="text-[10px] text-slate-400 font-bold block">RATING</span>
              <span className="text-sm font-extrabold text-slate-850 dark:text-slate-200 flex items-center justify-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {hub.rating}
              </span>
            </div>
            <div className="text-center py-2 bg-slate-50 dark:bg-slate-950/30 rounded-xl border border-slate-100 dark:border-slate-900">
              <span className="text-[10px] text-slate-400 font-bold block">REVIEWS</span>
              <span className="text-sm font-extrabold text-slate-850 dark:text-slate-200 mt-0.5 block">{hub.reviewCount}</span>
            </div>
            <div className="text-center py-2 bg-slate-50 dark:bg-slate-950/30 rounded-xl border border-slate-100 dark:border-slate-900">
              <span className="text-[10px] text-slate-400 font-bold block">FLEET SIZE</span>
              <span className="text-sm font-extrabold text-slate-850 dark:text-slate-200 mt-0.5 block">{hub.fleetCount} Cars</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">About the Agency</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {hub.description}
            </p>
          </div>

          {/* Contact details */}
          <div className="border border-slate-100 dark:border-slate-850 p-4 rounded-2xl space-y-3">
            <h3 className="font-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">Contact details</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-2 text-xs text-slate-550 dark:text-slate-450">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>{hub.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-550 dark:text-slate-450">
                <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="text-indigo-500 underline font-semibold cursor-pointer">{hub.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-550 dark:text-slate-450">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="text-indigo-500 underline font-semibold cursor-pointer">{hub.email}</span>
              </div>
            </div>
          </div>

          {/* Hub Fleet List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-50 flex items-center gap-1.5">
                <Car className="w-4 h-4 text-indigo-500" />
                On-Site Fleet Discoverable ({hubFleet.length})
              </h3>
            </div>

            {hubFleet.length === 0 ? (
              <div className="text-center py-10 bg-slate-50/50 dark:bg-slate-950/20 border rounded-2xl border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-400">All vehicles are currently checked out.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {hubFleet.map((vehicle) => (
                  <div 
                    key={vehicle.id}
                    onClick={() => onSelectVehicle(vehicle)}
                    className="group flex gap-3.5 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-xl p-3 hover:border-indigo-400 cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
                  >
                    {/* Visual box */}
                    <div className="w-24 h-16 bg-slate-50 dark:bg-slate-900 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100/50 dark:border-slate-850">
                      <img src={vehicle.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    {/* Information */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-xs text-slate-850 dark:text-slate-200 truncate pr-2 group-hover:text-indigo-500 transition-colors">
                            {vehicle.brand} {vehicle.name}
                          </h4>
                          <span className="text-xs font-black text-slate-900 dark:text-white flex-shrink-0">${vehicle.price}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate">{vehicle.model}</p>
                      </div>

                      {/* Small Quick specs list */}
                      <div className="flex items-center space-x-2.5 text-[9px] text-slate-400 pt-1">
                        <span className="flex items-center gap-0.5"><Users className="w-3 h-3" /> {vehicle.seats}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="truncate">{vehicle.transmission}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="truncate">{vehicle.fuelType}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

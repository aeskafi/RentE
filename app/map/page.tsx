'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { MOCK_VEHICLES, MOCK_HUBS } from '@/lib/mockData';
import { FilterState, Vehicle, RentalHub } from '@/types';
import SearchFilterBar from '@/components/SearchFilterBar';
import VehicleCard from '@/components/cards/VehicleCard';
import HubCard from '@/components/cards/HubCard';
import DetailDrawer from '@/components/DetailDrawer';
import HubDrawer from '@/components/HubDrawer';
import MobileNav from '@/components/MobileNav';
import LeafletMap from '@/components/map';
import Navbar from '@/components/Navbar';
import { Compass, Sparkles, MapPin, Car, Shield, Grid, ArrowLeft } from 'lucide-react';

export default function MapDiscovery() {
  const [mapCenter, setMapCenter] = useState<[number, number]>([34.0194, -118.4912]);
  const [mapZoom, setMapZoom] = useState(13);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedHub, setSelectedHub] = useState<RentalHub | null>(null);
  const [activeDesktopTab, setActiveDesktopTab] = useState<'vehicles' | 'hubs'>('vehicles');
  const [activeMobileTab, setActiveMobileTab] = useState<'map' | 'vehicles' | 'hubs'>('map');

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    carTypes: [],
    priceRange: [0, 500],
    ownerType: 'all',
    transmission: 'all',
    fuelType: 'all',
    pickupDate: '2026-08-25',
    returnDate: '2026-08-28'
  });

  const filteredVehicles = useMemo(() => {
    return MOCK_VEHICLES.filter((vehicle) => {
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesBrand = vehicle.brand.toLowerCase().includes(query);
        const matchesName = vehicle.name.toLowerCase().includes(query);
        if (!matchesBrand && !matchesName) return false;
      }
      if (filters.carTypes.length > 0 && !filters.carTypes.includes(vehicle.type)) return false;
      if (vehicle.price > filters.priceRange[1]) return false;
      if (filters.ownerType !== 'all' && vehicle.ownerType !== filters.ownerType) return false;
      return true;
    });
  }, [filters]);

  const filteredHubs = useMemo(() => {
    return MOCK_HUBS.filter((hub) => {
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = hub.name.toLowerCase().includes(query);
        if (!matchesName) return false;
      }
      if (filters.ownerType === 'individual') return false;
      return true;
    });
  }, [filters]);

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedHub(null);
    setMapCenter([vehicle.coordinates.lat, vehicle.coordinates.lng]);
    setMapZoom(15);
    if (activeMobileTab !== 'map') setActiveMobileTab('map');
  };

  const handleSelectHub = (hub: RentalHub) => {
    setSelectedHub(hub);
    setSelectedVehicle(null);
    setMapCenter([hub.coordinates.lat, hub.coordinates.lng]);
    setMapZoom(15);
    if (activeMobileTab !== 'map') setActiveMobileTab('map');
  };

  const handleViewHubFromVehicle = (hubId: string) => {
    const hub = MOCK_HUBS.find(h => h.id === hubId);
    if (hub) {
      handleSelectHub(hub);
    }
  };

  return (
    <main className="flex flex-col h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans">
      
      {/* Shared Navigation Header */}
      <Navbar />

      {/* SPLIT VIEWS */}
      <div className="flex-grow flex w-full relative overflow-hidden">
        
        {/* LEFT COLUMN: LIST */}
        <div className="hidden lg:flex flex-col w-[440px] bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 z-10 flex-shrink-0">
          <div className="p-5 border-b border-slate-50 dark:border-slate-850 flex-shrink-0 space-y-4">
            <SearchFilterBar filters={filters} onFilterChange={setFilters} />
          </div>

          <div className="px-5 py-2.5 bg-slate-50/50 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-850 flex justify-between items-center flex-shrink-0">
            <div className="flex space-x-1.5">
              <button
                onClick={() => setActiveDesktopTab('vehicles')}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeDesktopTab === 'vehicles'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-450 dark:text-slate-500'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Pickup Vehicles ({filteredVehicles.length})</span>
              </button>

              <button
                onClick={() => setActiveDesktopTab('hubs')}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeDesktopTab === 'hubs'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-455 dark:text-slate-500'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Physical Offices ({filteredHubs.length})</span>
              </button>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-5 space-y-4">
            {activeDesktopTab === 'vehicles' ? (
              filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onSelect={handleSelectVehicle}
                  isSelected={selectedVehicle?.id === vehicle.id}
                />
              ))
            ) : (
              filteredHubs.map((hub) => (
                <HubCard
                  key={hub.id}
                  hub={hub}
                  onSelect={handleSelectHub}
                  isSelected={selectedHub?.id === hub.id}
                />
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: MAP CONTAINER */}
        <div className="flex-grow h-full relative">
          <div className="lg:hidden absolute top-4 left-4 right-4 z-10 pointer-events-none">
            <div className="pointer-events-auto">
              <SearchFilterBar filters={filters} onFilterChange={setFilters} />
            </div>
          </div>

          <LeafletMap
            vehicles={filteredVehicles}
            hubs={filteredHubs}
            selectedVehicle={selectedVehicle}
            selectedHub={selectedHub}
            onSelectVehicle={handleSelectVehicle}
            onSelectHub={handleSelectHub}
            center={mapCenter}
            zoom={mapZoom}
          />

          {/* Floating selection card popup for mobile */}
          {selectedVehicle && (
            <div className="lg:hidden absolute bottom-20 left-4 right-4 z-10 pointer-events-auto shadow-2xl bg-white dark:bg-slate-900 border rounded-2xl p-3.5 flex gap-3.5">
              <div className="w-24 h-16 rounded-xl bg-slate-50 overflow-hidden flex-shrink-0">
                <img src={selectedVehicle.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">{selectedVehicle.brand} {selectedVehicle.name}</h4>
                  <p className="text-xs text-slate-400 truncate">{selectedVehicle.model} • ${selectedVehicle.price}/day</p>
                </div>
                <button onClick={() => setSelectedVehicle(selectedVehicle)} className="text-xs text-indigo-500 font-bold self-start mt-1">
                  View Details &rarr;
                </button>
              </div>
            </div>
          )}

          {selectedHub && (
            <div className="lg:hidden absolute bottom-20 left-4 right-4 z-10 pointer-events-auto shadow-2xl bg-white dark:bg-slate-900 border rounded-2xl p-3.5 flex gap-3.5">
              <div className="w-24 h-16 rounded-xl bg-slate-50 overflow-hidden flex-shrink-0">
                <img src={selectedHub.bannerUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">{selectedHub.name}</h4>
                  <p className="text-xs text-slate-400 truncate">{selectedHub.address}</p>
                </div>
                <button onClick={() => setSelectedHub(selectedHub)} className="text-xs text-indigo-500 font-bold self-start mt-1">
                  Explore Hub &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      <MobileNav activeTab={activeMobileTab} onChangeTab={setActiveMobileTab} />

      {selectedVehicle && (
        <DetailDrawer
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          pickupDate={filters.pickupDate}
          returnDate={filters.returnDate}
          onViewHub={handleViewHubFromVehicle}
          hubs={MOCK_HUBS}
        />
      )}

      {selectedHub && (
        <HubDrawer
          hub={selectedHub}
          vehicles={MOCK_VEHICLES}
          onClose={() => setSelectedHub(null)}
          onSelectVehicle={handleSelectVehicle}
        />
      )}
    </main>
  );
}

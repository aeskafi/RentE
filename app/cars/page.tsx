'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MOCK_VEHICLES, MOCK_HUBS } from '@/lib/mockData';
import { Vehicle } from '@/types';
import { Star, Users, Gauge, Zap, Search, Map, Settings, Calendar, SlidersHorizontal, ShieldCheck, Heart } from 'lucide-react';
import DetailDrawer from '@/components/DetailDrawer';
import Navbar from '@/components/Navbar';

function CarsListContent() {
  const searchParams = useSearchParams();
  const initialLocation = searchParams.get('location') || '';
  const initialBrand = searchParams.get('brand') || 'Any';

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [rentalType, setRentalType] = useState<'any' | 'day' | 'hour'>('day');
  const [priceMax, setPriceMax] = useState(500);
  const [yearMin, setYearMin] = useState(2016);
  const [transmission, setTransmission] = useState<'Any' | 'Manual' | 'Automatic'>('Any');
  const [fuelType, setFuelType] = useState<string>('Any');
  const [seats, setSeats] = useState<string>('Any');
  const [condition, setCondition] = useState<string>('All');
  
  // Selected details drawer
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Sync brand filter from URL if present
  useEffect(() => {
    if (initialBrand && initialBrand !== 'Any') {
      setSelectedBrand(initialBrand);
    }
  }, [initialBrand]);

  // Filter Logic
  const filteredVehicles = useMemo(() => {
    return MOCK_VEHICLES.filter(vehicle => {
      // 1. Text search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesBrand = vehicle.brand.toLowerCase().includes(query);
        const matchesName = vehicle.name.toLowerCase().includes(query);
        if (!matchesBrand && !matchesName) return false;
      }

      // 2. Brand selector
      if (selectedBrand !== 'Any' && vehicle.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }

      // 3. Price
      if (vehicle.price > priceMax) return false;

      // 4. Year
      if (vehicle.year < yearMin) return false;

      // 5. Transmission
      if (transmission !== 'Any' && vehicle.transmission !== transmission) {
        return false;
      }

      // 6. Fuel Type
      if (fuelType !== 'Any' && vehicle.fuelType !== fuelType) {
        return false;
      }

      // 7. Seats
      if (seats !== 'Any') {
        if (seats === '2' && vehicle.seats !== 2 && vehicle.seats !== 4) return false;
        if (seats === '4' && vehicle.seats !== 4 && vehicle.seats !== 5) return false;
        if (seats === '5+' && vehicle.seats < 5) return false;
      }

      return true;
    });
  }, [searchQuery, selectedBrand, priceMax, yearMin, transmission, fuelType, seats]);

  // Available brands in system
  const brands = ['Any', 'Porsche', 'Tesla', 'Volvo', 'Jeep', 'Mercedes-Benz', 'Ford', 'Hyundai', 'Honda', 'Mini', 'Audi', 'Chevrolet'];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 flex flex-col font-sans">
      
      {/* Shared Navigation Header */}
      <Navbar />

      {/* 2. SUBHEADER QUICK FILTERS BAR */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 py-4 shadow-sm z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="w-full lg:flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* CAR BRAND */}
            <div className="text-left px-2 border-r border-slate-100 dark:border-slate-800 last:border-0">
              <label className="text-[9px] text-slate-400 font-extrabold uppercase block tracking-wider">Car Brand</label>
              <select 
                value={selectedBrand} 
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full text-slate-800 dark:text-white bg-transparent text-xs font-bold mt-1 focus:outline-hidden cursor-pointer"
              >
                {brands.map(b => <option key={b} value={b} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">{b}</option>)}
              </select>
            </div>

            {/* TRANSMISSION */}
            <div className="text-left px-2 border-r border-slate-100 dark:border-slate-800 last:border-0">
              <label className="text-[9px] text-slate-400 font-extrabold uppercase block tracking-wider">Transmission</label>
              <select 
                value={transmission} 
                onChange={(e) => setTransmission(e.target.value as any)}
                className="w-full text-slate-800 dark:text-white bg-transparent text-xs font-bold mt-1 focus:outline-hidden cursor-pointer"
              >
                <option value="Any" className="bg-white dark:bg-slate-900 text-slate-850 dark:text-slate-100">Any</option>
                <option value="Manual" className="bg-white dark:bg-slate-900 text-slate-850 dark:text-slate-100">Manual</option>
                <option value="Automatic" className="bg-white dark:bg-slate-900 text-slate-850 dark:text-slate-100">Automatic</option>
              </select>
            </div>

            {/* PICKUP LOCATION */}
            <div className="text-left px-2 border-r border-slate-100 dark:border-slate-800 last:border-0">
              <label className="text-[9px] text-slate-400 font-extrabold uppercase block tracking-wider">Pickup Location</label>
              <span className="text-xs font-bold mt-1 block truncate">Santa Monica, LA</span>
            </div>

            {/* DATES */}
            <div className="text-left px-2">
              <label className="text-[9px] text-slate-400 font-extrabold uppercase block tracking-wider">Pick Up & Return</label>
              <span className="text-xs font-bold mt-1 block">Aug 25 - Aug 28</span>
            </div>

          </div>

          <div className="flex gap-2 w-full lg:w-auto">
            {/* SEARCH BUTTON */}
            <div className="relative flex-1 lg:w-44">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 text-xs border border-slate-100 dark:border-slate-850 rounded-xl focus:outline-hidden"
              />
            </div>

            {/* MAP VIEW BUTTON */}
            <Link 
              href="/map"
              className="bg-[#D2F535] hover:opacity-90 text-slate-950 font-black text-xs px-5 py-3 rounded-xl flex items-center justify-center space-x-2 shadow-md cursor-pointer transition-all active:scale-95"
            >
              <Map className="w-3.5 h-3.5" />
              <span>Show Map</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. SPLIT CONTENT VIEW */}
      <div className="flex-grow max-w-7xl mx-auto w-full px-6 py-8 flex flex-col md:flex-row gap-8">
        
        {/* LEFT COLUMN: FILTERS PANEL */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-slate-50 dark:border-slate-850">
              <h3 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">Filters</h3>
              <button 
                onClick={() => {
                  setRentalType('day');
                  setPriceMax(500);
                  setYearMin(2016);
                  setTransmission('Any');
                  setFuelType('Any');
                  setSeats('Any');
                  setCondition('All');
                }}
                className="text-[10px] text-slate-900 dark:text-white font-extrabold uppercase tracking-wide cursor-pointer underline hover:opacity-80"
              >
                Reset All
              </button>
            </div>

            {/* RENTAL TYPE */}
            <div className="space-y-2">
              <h4 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Rental Type</h4>
              <div className="flex space-x-1.5 bg-slate-50 dark:bg-slate-950 p-1 rounded-xl">
                {['any', 'day', 'hour'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setRentalType(t as any)}
                    className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-lg cursor-pointer transition-all ${
                      rentalType === t
                        ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-xs'
                        : 'text-slate-450 hover:text-slate-600'
                    }`}
                  >
                    Per {t === 'any' ? 'Any' : t}
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE RANGE */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                <span>Price Range</span>
                <span className="text-slate-950 dark:text-white font-black">${priceMax}/day</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="500" 
                step="25"
                value={priceMax} 
                onChange={(e) => setPriceMax(parseInt(e.target.value))}
                className="w-full accent-slate-950 dark:accent-white h-1 bg-slate-100 dark:bg-slate-950 rounded-lg cursor-pointer"
              />
            </div>

            {/* YEAR RANGE */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                <span>Year Range</span>
                <span className="text-slate-950 dark:text-white font-black">{yearMin} - 2024</span>
              </div>
              <input 
                type="range" 
                min="2016" 
                max="2024" 
                step="1"
                value={yearMin} 
                onChange={(e) => setYearMin(parseInt(e.target.value))}
                className="w-full accent-slate-950 dark:accent-white h-1 bg-slate-100 dark:bg-slate-900 rounded-lg cursor-pointer"
              />
            </div>

            {/* FUEL TYPE */}
            <div className="space-y-2">
              <h4 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Fuel Type</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {['Any', 'Electric', 'Petrol', 'Hybrid'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFuelType(f)}
                    className={`py-1.5 text-[10px] font-bold rounded-lg border text-center cursor-pointer transition-all ${
                      fuelType === f
                        ? 'bg-blue-600 text-white border-transparent'
                        : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* SEATS CAPACITY */}
            <div className="space-y-2">
              <h4 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Seats Capacity</h4>
              <div className="flex space-x-1 bg-slate-50 dark:bg-slate-950 p-1 rounded-xl">
                {['Any', '2', '4', '5+'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSeats(s)}
                    className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg cursor-pointer transition-all ${
                      seats === s
                        ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-xs'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* VEHICLE CONDITION */}
            <div className="space-y-2">
              <h4 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Vehicle Condition</h4>
              <div className="flex space-x-1 bg-slate-50 dark:bg-slate-950 p-1 rounded-xl">
                {['All', 'Brand New', 'Used'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCondition(c)}
                    className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg cursor-pointer transition-all ${
                      condition === c
                        ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-xs'
                        : 'text-slate-400 hover:text-slate-655'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* RIGHT COLUMN: SEARCH RESULTS GRID */}
        <main className="flex-1 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-extrabold text-lg text-slate-950 dark:text-white">
              Showing Search Results <span className="text-slate-400 font-semibold text-sm">({filteredVehicles.length} found)</span>
            </h2>
          </div>

          {filteredVehicles.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 border rounded-3xl border-dashed">
              <p className="text-sm font-semibold text-slate-450">No cars found matching your sidebar filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVehicles.map((vehicle) => (
                <div 
                  key={vehicle.id} 
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 flex flex-col justify-between hover:shadow-lg transition-all group relative"
                >
                  {/* Brand & Heart button */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-extrabold text-slate-950 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {vehicle.name}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{vehicle.model}</p>
                    </div>
                    <button className="text-slate-350 hover:text-rose-500 p-1">
                      <Heart className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  {/* Body Image & Swatches Side-by-Side */}
                  <div className="flex items-center justify-between my-5">
                    <div className="h-28 flex-1 flex items-center justify-center">
                      <img src={vehicle.imageUrl} alt="" className="h-full object-contain filter drop-shadow-md group-hover:scale-102 transition-transform duration-300" />
                    </div>

                    {/* Color Swatch Dots */}
                    <div className="flex flex-col space-y-1.5 pl-3">
                      <span className="w-3.5 h-3.5 rounded-full border border-white shadow-xs bg-red-600 cursor-pointer" />
                      <span className="w-3.5 h-3.5 rounded-full border border-white shadow-xs bg-slate-400 cursor-pointer" />
                      <span className="w-3.5 h-3.5 rounded-full border border-white shadow-xs bg-slate-950 cursor-pointer" />
                    </div>
                  </div>

                  {/* Specs & Pricing */}
                  <div className="border-t border-slate-50 dark:border-slate-850 pt-4 flex justify-between items-end">
                    
                    {/* Specs Icons */}
                    <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-slate-455" /> {vehicle.seats}</span>
                      <span className="flex items-center gap-1"><Gauge className="w-3.5 h-3.5 text-slate-455" /> {vehicle.transmission.slice(0, 4)}</span>
                      <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-slate-455" /> {vehicle.fuelType}</span>
                    </div>

                    {/* Pricing Info */}
                    <div className="text-right flex items-baseline space-x-1">
                      <span className="text-lg font-black text-slate-950 dark:text-white">${vehicle.price}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">/day</span>
                    </div>

                  </div>

                  {/* Click Overlay to select */}
                  <button 
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="View Details"
                  />
                </div>
              ))}
            </div>
          )}
        </main>

      </div>

      {/* 4. DETAIL DRAWER MODAL */}
      {selectedVehicle && (
        <DetailDrawer
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          pickupDate="2026-08-25"
          returnDate="2026-08-28"
          onViewHub={(hubId) => {}}
          hubs={MOCK_HUBS}
        />
      )}

    </div>
  );
}

export default function CarsList() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading car list...</div>}>
      <CarsListContent />
    </Suspense>
  );
}

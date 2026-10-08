'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { MOCK_VEHICLES } from '@/lib/mockData';
import { ArrowRight, Star, Users, Gauge, Info, Zap, Heart, CheckCircle2, ChevronRight } from 'lucide-react';

const CATEGORIES = ['Sport', 'SUV', 'Sedan', 'MPV', 'Coupe', 'Hatchback'];
const BRANDS = ['BMW', 'Mercedes-Benz', 'Toyota', 'Honda', 'Hyundai', 'Tesla'];

function BrandLogo({ name, className }: { name: string; className?: string }) {
  const getSvgContent = () => {
    switch (name) {
      case 'BMW':
        return (
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-15h2v6h-2V5zm0 8h2v6h-2v-6zm-6-2h6v2H6v-2zm8 0h6v2h-6v-2z" />
        );
      case 'Mercedes-Benz':
        return (
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 1.5c4.69 0 8.5 3.81 8.5 8.5 0 .97-.16 1.9-.46 2.76l-8.04-4.64V3.5zm-1.04.09v6.91L2.92 15.14c-.3-1.06-.46-2.19-.46-3.36 0-4.42 3.41-8.05 7.75-8.48l.75.09zm1.04 17.16c-3.79 0-7.07-2.52-8.15-6l8.15-4.7 8.15 4.7c-1.08 3.48-4.36 6-8.15 6z" />
        );
      case 'Toyota':
        return (
          <path d="M12 2C6.48 2 2 4.69 2 8c0 .92.35 1.79 1 2.56.24-.31.54-.58.89-.8C3.33 9.17 3 8.6 3 8c0-2.48 3.58-4.5 9-4.5s9 2.02 9 4.5c0 .6-.33 1.17-.89 1.76.35.22.65.49.89.8.65-.77 1-1.64 1-2.56 0-3.31-4.48-6-10-6zm0 13c-4.42 0-8-1.57-8-3.5S7.58 8 12 8s8 1.57 8 3.5-3.58 3.5-8 3.5zm0-1c3.31 0 6-1.12 6-2.5S15.31 9 12 9s-6 1.12-6 2.5 2.69 2.5 6 2.5zm1.5-5.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5z" />
        );
      case 'Honda':
        return (
          <path d="M4 2h16c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm2.5 4v12h2v-5.5h7V18h2V6h-2v4.5h-7V6h-2z" />
        );
      case 'Hyundai':
        return (
          <path d="M12 2C5.37 2 2 5.58 2 10s3.37 8 10 8 10-3.58 10-8-3.37-8-10-8zm5 5h-1.5l-3.5 5.5V7H10v10h1.5l3.5-5.5V17H17V7z" />
        );
      case 'Tesla':
        return (
          <path d="M11.96 2.02c.07-.02.13-.02.2 0 1.93.42 3.84 1.13 5.63 2.12-.13.3-.28.58-.45.85-1.42-.77-2.92-1.34-4.5-1.68-.07.6-.07 1.22 0 1.83.95.12 1.89.37 2.78.75-.12.3-.26.58-.42.85-.75-.3-1.55-.5-2.36-.59.08.97.23 1.93.45 2.87.58.11 1.15.28 1.7.53-.1.3-.22.58-.36.85-.46-.19-.94-.33-1.43-.42.66 2.41 1.84 4.63 3.44 6.51-.23.16-.48.3-.74.43-1.63-1.92-2.82-4.18-3.48-6.62-.05-.01-.1-.01-.15 0-.66 2.44-1.85 4.7-3.48 6.62-.26-.13-.51-.27-.74-.43 1.6-1.88 2.78-4.1 3.44-6.51-.49.09-.97.23-1.43.42-.14-.27-.26-.55-.36-.85.55-.25 1.12-.42 1.7-.53.22-.94.37-1.9.45-2.87-.81.09-1.61.29-2.36.59-.16-.27-.3-.55-.42-.85.89-.38 1.83-.63 2.78-.75.07-.61.07-1.23 0-1.83-1.58.34-3.08.91-4.5 1.68-.17-.27-.32-.55-.45-.85 1.79-.99 3.7-1.7 5.63-2.12z" />
        );
      default:
        return null;
    }
  };

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      aria-label={`${name} brand logo`}
    >
      {getSvgContent()}
    </svg>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Sport');
  const [location, setLocation] = useState('Santa Monica, Los Angeles, CA');
  const [pickupDate, setPickupDate] = useState('2026-08-25');
  const [returnDate, setReturnDate] = useState('2026-08-28');
  const [wishlist, setWishlist] = useState<string[]>(['veh-2']);

  // Filter vehicles matching the selected tab category
  const filteredPopular = MOCK_VEHICLES.filter(v => v.type === activeCategory).slice(0, 4);

  const toggleWishlist = (id: string) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen font-sans transition-colors duration-300">
      {/* Shared Header Navigation */}
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <span className="bg-blue-50 dark:bg-blue-950/45 text-blue-600 dark:text-blue-400 text-[11px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
          Find Your Ride & Rent in Minutes
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-950 dark:text-white tracking-tight max-w-4xl leading-tight">
          Discover the perfect car for your next <span className="text-blue-600">adventure</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl text-sm sm:text-base">
          Choose from over 100+ vehicles available across 3 convenient rental hubs and verified local hosts. Fully comprehensive coverage included.
        </p>

        {/* Silver Car Visual */}
        <div className="relative mt-8 w-full max-w-3xl h-[240px] sm:h-[360px] flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&auto=format&fit=crop&q=80"
            alt="Silver Porsche sports car" 
            className="w-full h-full object-contain filter drop-shadow-2xl hover:scale-[1.01] transition-transform duration-500"
          />
        </div>

        {/* Floating Quick Search Bar (Pill style matching main.webp) */}
        <div className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 md:p-6 shadow-2xl -mt-10 z-10 flex flex-col md:flex-row gap-4 items-center transition-colors">
          <div className="w-full md:flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Location */}
            <div className="text-left px-3 border-r border-slate-100 dark:border-slate-800 last:border-0">
              <label className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase block tracking-wider">Location</label>
              <input 
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-slate-850 dark:text-white bg-transparent text-xs font-bold mt-1 focus:outline-hidden"
                placeholder="Search location..."
              />
            </div>

            {/* Pickup Date */}
            <div className="text-left px-3 border-r border-slate-100 dark:border-slate-800 last:border-0">
              <label className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase block tracking-wider">Pickup Date</label>
              <input 
                type="date" 
                value={pickupDate} 
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full text-slate-855 dark:text-white bg-transparent text-xs font-bold mt-1 focus:outline-hidden cursor-pointer"
              />
            </div>

            {/* Return Date */}
            <div className="text-left px-3">
              <label className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase block tracking-wider">Return Date</label>
              <input 
                type="date" 
                value={returnDate} 
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full text-slate-855 dark:text-white bg-transparent text-xs font-bold mt-1 focus:outline-hidden cursor-pointer"
              />
            </div>

          </div>

          <Link 
            href={`/cars?location=${encodeURIComponent(location)}&pickup=${pickupDate}&return=${returnDate}`}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-8 py-4 rounded-2xl flex items-center justify-center space-x-2 shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>Search a ride</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 2. BENEFITS SECTION */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-850 py-20 px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-2 mb-16">
            <span className="text-xs text-blue-600 dark:text-blue-400 font-extrabold uppercase tracking-widest block">Why Choose Us</span>
            <h2 className="text-3xl font-black text-slate-950 dark:text-white">We ensure a smooth journey with unbeatable rental benefits</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            
            {/* Left Perks column */}
            <div className="space-y-10">
              <div className="flex gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 dark:bg-blue-950/30 rounded-xl flex-shrink-0 h-12 w-12 flex items-center justify-center font-bold">
                  👨‍✈️
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Experience driver</h3>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 leading-relaxed">Don&apos;t have a driver? Don&apos;t worry, we have professional drivers available at any time.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 dark:bg-blue-950/30 rounded-xl flex-shrink-0 h-12 w-12 flex items-center justify-center font-bold">
                  🚗
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Wide Range of Vehicles</h3>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 leading-relaxed">From economy hatches to premium luxury sportscars — pick the perfect vehicle for any occasion.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 dark:bg-blue-950/30 rounded-xl flex-shrink-0 h-12 w-12 flex items-center justify-center font-bold">
                  ⚙️
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">24/7 technical support</h3>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 leading-relaxed">Have a question? Contact our responsive support center at any hour of the day.</p>
                </div>
              </div>
            </div>

            {/* Center Top-Down Car */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[280px] h-[400px]">
                <img 
                  src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=600&auto=format&fit=crop&q=80" 
                  alt="Top-down sports car view" 
                  className="w-full h-full object-contain filter drop-shadow-2xl hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right Perks column */}
            <div className="space-y-10">
              <div className="flex gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 dark:bg-blue-950/30 rounded-xl flex-shrink-0 h-12 w-12 flex items-center justify-center font-bold">
                  🛡️
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Best price guaranteed</h3>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 leading-relaxed">Find a lower price elsewhere? We will refund 100% of the daily difference.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 dark:bg-blue-950/30 rounded-xl flex-shrink-0 h-12 w-12 flex items-center justify-center font-bold">
                  🧼
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Well-Maintained Cars</h3>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 leading-relaxed">Every vehicle is regularly serviced, valeted, and sanitized before keys are released.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 dark:bg-blue-950/30 rounded-xl flex-shrink-0 h-12 w-12 flex items-center justify-center font-bold">
                  🔑
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">24 hour car delivery</h3>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 leading-relaxed">Book a vehicle and have it delivered directly to your doorstep or airport terminal gate.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. POPULAR CAR DEALS SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs text-blue-600 dark:text-blue-400 font-extrabold uppercase tracking-widest">Popular Rental Deals</span>
          <h2 className="text-3xl font-black text-slate-950 dark:text-white">Most Popular Car Deals</h2>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold cursor-pointer transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Car Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPopular.map((vehicle) => {
            const hasLiked = wishlist.includes(vehicle.id);
            return (
              <div key={vehicle.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 flex flex-col justify-between hover:shadow-xl transition-all group">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-extrabold text-slate-950 dark:text-white text-base leading-tight group-hover:text-blue-600 transition-colors">
                        {vehicle.name}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{vehicle.brand}</p>
                    </div>
                    <button 
                      onClick={() => toggleWishlist(vehicle.id)} 
                      className={`p-1.5 rounded-full border border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
                        hasLiked ? 'text-rose-500' : 'text-slate-350'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  
                  {/* Image */}
                  <div className="h-32 w-full my-4 flex items-center justify-center">
                    <img src={vehicle.imageUrl} alt="" className="h-full object-contain filter drop-shadow-md group-hover:scale-103 transition-transform" />
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 border-t border-slate-50 dark:border-slate-850 py-3 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1 justify-center"><Users className="w-3.5 h-3.5 text-blue-600" /> {vehicle.seats}P</span>
                    <span className="flex items-center gap-1 justify-center"><Gauge className="w-3.5 h-3.5 text-blue-600" /> {vehicle.transmission.slice(0, 4)}</span>
                    <span className="flex items-center gap-1 justify-center"><Zap className="w-3.5 h-3.5 text-blue-600" /> {vehicle.fuelType}</span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="border-t border-slate-50 dark:border-slate-850 pt-3 flex justify-between items-center mt-2">
                  <div>
                    <span className="text-base font-extrabold text-slate-950 dark:text-white">${vehicle.price}</span>
                    <span className="text-[10px] text-slate-400 font-semibold block">/ day</span>
                  </div>
                  <Link 
                    href={`/cars?brand=${vehicle.brand}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
                  >
                    Rent Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            href="/cars"
            className="inline-flex items-center space-x-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-850 dark:text-slate-200 font-bold text-xs px-8 py-4 rounded-2xl hover:border-slate-250 transition-all cursor-pointer"
          >
            <span>Show All Vehicles</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. TRUSTED BRANDS */}
      <section className="bg-slate-100/50 dark:bg-slate-900/20 py-16 border-t border-slate-100 dark:border-slate-850 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs text-slate-450 dark:text-slate-400 font-extrabold uppercase tracking-widest mb-10">Trusted Brands We Offer</p>
          <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-16">
            {BRANDS.map((brand) => (
              <div 
                key={brand} 
                className="h-10 w-24 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer" 
                title={brand}
              >
                <BrandLogo name={brand} className="h-8 w-auto max-w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs text-blue-600 dark:text-blue-400 font-extrabold uppercase tracking-widest">Testimonials</span>
          <h2 className="text-3xl font-black text-slate-950 dark:text-white">What people Say About Us</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-550" />)}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-405 leading-relaxed italic">
                &quot;Renting from RentE was a fantastic experience. The booking was confirmed instantly and the Volvo EX30 was delivered in immaculate condition right to my hotel lobby. Highly recommend their seamless service!&quot;
              </p>
            </div>
            <div className="flex items-center space-x-3.5 mt-8 border-t border-slate-50 dark:border-slate-850 pt-6">
              <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Sarah Jenkins</h4>
                <p className="text-[10px] text-slate-450 uppercase font-semibold">Verified Renter • Product Designer</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-550" />)}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-405 leading-relaxed italic">
                &quot;As a driving enthusiast, being able to rent a Porsche 911 Carrera GTS for a weekend cruise down the coast was a dream come true. The process was direct, transparent, and absolutely stress-free.&quot;
              </p>
            </div>
            <div className="flex items-center space-x-3.5 mt-8 border-t border-slate-50 dark:border-slate-850 pt-6">
              <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Marcus Vane</h4>
                <p className="text-[10px] text-slate-450 uppercase font-semibold">Verified Renter • Creative Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-blue-600 text-white rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
          <div className="space-y-3 text-center md:text-left z-10">
            <h2 className="text-3xl font-black">Ready to Hit the Road?</h2>
            <p className="text-blue-100 text-sm max-w-md">Book in minutes with transparent pricing and zero hidden fees. Pick up details sent instantly.</p>
          </div>
          <Link href="/cars" className="bg-white hover:bg-slate-50 text-blue-600 font-extrabold px-8 py-4 rounded-2xl shadow-lg transition-all active:scale-95 z-10 cursor-pointer">
            Rent a Car Now
          </Link>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-slate-950 text-slate-450 border-t border-slate-900 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center">
              RentE<span className="text-blue-600">.</span>
            </span>
            <p className="text-xs text-slate-500 leading-relaxed">
              Premium car rental & discovery engine based in Santa Monica. Connect with physical hubs and private owners for immediate pickups.
            </p>
            <p className="text-xs text-slate-600 pt-4">© 2026 RentE. All Rights Reserved.</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-widest">Our Product</h4>
            <div className="flex flex-col space-y-2 text-xs">
              <Link href="/cars" className="hover:text-white transition-colors">Fleets</Link>
              <Link href="/cars" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/cars" className="hover:text-white transition-colors">Features</Link>
              <Link href="/map" className="hover:text-white transition-colors">Interactive Map</Link>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-widest">Resources</h4>
            <div className="flex flex-col space-y-2 text-xs">
              <span className="hover:text-white transition-colors cursor-pointer">Help Centre</span>
              <span className="hover:text-white transition-colors cursor-pointer">Guides</span>
              <span className="hover:text-white transition-colors cursor-pointer">Partner Network</span>
              <span className="hover:text-white transition-colors cursor-pointer">Developer API</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-widest">About</h4>
            <div className="flex flex-col space-y-2 text-xs">
              <span className="hover:text-white transition-colors cursor-pointer">Our Story</span>
              <span className="hover:text-white transition-colors cursor-pointer">Investor Relations</span>
              <span className="hover:text-white transition-colors cursor-pointer">Press Center</span>
              <span className="hover:text-white transition-colors cursor-pointer">Contact Us</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

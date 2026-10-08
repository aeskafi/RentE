'use client';

import { useState, useEffect } from 'react';
import { Vehicle, RentalHub } from '@/types';
import { X, ShieldCheck, Check, MapPin, Navigation, Compass } from 'lucide-react';

interface DetailDrawerProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  pickupDate: string;
  returnDate: string;
  onViewHub: (hubId: string) => void;
  hubs: RentalHub[];
}

export default function DetailDrawer({
  vehicle,
  onClose,
  pickupDate,
  returnDate,
  onViewHub,
  hubs
}: DetailDrawerProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [bookingStep, setBookingStep] = useState<'details' | 'summary' | 'processing' | 'confirmed'>('details');
  const [bookingProgress, setBookingProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('Initiating request...');

  // Reset booking step when vehicle changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setBookingStep('details');
      setBookingProgress(0);
      setActiveImageIndex(0);
    }, 0);
    return () => clearTimeout(timer);
  }, [vehicle]);

  if (!vehicle) return null;

  // Calculate rental duration
  const start = new Date(pickupDate);
  const end = new Date(returnDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  // Pricing calculations
  const basePrice = vehicle.price * rentalDays;
  const deposit = vehicle.deposit;
  const serviceFee = Math.round(basePrice * 0.08); // 8% fee
  const totalPrice = basePrice + serviceFee; // Deposit is held/refundable, not included in raw payment or separate line

  // Get hub information if owned by hub
  const associatedHub = vehicle.hubId 
    ? hubs.find(h => h.id === vehicle.hubId) 
    : null;

  // Handle booking simulation
  const startBookingSimulation = () => {
    setBookingStep('processing');
    setBookingProgress(10);
    setProgressLabel('Checking fleet availability...');

    const interval = setInterval(() => {
      setBookingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setBookingStep('confirmed');
          return 100;
        }
        
        // Update helper messages
        const next = prev + 15;
        if (next < 35) setProgressLabel('Securing dates on schedule...');
        else if (next < 60) setProgressLabel('Authorizing holding deposit...');
        else if (next < 85) setProgressLabel('Preparing keyless checkout profile...');
        else setProgressLabel('Finalizing reservation details...');
        
        return next > 100 ? 100 : next;
      });
    }, 400);
  };

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
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-50 dark:border-slate-850 flex-shrink-0">
          <div>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 tracking-widest uppercase">
              {bookingStep === 'details' && 'Vehicle Specs & Info'}
              {bookingStep === 'summary' && 'Booking Checkout'}
              {bookingStep === 'processing' && 'Processing System'}
              {bookingStep === 'confirmed' && 'Booking Success'}
            </span>
            <h2 className="font-extrabold text-lg text-slate-950 dark:text-slate-50">
              {vehicle.brand} {vehicle.name}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-850 text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* STEP 1: VEHICLE DETAILS */}
          {bookingStep === 'details' && (
            <>
              {/* Media Gallery / Slideshow */}
              <div className="space-y-2">
                <div className="relative h-56 w-full rounded-2xl bg-slate-50 dark:bg-slate-950 overflow-hidden border border-slate-100 dark:border-slate-850">
                  <img 
                    src={vehicle.gallery[activeImageIndex] || vehicle.imageUrl} 
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Dots Indicator */}
                  {vehicle.gallery.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 bg-slate-950/50 px-2.5 py-1 rounded-full backdrop-blur-xs">
                      {vehicle.gallery.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                            activeImageIndex === idx ? 'bg-amber-400 w-3' : 'bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Gallery Thumbnails */}
                {vehicle.gallery.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto pb-1">
                    {vehicle.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                          activeImageIndex === idx ? 'border-amber-500 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Owner Info & Hosting Badge */}
              <div className="bg-slate-50/50 dark:bg-slate-950/20 p-4 border border-slate-100 dark:border-slate-850 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex items-center justify-center border border-slate-100 dark:border-slate-700">
                    {associatedHub ? (
                      <img src={associatedHub.logoUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-extrabold text-sm text-slate-600 dark:text-slate-400">
                        {vehicle.ownerName.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">HOSTED BY</p>
                    <p className="font-bold text-slate-850 dark:text-slate-100 text-sm">{vehicle.ownerName}</p>
                  </div>
                </div>

                {associatedHub ? (
                  <button 
                    onClick={() => onViewHub(associatedHub.id)}
                    className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    View Agency Profile
                  </button>
                ) : (
                  <span className="text-[10px] bg-amber-100 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400 font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    Verified Host
                  </span>
                )}
              </div>

              {/* Specifications Details */}
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-50">Technical Specifications</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-medium block">TRANSMISSION</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{vehicle.transmission}</span>
                  </div>
                  <div className="p-3 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-medium block">FUEL / POWERTRAIN</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{vehicle.fuelType}</span>
                  </div>
                  <div className="p-3 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-medium block">DAILY MILEAGE LIMIT</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{vehicle.mileageLimit}</span>
                  </div>
                  <div className="p-3 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-medium block">REFUNDABLE DEPOSIT</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">${vehicle.deposit}</span>
                  </div>
                  {vehicle.range && (
                    <div className="p-3 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-xl">
                      <span className="text-[10px] text-slate-400 font-medium block">BATTERY RANGE</span>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{vehicle.range}</span>
                    </div>
                  )}
                  {vehicle.batteryCapacity && (
                    <div className="p-3 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-xl">
                      <span className="text-[10px] text-slate-400 font-medium block">BATTERY CAPACITY</span>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{vehicle.batteryCapacity}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-50">About This Car</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {vehicle.description}
                </p>
              </div>

              {/* Location Reference */}
              {associatedHub && (
                <div className="border border-indigo-100 dark:border-indigo-950/50 bg-indigo-50/20 dark:bg-indigo-950/10 p-4 rounded-2xl flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-50 text-xs uppercase tracking-wide">Pickup Location</h4>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">{associatedHub.name}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{associatedHub.address}</p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: BOOKING SUMMARY */}
          {bookingStep === 'summary' && (
            <div className="space-y-6">
              {/* Core Details Block */}
              <div className="flex items-center space-x-4 bg-slate-50 dark:bg-slate-950 p-4 border border-slate-100 dark:border-slate-850 rounded-2xl">
                <div className="w-20 h-14 bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={vehicle.imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{vehicle.brand} {vehicle.name}</h4>
                  <p className="text-xs text-slate-400">{vehicle.model} • {vehicle.year}</p>
                  <p className="text-xs text-amber-500 font-bold mt-0.5">${vehicle.price}/day</p>
                </div>
              </div>

              {/* Selected Schedule Dates */}
              <div className="border border-slate-100 dark:border-slate-850 p-4 rounded-2xl space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Schedule & Dates</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-450 dark:text-slate-500 font-bold block uppercase">PICKUP</span>
                    <span className="text-xs font-bold text-slate-850 dark:text-slate-350">{pickupDate}</span>
                    <span className="text-[10px] text-slate-400 block">From 9:00 AM</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-450 dark:text-slate-500 font-bold block uppercase">RETURN</span>
                    <span className="text-xs font-bold text-slate-850 dark:text-slate-350">{returnDate}</span>
                    <span className="text-[10px] text-slate-400 block">Until 11:00 AM</span>
                  </div>
                </div>

                <div className="bg-slate-50/50 dark:bg-slate-950/20 py-2.5 px-3 rounded-xl border border-slate-100 dark:border-slate-900 text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Total Duration:</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">{rentalDays} {rentalDays === 1 ? 'day' : 'days'}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Price Breakdown</h4>
                
                <div className="border border-slate-150 dark:border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>Daily Rate (${vehicle.price} × {rentalDays} days)</span>
                    <span className="font-semibold text-slate-900 dark:text-white">${basePrice}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>Service & Processing Fee (8%)</span>
                    <span className="font-semibold text-slate-900 dark:text-white">${serviceFee}</span>
                  </div>
                  
                  {/* Security Deposit note */}
                  <div className="border-t border-dashed border-slate-150 dark:border-slate-800 pt-3 flex justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      Refundable Security Deposit
                    </span>
                    <span className="font-bold">${deposit}</span>
                  </div>

                  {/* Total Payment Due */}
                  <div className="border-t border-slate-150 dark:border-slate-800 pt-3.5 flex justify-between items-center">
                    <div>
                      <span className="text-sm font-extrabold text-slate-900 dark:text-white block">Total Rental Fee</span>
                      <span className="text-[10px] text-slate-400">Security deposit held separately on pick up</span>
                    </div>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">${totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Security & Guarantee Notes */}
              <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-950/30 rounded-xl flex items-start space-x-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-emerald-800 dark:text-emerald-400 leading-relaxed font-medium">
                  <strong>DriveHub Safe Coverage:</strong> Includes secondary comprehensive liability coverage, 24/7 mechanical road service, and clean air sanitization before your trip.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: RESERVATION IN PROGRESS (EASTER EGG INSPIRED BY VOLVO SCREENSHOT) */}
          {bookingStep === 'processing' && (
            <div className="h-full flex flex-col justify-center items-center py-12 px-4 space-y-6">
              {/* Spinner & Progress bar */}
              <div className="relative w-28 h-28 flex items-center justify-center bg-slate-950 dark:bg-slate-900 rounded-full border border-slate-800 shadow-xl">
                <div className="absolute inset-2 rounded-full border-2 border-slate-800 border-t-amber-500 animate-spin" />
                <span className="text-lg font-black text-amber-500">{bookingProgress}%</span>
              </div>

              <div className="w-full text-center space-y-3">
                <h3 className="text-lg font-black text-slate-950 dark:text-slate-550">Reservation in progress</h3>
                <p className="text-xs text-slate-450 dark:text-slate-500 font-medium animate-pulse">{progressLabel}</p>
              </div>

              {/* Progress bar line */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${bookingProgress}%` }}
                />
              </div>

              {/* Step indicator labels */}
              <div className="w-full border border-slate-100 dark:border-slate-850 p-4 rounded-2xl space-y-3 bg-slate-50/50 dark:bg-slate-950/20">
                <div className="flex items-center space-x-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    bookingProgress > 20 ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {bookingProgress > 20 ? <Check className="w-3 h-3" /> : '1'}
                  </div>
                  <span className={`text-xs ${bookingProgress > 20 ? 'font-bold text-slate-850 dark:text-slate-200' : 'text-slate-400'}`}>
                    Availability check
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    bookingProgress > 50 ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {bookingProgress > 50 ? <Check className="w-3 h-3" /> : '2'}
                  </div>
                  <span className={`text-xs ${bookingProgress > 50 ? 'font-bold text-slate-850 dark:text-slate-200' : 'text-slate-400'}`}>
                    Holding deposit request
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    bookingProgress > 80 ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {bookingProgress > 80 ? <Check className="w-3 h-3" /> : '3'}
                  </div>
                  <span className={`text-xs ${bookingProgress > 80 ? 'font-bold text-slate-850 dark:text-slate-200' : 'text-slate-400'}`}>
                    Key allocation & receipt
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMATION DETAILS */}
          {bookingStep === 'confirmed' && (
            <div className="h-full flex flex-col justify-between py-2 space-y-6">
              <div className="space-y-6">
                {/* Visual success splash */}
                <div className="text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-950/30 p-6 rounded-3xl">
                  <div className="inline-flex p-3 rounded-full bg-emerald-500 text-slate-950 border-4 border-white dark:border-slate-900 shadow-md">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h3 className="text-xl font-black text-emerald-800 dark:text-emerald-450">Booking Confirmed!</h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Your trip is locked in. Let&apos;s hit the road.</p>
                </div>

                {/* Pickup Directions / Hub Card */}
                <div className="border border-slate-100 dark:border-slate-850 p-4 rounded-2xl space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 dark:bg-slate-900 text-amber-400 border border-slate-800">
                      <Compass className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">Pickup Directions</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {associatedHub 
                          ? `Visit our customer counter at ${associatedHub.name}.`
                          : `Meet the owner ${vehicle.ownerName} at the specified address.`
                        }
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950/50 p-3 rounded-xl border border-slate-100 dark:border-slate-900 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-semibold uppercase tracking-wider">ADDRESS</span>
                      <span className="text-slate-900 dark:text-slate-200 font-bold">
                        {associatedHub ? associatedHub.address : 'Santa Monica, Los Angeles, CA'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-semibold uppercase tracking-wider">TICKET REF</span>
                      <span className="text-amber-500 font-extrabold uppercase font-mono tracking-wider">DH-72395-SM</span>
                    </div>
                  </div>
                </div>

                {/* Date Summary Card */}
                <div className="border border-slate-100 dark:border-slate-850 p-4 rounded-2xl text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Rental Cost:</span>
                    <span className="font-bold text-slate-900 dark:text-white">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Days Active:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{rentalDays} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Host Contact:</span>
                    <span className="font-bold text-indigo-500 underline">
                      {associatedHub ? associatedHub.phone : '+1 (310) 555-9831'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Maps trigger */}
              <a 
                href={`https://maps.google.com/?q=${vehicle.coordinates.lat},${vehicle.coordinates.lng}`}
                target="_blank" 
                rel="noreferrer"
                className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md text-sm transition-all"
              >
                <Navigation className="w-4 h-4 fill-white text-indigo-600" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          )}
        </div>

        {/* Action Button Footer (sticky at bottom) */}
        {bookingStep !== 'processing' && bookingStep !== 'confirmed' && (
          <div className="px-6 py-4 border-t border-slate-50 dark:border-slate-850 flex-shrink-0 flex items-center justify-between bg-white dark:bg-slate-900">
            <div>
              <span className="text-[10px] text-slate-450 dark:text-slate-500 font-bold block uppercase tracking-wider">DAILY PRICING</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-black text-slate-900 dark:text-slate-50">${vehicle.price}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">/ day</span>
              </div>
            </div>

            {bookingStep === 'details' ? (
              <button
                onClick={() => setBookingStep('summary')}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Book This Car
              </button>
            ) : (
              <button
                onClick={startBookingSimulation}
                className="bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white dark:bg-slate-800 dark:hover:bg-amber-500 dark:hover:text-slate-950 font-bold text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Confirm Payment
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

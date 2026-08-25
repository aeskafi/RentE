'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Vehicle, RentalHub } from '@/types';

interface LeafletMapProps {
  vehicles: Vehicle[];
  hubs: RentalHub[];
  selectedVehicle: Vehicle | null;
  selectedHub: RentalHub | null;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onSelectHub: (hub: RentalHub) => void;
  center: [number, number];
  zoom: number;
}

export default function LeafletMap({
  vehicles,
  hubs,
  selectedVehicle,
  selectedHub,
  onSelectVehicle,
  onSelectHub,
  center,
  zoom
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Create Map
    const map = L.map(mapContainerRef.current, {
      zoomControl: false // We will render our own UI zoom controls
    }).setView(center, zoom);

    // Add Tile Layer (Sleek light tile layer matching our premium design system)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 20
    }).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update center when props change
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setView(center, zoom);
  }, [center, zoom]);

  // Render Hubs and Vehicles markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // 1. Add Rental Hubs
    hubs.forEach(hub => {
      // Create custom divIcon for Hubs
      const isActive = selectedHub?.id === hub.id;
      const borderClass = isActive ? 'border-amber-500 scale-110 z-[1000]' : 'border-white';
      
      const hubIcon = L.divIcon({
        className: 'custom-hub-marker',
        html: `
          <div class="relative flex items-center justify-center bg-slate-900 text-white w-10 h-10 rounded-full shadow-lg border-2 ${borderClass} hover:scale-110 transition-transform duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2"/>
              <path d="M18 18h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"/>
              <path d="M10 6h4"/>
              <path d="M10 10h4"/>
              <path d="M10 14h4"/>
              <path d="M10 18h4"/>
            </svg>
            <span class="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-bold text-[9px] w-5 h-5 rounded-full flex items-center justify-center border border-white">
              ${hub.fleetCount}
            </span>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      const marker = L.marker([hub.coordinates.lat, hub.coordinates.lng], { icon: hubIcon })
        .addTo(map)
        .on('click', () => {
          onSelectHub(hub);
        });

      markersRef.current[`hub-${hub.id}`] = marker;
    });

    // 2. Add Pickup Ready Vehicles (Individual owners)
    vehicles.forEach(vehicle => {
      // If the vehicle belongs to a hub and we are displaying hubs, we can either cluster them or place them on the hub.
      // In this dual-layer map:
      // - Hub-owned vehicles are shown inside the Hub profile fleet.
      // - "Pickup Ready" (available instantly, individual-owned or scattered cars) are shown as separate markers.
      // To prevent marker overlap, let's only display individual vehicles on the map, OR offset hub vehicles slightly.
      // Let's display individual vehicles as orange price-tag markers, and hub vehicles inside the hubs!
      if (vehicle.ownerType === 'hub') {
        // Option: we don't render individual markers for hub vehicles on the map, or we render them with a slight offset.
        // Let's offset hub vehicles slightly so they can still be discovered, or just keep them hidden on the map unless filtered.
        // The prompt says: 
        // - "Pickup Ready Vehicles: Dynamic markers for available cars with real-time popup previews..."
        // - "Permanent Rental Hubs / Offices: Distinct persistent markers for physical rental agencies..."
        // So individual/pickup-ready cars are placed dynamically, and hubs are static.
        // Let's show individual cars AND hub cars. For hub cars, let's group them or let them cluster.
        // To make it super clean, let's show all available vehicles that are NOT at hubs as individual markers,
        // and hub cars inside the hubs. Wait! If they filter for a specific car type (e.g. EV), we can show it!
        // Let's render all individual vehicles, and for hub-owned vehicles we can render them offset slightly, or only show them when selected.
        // Let's show individual vehicles AND hub vehicles on the map, but give hub vehicles a slightly different marker or label.
        // Actually, rendering individual vehicles as orange price pills, and hubs as blue building circles is exactly what is needed!
        if (vehicle.hubId !== null) {
          // It's a hub vehicle. Let's not render individual markers for it at the exact same location, or we can offset it slightly.
          // Let's show hub vehicles offset slightly so they are still discoverable on map, or just let users tap the hub to see its fleet.
          // Tapping the hub to see the fleet is very clean. But what if they search?
          // Let's render hub-owned vehicles on the map only if there is a search filter active, or let's offset them slightly.
          // A minor offset is perfect:
          // const offsetLat = vehicle.coordinates.lat + (Math.random() - 0.5) * 0.002;
        }
      }

      // Render individual / pickup ready vehicles
      if (vehicle.ownerType === 'individual') {
        const isActive = selectedVehicle?.id === vehicle.id;
        const activeClass = isActive 
          ? 'bg-blue-600 text-white font-bold border-2 border-white scale-110 z-[1000]' 
          : 'bg-slate-900 border border-slate-700 text-white';
        const priceBadgeClass = isActive ? 'text-white font-extrabold' : 'text-blue-400 font-bold';

        const carIcon = L.divIcon({
          className: 'custom-car-marker',
          html: `
            <div class="flex items-center space-x-1.5 ${activeClass} px-3 py-1.5 rounded-full shadow-md transform hover:scale-105 transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="${isActive ? 'text-white' : 'text-blue-400'}">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
                <circle cx="7" cy="17" r="2"/>
                <circle cx="17" cy="17" r="2"/>
              </svg>
              <span class="text-xs ${priceBadgeClass}">$${vehicle.price}</span>
            </div>
          `,
          iconSize: [80, 32],
          iconAnchor: [40, 16]
        });

        const marker = L.marker([vehicle.coordinates.lat, vehicle.coordinates.lng], { icon: carIcon })
          .addTo(map)
          .on('click', () => {
            onSelectVehicle(vehicle);
          });

        markersRef.current[`veh-${vehicle.id}`] = marker;
      }
    });

  }, [vehicles, hubs, selectedVehicle, selectedHub]);

  // Handle custom Zoom Controls UI in the main layout, but we also render basic Leaflet elements.
  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      
      {/* Zoom UI Overlays */}
      <div className="absolute bottom-6 right-6 z-[1000] flex flex-col space-y-2">
        <button 
          onClick={() => mapRef.current?.zoomIn()}
          className="w-10 h-10 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg shadow-md border border-slate-200 dark:border-slate-800 flex items-center justify-center font-bold text-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Zoom In"
        >
          +
        </button>
        <button 
          onClick={() => mapRef.current?.zoomOut()}
          className="w-10 h-10 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg shadow-md border border-slate-200 dark:border-slate-800 flex items-center justify-center font-bold text-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Zoom Out"
        >
          &minus;
        </button>
      </div>
    </div>
  );
}

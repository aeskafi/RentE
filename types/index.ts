export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  type: 'EV' | 'SUV' | 'Sedan' | 'Luxury' | 'Sport' | 'Hatchback';
  year: number;
  price: number; // daily price
  transmission: 'Manual' | 'Automatic';
  fuelType: 'Electric' | 'Petrol' | 'Diesel' | 'Hybrid';
  seats: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  gallery: string[];
  deposit: number;
  isAvailable: boolean;
  hubId: string | null; // null if owned by an individual
  coordinates: {
    lat: number;
    lng: number;
  };
  range?: string; // e.g. "300 mi"
  batteryCapacity?: string; // e.g. "75 kWh"
  description: string;
  ownerType: 'hub' | 'individual';
  ownerName: string;
  color: string;
  mileageLimit: string;
}

export interface RentalHub {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: number;
  reviewCount: number;
  logoUrl: string;
  bannerUrl: string;
  description: string;
  fleetCount: number;
}

export interface FilterState {
  searchQuery: string;
  carTypes: string[];
  priceRange: [number, number];
  ownerType: 'all' | 'hub' | 'individual';
  transmission: 'all' | 'Manual' | 'Automatic';
  fuelType: 'all' | 'Electric' | 'Petrol' | 'Hybrid' | 'Diesel';
  pickupDate: string;
  returnDate: string;
}

export interface BookingDetails {
  vehicleId: string;
  pickupDate: string;
  returnDate: string;
  days: number;
  basePrice: number;
  deposit: number;
  serviceFee: number;
  totalPrice: number;
}

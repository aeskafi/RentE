import { Vehicle, RentalHub } from '../types';

export const MOCK_HUBS: RentalHub[] = [
  {
    id: 'hub-1',
    name: 'Santa Monica Ocean Front Hub',
    address: '1500 Ocean Ave, Santa Monica, CA 90401',
    phone: '+1 (310) 555-0190',
    email: 'oceanfront@velohub.com',
    coordinates: { lat: 34.0120, lng: -118.4990 },
    rating: 4.8,
    reviewCount: 245,
    logoUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=100&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=800&auto=format&fit=crop&q=80',
    description: 'Our flagship ocean-front location offers immediate access to premium convertible sports cars and long-range electric vehicles perfect for highway cruising. Self-checkout kiosks and 24/7 key boxes available.',
    fleetCount: 5
  },
  {
    id: 'hub-2',
    name: 'Downtown SM Transit Center',
    address: '400 Colorado Ave, Santa Monica, CA 90401',
    phone: '+1 (310) 555-0210',
    email: 'downtown@velohub.com',
    coordinates: { lat: 34.0185, lng: -118.4900 },
    rating: 4.6,
    reviewCount: 189,
    logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1555628589-54e3df3e48e8?w=800&auto=format&fit=crop&q=80',
    description: 'Located directly opposite the Metro Expo Line station, this urban hub specializes in compact EVs, city hatchbacks, and affordable sedans. Ideal for commuters and business travelers.',
    fleetCount: 4
  },
  {
    id: 'hub-3',
    name: 'Santa Monica Airport (SMO) Fleet',
    address: '3200 Airport Ave, Santa Monica, CA 90405',
    phone: '+1 (310) 555-0320',
    email: 'airport@velohub.com',
    coordinates: { lat: 34.0150, lng: -118.4520 },
    rating: 4.9,
    reviewCount: 312,
    logoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=80',
    description: 'Our airport branch hosts an elite fleet of luxury sedans, family-sized SUVs, and high-performance sportscars. Includes complimentary airport meet-and-greet and valeted car preparation.',
    fleetCount: 6
  }
];

export const MOCK_VEHICLES: Vehicle[] = [
  // 1. Volvo EX30 (Individual, EV - Yellow like reference!)
  {
    id: 'veh-1',
    name: 'Volvo EX30',
    brand: 'Volvo',
    model: 'Ultra Single Motor',
    type: 'EV',
    year: 2024,
    price: 85,
    transmission: 'Automatic',
    fuelType: 'Electric',
    seats: 5,
    rating: 4.8,
    reviewCount: 42,
    imageUrl: 'https://images.unsplash.com/photo-1718043697204-62953de6c2bb?w=500&auto=format&fit=crop&q=80', // Yellow/Gold SUV EV
    gallery: [
      'https://images.unsplash.com/photo-1718043697204-62953de6c2bb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1707052988133-c8d35f49c0d1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1714152594645-1cbfb9d4e5f2?w=800&auto=format&fit=crop&q=80'
    ],
    deposit: 250,
    isAvailable: true,
    hubId: null, // Individual owner
    coordinates: { lat: 34.0250, lng: -118.4960 },
    range: '275 mi',
    batteryCapacity: '69 kWh',
    description: 'A pocket-sized powerhouse. This brand new, fully electric Volvo EX30 is the perfect blend of modern Scandinavian design, cutting-edge technology, and eco-friendly driving. Finished in striking Moss Yellow, it comes equipped with a Harmon Kardon sound system, park assist pilot, and a 360-degree camera system. Perfect for urban exploration and coastal trips.',
    ownerType: 'individual',
    ownerName: 'Sarah Jenkins',
    color: 'Moss Yellow',
    mileageLimit: '250 mi/day'
  },
  // 2. Porsche 911 Carrera (Individual, Sport - Red!)
  {
    id: 'veh-2',
    name: 'Porsche 911 Carrera GTS',
    brand: 'Porsche',
    model: 'GTS Coupe (Type 992)',
    type: 'Sport',
    year: 2023,
    price: 320,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 4,
    rating: 4.95,
    reviewCount: 78,
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=500&auto=format&fit=crop&q=80', // Red Porsche
    gallery: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611245801727-27944fba72a7?w=800&auto=format&fit=crop&q=80'
    ],
    deposit: 1500,
    isAvailable: true,
    hubId: null,
    coordinates: { lat: 34.0110, lng: -118.4930 },
    description: 'Experience pure driving bliss behind the wheel of this Carmine Red Porsche 911 Carrera GTS (992 generation). Packing a twin-turbocharged flat-six engine pumping out 473 horsepower, this masterpiece offers razor-sharp handling, active suspension management (PASM), and sports exhaust. Renting this vehicle is an unforgettable premium experience for driving enthusiasts.',
    ownerType: 'individual',
    ownerName: 'Marcus V.',
    color: 'Carmine Red',
    mileageLimit: '150 mi/day'
  },
  // 3. Tesla Model Y (Individual, EV - Silver/White)
  {
    id: 'veh-3',
    name: 'Tesla Model Y Long Range',
    brand: 'Tesla',
    model: 'Long Range AWD',
    type: 'EV',
    year: 2023,
    price: 75,
    transmission: 'Automatic',
    fuelType: 'Electric',
    seats: 5,
    rating: 4.78,
    reviewCount: 156,
    imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80'
    ],
    deposit: 200,
    isAvailable: true,
    hubId: null,
    coordinates: { lat: 34.0220, lng: -118.4850 },
    range: '330 mi',
    batteryCapacity: '75 kWh',
    description: 'Super versatile and spacious, this Tesla Model Y Long Range is the ultimate California road trip vehicle. Featuring full autopilot capability, premium white vegan leather seats, panoramic glass roof, and access to Teslas extensive Supercharger network. Ideal for families and group excursions.',
    ownerType: 'individual',
    ownerName: 'Alex Mercer',
    color: 'Pearl White',
    mileageLimit: '300 mi/day'
  },
  // 4. Jeep Wrangler (Individual, SUV - Green)
  {
    id: 'veh-4',
    name: 'Jeep Wrangler Rubicon',
    brand: 'Jeep',
    model: 'Rubicon 4xe Hybrid',
    type: 'SUV',
    year: 2023,
    price: 110,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    seats: 5,
    rating: 4.88,
    reviewCount: 34,
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop&q=80'
    ],
    deposit: 350,
    isAvailable: true,
    hubId: null,
    coordinates: { lat: 34.0050, lng: -118.4800 },
    description: 'Get ready for outdoor adventure. This Jeep Wrangler Rubicon 4xe combines rugged off-road credentials with a plug-in hybrid drivetrain. Take off the doors, fold down the soft top, and enjoy the ultimate wind-in-your-hair coastal cruise down to Malibu. Equipped with massive 33" all-terrain tires and heavy-duty lockers.',
    ownerType: 'individual',
    ownerName: 'Danielle Croft',
    color: 'Sarge Green',
    mileageLimit: '200 mi/day'
  },
  // 5. Mercedes-Benz S-Class (Individual, Luxury - Black)
  {
    id: 'veh-5',
    name: 'Mercedes-Benz S580',
    brand: 'Mercedes-Benz',
    model: 'S580 Executive Sedan',
    type: 'Luxury',
    year: 2022,
    price: 240,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    rating: 4.92,
    reviewCount: 29,
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&auto=format&fit=crop&q=80'
    ],
    deposit: 1000,
    isAvailable: true,
    hubId: null,
    coordinates: { lat: 34.0280, lng: -118.4720 },
    description: 'The pinnacle of automotive luxury. The Mercedes-Benz S-Class S580 is a sanctuary of comfort and technology. It features heated/ventilated massaging leather seats, Burmester 3D Surround Sound, dual tablet controls in the rear, ambient cabin lighting with 64 colors, and active air suspension for a cloud-like ride.',
    ownerType: 'individual',
    ownerName: 'Sterling Executive Car Service',
    color: 'Obsidian Black',
    mileageLimit: '150 mi/day'
  },

  // --- HUB 1 VEHICLES (Santa Monica Ocean Front Hub) ---
  // 6. Ford Bronco (Hub-owned, SUV)
  {
    id: 'veh-6',
    name: 'Ford Bronco Outer Banks',
    brand: 'Ford',
    model: 'Outer Banks 4x4',
    type: 'SUV',
    year: 2022,
    price: 95,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    rating: 4.74,
    reviewCount: 94,
    imageUrl: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&auto=format&fit=crop&q=80'
    ],
    deposit: 300,
    isAvailable: true,
    hubId: 'hub-1',
    coordinates: { lat: 34.0120, lng: -118.4990 },
    description: 'Perfect for coastal trips and cruising down Pacific Coast Highway. This Ford Bronco Outer Banks package features a high-clearance suspension, removable hardtop roof panels, 12-inch touchscreen navigation, and advanced driver assistance systems. Stored and serviced regularly at our Ocean Front hub.',
    ownerType: 'hub',
    ownerName: 'Santa Monica Ocean Front Hub',
    color: 'Area 51 Blue',
    mileageLimit: 'Unlimited'
  },
  // 7. Hyundai Ioniq 5 (Hub-owned, EV)
  {
    id: 'veh-7',
    name: 'Hyundai Ioniq 5 Limited',
    brand: 'Hyundai',
    model: 'Limited AWD',
    type: 'EV',
    year: 2023,
    price: 78,
    transmission: 'Automatic',
    fuelType: 'Electric',
    seats: 5,
    rating: 4.82,
    reviewCount: 52,
    imageUrl: 'https://images.unsplash.com/photo-1669062391605-728b7ca8ee8e?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1669062391605-728b7ca8ee8e?w=800&auto=format&fit=crop&q=80'
    ],
    deposit: 200,
    isAvailable: true,
    hubId: 'hub-1',
    coordinates: { lat: 34.0120, lng: -118.4990 },
    range: '266 mi',
    batteryCapacity: '77.4 kWh',
    description: 'Retro-futuristic styling meets ultra-fast charging. The Hyundai Ioniq 5 Limited offers a relaxing cabin with reclining front seats, active head-up display, and vehicle-to-load electrical outlets. Rent it from our Ocean Front Hub with 100% battery ready.',
    ownerType: 'hub',
    ownerName: 'Santa Monica Ocean Front Hub',
    color: 'Cyber Gray',
    mileageLimit: 'Unlimited'
  },

  // --- HUB 2 VEHICLES (Downtown SM Transit Center) ---
  // 8. Honda Accord (Hub-owned, Sedan)
  {
    id: 'veh-8',
    name: 'Honda Accord Sport',
    brand: 'Honda',
    model: 'Sport 2.0T',
    type: 'Sedan',
    year: 2022,
    price: 55,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    rating: 4.65,
    reviewCount: 143,
    imageUrl: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&auto=format&fit=crop&q=80'
    ],
    deposit: 150,
    isAvailable: true,
    hubId: 'hub-2',
    coordinates: { lat: 34.0185, lng: -118.4900 },
    description: 'The standard-bearer for practical driving. Our Honda Accord Sport features a punchy turbocharged engine, spacious trunk, wireless Apple CarPlay, and Hondas complete Safety Sensing suite. High fuel economy makes it perfect for business travel and daily city runs.',
    ownerType: 'hub',
    ownerName: 'Downtown SM Transit Center',
    color: 'Sonic Gray Pearl',
    mileageLimit: '350 mi/day'
  },
  // 9. Mini Cooper (Hub-owned, Hatchback)
  {
    id: 'veh-9',
    name: 'Mini Cooper S',
    brand: 'Mini',
    model: 'S 2-Door Hatch',
    type: 'Hatchback',
    year: 2023,
    price: 68,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 4,
    rating: 4.76,
    reviewCount: 88,
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80'
    ],
    deposit: 200,
    isAvailable: true,
    hubId: 'hub-2',
    coordinates: { lat: 34.0185, lng: -118.4900 },
    description: 'Go-kart handling and iconic style in a compact package. This Mini Cooper S is equipped with a sport-tuned engine, custom driving modes, a glowing circular central display, and ambient interior lighting. Its small footprint makes parking in downtown LA a absolute breeze.',
    ownerType: 'hub',
    ownerName: 'Downtown SM Transit Center',
    color: 'British Racing Green',
    mileageLimit: '250 mi/day'
  },
  // 10. Tesla Model 3 (Hub-owned, EV)
  {
    id: 'veh-10',
    name: 'Tesla Model 3 Highland',
    brand: 'Tesla',
    model: 'Highland RWD',
    type: 'EV',
    year: 2024,
    price: 70,
    transmission: 'Automatic',
    fuelType: 'Electric',
    seats: 5,
    rating: 4.88,
    reviewCount: 15,
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80'
    ],
    deposit: 200,
    isAvailable: true,
    hubId: 'hub-2',
    coordinates: { lat: 34.0185, lng: -118.4900 },
    range: '272 mi',
    batteryCapacity: '60 kWh',
    description: 'Experience the newly refreshed 2024 Tesla Model 3 "Highland". Featuring an ultra-quiet cabin, ventilated seats, ambient LED strip lighting running across the dash, and a passenger touchscreen in the back. Available for instant booking at our Downtown Transit Hub.',
    ownerType: 'hub',
    ownerName: 'Downtown SM Transit Center',
    color: 'Ultra Red',
    mileageLimit: 'Unlimited'
  },

  // --- HUB 3 VEHICLES (Santa Monica Airport SMO) ---
  // 11. Audi e-tron GT (Hub-owned, Luxury)
  {
    id: 'veh-11',
    name: 'Audi e-tron GT',
    brand: 'Audi',
    model: 'quattro Premium Plus',
    type: 'Luxury',
    year: 2023,
    price: 210,
    transmission: 'Automatic',
    fuelType: 'Electric',
    seats: 5,
    rating: 4.91,
    reviewCount: 37,
    imageUrl: 'https://images.unsplash.com/photo-1617814076629-b6955dfcd9cf?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617814076629-b6955dfcd9cf?w=800&auto=format&fit=crop&q=80'
    ],
    deposit: 1000,
    isAvailable: true,
    hubId: 'hub-3',
    coordinates: { lat: 34.0150, lng: -118.4520 },
    range: '238 mi',
    batteryCapacity: '93.4 kWh',
    description: 'Luxury meets high performance electric mobility. The Audi e-tron GT is a high-speed touring sedan with dual electric motors producing 522 horsepower. Finished in Chronos Gray, it features dynamic rear wheel steering, Bang & Olufsen sound system, and premium valcona leather seats.',
    ownerType: 'hub',
    ownerName: 'Santa Monica Airport (SMO) Fleet',
    color: 'Chronos Gray Metallic',
    mileageLimit: '250 mi/day'
  },
  // 12. Chevrolet Tahoe (Hub-owned, SUV)
  {
    id: 'veh-12',
    name: 'Chevrolet Tahoe Z71',
    brand: 'Chevrolet',
    model: 'Z71 4WD 8-Passenger',
    type: 'SUV',
    year: 2023,
    price: 115,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 8,
    rating: 4.79,
    reviewCount: 63,
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80'
    ],
    deposit: 300,
    isAvailable: true,
    hubId: 'hub-3',
    coordinates: { lat: 34.0150, lng: -118.4520 },
    description: 'Need space for the whole family and all your luggage? This massive Chevrolet Tahoe Z71 fits up to 8 passengers in style and comfort. Equipped with high-clearance off-road bumpers, active four-wheel drive, dual rear seat entertainment screens, and a roof box rack system.',
    ownerType: 'hub',
    ownerName: 'Santa Monica Airport (SMO) Fleet',
    color: 'Summit White',
    mileageLimit: 'Unlimited'
  }
];

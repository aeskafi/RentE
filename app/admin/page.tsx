'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MOCK_VEHICLES, MOCK_HUBS } from '@/lib/mockData';
import { 
  Car, 
  Calendar, 
  MapPin, 
  BarChart3, 
  Receipt, 
  LayoutDashboard, 
  Plus, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Map, 
  Sun, 
  Moon,
  TrendingUp, 
  Users, 
  Gauge, 
  Zap, 
  DollarSign, 
  CheckCircle,
  Clock,
  Shield,
  User,
  Settings,
  LogOut,
  Check,
  Bell
} from 'lucide-react';

interface OrderTimeline {
  id: string;
  carName: string;
  plate: string;
  driver: string;
  color: string;
  startWeek: number;
  durationWeeks: number;
}

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: '1', text: 'Sarah Jenkins reserved Tesla Model Y', time: '5m ago', icon: '📅', unread: true },
    { id: '2', text: 'Andy checked out Toyota Avanza', time: '1h ago', icon: '🔑', unread: true },
    { id: '3', text: 'VEH-002 battery status is low (12%)', time: '2h ago', icon: '⚠️', unread: false }
  ]);

  // Listing additions simulation state
  const [vehicles, setVehicles] = useState(MOCK_VEHICLES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCarName, setNewCarName] = useState('');
  const [newCarBrand, setNewCarBrand] = useState('Tesla');
  const [newCarPrice, setNewCarPrice] = useState(80);

  // Seed timeline orders
  const [orders, setOrders] = useState<OrderTimeline[]>([
    { id: '1', carName: 'Toyota Avanza 1.5 A/T', plate: 'B 1234 ABC', driver: 'Andy', color: 'blue', startWeek: 1, durationWeeks: 1.5 },
    { id: '2', carName: 'Honda Brio 1.2 E/T', plate: 'B 5678 XYZ', driver: 'Solihin S.', color: 'gray', startWeek: 2, durationWeeks: 1 },
    { id: '3', carName: 'Tesla Model Y Long Range', plate: 'B 9012 EFG', driver: 'Rudi D.', color: 'blue', startWeek: 3, durationWeeks: 1.5 },
    { id: '4', carName: 'Volvo EX30 Ultra', plate: 'B 3456 QRS', driver: 'Sarah J.', color: 'blue', startWeek: 3, durationWeeks: 1.2 }
  ]);

  // Sidebar Menu Items
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Listing', icon: Car },
    { name: 'Calendar', icon: Calendar },
    { name: 'Tracking', icon: MapPin },
    { name: 'Statistics', icon: BarChart3 },
    { name: 'Transaction', icon: Receipt }
  ];

  // Initialize theme
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCarName.trim()) return;

    const newCar = {
      id: `new-${Date.now()}`,
      name: newCarName,
      brand: newCarBrand,
      model: 'Custom Package',
      type: 'Sedan' as const,
      year: 2024,
      price: newCarPrice,
      transmission: 'Automatic' as const,
      fuelType: 'Electric' as const,
      seats: 5,
      rating: 4.8,
      reviewCount: 1,
      imageUrl: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=500&auto=format&fit=crop&q=80',
      gallery: [],
      deposit: 200,
      isAvailable: true,
      hubId: null,
      coordinates: { lat: 34.0250, lng: -118.4960 },
      description: 'Custom vehicle added via operator desk.',
      ownerType: 'individual' as const,
      ownerName: 'Admin Host',
      color: 'Silver Metallic',
      mileageLimit: 'Unlimited'
    };

    setVehicles([newCar, ...vehicles]);
    setNewCarName('');
    setShowAddForm(false);
  };

  // --- SUBVIEW RENDERS ---

  // 1. DASHBOARD VIEW
  const renderDashboard = () => (
    <div className="flex-grow overflow-y-auto p-8 grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Left 2 Columns: Map & Calendar */}
      <div className="xl:col-span-2 space-y-8">
        {/* Tracking Map card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Map className="w-4.5 h-4.5 text-blue-600" />
                Live Map tracking
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">Click on Tracking menu for full view</p>
            </div>
            <button onClick={() => setActiveMenu('Tracking')} className="text-xs font-bold text-blue-600 hover:underline">
              Full View &rarr;
            </button>
          </div>

          <div className="relative h-72 w-full bg-slate-100 dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-850">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-45 dark:opacity-20 pointer-events-none"
              style={{ backgroundImage: "url('https://maps.wikimedia.org/osm-intl/13/34.012/-118.49.png')" }}
            />
            <div className="absolute top-1/2 left-1/3 z-10 flex items-center space-x-1.5 bg-blue-600 text-white px-2.5 py-1 rounded-full shadow-md border border-white font-extrabold">
              <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
              <span className="text-[10px]">0002</span>
            </div>
            <div className="absolute bottom-1/3 right-1/4 z-10 flex items-center space-x-1.5 bg-blue-600 text-white px-2.5 py-1 rounded-full shadow-md border border-white font-extrabold">
              <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
              <span className="text-[10px]">0003</span>
            </div>
          </div>
        </div>

        {/* Calendar schedule summary card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Calendar className="w-4.5 h-4.5 text-blue-600" />
                Schedule Calendar
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">Reservation schedule summary</p>
            </div>
            <button onClick={() => setActiveMenu('Calendar')} className="text-xs font-bold text-blue-600 hover:underline">
              Open Timeline &rarr;
            </button>
          </div>
          {renderCalendarSummaryGrid()}
        </div>
      </div>

      {/* Right Column: Mini Stats and Transactions */}
      <div className="space-y-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
          <h4 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Fleet Performance</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-850 dark:text-white">
                <span>Utilization Rate</span>
                <span>92.4%</span>
              </div>
              <p className="text-[10px] text-slate-450 mt-0.5">Target score 90% achieved</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-455 font-semibold">
                <span>Active: 11 cars</span>
                <span>Idle: 1 car</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '92.4%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Transactions block */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Recent Transactions</h4>
            <button onClick={() => setActiveMenu('Transaction')} className="text-[10px] font-bold text-blue-600 hover:underline">
              View All
            </button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-850">
            {orders.slice(0, 3).map((item) => (
              <div key={item.id} className="py-3 flex justify-between items-center text-xs">
                <div>
                  <h5 className="font-bold text-slate-905 dark:text-white">{item.carName}</h5>
                  <p className="text-[10px] text-slate-400 font-medium">Renter: {item.driver}</p>
                </div>
                <span className="font-bold text-slate-950 dark:text-white">$240.00</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // 2. LISTING VIEW
  const renderListing = () => {
    const searchFiltered = vehicles.filter(v => 
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="flex-grow overflow-y-auto p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">Fleet Listings</h2>
            <p className="text-xs text-slate-400 mt-1">Manage and register your system vehicles</p>
          </div>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Vehicle</span>
          </button>
        </div>

        {/* Simulate Add Vehicle Form */}
        {showAddForm && (
          <form onSubmit={handleAddVehicle} className="bg-slate-100 dark:bg-slate-950 border border-slate-205/10 rounded-2xl p-5 max-w-md space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-450">Add Custom Fleet Car</h3>
            
            <div className="space-y-1">
              <label className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Vehicle Model Name</label>
              <input 
                type="text" 
                placeholder="e.g. Model Y Performance" 
                value={newCarName}
                onChange={(e) => setNewCarName(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border text-xs font-bold p-2.5 rounded-lg focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Brand</label>
                <select 
                  value={newCarBrand}
                  onChange={(e) => setNewCarBrand(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border text-xs font-bold p-2.5 rounded-lg focus:outline-hidden"
                >
                  <option value="Tesla">Tesla</option>
                  <option value="Porsche">Porsche</option>
                  <option value="BMW">BMW</option>
                  <option value="Volvo">Volvo</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Price / Day ($)</label>
                <input 
                  type="number" 
                  value={newCarPrice}
                  onChange={(e) => setNewCarPrice(parseInt(e.target.value))}
                  className="w-full bg-white dark:bg-slate-900 border text-xs font-bold p-2.5 rounded-lg focus:outline-hidden"
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs">
              Confirm Add
            </button>
          </form>
        )}

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {searchFiltered.map((vehicle) => (
            <div key={vehicle.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-extrabold text-slate-950 dark:text-white text-sm group-hover:text-blue-600 transition-colors">
                      {vehicle.name}
                    </h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">{vehicle.brand}</p>
                  </div>
                  <span className="bg-blue-50 text-blue-600 dark:bg-blue-950/30 text-[9px] font-extrabold px-2.5 py-1 rounded-md uppercase">
                    {vehicle.type}
                  </span>
                </div>
                <div className="h-24 my-3 flex items-center justify-center">
                  <img src={vehicle.imageUrl} alt="" className="h-full object-contain filter drop-shadow-xs" />
                </div>
              </div>
              <div className="border-t border-slate-50 dark:border-slate-850 pt-3 flex justify-between items-center text-xs">
                <div>
                  <span className="font-black text-slate-900 dark:text-white">${vehicle.price}</span>
                  <span className="text-[9px] text-slate-400 font-bold">/day</span>
                </div>
                <span className="text-emerald-500 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Available
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 3. CALENDAR VIEW
  const renderCalendar = () => (
    <div className="flex-grow overflow-y-auto p-8 space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-950 dark:text-white">Active Timeline Calendar</h2>
        <p className="text-xs text-slate-400 mt-1">Detailed calendar logs and week indicators</p>
      </div>
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        {renderCalendarSummaryGrid()}
      </div>
    </div>
  );

  // HELPER: CALENDAR SUMMARY GRID
  const renderCalendarSummaryGrid = () => (
    <div className="overflow-x-auto border border-slate-100 dark:border-slate-850 rounded-2xl">
      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-955 text-[10px] text-slate-450 font-bold uppercase tracking-wider text-left border-b border-slate-100 dark:border-slate-850">
            <th className="p-4 w-44">CAR DETAILS</th>
            <th className="p-4 text-center border-l border-slate-100 dark:border-slate-850">WEEK 1</th>
            <th className="p-4 text-center border-l border-slate-100 dark:border-slate-850">WEEK 2</th>
            <th className="p-4 text-center border-l border-slate-100 dark:border-slate-850">WEEK 3</th>
            <th className="p-4 text-center border-l border-slate-100 dark:border-slate-850">WEEK 4</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-xs font-semibold">
          {orders.map((item) => (
            <tr key={item.id}>
              <td className="p-4">
                <div className="font-bold text-slate-850 dark:text-slate-100">{item.carName}</div>
                <div className="text-[9px] text-slate-400 font-mono">{item.plate}</div>
              </td>
              <td className="p-2 border-l border-slate-100 dark:border-slate-850" colSpan={4}>
                <div className="relative h-10 w-full flex items-center">
                  <div 
                    className="absolute bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-200/20 p-2 rounded-xl flex items-center space-x-2 font-bold text-[10px]"
                    style={{ 
                      left: `${(item.startWeek - 1) * 25}%`, 
                      width: `${item.durationWeeks * 25}%` 
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>{item.driver}</span>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // 4. TRACKING VIEW
  const renderTracking = () => (
    <div className="flex-grow overflow-y-auto p-8 space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-950 dark:text-white">Active Fleet Telemetry</h2>
        <p className="text-xs text-slate-400 mt-1">Live locations tracking and details drawer overview</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 relative h-[500px] w-full bg-slate-105 dark:bg-slate-950 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-850 shadow-sm">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-50 dark:opacity-20 pointer-events-none"
            style={{ backgroundImage: "url('https://maps.wikimedia.org/osm-intl/13/34.012/-118.49.png')" }}
          />
          <div className="absolute top-1/3 left-1/4 z-10 flex items-center space-x-1.5 bg-blue-600 text-white px-2.5 py-1 rounded-full shadow-md border border-white font-extrabold">
            <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
            <span className="text-[10px]">VEH-001</span>
          </div>
          <div className="absolute top-1/2 right-1/3 z-10 flex items-center space-x-1.5 bg-blue-600 text-white px-2.5 py-1 rounded-full shadow-md border border-white font-extrabold">
            <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
            <span className="text-[10px]">VEH-002</span>
          </div>
        </div>

        {/* Telemetry panel */}
        <div className="bg-slate-950 text-white rounded-3xl p-6 border border-slate-800 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="bg-blue-500/20 text-blue-400 text-[9px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                In Use
              </span>
              <h4 className="font-extrabold text-sm tracking-tight text-white mt-1.5">Tesla Model Y LR</h4>
              <p className="text-[10px] text-slate-500 font-mono tracking-wider">B 9012 EFG</p>
            </div>
            
            <div className="space-y-2 border-t border-slate-900 pt-4 text-xs text-slate-400">
              <div className="flex items-center justify-between">
                <span>Renter:</span>
                <span className="font-bold text-slate-200">Sarah Jenkins</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Range left:</span>
                <span className="font-bold text-blue-400">182 miles (62%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Speed:</span>
                <span className="font-bold text-slate-200">45 mph</span>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-900 pt-4 text-xs">
            <span className="text-[9px] text-slate-550 uppercase tracking-widest font-extrabold block mb-2">Logs</span>
            <p className="text-[10px] text-slate-500">Auto-ping received: SMO Runway Approach</p>
          </div>
        </div>
      </div>
    </div>
  );

  // 5. STATISTICS VIEW
  const renderStatistics = () => (
    <div className="flex-grow overflow-y-auto p-8 space-y-8">
      <div>
        <h2 className="text-xl font-black text-slate-950 dark:text-white">Earnings & Analytics Summary</h2>
        <p className="text-xs text-slate-400 mt-1">Visual reports and performance statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-slate-400 font-extrabold uppercase">Monthly Revenue</span>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl font-black text-slate-950 dark:text-white">$14,240.00</span>
          <p className="text-[10px] text-emerald-500 font-bold mt-1.5">+12.5% vs last month</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-slate-400 font-extrabold uppercase">Active Bookings</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl font-black text-slate-950 dark:text-white">38 orders</span>
          <p className="text-[10px] text-emerald-500 font-bold mt-1.5">+4.8% growth</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-2xs">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-slate-400 font-extrabold uppercase">Avg Rental Term</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl font-black text-slate-950 dark:text-white">3.4 Days</span>
          <p className="text-[10px] text-slate-450 font-bold mt-1.5">Stable retention score</p>
        </div>
      </div>

      {/* Popular category metrics */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Category Demand Shares</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>SUV / Crossovers</span>
              <span>45%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-950 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '45%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Electric Vehicles (EV)</span>
              <span>30%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-950 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '30%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Sedan & Hatchbacks</span>
              <span>25%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-950 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '25%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 6. TRANSACTION VIEW
  const renderTransactions = () => (
    <div className="flex-grow overflow-y-auto p-8 space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-950 dark:text-white">Transaction Logs</h2>
        <p className="text-xs text-slate-400 mt-1">Review active transaction statements and invoices</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-955 text-[10px] text-slate-450 font-bold uppercase tracking-wider text-left border-b border-slate-100 dark:border-slate-850">
              <th className="p-4">TRANSACTION ID</th>
              <th className="p-4">RENTER</th>
              <th className="p-4">VEHICLE</th>
              <th className="p-4">TOTAL PRICE</th>
              <th className="p-4">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-xs font-semibold">
            {orders.map((item) => (
              <tr key={item.id}>
                <td className="p-4 text-blue-600 dark:text-blue-450 font-bold">#TXN-9010{item.id}</td>
                <td className="p-4">{item.driver}</td>
                <td className="p-4">{item.carName}</td>
                <td className="p-4 font-extrabold text-slate-950 dark:text-white">$240.00</td>
                <td className="p-4">
                  <span className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 text-[9px] font-extrabold px-2.5 py-1 rounded-md uppercase">
                    Paid
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'Dashboard':
        return renderDashboard();
      case 'Listing':
        return renderListing();
      case 'Calendar':
        return renderCalendar();
      case 'Tracking':
        return renderTracking();
      case 'Statistics':
        return renderStatistics();
      case 'Transaction':
        return renderTransactions();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 flex font-sans">
      
      {/* ==========================================
          1. SIDEBAR NAVIGATION
          ========================================== */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col justify-between flex-shrink-0">
        <div className="p-6 space-y-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2 rounded-xl flex items-center justify-center shadow-xs">
              <Car className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-lg text-slate-955 dark:text-white">RentE.</span>
          </div>

          {/* New Order Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95 transition-all">
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Order</span>
          </button>

          {/* Profile Widget */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-slate-850 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden border border-slate-200">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="" />
              </div>
              <div className="min-w-0">
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white truncate">Agung Handoko</h4>
                <p className="text-[9px] text-slate-400 font-bold uppercase truncate">CV. Sejahtera Sewa</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <span className="text-[10px] text-slate-405 font-extrabold uppercase tracking-wider block px-3 mb-2.5">Main menu</span>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveMenu(item.name);
                    setSearchQuery('');
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold tracking-wide cursor-pointer transition-all ${
                    isActive
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white font-extrabold shadow-2xs'
                      : 'text-slate-400 hover:text-slate-655 dark:hover:text-slate-350'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 stroke-[2.5]' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Back Link */}
        <div className="p-6 border-t border-slate-50 dark:border-slate-850">
          <Link href="/cars" className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-350 font-bold flex items-center gap-1">
            &larr; Exit to Customer Portal
          </Link>
        </div>
      </aside>

      {/* ==========================================
          2. WORKSPACE CONTAINER
          ========================================== */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP BAR */}
        <header className="h-16 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 flex items-center justify-between flex-shrink-0 z-30">
          <div className="flex items-center space-x-3.5">
            <h1 className="font-extrabold text-base text-slate-950 dark:text-white">{activeMenu}</h1>
          </div>

          <div className="flex items-center space-x-4 relative">
            {/* Search bar */}
            <div className="relative w-64">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 bg-slate-50 dark:bg-slate-955 text-slate-800 dark:text-slate-100 text-xs font-semibold border border-slate-100 dark:border-slate-850 rounded-xl focus:outline-hidden"
              />
            </div>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-850 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-955 transition-all cursor-pointer active:scale-95"
              aria-label="Toggle dark/light mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="relative p-2.5 rounded-xl border border-slate-100 dark:border-slate-850 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-955 transition-all cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl shadow-xl z-50 p-4 space-y-3 text-slate-950 dark:text-white">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50 dark:border-slate-850">
                    <span className="font-extrabold text-xs">Notifications</span>
                    {notifications.some(n => n.unread) && (
                      <button 
                        onClick={() => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))} 
                        className="text-[10px] text-blue-600 font-bold hover:underline flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Mark all read
                      </button>
                    )}
                  </div>
                  <div className="divide-y divide-slate-50 dark:divide-slate-850 max-h-60 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="py-2.5 flex items-start space-x-2.5 text-xs text-slate-600 dark:text-slate-355">
                        <span className="text-base">{n.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`leading-relaxed ${n.unread ? 'font-bold text-slate-950 dark:text-white' : ''}`}>
                            {n.text}
                          </p>
                          <span className="text-[9px] text-slate-400 font-medium block mt-0.5">{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-150 cursor-pointer active:scale-95 transition-transform"
              >
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                  alt="" 
                  className="w-full h-full object-cover"
                />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl shadow-xl z-50 p-2.5 space-y-1 text-slate-955 dark:text-white">
                  <div className="px-3 py-2 border-b border-slate-50 dark:border-slate-850">
                    <h4 className="font-extrabold text-xs">Agung Handoko</h4>
                    <p className="text-[9px] text-slate-400 font-bold">agung@rente.com</p>
                  </div>

                  <div className="py-1">
                    <button 
                      onClick={() => {
                        setActiveMenu('Dashboard');
                        setShowProfileMenu(false);
                      }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-655 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all text-left"
                    >
                      <Shield className="w-3.5 h-3.5 text-blue-600" />
                      <span>Admin Panel</span>
                    </button>

                    <Link 
                      href="/cars" 
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-655 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all"
                    >
                      <User className="w-3.5 h-3.5 text-blue-600" />
                      <span>Customer Portal</span>
                    </Link>

                    <span className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-655 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all cursor-pointer">
                      <Settings className="w-3.5 h-3.5" />
                      <span>Settings</span>
                    </span>
                  </div>

                  <div className="border-t border-slate-50 dark:border-slate-850 pt-1.5">
                    <span className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all cursor-pointer">
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Dismiss overlay backdrop */}
        {(showNotifications || showProfileMenu) && (
          <div 
            className="fixed inset-0 z-20 bg-transparent" 
            onClick={() => {
              setShowNotifications(false);
              setShowProfileMenu(false);
            }}
          />
        )}

        {/* Dynamic content subview render */}
        {renderContent()}

      </main>

    </div>
  );
}

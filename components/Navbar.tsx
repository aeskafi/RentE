'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car, Sun, Moon, Bell, Shield, User, Settings, LogOut, Check } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: '1', text: 'Sarah Jenkins reserved Tesla Model Y', time: '5m ago', icon: '📅', unread: true },
    { id: '2', text: 'Andy checked out Toyota Avanza', time: '1h ago', icon: '🔑', unread: true },
    { id: '3', text: 'VEH-002 battery status is low (12%)', time: '2h ago', icon: '⚠️', unread: false }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Initialize theme from HTML class
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

  const navLinks = [
    { name: 'Become a renter', href: '/' },
    { name: 'Rental deals', href: '/cars' },
    { name: 'Map Discovery', href: '/map' },
    { name: 'Admin Dashboard', href: '/admin' }
  ];

  return (
    <>
      <header className="sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-40 transition-colors duration-300">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="bg-blue-600 text-white p-2 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
            <Car className="w-5 h-5 stroke-[2]" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-950 dark:text-white transition-colors duration-200">
            RentE<span className="text-blue-600">.</span>
          </span>
        </Link>

        {/* Shared Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-bold text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`hover:text-blue-600 transition-colors ${
                  isActive ? 'text-blue-600 dark:text-blue-400 font-extrabold' : ''
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Control Widgets */}
        <div className="flex items-center space-x-4 relative">
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-950 transition-all cursor-pointer active:scale-95"
            aria-label="Toggle dark/light mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Notification Bell with Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="relative p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-950 transition-all cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl shadow-xl z-50 p-4 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-50 dark:border-slate-850">
                  <span className="font-extrabold text-xs text-slate-900 dark:text-white">Notifications</span>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllRead} 
                      className="text-[10px] text-blue-600 font-bold hover:underline flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Mark all read
                    </button>
                  )}
                </div>
                <div className="divide-y divide-slate-50 dark:divide-slate-850 max-h-60 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className="py-2.5 flex items-start space-x-2.5 text-xs text-slate-600 dark:text-slate-350">
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

          {/* User Profile Dropdown */}
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
                alt="User profile avatar" 
                className="w-full h-full object-cover"
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl shadow-xl z-50 p-2.5 space-y-1">
                <div className="px-3 py-2 border-b border-slate-50 dark:border-slate-850">
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white truncate">Agung Handoko</h4>
                  <p className="text-[9px] text-slate-400 font-bold truncate">agung@rente.com</p>
                </div>

                <div className="py-1">
                  <Link 
                    href="/admin" 
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-655 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all"
                  >
                    <Shield className="w-3.5 h-3.5 text-blue-600" />
                    <span>Admin Panel</span>
                  </Link>

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
          className="fixed inset-0 z-30 bg-transparent" 
          onClick={() => {
            setShowNotifications(false);
            setShowProfileMenu(false);
          }}
        />
      )}
    </>
  );
}

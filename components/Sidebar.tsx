'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Home, Map as MapIcon, Truck, Settings, Menu, X } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const navItems = [
    { href: '/', icon: Home, label: 'Dashboard' },
    { href: '/map', icon: MapIcon, label: 'Live Map' },
    { href: '/dispatch', icon: Truck, label: 'Dispatch Routes' },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-gray-900 text-white flex items-center justify-between px-4 z-50">
        <h1 className="text-xl font-bold text-green-400">EcoRoute</h1>
        <button onClick={toggleSidebar} className="p-2 text-gray-300 hover:text-white">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Content */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-gray-900 text-white min-h-screen flex flex-col
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 hidden md:block">
          <h1 className="text-2xl font-bold text-green-400">EcoRoute</h1>
          <p className="text-gray-400 text-sm mt-1">Dispatch Engine MVP</p>
        </div>
        
        {/* Mobile Spacer */}
        <div className="h-16 md:hidden"></div>

        <nav className="flex-1 mt-6">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    onClick={closeSidebar}
                    className={`flex items-center px-6 py-3 transition-colors ${
                      isActive 
                        ? 'bg-green-600/10 text-green-400 border-r-4 border-green-500' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-6 border-t border-gray-800">
          <button className="flex items-center text-gray-400 hover:text-white transition-colors w-full">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </button>
        </div>
      </div>
    </>
  );
}

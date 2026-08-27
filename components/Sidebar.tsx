'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Home, Map as MapIcon, Truck, Settings, Menu, X, Archive } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const navItems = [
    { href: '/', icon: Home, label: 'Overview' },
    { href: '/bins', icon: Archive, label: 'Bin Directory' },
    { href: '/map', icon: MapIcon, label: 'Live Map' },
    { href: '/dispatch', icon: Truck, label: 'Dispatch' },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 text-gray-900 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center text-white">
            <MapIcon className="w-4 h-4" />
          </div>
          <h1 className="text-lg font-semibold">EcoRoute</h1>
        </div>
        <button onClick={toggleSidebar} className="p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100">
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/40 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Content */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-5 hidden md:flex items-center gap-3 border-b border-gray-100">
          <div className="w-7 h-7 bg-green-600 rounded flex items-center justify-center text-white">
            <MapIcon className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 leading-tight">EcoRoute</h1>
            <p className="text-gray-500 text-xs">Admin Console</p>
          </div>
        </div>
        
        {/* Mobile Spacer */}
        <div className="h-14 md:hidden border-b border-gray-100 flex items-center px-4">
           <span className="text-xs font-medium text-gray-400 uppercase">Navigation</span>
        </div>

        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    onClick={closeSidebar}
                    className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive 
                        ? 'bg-gray-100 text-gray-900 font-medium' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 mr-3 ${isActive ? 'text-gray-900' : 'text-gray-400'}`} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-3 border-t border-gray-100">
          <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors w-full rounded-md hover:bg-gray-50">
            <Settings className="w-4 h-4 mr-3 text-gray-400" />
            Settings
          </button>
        </div>
      </div>
    </>
  );
}

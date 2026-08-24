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
    { href: '/', icon: Home, label: 'Dashboard Overview' },
    { href: '/map', icon: MapIcon, label: 'Infrastructure Map' },
    { href: '/dispatch', icon: Truck, label: 'Dispatch Engine' },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 text-white flex items-center justify-between px-5 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <MapIcon className="w-5 h-5 text-slate-900" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100">EcoRoute</h1>
        </div>
        <button onClick={toggleSidebar} className="p-2 -mr-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-800">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Content */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50
        w-72 bg-slate-900 text-slate-300 min-h-screen flex flex-col border-r border-slate-800
        transform transition-all duration-300 ease-in-out shadow-2xl md:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 hidden md:flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <MapIcon className="w-6 h-6 text-slate-900" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">EcoRoute</h1>
            <p className="text-emerald-400 text-xs font-semibold tracking-wider uppercase mt-0.5">Admin Portal</p>
          </div>
        </div>
        
        {/* Mobile Spacer */}
        <div className="h-16 md:hidden border-b border-slate-800 flex items-center px-6">
           <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Menu</span>
        </div>

        <nav className="flex-1 mt-6 px-4">
          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    onClick={closeSidebar}
                    className={`flex items-center px-4 py-3.5 rounded-xl font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100 hover:scale-[1.02]'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 m-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <button className="flex items-center justify-between text-slate-300 hover:text-white transition-colors w-full group">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center mr-3 group-hover:bg-slate-600 transition-colors">
                <Settings className="w-4 h-4" />
              </div>
              <span className="font-medium text-sm">System Settings</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

import Link from 'next/link';
import { Home, Map as MapIcon, Truck, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-green-400">EcoRoute</h1>
        <p className="text-gray-400 text-sm mt-1">Dispatch Engine MVP</p>
      </div>
      
      <nav className="flex-1 mt-6">
        <ul className="space-y-2">
          <li>
            <Link href="/" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/map" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
              <MapIcon className="w-5 h-5 mr-3" />
              Live Map
            </Link>
          </li>
          <li>
            <Link href="/dispatch" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
              <Truck className="w-5 h-5 mr-3" />
              Dispatch Routes
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-6 border-t border-gray-800">
        <button className="flex items-center text-gray-400 hover:text-white transition-colors w-full">
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </button>
      </div>
    </div>
  );
}

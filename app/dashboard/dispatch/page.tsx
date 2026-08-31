'use client';

import { useState, useEffect } from 'react';
import { initialBins } from '@/lib/mockData';
import { MapPin, Truck as TruckIcon, Zap } from 'lucide-react';

export default function DispatchPage() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [routeGenerated, setRouteGenerated] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem('ecoroute_role') || 'user');
  }, []);

  if (role === 'user') {
    return (
      <div className="p-8 text-center text-gray-500">
        You do not have permission to view the Dispatch Control panel.
      </div>
    );
  }

  const fullBins = initialBins.filter(b => b.status === 'full');
  const organicTargets = fullBins.filter(b => b.type === 'organic');
  const inorganicTargets = fullBins.filter(b => b.type === 'inorganic');

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setRouteGenerated(true);
    }, 1500); // simulate API call
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Dispatch Engine</h1>
          <p className="text-sm text-gray-500 mt-1">Generate optimized collection routes for active trucks.</p>
        </div>
        <button 
          onClick={handleOptimize}
          disabled={isOptimizing || routeGenerated}
          className="w-full md:w-auto flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm shadow-sm disabled:opacity-50"
        >
          {isOptimizing ? 'Calculating Routes...' : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Generate Optimized Routes
            </>
          )}
        </button>
      </div>

      {routeGenerated && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 flex items-start">
          <Zap className="w-5 h-5 text-green-600 mt-0.5 mr-3 shrink-0" />
          <div>
            <h3 className="font-semibold text-green-900 text-sm">Routes Optimized Successfully</h3>
            <p className="text-green-800 text-sm mt-1">Trucks have been dispatched via the Driver App. Estimated fuel savings: 18%.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Organic Route */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <h2 className="text-base font-semibold text-gray-900 flex items-center">
              <TruckIcon className="w-5 h-5 text-green-600 mr-2" />
              Organic Route
            </h2>
            <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-md">TRK-01</span>
          </div>
          
          <div className="p-6">
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-3.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
              {organicTargets.map((bin, index) => (
                <div key={bin.id} className="relative flex items-start">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white border-2 border-green-500 text-green-700 text-xs font-bold shrink-0 z-10 mt-1">
                    {index + 1}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-900 text-sm">{bin.id}</div>
                      <div className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded">100% Full</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      {bin.lat.toFixed(4)}, {bin.lng.toFixed(4)}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Final Destination */}
              {routeGenerated && (
                <div className="relative flex items-start mt-6">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white border-2 border-gray-400 text-gray-500 shrink-0 z-10 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="font-medium text-gray-900 text-sm">Biogas Plant</div>
                    <div className="text-xs text-gray-500 mt-1">Dropoff & Processing</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Inorganic Route */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <h2 className="text-base font-semibold text-gray-900 flex items-center">
              <TruckIcon className="w-5 h-5 text-blue-600 mr-2" />
              Inorganic Route
            </h2>
            <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-md">TRK-02</span>
          </div>
          
          <div className="p-6">
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-3.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
              {inorganicTargets.map((bin, index) => (
                <div key={bin.id} className="relative flex items-start">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white border-2 border-blue-500 text-blue-700 text-xs font-bold shrink-0 z-10 mt-1">
                    {index + 1}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-900 text-sm">{bin.id}</div>
                      <div className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded">100% Full</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      {bin.lat.toFixed(4)}, {bin.lng.toFixed(4)}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Final Destination */}
              {routeGenerated && (
                <div className="relative flex items-start mt-6">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white border-2 border-gray-400 text-gray-500 shrink-0 z-10 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="font-medium text-gray-900 text-sm">Materials Recycling Hub</div>
                    <div className="text-xs text-gray-500 mt-1">Sorting & Baling</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

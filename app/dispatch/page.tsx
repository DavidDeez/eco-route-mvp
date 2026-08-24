'use client';

import { useState } from 'react';
import { initialBins } from '@/lib/mockData';
import { MapPin, Truck as TruckIcon, Zap } from 'lucide-react';

export default function DispatchPage() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [routeGenerated, setRouteGenerated] = useState(false);

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
    <div className="p-8">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dispatch Engine</h1>
          <p className="text-gray-500 mt-2">Generate optimized collection routes for active trucks.</p>
        </div>
        <button 
          onClick={handleOptimize}
          disabled={isOptimizing || routeGenerated}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {isOptimizing ? 'Calculating Routes...' : (
            <>
              <Zap className="w-5 h-5 mr-2" />
              Generate Optimized Routes
            </>
          )}
        </button>
      </div>

      {routeGenerated && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 flex items-start">
          <Zap className="w-6 h-6 text-green-600 mt-1 mr-4" />
          <div>
            <h3 className="font-bold text-green-900 text-lg">Routes Optimized Successfully</h3>
            <p className="text-green-800 mt-1">Trucks have been dispatched via the Driver App. Estimated fuel savings: 18%.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Organic Route */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <TruckIcon className="w-6 h-6 text-green-600 mr-2" />
              Organic Collection Route
            </h2>
            <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">Truck TRK-01</span>
          </div>
          
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {organicTargets.map((bin, index) => (
              <div key={bin.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  {index + 1}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-gray-200 shadow">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-gray-900">{bin.id}</div>
                    <div className="text-xs font-medium text-red-500">100% Full</div>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Lat: {bin.lat.toFixed(4)}, Lng: {bin.lng.toFixed(4)}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Final Destination */}
            {routeGenerated && (
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mt-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-yellow-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-yellow-50 p-4 rounded border border-yellow-200 shadow">
                  <div className="font-bold text-yellow-900">Biogas Plant</div>
                  <div className="text-sm text-yellow-700 mt-1">Dropoff & Processing</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Inorganic Route */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <TruckIcon className="w-6 h-6 text-blue-600 mr-2" />
              Inorganic Collection Route
            </h2>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">Truck TRK-02</span>
          </div>
          
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {inorganicTargets.map((bin, index) => (
               <div key={bin.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
               <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                 {index + 1}
               </div>
               <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-gray-200 shadow">
                 <div className="flex items-center justify-between mb-1">
                   <div className="font-bold text-gray-900">{bin.id}</div>
                   <div className="text-xs font-medium text-red-500">100% Full</div>
                 </div>
                 <div className="text-sm text-gray-500 flex items-center">
                   <MapPin className="w-4 h-4 mr-1" />
                   Lat: {bin.lat.toFixed(4)}, Lng: {bin.lng.toFixed(4)}
                 </div>
               </div>
             </div>
            ))}

            {/* Final Destination */}
            {routeGenerated && (
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mt-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-purple-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-purple-50 p-4 rounded border border-purple-200 shadow">
                  <div className="font-bold text-purple-900">Materials Recycling Hub</div>
                  <div className="text-sm text-purple-700 mt-1">Sorting & Baling</div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

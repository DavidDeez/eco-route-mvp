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
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Dispatch Engine</h1>
          <p className="text-sm md:text-base text-slate-500 mt-2 font-medium">Generate optimized collection routes for active trucks.</p>
        </div>
        <button 
          onClick={handleOptimize}
          disabled={isOptimizing || routeGenerated}
          className="w-full md:w-auto flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md shadow-slate-900/10 disabled:opacity-50 active:scale-95"
        >
          {isOptimizing ? 'Calculating Routes...' : (
            <>
              <Zap className="w-5 h-5 mr-2 text-emerald-400" />
              Generate Optimized Routes
            </>
          )}
        </button>
      </div>

      {routeGenerated && (
        <div className="bg-emerald-50 border border-emerald-200/60 rounded-2xl p-6 mb-8 flex items-start shadow-sm">
          <Zap className="w-6 h-6 text-emerald-500 mt-0.5 mr-4" />
          <div>
            <h3 className="font-bold text-emerald-900 text-lg tracking-tight">Routes Optimized Successfully</h3>
            <p className="text-emerald-800 mt-1 font-medium">Trucks have been dispatched via the Driver App. Estimated fuel savings: <span className="font-bold">18%</span>.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Organic Route */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-6 md:p-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center tracking-tight">
              <TruckIcon className="w-6 h-6 text-emerald-500 mr-3" />
              Organic Route
            </h2>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-extrabold tracking-wider px-3 py-1 rounded-full uppercase">TRK-01</span>
          </div>
          
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {organicTargets.map((bin, index) => (
              <div key={bin.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-emerald-500 text-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 font-bold z-10">
                  {index + 1}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-2xl border border-slate-200/60 shadow-sm group-hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="font-bold text-slate-900">{bin.id}</div>
                    <div className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">100% Full</div>
                  </div>
                  <div className="text-sm text-slate-500 font-medium flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                    {bin.lat.toFixed(4)}, {bin.lng.toFixed(4)}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Final Destination */}
            {routeGenerated && (
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mt-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-amber-400 text-amber-900 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-amber-50 p-4 rounded-2xl border border-amber-200 shadow-sm">
                  <div className="font-bold text-amber-900">Biogas Plant</div>
                  <div className="text-sm text-amber-700 font-medium mt-1 flex items-center">
                    Dropoff & Processing
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Inorganic Route */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-6 md:p-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center tracking-tight">
              <TruckIcon className="w-6 h-6 text-blue-500 mr-3" />
              Inorganic Route
            </h2>
            <span className="bg-blue-100 text-blue-700 text-xs font-extrabold tracking-wider px-3 py-1 rounded-full uppercase">TRK-02</span>
          </div>
          
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {inorganicTargets.map((bin, index) => (
               <div key={bin.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
               <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-500 text-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 font-bold z-10">
                 {index + 1}
               </div>
               <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-2xl border border-slate-200/60 shadow-sm group-hover:shadow-md transition-shadow">
                 <div className="flex items-center justify-between mb-1.5">
                   <div className="font-bold text-slate-900">{bin.id}</div>
                   <div className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">100% Full</div>
                 </div>
                 <div className="text-sm text-slate-500 font-medium flex items-center">
                   <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                   {bin.lat.toFixed(4)}, {bin.lng.toFixed(4)}
                 </div>
               </div>
             </div>
            ))}

            {/* Final Destination */}
            {routeGenerated && (
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mt-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-purple-500 text-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-purple-50 p-4 rounded-2xl border border-purple-200/80 shadow-sm">
                  <div className="font-bold text-purple-900">Materials Recycling Hub</div>
                  <div className="text-sm text-purple-700 font-medium mt-1">Sorting & Baling</div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

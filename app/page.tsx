'use client';

import { useState } from 'react';
import MetricsCard from '@/components/MetricsCard';
import { initialBins, initialTrucks } from '@/lib/mockData';
import { Trash2, Recycle, Truck as TruckIcon, AlertTriangle, Activity } from 'lucide-react';

export default function Dashboard() {
  const [bins, setBins] = useState(initialBins);

  const totalBins = bins.length;
  const fullBins = bins.filter(b => b.status === 'full').length;
  const organicFull = bins.filter(b => b.status === 'full' && b.type === 'organic').length;
  const inorganicFull = bins.filter(b => b.status === 'full' && b.type === 'inorganic').length;
  const activeTrucks = initialTrucks.filter(t => t.status !== 'idle').length;

  const handleSimulateTrigger = () => {
    // Find a bin that isn't full and make it full
    const nonFullBins = bins.filter(b => b.status !== 'full');
    if (nonFullBins.length === 0) return;
    
    const randomBin = nonFullBins[Math.floor(Math.random() * nonFullBins.length)];
    const updatedBins = bins.map(b => 
      b.id === randomBin.id ? { ...b, status: 'full' as const, lastUpdated: new Date().toISOString() } : b
    );
    setBins(updatedBins);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time waste aggregation and logistics</p>
        </div>
        <button 
          onClick={handleSimulateTrigger}
          className="w-full md:w-auto flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm shadow-sm"
        >
          <Activity className="w-4 h-4 mr-2" />
          Simulate Trigger (IoT)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricsCard 
          title="Total Bins Monitored" 
          value={totalBins} 
          icon={<Trash2 className="w-5 h-5" />}
          trend="12%"
          trendUp={true}
        />
        <MetricsCard 
          title="Full Bins (Urgent)" 
          value={fullBins} 
          icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
          trend="3"
          trendUp={false}
        />
        <MetricsCard 
          title="Organic / Inorganic" 
          value={`${organicFull} / ${inorganicFull}`} 
          icon={<Recycle className="w-5 h-5 text-blue-500" />}
        />
        <MetricsCard 
          title="Active Trucks" 
          value={activeTrucks} 
          icon={<TruckIcon className="w-5 h-5 text-yellow-500" />}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Triggers</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {bins.filter(b => b.status === 'full').sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()).map(bin => (
            <div key={bin.id} className="flex flex-col sm:flex-row sm:items-center p-4 hover:bg-gray-50 transition-colors gap-4">
              <div className="flex-1 flex items-start gap-3">
                <div className={`mt-0.5 w-2 h-2 rounded-full ${bin.type === 'organic' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{bin.id} reached 100% capacity</p>
                  <p className="text-xs text-gray-500 capitalize mt-0.5">
                    {bin.type} stream • {new Date(bin.lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                Requires Pickup
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

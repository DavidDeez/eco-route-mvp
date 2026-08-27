'use client';

import { useState } from 'react';
import MetricsCard from '@/components/MetricsCard';
import { initialBins, initialTrucks } from '@/lib/mockData';
import { Trash2, Recycle, Truck as TruckIcon, AlertTriangle, Activity } from 'lucide-react';

export default function Dashboard() {
  const [bins, setBins] = useState(initialBins);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const totalBins = bins.length;
  const fullBins = bins.filter(b => b.status === 'full').length;
  const organicFull = bins.filter(b => b.status === 'full' && b.type === 'organic').length;
  const inorganicFull = bins.filter(b => b.status === 'full' && b.type === 'inorganic').length;
  const activeTrucks = initialTrucks.filter(t => t.status !== 'idle').length;

  const handleSimulateTrigger = () => {
    const nonFullBins = bins.filter(b => b.status !== 'full');
    if (nonFullBins.length === 0) return;
    
    const randomBin = nonFullBins[Math.floor(Math.random() * nonFullBins.length)];
    const updatedBins = bins.map(b => 
      b.id === randomBin.id ? { ...b, status: 'full' as const, lastUpdated: new Date().toISOString() } : b
    );
    setBins(updatedBins);
    
    setToastMessage(`IoT Sensor Triggered: ${randomBin.id} is now FULL`);
    setTimeout(() => setToastMessage(null), 3000);
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Analytics Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Collection Volume (Last 7 Days)</h2>
            <select className="text-sm border-none bg-gray-50 rounded-md px-2 py-1 text-gray-600 outline-none">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 px-1 sm:px-4">
            {[45, 60, 35, 75, 55, 90, 85].map((height, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group relative">
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap z-10 pointer-events-none">
                  {height * 12} kg
                </div>
                {/* Bar */}
                <div 
                   className="w-full bg-green-500 rounded-t-sm hover:bg-green-400 transition-colors animate-fade-in" 
                   style={{ height: `${height}%`, animationDelay: `${i * 100}ms` }}
                ></div>
                {/* Label */}
                <span className="text-xs text-gray-400 font-medium">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Triggers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[400px]">
          <div className="px-6 py-4 border-b border-gray-200 shrink-0 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Live Triggers</h2>
          </div>
          <div className="divide-y divide-gray-100 overflow-y-auto flex-1">
            {bins.filter(b => b.status === 'full').sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()).map(bin => (
              <div key={bin.id} className="flex flex-col sm:flex-row sm:items-center p-4 hover:bg-gray-50 transition-colors gap-3 animate-fade-in">
                <div className="flex-1 flex items-start gap-3">
                  <div className={`mt-1 w-2 h-2 shrink-0 rounded-full ${bin.type === 'organic' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 leading-tight">{bin.id} <span className="font-normal text-gray-500">at 100% capacity</span></p>
                    <p className="text-xs text-gray-500 capitalize mt-1">
                      {new Date(bin.lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-50 text-red-700 border border-red-100">
                  Requires Pickup
                </span>
              </div>
            ))}
            
            {bins.filter(b => b.status === 'full').length === 0 && (
              <div className="p-8 text-center text-gray-500 text-sm">
                No active triggers.<br/>All bins are operating normally.
              </div>
            )}
          </div>
        </div>
        
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 md:top-4 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-fade-in z-50">
          <Activity className="w-5 h-5 text-green-400" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

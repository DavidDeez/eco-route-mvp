'use client';

import { useState, useEffect } from 'react';
import MetricsCard from '@/components/MetricsCard';
import { initialBins, initialTrucks } from '@/lib/mockData';
import { Trash2, Recycle, Truck as TruckIcon, AlertTriangle, Activity, MapPin, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const [bins, setBins] = useState(initialBins);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem('ecoroute_role') || 'user');
  }, []);

  if (role === 'user') {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Driver Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back. Here is your shift summary for today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Active Route Widget */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Route</p>
                <h3 className="text-xl font-bold text-gray-900 mt-1">Lagos Mainland (Zone B)</h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 text-green-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> In Progress
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">Est. completion: 4:30 PM</span>
            </div>
          </div>

          {/* Progress Widget */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Collection Progress</p>
                <h3 className="text-xl font-bold text-gray-900 mt-1">12 / 24 Bins</h3>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>

          {/* Vehicle Status Widget */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Vehicle Status</p>
                <h3 className="text-xl font-bold text-gray-900 mt-1">TRK-104 (Optimal)</h3>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                <TruckIcon className="w-5 h-5 text-gray-600" />
              </div>
            </div>
            <div className="mt-4 flex gap-6 text-sm">
              <div>
                <span className="block text-gray-500 text-xs mb-0.5">Fuel Level</span>
                <span className="font-medium text-gray-900">78%</span>
              </div>
              <div>
                <span className="block text-gray-500 text-xs mb-0.5">Payload</span>
                <span className="font-medium text-gray-900">45% Full</span>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Pickups */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Next Priority Pickups</h2>
            <span className="text-xs font-medium bg-red-100 text-red-700 px-2.5 py-1 rounded-full">Urgent</span>
          </div>
          <div className="divide-y divide-gray-100">
            {bins.filter(b => b.status === 'full').slice(0, 3).map((bin, idx) => (
              <div key={bin.id} className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 transition-colors gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-base">{bin.address}</h4>
                    <p className="text-sm text-gray-500 mt-1">{bin.id} • <span className="capitalize">{bin.type}</span> Waste</p>
                  </div>
                </div>
                <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Navigate
                </button>
              </div>
            ))}
            {bins.filter(b => b.status === 'full').length === 0 && (
              <div className="p-8 text-center text-gray-500 text-sm">
                No priority pickups at the moment. You are caught up!
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

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
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Collection Volume (Last 7 Days)</h2>
            <select className="text-sm border border-gray-200 bg-white shadow-sm rounded-md px-3 py-1.5 text-gray-700 outline-none hover:bg-gray-50 cursor-pointer">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          
          {/* Legend */}
          <div className="flex gap-4 mb-8 text-sm">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-green-600 to-green-400"></div>
              <span className="text-gray-500 font-medium">Organic</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-blue-600 to-blue-400"></div>
              <span className="text-gray-500 font-medium">Inorganic</span>
            </div>
          </div>

          {/* Chart Area */}
          <div className="relative h-56 w-full mt-auto">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between border-b border-gray-200 pb-6 pointer-events-none">
              <div className="w-full border-t border-gray-100 border-dashed"></div>
              <div className="w-full border-t border-gray-100 border-dashed"></div>
              <div className="w-full border-t border-gray-100 border-dashed"></div>
              <div className="w-full border-t border-gray-100 border-dashed"></div>
            </div>

            {/* Bars */}
            <div className="absolute inset-0 flex items-end justify-between gap-3 sm:gap-6 px-2 sm:px-6 pb-6">
              {[
                { day: 'Mon', organic: 45, inorganic: 20 },
                { day: 'Tue', organic: 35, inorganic: 30 },
                { day: 'Wed', organic: 50, inorganic: 15 },
                { day: 'Thu', organic: 45, inorganic: 25 },
                { day: 'Fri', organic: 60, inorganic: 35 },
                { day: 'Sat', organic: 30, inorganic: 15 },
                { day: 'Sun', organic: 20, inorganic: 10 }
              ].map((data, i) => (
                <div key={i} className="w-full h-full flex flex-col justify-end items-center group relative z-10 cursor-pointer">
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-14 bg-gray-900 text-white text-xs p-2.5 rounded-lg shadow-xl transition-all duration-200 whitespace-nowrap z-20 pointer-events-none transform translate-y-2 group-hover:translate-y-0">
                    <p className="font-semibold mb-1 pb-1 border-b border-gray-700">{data.day} Total: {(data.organic + data.inorganic) * 12} kg</p>
                    <p className="text-green-400">Organic: {data.organic * 12} kg</p>
                    <p className="text-blue-400">Inorganic: {data.inorganic * 12} kg</p>
                  </div>
                  
                  {/* Bar Container */}
                  <div className="w-full max-w-[40px] flex flex-col justify-end h-full group-hover:opacity-80 transition-opacity">
                    {/* Inorganic Bar (Top) */}
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md animate-fade-in border-b border-white/20 shadow-sm" 
                      style={{ height: `${data.inorganic}%`, animationDelay: `${i * 50}ms` }}
                    ></div>
                    {/* Organic Bar (Bottom) */}
                    <div 
                      className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-b-sm animate-fade-in shadow-sm" 
                      style={{ height: `${data.organic}%`, animationDelay: `${i * 50}ms` }}
                    ></div>
                  </div>
                  
                  {/* Label */}
                  <span className="absolute -bottom-6 text-xs text-gray-500 font-medium group-hover:text-gray-900 transition-colors">{data.day}</span>
                </div>
              ))}
            </div>
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

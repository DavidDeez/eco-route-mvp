import MetricsCard from '@/components/MetricsCard';
import { initialBins, initialTrucks } from '@/lib/mockData';
import { Trash2, Recycle, Truck as TruckIcon, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const totalBins = initialBins.length;
  const fullBins = initialBins.filter(b => b.status === 'full').length;
  const organicFull = initialBins.filter(b => b.status === 'full' && b.type === 'organic').length;
  const inorganicFull = initialBins.filter(b => b.status === 'full' && b.type === 'inorganic').length;
  const activeTrucks = initialTrucks.filter(t => t.status !== 'idle').length;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-sm md:text-base text-slate-500 mt-2 font-medium">Real-time waste aggregation and logistics</p>
        </div>
        <button className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md shadow-slate-900/10 active:scale-95">
          Simulate Trigger (IoT/USSD)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <MetricsCard 
          title="Total Bins Monitored" 
          value={totalBins} 
          icon={<Trash2 className="w-6 h-6" />}
          trend="12%"
          trendUp={true}
        />
        <MetricsCard 
          title="Full Bins (Urgent)" 
          value={fullBins} 
          icon={<AlertTriangle className="w-6 h-6 text-rose-500" />}
          trend="3"
          trendUp={false}
        />
        <MetricsCard 
          title="Organic / Inorganic" 
          value={`${organicFull} / ${inorganicFull}`} 
          icon={<Recycle className="w-6 h-6 text-blue-500" />}
        />
        <MetricsCard 
          title="Active Trucks" 
          value={activeTrucks} 
          icon={<TruckIcon className="w-6 h-6 text-amber-500" />}
        />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
          <div className="w-2 h-6 bg-emerald-500 rounded-full mr-3"></div>
          Recent Triggers
        </h2>
        <div className="space-y-4">
          {initialBins.filter(b => b.status === 'full').map(bin => (
            <div key={bin.id} className="flex flex-col sm:flex-row sm:items-center p-5 bg-slate-50 hover:bg-slate-100 transition-colors rounded-2xl border border-slate-200/60 gap-4">
              <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${bin.type === 'organic' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-lg">{bin.id} reached 100% capacity</p>
                <p className="text-sm text-slate-500 font-medium capitalize mt-1">
                  <span className={bin.type === 'organic' ? 'text-emerald-600' : 'text-blue-600'}>{bin.type} stream</span> • {new Date(bin.lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
              <span className="inline-flex items-center justify-center px-4 py-1.5 bg-rose-50 border border-rose-200 text-rose-700 text-sm font-bold rounded-full">
                Requires Pickup
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

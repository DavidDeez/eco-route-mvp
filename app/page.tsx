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
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-2">Real-time waste aggregation and logistics</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Simulate Trigger (IoT/USSD)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          icon={<AlertTriangle className="w-6 h-6 text-red-500" />}
          trend="3"
          trendUp={false}
        />
        <MetricsCard 
          title="Organic vs Inorganic (Full)" 
          value={`${organicFull} / ${inorganicFull}`} 
          icon={<Recycle className="w-6 h-6 text-blue-500" />}
        />
        <MetricsCard 
          title="Active Trucks" 
          value={activeTrucks} 
          icon={<TruckIcon className="w-6 h-6 text-yellow-500" />}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Triggers</h2>
        <div className="space-y-4">
          {initialBins.filter(b => b.status === 'full').map(bin => (
            <div key={bin.id} className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className={`w-3 h-3 rounded-full mr-4 ${bin.type === 'organic' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{bin.id} reached 100% capacity</p>
                <p className="text-sm text-gray-500 capitalize">{bin.type} stream • {new Date(bin.lastUpdated).toLocaleTimeString()}</p>
              </div>
              <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">Requires Pickup</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

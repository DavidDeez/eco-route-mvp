import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">Loading Map...</div>
});

export default function MapPage() {
  return (
    <div className="p-8 h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Live Infrastructure Map</h1>
        <p className="text-gray-500 mt-2">Geospatial view of bins, trucks, and processing plants.</p>
      </div>

      <div className="flex-1 min-h-0">
        <MapWithNoSSR />
      </div>

      <div className="mt-6 flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png" className="h-6" alt="green marker"/>
          <span>Organic Bins</span>
        </div>
        <div className="flex items-center gap-2">
          <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png" className="h-6" alt="blue marker"/>
          <span>Inorganic Bins</span>
        </div>
        <div className="flex items-center gap-2">
          <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png" className="h-6" alt="red marker"/>
          <span className="font-semibold text-red-600">Full Bins (Alert)</span>
        </div>
        <div className="flex items-center gap-2">
          <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png" className="h-6" alt="gold marker"/>
          <span>Processing Plants</span>
        </div>
      </div>
    </div>
  );
}

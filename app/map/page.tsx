'use client';

import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">Loading Map...</div>
});

export default function MapPage() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto h-[calc(100vh-4rem)] md:h-screen flex flex-col">
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Infrastructure Map</h1>
        <p className="text-sm text-gray-500 mt-1">Geospatial view of active bins, fleet trucks, and processing plants.</p>
      </div>

      <div className="flex-1 min-h-[300px] mb-4 rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white">
        <MapWithNoSSR />
      </div>

      <div className="flex flex-wrap gap-6 text-xs md:text-sm pb-4 md:pb-0 shrink-0">
        <div className="flex items-center gap-2">
          <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png" className="h-5 object-contain" alt="green marker"/>
          <span className="font-medium text-gray-700">Organic</span>
        </div>
        <div className="flex items-center gap-2">
          <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png" className="h-5 object-contain" alt="blue marker"/>
          <span className="font-medium text-gray-700">Inorganic</span>
        </div>
        <div className="flex items-center gap-2">
          <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png" className="h-5 object-contain" alt="red marker"/>
          <span className="font-medium text-red-600">Action Required</span>
        </div>
        <div className="flex items-center gap-2">
          <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png" className="h-5 object-contain" alt="gold marker"/>
          <span className="font-medium text-gray-700">Processing Plant</span>
        </div>
      </div>
    </div>
  );
}

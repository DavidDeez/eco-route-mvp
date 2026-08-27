'use client';

import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { initialBins, processingPlants } from '@/lib/mockData';
import L from 'leaflet';
import React, { useEffect } from 'react';

// Fix for default marker icons in Leaflet with Next.js
const customIcon = (color: string) => new L.Icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const plantIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [30, 46],
  iconAnchor: [15, 46],
});

export default function MapComponent() {
  
  // Base Lagos coordinates
  const center: [number, number] = [6.5244, 3.3792];

  return (
    <div className="h-[600px] w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm relative z-0">
      <MapContainer center={center} zoom={13} className="h-full w-full">
        <TileLayer
          attribution='Tiles &copy; Esri'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        />
        
        {initialBins.map((bin) => {
          let color = bin.type === 'organic' ? 'green' : 'blue';
          if (bin.status === 'full') color = 'red';
          
          return (
            <Marker key={bin.id} position={[bin.lat, bin.lng]} icon={customIcon(color)}>
              <Popup>
                <div className="font-sans">
                  <h3 className="font-bold text-lg">{bin.id}</h3>
                  <p className="capitalize text-sm text-gray-600">Type: {bin.type}</p>
                  <p className="text-sm font-medium mt-1">Status: <span className={bin.status === 'full' ? 'text-red-500' : 'text-green-500'}>{bin.status.toUpperCase()}</span></p>
                  <p className="text-sm">Fill Level: {bin.fillLevel}%</p>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {processingPlants.map((plant) => (
          <React.Fragment key={plant.id}>
            <Circle 
              center={[plant.lat, plant.lng]} 
              radius={2500} // 2.5km radius
              pathOptions={{ fillColor: '#eab308', color: '#eab308', fillOpacity: 0.1, weight: 1 }}
            />
            <Marker position={[plant.lat, plant.lng]} icon={plantIcon}>
              <Popup>
                <div className="font-sans">
                  <h3 className="font-bold text-lg">{plant.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">Processes: {plant.type} waste</p>
                  <p className="text-xs text-yellow-600 mt-1">2.5km Service Radius</p>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
}

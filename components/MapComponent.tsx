'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { initialBins, processingPlants } from '@/lib/mockData';
import L from 'leaflet';
import { useEffect } from 'react';

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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
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
          <Marker key={plant.id} position={[plant.lat, plant.lng]} icon={plantIcon}>
            <Popup>
              <div className="font-sans">
                <h3 className="font-bold text-lg">{plant.name}</h3>
                <p className="text-sm text-gray-600 capitalize">Processes: {plant.type} waste</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export type BinType = 'organic' | 'inorganic';
export type BinStatus = 'empty' | 'filling' | 'full';

export interface Bin {
  id: string;
  type: BinType;
  lat: number;
  lng: number;
  fillLevel: number; // 0 to 100
  status: BinStatus;
  lastUpdated: string;
}

export interface Truck {
  id: string;
  type: BinType;
  lat: number;
  lng: number;
  status: 'idle' | 'en_route' | 'collecting';
}

// Some coordinates around a generic city center (e.g. Lagos or just generic)
// Let's use a generic point: 6.5244, 3.3792 (Lagos, Nigeria) for realistic demo
const BASE_LAT = 6.5244;
const BASE_LNG = 3.3792;

export const initialBins: Bin[] = [
  { id: 'BIN-001', type: 'organic', lat: BASE_LAT + 0.01, lng: BASE_LNG + 0.01, fillLevel: 25, status: 'filling', lastUpdated: new Date().toISOString() },
  { id: 'BIN-002', type: 'inorganic', lat: BASE_LAT + 0.015, lng: BASE_LNG - 0.01, fillLevel: 85, status: 'full', lastUpdated: new Date().toISOString() },
  { id: 'BIN-003', type: 'organic', lat: BASE_LAT - 0.005, lng: BASE_LNG - 0.015, fillLevel: 90, status: 'full', lastUpdated: new Date().toISOString() },
  { id: 'BIN-004', type: 'inorganic', lat: BASE_LAT - 0.01, lng: BASE_LNG + 0.02, fillLevel: 10, status: 'empty', lastUpdated: new Date().toISOString() },
  { id: 'BIN-005', type: 'organic', lat: BASE_LAT + 0.005, lng: BASE_LNG + 0.025, fillLevel: 45, status: 'filling', lastUpdated: new Date().toISOString() },
  { id: 'BIN-006', type: 'inorganic', lat: BASE_LAT - 0.015, lng: BASE_LNG + 0.005, fillLevel: 95, status: 'full', lastUpdated: new Date().toISOString() },
  { id: 'BIN-007', type: 'organic', lat: BASE_LAT + 0.02, lng: BASE_LNG - 0.005, fillLevel: 60, status: 'filling', lastUpdated: new Date().toISOString() },
  { id: 'BIN-008', type: 'inorganic', lat: BASE_LAT - 0.002, lng: BASE_LNG + 0.015, fillLevel: 15, status: 'empty', lastUpdated: new Date().toISOString() },
];

export const initialTrucks: Truck[] = [
  { id: 'TRK-01', type: 'organic', lat: BASE_LAT + 0.012, lng: BASE_LNG + 0.012, status: 'idle' },
  { id: 'TRK-02', type: 'inorganic', lat: BASE_LAT - 0.012, lng: BASE_LNG - 0.012, status: 'en_route' },
];

export const processingPlants = [
  { id: 'PLANT-BIO', name: 'Biogas Plant', type: 'organic', lat: BASE_LAT + 0.03, lng: BASE_LNG + 0.03 },
  { id: 'PLANT-REC', name: 'Materials Recycling Hub', type: 'inorganic', lat: BASE_LAT - 0.03, lng: BASE_LNG - 0.03 },
];

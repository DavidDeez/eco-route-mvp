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
  address: string;
  city: string;
}

export interface Truck {
  id: string;
  type: BinType;
  lat: number;
  lng: number;
  status: 'idle' | 'en_route' | 'collecting';
}

// Lagos (Generic Center)
const LAGOS_LAT = 6.5244;
const LAGOS_LNG = 3.3792;

// Ibadan
const IBADAN_LAT = 7.3775;
const IBADAN_LNG = 3.9470;

// Abuja
const ABUJA_LAT = 9.0579;
const ABUJA_LNG = 7.4951;

export const initialBins: Bin[] = [
  // Lagos Bins
  { id: 'BIN-L01', type: 'organic', lat: LAGOS_LAT + 0.01, lng: LAGOS_LNG + 0.01, fillLevel: 25, status: 'filling', lastUpdated: new Date().toISOString(), address: 'Victoria Island, Lagos', city: 'Lagos' },
  { id: 'BIN-L02', type: 'inorganic', lat: LAGOS_LAT + 0.015, lng: LAGOS_LNG - 0.01, fillLevel: 85, status: 'full', lastUpdated: new Date().toISOString(), address: 'Ikeja City Mall, Lagos', city: 'Lagos' },
  { id: 'BIN-L03', type: 'organic', lat: LAGOS_LAT - 0.005, lng: LAGOS_LNG - 0.015, fillLevel: 90, status: 'full', lastUpdated: new Date().toISOString(), address: 'Surulere, Lagos', city: 'Lagos' },
  { id: 'BIN-L04', type: 'inorganic', lat: LAGOS_LAT - 0.01, lng: LAGOS_LNG + 0.02, fillLevel: 10, status: 'empty', lastUpdated: new Date().toISOString(), address: 'Lekki Phase 1, Lagos', city: 'Lagos' },
  
  // Ibadan Bins
  { id: 'BIN-I01', type: 'organic', lat: IBADAN_LAT + 0.01, lng: IBADAN_LNG + 0.01, fillLevel: 95, status: 'full', lastUpdated: new Date().toISOString(), address: 'Agodi Gate, Ibadan', city: 'Ibadan' },
  { id: 'BIN-I02', type: 'inorganic', lat: IBADAN_LAT - 0.015, lng: IBADAN_LNG - 0.005, fillLevel: 40, status: 'filling', lastUpdated: new Date().toISOString(), address: 'Bodija Market, Ibadan', city: 'Ibadan' },
  { id: 'BIN-I03', type: 'inorganic', lat: IBADAN_LAT + 0.005, lng: IBADAN_LNG + 0.02, fillLevel: 15, status: 'empty', lastUpdated: new Date().toISOString(), address: 'Ring Road, Ibadan', city: 'Ibadan' },

  // Abuja Bins
  { id: 'BIN-A01', type: 'organic', lat: ABUJA_LAT + 0.015, lng: ABUJA_LNG + 0.01, fillLevel: 100, status: 'full', lastUpdated: new Date().toISOString(), address: 'Wuse 2, Abuja', city: 'Abuja' },
  { id: 'BIN-A02', type: 'inorganic', lat: ABUJA_LAT - 0.01, lng: ABUJA_LNG + 0.02, fillLevel: 55, status: 'filling', lastUpdated: new Date().toISOString(), address: 'Maitama, Abuja', city: 'Abuja' },
  { id: 'BIN-A03', type: 'organic', lat: ABUJA_LAT - 0.005, lng: ABUJA_LNG - 0.015, fillLevel: 20, status: 'empty', lastUpdated: new Date().toISOString(), address: 'Garki Area 1, Abuja', city: 'Abuja' },
];

export const initialTrucks: Truck[] = [
  { id: 'TRK-L01', type: 'organic', lat: LAGOS_LAT + 0.012, lng: LAGOS_LNG + 0.012, status: 'idle' },
  { id: 'TRK-L02', type: 'inorganic', lat: LAGOS_LAT - 0.012, lng: LAGOS_LNG - 0.012, status: 'en_route' },
  { id: 'TRK-I01', type: 'organic', lat: IBADAN_LAT, lng: IBADAN_LNG, status: 'idle' },
  { id: 'TRK-A01', type: 'inorganic', lat: ABUJA_LAT, lng: ABUJA_LNG, status: 'collecting' },
];

export const processingPlants = [
  { id: 'PLANT-L-BIO', name: 'Lagos Biogas Plant', type: 'organic', lat: LAGOS_LAT + 0.03, lng: LAGOS_LNG + 0.03, city: 'Lagos' },
  { id: 'PLANT-L-REC', name: 'Lagos Recycling Hub', type: 'inorganic', lat: LAGOS_LAT - 0.03, lng: LAGOS_LNG - 0.03, city: 'Lagos' },
  { id: 'PLANT-I-REC', name: 'Ibadan Sorting Facility', type: 'inorganic', lat: IBADAN_LAT - 0.02, lng: IBADAN_LNG - 0.02, city: 'Ibadan' },
  { id: 'PLANT-A-BIO', name: 'Abuja Eco-Plant', type: 'organic', lat: ABUJA_LAT + 0.02, lng: ABUJA_LNG + 0.02, city: 'Abuja' },
];

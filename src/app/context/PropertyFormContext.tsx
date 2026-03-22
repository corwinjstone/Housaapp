import { createContext, useContext, useState, type ReactNode } from 'react';

export interface PhotoItem {
  url: string;
  name: string;
}

export interface PropertyFormData {
  // Step 1 — Address
  streetAddress: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
  // Step 2 — Details
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  sqft: string;
  yearBuilt: string;
  garageSpaces: number;
  // Step 3 — Features
  features: string[];
  condition: number;   // 0–4
  hasHOA: boolean;
  hoaFee: string;
  // Step 4 — Photos
  photos: PhotoItem[];
  primaryPhotoIndex: number;
  // Step 5 — Goals
  askingPrice: string;
  targetCashAtClose: string;
  mortgage: string;       // outstanding mortgage balance
  timeline: string;    // 'asap' | '30' | '60' | '90+'
  motivation: string;
}

const DEFAULT: PropertyFormData = {
  streetAddress: '',
  unit: '',
  city: '',
  state: '',
  zip: '',
  propertyType: '',
  bedrooms: 3,
  bathrooms: 2,
  sqft: '',
  yearBuilt: '',
  garageSpaces: 1,
  features: [],
  condition: 2,
  hasHOA: false,
  hoaFee: '',
  photos: [],
  primaryPhotoIndex: 0,
  askingPrice: '250000',
  targetCashAtClose: '29375',
  mortgage: '',
  timeline: '30',
  motivation: '',
};

interface Ctx {
  data: PropertyFormData;
  update: (patch: Partial<PropertyFormData>) => void;
  reset: () => void;
}

const PropertyFormContext = createContext<Ctx | null>(null);

export function PropertyFormProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PropertyFormData>(DEFAULT);
  const update = (patch: Partial<PropertyFormData>) =>
    setData(prev => ({ ...prev, ...patch }));
  const reset = () => setData(DEFAULT);
  return (
    <PropertyFormContext.Provider value={{ data, update, reset }}>
      {children}
    </PropertyFormContext.Provider>
  );
}

export function usePropertyForm() {
  const ctx = useContext(PropertyFormContext);
  if (!ctx) throw new Error('usePropertyForm must be used inside PropertyFormProvider');
  return ctx;
}
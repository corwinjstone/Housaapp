export type ListingStatus = 'active' | 'pending' | 'sold' | 'draft';

export interface MyListing {
  id:             number;
  address:        string;
  unit:           string;
  city:           string;
  state:          string;
  zip:            string;
  photo:          string;
  status:         ListingStatus;
  offerCount:     number;
  // Details
  propertyType:   string;
  beds:           number;
  baths:          number;
  sqft:           string;
  yearBuilt:      string;
  garageSpaces:   number;
  // Features
  features:       string[];
  condition:      number;  // 0–4
  hasHOA:         boolean;
  hoaFee:         string;
  // Financials
  askingPrice:    number;
  mortgage:       number;
  targetCash:     number;
  timeline:       string;
  motivation:     string;
  // Meta
  daysActive:     number;
}

export const MY_LISTINGS: MyListing[] = [
  {
    id: 1,
    address: '732 Caspian Way', unit: '',
    city: 'Dallas', state: 'TX', zip: '75201',
    photo: 'https://images.unsplash.com/photo-1720067171688-44a9f8385414?w=640&q=80',
    status: 'active',
    offerCount: 7,
    propertyType: 'single-family',
    beds: 3, baths: 2, sqft: '2,050', yearBuilt: '2004', garageSpaces: 2,
    features: ['Hardwood Floors', 'Updated Kitchen', 'Smart Home'],
    condition: 3,
    hasHOA: false, hoaFee: '',
    askingPrice: 250000, mortgage: 185000, targetCash: 29375,
    timeline: '30', motivation: 'Relocating for work',
    daysActive: 12,
  },
  {
    id: 2,
    address: '1205 Oak Creek Drive', unit: '',
    city: 'Austin', state: 'TX', zip: '78701',
    photo: 'https://images.unsplash.com/photo-1759355787114-09af8ee10783?w=640&q=80',
    status: 'pending',
    offerCount: 3,
    propertyType: 'single-family',
    beds: 4, baths: 3, sqft: '2,840', yearBuilt: '2011', garageSpaces: 2,
    features: ['Pool', 'Updated Bathrooms', 'Outdoor Kitchen', 'New HVAC (5 yrs)'],
    condition: 4,
    hasHOA: true, hoaFee: '180',
    askingPrice: 415000, mortgage: 290000, targetCash: 85000,
    timeline: '60', motivation: 'Upgrading to larger home',
    daysActive: 28,
  },
  {
    id: 3,
    address: '4891 Riverside Blvd', unit: '',
    city: 'Houston', state: 'TX', zip: '77002',
    photo: 'https://images.unsplash.com/photo-1755801511747-34b29c87f1f4?w=640&q=80',
    status: 'draft',
    offerCount: 0,
    propertyType: 'townhouse',
    beds: 3, baths: 2, sqft: '1,620', yearBuilt: '1998', garageSpaces: 1,
    features: ['Fireplace', 'New Windows'],
    condition: 2,
    hasHOA: false, hoaFee: '',
    askingPrice: 178000, mortgage: 120000, targetCash: 35000,
    timeline: '90+', motivation: 'Investment property',
    daysActive: 0,
  },
];

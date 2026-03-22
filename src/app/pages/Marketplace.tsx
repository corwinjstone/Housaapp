import { useState } from 'react';
import { Link } from 'react-router';
import { SiteNav } from '../components/shared/SiteNav';
import { bookStyle, heavyStyle, brandFont, heavyFont, bookFont, FAMILY } from '../brand';

type PropType = 'All' | 'Single Family' | 'Condo' | 'Townhouse' | 'Multi-Family';
type SortOpt  = 'newest' | 'price-asc' | 'price-desc' | 'beds';

interface MarketListing {
  id:       number;
  address:  string;
  city:     string;
  state:    string;
  zip:      string;
  price:    number;
  beds:     number;
  baths:    number;
  sqft:     string;
  type:     PropType;
  photo:    string;
  daysOnMarket: number;
  features: string[];
  yearBuilt:number;
  hasPool:  boolean;
  status:   'For Sale' | 'New Listing' | 'Price Reduced';
}

const LISTINGS: MarketListing[] = [
  {
    id: 1, address: '742 Hillcrest Avenue', city: 'Dallas', state: 'TX', zip: '75218',
    price: 285000, beds: 4, baths: 3, sqft: '2,350', type: 'Single Family',
    photo: 'https://images.unsplash.com/photo-1720067171688-44a9f8385414?w=640&q=80',
    daysOnMarket: 5, features: ['Updated Kitchen', 'Hardwood Floors', 'Smart Home'],
    yearBuilt: 2008, hasPool: false, status: 'New Listing',
  },
  {
    id: 2, address: '301 Marina Boulevard #12C', city: 'Dallas', state: 'TX', zip: '75201',
    price: 395000, beds: 2, baths: 2, sqft: '1,420', type: 'Condo',
    photo: 'https://images.unsplash.com/photo-1763312196860-0d889fde89e1?w=640&q=80',
    daysOnMarket: 18, features: ['Waterfront', 'Concierge', 'EV Charger'],
    yearBuilt: 2018, hasPool: true, status: 'For Sale',
  },
  {
    id: 3, address: '1847 Elm Street', city: 'Plano', state: 'TX', zip: '75023',
    price: 229000, beds: 3, baths: 2, sqft: '1,780', type: 'Townhouse',
    photo: 'https://images.unsplash.com/photo-1767203331311-0367bf3e713b?w=640&q=80',
    daysOnMarket: 31, features: ['Corner Lot', 'New Roof (5 yrs)', 'Fireplace'],
    yearBuilt: 2001, hasPool: false, status: 'Price Reduced',
  },
  {
    id: 4, address: '9210 Sunset Drive', city: 'Irving', state: 'TX', zip: '75063',
    price: 318000, beds: 4, baths: 3, sqft: '2,680', type: 'Single Family',
    photo: 'https://images.unsplash.com/photo-1757006019042-0d04e505d836?w=640&q=80',
    daysOnMarket: 9, features: ['Pool', 'Outdoor Kitchen', 'New HVAC (5 yrs)'],
    yearBuilt: 1998, hasPool: true, status: 'New Listing',
  },
  {
    id: 5, address: '234 Magnolia Lane', city: 'Frisco', state: 'TX', zip: '75034',
    price: 524000, beds: 5, baths: 4, sqft: '3,900', type: 'Single Family',
    photo: 'https://images.unsplash.com/photo-1759355787114-09af8ee10783?w=640&q=80',
    daysOnMarket: 4, features: ['Pool', 'Smart Home', 'Solar Panels', 'Home Office'],
    yearBuilt: 2017, hasPool: true, status: 'New Listing',
  },
  {
    id: 6, address: '5571 Harbor View', city: 'Lake Dallas', state: 'TX', zip: '75065',
    price: 610000, beds: 5, baths: 4, sqft: '4,200', type: 'Single Family',
    photo: 'https://images.unsplash.com/photo-1768058241995-1a89d7e10f28?w=640&q=80',
    daysOnMarket: 22, features: ['Waterfront', 'Pool', 'Outdoor Kitchen', 'Fireplace'],
    yearBuilt: 2012, hasPool: true, status: 'For Sale',
  },
  {
    id: 7, address: '88 Willow Creek Court', city: 'Garland', state: 'TX', zip: '75041',
    price: 199000, beds: 3, baths: 2, sqft: '1,550', type: 'Single Family',
    photo: 'https://images.unsplash.com/photo-1755801511747-34b29c87f1f4?w=640&q=80',
    daysOnMarket: 42, features: ['Updated Bathrooms', 'Hardwood Floors', 'New Windows'],
    yearBuilt: 1987, hasPool: false, status: 'Price Reduced',
  },
  {
    id: 8, address: '2200 Ridgeline Court', city: 'McKinney', state: 'TX', zip: '75070',
    price: 445000, beds: 4, baths: 3, sqft: '3,100', type: 'Single Family',
    photo: 'https://images.unsplash.com/photo-1761481253997-10501d9f4c23?w=640&q=80',
    daysOnMarket: 7, features: ['Updated Kitchen', 'Updated Bathrooms', 'EV Charger', 'Smart Home'],
    yearBuilt: 2020, hasPool: false, status: 'New Listing',
  },
];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  'For Sale':      { bg: 'rgba(71,143,255,0.2)',  color: '#478fff' },
  'New Listing':   { bg: 'rgba(133,255,0,0.2)',   color: '#85ff00' },
  'Price Reduced': { bg: 'rgba(248,231,28,0.2)',  color: '#f8e71c' },
};

const TYPE_FILTERS: PropType[] = ['All', 'Single Family', 'Condo', 'Townhouse', 'Multi-Family'];

export function Marketplace() {
  const [typeFilter, setTypeFilter] = useState<PropType>('All');
  const [sort,       setSort]       = useState<SortOpt>('newest');
  const [priceMin,   setPriceMin]   = useState('');
  const [priceMax,   setPriceMax]   = useState('');
  const [bedsMin,    setBedsMin]    = useState(0);
  const [search,     setSearch]     = useState('');

  let items = LISTINGS.filter(l => {
    if (typeFilter !== 'All' && l.type !== typeFilter) return false;
    if (priceMin && l.price < parseInt(priceMin.replace(/\D/g,''), 10)) return false;
    if (priceMax && l.price > parseInt(priceMax.replace(/\D/g,''), 10)) return false;
    if (bedsMin > 0 && l.beds < bedsMin) return false;
    if (search && ![l.address, l.city, l.state].join(' ').toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  items = [...items].sort((a, b) => {
    if (sort === 'price-asc')  return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'beds')       return b.beds  - a.beds;
    return a.daysOnMarket - b.daysOnMarket; // newest = fewest days
  });

  const inpStyle: React.CSSProperties = {
    borderRadius: 10, padding: '10px 14px',
    backgroundColor: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: 'white', outline: 'none',
    ...bookStyle, fontSize: 13,
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#004dab', fontFamily: brandFont }}>
      <SiteNav />

      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 pb-16" style={{ paddingTop: 48 }}>

        {/* ── Header ── */}
        <div className="mb-8">
          <p style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: '0 0 6px' }}>
            Browse available homes
          </p>
          <h1 className={`${FAMILY} m-0`} style={{ fontSize: 'clamp(24px, 3vw, 40px)', color: 'white', fontWeight: 800 }}>
            Marketplace
          </h1>
        </div>

        {/* ── Search bar ── */}
        <div className="relative mb-6">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            style={{ ...inpStyle, width: '100%', paddingLeft: 42, fontSize: 15 }}
            placeholder="Search by address, city, or ZIP…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={e => (e.target.style.borderColor = '#85ff00')}
            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
          />
        </div>

        {/* ── Filters row ── */}
        <div className="flex flex-wrap gap-3 items-center mb-6">
          {/* Type chips */}
          <div className="flex flex-wrap gap-2">
            {TYPE_FILTERS.map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className="rounded-full px-4 py-1.5 transition-all hover:opacity-90"
                style={{
                  ...bookStyle, fontSize: 13, cursor: 'pointer', border: 'none',
                  backgroundColor: typeFilter === t ? '#85ff00' : 'rgba(255,255,255,0.1)',
                  color: typeFilter === t ? '#004dab' : 'rgba(255,255,255,0.65)',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="h-5 w-px bg-white/15 hidden sm:block" />

          {/* Price range */}
          <div className="flex items-center gap-2">
            <input style={{ ...inpStyle, width: 110 }} placeholder="Min $" value={priceMin} onChange={e => setPriceMin(e.target.value)} onFocus={e => (e.target.style.borderColor='#85ff00')} onBlur={e => (e.target.style.borderColor='rgba(255,255,255,0.15)')} />
            <span style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>–</span>
            <input style={{ ...inpStyle, width: 110 }} placeholder="Max $" value={priceMax} onChange={e => setPriceMax(e.target.value)} onFocus={e => (e.target.style.borderColor='#85ff00')} onBlur={e => (e.target.style.borderColor='rgba(255,255,255,0.15)')} />
          </div>

          {/* Beds min */}
          <div className="flex items-center gap-1.5">
            <span style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Beds</span>
            {[0,2,3,4,5].map(n => (
              <button
                key={n}
                onClick={() => setBedsMin(n)}
                className="w-8 h-8 rounded-full transition-all"
                style={{
                  ...bookStyle, fontSize: 12, cursor: 'pointer', border: 'none',
                  backgroundColor: bedsMin === n ? '#85ff00' : 'rgba(255,255,255,0.1)',
                  color: bedsMin === n ? '#004dab' : 'rgba(255,255,255,0.65)',
                }}
              >
                {n === 0 ? 'Any' : `${n}+`}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative ml-auto">
            <select
              style={{ ...inpStyle, cursor: 'pointer', appearance: 'none', paddingRight: 32 } as React.CSSProperties}
              value={sort}
              onChange={e => setSort(e.target.value as SortOpt)}
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="beds">Most Bedrooms</option>
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>

        {/* ── Results count ── */}
        <p style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>
          {items.length} home{items.length !== 1 ? 's' : ''} found
        </p>

        {/* ── Grid ── */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map(listing => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <p style={{ ...heavyStyle, fontSize: 16, color: 'rgba(255,255,255,0.25)', margin: 0 }}>No results match your filters</p>
            <button
              onClick={() => { setTypeFilter('All'); setPriceMin(''); setPriceMax(''); setBedsMin(0); setSearch(''); }}
              style={{ ...bookStyle, fontSize: 13, color: '#85ff00', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PropertyCard({ listing }: { listing: MarketListing }) {
  const statusStyle = STATUS_STYLE[listing.status];
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col transition-transform hover:-translate-y-1 duration-200"
      style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}
    >
      {/* Photo */}
      <div className="relative" style={{ height: 180 }}>
        <img src={listing.photo} alt={listing.address} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent 60%)' }} />
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span
            className="rounded-full px-2.5 py-1"
            style={{ ...bookStyle, fontSize: 11, backgroundColor: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.color}40`, backdropFilter: 'blur(8px)' }}
          >
            {listing.status}
          </span>
        </div>
        {/* Days on market */}
        <div className="absolute top-3 right-3">
          <span style={{ ...bookStyle, fontSize: 11, color: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(0,0,0,0.5)', padding: '2px 7px', borderRadius: 999 }}>
            {listing.daysOnMarket}d
          </span>
        </div>
        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <p style={{ ...heavyStyle, fontSize: 22, color: 'white', margin: 0, textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
            ${listing.price.toLocaleString()}
          </p>
        </div>
        {listing.hasPool && (
          <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,77,171,0.7)', border: '1px solid rgba(71,143,255,0.5)' }}>
            <span style={{ fontSize: 13 }}>🏊</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p style={{ ...heavyStyle, fontSize: 14, color: 'white', margin: 0, lineHeight: 1.3 }}>{listing.address}</p>
        <p style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
          {listing.city}, {listing.state} {listing.zip}
        </p>

        {/* Stats */}
        <div className="flex gap-3 mt-1">
          {[
            { icon: '🛏', val: `${listing.beds} bd` },
            { icon: '🚿', val: `${listing.baths} ba` },
            { icon: '📐', val: listing.sqft },
          ].map(({ icon, val }) => (
            <span key={val} style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{icon} {val}</span>
          ))}
        </div>

        {/* Feature chips */}
        <div className="flex flex-wrap gap-1 mt-1">
          {listing.features.slice(0, 2).map(f => (
            <span
              key={f}
              className="rounded-full px-2 py-0.5"
              style={{ ...bookStyle, fontSize: 10, backgroundColor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {f}
            </span>
          ))}
          {listing.features.length > 2 && (
            <span style={{ ...bookStyle, fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>+{listing.features.length - 2}</span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <span style={{ ...bookStyle, fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Built {listing.yearBuilt}</span>
          <button
            className="rounded-lg px-3 py-1.5 hover:opacity-80 transition-opacity"
            style={{ ...heavyStyle, fontSize: 12, backgroundColor: 'rgba(133,255,0,0.12)', color: '#85ff00', border: '1px solid rgba(133,255,0,0.25)', cursor: 'pointer' }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

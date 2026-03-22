import { Link } from 'react-router';
import { SiteNav } from '../components/shared/SiteNav';
import { bookStyle, heavyStyle, brandFont, heavyFont, FAMILY } from '../brand';
import { MY_LISTINGS, type MyListing, type ListingStatus } from '../data/listings';

const PROP_TYPE_LABELS: Record<string, string> = {
  'single-family': 'Single Family',
  'condo':         'Condo',
  'townhouse':     'Townhouse',
  'multi-family':  'Multi-Family',
};

const STATUS_CONFIG: Record<ListingStatus, { label: string; bg: string; color: string }> = {
  active:  { label: 'Active',         bg: 'rgba(133,255,0,0.15)',  color: '#85ff00' },
  pending: { label: 'Pending Sale',   bg: 'rgba(71,143,255,0.15)', color: '#478fff' },
  sold:    { label: 'Sold',           bg: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' },
  draft:   { label: 'Draft',          bg: 'rgba(248,231,28,0.12)', color: '#f8e71c' },
};

function StatusBadge({ status }: { status: ListingStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className="rounded-full px-3 py-1"
      style={{ ...bookStyle, fontSize: 12, backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}40` }}
    >
      {cfg.label}
    </span>
  );
}

function ListingCard({ listing }: { listing: MyListing }) {
  const fee         = Math.round(listing.askingPrice * 0.0225);
  const closingCosts= Math.round(listing.askingPrice * 0.01);
  const estCash     = listing.askingPrice - fee - listing.mortgage - closingCosts;
  const onTarget    = estCash >= listing.targetCash;

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col sm:flex-row transition-all hover:scale-[1.005]"
      style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Photo */}
      <div className="relative sm:w-[220px] sm:shrink-0 h-48 sm:h-auto">
        <img src={listing.photo} alt={listing.address} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.3), transparent)' }} />
        <div className="absolute top-3 left-3">
          <StatusBadge status={listing.status} />
        </div>
        {listing.status === 'active' && listing.daysActive > 0 && (
          <div className="absolute bottom-3 left-3">
            <span style={{ ...bookStyle, fontSize: 11, color: 'rgba(255,255,255,0.6)', backgroundColor: 'rgba(0,0,0,0.5)', padding: '2px 8px', borderRadius: 999 }}>
              {listing.daysActive}d on market
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Address */}
          <h3 style={{ ...heavyStyle, fontSize: 19, color: 'white', margin: '0 0 2px' }}>
            {listing.address}
          </h3>
          <p style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '0 0 12px' }}>
            {listing.city}, {listing.state} {listing.zip}
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-3 mb-4">
            {[
              { label: PROP_TYPE_LABELS[listing.propertyType] ?? listing.propertyType, icon: '🏠' },
              { label: `${listing.beds} bd / ${listing.baths} ba`, icon: '🛏' },
              { label: `${listing.sqft} sq ft`, icon: '📐' },
            ].map(({ label, icon }) => (
              <span key={label} style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
                {icon} {label}
              </span>
            ))}
          </div>

          {/* Financial row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Asking Price',    val: `$${listing.askingPrice.toLocaleString()}`,    color: 'white'   },
              { label: 'Mortgage',        val: listing.mortgage ? `$${listing.mortgage.toLocaleString()}` : 'None', color: 'rgba(255,255,255,0.6)' },
              { label: 'Est. Cash at Close', val: estCash > 0 ? `$${estCash.toLocaleString()}` : '—', color: onTarget ? '#85ff00' : '#f8e71c' },
              { label: 'Your Goal',       val: `$${listing.targetCash.toLocaleString()}`,     color: '#478fff' },
            ].map(({ label, val, color }) => (
              <div key={label}>
                <p style={{ ...bookStyle, fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: '0 0 2px' }}>{label}</p>
                <p style={{ ...heavyStyle, fontSize: 15, color, margin: 0 }}>{val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {listing.status === 'active' && (
            <Link
              to="/"
              className="rounded-lg px-4 py-2 hover:opacity-90 transition-opacity flex items-center gap-2"
              style={{ ...heavyStyle, fontSize: 13, backgroundColor: '#85ff00', color: '#004dab', textDecoration: 'none' }}
            >
              View {listing.offerCount} Agent Offer{listing.offerCount !== 1 ? 's' : ''}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="#004dab" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          )}
          {listing.status === 'pending' && (
            <span
              className="rounded-lg px-4 py-2 flex items-center gap-2"
              style={{ ...bookStyle, fontSize: 13, backgroundColor: 'rgba(71,143,255,0.15)', color: '#478fff', border: '1px solid rgba(71,143,255,0.3)' }}
            >
              ⏳ Sale in progress
            </span>
          )}
          {listing.status === 'draft' && (
            <Link
              to="/add-property"
              className="rounded-lg px-4 py-2 hover:opacity-90 transition-opacity"
              style={{ ...heavyStyle, fontSize: 13, backgroundColor: 'rgba(248,231,28,0.12)', color: '#f8e71c', textDecoration: 'none', border: '1px solid rgba(248,231,28,0.3)' }}
            >
              Complete Listing →
            </Link>
          )}
          <Link
            to={`/edit-listing/${listing.id}`}
            className="rounded-lg px-3 py-2 hover:opacity-80 transition-opacity"
            style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.12)', textDecoration: 'none' }}
          >
            Edit
          </Link>
          {listing.offerCount > 0 && (
            <span style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.35)', marginLeft: 'auto' }}>
              {listing.offerCount} offer{listing.offerCount !== 1 ? 's' : ''} received
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function MyHomes() {
  const activeCount  = MY_LISTINGS.filter(l => l.status === 'active').length;
  const pendingCount = MY_LISTINGS.filter(l => l.status === 'pending').length;
  const totalOffers  = MY_LISTINGS.reduce((s, l) => s + l.offerCount, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#004dab', fontFamily: brandFont }}>
      <SiteNav />

      <div className="max-w-[1815px] mx-auto px-[85px] sm:px-8 pb-16" style={{ paddingTop: 56 }}>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: '0 0 6px' }}>
              Corwin's Portfolio
            </p>
            <h1
              className={`${FAMILY} m-0`}
              style={{ fontSize: 'clamp(24px, 3vw, 40px)', color: 'white', fontWeight: 800, lineHeight: 1.1 }}
            >
              My Listings
            </h1>
          </div>
          <Link
            to="/add-property"
            className={`${heavyFont} self-start sm:self-auto rounded-xl px-6 py-3 hover:opacity-90 transition-opacity flex items-center gap-2`}
            style={{ fontSize: 14, backgroundColor: '#85ff00', color: '#004dab', textDecoration: 'none' }}
          >
            + List a New Property
          </Link>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Active listings',  val: activeCount,  color: '#85ff00' },
            { label: 'Pending sale',     val: pendingCount, color: '#478fff' },
            { label: 'Total offers in',  val: totalOffers,  color: 'white'   },
          ].map(({ label, val, color }) => (
            <div
              key={label}
              className="rounded-2xl p-4 sm:p-5"
              style={{ backgroundColor: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p style={{ ...heavyStyle, fontSize: 'clamp(22px, 3vw, 36px)', color, margin: '0 0 3px' }}>{val}</p>
              <p style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Listings */}
        <div className="flex flex-col gap-5">
          {MY_LISTINGS.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}
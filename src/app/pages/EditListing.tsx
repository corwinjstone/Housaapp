import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { SiteNav } from '../components/shared/SiteNav';
import { MY_LISTINGS, type MyListing } from '../data/listings';
import { bookStyle, heavyStyle, brandFont, FAMILY, bookFont, heavyFont } from '../brand';

// ─── Constants ────────────────────────────────────────────────────────────────

const ALL_FEATURES = [
  'Pool', 'Hot Tub / Spa', 'Fireplace', 'Updated Kitchen', 'Updated Bathrooms',
  'Hardwood Floors', 'New Roof (5 yrs)', 'New HVAC (5 yrs)', 'Solar Panels',
  'Smart Home', 'Basement', 'In-Law Suite', 'Home Office', 'Outdoor Kitchen',
  'Waterfront', 'Corner Lot', 'Cul-de-sac', 'New Windows', 'Recently Painted',
  'EV Charger',
];
const CONDITIONS = [
  { label: 'Needs Major Work', desc: 'Significant repairs needed' },
  { label: 'Fixer Upper',      desc: 'Some repairs / updates'    },
  { label: 'Good Condition',   desc: 'Well maintained'           },
  { label: 'Very Good',        desc: 'Move-in ready w/ minor touches' },
  { label: 'Move-in Ready',    desc: 'Pristine condition'        },
];
const PROP_TYPES = [
  { id: 'single-family', label: 'Single Family' },
  { id: 'condo',         label: 'Condo'         },
  { id: 'townhouse',     label: 'Townhouse'     },
  { id: 'multi-family',  label: 'Multi-Family'  },
];
const TIMELINES = [
  { id: 'asap', label: 'ASAP',     sub: 'Under 2 wks' },
  { id: '30',   label: '30 days',  sub: '~1 month'    },
  { id: '60',   label: '60 days',  sub: '~2 months'   },
  { id: '90+',  label: '90+ days', sub: 'No rush'     },
];
const MOTIVATIONS = [
  'Relocating for work','Downsizing','Upgrading to larger home',
  'Divorce / separation','Estate / inheritance','Investment property','Other',
];
const STATUS_CFG: Record<string, { label: string; bg: string; color: string }> = {
  active:  { label: 'Active',       bg: 'rgba(133,255,0,0.15)',  color: '#85ff00' },
  pending: { label: 'Pending Sale', bg: 'rgba(71,143,255,0.15)', color: '#478fff' },
  sold:    { label: 'Sold',         bg: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' },
  draft:   { label: 'Draft',        bg: 'rgba(248,231,28,0.12)', color: '#f8e71c' },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseDollar(v: string | number) {
  return typeof v === 'number' ? v : parseInt(String(v).replace(/\D/g, '') || '0', 10);
}
function dollarDisplay(n: number) {
  return n > 0 ? n.toLocaleString('en-US') : '';
}

// ─── Shared input styles ───────────────────────────────────────────────────────

const inp: React.CSSProperties = {
  width: '100%', borderRadius: 10, padding: '11px 14px',
  backgroundColor: 'rgba(0,0,0,0.35)',
  border: '1px solid rgba(255,255,255,0.15)',
  color: 'white', outline: 'none',
  ...bookStyle, fontSize: 14,
};
const card: React.CSSProperties = {
  backgroundColor: 'rgba(0,0,0,0.25)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 18,
  padding: '24px 28px',
  marginBottom: 16,
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: '0 0 5px' }}>
      {children}
    </p>
  );
}

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <p style={{ ...heavyStyle, fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 8 }}>
      <span>{icon}</span>{title}
    </p>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EditListing() {
  const { id }   = useParams<{ id: string }>();
  const navigate = useNavigate();
  const source   = MY_LISTINGS.find(l => l.id === Number(id));

  // ── Form state (initialised from listing data)
  const [form, setForm] = useState<MyListing>(() => source ?? MY_LISTINGS[0]);
  const [dirty,   setDirty]   = useState(false);
  const [saved,   setSaved]   = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  function patch(p: Partial<MyListing>) {
    setForm(prev => ({ ...prev, ...p }));
    setDirty(true);
    setSaved(false);
  }
  function toggleFeature(f: string) {
    const next = form.features.includes(f)
      ? form.features.filter(x => x !== f)
      : [...form.features, f];
    patch({ features: next });
  }
  function handleSave() {
    // In a real app this would persist to backend; here we just flash success
    setDirty(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!source) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#004dab' }}>
        <p style={{ ...heavyStyle, fontSize: 20, color: 'white' }}>Listing not found.</p>
      </div>
    );
  }

  // ── Derived financials
  const askNum   = parseDollar(form.askingPrice);
  const mortNum  = parseDollar(form.mortgage);
  const fee      = Math.round(askNum * 0.0225);
  const closing  = Math.round(askNum * 0.01);
  const estCash  = Math.max(0, askNum - fee - mortNum - closing);
  const onTarget = estCash >= parseDollar(form.targetCash);

  const statusCfg = STATUS_CFG[form.status];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#004dab', fontFamily: brandFont }}>
      <SiteNav />

      <div className="max-w-[1815px] mx-auto px-[85px] sm:px-8 pb-32" style={{ paddingTop: 40 }}>

        {/* ── Back + title ──────────────────────────────────────────────────── */}
        <button
          onClick={() => navigate('/my-homes')}
          className="flex items-center gap-2 mb-6 hover:opacity-70 transition-opacity"
          style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.45)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          My Listings
        </button>

        {/* Saved banner */}
        {saved && (
          <div className="flex items-center gap-3 rounded-2xl px-5 py-4 mb-6" style={{ backgroundColor: 'rgba(133,255,0,0.12)', border: '1px solid rgba(133,255,0,0.3)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="#85ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{ ...heavyStyle, fontSize: 14, color: '#85ff00' }}>Changes saved — your listing has been updated.</span>
          </div>
        )}

        <div className="flex flex-col xl:flex-row gap-7">

          {/* ── LEFT: sticky property card ───────────────────────────────── */}
          <div className="xl:w-[300px] shrink-0">
            <div className="xl:sticky xl:top-8 flex flex-col gap-4">

              {/* Hero card */}
              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="relative" style={{ height: 160 }}>
                  <img src={form.photo} alt={form.address} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent 50%)' }} />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full px-3 py-1" style={{ ...bookStyle, fontSize: 12, backgroundColor: statusCfg.bg, color: statusCfg.color, border: `1px solid ${statusCfg.color}40` }}>
                      {statusCfg.label}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h2 style={{ ...heavyStyle, fontSize: 17, color: 'white', margin: '0 0 2px' }}>{form.address}</h2>
                  <p style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: '0 0 14px' }}>
                    {form.city}, {form.state} {form.zip}
                  </p>
                  {[
                    { label: 'Asking price', val: askNum > 0 ? `$${askNum.toLocaleString()}` : '—', color: 'white' },
                    { label: 'Est. cash at close', val: estCash > 0 ? `$${estCash.toLocaleString()}` : '—', color: onTarget ? '#85ff00' : '#f8e71c' },
                    { label: 'Mortgage payoff', val: mortNum > 0 ? `$${mortNum.toLocaleString()}` : 'None', color: 'rgba(255,255,255,0.6)' },
                  ].map(({ label, val, color }) => (
                    <div key={label} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{label}</span>
                      <span style={{ ...heavyStyle, fontSize: 14, color }}>{val}</span>
                    </div>
                  ))}
                  <div className="flex gap-1.5 mt-3 flex-wrap">
                    <span style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>🛏 {form.beds} bd</span>
                    <span style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>🚿 {form.baths} ba</span>
                    <span style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>📐 {form.sqft} sf</span>
                  </div>
                </div>
              </div>

              {/* Quick nav pills */}
              <div className="flex flex-col gap-2">
                {[
                  { href: '#section-address',  label: '📍 Address' },
                  { href: '#section-details',  label: '🏠 Property Details' },
                  { href: '#section-features', label: '⭐ Features' },
                  { href: '#section-pricing',  label: '💰 Pricing & Goals' },
                ].map(({ href, label }) => (
                  <a key={href} href={href}
                    className="rounded-lg px-4 py-2.5 hover:bg-white/10 transition-colors"
                    style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    {label}
                  </a>
                ))}
              </div>

              {/* Offers CTA */}
              {form.offerCount > 0 && (
                <Link to="/"
                  className="flex items-center justify-between rounded-xl px-4 py-3 hover:opacity-90 transition-opacity"
                  style={{ ...heavyStyle, fontSize: 13, backgroundColor: '#85ff00', color: '#004dab', textDecoration: 'none' }}
                >
                  View {form.offerCount} Agent Offers
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="#004dab" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              )}
            </div>
          </div>

          {/* ── RIGHT: all edit sections ───────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* ── ADDRESS ──────────────────────────────────────────────────── */}
            <div id="section-address" style={card}>
              <SectionHeader icon="📍" title="Address & Location" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <Label>Street Address</Label>
                    <input style={inp} value={form.address} onChange={e => patch({ address: e.target.value })}
                      onFocus={e=>(e.target.style.borderColor='#85ff00')} onBlur={e=>(e.target.style.borderColor='rgba(255,255,255,0.15)')} />
                  </div>
                  <div>
                    <Label>Unit / Apt</Label>
                    <input style={inp} value={form.unit} placeholder="—" onChange={e => patch({ unit: e.target.value })}
                      onFocus={e=>(e.target.style.borderColor='#85ff00')} onBlur={e=>(e.target.style.borderColor='rgba(255,255,255,0.15)')} />
                  </div>
                </div>
                <div>
                  <Label>City</Label>
                  <input style={inp} value={form.city} onChange={e => patch({ city: e.target.value })}
                    onFocus={e=>(e.target.style.borderColor='#85ff00')} onBlur={e=>(e.target.style.borderColor='rgba(255,255,255,0.15)')} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>State</Label>
                    <input style={inp} value={form.state} onChange={e => patch({ state: e.target.value })}
                      onFocus={e=>(e.target.style.borderColor='#85ff00')} onBlur={e=>(e.target.style.borderColor='rgba(255,255,255,0.15)')} />
                  </div>
                  <div>
                    <Label>ZIP Code</Label>
                    <input style={inp} value={form.zip} onChange={e => patch({ zip: e.target.value })}
                      onFocus={e=>(e.target.style.borderColor='#85ff00')} onBlur={e=>(e.target.style.borderColor='rgba(255,255,255,0.15)')} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── PROPERTY DETAILS ──────────────────────────────────────────── */}
            <div id="section-details" style={card}>
              <SectionHeader icon="🏠" title="Property Details" />

              {/* Property type */}
              <Label>Property Type</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                {PROP_TYPES.map(t => (
                  <button key={t.id} onClick={() => patch({ propertyType: t.id })}
                    className="rounded-xl py-2.5 px-3 text-center transition-all hover:opacity-90"
                    style={{ ...bookStyle, fontSize: 13, cursor: 'pointer', border: 'none',
                      backgroundColor: form.propertyType === t.id ? 'rgba(133,255,0,0.14)' : 'rgba(0,0,0,0.3)',
                      color: form.propertyType === t.id ? '#85ff00' : 'rgba(255,255,255,0.55)',
                      outline: form.propertyType === t.id ? '2px solid rgba(133,255,0,0.4)' : '2px solid rgba(255,255,255,0.08)',
                    }}
                  >{t.label}</button>
                ))}
              </div>

              {/* Beds / baths / sqft / year / garage */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-1">
                {[
                  { label: 'Bedrooms',    key: 'beds'         as const, min: 1, max: 10 },
                  { label: 'Bathrooms',   key: 'baths'        as const, min: 1, max: 10 },
                  { label: 'Garage Sp.',  key: 'garageSpaces' as const, min: 0, max: 6  },
                ].map(({ label, key, min, max }) => (
                  <div key={key}>
                    <Label>{label}</Label>
                    <div className="flex items-center gap-2">
                      <button onClick={() => patch({ [key]: Math.max(min, (form[key] as number) - 1) })}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'white', border: 'none', cursor: 'pointer', fontSize: 16 }}>−</button>
                      <span style={{ ...heavyStyle, fontSize: 16, color: 'white', minWidth: 20, textAlign: 'center' }}>
                        {form[key] as number}
                      </span>
                      <button onClick={() => patch({ [key]: Math.min(max, (form[key] as number) + 1) })}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'white', border: 'none', cursor: 'pointer', fontSize: 16 }}>+</button>
                    </div>
                  </div>
                ))}
                <div>
                  <Label>Sq Ft</Label>
                  <input style={{ ...inp, width: '100%' }} value={form.sqft} placeholder="e.g. 2,050"
                    onChange={e => patch({ sqft: e.target.value })}
                    onFocus={e=>(e.target.style.borderColor='#85ff00')} onBlur={e=>(e.target.style.borderColor='rgba(255,255,255,0.15)')} />
                </div>
                <div>
                  <Label>Year Built</Label>
                  <input style={{ ...inp, width: '100%' }} value={form.yearBuilt} placeholder="2004"
                    onChange={e => patch({ yearBuilt: e.target.value })}
                    onFocus={e=>(e.target.style.borderColor='#85ff00')} onBlur={e=>(e.target.style.borderColor='rgba(255,255,255,0.15)')} />
                </div>
              </div>
            </div>

            {/* ── FEATURES & CONDITION ─────────────────────────────────────── */}
            <div id="section-features" style={card}>
              <SectionHeader icon="⭐" title="Features & Condition" />

              <Label>Features (select all that apply)</Label>
              <div className="flex flex-wrap gap-2 mb-6">
                {ALL_FEATURES.map(f => {
                  const on = form.features.includes(f);
                  return (
                    <button key={f} onClick={() => toggleFeature(f)}
                      className="rounded-full px-3 py-1.5 transition-all hover:opacity-90"
                      style={{ ...bookStyle, fontSize: 13, cursor: 'pointer', border: 'none',
                        backgroundColor: on ? 'rgba(133,255,0,0.14)' : 'rgba(255,255,255,0.06)',
                        color: on ? '#85ff00' : 'rgba(255,255,255,0.5)',
                        outline: on ? '2px solid rgba(133,255,0,0.35)' : '2px solid transparent',
                      }}
                    >{on ? '✓ ' : ''}{f}</button>
                  );
                })}
              </div>

              <Label>Property Condition</Label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5">
                {CONDITIONS.map((c, i) => (
                  <button key={i} onClick={() => patch({ condition: i })}
                    className="rounded-xl p-3 text-left transition-all hover:opacity-90"
                    style={{ cursor: 'pointer', border: 'none',
                      backgroundColor: form.condition === i ? 'rgba(133,255,0,0.12)' : 'rgba(0,0,0,0.25)',
                      outline: form.condition === i ? '2px solid rgba(133,255,0,0.4)' : '2px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <p style={{ ...heavyStyle, fontSize: 13, color: form.condition === i ? '#85ff00' : 'white', margin: '0 0 2px' }}>{c.label}</p>
                    <p style={{ ...bookStyle, fontSize: 10, color: 'rgba(255,255,255,0.35)', margin: 0 }}>{c.desc}</p>
                  </button>
                ))}
              </div>

              {/* HOA */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => patch({ hasHOA: !form.hasHOA })}
                  className="flex items-center gap-2.5 rounded-lg px-4 py-2.5 transition-all"
                  style={{ cursor: 'pointer', border: 'none',
                    backgroundColor: form.hasHOA ? 'rgba(133,255,0,0.12)' : 'rgba(0,0,0,0.25)',
                    outline: form.hasHOA ? '2px solid rgba(133,255,0,0.35)' : '2px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: form.hasHOA ? '#85ff00' : 'rgba(255,255,255,0.1)' }}>
                    {form.hasHOA && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#004dab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <span style={{ ...bookStyle, fontSize: 13, color: form.hasHOA ? '#85ff00' : 'rgba(255,255,255,0.6)' }}>HOA</span>
                </button>
                {form.hasHOA && (
                  <div className="relative" style={{ width: 160 }}>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ ...bookStyle, color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>$</span>
                    <input
                      style={{ ...inp, paddingLeft: 22 }}
                      placeholder="Monthly fee"
                      value={form.hoaFee}
                      onChange={e => patch({ hoaFee: e.target.value.replace(/\D/g,'') })}
                      onFocus={e=>(e.target.style.borderColor='#85ff00')} onBlur={e=>(e.target.style.borderColor='rgba(255,255,255,0.15)')}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* ── PRICING & GOALS ───────────────────────────────────────────── */}
            <div id="section-pricing" style={card}>
              <SectionHeader icon="💰" title="Pricing & Goals" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                {/* Asking price */}
                <div>
                  <Label>List / Asking Price</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ ...bookStyle, color: 'rgba(255,255,255,0.45)', fontSize: 15 }}>$</span>
                    <input
                      style={{ ...inp, paddingLeft: 22 }}
                      value={dollarDisplay(form.askingPrice)}
                      placeholder="250,000"
                      onChange={e => patch({ askingPrice: parseDollar(e.target.value) })}
                      onFocus={e=>(e.target.style.borderColor='#85ff00')} onBlur={e=>(e.target.style.borderColor='rgba(255,255,255,0.15)')}
                    />
                  </div>
                </div>

                {/* Mortgage */}
                <div>
                  <Label>Outstanding Mortgage Balance</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ ...bookStyle, color: 'rgba(255,255,255,0.45)', fontSize: 15 }}>$</span>
                    <input
                      style={{ ...inp, paddingLeft: 22 }}
                      value={dollarDisplay(form.mortgage)}
                      placeholder="0"
                      onChange={e => patch({ mortgage: parseDollar(e.target.value) })}
                      onFocus={e=>(e.target.style.borderColor='#85ff00')} onBlur={e=>(e.target.style.borderColor='rgba(255,255,255,0.15)')}
                    />
                  </div>
                </div>

                {/* Target cash */}
                <div>
                  <Label>Target Cash at Close</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ ...bookStyle, color: '#85ff00', fontSize: 15 }}>$</span>
                    <input
                      style={{ ...inp, paddingLeft: 22, borderColor: 'rgba(133,255,0,0.3)' }}
                      value={dollarDisplay(form.targetCash)}
                      placeholder="29,375"
                      onChange={e => patch({ targetCash: parseDollar(e.target.value) })}
                      onFocus={e=>(e.target.style.borderColor='#85ff00')} onBlur={e=>(e.target.style.borderColor='rgba(133,255,0,0.3)')}
                    />
                  </div>
                </div>
              </div>

              {/* Live net proceeds calculator */}
              {askNum > 0 && (
                <div className="rounded-xl p-5 mb-6" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  <p style={{ ...bookStyle, fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 1 }}>
                    Live Net Proceeds Estimate
                  </p>
                  {[
                    { label: 'List price',               val: `$${askNum.toLocaleString()}`,  color: 'white' },
                    { label: 'Agent commission (2.25%)',  val: `−$${fee.toLocaleString()}`,    color: 'rgba(255,130,130,0.9)' },
                    ...(mortNum > 0 ? [{ label: 'Mortgage payoff', val: `−$${mortNum.toLocaleString()}`, color: 'rgba(255,130,130,0.9)' }] : []),
                    { label: 'Est. closing costs (~1%)', val: `−$${closing.toLocaleString()}`, color: 'rgba(255,130,130,0.9)' },
                  ].map(({ label, val, color }) => (
                    <div key={label} className="flex justify-between py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{label}</span>
                      <span style={{ ...heavyStyle, fontSize: 14, color }}>{val}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3">
                    <span style={{ ...heavyStyle, fontSize: 14, color: 'white' }}>Est. cash at close</span>
                    <span style={{ ...heavyStyle, fontSize: 26, color: onTarget ? '#85ff00' : '#f8e71c' }}>
                      ${estCash.toLocaleString()}
                    </span>
                  </div>
                  {form.targetCash > 0 && (
                    <div className="mt-3 rounded-lg px-3 py-2 flex items-center gap-2"
                      style={{ backgroundColor: onTarget ? 'rgba(133,255,0,0.08)' : 'rgba(248,231,28,0.08)' }}>
                      <span style={{ fontSize: 13 }}>{onTarget ? '✓' : '⚠'}</span>
                      <p style={{ ...bookStyle, fontSize: 12, margin: 0, color: onTarget ? '#85ff00' : '#f8e71c' }}>
                        {onTarget
                          ? `$${(estCash - form.targetCash).toLocaleString()} above your target`
                          : `$${(form.targetCash - estCash).toLocaleString()} below your target`}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Timeline */}
              <Label>Desired Timeline</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {TIMELINES.map(t => (
                  <button key={t.id} onClick={() => patch({ timeline: t.id })}
                    className="rounded-xl p-3 text-center transition-all hover:opacity-90"
                    style={{ cursor: 'pointer', border: 'none',
                      backgroundColor: form.timeline === t.id ? 'rgba(133,255,0,0.12)' : 'rgba(0,0,0,0.25)',
                      outline: form.timeline === t.id ? '2px solid rgba(133,255,0,0.4)' : '2px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <p style={{ ...heavyStyle, fontSize: 14, color: form.timeline === t.id ? '#85ff00' : 'white', margin: '0 0 2px' }}>{t.label}</p>
                    <p style={{ ...bookStyle, fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: 0 }}>{t.sub}</p>
                  </button>
                ))}
              </div>

              {/* Motivation */}
              <Label>Primary Reason for Selling</Label>
              <div className="relative">
                <select
                  style={{ ...inp, cursor: 'pointer', appearance: 'none', paddingRight: 32 } as React.CSSProperties}
                  value={form.motivation}
                  onChange={e => patch({ motivation: e.target.value })}
                  onFocus={e=>(e.target.style.borderColor='#85ff00')} onBlur={e=>(e.target.style.borderColor='rgba(255,255,255,0.15)')}
                >
                  <option value="">Select a reason…</option>
                  {MOTIVATIONS.map(m => <option key={m} value={m} style={{ backgroundColor: '#003d8a' }}>{m}</option>)}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Sticky Save Bar ─────────────────────────────────────────────────── */}
      <div
        ref={barRef}
        className="fixed bottom-0 left-0 right-0 transition-all duration-300"
        style={{
          backgroundColor: 'rgba(0,20,70,0.96)',
          backdropFilter: 'blur(18px)',
          borderTop: `1px solid ${dirty ? 'rgba(133,255,0,0.35)' : 'rgba(255,255,255,0.08)'}`,
          transform: (dirty || saved) ? 'translateY(0)' : 'translateY(100%)',
          zIndex: 50,
        }}
      >
        <div className="max-w-[1815px] mx-auto px-[85px] sm:px-8 py-4 flex items-center justify-between gap-4">
          <div>
            {dirty ? (
              <p style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
                You have <span style={heavyStyle}>unsaved changes</span>
              </p>
            ) : saved ? (
              <p style={{ ...bookStyle, fontSize: 13, color: '#85ff00', margin: 0 }}>
                ✓ All changes saved
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setForm(source); setDirty(false); setSaved(false); }}
              className="rounded-xl px-5 py-2.5 hover:opacity-80 transition-opacity"
              style={{ ...bookStyle, fontSize: 14, color: 'rgba(255,255,255,0.45)', backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer' }}
            >
              Discard
            </button>
            <button
              onClick={handleSave}
              disabled={!dirty}
              className="rounded-xl px-7 py-2.5 hover:opacity-90 transition-opacity"
              style={{ ...heavyStyle, fontSize: 14, backgroundColor: dirty ? '#85ff00' : 'rgba(133,255,0,0.3)', color: '#004dab', border: 'none', cursor: dirty ? 'pointer' : 'default' }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

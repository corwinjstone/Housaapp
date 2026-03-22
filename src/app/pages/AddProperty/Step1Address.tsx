import { useState } from 'react';
import { useNavigate } from 'react-router';
import { usePropertyForm } from '../../context/PropertyFormContext';
import { bookStyle, heavyStyle } from '../../brand';

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
];

const card: React.CSSProperties = {
  backgroundColor: 'rgba(0,0,0,0.25)',
  borderRadius: 16,
  padding: '28px 32px',
  marginBottom: 16,
};

function Field({ label, error, children, className = '' }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block mb-1.5" style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
        {label}
      </label>
      {children}
      {error && <p style={{ ...bookStyle, fontSize: 12, color: '#ff6b6b', marginTop: 4 }}>{error}</p>}
    </div>
  );
}

function inp(extra?: React.CSSProperties): React.CSSProperties {
  return {
    width: '100%', borderRadius: 10, padding: '12px 16px',
    backgroundColor: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.18)',
    color: 'white', outline: 'none',
    ...bookStyle, fontSize: 15,
    ...extra,
  };
}

export function Step1Address() {
  const { data, update } = usePropertyForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!data.streetAddress.trim()) e.streetAddress = 'Street address is required';
    if (!data.city.trim())          e.city           = 'City is required';
    if (!data.state)                e.state          = 'State is required';
    if (data.zip.length < 5)        e.zip            = 'Enter a valid 5-digit ZIP';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (validate()) navigate('/add-property/details');
  }

  function focus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = '#85ff00';
  }
  function blur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
  }

  const previewReady = data.streetAddress || data.city;

  return (
    <div className="max-w-[860px] mx-auto px-8 pb-16">
      <div style={card}>
        {/* Row 1: Street + Unit */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <Field label="Street Address *" error={errors.streetAddress} className="sm:col-span-2">
            <input
              style={inp()}
              placeholder="123 Main Street"
              value={data.streetAddress}
              onChange={e => update({ streetAddress: e.target.value })}
              onFocus={focus} onBlur={blur}
            />
          </Field>
          <Field label="Unit / Apt # (optional)">
            <input
              style={inp()}
              placeholder="Apt 4B"
              value={data.unit}
              onChange={e => update({ unit: e.target.value })}
              onFocus={focus} onBlur={blur}
            />
          </Field>
        </div>

        {/* Row 2: City + State + ZIP */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="City *" error={errors.city}>
            <input
              style={inp()}
              placeholder="Dallas"
              value={data.city}
              onChange={e => update({ city: e.target.value })}
              onFocus={focus} onBlur={blur}
            />
          </Field>
          <Field label="State *" error={errors.state}>
            <div className="relative">
              <select
                style={{ ...inp(), cursor: 'pointer', appearance: 'none' } as React.CSSProperties}
                value={data.state}
                onChange={e => update({ state: e.target.value })}
                onFocus={focus} onBlur={blur}
              >
                <option value="">Select state</option>
                {US_STATES.map(s => (
                  <option key={s} value={s} style={{ backgroundColor: '#003d8a' }}>{s}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </Field>
          <Field label="ZIP Code *" error={errors.zip}>
            <input
              style={inp()}
              placeholder="75201"
              maxLength={5}
              value={data.zip}
              onChange={e => update({ zip: e.target.value.replace(/\D/g, '') })}
              onFocus={focus} onBlur={blur}
            />
          </Field>
        </div>

        {/* Address preview */}
        {previewReady && (
          <div className="mt-6 rounded-xl p-4" style={{ backgroundColor: 'rgba(133,255,0,0.07)', border: '1px solid rgba(133,255,0,0.2)' }}>
            <p style={{ ...bookStyle, fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: '0 0 4px' }}>
              Address preview
            </p>
            <p style={{ ...heavyStyle, fontSize: 16, color: 'white', margin: '0 0 2px' }}>
              {[data.streetAddress, data.unit].filter(Boolean).join(', ')}
            </p>
            <p style={{ ...bookStyle, fontSize: 14, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
              {[data.city, data.state, data.zip].filter(Boolean).join(', ')}
            </p>
          </div>
        )}
      </div>

      {/* Map placeholder */}
      <div
        className="rounded-2xl flex flex-col items-center justify-center gap-2 mb-8"
        style={{ height: 180, backgroundColor: 'rgba(0,0,0,0.18)', border: '1px dashed rgba(255,255,255,0.12)' }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.5"/>
        </svg>
        <p style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.22)', margin: 0 }}>
          Map preview
        </p>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          style={{ ...bookStyle, fontSize: 14, color: 'rgba(255,255,255,0.45)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ← Cancel
        </button>
        <button
          onClick={handleNext}
          className="rounded-xl px-8 py-3 hover:opacity-90 transition-opacity"
          style={{ ...heavyStyle, backgroundColor: '#85ff00', color: '#004dab', fontSize: 15, border: 'none', cursor: 'pointer' }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
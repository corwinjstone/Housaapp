import { useNavigate } from 'react-router';
import { usePropertyForm } from '../../context/PropertyFormContext';
import { bookStyle, heavyStyle } from '../../brand';

const PROP_TYPES = [
  {
    id: 'single-family',
    label: 'Single Family',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 16L16 5L28 16V28H20V20H12V28H4V16Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'condo',
    label: 'Condo',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="6" width="20" height="22" rx="1" stroke="currentColor" strokeWidth="2"/>
        <line x1="6" y1="13" x2="26" y2="13" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="6" y1="20" x2="26" y2="20" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="13" y="22" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 'townhouse',
    label: 'Townhouse',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M2 17L8 10L14 17V28H2V17Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M12 15L18 8L24 15V28H12V15Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M22 17L28 10L34 17" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    id: 'multi-family',
    label: 'Multi-Family',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="12" height="24" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="16" y="10" width="12" height="18" rx="1" stroke="currentColor" strokeWidth="2"/>
        <line x1="4" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="4" y1="20" x2="16" y2="20" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="16" y1="18" x2="28" y2="18" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
];

function Stepper({
  value, onChange, min = 0, max = 10,
}: {
  value: number; onChange: (v: number) => void; min?: number; max?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
        style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>
      <span style={{ ...heavyStyle, fontSize: 22, color: 'white', minWidth: 28, textAlign: 'center' }}>
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
        style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 3v8M3 7h8" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>
    </div>
  );
}

const inpStyle: React.CSSProperties = {
  width: '100%', borderRadius: 10, padding: '12px 16px',
  backgroundColor: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.18)',
  color: 'white', outline: 'none',
  ...bookStyle, fontSize: 15,
};

function focus(e: React.FocusEvent<HTMLInputElement>) { e.currentTarget.style.borderColor = '#85ff00'; }
function blur(e: React.FocusEvent<HTMLInputElement>)  { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }

export function Step2Details() {
  const { data, update } = usePropertyForm();
  const navigate = useNavigate();

  return (
    <div className="max-w-[1815px] mx-auto px-[85px] sm:px-8 pb-16">

      {/* Property Type */}
      <div className="rounded-2xl p-6 sm:p-8 mb-4" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}>
        <p style={{ ...heavyStyle, fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
          Property Type
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PROP_TYPES.map(t => {
            const active = data.propertyType === t.id;
            return (
              <button
                key={t.id}
                onClick={() => update({ propertyType: t.id })}
                className="rounded-xl p-4 flex flex-col items-center gap-3 transition-all hover:opacity-90"
                style={{
                  backgroundColor: active ? 'rgba(133,255,0,0.12)' : 'rgba(0,0,0,0.2)',
                  border: `2px solid ${active ? '#85ff00' : 'rgba(255,255,255,0.1)'}`,
                  cursor: 'pointer',
                  color: active ? '#85ff00' : 'rgba(255,255,255,0.5)',
                }}
              >
                {t.icon}
                <span style={{ ...bookStyle, fontSize: 13, color: active ? '#85ff00' : 'rgba(255,255,255,0.7)' }}>
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rooms */}
      <div className="rounded-2xl p-6 sm:p-8 mb-4" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}>
        <p style={{ ...heavyStyle, fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>
          Rooms
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: 'Bedrooms',       val: data.bedrooms,    key: 'bedrooms',    min: 1, max: 10 },
            { label: 'Bathrooms',      val: data.bathrooms,   key: 'bathrooms',   min: 1, max: 8  },
            { label: 'Garage Spaces',  val: data.garageSpaces,key: 'garageSpaces',min: 0, max: 5  },
          ].map(({ label, val, key, min, max }) => (
            <div key={key} className="flex flex-col gap-2">
              <span style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{label}</span>
              <Stepper
                value={val}
                onChange={v => update({ [key]: v } as any)}
                min={min}
                max={max}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Size & Age */}
      <div className="rounded-2xl p-6 sm:p-8 mb-8" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}>
        <p style={{ ...heavyStyle, fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
          Size & Age
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1.5" style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
              Square Footage
            </label>
            <div className="relative">
              <input
                style={inpStyle}
                placeholder="e.g. 2,200"
                value={data.sqft}
                onChange={e => update({ sqft: e.target.value.replace(/[^0-9,]/g, '') })}
                onFocus={focus} onBlur={blur}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2" style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
                sq ft
              </span>
            </div>
          </div>
          <div>
            <label className="block mb-1.5" style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
              Year Built
            </label>
            <input
              style={inpStyle}
              placeholder="e.g. 1998"
              maxLength={4}
              value={data.yearBuilt}
              onChange={e => update({ yearBuilt: e.target.value.replace(/\D/g, '') })}
              onFocus={focus} onBlur={blur}
            />
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/add-property')}
          style={{ ...bookStyle, fontSize: 14, color: 'rgba(255,255,255,0.45)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ← Back
        </button>
        <button
          onClick={() => navigate('/add-property/features')}
          className="rounded-xl px-8 py-3 hover:opacity-90 transition-opacity"
          style={{ ...heavyStyle, backgroundColor: '#85ff00', color: '#004dab', fontSize: 15, border: 'none', cursor: 'pointer' }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
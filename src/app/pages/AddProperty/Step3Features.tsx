import { useNavigate } from 'react-router';
import { usePropertyForm } from '../../context/PropertyFormContext';
import { bookStyle, heavyStyle } from '../../brand';

const ALL_FEATURES = [
  'Pool', 'Hot Tub / Spa', 'Fireplace', 'Updated Kitchen', 'Updated Bathrooms',
  'Hardwood Floors', 'New Roof (5 yrs)', 'New HVAC (5 yrs)', 'Solar Panels',
  'Smart Home', 'Basement', 'In-Law Suite', 'Home Office', 'Outdoor Kitchen',
  'Waterfront', 'Corner Lot', 'Cul-de-sac', 'New Windows', 'Recently Painted',
  'EV Charger',
];

const CONDITIONS = [
  { label: 'Needs Major Work', desc: 'Significant repairs needed' },
  { label: 'Fixer Upper',      desc: 'Some repairs / updates' },
  { label: 'Good Condition',   desc: 'Well maintained' },
  { label: 'Very Good',        desc: 'Move-in ready with minor touches' },
  { label: 'Move-in Ready',    desc: 'Pristine condition' },
];

const inpStyle: React.CSSProperties = {
  width: '100%', borderRadius: 10, padding: '12px 16px',
  backgroundColor: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.18)',
  color: 'white', outline: 'none',
  ...bookStyle, fontSize: 15,
};

export function Step3Features() {
  const { data, update } = usePropertyForm();
  const navigate = useNavigate();

  function toggleFeature(f: string) {
    const next = data.features.includes(f)
      ? data.features.filter(x => x !== f)
      : [...data.features, f];
    update({ features: next });
  }

  return (
    <div className="max-w-[860px] mx-auto px-8 pb-16">

      {/* Feature chips */}
      <div className="rounded-2xl p-6 sm:p-8 mb-4" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}>
        <p style={{ ...heavyStyle, fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>
          Property Features
        </p>
        <p style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
          Select all that apply
        </p>
        <div className="flex flex-wrap gap-2">
          {ALL_FEATURES.map(f => {
            const active = data.features.includes(f);
            return (
              <button
                key={f}
                onClick={() => toggleFeature(f)}
                className="rounded-full px-4 py-2 transition-all hover:opacity-90"
                style={{
                  ...bookStyle, fontSize: 13,
                  backgroundColor: active ? 'rgba(133,255,0,0.15)' : 'rgba(255,255,255,0.07)',
                  border: `1.5px solid ${active ? '#85ff00' : 'rgba(255,255,255,0.15)'}`,
                  color: active ? '#85ff00' : 'rgba(255,255,255,0.65)',
                  cursor: 'pointer',
                }}
              >
                {active && <span style={{ marginRight: 5 }}>✓</span>}
                {f}
              </button>
            );
          })}
        </div>
        {data.features.length > 0 && (
          <p style={{ ...bookStyle, fontSize: 12, color: 'rgba(133,255,0,0.7)', marginTop: 12 }}>
            {data.features.length} feature{data.features.length !== 1 ? 's' : ''} selected
          </p>
        )}
      </div>

      {/* Condition */}
      <div className="rounded-2xl p-6 sm:p-8 mb-4" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}>
        <p style={{ ...heavyStyle, fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
          Overall Condition
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          {CONDITIONS.map((c, i) => {
            const active = data.condition === i;
            return (
              <button
                key={i}
                onClick={() => update({ condition: i })}
                className="flex-1 rounded-xl p-3 text-left transition-all hover:opacity-90"
                style={{
                  backgroundColor: active ? 'rgba(133,255,0,0.12)' : 'rgba(0,0,0,0.2)',
                  border: `2px solid ${active ? '#85ff00' : 'rgba(255,255,255,0.1)'}`,
                  cursor: 'pointer',
                }}
              >
                <div
                  className="w-full h-1 rounded-full mb-3"
                  style={{ backgroundColor: active ? '#85ff00' : 'rgba(255,255,255,0.15)' }}
                />
                <p style={{ ...heavyStyle, fontSize: 12, color: active ? '#85ff00' : 'white', margin: '0 0 3px' }}>
                  {c.label}
                </p>
                <p style={{ ...bookStyle, fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                  {c.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* HOA */}
      <div className="rounded-2xl p-6 sm:p-8 mb-8" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p style={{ ...heavyStyle, fontSize: 14, color: 'white', margin: 0 }}>HOA</p>
            <p style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '2px 0 0' }}>
              Does this property have a homeowners association?
            </p>
          </div>
          {/* Toggle */}
          <button
            onClick={() => update({ hasHOA: !data.hasHOA })}
            className="rounded-full transition-all"
            style={{
              width: 48, height: 26, border: 'none', cursor: 'pointer',
              backgroundColor: data.hasHOA ? '#85ff00' : 'rgba(255,255,255,0.15)',
              position: 'relative',
            }}
          >
            <span
              className="absolute top-[3px] rounded-full transition-all duration-200"
              style={{
                width: 20, height: 20, backgroundColor: 'white',
                left: data.hasHOA ? 25 : 3,
              }}
            />
          </button>
        </div>
        {data.hasHOA && (
          <div>
            <label className="block mb-1.5" style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
              Monthly HOA Fee
            </label>
            <div className="relative max-w-[200px]">
              <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ ...bookStyle, color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>$</span>
              <input
                style={{ ...inpStyle, paddingLeft: 28 }}
                placeholder="250"
                value={data.hoaFee}
                onChange={e => update({ hoaFee: e.target.value.replace(/\D/g, '') })}
                onFocus={e => (e.target.style.borderColor = '#85ff00')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.18)')}
              />
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/add-property/details')}
          style={{ ...bookStyle, fontSize: 14, color: 'rgba(255,255,255,0.45)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ← Back
        </button>
        <button
          onClick={() => navigate('/add-property/photos')}
          className="rounded-xl px-8 py-3 hover:opacity-90 transition-opacity"
          style={{ ...heavyStyle, backgroundColor: '#85ff00', color: '#004dab', fontSize: 15, border: 'none', cursor: 'pointer' }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

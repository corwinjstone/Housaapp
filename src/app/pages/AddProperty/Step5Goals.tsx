import { useNavigate } from 'react-router';
import { usePropertyForm } from '../../context/PropertyFormContext';
import { bookStyle, heavyStyle } from '../../brand';

const TIMELINES = [
  { id: 'asap', label: 'ASAP',    sub: 'Under 2 weeks' },
  { id: '30',   label: '30 days', sub: '~1 month'       },
  { id: '60',   label: '60 days', sub: '~2 months'      },
  { id: '90+',  label: '90+ days',sub: 'No rush'        },
];

const MOTIVATIONS = [
  'Relocating for work',
  'Downsizing',
  'Upgrading to larger home',
  'Divorce / separation',
  'Estate / inheritance',
  'Investment property',
  'Other',
];

function formatCurrency(raw: string) {
  const n = parseInt(raw.replace(/\D/g, '') || '0', 10);
  return n.toLocaleString('en-US');
}

function parseDollar(raw: string) {
  return parseInt(raw.replace(/\D/g, '') || '0', 10);
}

export function Step5Goals() {
  const { data, update } = usePropertyForm();
  const navigate = useNavigate();

  const askingNum    = parseDollar(data.askingPrice);
  const commissionPct = 0.0225;
  const fee          = Math.round(askingNum * commissionPct);
  const estimated    = askingNum - fee;

  const inpStyle: React.CSSProperties = {
    width: '100%', borderRadius: 10, padding: '12px 16px',
    backgroundColor: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.18)',
    color: 'white', outline: 'none',
    ...bookStyle, fontSize: 15,
  };

  return (
    <div className="max-w-[860px] mx-auto px-8 pb-16">

      {/* Asking price + estimate */}
      <div className="rounded-2xl p-6 sm:p-8 mb-4" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}>
        <p style={{ ...heavyStyle, fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
          Asking Price
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1.5" style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
              List Price
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ ...bookStyle, color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>$</span>
              <input
                style={{ ...inpStyle, paddingLeft: 26 }}
                placeholder="250,000"
                value={data.askingPrice ? formatCurrency(data.askingPrice) : ''}
                onChange={e => update({ askingPrice: e.target.value.replace(/\D/g, '') })}
                onFocus={e => (e.target.style.borderColor = '#85ff00')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.18)')}
              />
            </div>
          </div>
          <div>
            <label className="block mb-1.5" style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
              Your Target Cash at Close
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ ...bookStyle, color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>$</span>
              <input
                style={{ ...inpStyle, paddingLeft: 26 }}
                placeholder="29,375"
                value={data.targetCashAtClose ? formatCurrency(data.targetCashAtClose) : ''}
                onChange={e => update({ targetCashAtClose: e.target.value.replace(/\D/g, '') })}
                onFocus={e => (e.target.style.borderColor = '#85ff00')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.18)')}
              />
            </div>
          </div>
        </div>

        {/* Fee estimate */}
        {askingNum > 0 && (
          <div className="mt-5 rounded-xl p-4" style={{ backgroundColor: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '0 0 10px' }}>
              Estimated fee breakdown (2.25% commission)
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: 'List price',        val: `$${formatCurrency(data.askingPrice)}`,           color: 'white'               },
                { label: 'Agent fee (2.25%)', val: `−$${fee.toLocaleString()}`,                      color: 'rgba(255,120,120,0.9)'},
                { label: 'Est. cash at close',val: `$${estimated.toLocaleString()}`,                 color: '#85ff00'             },
              ].map(({ label, val, color }) => (
                <div key={label} className="flex justify-between items-center">
                  <span style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{label}</span>
                  <span style={{ ...heavyStyle, fontSize: 15, color }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="rounded-2xl p-6 sm:p-8 mb-4" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}>
        <p style={{ ...heavyStyle, fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
          Desired Timeline
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TIMELINES.map(t => {
            const active = data.timeline === t.id;
            return (
              <button
                key={t.id}
                onClick={() => update({ timeline: t.id })}
                className="rounded-xl p-4 text-center transition-all hover:opacity-90"
                style={{
                  backgroundColor: active ? 'rgba(133,255,0,0.12)' : 'rgba(0,0,0,0.2)',
                  border: `2px solid ${active ? '#85ff00' : 'rgba(255,255,255,0.1)'}`,
                  cursor: 'pointer',
                }}
              >
                <p style={{ ...heavyStyle, fontSize: 15, color: active ? '#85ff00' : 'white', margin: '0 0 3px' }}>
                  {t.label}
                </p>
                <p style={{ ...bookStyle, fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                  {t.sub}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Motivation */}
      <div className="rounded-2xl p-6 sm:p-8 mb-8" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}>
        <p style={{ ...heavyStyle, fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
          Primary Reason for Selling
        </p>
        <div className="relative">
          <select
            style={{ ...inpStyle, cursor: 'pointer', appearance: 'none' } as React.CSSProperties}
            value={data.motivation}
            onChange={e => update({ motivation: e.target.value })}
            onFocus={e => (e.target.style.borderColor = '#85ff00')}
            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.18)')}
          >
            <option value="">Select a reason…</option>
            {MOTIVATIONS.map(m => (
              <option key={m} value={m} style={{ backgroundColor: '#003d8a' }}>{m}</option>
            ))}
          </select>
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/add-property/photos')}
          style={{ ...bookStyle, fontSize: 14, color: 'rgba(255,255,255,0.45)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ← Back
        </button>
        <button
          onClick={() => navigate('/add-property/review')}
          className="rounded-xl px-8 py-3 hover:opacity-90 transition-opacity"
          style={{ ...heavyStyle, backgroundColor: '#85ff00', color: '#004dab', fontSize: 15, border: 'none', cursor: 'pointer' }}
        >
          Review Listing →
        </button>
      </div>
    </div>
  );
}

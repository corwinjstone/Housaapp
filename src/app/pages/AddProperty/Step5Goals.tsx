import { useNavigate } from 'react-router';
import { usePropertyForm } from '../../context/PropertyFormContext';
import { bookStyle, heavyStyle } from '../../brand';

const TIMELINES = [
  { id: 'asap', label: 'ASAP',     sub: 'Under 2 weeks' },
  { id: '30',   label: '30 days',  sub: '~1 month'      },
  { id: '60',   label: '60 days',  sub: '~2 months'     },
  { id: '90+',  label: '90+ days', sub: 'No rush'       },
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

function parseDollar(raw: string) {
  return parseInt(raw.replace(/\D/g, '') || '0', 10);
}
function formatCurrency(raw: string) {
  const n = parseDollar(raw);
  return n > 0 ? n.toLocaleString('en-US') : '';
}

const inpBase: React.CSSProperties = {
  width: '100%', borderRadius: 10, padding: '12px 16px',
  backgroundColor: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.18)',
  color: 'white', outline: 'none',
  ...bookStyle, fontSize: 15,
};

function DollarInput({
  label, sublabel, placeholder, value, onChange,
  highlight = false,
}: {
  label: string; sublabel?: string; placeholder: string;
  value: string; onChange: (v: string) => void; highlight?: boolean;
}) {
  return (
    <div>
      <label className="block mb-0.5" style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
        {label}
      </label>
      {sublabel && (
        <p style={{ ...bookStyle, fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: '0 0 6px' }}>{sublabel}</p>
      )}
      <div className="relative">
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2"
          style={{ ...bookStyle, color: highlight ? '#85ff00' : 'rgba(255,255,255,0.5)', fontSize: 16 }}
        >
          $
        </span>
        <input
          style={{ ...inpBase, paddingLeft: 26, borderColor: highlight ? 'rgba(133,255,0,0.35)' : undefined }}
          placeholder={placeholder}
          value={formatCurrency(value)}
          onChange={e => onChange(e.target.value.replace(/\D/g, ''))}
          onFocus={e => (e.target.style.borderColor = '#85ff00')}
          onBlur={e => (e.target.style.borderColor = highlight ? 'rgba(133,255,0,0.35)' : 'rgba(255,255,255,0.18)')}
        />
      </div>
    </div>
  );
}

export function Step5Goals() {
  const { data, update } = usePropertyForm();
  const navigate = useNavigate();

  const askingNum   = parseDollar(data.askingPrice);
  const mortgageNum = parseDollar(data.mortgage);
  const commPct     = 0.0225;
  const fee         = Math.round(askingNum * commPct);
  const closingCosts= Math.round(askingNum * 0.01);
  const estimated   = Math.max(0, askingNum - fee - mortgageNum - closingCosts);

  const breakdownRows = [
    { label: 'List price',          val: askingNum > 0 ? `$${askingNum.toLocaleString()}` : '—',     color: 'white',                 sign: '' },
    { label: 'Agent commission (2.25%)', val: fee > 0 ? `−$${fee.toLocaleString()}` : '—',           color: 'rgba(255,130,130,0.9)', sign: '−' },
    ...(mortgageNum > 0 ? [{ label: 'Mortgage payoff',  val: `−$${mortgageNum.toLocaleString()}`,    color: 'rgba(255,130,130,0.9)', sign: '−' }] : []),
    { label: 'Est. closing costs (~1%)', val: closingCosts > 0 ? `−$${closingCosts.toLocaleString()}` : '—', color: 'rgba(255,130,130,0.9)', sign: '−' },
  ];

  return (
    <div className="max-w-[1815px] mx-auto px-[85px] sm:px-8 pb-16">

      {/* ── Pricing card ── */}
      <div className="rounded-2xl p-6 sm:p-8 mb-4" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}>
        <p style={{ ...heavyStyle, fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
          Asking Price & Mortgage
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <DollarInput
            label="List Price"
            placeholder="250,000"
            value={data.askingPrice}
            onChange={v => update({ askingPrice: v })}
          />
          <DollarInput
            label="Outstanding Mortgage Balance"
            sublabel="Current payoff amount — leave blank if none"
            placeholder="0"
            value={data.mortgage}
            onChange={v => update({ mortgage: v })}
          />
        </div>
        <DollarInput
          label="Your Target Cash at Close"
          sublabel="What you want to walk away with after all deductions"
          placeholder="29,375"
          value={data.targetCashAtClose}
          onChange={v => update({ targetCashAtClose: v })}
          highlight
        />

        {/* Live estimate breakdown */}
        {askingNum > 0 && (
          <div className="mt-5 rounded-xl p-4" style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p style={{ ...bookStyle, fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 1 }}>
              Estimated Net Proceeds
            </p>
            {breakdownRows.map(({ label, val, color }) => (
              <div key={label} className="flex justify-between items-center py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{label}</span>
                <span style={{ ...heavyStyle, fontSize: 14, color }}>{val}</span>
              </div>
            ))}
            {/* Estimated cash at close total */}
            <div className="flex justify-between items-center pt-3 mt-1">
              <span style={{ ...heavyStyle, fontSize: 14, color: 'white' }}>Est. cash at close</span>
              <span
                style={{
                  ...heavyStyle,
                  fontSize: 22,
                  color: data.targetCashAtClose && estimated >= parseDollar(data.targetCashAtClose)
                    ? '#85ff00'
                    : estimated > 0 ? '#f8e71c' : 'rgba(255,255,255,0.4)',
                }}
              >
                ${estimated.toLocaleString()}
              </span>
            </div>
            {/* Goal comparison */}
            {data.targetCashAtClose && parseDollar(data.targetCashAtClose) > 0 && estimated > 0 && (
              <div
                className="mt-3 rounded-lg px-3 py-2 flex items-center gap-2"
                style={{
                  backgroundColor: estimated >= parseDollar(data.targetCashAtClose)
                    ? 'rgba(133,255,0,0.1)'
                    : 'rgba(248,231,28,0.1)',
                }}
              >
                <span style={{ fontSize: 14 }}>
                  {estimated >= parseDollar(data.targetCashAtClose) ? '✓' : '⚠'}
                </span>
                <p style={{ ...bookStyle, fontSize: 12, margin: 0, color: estimated >= parseDollar(data.targetCashAtClose) ? '#85ff00' : '#f8e71c' }}>
                  {estimated >= parseDollar(data.targetCashAtClose)
                    ? `You're on track — estimated is $${(estimated - parseDollar(data.targetCashAtClose)).toLocaleString()} above your goal`
                    : `You're $${(parseDollar(data.targetCashAtClose) - estimated).toLocaleString()} below your goal — consider a higher list price`
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Timeline ── */}
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
                <p style={{ ...heavyStyle, fontSize: 15, color: active ? '#85ff00' : 'white', margin: '0 0 3px' }}>{t.label}</p>
                <p style={{ ...bookStyle, fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0 }}>{t.sub}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Motivation ── */}
      <div className="rounded-2xl p-6 sm:p-8 mb-8" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}>
        <p style={{ ...heavyStyle, fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
          Primary Reason for Selling
        </p>
        <div className="relative">
          <select
            style={{ ...inpBase, cursor: 'pointer', appearance: 'none' } as React.CSSProperties}
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
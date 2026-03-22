import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { usePropertyForm } from '../../context/PropertyFormContext';
import { bookStyle, heavyStyle } from '../../brand';

const CONDITIONS = ['Needs Major Work','Fixer Upper','Good Condition','Very Good','Move-in Ready'];
const TIMELINES: Record<string, string> = {
  asap: 'ASAP (under 2 weeks)',
  '30': '30 days',
  '60': '60 days',
  '90+': '90+ days',
};

function fmt(n: string) {
  const v = parseInt(n.replace(/\D/g,'') || '0', 10);
  return '$' + v.toLocaleString('en-US');
}

function SectionCard({
  title, editPath, children,
}: {
  title: string; editPath: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl p-5 sm:p-6 mb-4" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}>
      <div className="flex items-center justify-between mb-4">
        <p style={{ ...heavyStyle, fontSize: 14, color: 'white', margin: 0 }}>{title}</p>
        <Link
          to={editPath}
          style={{ ...bookStyle, fontSize: 12, color: '#85ff00', textDecoration: 'none' }}
          className="hover:underline"
        >
          Edit
        </Link>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <span style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{label}</span>
      <span style={{ ...bookStyle, fontSize: 13, color: 'white', textAlign: 'right', maxWidth: '55%' }}>{value || '—'}</span>
    </div>
  );
}

export function Step6Review() {
  const { data } = usePropertyForm();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fullAddress = [
    [data.streetAddress, data.unit].filter(Boolean).join(', '),
    data.city, data.state, data.zip,
  ].filter(Boolean).join(', ');

  const propTypeLabels: Record<string, string> = {
    'single-family': 'Single Family',
    'condo': 'Condo',
    'townhouse': 'Townhouse',
    'multi-family': 'Multi-Family',
  };

  function handleSubmit() {
    if (!agreed) return;
    setSubmitting(true);
    setTimeout(() => {
      navigate('/property-submitted', { state: { formData: data } });
    }, 1200);
  }

  return (
    <div className="max-w-[860px] mx-auto px-8 pb-16">

      {/* Primary photo preview */}
      {data.photos.length > 0 && (
        <div className="rounded-2xl overflow-hidden mb-4" style={{ height: 200, position: 'relative' }}>
          <img
            src={data.photos[data.primaryPhotoIndex]?.url}
            alt="Primary"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,77,171,0.6), transparent)' }} />
          <div className="absolute bottom-4 left-5">
            <p style={{ ...heavyStyle, fontSize: 20, color: 'white', margin: 0 }}>{fullAddress}</p>
            <p style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: '2px 0 0' }}>
              {data.photos.length} photo{data.photos.length !== 1 ? 's' : ''} uploaded
            </p>
          </div>
        </div>
      )}

      {/* Section 1: Address */}
      <SectionCard title="Property Address" editPath="/add-property">
        <Row label="Address" value={fullAddress || '—'} />
      </SectionCard>

      {/* Section 2: Details */}
      <SectionCard title="Property Details" editPath="/add-property/details">
        <Row label="Type"          value={propTypeLabels[data.propertyType] || '—'} />
        <Row label="Bedrooms"      value={data.bedrooms.toString()} />
        <Row label="Bathrooms"     value={data.bathrooms.toString()} />
        <Row label="Square Footage" value={data.sqft ? `${data.sqft} sq ft` : '—'} />
        <Row label="Year Built"    value={data.yearBuilt || '—'} />
        <Row label="Garage Spaces" value={data.garageSpaces.toString()} />
      </SectionCard>

      {/* Section 3: Features */}
      <SectionCard title="Features & Condition" editPath="/add-property/features">
        <Row label="Condition" value={CONDITIONS[data.condition] ?? '—'} />
        <Row label="HOA" value={data.hasHOA ? `Yes — $${data.hoaFee || '?'}/mo` : 'No'} />
        {data.features.length > 0 && (
          <div className="pt-2">
            <p style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '0 0 8px' }}>Features</p>
            <div className="flex flex-wrap gap-1.5">
              {data.features.map(f => (
                <span
                  key={f}
                  className="rounded-full px-3 py-1"
                  style={{ ...bookStyle, fontSize: 12, backgroundColor: 'rgba(133,255,0,0.1)', color: '#85ff00', border: '1px solid rgba(133,255,0,0.2)' }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}
      </SectionCard>

      {/* Section 4: Photos */}
      <SectionCard title="Photos" editPath="/add-property/photos">
        {data.photos.length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            {data.photos.slice(0, 6).map((p, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden" style={{ width: 64, height: 48 }}>
                <img src={p.url} alt={p.name} className="w-full h-full object-cover"/>
                {i === data.primaryPhotoIndex && (
                  <div className="absolute top-0.5 left-0.5 rounded px-1" style={{ backgroundColor: '#85ff00' }}>
                    <span style={{ ...heavyStyle, fontSize: 8, color: '#004dab' }}>★</span>
                  </div>
                )}
              </div>
            ))}
            {data.photos.length > 6 && (
              <div className="rounded-lg flex items-center justify-center" style={{ width: 64, height: 48, backgroundColor: 'rgba(255,255,255,0.08)' }}>
                <span style={{ ...bookStyle, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>+{data.photos.length - 6}</span>
              </div>
            )}
          </div>
        ) : (
          <p style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>No photos uploaded</p>
        )}
      </SectionCard>

      {/* Section 5: Goals */}
      <SectionCard title="Pricing & Goals" editPath="/add-property/goals">
        <Row label="List Price"              value={data.askingPrice ? fmt(data.askingPrice) : '—'} />
        <Row label="Mortgage Balance"        value={data.mortgage ? fmt(data.mortgage) : 'None'} />
        <Row label="Target Cash at Close"    value={data.targetCashAtClose ? fmt(data.targetCashAtClose) : '—'} />
        <Row label="Timeline"               value={TIMELINES[data.timeline] ?? '—'} />
        <Row label="Reason for Selling"     value={data.motivation || '—'} />
      </SectionCard>

      {/* Agreement */}
      <div className="rounded-2xl p-6 mb-8" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}>
        <button
          onClick={() => setAgreed(!agreed)}
          className="flex items-start gap-3 text-left w-full"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <div
            className="shrink-0 mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-all"
            style={{
              backgroundColor: agreed ? '#85ff00' : 'transparent',
              border: `2px solid ${agreed ? '#85ff00' : 'rgba(255,255,255,0.3)'}`,
            }}
          >
            {agreed && (
              <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                <path d="M1 3.64L4.27 7L10 1" stroke="#004dab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <p style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
            I certify that all information provided is accurate and I am authorized to list this property on the Housa marketplace.
          </p>
        </button>
      </div>

      {/* Submit */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/add-property/goals')}
          style={{ ...bookStyle, fontSize: 14, color: 'rgba(255,255,255,0.45)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ← Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!agreed || submitting}
          className="rounded-xl px-8 py-3 transition-all"
          style={{
            ...heavyStyle,
            fontSize: 15,
            border: 'none',
            cursor: agreed && !submitting ? 'pointer' : 'not-allowed',
            backgroundColor: agreed ? '#85ff00' : 'rgba(133,255,0,0.3)',
            color: agreed ? '#004dab' : 'rgba(0,77,171,0.5)',
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? 'Submitting…' : 'Submit Listing →'}
        </button>
      </div>
    </div>
  );
}
import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import confetti from 'canvas-confetti';
import { HousaLogo } from '../../components/shared/HousaLogo';
import { bookStyle, heavyStyle, brandFont } from '../../brand';
import type { PropertyFormData } from '../../context/PropertyFormContext';

export function SuccessScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData: PropertyFormData | undefined = location.state?.formData;

  useEffect(() => {
    // Launch confetti burst
    const fire = (opts: confetti.Options) =>
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 }, ...opts });

    setTimeout(() => fire({ colors: ['#85ff00', '#ffffff', '#004dab', '#478fff'] }), 100);
    setTimeout(() => fire({ particleCount: 50, angle: 60,  spread: 55, origin: { x: 0 },   colors: ['#85ff00','#ffffff'] }), 400);
    setTimeout(() => fire({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 },   colors: ['#85ff00','#ffffff'] }), 400);
  }, []);

  const fullAddress = formData
    ? [[formData.streetAddress, formData.unit].filter(Boolean).join(', '), formData.city, formData.state, formData.zip]
        .filter(Boolean).join(', ')
    : '732 Caspian Way, Dallas, TX 75201';

  const propTypeLabels: Record<string, string> = {
    'single-family': 'Single Family',
    'condo': 'Condo',
    'townhouse': 'Townhouse',
    'multi-family': 'Multi-Family',
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#004dab', fontFamily: brandFont }}>

      {/* Minimal nav */}
      <nav style={{ backgroundColor: '#004dab' }}>
        <div className="max-w-[1815px] mx-auto px-[85px] sm:px-8">
          <div className="flex items-center justify-between" style={{ height: 101 }}>
            <Link to="/"><HousaLogo /></Link>
            <span style={{ ...heavyStyle, fontSize: 14, color: 'white' }}>Hello there Corwin</span>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        <div className="max-w-[620px] w-full text-center">

          {/* Animated checkmark */}
          <div
            className="mx-auto mb-6 flex items-center justify-center rounded-full"
            style={{ width: 88, height: 88, backgroundColor: 'rgba(133,255,0,0.15)', border: '3px solid #85ff00' }}
          >
            <svg width="40" height="30" viewBox="0 0 40 30" fill="none">
              <path
                d="M2 14L15 27L38 2"
                stroke="#85ff00"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="60"
                strokeDashoffset="0"
                style={{
                  animation: 'dash 0.6s ease-out forwards',
                }}
              />
            </svg>
          </div>

          <h1 style={{ ...heavyStyle, fontSize: 'clamp(28px, 4vw, 48px)', color: 'white', margin: '0 0 12px' }}>
            Your listing is live!
          </h1>
          <p style={{ ...bookStyle, fontSize: 16, color: 'rgba(255,255,255,0.65)', margin: '0 0 32px' }}>
            Agents are being matched to your property. You'll receive offers within 24–48 hours.
          </p>

          {/* Property card */}
          <div
            className="rounded-2xl p-6 mb-8 text-left"
            style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {/* Primary photo */}
            {formData?.photos && formData.photos.length > 0 ? (
              <div className="rounded-xl overflow-hidden mb-4" style={{ height: 140 }}>
                <img
                  src={formData.photos[formData.primaryPhotoIndex]?.url}
                  alt="Property"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl mb-4 flex items-center justify-center" style={{ height: 100, backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
            )}

            <p style={{ ...heavyStyle, fontSize: 18, color: 'white', margin: '0 0 4px' }}>{fullAddress}</p>

            <div className="flex flex-wrap gap-4 mt-3">
              {formData?.propertyType && (
                <Pill label={propTypeLabels[formData.propertyType] ?? formData.propertyType} />
              )}
              {formData && formData.bedrooms > 0 && (
                <Pill label={`${formData.bedrooms} bd / ${formData.bathrooms} ba`} />
              )}
              {formData?.sqft && <Pill label={`${formData.sqft} sq ft`} />}
              {formData?.askingPrice && (
                <Pill label={`$${parseInt(formData.askingPrice, 10).toLocaleString()}`} highlight />
              )}
            </div>
          </div>

          {/* Next steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {[
              { icon: '📋', label: 'Listing submitted', done: true },
              { icon: '🔍', label: 'Agent matching in progress', done: false },
              { icon: '💬', label: 'Receive offers (24–48 hrs)', done: false },
            ].map((step, i) => (
              <div
                key={i}
                className="rounded-xl p-4 flex flex-col items-center gap-2"
                style={{
                  backgroundColor: step.done ? 'rgba(133,255,0,0.1)' : 'rgba(0,0,0,0.2)',
                  border: `1px solid ${step.done ? 'rgba(133,255,0,0.3)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <span style={{ fontSize: 22 }}>{step.icon}</span>
                <p style={{ ...bookStyle, fontSize: 12, color: step.done ? '#85ff00' : 'rgba(255,255,255,0.5)', margin: 0, textAlign: 'center' }}>
                  {step.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/')}
              className="rounded-xl px-8 py-3 hover:opacity-90 transition-opacity"
              style={{ ...heavyStyle, backgroundColor: '#85ff00', color: '#004dab', fontSize: 15, border: 'none', cursor: 'pointer' }}
            >
              Browse Matched Agents →
            </button>
            <button
              onClick={() => navigate('/add-property')}
              className="rounded-xl px-8 py-3 hover:opacity-80 transition-opacity"
              style={{ ...bookStyle, fontSize: 15, color: 'white', backgroundColor: 'transparent', border: '2px solid rgba(255,255,255,0.25)', cursor: 'pointer' }}
            >
              + List Another Property
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dash {
          from { stroke-dashoffset: 60; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

function Pill({ label, highlight = false }: { label: string; highlight?: boolean }) {
  return (
    <span
      className="rounded-full px-3 py-1"
      style={{
        ...bookStyle, fontSize: 12,
        backgroundColor: highlight ? 'rgba(133,255,0,0.15)' : 'rgba(255,255,255,0.07)',
        color: highlight ? '#85ff00' : 'rgba(255,255,255,0.65)',
        border: `1px solid ${highlight ? 'rgba(133,255,0,0.25)' : 'rgba(255,255,255,0.1)'}`,
      }}
    >
      {label}
    </span>
  );
}

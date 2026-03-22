import { Outlet, useLocation, Link } from 'react-router';
import { HousaLogo } from '../../components/shared/HousaLogo';
import { PropertyFormProvider } from '../../context/PropertyFormContext';
import { bookStyle, heavyStyle, brandFont } from '../../brand';

export const WIZARD_STEPS = [
  { path: '/add-property',          label: 'Property Address'   },
  { path: '/add-property/details',  label: 'Property Details'   },
  { path: '/add-property/features', label: 'Features & Condition'},
  { path: '/add-property/photos',   label: 'Property Photos'    },
  { path: '/add-property/goals',    label: 'Pricing & Goals'    },
  { path: '/add-property/review',   label: 'Review & Submit'    },
];

export function WizardShell() {
  const { pathname } = useLocation();
  const idx = Math.max(0, WIZARD_STEPS.findIndex(s => s.path === pathname));
  const currentStep = idx + 1;
  const stepLabel   = WIZARD_STEPS[idx]?.label ?? '';

  return (
    <PropertyFormProvider>
      <div className="min-h-screen" style={{ backgroundColor: '#004dab', fontFamily: brandFont }}>

        {/* ── Navbar ─────────────────────────────────────────────────────────── */}
        <nav style={{ backgroundColor: '#004dab' }}>
          <div className="max-w-[1815px] mx-auto px-[85px] sm:px-8">
            <div className="flex items-center justify-between" style={{ height: 101 }}>
              <Link to="/"><HousaLogo /></Link>
              <div className="flex items-center gap-4">
                <Link
                  to="/"
                  className="hidden sm:flex items-center gap-1.5 rounded-lg px-4 py-2 transition-opacity hover:opacity-80"
                  style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  ← Back to listings
                </Link>
                <span style={{ ...heavyStyle, fontSize: 14, color: 'white' }}>
                  Hello there Corwin
                </span>
              </div>
            </div>
          </div>
        </nav>

        {/* ── Step header + progress bar ─────────────────────────────────────── */}
        <div className="max-w-[860px] mx-auto px-8" style={{ paddingTop: 40 }}>
          <p style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
            Step {currentStep} of {WIZARD_STEPS.length} — List Your Property
          </p>
          <h1 style={{ ...heavyStyle, fontSize: 'clamp(22px, 3vw, 38px)', color: 'white', margin: '6px 0 0' }}>
            {stepLabel}
          </h1>

          {/* Progress segments */}
          <div className="flex gap-[6px] mt-5 mb-8">
            {WIZARD_STEPS.map((_, i) => (
              <div
                key={i}
                className="h-[5px] flex-1 rounded-full transition-all duration-500"
                style={{ backgroundColor: i < currentStep ? '#85ff00' : 'rgba(255,255,255,0.13)' }}
              />
            ))}
          </div>
        </div>

        {/* ── Step content via Outlet ─────────────────────────────────────────── */}
        <Outlet />
      </div>
    </PropertyFormProvider>
  );
}

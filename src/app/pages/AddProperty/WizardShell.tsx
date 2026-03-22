import { Outlet, useLocation, Link } from 'react-router';
import { SiteNav } from '../../components/shared/SiteNav';
import { PropertyFormProvider } from '../../context/PropertyFormContext';
import { bookStyle, heavyStyle, brandFont } from '../../brand';

export const WIZARD_STEPS = [
  { path: '/add-property',          label: 'Property Address'    },
  { path: '/add-property/details',  label: 'Property Details'    },
  { path: '/add-property/features', label: 'Features & Condition'},
  { path: '/add-property/photos',   label: 'Property Photos'     },
  { path: '/add-property/goals',    label: 'Pricing & Goals'     },
  { path: '/add-property/review',   label: 'Review & Submit'     },
];

export function WizardShell() {
  const { pathname } = useLocation();
  const idx = Math.max(0, WIZARD_STEPS.findIndex(s => s.path === pathname));
  const currentStep = idx + 1;
  const stepLabel   = WIZARD_STEPS[idx]?.label ?? '';

  return (
    <PropertyFormProvider>
      <div className="min-h-screen" style={{ backgroundColor: '#004dab', fontFamily: brandFont }}>

        <SiteNav />

        {/* ── Step header + progress bar ── */}
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

        <Outlet />
      </div>
    </PropertyFormProvider>
  );
}
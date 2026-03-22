import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { HousaLogo } from './HousaLogo';
import { bookFont, heavyFont } from '../../brand';

const NAV_LINKS = [
  { label: 'Sell my home',         href: '/my-homes',    heavy: true  },
  { label: 'Browse home listings', href: '/marketplace', heavy: false },
  { label: 'How this works',       href: '#',            heavy: false },
  { label: 'Resources',            href: '#',            heavy: false },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav style={{ backgroundColor: '#004dab' }}>
      <div className="max-w-[1815px] mx-auto px-[85px] sm:px-8">
        <div className="flex items-center justify-between" style={{ height: 101 }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}><HousaLogo /></Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(l => {
              const isActive = l.href !== '#' && pathname.startsWith(l.href);
              return (
                <Link
                  key={l.label}
                  to={l.href}
                  className={`${l.heavy ? heavyFont : bookFont} hover:opacity-80 transition-opacity`}
                  style={{
                    fontSize: 14,
                    color: isActive ? '#85ff00' : 'white',
                    textDecoration: 'none',
                    borderBottom: isActive ? '2px solid #85ff00' : '2px solid transparent',
                    paddingBottom: 2,
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* Right side: CTA + greeting + burger */}
          <div className="flex items-center gap-3">
            <Link
              to="/add-property"
              className={`${heavyFont} hidden sm:flex items-center gap-1.5 rounded-lg px-4 py-2 hover:opacity-90 transition-opacity`}
              style={{ fontSize: 13, backgroundColor: '#85ff00', color: '#004dab', textDecoration: 'none' }}
            >
              + List a Property
            </Link>
            <span className={`${heavyFont} hidden sm:block text-white`} style={{ fontSize: 14 }}>
              Hello there Corwin
            </span>
            <button
              className="lg:hidden text-white p-1"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="lg:hidden border-t border-white/10 py-4 flex flex-col gap-3">
            {NAV_LINKS.map(l => (
              <Link
                key={l.label}
                to={l.href}
                onClick={() => setOpen(false)}
                className={`${l.heavy ? heavyFont : bookFont} text-white px-2 py-1 hover:opacity-80`}
                style={{ fontSize: 14, textDecoration: 'none', color: pathname.startsWith(l.href) && l.href !== '#' ? '#85ff00' : 'white' }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/add-property"
              onClick={() => setOpen(false)}
              className={`${heavyFont} px-2 py-1`}
              style={{ fontSize: 14, textDecoration: 'none', color: '#85ff00' }}
            >
              + List a Property
            </Link>
            <span className={`${heavyFont} text-white px-2 py-1 border-t border-white/10 pt-3`} style={{ fontSize: 14 }}>
              Hello there Corwin
            </span>
          </div>
        )}
      </div>
    </nav>
  );
}
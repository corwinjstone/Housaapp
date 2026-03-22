import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { SiteNav } from '../components/shared/SiteNav';
import { AGENTS } from '../data/agents';
import { bookStyle, heavyStyle, brandFont, FAMILY, heavyFont, bookFont } from '../brand';

const SELLER_GOAL = 29375;
const MORTGAGE    = 185000;
const ASK_PRICE   = 250000;

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-[3px] items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 13 13" fill="none">
          <path
            d="M6.5 1l1.545 3.13 3.455.503-2.5 2.437.59 3.44L6.5 8.897 3.91 10.51l.59-3.44L2 4.633l3.455-.503L6.5 1z"
            fill={i < count ? '#85ff00' : 'rgba(255,255,255,0.15)'}
          />
        </svg>
      ))}
      <span style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.5)', marginLeft: 5 }}>
        {count}.0 / 5.0
      </span>
    </div>
  );
}

export function AgentOfferDetail() {
  const { id }   = useParams<{ id: string }>();
  const navigate = useNavigate();
  const agent    = AGENTS.find(a => a.id === Number(id));
  const [counterOpen, setCounterOpen] = useState(false);
  const [counterPrice, setCounterPrice] = useState('');
  const [counterSent,  setCounterSent]  = useState(false);
  const [action, setAction]             = useState<'accepted' | 'declined' | null>(null);

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#004dab' }}>
        <div className="text-center">
          <p style={{ ...heavyStyle, fontSize: 24, color: 'white' }}>Agent not found</p>
          <Link to="/" style={{ ...bookStyle, color: '#85ff00' }}>← Back to offers</Link>
        </div>
      </div>
    );
  }

  const fee         = agent.feeAmountNum;
  const closingCosts= Math.round(agent.homePriceNum * 0.01);
  const netCash     = agent.homePriceNum - fee - MORTGAGE - closingCosts;
  const aboveGoal   = netCash >= SELLER_GOAL;

  function handleAccept() {
    setAction('accepted');
    setCounterOpen(false);
  }
  function handleDecline() {
    setAction('declined');
    setCounterOpen(false);
  }
  function handleCounter() {
    if (!counterPrice) return;
    setCounterSent(true);
    setTimeout(() => { setCounterOpen(false); }, 2000);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#004dab', fontFamily: brandFont }}>
      <SiteNav />

      <div className="max-w-[1815px] mx-auto px-[85px] sm:px-8 pb-20" style={{ paddingTop: 40 }}>

        {/* Back */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-8 hover:opacity-70 transition-opacity"
          style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to all offers
        </button>

        {/* Action banner */}
        {action && (
          <div
            className="rounded-2xl p-4 mb-6 flex items-center gap-3"
            style={{
              backgroundColor: action === 'accepted' ? 'rgba(133,255,0,0.12)' : 'rgba(255,100,100,0.12)',
              border: `1px solid ${action === 'accepted' ? 'rgba(133,255,0,0.3)' : 'rgba(255,100,100,0.3)'}`,
            }}
          >
            <span style={{ fontSize: 20 }}>{action === 'accepted' ? '✓' : '✕'}</span>
            <p style={{ ...heavyStyle, fontSize: 15, color: action === 'accepted' ? '#85ff00' : '#ff7070', margin: 0 }}>
              {action === 'accepted'
                ? `You've accepted ${agent.name}'s offer! They'll contact you within 24 hours.`
                : `You've declined ${agent.name}'s offer.`}
            </p>
            <Link to="/" style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', marginLeft: 'auto' }}>
              View all offers →
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── LEFT COLUMN ─────────────────────────────────────────────────── */}
          <div className="lg:col-span-1 flex flex-col gap-5">

            {/* Agent card */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex flex-col items-center text-center mb-5">
                <div className="w-[88px] h-[88px] rounded-full overflow-hidden bg-[#D8D8D8] mb-3" style={{ border: '3px solid rgba(133,255,0,0.3)' }}>
                  <img src={agent.photo} alt={agent.name} className="w-full h-full object-cover" />
                </div>
                {agent.isDealMatch && (
                  <div className="flex items-center gap-1.5 mb-2 rounded-full px-3 py-1" style={{ backgroundColor: 'rgba(71,143,255,0.15)', border: '1px solid rgba(71,143,255,0.3)' }}>
                    <div className="w-4 h-4 rounded-full bg-[#005FF2] flex items-center justify-center">
                      <svg width="8" height="6" viewBox="0 0 11 8" fill="none">
                        <path d="M1 3.64L4.27 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ ...heavyStyle, fontSize: 11, color: '#478fff' }}>Deal Match</span>
                  </div>
                )}
                <h2 style={{ ...heavyStyle, fontSize: 20, color: 'white', margin: '0 0 4px' }}>{agent.name}</h2>
                <p style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '0 0 4px' }}>{agent.title}</p>
                <p style={{ ...bookStyle, fontSize: 13, color: '#85ff00', margin: '0 0 10px' }}>{agent.company}</p>
                <StarRating count={agent.stars} />
              </div>

              {/* Agent stats */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { val: `${agent.yearsExperience}`, label: 'Yrs exp.' },
                  { val: `${agent.totalSales}`,       label: 'Sales'    },
                  { val: `${agent.avgDaysOnMarket}d`, label: 'Avg close'},
                ].map(({ val, label }) => (
                  <div key={label} className="rounded-xl p-3 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                    <p style={{ ...heavyStyle, fontSize: 18, color: 'white', margin: '0 0 2px' }}>{val}</p>
                    <p style={{ ...bookStyle, fontSize: 10, color: 'rgba(255,255,255,0.4)', margin: 0 }}>{label}</p>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {agent.certifications.map(c => (
                  <span key={c} className="rounded-full px-2.5 py-1" style={{ ...bookStyle, fontSize: 11, backgroundColor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {c}
                  </span>
                ))}
              </div>

              {/* Contact */}
              <div className="flex flex-col gap-2">
                <a href={`tel:${agent.phone}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ textDecoration: 'none' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#85ff00" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{agent.phone}</span>
                </a>
                <a href={`mailto:${agent.email}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ textDecoration: 'none' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#85ff00" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <span style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{agent.email}</span>
                </a>
              </div>
            </div>

            {/* Recent sales */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ ...heavyStyle, fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '0 0 14px' }}>Recent Comparable Sales</p>
              <div className="flex flex-col gap-3">
                {agent.recentSales.map((sale, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="rounded-lg overflow-hidden shrink-0" style={{ width: 52, height: 40 }}>
                      <img src={sale.photo} alt={sale.address} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ ...bookStyle, fontSize: 12, color: 'white', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {sale.address}
                      </p>
                      <div className="flex gap-3">
                        <span style={{ ...heavyStyle, fontSize: 13, color: '#85ff00' }}>{sale.price}</span>
                        <span style={{ ...bookStyle, fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{sale.daysToClose}d close</span>
                        <span style={{ ...bookStyle, fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{sale.beds}bd</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ────────────────────────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Offer headline */}
            <div className="rounded-2xl p-6 sm:p-8" style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: `1px solid ${aboveGoal ? 'rgba(133,255,0,0.25)' : 'rgba(255,255,255,0.08)'}` }}>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '0 0 6px' }}>Agent's proposed offer</p>
                  <h2 style={{ ...heavyStyle, fontSize: 'clamp(28px, 4vw, 46px)', color: 'white', margin: 0 }}>
                    {agent.homePriceLabel}
                  </h2>
                  <p style={{ ...bookStyle, fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: '4px 0 0' }}>
                    List price · {agent.feeLabel}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p style={{ ...bookStyle, fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: '0 0 4px' }}>Timeline</p>
                  <span className="rounded-full px-3 py-1.5" style={{ ...heavyStyle, fontSize: 13, backgroundColor: 'rgba(133,255,0,0.12)', color: '#85ff00', border: '1px solid rgba(133,255,0,0.25)' }}>
                    {agent.proposedTimeline}
                  </span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="rounded-xl p-5 mb-5" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                <p style={{ ...bookStyle, fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 1 }}>
                  Net Proceeds Breakdown
                </p>
                {[
                  { label: 'List price',                         val: agent.homePriceLabel,           color: 'white'                },
                  { label: `Agent commission (${agent.commissionPct}%)`, val: `−${agent.feeAmount}`,  color: 'rgba(255,130,130,0.9)' },
                  { label: 'Mortgage payoff',                    val: `−$${MORTGAGE.toLocaleString()}`,color: 'rgba(255,130,130,0.9)' },
                  { label: 'Est. closing costs (~1%)',            val: `−$${closingCosts.toLocaleString()}`, color: 'rgba(255,130,130,0.9)' },
                ].map(({ label, val, color }) => (
                  <div key={label} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{label}</span>
                    <span style={{ ...heavyStyle, fontSize: 14, color }}>{val}</span>
                  </div>
                ))}
                {/* Net total */}
                <div className="flex justify-between items-center pt-4 mt-1">
                  <span style={{ ...heavyStyle, fontSize: 15, color: 'white' }}>Your net cash at close</span>
                  <span style={{ ...heavyStyle, fontSize: 28, color: aboveGoal ? '#85ff00' : '#f8e71c' }}>
                    ${netCash.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Goal comparison bar */}
              <div className="rounded-xl p-4" style={{ backgroundColor: aboveGoal ? 'rgba(133,255,0,0.08)' : 'rgba(248,231,28,0.08)', border: `1px solid ${aboveGoal ? 'rgba(133,255,0,0.2)' : 'rgba(248,231,28,0.2)'}` }}>
                <div className="flex items-center justify-between mb-2">
                  <p style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                    Your goal: <span style={heavyStyle}>${SELLER_GOAL.toLocaleString()}</span>
                  </p>
                  <p style={{ ...heavyStyle, fontSize: 13, color: aboveGoal ? '#85ff00' : '#f8e71c', margin: 0 }}>
                    {aboveGoal
                      ? `+$${(netCash - SELLER_GOAL).toLocaleString()} above goal`
                      : `-$${(SELLER_GOAL - netCash).toLocaleString()} below goal`}
                  </p>
                </div>
                <div className="h-2 rounded-full w-full" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                  <div
                    className="h-2 rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(100, (netCash / SELLER_GOAL) * 100)}%`,
                      backgroundColor: aboveGoal ? '#85ff00' : '#f8e71c',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* About */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ ...heavyStyle, fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: '0 0 10px' }}>About the Agent</p>
              <p style={{ ...bookStyle, fontSize: 14, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.7 }}>
                {agent.bio}
              </p>
            </div>

            {/* Action buttons */}
            {!action && (
              <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ ...heavyStyle, fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: '0 0 16px' }}>Respond to This Offer</p>

                {/* Counter offer form */}
                {counterOpen && (
                  <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {counterSent ? (
                      <div className="flex items-center gap-3">
                        <span style={{ fontSize: 18 }}>✓</span>
                        <p style={{ ...heavyStyle, fontSize: 14, color: '#85ff00', margin: 0 }}>Counter offer sent to {agent.name}!</p>
                      </div>
                    ) : (
                      <>
                        <p style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: '0 0 12px' }}>
                          Enter your counter list price
                        </p>
                        <div className="flex gap-3">
                          <div className="relative flex-1">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ ...bookStyle, color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>$</span>
                            <input
                              style={{ width: '100%', borderRadius: 10, padding: '11px 14px 11px 26px', backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', outline: 'none', ...bookStyle, fontSize: 15 }}
                              placeholder="260,000"
                              value={counterPrice}
                              onChange={e => setCounterPrice(e.target.value.replace(/\D/g,''))}
                              onFocus={e => (e.target.style.borderColor='#85ff00')}
                              onBlur={e => (e.target.style.borderColor='rgba(255,255,255,0.15)')}
                            />
                          </div>
                          <button
                            onClick={handleCounter}
                            className="rounded-xl px-5 py-2 hover:opacity-90 transition-opacity"
                            style={{ ...heavyStyle, fontSize: 14, backgroundColor: '#85ff00', color: '#004dab', border: 'none', cursor: 'pointer' }}
                          >
                            Send
                          </button>
                          <button
                            onClick={() => setCounterOpen(false)}
                            className="rounded-xl px-4 py-2 hover:opacity-80 transition-opacity"
                            style={{ ...bookStyle, fontSize: 14, color: 'rgba(255,255,255,0.45)', backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer' }}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleAccept}
                    className="rounded-xl px-6 py-3 hover:opacity-90 transition-opacity flex items-center gap-2"
                    style={{ ...heavyStyle, fontSize: 15, backgroundColor: '#85ff00', color: '#004dab', border: 'none', cursor: 'pointer' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-8" stroke="#004dab" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Accept Offer
                  </button>
                  <button
                    onClick={() => { setCounterOpen(!counterOpen); }}
                    className="rounded-xl px-6 py-3 hover:opacity-90 transition-opacity"
                    style={{ ...heavyStyle, fontSize: 15, color: '#85ff00', backgroundColor: 'transparent', border: '2px solid rgba(133,255,0,0.4)', cursor: 'pointer' }}
                  >
                    Counter Offer
                  </button>
                  <button
                    onClick={handleDecline}
                    className="rounded-xl px-6 py-3 hover:opacity-80 transition-opacity"
                    style={{ ...bookStyle, fontSize: 15, color: 'rgba(255,100,100,0.7)', backgroundColor: 'transparent', border: '1px solid rgba(255,100,100,0.25)', cursor: 'pointer' }}
                  >
                    Decline
                  </button>
                </div>
                <p style={{ ...bookStyle, fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 12 }}>
                  Accepting this offer connects you directly with {agent.name} and their brokerage.
                </p>
              </div>
            )}

            {/* Compare button */}
            <div className="text-center">
              <Link
                to="/"
                style={{ ...bookStyle, fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}
                className="hover:text-white transition-colors"
              >
                ← Compare with other agents
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
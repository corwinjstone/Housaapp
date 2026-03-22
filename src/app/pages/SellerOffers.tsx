import { useState } from "react";
import { Link } from "react-router";
import imgBitmap1  from "figma:asset/6812751d49f41754ffb2ffca26d1124bfb1e3b24.png";
import imgBitmap2  from "figma:asset/e0febf6d821db28fe375d07c1857186c4e28b29c.png";
import imgBitmap3  from "figma:asset/4b9bbf5d06db9f55e39f4cf6964b1dae752ab4eb.png";
import imgBitmap4  from "figma:asset/c4bbd30130a452ca898840e5445212398d88d29c.png";
import imgBitmap5  from "figma:asset/7a4bae4dfe3338c2997556d49e3db2d8c153cff8.png";
import imgBitmap6  from "figma:asset/340de86374b5d251ba5229da13275b0d13c68f95.png";
import imgBitmap12 from "figma:asset/203320fdbb2737078a82e83bfc90dc5dcb841de6.png";
import { HousaLogo } from "../components/shared/HousaLogo";
import { FAMILY, bookFont, heavyFont } from "../brand";

// ─── Data ─────────────────────────────────────────────────────────────────────
type SortKey  = "agent" | "ratings" | "cashAtClose" | "commission" | "homePrice";
type Indicator= "check" | "up" | "down";

interface Agent {
  id: number; name: string; company: string; photo: string;
  stars: number; hasAttachment: boolean; isDealMatch: boolean;
  homePriceLabel: string; homePriceNum: number;
  feeLabel: string; feeAmount: string; feeAmountNum: number;
  cashAtClose: string; cashAtCloseNum: number;
  indicator: Indicator; commissionPct: number;
}

const AGENTS: Agent[] = [
  { id:1, name:"Valerie Alhmady",  company:"Century 21",             photo:imgBitmap1,  stars:4, hasAttachment:false, isDealMatch:false, homePriceLabel:"$250,000", homePriceNum:250000, feeLabel:"2.25% fee", feeAmount:"$5,625",  feeAmountNum:5625,  cashAtClose:"$29,735", cashAtCloseNum:29735, indicator:"check", commissionPct:2.25 },
  { id:2, name:"Marcus Thompson",  company:"Colliers International",  photo:imgBitmap2,  stars:4, hasAttachment:true,  isDealMatch:false, homePriceLabel:"$240,500", homePriceNum:240500, feeLabel:"2.25% fee", feeAmount:"$5,411",  feeAmountNum:5411,  cashAtClose:"$20,089", cashAtCloseNum:20089, indicator:"down",  commissionPct:2.25 },
  { id:3, name:"Cheryl Brown",     company:"Remax",                   photo:imgBitmap3,  stars:4, hasAttachment:true,  isDealMatch:true,  homePriceLabel:"$250,000", homePriceNum:250000, feeLabel:"2.25% fee", feeAmount:"$5,625",  feeAmountNum:5625,  cashAtClose:"$29,375", cashAtCloseNum:29375, indicator:"check", commissionPct:2.25 },
  { id:4, name:"Tom Fredericks",   company:"New Home Realtors",       photo:imgBitmap4,  stars:3, hasAttachment:true,  isDealMatch:false, homePriceLabel:"$260,750", homePriceNum:260750, feeLabel:"2% fee",    feeAmount:"$5,215",  feeAmountNum:5215,  cashAtClose:"$40,535", cashAtCloseNum:40535, indicator:"up",    commissionPct:2.0  },
  { id:5, name:"Marleen Beckett",  company:"First Touch",             photo:imgBitmap5,  stars:4, hasAttachment:false, isDealMatch:false, homePriceLabel:"$240,500", homePriceNum:240500, feeLabel:"2.25% fee", feeAmount:"$5,411",  feeAmountNum:5411,  cashAtClose:"$20,089", cashAtCloseNum:20089, indicator:"down",  commissionPct:2.25 },
  { id:6, name:"Sara Washington",  company:"Century 21 Prime",        photo:imgBitmap12, stars:3, hasAttachment:true,  isDealMatch:false, homePriceLabel:"$250,000", homePriceNum:250000, feeLabel:"3% fee",    feeAmount:"$7,500",  feeAmountNum:7500,  cashAtClose:"$27,500", cashAtCloseNum:27500, indicator:"down",  commissionPct:3.0  },
  { id:7, name:"Alli Tang",        company:"Sothby Dallas",           photo:imgBitmap6,  stars:3, hasAttachment:false, isDealMatch:false, homePriceLabel:"$260,000", homePriceNum:260000, feeLabel:"3% fee",    feeAmount:"$7,800",  feeAmountNum:7800,  cashAtClose:"$37,200", cashAtCloseNum:37200, indicator:"up",    commissionPct:3.0  },
];

function sortAgents(list: Agent[], key: SortKey): Agent[] {
  const s = [...list];
  switch (key) {
    case "agent":       return s.sort((a,b) => a.name.localeCompare(b.name));
    case "ratings":     return s.sort((a,b) => b.stars - a.stars);
    case "cashAtClose": return s.sort((a,b) => b.cashAtCloseNum - a.cashAtCloseNum);
    case "commission":  return s.sort((a,b) => a.commissionPct - b.commissionPct);
    case "homePrice":   return s.sort((a,b) => b.homePriceNum - a.homePriceNum);
    default:            return s;
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-[2px] items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path
            d="M6.5 1l1.545 3.13 3.455.503-2.5 2.437.59 3.44L6.5 8.897 3.91 10.51l.59-3.44L2 4.633l3.455-.503L6.5 1z"
            fill={i < count ? "white" : "rgba(255,255,255,0.15)"}
          />
        </svg>
      ))}
    </div>
  );
}

function Paperclip() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#85ff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function CheckBadge() {
  return (
    <div className="flex flex-col items-center gap-[3px]">
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#005FF2]">
        <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
          <path d="M1 3.64L4.27273 7L10 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function UpTriangle() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path clipRule="evenodd" d="M5 0L10 10H0L5 0Z" fill="#85FF00" fillRule="evenodd" />
    </svg>
  );
}

function DownTriangle() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path clipRule="evenodd" d="M5 10L0 0H10L5 10Z" fill="#F8E71C" fillRule="evenodd" />
    </svg>
  );
}

function IndicatorIcon({ type }: { type: Indicator }) {
  if (type === "check") return <CheckBadge />;
  if (type === "up")    return <UpTriangle />;
  return <DownTriangle />;
}

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  const dim = index % 2 !== 0;
  return (
    <div
      className={`flex items-center gap-4 rounded-[8px] px-4 ${dim ? "bg-black/50" : "bg-black"}`}
      style={{ minHeight: 101 }}
    >
      {/* Photo + deal-match badge */}
      <div className="relative shrink-0 flex flex-col items-center" style={{ width: 58, minWidth: 58 }}>
        <div className="w-[58px] h-[60px] rounded-full overflow-hidden bg-[#D8D8D8]">
          <img src={agent.photo} alt={agent.name} className="w-full h-full object-cover" />
        </div>
        {agent.isDealMatch && (
          <div className="flex flex-col items-center mt-1 gap-[2px]">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#005FF2]">
              <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                <path d="M1 3.64L4.27273 7L10 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <span
              className={`${heavyFont} text-center leading-tight whitespace-nowrap`}
              style={{ fontSize: 9, color: "#478fff" }}
            >
              Deal match
            </span>
          </div>
        )}
      </div>

      {/* Name + company + stars */}
      <div className="flex-1 min-w-0 py-2">
        <div className="flex items-center gap-2">
          <span className={`${bookFont} text-[#85ff00] leading-[25px] truncate`} style={{ fontSize: 25 }}>
            {agent.name}
          </span>
          {agent.hasAttachment && <span className="shrink-0"><Paperclip /></span>}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`${bookFont} text-white leading-[25px]`} style={{ fontSize: 12 }}>
            {agent.company}
          </span>
          <StarRating count={agent.stars} />
        </div>
      </div>

      {/* Home price + fee (desktop) */}
      <div className="hidden lg:flex flex-col items-end shrink-0 gap-0">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-end gap-0">
            <span className={`${bookFont} text-white/50 leading-[23px]`} style={{ fontSize: 12 }}>Home price</span>
            <span className={`${bookFont} text-white/50 leading-[23px]`} style={{ fontSize: 12 }}>{agent.feeLabel}</span>
          </div>
          <div className="flex flex-col items-start gap-0">
            <span className={`${bookFont} text-white leading-[23px]`} style={{ fontSize: 16 }}>{agent.homePriceLabel}</span>
            <span className={`${bookFont} text-white leading-[23px]`} style={{ fontSize: 16 }}>{agent.feeAmount}</span>
          </div>
        </div>
      </div>

      {/* Indicator */}
      <div className="shrink-0 flex items-center justify-center w-8">
        <IndicatorIcon type={agent.indicator} />
      </div>

      {/* Cash at close */}
      <div className="shrink-0 text-right min-w-[100px] sm:min-w-[130px] lg:min-w-[200px]">
        <span
          className="text-white leading-[25px]"
          style={{ fontSize: "clamp(22px, 3vw, 40px)", fontWeight: 800, fontFamily: "Avenir, Nunito, sans-serif" }}
        >
          {agent.cashAtClose}
        </span>
      </div>
    </div>
  );
}

// ─── Sort sidebar ──────────────────────────────────────────────────────────────

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "agent",       label: "Agent"        },
  { key: "ratings",     label: "Ratings"      },
  { key: "cashAtClose", label: "Cash at close"},
  { key: "commission",  label: "Commission"   },
  { key: "homePrice",   label: "Home price"   },
];

function SortSidebar({ value, onChange }: { value: SortKey; onChange: (k: SortKey) => void }) {
  return (
    <aside className="flex flex-col gap-[18px] shrink-0 w-[180px]">
      <p className={`${heavyFont} text-white/50 leading-normal`} style={{ fontSize: 12 }}>Sort by</p>
      {SORT_OPTIONS.map(opt => (
        <button
          key={opt.key}
          className="flex items-center gap-[10px] cursor-pointer text-left"
          onClick={() => onChange(opt.key)}
        >
          <div
            className="shrink-0 flex items-center justify-center rounded-full border-2 border-white"
            style={{ width: 21, height: 21 }}
          >
            {value === opt.key && (
              <div className="rounded-full bg-[#004dab]" style={{ width: 9, height: 9 }} />
            )}
          </div>
          <span className={`${heavyFont} text-white leading-normal`} style={{ fontSize: 12 }}>
            {opt.label}
          </span>
        </button>
      ))}
    </aside>
  );
}

// ─── Add New Property card ─────────────────────────────────────────────────────

function AddPropertyCard() {
  return (
    <Link
      to="/add-property"
      className="flex items-center justify-center gap-3 rounded-[8px] px-4 transition-all hover:border-[#85ff00]/60 group"
      style={{
        minHeight: 80,
        border: '2px dashed rgba(255,255,255,0.18)',
        textDecoration: 'none',
      }}
    >
      <div
        className="flex items-center justify-center w-9 h-9 rounded-full transition-all group-hover:bg-[#85ff00]/20"
        style={{ border: '2px solid rgba(133,255,0,0.4)' }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v12M2 8h12" stroke="#85ff00" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>
      <span
        className={`${heavyFont} text-white/40 group-hover:text-white/70 transition-colors`}
        style={{ fontSize: 15 }}
      >
        List a new property
      </span>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function SellerOffers() {
  const [sortBy,          setSortBy]          = useState<SortKey>("ratings");
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);
  const [mobileSortOpen,  setMobileSortOpen]  = useState(false);

  const sorted = sortAgents(AGENTS, sortBy);

  const navLinks = [
    { label: "Buy a home",           heavy: false },
    { label: "Sell my home",         heavy: true  },
    { label: "Browse home listings", heavy: false },
    { label: "How this works",       heavy: false },
    { label: "Resources",            heavy: false },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#004dab", fontFamily: "Avenir, Nunito, sans-serif" }}>

      {/* ══ Navbar ══════════════════════════════════════════════════════════════ */}
      <nav style={{ backgroundColor: "#004dab" }}>
        <div className="max-w-[1815px] mx-auto px-[85px] sm:px-8">
          <div className="flex items-center justify-between" style={{ height: 101 }}>
            <HousaLogo />

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(l => (
                <a
                  key={l.label} href="#"
                  className={`${l.heavy ? heavyFont : bookFont} text-white hover:opacity-80 transition-opacity`}
                  style={{ fontSize: 14 }}
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Right: List property CTA + greeting + burger */}
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
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  {mobileMenuOpen
                    ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                    : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
                  }
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-white/10 py-4 flex flex-col gap-3">
              {navLinks.map(l => (
                <a key={l.label} href="#"
                  className={`${l.heavy ? heavyFont : bookFont} text-white px-2 py-1`}
                  style={{ fontSize: 14 }}
                >{l.label}</a>
              ))}
              <Link
                to="/add-property"
                className={`${heavyFont} text-[#85ff00] px-2 py-1`}
                style={{ fontSize: 14, textDecoration: 'none' }}
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

      {/* ══ Content ═════════════════════════════════════════════════════════════ */}
      <div className="max-w-[1815px] mx-auto px-[85px] sm:px-8 pb-16">

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4" style={{ paddingTop: 89 }}>
          <div>
            <p className={`${FAMILY} text-white m-0`} style={{ fontSize: 30, lineHeight: "25px" }}>
              <span style={{ fontWeight: 400 }}>{"Corwin, you have agents ready to sell "}</span>
              <span style={{ fontWeight: 800 }}>732 Caspian Way</span>
            </p>
            <a href="#" className={`${bookFont} hover:underline`} style={{ fontSize: 12, color: "#85ff00", lineHeight: "25px" }}>
              View/edit listing
            </a>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <p className={`${FAMILY} text-white m-0`} style={{ fontSize: 30, lineHeight: "25px" }}>
              <span style={{ fontWeight: 400 }}>{"Your goal is"}</span>
              <span style={{ fontWeight: 800 }}>{" $29,375"}</span>
            </p>
            <p className={`${bookFont} m-0`} style={{ fontSize: 12, color: "#85ff00", lineHeight: "25px" }}>
              Your estimated cash at close
            </p>
          </div>
        </div>

        {/* Column labels */}
        <div className="flex items-end justify-between mt-2 mb-3" style={{ paddingTop: 12 }}>
          <div className="flex items-end gap-4 w-full">
            <div className="hidden lg:block shrink-0" style={{ width: 180 }} />
            <p className={`${heavyFont} text-white/50 leading-normal m-0`} style={{ fontSize: 12 }}>Agent</p>
          </div>
          <p className={`${heavyFont} text-white/50 leading-normal m-0 shrink-0`} style={{ fontSize: 12 }}>Cash at close</p>
        </div>

        {/* Sidebar + list */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Desktop sidebar */}
          <div className="hidden lg:block shrink-0 pt-4">
            <SortSidebar value={sortBy} onChange={setSortBy} />
          </div>

          {/* Mobile sort */}
          <div className="lg:hidden mb-1">
            <button
              className={`${bookFont} flex items-center gap-2 text-white border border-white/20 rounded-lg px-3 py-2`}
              style={{ fontSize: 12 }}
              onClick={() => setMobileSortOpen(!mobileSortOpen)}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                <circle cx="3" cy="6" r="0.5" fill="currentColor"/><circle cx="3" cy="12" r="0.5" fill="currentColor"/><circle cx="3" cy="18" r="0.5" fill="currentColor"/>
              </svg>
              Sort by: <span className={heavyFont}>{SORT_OPTIONS.find(s => s.key === sortBy)?.label}</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points={mobileSortOpen ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
              </svg>
            </button>
            {mobileSortOpen && (
              <div className="mt-1 bg-black/70 backdrop-blur rounded-lg overflow-hidden border border-white/10">
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.key}
                    className={`${heavyFont} w-full text-left px-4 py-2.5 flex items-center gap-3 ${sortBy === opt.key ? "bg-white/10 text-white" : "text-white/70"}`}
                    style={{ fontSize: 12 }}
                    onClick={() => { setSortBy(opt.key); setMobileSortOpen(false); }}
                  >
                    <div
                      className="shrink-0 flex items-center justify-center rounded-full border-2 border-white"
                      style={{ width: 16, height: 16 }}
                    >
                      {sortBy === opt.key && <div className="rounded-full bg-[#004dab]" style={{ width: 6, height: 6 }} />}
                    </div>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Agent list + add card */}
          <div className="flex-1 min-w-0 flex flex-col gap-[10px]">
            {sorted.map((agent, i) => (
              <AgentCard key={agent.id} agent={agent} index={i} />
            ))}
            <AddPropertyCard />
          </div>
        </div>
      </div>
    </div>
  );
}

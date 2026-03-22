import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { SiteNav } from "../components/shared/SiteNav";
import { AGENTS, type AgentData } from "../data/agents";
import { FAMILY, bookFont, heavyFont } from "../brand";

// ─── Sort ──────────────────────────────────────────────────────────────────────
type SortKey = "agent" | "ratings" | "cashAtClose" | "commission" | "homePrice";

function sortAgents(list: AgentData[], key: SortKey): AgentData[] {
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

function IndicatorIcon({ type }: { type: AgentData['indicator'] }) {
  if (type === "check") return <CheckBadge />;
  if (type === "up")    return <UpTriangle />;
  return <DownTriangle />;
}

// ─── Clickable Agent Row Card ──────────────────────────────────────────────────

function AgentCard({ agent, index }: { agent: AgentData; index: number }) {
  const navigate = useNavigate();
  const dim = index % 2 !== 0;
  return (
    <div
      className={`flex items-center gap-4 rounded-[8px] px-4 cursor-pointer transition-all hover:ring-1 hover:ring-white/20 group ${dim ? "bg-black/50" : "bg-black"}`}
      style={{ minHeight: 101 }}
      onClick={() => navigate(`/offers/${agent.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/offers/${agent.id}`)}
    >
      {/* Photo + deal-match */}
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
            <span className={`${heavyFont} text-center leading-tight whitespace-nowrap`} style={{ fontSize: 9, color: "#478fff" }}>
              Deal match
            </span>
          </div>
        )}
      </div>

      {/* Name + company + stars */}
      <div className="flex-1 min-w-0 py-2">
        <div className="flex items-center gap-2">
          <span className={`${bookFont} text-[#85ff00] leading-[25px] truncate group-hover:underline`} style={{ fontSize: 25 }}>
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

      {/* View caret */}
      <div className="shrink-0 hidden sm:flex items-center">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-30 group-hover:opacity-70 transition-opacity">
          <path d="M5 2l5 5-5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
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

// ─── Add Property card ─────────────────────────────────────────────────────────

function AddPropertyCard() {
  return (
    <Link
      to="/add-property"
      className="flex items-center justify-center gap-3 rounded-[8px] px-4 transition-all hover:border-[#85ff00]/60 group"
      style={{ minHeight: 80, border: '2px dashed rgba(255,255,255,0.18)', textDecoration: 'none' }}
    >
      <div
        className="flex items-center justify-center w-9 h-9 rounded-full transition-all group-hover:bg-[#85ff00]/20"
        style={{ border: '2px solid rgba(133,255,0,0.4)' }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v12M2 8h12" stroke="#85ff00" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>
      <span className={`${heavyFont} text-white/40 group-hover:text-white/70 transition-colors`} style={{ fontSize: 15 }}>
        List a new property
      </span>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function SellerOffers() {
  const [sortBy,        setSortBy]        = useState<SortKey>("ratings");
  const [mobileSortOpen,setMobileSortOpen] = useState(false);
  const sorted = sortAgents(AGENTS, sortBy);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#004dab", fontFamily: "Avenir, Nunito, sans-serif" }}>

      <SiteNav />

      {/* ══ Content ════════════════════════════════════════════════════════════ */}
      <div className="max-w-[1815px] mx-auto px-[85px] sm:px-8 pb-16">

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4" style={{ paddingTop: 89 }}>
          <div>
            <p className={`${FAMILY} text-white m-0`} style={{ fontSize: 30, lineHeight: "25px" }}>
              <span style={{ fontWeight: 400 }}>{"Corwin, you have agents ready to sell "}</span>
              <span style={{ fontWeight: 800 }}>732 Caspian Way</span>
            </p>
            <Link to="/my-homes" className={`${bookFont} hover:underline`} style={{ fontSize: 12, color: "#85ff00", lineHeight: "25px", textDecoration: 'none' }}>
              View all my listings
            </Link>
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

        {/* Click hint */}
        <div className="mt-3 mb-1">
          <p className={`${bookFont} text-white/30`} style={{ fontSize: 12 }}>
            Tap any agent to view their full offer details
          </p>
        </div>

        {/* Column labels */}
        <div className="flex items-end justify-between mt-1 mb-3" style={{ paddingTop: 8 }}>
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
                    <div className="shrink-0 flex items-center justify-center rounded-full border-2 border-white" style={{ width: 16, height: 16 }}>
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

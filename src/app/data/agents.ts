import imgBitmap1  from "figma:asset/6812751d49f41754ffb2ffca26d1124bfb1e3b24.png";
import imgBitmap2  from "figma:asset/e0febf6d821db28fe375d07c1857186c4e28b29c.png";
import imgBitmap3  from "figma:asset/4b9bbf5d06db9f55e39f4cf6964b1dae752ab4eb.png";
import imgBitmap4  from "figma:asset/c4bbd30130a452ca898840e5445212398d88d29c.png";
import imgBitmap5  from "figma:asset/7a4bae4dfe3338c2997556d49e3db2d8c153cff8.png";
import imgBitmap6  from "figma:asset/340de86374b5d251ba5229da13275b0d13c68f95.png";
import imgBitmap12 from "figma:asset/203320fdbb2737078a82e83bfc90dc5dcb841de6.png";

export type Indicator = "check" | "up" | "down";

export interface RecentSale {
  address:    string;
  price:      string;
  daysToClose:number;
  beds:       number;
  sqft:       string;
  photo:      string;
}

export interface AgentData {
  id:             number;
  name:           string;
  company:        string;
  photo:          string;
  stars:          number;
  hasAttachment:  boolean;
  isDealMatch:    boolean;
  // offer details
  homePriceLabel: string;
  homePriceNum:   number;
  feeLabel:       string;
  feeAmount:      string;
  feeAmountNum:   number;
  cashAtClose:    string;
  cashAtCloseNum: number;
  indicator:      Indicator;
  commissionPct:  number;
  // extended detail fields
  title:          string;
  bio:            string;
  yearsExperience:number;
  totalSales:     number;
  avgDaysOnMarket:number;
  certifications: string[];
  phone:          string;
  email:          string;
  proposedTimeline:string;
  recentSales:    RecentSale[];
}

const HOUSE1 = "https://images.unsplash.com/photo-1720067171688-44a9f8385414?w=400&q=80";
const HOUSE2 = "https://images.unsplash.com/photo-1759355787114-09af8ee10783?w=400&q=80";
const HOUSE3 = "https://images.unsplash.com/photo-1757006019042-0d04e505d836?w=400&q=80";

export const AGENTS: AgentData[] = [
  {
    id: 1, name: "Valerie Alhmady", company: "Century 21", photo: imgBitmap1,
    stars: 4, hasAttachment: false, isDealMatch: false,
    homePriceLabel: "$250,000", homePriceNum: 250000,
    feeLabel: "2.25% fee", feeAmount: "$5,625", feeAmountNum: 5625,
    cashAtClose: "$29,735", cashAtCloseNum: 29735,
    indicator: "check", commissionPct: 2.25,
    title: "Senior Listing Agent",
    bio: "Valerie brings 14 years of DFW market expertise, specializing in first-time sellers and move-up buyers. She's known for aggressive pricing strategy and typically closes above asking price.",
    yearsExperience: 14, totalSales: 312, avgDaysOnMarket: 18,
    certifications: ["CRS", "ABR", "SRES"],
    phone: "(214) 555-0182", email: "valerie@century21.com",
    proposedTimeline: "30–45 days",
    recentSales: [
      { address: "814 Magnolia Lane, Dallas TX",  price: "$247,500", daysToClose: 22, beds: 3, sqft: "1,840", photo: HOUSE1 },
      { address: "2201 Pecan St, Plano TX",        price: "$258,000", daysToClose: 17, beds: 4, sqft: "2,100", photo: HOUSE2 },
      { address: "509 Creekwood Dr, Garland TX",   price: "$243,000", daysToClose: 28, beds: 3, sqft: "1,720", photo: HOUSE3 },
    ],
  },
  {
    id: 2, name: "Marcus Thompson", company: "Colliers International", photo: imgBitmap2,
    stars: 4, hasAttachment: true, isDealMatch: false,
    homePriceLabel: "$240,500", homePriceNum: 240500,
    feeLabel: "2.25% fee", feeAmount: "$5,411", feeAmountNum: 5411,
    cashAtClose: "$20,089", cashAtCloseNum: 20089,
    indicator: "down", commissionPct: 2.25,
    title: "Residential & Commercial Specialist",
    bio: "Marcus has transitioned from commercial real estate to residential, bringing corporate-grade marketing packages to every listing. High-quality photography, drone footage, and 3D tours are standard.",
    yearsExperience: 9, totalSales: 188, avgDaysOnMarket: 24,
    certifications: ["CCIM", "CRS"],
    phone: "(214) 555-0247", email: "marcus@colliers.com",
    proposedTimeline: "45–60 days",
    recentSales: [
      { address: "1107 Fieldstone Dr, Irving TX",  price: "$238,000", daysToClose: 31, beds: 3, sqft: "1,950", photo: HOUSE2 },
      { address: "34 Harvest Moon Rd, Allen TX",   price: "$242,500", daysToClose: 19, beds: 4, sqft: "2,350", photo: HOUSE3 },
      { address: "6640 Lakehurst Ave, Dallas TX",  price: "$237,000", daysToClose: 26, beds: 3, sqft: "1,680", photo: HOUSE1 },
    ],
  },
  {
    id: 3, name: "Cheryl Brown", company: "Remax", photo: imgBitmap3,
    stars: 4, hasAttachment: true, isDealMatch: true,
    homePriceLabel: "$250,000", homePriceNum: 250000,
    feeLabel: "2.25% fee", feeAmount: "$5,625", feeAmountNum: 5625,
    cashAtClose: "$29,375", cashAtCloseNum: 29375,
    indicator: "check", commissionPct: 2.25,
    title: "RE/MAX Diamond Award Agent",
    bio: "Cheryl is a top-10 Remax agent in the DFW area for 5 consecutive years. Her database of 800+ pre-qualified buyers means she can often sell before the home ever hits MLS, getting you top dollar fast.",
    yearsExperience: 18, totalSales: 540, avgDaysOnMarket: 11,
    certifications: ["CRB", "CRS", "ABR", "GRI"],
    phone: "(469) 555-0138", email: "cheryl@remax.com",
    proposedTimeline: "21–30 days",
    recentSales: [
      { address: "732 Caspian Way, Dallas TX",     price: "$251,000", daysToClose: 12, beds: 3, sqft: "2,050", photo: HOUSE1 },
      { address: "405 Blue Heron Dr, Frisco TX",   price: "$249,500", daysToClose: 9,  beds: 3, sqft: "1,900", photo: HOUSE2 },
      { address: "1820 Timber Creek, McKinney TX", price: "$253,000", daysToClose: 14, beds: 4, sqft: "2,200", photo: HOUSE3 },
    ],
  },
  {
    id: 4, name: "Tom Fredericks", company: "New Home Realtors", photo: imgBitmap4,
    stars: 3, hasAttachment: true, isDealMatch: false,
    homePriceLabel: "$260,750", homePriceNum: 260750,
    feeLabel: "2% fee", feeAmount: "$5,215", feeAmountNum: 5215,
    cashAtClose: "$40,535", cashAtCloseNum: 40535,
    indicator: "up", commissionPct: 2.0,
    title: "New Construction & Resale Expert",
    bio: "Tom focuses on emerging neighborhoods and understands both new construction and resale dynamics. His lower 2% commission and higher list price strategy maximizes seller net proceeds.",
    yearsExperience: 7, totalSales: 143, avgDaysOnMarket: 32,
    certifications: ["ABR", "SRS"],
    phone: "(972) 555-0361", email: "tom@newhomerealtors.com",
    proposedTimeline: "60–90 days",
    recentSales: [
      { address: "2910 Legacy Point, Prosper TX",  price: "$265,000", daysToClose: 38, beds: 4, sqft: "2,400", photo: HOUSE3 },
      { address: "817 Willow Bend, Celina TX",     price: "$258,500", daysToClose: 29, beds: 3, sqft: "2,050", photo: HOUSE1 },
      { address: "113 Meadow Vista, Wylie TX",     price: "$261,000", daysToClose: 33, beds: 4, sqft: "2,180", photo: HOUSE2 },
    ],
  },
  {
    id: 5, name: "Marleen Beckett", company: "First Touch", photo: imgBitmap5,
    stars: 4, hasAttachment: false, isDealMatch: false,
    homePriceLabel: "$240,500", homePriceNum: 240500,
    feeLabel: "2.25% fee", feeAmount: "$5,411", feeAmountNum: 5411,
    cashAtClose: "$20,089", cashAtCloseNum: 20089,
    indicator: "down", commissionPct: 2.25,
    title: "Relocation & Downsizing Specialist",
    bio: "Marleen specializes in helping sellers who are relocating or downsizing, making the process as smooth as possible. She coordinates moving services, storage, and bridge financing options.",
    yearsExperience: 11, totalSales: 229, avgDaysOnMarket: 27,
    certifications: ["SRS", "SRES", "CRS"],
    phone: "(214) 555-0594", email: "marleen@firsttouch.com",
    proposedTimeline: "45–60 days",
    recentSales: [
      { address: "6102 Clover Hill, Dallas TX",    price: "$239,000", daysToClose: 24, beds: 3, sqft: "1,780", photo: HOUSE2 },
      { address: "3344 Sunset Ridge, Mesquite TX", price: "$241,500", daysToClose: 30, beds: 3, sqft: "1,850", photo: HOUSE1 },
      { address: "912 Briar Crest, Richardson TX", price: "$238,000", daysToClose: 28, beds: 3, sqft: "1,700", photo: HOUSE3 },
    ],
  },
  {
    id: 6, name: "Sara Washington", company: "Century 21 Prime", photo: imgBitmap12,
    stars: 3, hasAttachment: true, isDealMatch: false,
    homePriceLabel: "$250,000", homePriceNum: 250000,
    feeLabel: "3% fee", feeAmount: "$7,500", feeAmountNum: 7500,
    cashAtClose: "$27,500", cashAtCloseNum: 27500,
    indicator: "down", commissionPct: 3.0,
    title: "Full-Service Listing Agent",
    bio: "Sara provides a premium white-glove service: professional staging, luxury photography, and concierge-level client care. Her 3% commission reflects a complete done-for-you approach.",
    yearsExperience: 6, totalSales: 97, avgDaysOnMarket: 20,
    certifications: ["ABR", "PSA"],
    phone: "(469) 555-0722", email: "sara@century21prime.com",
    proposedTimeline: "30–45 days",
    recentSales: [
      { address: "211 Sycamore Court, Dallas TX",  price: "$252,000", daysToClose: 18, beds: 3, sqft: "1,920", photo: HOUSE1 },
      { address: "780 Palm Drive, Carrollton TX",  price: "$248,000", daysToClose: 22, beds: 3, sqft: "1,840", photo: HOUSE3 },
      { address: "1450 Vista Verde, Grand Prairie TX", price: "$249,000", daysToClose: 19, beds: 4, sqft: "2,100", photo: HOUSE2 },
    ],
  },
  {
    id: 7, name: "Alli Tang", company: "Sothby Dallas", photo: imgBitmap6,
    stars: 3, hasAttachment: false, isDealMatch: false,
    homePriceLabel: "$260,000", homePriceNum: 260000,
    feeLabel: "3% fee", feeAmount: "$7,800", feeAmountNum: 7800,
    cashAtClose: "$37,200", cashAtCloseNum: 37200,
    indicator: "up", commissionPct: 3.0,
    title: "Luxury & Prestige Market Specialist",
    bio: "Alli comes from Sotheby's luxury division with deep relationships among high-net-worth buyers. She prices aggressively to generate bidding wars and has achieved 104% of list price on average.",
    yearsExperience: 10, totalSales: 175, avgDaysOnMarket: 15,
    certifications: ["CLHMS", "CRS", "GRI"],
    phone: "(972) 555-0831", email: "alli@sothbydallas.com",
    proposedTimeline: "21–35 days",
    recentSales: [
      { address: "5500 Preston Road, Dallas TX",   price: "$263,000", daysToClose: 14, beds: 4, sqft: "2,500", photo: HOUSE2 },
      { address: "304 Lakefront Circle, Dallas TX",price: "$258,000", daysToClose: 11, beds: 3, sqft: "2,050", photo: HOUSE1 },
      { address: "1901 Normandy Ln, Southlake TX", price: "$261,500", daysToClose: 19, beds: 4, sqft: "2,300", photo: HOUSE3 },
    ],
  },
];

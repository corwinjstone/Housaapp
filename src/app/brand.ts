import type { CSSProperties } from 'react';

export const brandFont = 'Avenir, Nunito, sans-serif';

// Tailwind arbitrary-class helpers (kept for SellerOffers compatibility)
export const FAMILY   = "font-['Avenir',_'Nunito',_sans-serif]";
export const bookFont = `${FAMILY} font-normal`;
export const heavyFont= `${FAMILY} font-extrabold`;

// Inline-style helpers — guaranteed rendering in wizard components
export const bookStyle: CSSProperties  = { fontFamily: brandFont, fontWeight: 400 };
export const heavyStyle: CSSProperties = { fontFamily: brandFont, fontWeight: 800 };

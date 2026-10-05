#!/usr/bin/env node
/**
 * apply_identities.js
 * Applies a distinct visual identity to each restaurant's website based on
 * their real branding data (colors, aesthetic, hero images from Unsplash).
 */

const fs = require('fs');
const path = require('path');

// ─────────────────────────────────────────────────────────────────────────────
// IDENTITY MAP – one entry per restaurant
// Each entry controls:
//   colors   → tailwind.config.js brand tokens
//   bg       → page background (dark or light mode, CSS variable)
//   fonts    → Google Fonts pair (serif + sans)
//   hero     → Unsplash photo ID for the hero banner
//   about1   → Unsplash photo for About section left column
//   about2   → Unsplash photo for About section right column
//   bodyBg   → actual CSS background color (hex, applied to <html>/<body>)
//   scrollBg → scrollbar track color
//   scrollThumb → scrollbar thumb color
//   glassBg  → glass-panel RGBA background
//   glassBorder → glass-panel border RGBA
//   cardBg   → glass-card RGBA background
//   textBase → main text color class in App.tsx (e.g. stone-100, zinc-900)
//   appBg    → tailwind class applied to the root div (bg-xxxxx)
//   scheme   → 'dark' | 'light'
// ─────────────────────────────────────────────────────────────────────────────

const identities = {

  // ═══════════════════════════════════════════
  // 1. EL DJENINA – Ottoman Palace, Crimson & Antique Gold
  // ═══════════════════════════════════════════
  'el-djenina': {
    colors: { primary: '#8B263E', secondary: '#D4AF37', accent: '#2C3E50', light: '#F7F3E9' },
    fonts: { serif: '"Playfair Display"', sans: '"Plus Jakarta Sans"' },
    scheme: 'dark',
    appBg: 'bg-[#0f0608]',
    bodyBg: '#0f0608',
    scrollBg: '#0f0608',
    scrollThumb: '#3d1520',
    scrollThumbHover: '#6b2236',
    glassBg: 'rgba(20, 4, 8, 0.82)',
    glassBorder: 'rgba(212,175,55,0.12)',
    cardBg: 'rgba(30, 6, 12, 0.70)',
    heroImg: 'photo-1541518763669-27fef04b14ea?q=80&w=1600&auto=format&fit=crop',
    heroOverlay: 'from-[#0f0608] via-[#0f0608]/85 to-[#0f0608]/55',
    about1: 'photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
    about2: 'photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    heroSubtitle: "Une expérience d'exception au cœur d'Alger. Palais ottoman, zellige andalou, stucs arabesques.",
    textGlow: 'rgba(212,175,55,0.4)',
  },

  // ═══════════════════════════════════════════
  // 2. LE BARDO – Refined Orientalism, Dark Slate & Brass
  // ═══════════════════════════════════════════
  'le-bardo': {
    colors: { primary: '#1F2937', secondary: '#C5A059', accent: '#4A5568', light: '#F9FAFB' },
    fonts: { serif: '"Cormorant Garamond"', sans: '"DM Sans"' },
    scheme: 'dark',
    appBg: 'bg-[#0d1117]',
    bodyBg: '#0d1117',
    scrollBg: '#0d1117',
    scrollThumb: '#1f2937',
    scrollThumbHover: '#374151',
    glassBg: 'rgba(13, 17, 23, 0.85)',
    glassBorder: 'rgba(197,160,89,0.15)',
    cardBg: 'rgba(20, 25, 35, 0.72)',
    heroImg: 'photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop',
    heroOverlay: 'from-[#0d1117] via-[#0d1117]/80 to-[#0d1117]/45',
    about1: 'photo-1559329007-40df8a9345d8?q=80&w=800&auto=format&fit=crop',
    about2: 'photo-1424847651672-bf20a4b0982b?q=80&w=800&auto=format&fit=crop',
    heroSubtitle: "Gastronomie de renaissance au cœur d'Alger. Orientalisme raffiné, lumières tamisées, héritage muséal.",
    textGlow: 'rgba(197,160,89,0.35)',
  },

  // ═══════════════════════════════════════════
  // 3. LE DAUPHIN – Maritime Heritage, Navy & Ocean Blue
  // ═══════════════════════════════════════════
  'le-dauphin': {
    colors: { primary: '#0B3C5D', secondary: '#D9B310', accent: '#328CC1', light: '#F0F8FF' },
    fonts: { serif: '"Libre Baskerville"', sans: '"Source Sans 3"' },
    scheme: 'dark',
    appBg: 'bg-[#051c2e]',
    bodyBg: '#051c2e',
    scrollBg: '#051c2e',
    scrollThumb: '#0b3c5d',
    scrollThumbHover: '#1a5d8f',
    glassBg: 'rgba(5, 28, 46, 0.88)',
    glassBorder: 'rgba(217,179,16,0.20)',
    cardBg: 'rgba(8, 35, 58, 0.75)',
    heroImg: 'photo-1505118380757-91f5f5632de0?q=80&w=1600&auto=format&fit=crop',
    heroOverlay: 'from-[#051c2e] via-[#051c2e]/82 to-[#051c2e]/40',
    about1: 'photo-1534080564583-6be75777b70a?q=80&w=800&auto=format&fit=crop',
    about2: 'photo-1498654896293-37aacf113fd9?q=80&w=800&auto=format&fit=crop',
    heroSubtitle: "Institution maritime depuis le port d'Alger. Fruits de mer frais chaque jour, vue panoramique sur la baie.",
    textGlow: 'rgba(217,179,16,0.40)',
  },

  // ═══════════════════════════════════════════
  // 4. LE TANTRA – Glamorous Lounge Chic, Black & Deep Red
  // ═══════════════════════════════════════════
  'le-tantra': {
    colors: { primary: '#9D0208', secondary: '#D4AF37', accent: '#2B2D42', light: '#F8F8FF' },
    fonts: { serif: '"Italiana"', sans: '"Outfit"' },
    scheme: 'dark',
    appBg: 'bg-[#080808]',
    bodyBg: '#080808',
    scrollBg: '#080808',
    scrollThumb: '#2b0203',
    scrollThumbHover: '#5a0307',
    glassBg: 'rgba(8, 8, 8, 0.90)',
    glassBorder: 'rgba(212,175,55,0.18)',
    cardBg: 'rgba(15, 5, 5, 0.78)',
    heroImg: 'photo-1550966871-3ed3cdb5ed0c?q=80&w=1600&auto=format&fit=crop',
    heroOverlay: 'from-[#080808] via-[#080808]/88 to-[#3d0104]/50',
    about1: 'photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop',
    about2: 'photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop',
    heroSubtitle: "Dîner gastronomique dans un écrin noir absolu. Villa de prestige, terrace en forêt de pins, lounge de nuit.",
    textGlow: 'rgba(212,175,55,0.50)',
  },

  // ═══════════════════════════════════════════
  // 5. LE CARACOYA – Bohemian Bistro, Deep Purple & Antique Brass
  // ═══════════════════════════════════════════
  'le-caracoya': {
    colors: { primary: '#4A154B', secondary: '#C0A080', accent: '#2D3748', light: '#FFFDF9' },
    fonts: { serif: '"Josefin Slab"', sans: '"Lato"' },
    scheme: 'dark',
    appBg: 'bg-[#120514]',
    bodyBg: '#120514',
    scrollBg: '#120514',
    scrollThumb: '#3d1040',
    scrollThumbHover: '#5e1a63',
    glassBg: 'rgba(18, 5, 20, 0.85)',
    glassBorder: 'rgba(192,160,128,0.18)',
    cardBg: 'rgba(25, 8, 28, 0.72)',
    heroImg: 'photo-1514190051997-0f6f39ca5cde?q=80&w=1600&auto=format&fit=crop',
    heroOverlay: 'from-[#120514] via-[#120514]/85 to-[#2a062e]/50',
    about1: 'photo-1559329007-40df8a9345d8?q=80&w=800&auto=format&fit=crop',
    about2: 'photo-1428515613728-6b4607e44363?q=80&w=800&auto=format&fit=crop',
    heroSubtitle: "Bistro bohème historique d'Alger, fontaine intérieure en pierre, jazz ambiant et élégance rétro.",
    textGlow: 'rgba(192,160,128,0.40)',
  },

  // ═══════════════════════════════════════════
  // 6. AL BOUSTAN – Lebanese Garden, Forest Green & Sand Gold
  // ═══════════════════════════════════════════
  'al-boustan': {
    colors: { primary: '#1B4332', secondary: '#E9C46A', accent: '#2D6A4F', light: '#F4F1DE' },
    fonts: { serif: '"Amiri"', sans: '"Cairo"' },
    scheme: 'dark',
    appBg: 'bg-[#0a1f16]',
    bodyBg: '#0a1f16',
    scrollBg: '#0a1f16',
    scrollThumb: '#1b4332',
    scrollThumbHover: '#2d6a4f',
    glassBg: 'rgba(10, 31, 22, 0.88)',
    glassBorder: 'rgba(233,196,106,0.20)',
    cardBg: 'rgba(14, 38, 28, 0.75)',
    heroImg: 'photo-1555939594-58d7cb561ad1?q=80&w=1600&auto=format&fit=crop',
    heroOverlay: 'from-[#0a1f16] via-[#0a1f16]/85 to-[#0a1f16]/45',
    about1: 'photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop',
    about2: 'photo-1473093295043-cdd812d0e601?q=80&w=800&auto=format&fit=crop',
    heroSubtitle: "Institution libanaise de prestige à Alger. Vue panoramique sur la baie, jardins de cèdres, coucher de soleil.",
    textGlow: 'rgba(233,196,106,0.40)',
  },

  // ═══════════════════════════════════════════
  // 7. SFINDJA – Bistronomic Zen, Deep Teal & Terracotta
  // ═══════════════════════════════════════════
  'sfindja': {
    colors: { primary: '#264653', secondary: '#2A9D8F', accent: '#E76F51', light: '#F8F9FA' },
    fonts: { serif: '"Gilda Display"', sans: '"Nunito"' },
    scheme: 'dark',
    appBg: 'bg-[#0d1e24]',
    bodyBg: '#0d1e24',
    scrollBg: '#0d1e24',
    scrollThumb: '#264653',
    scrollThumbHover: '#2a9d8f',
    glassBg: 'rgba(13, 30, 36, 0.88)',
    glassBorder: 'rgba(42,157,143,0.22)',
    cardBg: 'rgba(18, 38, 46, 0.75)',
    heroImg: 'photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop',
    heroOverlay: 'from-[#0d1e24] via-[#0d1e24]/85 to-[#264653]/55',
    about1: 'photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
    about2: 'photo-1540189549336-e6e99c3679fe?q=80&w=800&auto=format&fit=crop',
    heroSubtitle: "Bistronomie créative à El Biar, terrasse botanique, raffinement contemporain et cuisine gastronomique.",
    textGlow: 'rgba(42,157,143,0.45)',
  },

  // ═══════════════════════════════════════════
  // 8. CHEZ SAUVEUR – Historic Portside, Deep Red & Coastal Amber
  // ═══════════════════════════════════════════
  'chez-sauveur': {
    colors: { primary: '#9E2A2B', secondary: '#E09F3E', accent: '#335C67', light: '#FFF3B0' },
    fonts: { serif: '"Rufina"', sans: '"Raleway"' },
    scheme: 'dark',
    appBg: 'bg-[#1a0607]',
    bodyBg: '#1a0607',
    scrollBg: '#1a0607',
    scrollThumb: '#4a1010',
    scrollThumbHover: '#7a1a1a',
    glassBg: 'rgba(26, 6, 7, 0.88)',
    glassBorder: 'rgba(224,159,62,0.22)',
    cardBg: 'rgba(35, 8, 8, 0.75)',
    heroImg: 'photo-1534080564583-6be75777b70a?q=80&w=1600&auto=format&fit=crop',
    heroOverlay: 'from-[#1a0607] via-[#1a0607]/85 to-[#1a0607]/40',
    about1: 'photo-1498654896293-37aacf113fd9?q=80&w=800&auto=format&fit=crop',
    about2: 'photo-1504718855392-c0f33b372e72?q=80&w=800&auto=format&fit=crop',
    heroSubtitle: "Institution côtière depuis 1960 au port de La Madrague. Pêche fraîche du jour, saveurs authentiques de la mer.",
    textGlow: 'rgba(224,159,62,0.45)',
  },

  // ═══════════════════════════════════════════
  // 9. LA SCALA – Operatic Elegance, Near-Black & Gold
  // ═══════════════════════════════════════════
  'la-scala': {
    colors: { primary: '#1C1917', secondary: '#D4AF37', accent: '#44403C', light: '#FAFAF9' },
    fonts: { serif: '"IM Fell English"', sans: '"Mulish"' },
    scheme: 'dark',
    appBg: 'bg-[#0a0908]',
    bodyBg: '#0a0908',
    scrollBg: '#0a0908',
    scrollThumb: '#292524',
    scrollThumbHover: '#44403c',
    glassBg: 'rgba(10, 9, 8, 0.90)',
    glassBorder: 'rgba(212,175,55,0.15)',
    cardBg: 'rgba(20, 18, 16, 0.78)',
    heroImg: 'photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop',
    heroOverlay: 'from-[#0a0908] via-[#0a0908]/88 to-[#0a0908]/50',
    about1: 'photo-1559329007-40df8a9345d8?q=80&w=800&auto=format&fit=crop',
    about2: 'photo-1424847651672-bf20a4b0982b?q=80&w=800&auto=format&fit=crop',
    heroSubtitle: "Élégance opératique à El Biar. Haute gastronomie, lustres de cristal, discrétion diplomatique.",
    textGlow: 'rgba(212,175,55,0.45)',
  },

  // ═══════════════════════════════════════════
  // 10. DAR ZELLIGE – Andalusian Palace, Cobalt & Gold
  // ═══════════════════════════════════════════
  'dar-zellige': {
    colors: { primary: '#0E4D92', secondary: '#E6AF2E', accent: '#1D2D44', light: '#F0EBD8' },
    fonts: { serif: '"Scheherazade New"', sans: '"Tajawal"' },
    scheme: 'dark',
    appBg: 'bg-[#060d1a]',
    bodyBg: '#060d1a',
    scrollBg: '#060d1a',
    scrollThumb: '#0e4d92',
    scrollThumbHover: '#1a6bc4',
    glassBg: 'rgba(6, 13, 26, 0.90)',
    glassBorder: 'rgba(230,175,46,0.22)',
    cardBg: 'rgba(10, 20, 40, 0.78)',
    heroImg: 'photo-1585518419759-7fe2e0fbf8a6?q=80&w=1600&auto=format&fit=crop',
    heroOverlay: 'from-[#060d1a] via-[#060d1a]/88 to-[#0e4d92]/35',
    about1: 'photo-1533777857889-4be7c70b33f7?q=80&w=800&auto=format&fit=crop',
    about2: 'photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    heroSubtitle: "Palais andalou au bord de la piscine à Hydra. Zellige cobalt et or, rôtisserie au charbon de bois, cour illuminée.",
    textGlow: 'rgba(230,175,46,0.48)',
  },

  // ═══════════════════════════════════════════
  // 11. DAR YEMMA CASBAH – Casbah Heritage, Terracotta & Warm Amber
  // ═══════════════════════════════════════════
  'dar-yemma-casbah': {
    colors: { primary: '#A8422B', secondary: '#F3C68F', accent: '#4A3B32', light: '#FFFBF2' },
    fonts: { serif: '"Lora"', sans: '"Poppins"' },
    scheme: 'dark',
    appBg: 'bg-[#1c0c07]',
    bodyBg: '#1c0c07',
    scrollBg: '#1c0c07',
    scrollThumb: '#4a3b32',
    scrollThumbHover: '#6b5342',
    glassBg: 'rgba(28, 12, 7, 0.88)',
    glassBorder: 'rgba(243,198,143,0.20)',
    cardBg: 'rgba(40, 16, 10, 0.75)',
    heroImg: 'photo-1541518763669-27fef04b14ea?q=80&w=1600&auto=format&fit=crop',
    heroOverlay: 'from-[#1c0c07] via-[#1c0c07]/88 to-[#3d1809]/50',
    about1: 'photo-1476224203421-9ac39bcb3327?q=80&w=800&auto=format&fit=crop',
    about2: 'photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop',
    heroSubtitle: "Cuisine ancestrale de la Casbah classée à l'UNESCO. Maison ottomane authentique, saveurs de Yemma, service en cuivre.",
    textGlow: 'rgba(243,198,143,0.40)',
  },

  // ═══════════════════════════════════════════
  // 12. LA PALMERAIE – Andalusian Riad, Emerald & Gold
  // ═══════════════════════════════════════════
  'la-palmeraie': {
    colors: { primary: '#2D5A27', secondary: '#C99700', accent: '#78281F', light: '#FBF7F0' },
    fonts: { serif: '"Amiri"', sans: '"Tajawal"' },
    scheme: 'dark',
    appBg: 'bg-[#0c1a0a]',
    bodyBg: '#0c1a0a',
    scrollBg: '#0c1a0a',
    scrollThumb: '#2d5a27',
    scrollThumbHover: '#4a8840',
    glassBg: 'rgba(12, 26, 10, 0.88)',
    glassBorder: 'rgba(201,151,0,0.22)',
    cardBg: 'rgba(18, 36, 15, 0.75)',
    heroImg: 'photo-1547592180-85f173990554?q=80&w=1600&auto=format&fit=crop',
    heroOverlay: 'from-[#0c1a0a] via-[#0c1a0a]/85 to-[#0c1a0a]/40',
    about1: 'photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
    about2: 'photo-1533777857889-4be7c70b33f7?q=80&w=800&auto=format&fit=crop',
    heroSubtitle: "Oasis orientale palatiale à Dely Ibrahim. Riad andalou, lanternes berbères, banquets de prestige.",
    textGlow: 'rgba(201,151,0,0.45)',
  },

  // ═══════════════════════════════════════════
  // 13. LE NORMAND – Historic French Terroir, Burgundy & Salmon
  // ═══════════════════════════════════════════
  'le-normand': {
    colors: { primary: '#5C1D24', secondary: '#E07A5F', accent: '#3D405B', light: '#F4F1DE' },
    fonts: { serif: '"Spectral"', sans: '"Jost"' },
    scheme: 'dark',
    appBg: 'bg-[#140608]',
    bodyBg: '#140608',
    scrollBg: '#140608',
    scrollThumb: '#3d1a1e',
    scrollThumbHover: '#5c2830',
    glassBg: 'rgba(20, 6, 8, 0.88)',
    glassBorder: 'rgba(224,122,95,0.20)',
    cardBg: 'rgba(30, 10, 12, 0.75)',
    heroImg: 'photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop',
    heroOverlay: 'from-[#140608] via-[#140608]/85 to-[#3a0c10]/50',
    about1: 'photo-1504718855392-c0f33b372e72?q=80&w=800&auto=format&fit=crop',
    about2: 'photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop',
    heroSubtitle: "Brasserie historique au cœur d'Alger. Terroir français authentique, boiseries anciennes, cuisine de tradition.",
    textGlow: 'rgba(224,122,95,0.40)',
  },

  // ═══════════════════════════════════════════
  // 14. L'AUBERGE DU MOULIN – Stone Mill & Fireplace, Warm Browns
  // ═══════════════════════════════════════════
  'l-auberge-du-moulin': {
    colors: { primary: '#582F0E', secondary: '#A68A64', accent: '#7F4F24', light: '#EDE0D4' },
    fonts: { serif: '"Vollkorn"', sans: '"Cabin"' },
    scheme: 'dark',
    appBg: 'bg-[#1a0d05]',
    bodyBg: '#1a0d05',
    scrollBg: '#1a0d05',
    scrollThumb: '#582f0e',
    scrollThumbHover: '#7f4f24',
    glassBg: 'rgba(26, 13, 5, 0.90)',
    glassBorder: 'rgba(166,138,100,0.22)',
    cardBg: 'rgba(36, 18, 8, 0.78)',
    heroImg: 'photo-1555396273-367ea4eb4db5?q=80&w=1600&auto=format&fit=crop',
    heroOverlay: 'from-[#1a0d05] via-[#1a0d05]/88 to-[#2e1608]/50',
    about1: 'photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    about2: 'photo-1476224203421-9ac39bcb3327?q=80&w=800&auto=format&fit=crop',
    heroSubtitle: "Moulin historique en pierre, feu de bois et méchoui légendaire à Chéraga. Convivialité et gastronomie rustique.",
    textGlow: 'rgba(166,138,100,0.40)',
  },

  // ═══════════════════════════════════════════
  // 15. BELLAGIORNO – Italian Garden Lounge, Forest Green & Terracotta
  // ═══════════════════════════════════════════
  'bellagiorno': {
    colors: { primary: '#2B4C3F', secondary: '#D4A373', accent: '#E76F51', light: '#FAEDCD' },
    fonts: { serif: '"DM Serif Display"', sans: '"DM Sans"' },
    scheme: 'dark',
    appBg: 'bg-[#0d1c17]',
    bodyBg: '#0d1c17',
    scrollBg: '#0d1c17',
    scrollThumb: '#2b4c3f',
    scrollThumbHover: '#3d6b58',
    glassBg: 'rgba(13, 28, 23, 0.88)',
    glassBorder: 'rgba(212,163,115,0.22)',
    cardBg: 'rgba(20, 40, 32, 0.75)',
    heroImg: 'photo-1555396273-367ea4eb4db5?q=80&w=1600&auto=format&fit=crop',
    heroOverlay: 'from-[#0d1c17] via-[#0d1c17]/85 to-[#2b4c3f]/45',
    about1: 'photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop',
    about2: 'photo-1498654896293-37aacf113fd9?q=80&w=800&auto=format&fit=crop',
    heroSubtitle: "Terrasse jardin ouverte, four à bois, pâtes artisanales. La dolce vita méditerranéenne à Alger.",
    textGlow: 'rgba(212,163,115,0.40)',
  },

  // ═══════════════════════════════════════════
  // 16. LA TRATTORIA SHERATON – Five-Star Coastal, Deep Navy & Bright Gold
  // ═══════════════════════════════════════════
  'la-trattoria-sheraton': {
    colors: { primary: '#003566', secondary: '#FFC300', accent: '#001D3D', light: '#FFFFFF' },
    fonts: { serif: '"Bodoni Moda"', sans: '"Inter"' },
    scheme: 'dark',
    appBg: 'bg-[#000d1a]',
    bodyBg: '#000d1a',
    scrollBg: '#000d1a',
    scrollThumb: '#003566',
    scrollThumbHover: '#0058a8',
    glassBg: 'rgba(0, 13, 26, 0.92)',
    glassBorder: 'rgba(255,195,0,0.25)',
    cardBg: 'rgba(0, 20, 40, 0.80)',
    heroImg: 'photo-1505118380757-91f5f5632de0?q=80&w=1600&auto=format&fit=crop',
    heroOverlay: 'from-[#000d1a] via-[#000d1a]/88 to-[#003566]/45',
    about1: 'photo-1514190051997-0f6f39ca5cde?q=80&w=800&auto=format&fit=crop',
    about2: 'photo-1559329007-40df8a9345d8?q=80&w=800&auto=format&fit=crop',
    heroSubtitle: "Trattoria de luxe au Sheraton Club des Pins. Vue mer panoramique, terrasse en bougie, service cinq étoiles.",
    textGlow: 'rgba(255,195,0,0.50)',
  },

  // ═══════════════════════════════════════════
  // 17. EL MORDJANE SOFITEL – Luxury 5-Star, Champagne Gold & Deep Crimson
  // ═══════════════════════════════════════════
  'el-mordjane-sofitel': {
    colors: { primary: '#780016', secondary: '#C5A059', accent: '#1A1A1A', light: '#F8F6F0' },
    fonts: { serif: '"Cormorant Garamond"', sans: '"Cinzel Decorative"' },
    scheme: 'dark',
    appBg: 'bg-[#0d0406]',
    bodyBg: '#0d0406',
    scrollBg: '#0d0406',
    scrollThumb: '#2a0008',
    scrollThumbHover: '#5a0010',
    glassBg: 'rgba(13, 4, 6, 0.92)',
    glassBorder: 'rgba(197,160,89,0.20)',
    cardBg: 'rgba(20, 6, 10, 0.80)',
    heroImg: 'photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop',
    heroOverlay: 'from-[#0d0406] via-[#0d0406]/90 to-[#780016]/30',
    about1: 'photo-1533777857889-4be7c70b33f7?q=80&w=800&auto=format&fit=crop',
    about2: 'photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop',
    heroSubtitle: "Haute cuisine algéroise au Sofitel Hamma Garden. Five-star luxury, jardin botanique, protocole diplomatique.",
    textGlow: 'rgba(197,160,89,0.50)',
  },

  // ═══════════════════════════════════════════
  // 18. LE BÉARNAIS – Haussmannian Brasserie, Deep Burgundy & Gold
  // ═══════════════════════════════════════════
  'le-bearnais': {
    colors: { primary: '#4A0E17', secondary: '#D4AF37', accent: '#2B2D42', light: '#F4F1DE' },
    fonts: { serif: '"Playfair Display SC"', sans: '"Proza Libre"' },
    scheme: 'dark',
    appBg: 'bg-[#100307]',
    bodyBg: '#100307',
    scrollBg: '#100307',
    scrollThumb: '#3a0a12',
    scrollThumbHover: '#5c1020',
    glassBg: 'rgba(16, 3, 7, 0.90)',
    glassBorder: 'rgba(212,175,55,0.15)',
    cardBg: 'rgba(25, 5, 12, 0.78)',
    heroImg: 'photo-1515003197210-e0cd71810b5f?q=80&w=1600&auto=format&fit=crop',
    heroOverlay: 'from-[#100307] via-[#100307]/88 to-[#4a0e17]/45',
    about1: 'photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop',
    about2: 'photo-1504718855392-c0f33b372e72?q=80&w=800&auto=format&fit=crop',
    heroSubtitle: "Institution française historique d'Alger. Brasserie haussmannienne, banquettes en cuir, dîners aux chandelles.",
    textGlow: 'rgba(212,175,55,0.45)',
  },

  // ═══════════════════════════════════════════
  // 19. BEEF CÔTE STEAKHOUSE – Industrial Steakhouse, Black & Blood Red
  // ═══════════════════════════════════════════
  'beef-cote-steakhouse': {
    colors: { primary: '#8D0801', secondary: '#D4AF37', accent: '#495057', light: '#F8F9FA' },
    fonts: { serif: '"Bebas Neue"', sans: '"Barlow"' },
    scheme: 'dark',
    appBg: 'bg-[#080808]',
    bodyBg: '#080808',
    scrollBg: '#080808',
    scrollThumb: '#1a1a1a',
    scrollThumbHover: '#333333',
    glassBg: 'rgba(8, 8, 8, 0.92)',
    glassBorder: 'rgba(141,8,1,0.35)',
    cardBg: 'rgba(15, 5, 5, 0.82)',
    heroImg: 'photo-1558030006-450675393462?q=80&w=1600&auto=format&fit=crop',
    heroOverlay: 'from-[#080808] via-[#080808]/90 to-[#3d0400]/50',
    about1: 'photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    about2: 'photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop',
    heroSubtitle: "Atelier moderne de viande à El Biar. Bœuf maturé, braises ardentes, ambiance industrielle et métropolilaine.",
    textGlow: 'rgba(212,175,55,0.55)',
  },

  // ═══════════════════════════════════════════
  // 20. DWIRET EL AZZ – 17th-Century Moorish Mansion, Maroon & Teal
  // ═══════════════════════════════════════════
  'dwiret-el-azz': {
    colors: { primary: '#49111C', secondary: '#D4AF37', accent: '#0F4C5C', light: '#F8F5EE' },
    fonts: { serif: '"Amiri"', sans: '"Scheherazade New"' },
    scheme: 'dark',
    appBg: 'bg-[#0e0408]',
    bodyBg: '#0e0408',
    scrollBg: '#0e0408',
    scrollThumb: '#2d0810',
    scrollThumbHover: '#49111c',
    glassBg: 'rgba(14, 4, 8, 0.90)',
    glassBorder: 'rgba(212,175,55,0.20)',
    cardBg: 'rgba(22, 6, 12, 0.78)',
    heroImg: 'photo-1585518419759-7fe2e0fbf8a6?q=80&w=1600&auto=format&fit=crop',
    heroOverlay: 'from-[#0e0408] via-[#0e0408]/88 to-[#49111c]/45',
    about1: 'photo-1476224203421-9ac39bcb3327?q=80&w=800&auto=format&fit=crop',
    about2: 'photo-1533777857889-4be7c70b33f7?q=80&w=800&auto=format&fit=crop',
    heroSubtitle: "Demeure mauresque du XVIIème siècle à Hydra. Jardins ombragés, bassin illuminé, hospitalité aristocratique algérienne.",
    textGlow: 'rgba(212,175,55,0.48)',
  },

};

// ─────────────────────────────────────────────────────────────────────────────
// FILE TEMPLATES (applied per restaurant)
// ─────────────────────────────────────────────────────────────────────────────

function buildTailwindConfig(id, cfg) {
  return `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "${cfg.colors.primary}",
          secondary: "${cfg.colors.secondary}",
          accent: "${cfg.colors.accent}",
          light: "${cfg.colors.light}",
        }
      },
      fontFamily: {
        serif: ['${cfg.fonts.serif}', 'Georgia', 'serif'],
        sans: ['${cfg.fonts.sans}', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
`;
}

function buildIndexCSS(id, cfg) {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .text-glow {
    text-shadow: 0 0 20px ${cfg.textGlow};
  }
  .glass-panel {
    background: ${cfg.glassBg};
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid ${cfg.glassBorder};
  }
  .glass-card {
    background: ${cfg.cardBg};
    backdrop-filter: blur(12px);
    border: 1px solid ${cfg.glassBorder};
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: ${cfg.scrollBg};
}
::-webkit-scrollbar-thumb {
  background: ${cfg.scrollThumb};
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: ${cfg.scrollThumbHover};
}
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// UPDATE FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

function updateAppTsx(filePath, cfg) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace bg-stone-950 or existing bg-[...] in the root div
  content = content.replace(
    /className="min-h-screen bg-[^\s"]+/,
    `className="min-h-screen ${cfg.appBg}`
  );
  fs.writeFileSync(filePath, content, 'utf8');
}

function updateHeroTsx(filePath, cfg) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace hero image URL
  content = content.replace(
    /src="https:\/\/images\.unsplash\.com\/[^"]+"/,
    `src="https://images.unsplash.com/${cfg.heroImg}"`
  );

  // Replace gradient overlay class
  content = content.replace(
    /className="absolute inset-0 bg-gradient-to-t [^"]+"/,
    `className="absolute inset-0 bg-gradient-to-t ${cfg.heroOverlay}"`
  );

  // Replace subtitle text – look for the static French subtitle paragraph
  content = content.replace(
    /Une expérience d'exception[^<]*/,
    cfg.heroSubtitle
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

function updateAboutTsx(filePath, cfg) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace about section background
  content = content.replace(
    /className="py-24 bg-[^\s"]+/,
    `className="py-24 ${cfg.appBg}`
  );

  // Replace first image
  const img1Regex = /src="https:\/\/images\.unsplash\.com\/[^"]+"\s+alt="Atmosphère intérieure"/;
  content = content.replace(
    img1Regex,
    `src="https://images.unsplash.com/${cfg.about1}" alt="Atmosphère intérieure"`
  );

  // Replace second image
  const img2Regex = /src="https:\/\/images\.unsplash\.com\/[^"]+"\s+alt="Plats d'exception"/;
  content = content.replace(
    img2Regex,
    `src="https://images.unsplash.com/${cfg.about2}" alt="Plats d'exception"`
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

function updateFooterTsx(filePath, cfg) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace footer background
  content = content.replace(
    /className="bg-stone-950 border-t border-stone-900/,
    `className="${cfg.appBg} border-t border-brand-primary/30`
  );
  fs.writeFileSync(filePath, content, 'utf8');
}

function injectGoogleFonts(htmlPath, cfg) {
  let content = fs.readFileSync(htmlPath, 'utf8');

  // Derive font name from the quote-stripped serif font name
  const serifName = cfg.fonts.serif.replace(/['"]/g, '');
  const sansName = cfg.fonts.sans.replace(/['"]/g, '');

  // Build Google Fonts URL (only for known preconnectable fonts)
  const fontQuery = encodeURIComponent(`${serifName}:wght@400;600;700|${sansName}:wght@300;400;500;600;700`);
  const fontLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=${fontQuery}&display=swap" rel="stylesheet">`;

  // Remove existing font links if any
  content = content.replace(/<link[^>]+fonts\.googleapis[^>]+>/g, '');
  content = content.replace(/<link[^>]+fonts\.gstatic[^>]+>/g, '');

  // Inject before </head>
  content = content.replace('</head>', `    ${fontLink}\n  </head>`);

  fs.writeFileSync(htmlPath, content, 'utf8');
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN RUNNER
// ─────────────────────────────────────────────────────────────────────────────

const appsDir = path.join(__dirname, '..', 'apps');
const restaurantDirs = fs.readdirSync(appsDir);

let updated = 0;
let skipped = 0;
const errors = [];

for (const restaurantId of restaurantDirs) {
  const cfg = identities[restaurantId];
  if (!cfg) {
    console.log(`⚠️  No identity config for: ${restaurantId} – skipping`);
    skipped++;
    continue;
  }

  const baseDir = path.join(appsDir, restaurantId);
  const srcDir = path.join(baseDir, 'src');
  const componentsDir = path.join(srcDir, 'components');

  try {
    // 1. tailwind.config.js
    fs.writeFileSync(
      path.join(baseDir, 'tailwind.config.js'),
      buildTailwindConfig(restaurantId, cfg),
      'utf8'
    );

    // 2. index.css
    fs.writeFileSync(
      path.join(srcDir, 'index.css'),
      buildIndexCSS(restaurantId, cfg),
      'utf8'
    );

    // 3. App.tsx
    updateAppTsx(path.join(srcDir, 'App.tsx'), cfg);

    // 4. Hero.tsx
    updateHeroTsx(path.join(componentsDir, 'Hero.tsx'), cfg);

    // 5. About.tsx
    updateAboutTsx(path.join(componentsDir, 'About.tsx'), cfg);

    // 6. Footer.tsx
    updateFooterTsx(path.join(componentsDir, 'Footer.tsx'), cfg);

    // 7. index.html – inject Google Fonts
    injectGoogleFonts(path.join(baseDir, 'index.html'), cfg);

    console.log(`✅ ${restaurantId}`);
    updated++;
  } catch (err) {
    console.error(`❌ ${restaurantId}: ${err.message}`);
    errors.push({ id: restaurantId, error: err.message });
  }
}

console.log(`\n═══════════════════════════════`);
console.log(`✅ Updated : ${updated}`);
console.log(`⚠️  Skipped : ${skipped}`);
console.log(`❌ Errors  : ${errors.length}`);
if (errors.length > 0) {
  errors.forEach(e => console.log(`   - ${e.id}: ${e.error}`));
}

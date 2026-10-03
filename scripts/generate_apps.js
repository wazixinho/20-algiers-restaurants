import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const restaurantsDataPath = path.join(rootDir, 'restaurants_data.json');
const restaurants = JSON.parse(fs.readFileSync(restaurantsDataPath, 'utf-8'));

console.log(`Loaded ${restaurants.length} restaurants from restaurants_data.json`);

// Curated high quality imagery based on culinary categories
const cuisineImages = {
  traditional: {
    hero: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=1600&auto=format&fit=crop',
    about1: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
    about2: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    dish: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=600&auto=format&fit=crop'
  },
  seafood: {
    hero: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1600&auto=format&fit=crop',
    about1: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop',
    about2: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=800&auto=format&fit=crop',
    dish: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop'
  },
  french: {
    hero: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1600&auto=format&fit=crop',
    about1: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop',
    about2: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop',
    dish: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=600&auto=format&fit=crop'
  },
  italian: {
    hero: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1600&auto=format&fit=crop',
    about1: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop',
    about2: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=800&auto=format&fit=crop',
    dish: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop'
  },
  steakhouse: {
    hero: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop',
    about1: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop',
    about2: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    dish: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop'
  },
  lebanese: {
    hero: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=1600&auto=format&fit=crop',
    about1: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&auto=format&fit=crop',
    about2: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
    dish: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=600&auto=format&fit=crop'
  }
};

function getCuisineTheme(cuisines) {
  const cStr = cuisines.join(' ').toLowerCase();
  if (cStr.includes('seafood') || cStr.includes('maritime') || cStr.includes('poisson')) return cuisineImages.seafood;
  if (cStr.includes('steak') || cStr.includes('grill') || cStr.includes('meat')) return cuisineImages.steakhouse;
  if (cStr.includes('italian')) return cuisineImages.italian;
  if (cStr.includes('lebanese') || cStr.includes('middle eastern')) return cuisineImages.lebanese;
  if (cStr.includes('french') || cStr.includes('bistro')) return cuisineImages.french;
  return cuisineImages.traditional;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Generate code for a single restaurant
function generateAppForRestaurant(restaurant) {
  const slug = restaurant.id;
  const appDir = path.join(rootDir, 'apps', slug);
  const srcDir = path.join(appDir, 'src');
  const compDir = path.join(srcDir, 'components');
  const pagesDir = path.join(srcDir, 'pages');
  const dataDir = path.join(srcDir, 'data');

  ensureDir(appDir);
  ensureDir(srcDir);
  ensureDir(compDir);
  ensureDir(pagesDir);
  ensureDir(dataDir);

  const themeImages = getCuisineTheme(restaurant.cuisine);
  const primaryColor = restaurant.branding.color_palette[0] || '#1A1A1A';
  const secondaryColor = restaurant.branding.color_palette[1] || '#D4AF37';
  const accentColor = restaurant.branding.color_palette[2] || '#2C3E50';
  const lightColor = restaurant.branding.color_palette[3] || '#F9FAFB';

  // 1. package.json
  const packageJson = {
    name: `@restaurants/${slug}`,
    private: true,
    version: "1.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "vite build",
      preview: "vite preview"
    },
    dependencies: {
      "lucide-react": "^0.469.0",
      "react": "^18.3.1",
      "react-dom": "^18.3.1"
    },
    devDependencies: {
      "@types/react": "^18.3.18",
      "@types/react-dom": "^18.3.5",
      "@vitejs/plugin-react": "^4.3.4",
      "autoprefixer": "^10.4.20",
      "postcss": "^8.4.49",
      "tailwindcss": "^3.4.17",
      "typescript": "^5.7.3",
      "vite": "^6.0.7"
    }
  };
  fs.writeFileSync(path.join(appDir, 'package.json'), JSON.stringify(packageJson, null, 2));

  // 2. vite.config.ts
  const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 3000
  }
});
`;
  fs.writeFileSync(path.join(appDir, 'vite.config.ts'), viteConfig);

  // 3. tsconfig.json
  const tsConfig = `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
`;
  fs.writeFileSync(path.join(appDir, 'tsconfig.json'), tsConfig);

  // 4. postcss.config.js
  const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
  fs.writeFileSync(path.join(appDir, 'postcss.config.js'), postcssConfig);

  // 5. tailwind.config.js
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "${primaryColor}",
          secondary: "${secondaryColor}",
          accent: "${accentColor}",
          light: "${lightColor}",
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
`;
  fs.writeFileSync(path.join(appDir, 'tailwind.config.js'), tailwindConfig);

  // 6. index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${restaurant.name} | Alger</title>
    <meta name="description" content="${restaurant.name} - ${restaurant.cuisine.join(', ')} à Alger. ${restaurant.address}." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23D4AF37' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2'/><path d='M7 2v20'/><path d='M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7'/></svg>" />
  </head>
  <body class="bg-stone-950 text-stone-100 font-sans antialiased selection:bg-brand-secondary selection:text-black">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
  fs.writeFileSync(path.join(appDir, 'index.html'), indexHtml);

  // 7. src/index.css
  const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .text-glow {
    text-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
  }
  .glass-panel {
    background: rgba(18, 18, 18, 0.75);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .glass-card {
    background: rgba(28, 28, 30, 0.65);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0c0a09;
}
::-webkit-scrollbar-thumb {
  background: #292524;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #44403c;
}
`;
  fs.writeFileSync(path.join(srcDir, 'index.css'), indexCss);

  // 8. src/types.ts
  const typesTs = `export interface MenuItem {
  id?: string;
  name: string;
  description: string;
  price: string;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export interface RestaurantHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  [key: string]: string;
}

export interface RestaurantBranding {
  color_palette: string[];
  aesthetic_keywords: string[];
  logo_description: string;
}

export interface RestaurantSocialLinks {
  instagram?: string;
  facebook?: string;
  website?: string;
  [key: string]: string | undefined;
}

export interface RestaurantProfile {
  id: string;
  name: string;
  cuisine: string[];
  address: string;
  phone: string;
  hours: RestaurantHours;
  social_links: RestaurantSocialLinks;
  branding: RestaurantBranding;
  menu: MenuCategory[];
}
`;
  fs.writeFileSync(path.join(srcDir, 'types.ts'), typesTs);

  // 9. src/data/restaurant.ts
  const initialDataCode = `import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = ${JSON.stringify(restaurant, null, 2)};

export const STORAGE_KEY = 'restaurant_data_${slug}';

export function getStoredRestaurantData(): RestaurantProfile {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load local storage data', e);
  }
  return initialRestaurantData;
}

export function saveStoredRestaurantData(data: RestaurantProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data to local storage', e);
  }
}

export function resetStoredRestaurantData(): RestaurantProfile {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset data', e);
  }
  return initialRestaurantData;
}
`;
  fs.writeFileSync(path.join(dataDir, 'restaurant.ts'), initialDataCode);

  // 10. src/components/Navbar.tsx
  const navbarTsx = `import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Clock, MapPin, Menu, X, Sparkles } from 'lucide-react';
import { RestaurantProfile } from '../types';

interface NavbarProps {
  restaurant: RestaurantProfile;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ restaurant, onOpenReservation }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenToday, setIsOpenToday] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if open today
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = days[new Date().getDay()];
    const todayHours = restaurant.hours[currentDay] || '';
    setIsOpenToday(!todayHours.toLowerCase().includes('closed') && !todayHours.toLowerCase().includes('fermé'));
  }, [restaurant.hours]);

  return (
    <header className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${scrolled ? 'glass-panel py-3 shadow-2xl' : 'bg-transparent py-5'}\`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-brand-secondary/40 bg-stone-900/80 flex items-center justify-center text-brand-secondary transition-transform group-hover:scale-105">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white block leading-tight">
                {restaurant.name}
              </span>
              <span className="text-xs text-brand-secondary font-medium tracking-wider uppercase block">
                {restaurant.cuisine[0]} • Alger
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm text-stone-300 hover:text-brand-secondary transition-colors font-medium">
              Notre Histoire
            </a>
            <a href="#menu" className="text-sm text-stone-300 hover:text-brand-secondary transition-colors font-medium">
              La Carte
            </a>
            <a href="#hours-location" className="text-sm text-stone-300 hover:text-brand-secondary transition-colors font-medium">
              Horaires & Accès
            </a>
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Live status badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/70 border border-stone-800 text-xs">
              <span className={\`w-2 h-2 rounded-full \${isOpenToday ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}\`}></span>
              <span className="text-stone-300">{isOpenToday ? 'Ouvert Aujourd\\'hui' : 'Fermé Aujourd\\'hui'}</span>
            </div>

            <button
              onClick={onOpenReservation}
              className="px-4 py-2 rounded-full bg-brand-secondary text-stone-950 font-semibold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-brand-secondary/20 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Réserver une Table</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-400 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 pb-6 border-t border-stone-800 glass-card rounded-2xl px-5 space-y-4">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-stone-300 hover:text-brand-secondary text-base font-medium py-1"
            >
              Notre Histoire
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-stone-300 hover:text-brand-secondary text-base font-medium py-1"
            >
              La Carte Gastronomique
            </a>
            <a
              href="#hours-location"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-stone-300 hover:text-brand-secondary text-base font-medium py-1"
            >
              Horaires & Emplacement
            </a>
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-2.5 rounded-xl bg-brand-secondary text-stone-950 font-semibold text-center text-sm shadow-md"
              >
                Réserver une Table
              </button>
              <a
                href={\`tel:\${restaurant.phone.replace(/\\s+/g, '')}\`}
                className="w-full py-2.5 rounded-xl border border-stone-700 text-stone-300 font-medium text-center text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-brand-secondary" />
                <span>{restaurant.phone}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
`;
  fs.writeFileSync(path.join(compDir, 'Navbar.tsx'), navbarTsx);

  // 11. src/components/Hero.tsx
  const heroTsx = `import React from 'react';
import { Calendar, UtensilsCrossed, Star, MapPin, Award, ArrowDown } from 'lucide-react';
import { RestaurantProfile } from '../types';

interface HeroProps {
  restaurant: RestaurantProfile;
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ restaurant, onOpenReservation }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Cinematic Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="${themeImages.hero}"
          alt="${restaurant.name}"
          className="w-full h-full object-cover object-center scale-105 animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(12,10,9,0.85)_100%)]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Aesthetic badges */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-brand-secondary/30 text-brand-secondary text-xs sm:text-sm font-medium mb-6 uppercase tracking-widest shadow-xl">
          <Award className="w-4 h-4 text-brand-secondary" />
          <span>{restaurant.cuisine.join(' • ')}</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1] text-glow">
          {restaurant.name}
        </h1>

        {/* District & Aesthetic subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-stone-300 font-light mb-10 leading-relaxed">
          Une expérience d'exception au cœur d'Alger. ${restaurant.branding.aesthetic_keywords.slice(0, 4).join(', ')}.
        </p>

        {/* Dual CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-secondary text-stone-950 font-bold text-base hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-brand-secondary/25 flex items-center justify-center gap-3"
          >
            <Calendar className="w-5 h-5" />
            <span>Réserver une Table</span>
          </button>
          <a
            href="#menu"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel border border-stone-700 text-stone-100 font-semibold text-base hover:bg-stone-800/80 hover:border-brand-secondary/50 transition-all flex items-center justify-center gap-3"
          >
            <UtensilsCrossed className="w-5 h-5 text-brand-secondary" />
            <span>Découvrir le Menu</span>
          </a>
        </div>

        {/* Highlight Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-stone-800/80 pt-8">
          <div className="text-center p-3">
            <div className="flex items-center justify-center gap-1 text-brand-secondary font-bold text-xl sm:text-2xl">
              <Star className="w-5 h-5 fill-current" />
              <span>4.8 / 5</span>
            </div>
            <div className="text-xs text-stone-400 font-medium mt-1">Excellence Recommandée</div>
          </div>
          <div className="text-center p-3">
            <div className="text-white font-bold text-xl sm:text-2xl">
              Alger
            </div>
            <div className="text-xs text-stone-400 font-medium mt-1">{restaurant.address.split(',')[1] || 'Centre-Ville'}</div>
          </div>
          <div className="text-center p-3">
            <div className="text-white font-bold text-xl sm:text-2xl">
              100% Frais
            </div>
            <div className="text-xs text-stone-400 font-medium mt-1">Produits du Terroir</div>
          </div>
          <div className="text-center p-3">
            <div className="text-white font-bold text-xl sm:text-2xl">
              Sur Mesure
            </div>
            <div className="text-xs text-stone-400 font-medium mt-1">Service & Réception</div>
          </div>
        </div>
      </div>

      {/* Down indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-stone-500 animate-bounce">
        <a href="#about" aria-label="Défiler vers le bas">
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};
`;
  fs.writeFileSync(path.join(compDir, 'Hero.tsx'), heroTsx);

  // 12. src/components/About.tsx
  const aboutTsx = `import React from 'react';
import { Sparkles, MapPin, Heart, ShieldCheck, Compass } from 'lucide-react';
import { RestaurantProfile } from '../types';

interface AboutProps {
  restaurant: RestaurantProfile;
}

export const About: React.FC<AboutProps> = ({ restaurant }) => {
  return (
    <section id="about" className="py-24 bg-stone-950 relative border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Narrative description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-brand-secondary/30 text-brand-secondary text-xs uppercase tracking-wider font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>L'Esprit & L'Histoire</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Une table emblématique et raffinée à Alger
            </h2>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
              Né d'une passion inébranlable pour la haute gastronomie, <strong>{restaurant.name}</strong> s'impose comme une référence culinaire incontournable. Notre établissement marie les trésors gustatifs de la Méditerranée et du patrimoine algérien avec une exigence de présentation moderne.
            </p>

            <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
              Situé au <em>{restaurant.address}</em>, notre cadre a été conçu pour offrir un voyage sensoriel unique : {restaurant.branding.logo_description}
            </p>

            {/* Three Pillar Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="glass-card p-4 rounded-xl border border-stone-800">
                <Sparkles className="w-6 h-6 text-brand-secondary mb-2" />
                <h3 className="text-white font-semibold text-sm mb-1">Atmosphère</h3>
                <p className="text-stone-400 text-xs">
                  {restaurant.branding.aesthetic_keywords.slice(0, 3).join(', ')}.
                </p>
              </div>
              <div className="glass-card p-4 rounded-xl border border-stone-800">
                <Heart className="w-6 h-6 text-brand-secondary mb-2" />
                <h3 className="text-white font-semibold text-sm mb-1">Authenticité</h3>
                <p className="text-stone-400 text-xs">
                  Sélection rigoureuse des meilleurs ingrédients locaux et épices raffinées.
                </p>
              </div>
              <div className="glass-card p-4 rounded-xl border border-stone-800">
                <ShieldCheck className="w-6 h-6 text-brand-secondary mb-2" />
                <h3 className="text-white font-semibold text-sm mb-1">Savoir-Faire</h3>
                <p className="text-stone-400 text-xs">
                  Une équipe dédiée pour faire de chaque dîner un souvenir inoubliable.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-64 rounded-2xl overflow-hidden shadow-2xl border border-stone-800">
                <img
                  src="${themeImages.about1}"
                  alt="Atmosphère intérieure"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 rounded-2xl bg-brand-primary/40 border border-brand-secondary/30 text-center">
                <span className="block font-serif text-3xl font-bold text-brand-secondary mb-1">100%</span>
                <span className="text-xs text-stone-300 font-medium">Fait Maison & Frais</span>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 text-center">
                <MapPin className="w-6 h-6 text-brand-secondary mx-auto mb-2" />
                <span className="text-xs text-stone-400 font-semibold uppercase block">Localisation</span>
                <span className="text-sm font-medium text-white block mt-1">Alger Prestige</span>
              </div>
              <div className="h-64 rounded-2xl overflow-hidden shadow-2xl border border-stone-800">
                <img
                  src="${themeImages.about2}"
                  alt="Plats d'exception"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
`;
  fs.writeFileSync(path.join(compDir, 'About.tsx'), aboutTsx);

  // 13. src/components/MenuSection.tsx
  const menuTsx = `import React, { useState } from 'react';
import { Utensils, Search, Sparkles, CheckCircle2 } from 'lucide-react';
import { MenuCategory, MenuItem } from '../types';

interface MenuSectionProps {
  categories: MenuCategory[];
  onSelectItem?: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ categories, onSelectItem }) => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.category || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderItems, setSelectedOrderItems] = useState<string[]>([]);

  // Filter items based on active category and search
  const currentCategoryObj = categories.find(c => c.category === activeCategory) || categories[0];
  
  const displayedItems = (currentCategoryObj ? currentCategoryObj.items : []).filter(item => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
  });

  const toggleOrderItem = (itemName: string) => {
    setSelectedOrderItems(prev => 
      prev.includes(itemName) ? prev.filter(i => i !== itemName) : [...prev, itemName]
    );
  };

  return (
    <section id="menu" className="py-24 bg-stone-900/50 relative border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800 border border-brand-secondary/30 text-brand-secondary text-xs uppercase tracking-wider font-semibold mb-3">
            <Utensils className="w-3.5 h-3.5" />
            <span>Sélection Gastronomique</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Notre Carte & Spécialités
          </h2>
          <p className="text-stone-400 text-sm sm:text-base">
            Des recettes minutieusement préparées chaque jour avec des viandes sélectionnées, poissons frais et épices raffinées.
          </p>
        </div>

        {/* Search & Category Selector Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={\`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 \${
                  activeCategory === cat.category
                    ? 'bg-brand-secondary text-stone-950 shadow-lg shadow-brand-secondary/20'
                    : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700/80'
                }\`}
              >
                <span>{cat.category}</span>
                <span className={\`text-xs px-2 py-0.5 rounded-full \${activeCategory === cat.category ? 'bg-stone-950/20 text-stone-900' : 'bg-stone-900 text-stone-400'}\`}>
                  {cat.items.length}
                </span>
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher un plat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-full pl-9 pr-4 py-2 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-brand-secondary"
            />
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedItems.length > 0 ? (
            displayedItems.map((item, idx) => {
              const isSelected = selectedOrderItems.includes(item.name);
              return (
                <div
                  key={idx}
                  className="glass-card p-6 rounded-2xl border border-stone-800 hover:border-brand-secondary/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-serif text-xl font-bold text-white group-hover:text-brand-secondary transition-colors">
                        {item.name}
                      </h3>
                      <span className="shrink-0 px-3 py-1 rounded-full bg-stone-800/90 border border-brand-secondary/30 text-brand-secondary font-bold text-sm tracking-wide">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-stone-400 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-800/60 text-xs">
                    <span className="text-stone-500 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-brand-secondary/70" />
                      Fait maison
                    </span>

                    <button
                      onClick={() => toggleOrderItem(item.name)}
                      className={\`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 \${
                        isSelected
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                      }\`}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Sélectionné</span>
                        </>
                      ) : (
                        <span>Ajouter au souhait</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-2 text-center py-12 text-stone-500">
              Aucun plat ne correspond à votre recherche "{searchQuery}".
            </div>
          )}
        </div>

        {/* Selected wishlist toast */}
        {selectedOrderItems.length > 0 && (
          <div className="mt-8 p-4 rounded-xl glass-panel border border-brand-secondary/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-white font-semibold text-sm">Vos plats favoris ({selectedOrderItems.length}) :</span>
              <p className="text-xs text-stone-400 mt-0.5">{selectedOrderItems.join(', ')}</p>
            </div>
            <a
              href="#hours-location"
              className="px-4 py-2 rounded-lg bg-brand-secondary text-stone-950 font-bold text-xs uppercase tracking-wider shrink-0"
            >
              Commander par téléphone
            </a>
          </div>
        )}

      </div>
    </section>
  );
};
`;
  fs.writeFileSync(path.join(compDir, 'MenuSection.tsx'), menuTsx);

  // 14. src/components/HoursLocation.tsx
  const hoursLocationTsx = `import React from 'react';
import { Clock, MapPin, Phone, Instagram, Facebook, Globe, Calendar, Navigation } from 'lucide-react';
import { RestaurantProfile } from '../types';

interface HoursLocationProps {
  restaurant: RestaurantProfile;
  onOpenReservation: () => void;
}

const dayLabels: Record<string, string> = {
  monday: 'Lundi',
  tuesday: 'Mardi',
  wednesday: 'Mercredi',
  thursday: 'Jeudi',
  friday: 'Vendredi',
  saturday: 'Samedi',
  sunday: 'Dimanche'
};

export const HoursLocation: React.FC<HoursLocationProps> = ({ restaurant, onOpenReservation }) => {
  const currentDayIndex = new Date().getDay();
  const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayKey = dayKeys[currentDayIndex];

  return (
    <section id="hours-location" className="py-24 bg-stone-950 relative border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Operating Hours Table */}
          <div className="lg:col-span-6 glass-card p-8 rounded-3xl border border-stone-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-secondary/20 flex items-center justify-center text-brand-secondary">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">Horaires d'Ouverture</h3>
                  <p className="text-xs text-stone-400">Accueil déjeuner et dîner</p>
                </div>
              </div>

              <div className="space-y-3">
                {Object.entries(dayLabels).map(([key, label]) => {
                  const hoursText = restaurant.hours[key] || '12:00 - 23:00';
                  const isToday = key === todayKey;
                  const isClosed = hoursText.toLowerCase().includes('closed') || hoursText.toLowerCase().includes('fermé');

                  return (
                    <div
                      key={key}
                      className={\`flex items-center justify-between p-3 rounded-xl transition-all \${
                        isToday
                          ? 'bg-brand-secondary/15 border border-brand-secondary/40 text-white'
                          : 'bg-stone-900/60 text-stone-300'
                      }\`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{label}</span>
                        {isToday && (
                          <span className="px-2 py-0.5 rounded-full bg-brand-secondary text-stone-950 text-[10px] font-bold uppercase">
                            Aujourd'hui
                          </span>
                        )}
                      </div>
                      <span className={\`text-sm font-semibold \${isClosed ? 'text-rose-400' : 'text-stone-200'}\`}>
                        {hoursText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-800 flex items-center justify-between">
              <span className="text-xs text-stone-400">Réservation vivement recommandée</span>
              <button
                onClick={onOpenReservation}
                className="px-4 py-2 rounded-xl bg-brand-secondary text-stone-950 font-bold text-xs uppercase tracking-wider hover:brightness-110"
              >
                Réserver
              </button>
            </div>
          </div>

          {/* Contact, Physical Address & Click to Call */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Phone Card with Click-to-Call */}
            <div className="glass-card p-8 rounded-3xl border border-stone-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-secondary/20 flex items-center justify-center text-brand-secondary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">Réservation & Renseignements</h3>
                  <p className="text-xs text-stone-400">Appel direct avec l'équipe de salle</p>
                </div>
              </div>

              <p className="text-stone-300 text-sm mb-6">
                Pour toute demande spéciale, banquet privé ou réservation de groupe :
              </p>

              <a
                href={\`tel:\${restaurant.phone.replace(/\\s+/g, '')}\`}
                className="w-full py-4 px-6 rounded-2xl bg-brand-secondary text-stone-950 font-bold text-lg flex items-center justify-center gap-3 hover:brightness-110 active:scale-98 transition-all shadow-xl shadow-brand-secondary/20"
              >
                <Phone className="w-5 h-5" />
                <span>{restaurant.phone}</span>
              </a>
            </div>

            {/* Address & Navigation Card */}
            <div className="glass-card p-8 rounded-3xl border border-stone-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-secondary/20 flex items-center justify-center text-brand-secondary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">Adresse & Emplacement</h3>
                  <p className="text-xs text-stone-400">Capitale, Alger</p>
                </div>
              </div>

              <p className="text-stone-200 text-base font-medium mb-4">
                {restaurant.address}
              </p>

              {/* Social Links */}
              <div className="pt-4 border-t border-stone-800 flex items-center gap-4">
                <span className="text-xs text-stone-400">Suivez-nous :</span>
                {restaurant.social_links.facebook && (
                  <a
                    href={restaurant.social_links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-stone-900 border border-stone-700 text-stone-300 hover:text-brand-secondary hover:border-brand-secondary transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {restaurant.social_links.instagram && (
                  <a
                    href={restaurant.social_links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-stone-900 border border-stone-700 text-stone-300 hover:text-brand-secondary hover:border-brand-secondary transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {restaurant.social_links.website && (
                  <a
                    href={restaurant.social_links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-stone-900 border border-stone-700 text-stone-300 hover:text-brand-secondary hover:border-brand-secondary transition-colors"
                    aria-label="Site officiel"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
`;
  fs.writeFileSync(path.join(compDir, 'HoursLocation.tsx'), hoursLocationTsx);

  // 15. src/components/ReservationModal.tsx
  const reservationModalTsx = `import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle, Phone } from 'lucide-react';
import { RestaurantProfile } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: RestaurantProfile;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, restaurant }) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmed');
  };

  const handleReset = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-stone-700 shadow-2xl text-stone-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-brand-secondary">
                {restaurant.name}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Réserver une Table
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Confirmation immédiate • Service sans frais
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                  Nom Complet
                </label>
                <input
                  required
                  type="text"
                  placeholder="Ex: Karim Benali"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-brand-secondary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                  Numéro de Téléphone
                </label>
                <input
                  required
                  type="tel"
                  placeholder="Ex: 0550 00 00 00"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-brand-secondary"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                    Couverts
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-brand-secondary"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(n => (
                      <option key={n} value={n}>{n} pers.</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-brand-secondary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                    Heure
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-brand-secondary"
                  >
                    {['12:00', '12:30', '13:00', '13:30', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                  Demandes particulières (facultatif)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Table en terrasse, anniversaire, régime spécifique..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2 text-sm text-stone-100 focus:outline-none focus:border-brand-secondary"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-xl bg-brand-secondary text-stone-950 font-bold text-sm uppercase tracking-wider hover:brightness-110 active:scale-98 transition-all shadow-lg shadow-brand-secondary/20"
              >
                Confirmer la Réservation
              </button>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Demande Enregistrée !
            </h3>
            <p className="text-sm text-stone-300 max-w-sm mx-auto">
              Merci, <strong>{formData.name}</strong>. Votre table pour <strong>{formData.guests} personnes</strong> le <strong>{formData.date}</strong> à <strong>{formData.time}</strong> a bien été transmise à l'équipe de <em>{restaurant.name}</em>.
            </p>
            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-400">
              Un SMS de confirmation sera envoyé à votre numéro <strong>{formData.phone}</strong>.
            </div>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 rounded-xl bg-brand-secondary text-stone-950 font-semibold text-sm hover:brightness-110"
            >
              Fermer
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
`;
  fs.writeFileSync(path.join(compDir, 'ReservationModal.tsx'), reservationModalTsx);

  // 16. src/components/Footer.tsx
  const footerTsx = `import React from 'react';
import { Sparkles, Phone, MapPin } from 'lucide-react';
import { RestaurantProfile } from '../types';

interface FooterProps {
  restaurant: RestaurantProfile;
}

export const Footer: React.FC<FooterProps> = ({ restaurant }) => {
  return (
    <footer className="bg-stone-950 border-t border-stone-900 text-stone-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-stone-900">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-brand-secondary/40 flex items-center justify-center text-brand-secondary">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-serif text-xl font-bold text-white">
              {restaurant.name}
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a href="#about" className="hover:text-brand-secondary transition-colors">Histoire</a>
            <a href="#menu" className="hover:text-brand-secondary transition-colors">La Carte</a>
            <a href="#hours-location" className="hover:text-brand-secondary transition-colors">Horaires & Contact</a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} {restaurant.name}. Tous droits réservés. Alger, Algérie.</p>
          <p className="flex items-center gap-1">
            <span>Adresse officielle :</span>
            <span className="text-stone-400">{restaurant.address}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
`;
  fs.writeFileSync(path.join(compDir, 'Footer.tsx'), footerTsx);

  // 17. src/pages/Admin.tsx (Hidden Admin Interface at /admin)
  const adminTsx = `import React, { useState } from 'react';
import { Shield, Key, Plus, Trash2, Edit3, Save, RefreshCw, Download, ArrowLeft, Check, Phone, MapPin, Clock } from 'lucide-react';
import { RestaurantProfile, MenuItem, MenuCategory } from '../types';
import { saveStoredRestaurantData, resetStoredRestaurantData } from '../data/restaurant';

interface AdminProps {
  restaurant: RestaurantProfile;
  onUpdateRestaurant: (updated: RestaurantProfile) => void;
  onBackToSite: () => void;
}

export const Admin: React.FC<AdminProps> = ({ restaurant, onUpdateRestaurant, onBackToSite }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Admin tabs
  const [activeTab, setActiveTab] = useState<'menu' | 'hours' | 'contact'>('menu');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Editable state
  const [editableProfile, setEditableProfile] = useState<RestaurantProfile>({ ...restaurant });

  // New item modal/form state
  const [selectedCategory, setSelectedCategory] = useState(restaurant.menu[0]?.category || 'Starters');
  const [newItemName, setNewItemName] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Check against default credentials or custom
    if ((username === 'admin' && password === 'admin123!') || 
        (username === 'admin' && password === 'admin') ||
        (username.length > 2 && password === 'admin123!')) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Identifiants incorrects. Par défaut: admin / admin123!');
    }
  };

  const handleSave = () => {
    saveStoredRestaurantData(editableProfile);
    onUpdateRestaurant(editableProfile);
    setFeedbackMsg('Modifications enregistrées avec succès dans la base locale !');
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  const handleResetFactory = () => {
    if (confirm('Êtes-vous sûr de vouloir restaurer les données d\\'origine ?')) {
      const reset = resetStoredRestaurantData();
      setEditableProfile({ ...reset });
      onUpdateRestaurant(reset);
      setFeedbackMsg('Données restaurées aux paramètres initiaux.');
      setTimeout(() => setFeedbackMsg(''), 4000);
    }
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(editableProfile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", \`\${restaurant.id}_updated.json\`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Add Item
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) return;

    const newItem: MenuItem = {
      name: newItemName,
      description: newItemDesc || 'Spécialité du chef préparée avec les produits frais du jour.',
      price: newItemPrice.includes('DZD') ? newItemPrice : \`\${newItemPrice} DZD\`
    };

    const updatedMenu = editableProfile.menu.map(cat => {
      if (cat.category === selectedCategory) {
        return { ...cat, items: [...cat.items, newItem] };
      }
      return cat;
    });

    const updated = { ...editableProfile, menu: updatedMenu };
    setEditableProfile(updated);
    setNewItemName('');
    setNewItemDesc('');
    setNewItemPrice('');
    setFeedbackMsg(\`Plat "\${newItem.name}" ajouté avec succès !\`);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  // Delete Item
  const handleDeleteItem = (catIndex: number, itemIndex: number) => {
    const updatedMenu = editableProfile.menu.map((cat, cIdx) => {
      if (cIdx === catIndex) {
        return {
          ...cat,
          items: cat.items.filter((_, iIdx) => iIdx !== itemIndex)
        };
      }
      return cat;
    });
    setEditableProfile({ ...editableProfile, menu: updatedMenu });
  };

  // Update item field
  const handleItemChange = (catIndex: number, itemIndex: number, field: keyof MenuItem, value: string) => {
    const updatedMenu = editableProfile.menu.map((cat, cIdx) => {
      if (cIdx === catIndex) {
        const updatedItems = cat.items.map((it, iIdx) => {
          if (iIdx === itemIndex) {
            return { ...it, [field]: value };
          }
          return it;
        });
        return { ...cat, items: updatedItems };
      }
      return cat;
    });
    setEditableProfile({ ...editableProfile, menu: updatedMenu });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-stone-800 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-brand-secondary/20 text-brand-secondary flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-white">Portail Administration</h2>
            <p className="text-xs text-stone-400 mt-1">{restaurant.name} • Espace Protégé</p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-stone-300 mb-1">Identifiant</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-brand-secondary"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-semibold text-stone-300 mb-1">Mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-brand-secondary"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-secondary text-stone-950 font-bold text-sm hover:brightness-110 transition-all shadow-lg"
            >
              Se Connecter
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-stone-800 text-center">
            <button
              onClick={onBackToSite}
              className="text-xs text-stone-400 hover:text-white flex items-center justify-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour au site public</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800 mb-8">
          <div>
            <span className="text-xs font-semibold text-brand-secondary uppercase tracking-widest">
              Console d'Administration
            </span>
            <h1 className="font-serif text-3xl font-bold text-white mt-0.5">
              {editableProfile.name}
            </h1>
            <p className="text-xs text-stone-400 mt-1">Gestion de la carte, des horaires et des contacts</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-brand-secondary text-stone-950 font-bold text-sm flex items-center gap-2 hover:brightness-110 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Sauvegarder</span>
            </button>
            <button
              onClick={handleExportJson}
              className="px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-300 font-medium text-sm hover:bg-stone-800 flex items-center gap-2"
              title="Exporter JSON"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Exporter</span>
            </button>
            <button
              onClick={handleResetFactory}
              className="px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-rose-400 font-medium text-sm hover:bg-rose-950/30 flex items-center gap-2"
              title="Réinitialiser"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onBackToSite}
              className="px-4 py-2 rounded-xl border border-stone-700 text-stone-300 font-medium text-sm hover:text-white hover:border-stone-500"
            >
              Voir le Site
            </button>
          </div>
        </div>

        {/* Feedback alert */}
        {feedbackMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2 animate-fade-in">
            <Check className="w-4 h-4" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Tabs navigation */}
        <div className="flex items-center gap-2 border-b border-stone-800 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('menu')}
            className={\`px-4 py-2 rounded-xl text-sm font-semibold transition-all \${activeTab === 'menu' ? 'bg-brand-secondary text-stone-950' : 'text-stone-400 hover:text-white'}\`}
          >
            Carte & Menu
          </button>
          <button
            onClick={() => setActiveTab('hours')}
            className={\`px-4 py-2 rounded-xl text-sm font-semibold transition-all \${activeTab === 'hours' ? 'bg-brand-secondary text-stone-950' : 'text-stone-400 hover:text-white'}\`}
          >
            Horaires d'Ouverture
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={\`px-4 py-2 rounded-xl text-sm font-semibold transition-all \${activeTab === 'contact' ? 'bg-brand-secondary text-stone-950' : 'text-stone-400 hover:text-white'}\`}
          >
            Téléphone & Coordonnées
          </button>
        </div>

        {/* TAB 1: MENU EDITOR */}
        {activeTab === 'menu' && (
          <div className="space-y-8">
            
            {/* Add New Item Card */}
            <div className="glass-card p-6 rounded-2xl border border-stone-800">
              <h3 className="font-semibold text-lg text-white mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-secondary" />
                <span>Ajouter un Nouveau Plat</span>
              </h3>
              <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs uppercase font-medium text-stone-400 mb-1">Catégorie</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-sm text-stone-100"
                  >
                    {editableProfile.menu.map(c => (
                      <option key={c.category} value={c.category}>{c.category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase font-medium text-stone-400 mb-1">Nom du plat</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Pavé de Mérou Royal"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-sm text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-medium text-stone-400 mb-1">Prix (DZD)</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 2,500 DZD"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-sm text-stone-100"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-brand-secondary text-stone-950 font-bold text-sm hover:brightness-110"
                  >
                    Ajouter au Menu
                  </button>
                </div>
                <div className="md:col-span-4">
                  <label className="block text-xs uppercase font-medium text-stone-400 mb-1">Description culinaire</label>
                  <input
                    type="text"
                    placeholder="Description des ingrédients et de la cuisson..."
                    value={newItemDesc}
                    onChange={(e) => setNewItemDesc(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-sm text-stone-100"
                  />
                </div>
              </form>
            </div>

            {/* Current Menu Items by Category */}
            {editableProfile.menu.map((cat, cIdx) => (
              <div key={cat.category} className="glass-card p-6 rounded-2xl border border-stone-800">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
                  <h3 className="font-serif text-xl font-bold text-white">{cat.category}</h3>
                  <span className="text-xs text-stone-400">{cat.items.length} plats</span>
                </div>

                <div className="space-y-4">
                  {cat.items.map((item, iIdx) => (
                    <div key={iIdx} className="p-4 rounded-xl bg-stone-900/70 border border-stone-800/80 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                        <div className="sm:col-span-6">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleItemChange(cIdx, iIdx, 'name', e.target.value)}
                            className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-1.5 text-sm font-semibold text-white"
                          />
                        </div>
                        <div className="sm:col-span-4">
                          <input
                            type="text"
                            value={item.price}
                            onChange={(e) => handleItemChange(cIdx, iIdx, 'price', e.target.value)}
                            className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-1.5 text-sm text-brand-secondary font-bold"
                          />
                        </div>
                        <div className="sm:col-span-2 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(cIdx, iIdx)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div>
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) => handleItemChange(cIdx, iIdx, 'description', e.target.value)}
                          className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-stone-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>
        )}

        {/* TAB 2: HOURS EDITOR */}
        {activeTab === 'hours' && (
          <div className="glass-card p-8 rounded-2xl border border-stone-800 max-w-2xl">
            <h3 className="font-serif text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-secondary" />
              <span>Modifier les Horaires par Jour</span>
            </h3>

            <div className="space-y-4">
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                <div key={day} className="grid grid-cols-3 gap-4 items-center">
                  <span className="text-sm font-medium capitalize text-stone-300">{day}</span>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={editableProfile.hours[day] || ''}
                      onChange={(e) => {
                        setEditableProfile({
                          ...editableProfile,
                          hours: { ...editableProfile.hours, [day]: e.target.value }
                        });
                      }}
                      placeholder="Ex: 12:00 - 15:00, 19:30 - 23:30 ou Closed"
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-secondary"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSave}
              className="mt-8 px-6 py-2.5 rounded-xl bg-brand-secondary text-stone-950 font-bold text-sm hover:brightness-110"
            >
              Enregistrer les Horaires
            </button>
          </div>
        )}

        {/* TAB 3: CONTACT & LOCATION */}
        {activeTab === 'contact' && (
          <div className="glass-card p-8 rounded-2xl border border-stone-800 max-w-2xl space-y-6">
            <h3 className="font-serif text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Phone className="w-5 h-5 text-brand-secondary" />
              <span>Coordonnées & Téléphone</span>
            </h3>

            <div>
              <label className="block text-xs uppercase font-semibold text-stone-300 mb-1">
                Numéro de Téléphone (Format International)
              </label>
              <input
                type="text"
                value={editableProfile.phone}
                onChange={(e) => setEditableProfile({ ...editableProfile, phone: e.target.value })}
                className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-secondary"
              />
              <span className="text-xs text-stone-500 mt-1 block">Exemple: +213 770 00 00 00</span>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-stone-300 mb-1">
                Adresse Physique Complète
              </label>
              <textarea
                rows={3}
                value={editableProfile.address}
                onChange={(e) => setEditableProfile({ ...editableProfile, address: e.target.value })}
                className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-secondary"
              />
            </div>

            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-brand-secondary text-stone-950 font-bold text-sm hover:brightness-110"
            >
              Enregistrer les Coordonnées
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
`;
  fs.writeFileSync(path.join(pagesDir, 'Admin.tsx'), adminTsx);

  // 18. src/App.tsx (Dual router for public site & hidden /admin)
  const appTsx = `import React, { useState, useEffect } from 'react';
import { RestaurantProfile } from './types';
import { getStoredRestaurantData } from './data/restaurant';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { MenuSection } from './components/MenuSection';
import { HoursLocation } from './components/HoursLocation';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { Admin } from './pages/Admin';

export const App: React.FC = () => {
  const [restaurant, setRestaurant] = useState<RestaurantProfile>(getStoredRestaurantData());
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.includes('/admin') || hash.includes('/admin')) {
        setIsAdminRoute(true);
      } else {
        setIsAdminRoute(false);
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  const navigateToSite = () => {
    setIsAdminRoute(false);
    window.history.pushState({}, '', window.location.pathname.replace('/admin', '') || '/');
    window.location.hash = '';
  };

  if (isAdminRoute) {
    return (
      <Admin
        restaurant={restaurant}
        onUpdateRestaurant={(updated) => setRestaurant(updated)}
        onBackToSite={navigateToSite}
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between selection:bg-brand-secondary selection:text-black">
      <Navbar
        restaurant={restaurant}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      <main className="flex-grow">
        <Hero
          restaurant={restaurant}
          onOpenReservation={() => setIsReservationOpen(true)}
        />
        <About restaurant={restaurant} />
        <MenuSection categories={restaurant.menu} />
        <HoursLocation
          restaurant={restaurant}
          onOpenReservation={() => setIsReservationOpen(true)}
        />
      </main>

      <Footer restaurant={restaurant} />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        restaurant={restaurant}
      />
    </div>
  );
};

export default App;
`;
  fs.writeFileSync(path.join(srcDir, 'App.tsx'), appTsx);

  // 19. src/main.tsx
  const mainTsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;
  fs.writeFileSync(path.join(srcDir, 'main.tsx'), mainTsx);

  console.log(`[OK] Generated app for ${restaurant.name} in ./apps/${slug}/`);
}

// Generate for all 20 restaurants
for (const restaurant of restaurants) {
  generateAppForRestaurant(restaurant);
}

console.log('\\nSuccessfully generated standalone web applications for all 20 restaurants!');

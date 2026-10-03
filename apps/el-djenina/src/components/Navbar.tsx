import React, { useState, useEffect } from 'react';
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3 shadow-2xl' : 'bg-transparent py-5'}`}>
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
              <span className={`w-2 h-2 rounded-full ${isOpenToday ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`}></span>
              <span className="text-stone-300">{isOpenToday ? 'Ouvert Aujourd\'hui' : 'Fermé Aujourd\'hui'}</span>
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
                href={`tel:${restaurant.phone.replace(/\s+/g, '')}`}
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

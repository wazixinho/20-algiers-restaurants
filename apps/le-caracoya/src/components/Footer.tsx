import React from 'react';
import { Sparkles, Phone, MapPin } from 'lucide-react';
import { RestaurantProfile } from '../types';

interface FooterProps {
  restaurant: RestaurantProfile;
}

export const Footer: React.FC<FooterProps> = ({ restaurant }) => {
  return (
    <footer className="bg-[#120514] border-t border-brand-primary/30 text-stone-400 py-12">
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

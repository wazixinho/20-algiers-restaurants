import React from 'react';
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
          src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=1600&auto=format&fit=crop"
          alt="Restaurant Dar Yemma Casbah"
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
          Une expérience d'exception au cœur d'Alger. UNESCO Casbah heritage, Maternal home cooking, Copper sniwa service, Nostalgic authenticity.
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

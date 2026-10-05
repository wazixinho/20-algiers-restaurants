import React from 'react';
import { Sparkles, MapPin, Heart, ShieldCheck, Compass } from 'lucide-react';
import { RestaurantProfile } from '../types';

interface AboutProps {
  restaurant: RestaurantProfile;
}

export const About: React.FC<AboutProps> = ({ restaurant }) => {
  return (
    <section id="about" className="py-24 bg-[#080808] relative border-t border-stone-900">
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
                  src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop" alt="Atmosphère intérieure"
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
                  src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop" alt="Plats d'exception"
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

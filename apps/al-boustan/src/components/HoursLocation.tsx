import React from 'react';
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
                      className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                        isToday
                          ? 'bg-brand-secondary/15 border border-brand-secondary/40 text-white'
                          : 'bg-stone-900/60 text-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{label}</span>
                        {isToday && (
                          <span className="px-2 py-0.5 rounded-full bg-brand-secondary text-stone-950 text-[10px] font-bold uppercase">
                            Aujourd'hui
                          </span>
                        )}
                      </div>
                      <span className={`text-sm font-semibold ${isClosed ? 'text-rose-400' : 'text-stone-200'}`}>
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
                href={`tel:${restaurant.phone.replace(/\s+/g, '')}`}
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

import React, { useState } from 'react';
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

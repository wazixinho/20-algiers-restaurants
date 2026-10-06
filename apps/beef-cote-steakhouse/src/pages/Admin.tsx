import React, { useState } from 'react';
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
    // Check against custom generated password
    if (username === 'admin' && password === 'beefcotesteakhouse2026!?') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Identifiants incorrects.');
    }
  };

  const handleSave = () => {
    saveStoredRestaurantData(editableProfile);
    onUpdateRestaurant(editableProfile);
    setFeedbackMsg('Modifications enregistrées avec succès dans la base locale !');
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  const handleResetFactory = () => {
    if (confirm('Êtes-vous sûr de vouloir restaurer les données d\'origine ?')) {
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
    downloadAnchor.setAttribute("download", `${restaurant.id}_updated.json`);
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
      price: newItemPrice.includes('DZD') ? newItemPrice : `${newItemPrice} DZD`
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
    setFeedbackMsg(`Plat "${newItem.name}" ajouté avec succès !`);
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
                placeholder="..."
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
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'menu' ? 'bg-brand-secondary text-stone-950' : 'text-stone-400 hover:text-white'}`}
          >
            Carte & Menu
          </button>
          <button
            onClick={() => setActiveTab('hours')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'hours' ? 'bg-brand-secondary text-stone-950' : 'text-stone-400 hover:text-white'}`}
          >
            Horaires d'Ouverture
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'contact' ? 'bg-brand-secondary text-stone-950' : 'text-stone-400 hover:text-white'}`}
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

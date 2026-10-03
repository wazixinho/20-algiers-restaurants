import React, { useState } from 'react';
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
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeCategory === cat.category
                    ? 'bg-brand-secondary text-stone-950 shadow-lg shadow-brand-secondary/20'
                    : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700/80'
                }`}
              >
                <span>{cat.category}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${activeCategory === cat.category ? 'bg-stone-950/20 text-stone-900' : 'bg-stone-900 text-stone-400'}`}>
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
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                      }`}
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

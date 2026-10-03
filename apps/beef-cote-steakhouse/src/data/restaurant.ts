import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = {
  "id": "beef-cote-steakhouse",
  "name": "Beef Côte Steakhouse",
  "cuisine": [
    "Premium Steakhouse",
    "Artisanal Charcoal Grills"
  ],
  "address": "7 Boulevard du 11 Décembre 1960, Val d'Hydra, El Biar, 16030 Alger, Algeria",
  "phone": "+213 554 22 22 45",
  "hours": {
    "monday": "12:00 - 02:00",
    "tuesday": "12:00 - 02:00",
    "wednesday": "12:00 - 02:00",
    "thursday": "12:00 - 02:00",
    "friday": "16:00 - 02:00",
    "saturday": "12:00 - 02:00",
    "sunday": "12:00 - 02:00"
  },
  "social_links": {
    "facebook": "https://www.facebook.com/Beefcotealger",
    "instagram": "https://www.instagram.com/beefcote_steakhouse"
  },
  "branding": {
    "color_palette": [
      "#1A1A1A",
      "#8D0801",
      "#D4AF37",
      "#495057"
    ],
    "aesthetic_keywords": [
      "Modern meat atelier",
      "Industrial steakhouse chic",
      "Dry-aged beef display",
      "Open charcoal flame",
      "Metropolitan night ambiance"
    ],
    "logo_description": "Bold minimalist bullhead silhouette with razor-sharp golden horns intertwined with crossed butcher knives above 'BEEF CÔTE'."
  },
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "name": "Burrata Crémeuse Fumée au Bois de Hêtre",
          "description": "Burrata entière fumée minute sous cloche de verre, carpaccio de tomates de collection et réduction balsamique vieillie.",
          "price": "1,600 DZD"
        },
        {
          "name": "Tartare de Filet de Bœuf au Couteau",
          "description": "Filet de bœuf taillé au couteau, assaisonnement classique aux câpres, échalotes, moutarde à l'ancienne et jaune d'œuf de caille.",
          "price": "1,700 DZD"
        },
        {
          "name": "Hmiss Fumé au Feu de Bois & Pain Toasté",
          "description": "Poivrons et tomates braisés au charbon de bois, ail confit et huile d'olive vierge, servi avec pain brioché toasté.",
          "price": "800 DZD"
        }
      ]
    },
    {
      "category": "Mains",
      "items": [
        {
          "name": "Tomahawk Steak d'Exception (Pour Deux)",
          "description": "Pièce magistrale de bœuf maturé 28 jours sur os de 1.2kg, grillée sur braises ardentes avec beurre aux herbes et fleur de sel.",
          "price": "8,500 DZD"
        },
        {
          "name": "Côte de Bœuf Black Angus 500g",
          "description": "Côte de bœuf persillée saisie à la flamme, servie sur planche de bois avec purée maison à la truffe et sauce poivre.",
          "price": "4,200 DZD"
        },
        {
          "name": "T-Bone Steak Grillé à la Flamme",
          "description": "Double découpe offrant à la fois filet et faux-filet grillés au charbon de bois, servie avec légumes glacés au beurre.",
          "price": "3,800 DZD"
        },
        {
          "name": "Burger Gourmet Beef Côte",
          "description": "Steak haché minute de filet de bœuf 200g, fromage cheddar affiné, oignons caramélisés au thym et frites rustiques.",
          "price": "2,100 DZD"
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "name": "Cheesecake New-Yorkais aux Fruits de la Passion",
          "description": "Gâteau au fromage crémeux sur base biscuitée graham cracker et coulis acidulé de fruits de la passion.",
          "price": "850 DZD"
        },
        {
          "name": "Fondant Chocolat Noir Intense & Glace Vanille",
          "description": "Gâteau tiède au chocolat 70% coulant à cœur, servi avec boule de glace vanille de Madagascar.",
          "price": "800 DZD"
        }
      ]
    },
    {
      "category": "Signature Drinks",
      "items": [
        {
          "name": "Mocktail Fumé Signature Beef Côte",
          "description": "Jus de canneberge, jus de citron vert, sirop de gingembre artisanal et fumage minute au bois de romarin sous cloche.",
          "price": "750 DZD"
        },
        {
          "name": "Mojito Frais Menthe & Sucre Roux",
          "description": "Feuilles de menthe pilées, jus de lime frais pressé, sucre de canne roux et eau gazeuse pétillante.",
          "price": "600 DZD"
        }
      ]
    }
  ]
};

export const STORAGE_KEY = 'restaurant_data_beef-cote-steakhouse';

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

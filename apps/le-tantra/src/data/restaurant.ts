import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = {
  "id": "le-tantra",
  "name": "Restaurant Le Tantra",
  "cuisine": [
    "French Haute Cuisine",
    "Contemporary Fusion"
  ],
  "address": "Villa n° 2, Bois des Arcades, Riadh El Feth, El Madania, 16075 Alger, Algeria",
  "phone": "+213 21 65 46 54",
  "hours": {
    "monday": "12:00 - 15:00, 19:30 - 23:30",
    "tuesday": "12:00 - 15:00, 19:30 - 23:30",
    "wednesday": "12:00 - 15:00, 19:30 - 23:30",
    "thursday": "12:00 - 15:00, 19:30 - 23:30",
    "friday": "19:30 - 23:30",
    "saturday": "Closed",
    "sunday": "12:00 - 15:00, 19:30 - 23:30"
  },
  "social_links": {
    "facebook": "https://www.facebook.com/letantraalger",
    "instagram": "https://www.instagram.com/letantra_algiers"
  },
  "branding": {
    "color_palette": [
      "#111111",
      "#9D0208",
      "#D4AF37",
      "#2B2D42"
    ],
    "aesthetic_keywords": [
      "Lounge chic",
      "Glamorous evening dining",
      "Pine forest terrace",
      "Moody ambient lighting",
      "Haute gastronomy"
    ],
    "logo_description": "Minimalist modern calligraphy emblem featuring an abstract interlocking 'T' motif in glowing gold over a matte black ground."
  },
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "name": "Ravioles Ouvertes de Foie Gras Poêlé",
          "description": "Pâtes fines fraîches, escalope de foie gras de canard poêlée minute et émulsion crémeuse à la truffe noire d'été.",
          "price": "2,100 DZD"
        },
        {
          "name": "Salade Gourmande de Magret Fumé",
          "description": "Jeunes pousses de mesclun, tranches de magret de canard fumé maison, noix torréfiées et copeaux de parmesan 24 mois.",
          "price": "1,700 DZD"
        },
        {
          "name": "Gambas Tempura Croustillantes",
          "description": "Grosses gambas en chapelure japonaise légère, servies avec mayonnaise fine au wasabi et réduction de yuzu.",
          "price": "1,900 DZD"
        }
      ]
    },
    {
      "category": "Mains",
      "items": [
        {
          "name": "Filet de Bœuf Black Angus au Poivre Vert",
          "description": "Pièce noble de bœuf Angus saisie au saignant, sauce onctueuse au poivre vert de Madagascar et mousseline de pommes rattes.",
          "price": "3,800 DZD"
        },
        {
          "name": "Médaillon de Lotte Rôti au Coulis de Crustacés",
          "description": "Queue de lotte fraîche rôtie à la plancha, risotto crémeux au safran et réduction intense de bisque de homard.",
          "price": "3,500 DZD"
        },
        {
          "name": "Chateaubriand Béarnaise (Pour Deux)",
          "description": "Cœur de filet de bœuf épais rôti au beurre clarifié, sauce béarnaise maison montée minute et pommes grenailles sautées.",
          "price": "7,200 DZD"
        },
        {
          "name": "Souris d'Agneau Confite 7 Heures",
          "description": "Souris d'agneau fondante caramélisée au jus d'échalotes et herbes fraîches de garrigue.",
          "price": "3,200 DZD"
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "name": "Fondant au Chocolat Noir Valrhona",
          "description": "Cœur coulant au chocolat grand cru guanaja 70%, glace artisanale vanille bourbon et crumble cacao.",
          "price": "950 DZD"
        },
        {
          "name": "Nougat Glacé aux Éclats d'Amandes",
          "description": "Nougat glacé au miel de montagne, amandes caramélisées, pistaches et coulis de framboises sauvages.",
          "price": "850 DZD"
        }
      ]
    },
    {
      "category": "Signature Drinks",
      "items": [
        {
          "name": "Cocktail Signature Tantra Passion",
          "description": "Élixir rafraîchissant au fruit de la passion frais, purée de mangue, gingembre râpé et tonic artisanal.",
          "price": "750 DZD"
        },
        {
          "name": "Virgin Mojito Framboise des Bois",
          "description": "Framboises fraîches écrasées, feuilles de menthe poivrée, jus de lime frais et soda pétillant.",
          "price": "650 DZD"
        }
      ]
    }
  ]
};

export const STORAGE_KEY = 'restaurant_data_le-tantra';

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

import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = {
  "id": "le-dauphin",
  "name": "Restaurant Le Dauphin",
  "cuisine": [
    "Mediterranean Seafood",
    "Maritime Gastronomy"
  ],
  "address": "Rue d'Angkor, La Pêcherie, Port d'Alger, 16001 Alger, Algeria",
  "phone": "+213 563 27 36 82",
  "hours": {
    "monday": "11:30 - 23:30",
    "tuesday": "11:30 - 23:30",
    "wednesday": "11:30 - 23:30",
    "thursday": "11:30 - 23:30",
    "friday": "12:30 - 23:30",
    "saturday": "11:30 - 23:30",
    "sunday": "11:30 - 23:30"
  },
  "social_links": {
    "facebook": "https://www.facebook.com/LeDauphinPecherie",
    "website": "https://www.restaurantledauphin.com"
  },
  "branding": {
    "color_palette": [
      "#0B3C5D",
      "#328CC1",
      "#D9B310",
      "#FFFFFF"
    ],
    "aesthetic_keywords": [
      "Maritime heritage",
      "Portside panoramic",
      "Historic fish market institution",
      "Nautical classic",
      "Fresh daily catch"
    ],
    "logo_description": "Embossed circular navy seal featuring twin golden leaping dolphins framing a classical ship anchor with bold marine typography."
  },
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "name": "Soupe de Poisson de la Pêcherie",
          "description": "Recette traditionnelle de poissons de roche de la baie d'Alger, servie avec croûtons aillés et rouille maison.",
          "price": "900 DZD"
        },
        {
          "name": "Salade Tiède de Poulpe de Roche",
          "description": "Poulpe fraîchement pêché, mariné à l'huile d'olive extra vierge, ail écrasé, persil plat et quartiers de citron.",
          "price": "1,300 DZD"
        },
        {
          "name": "Crevettes Royales Sautées à l'Ail",
          "description": "Grosses crevettes rouges de Méditerranée revenues à la poêle à l'huile d'olive, ail et pointe de piment.",
          "price": "1,600 DZD"
        }
      ]
    },
    {
      "category": "Mains",
      "items": [
        {
          "name": "Paella Royale aux Fruits de Mer",
          "description": "Riz safrané généreusement garni de gambas royales, moules fraîches de bouchot, calamars et morceaux de seiche.",
          "price": "3,200 DZD"
        },
        {
          "name": "Daurade Royale de Ligne Entière Grillée",
          "description": "Daurade fraîche entière du jour grillée sur braises, assaisonnée de gros sel marin et herbes fraîches.",
          "price": "2,800 DZD"
        },
        {
          "name": "Picada d'Espadon Grillé à la Plancha",
          "description": "Pavé d'espadon de pleine mer saisi à la plancha, sauce vierge tiède aux tomates concassées et câpres.",
          "price": "2,700 DZD"
        },
        {
          "name": "Friture Mixte de la Pêcherie",
          "description": "Assortiment croustillant de rougets de roche, merlans frais et anneaux de calmar dorés à la farine fine.",
          "price": "2,400 DZD"
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "name": "Tarte au Citron Meringuée de Tipaza",
          "description": "Pâte sablée pur beurre, crème onctueuse aux citrons de la côte et meringue italienne dorée au chalumeau.",
          "price": "750 DZD"
        },
        {
          "name": "Coupe de Glace Artisanale Trois Parfums",
          "description": "Glace artisanale fabriquée localement : vanille gousse, chocolat noir intense et sorbet mandarine.",
          "price": "650 DZD"
        }
      ]
    },
    {
      "category": "Beverages",
      "items": [
        {
          "name": "Citronnade Maison à la Menthe Pilée",
          "description": "Pur jus de citron frais pressé, menthe fraîche pilée, glace pilée et sirop de sucre de canne.",
          "price": "450 DZD"
        },
        {
          "name": "Eau Minérale Gazeuse Lalla Khedidja 1L",
          "description": "Eau minérale naturellement pétillante embouteillée au pied du Djurdjura.",
          "price": "300 DZD"
        }
      ]
    }
  ]
};

export const STORAGE_KEY = 'restaurant_data_le-dauphin';

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

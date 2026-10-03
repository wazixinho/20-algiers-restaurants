import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = {
  "id": "sfindja",
  "name": "Restaurant Sfindja",
  "cuisine": [
    "Contemporary Mediterranean",
    "Modern Algerian Fusion"
  ],
  "address": "66 Chemin Sfindja, El Biar, 16030 Alger, Algeria",
  "phone": "+213 770 45 14 18",
  "hours": {
    "monday": "11:30 - 15:00, 18:30 - 23:00",
    "tuesday": "11:30 - 15:00, 18:30 - 23:00",
    "wednesday": "11:30 - 15:00, 18:30 - 23:00",
    "thursday": "11:30 - 15:00, 18:30 - 23:00",
    "friday": "18:30 - 23:00",
    "saturday": "11:30 - 15:00, 18:30 - 23:00",
    "sunday": "11:30 - 15:00, 18:30 - 23:00"
  },
  "social_links": {
    "facebook": "https://www.facebook.com/SfindjaRestaurant",
    "instagram": "https://www.instagram.com/sfindjarestaurant"
  },
  "branding": {
    "color_palette": [
      "#264653",
      "#2A9D8F",
      "#E76F51",
      "#F8F9FA"
    ],
    "aesthetic_keywords": [
      "Contemporary refinement",
      "Botanical terrace",
      "Bistronomic creativity",
      "Zen minimalism",
      "Diplomatic El Biar elegance"
    ],
    "logo_description": "Clean modern geometric typeface with an organic curving olive leaf branch accenting the initial letter 'S'."
  },
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "name": "Raviolis Artisanaux aux Crevettes Tigrées",
          "description": "Pâtes faites à la main farcies aux crevettes fraîches et herbes, servies dans une bisque onctueuse safranée.",
          "price": "1,400 DZD"
        },
        {
          "name": "Burrata Crémeuse & Tomates Confites",
          "description": "Burrata fraîche sur carpaccio de tomates anciennes confites au four, pesto de roquette et pignons torréfiés.",
          "price": "1,600 DZD"
        },
        {
          "name": "Velouté de Courge Musquée et Châtaignes",
          "description": "Courge de saison rôtie au thym, éclats de châtaignes poêlées et filet d'huile de noix vierge.",
          "price": "950 DZD"
        }
      ]
    },
    {
      "category": "Mains",
      "items": [
        {
          "name": "Berkoukes Gastronomique au Coq Fermier",
          "description": "Petits plombs artisanaux mijotés dans un bouillon corsé aux épices locales avec morceaux fondants de coq fermier et légumes racines.",
          "price": "2,300 DZD"
        },
        {
          "name": "Fettuccine Sfindja au Bœuf et Jus Rôti",
          "description": "Pâtes ruban fraîches, émincé de bœuf tendre saisi au beurre, réduction de jus rôti et mélange de champignons sauvages.",
          "price": "2,200 DZD"
        },
        {
          "name": "Lasagnes Al Forno au Veau Braisé",
          "description": "Feuilles de pâtes fraîches superposées avec effiloché de veau mijoté 6 heures, béchamel veloutée et parmesan gratiné.",
          "price": "1,900 DZD"
        },
        {
          "name": "Filet de Daurade Royale & Mousseline de Panais",
          "description": "Daurade royale poêlée sur peau croustillante, mousseline de panais au beurre noisette et petits légumes glacés.",
          "price": "2,700 DZD"
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "name": "Glace Maison Vanille Bourbon & Caramel Chaud",
          "description": "Glace turbinée sur place aux véritables gousses de vanille, servie avec caramel au beurre salé chaud et tuile aux amandes.",
          "price": "650 DZD"
        },
        {
          "name": "Tiramisu Traditionnel au Mascarpone",
          "description": "Recette classique italienne au mascarpone fouetté, biscuits à la cuillère trempés dans un espresso serré et cacao amer.",
          "price": "750 DZD"
        }
      ]
    },
    {
      "category": "Beverages",
      "items": [
        {
          "name": "Mocktail Sfindja Zen Détox",
          "description": "Concombre fraîchement extrait, jus de pomme verte acidulée, basilic frais froissé et pointe de jus de citron vert.",
          "price": "600 DZD"
        },
        {
          "name": "Thé Glacé Maison Pêche & Thym Sauvage",
          "description": "Thé noir infusé à froid avec morceaux de pêches mûres et une branche de thym frais de l'Atlas.",
          "price": "450 DZD"
        }
      ]
    }
  ]
};

export const STORAGE_KEY = 'restaurant_data_sfindja';

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

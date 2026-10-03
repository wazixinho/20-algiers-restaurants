import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = {
  "id": "l-auberge-du-moulin",
  "name": "Restaurant L'Auberge du Moulin",
  "cuisine": [
    "Traditional Algerian Mechoui",
    "Rustic French-Mediterranean"
  ],
  "address": "Rue Abane Ramdane, Chéraga, 16014 Alger, Algeria",
  "phone": "+213 550 15 15 31",
  "hours": {
    "monday": "12:00 - 15:30, 19:30 - 23:00",
    "tuesday": "12:00 - 15:30, 19:30 - 23:00",
    "wednesday": "12:00 - 15:30, 19:30 - 23:00",
    "thursday": "12:00 - 15:30, 19:30 - 23:00",
    "friday": "19:30 - 23:00",
    "saturday": "12:00 - 15:30, 19:30 - 23:00",
    "sunday": "12:00 - 15:30, 19:30 - 23:00"
  },
  "social_links": {
    "facebook": "https://www.facebook.com/aubergedumoulinalger",
    "instagram": "https://www.instagram.com/aubergedumoulinofficiel"
  },
  "branding": {
    "color_palette": [
      "#582F0E",
      "#7F4F24",
      "#A68A64",
      "#EDE0D4"
    ],
    "aesthetic_keywords": [
      "Historic stone mill",
      "Wood-burning fireplace",
      "Legendary slow-roasted mechoui",
      "Rustic French country inn",
      "Warm intimate ambiance"
    ],
    "logo_description": "Engraved wooden mill wheel motif flanked by ears of wheat and roasting spit forks above serif letters 'L'Auberge du Moulin'."
  },
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "name": "Soupe de Poisson Maison du Moulin",
          "description": "Soupe épaisse de poissons frais de la baie cuite au chaudron avec rouille safranée et croûtons de pain de campagne frottés à l'ail.",
          "price": "950 DZD"
        },
        {
          "name": "Poivrons Grillés au Feu de Bois & Huile Vierge",
          "description": "Poivrons rouges et verts grillés dans la cheminée à bois, épluchés à la main et macérés à l'huile d'olive et ail frais.",
          "price": "850 DZD"
        },
        {
          "name": "Salade de Chèvre Chaud au Miel de Thym",
          "description": "Toasts de pain de seigle croustillants nappés de fromage de chèvre fondu, cerneaux de noix et filet de miel de montagne.",
          "price": "1,200 DZD"
        }
      ]
    },
    {
      "category": "Mains",
      "items": [
        {
          "name": "Méchoui d'Agneau Rôti au Feu de Bois",
          "description": "La spécialité culte de la maison depuis des décennies : agneau entier arrosé de marinade à l'huile d'olive, jus de citron et épices, rôti lentement à la broche au feu de bois.",
          "price": "3,400 DZD"
        },
        {
          "name": "Épaule d'Agneau Confite 8 Heures",
          "description": "Épaule d'agneau mijotée dans son jus avec gousses d'ail en chemise, oignons grelots et branches de thym frais.",
          "price": "3,600 DZD"
        },
        {
          "name": "Pavé de Saumon de l'Atlantique Grillé",
          "description": "Saumon frais saisi sur la grille à bois avec fondue de poireaux à la crème et riz pilaf.",
          "price": "2,800 DZD"
        },
        {
          "name": "Entrecôte Maturée Grillée au Feu de Bois",
          "description": "Belle pièce de bœuf persillée cuite à la braise de chêne, servie avec beurre maître d'hôtel et frites maison taillées main.",
          "price": "3,100 DZD"
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "name": "Tarte Rustique aux Poires et Amandes",
          "description": "Tarte maison aux poires pochées sur crème d'amandes, saupoudrée d'amandes effilées caramélisées.",
          "price": "750 DZD"
        },
        {
          "name": "Moelleux Chocolat & Glace à la Châtaigne",
          "description": "Gâteau chaud au chocolat noir et cœur coulant, servi avec une boule de glace artisanale à la crème de marrons.",
          "price": "800 DZD"
        }
      ]
    },
    {
      "category": "Beverages",
      "items": [
        {
          "name": "Thé à la Menthe Infusé aux Herbes du Moulin",
          "description": "Thé vert traditionnel infusé avec de la menthe fraîche cueillie dans le jardin du domaine.",
          "price": "400 DZD"
        },
        {
          "name": "Eau Minérale Naturelle Gazeuse 1L",
          "description": "Bouteille d'eau minérale gazeuse locale fraîche.",
          "price": "300 DZD"
        }
      ]
    }
  ]
};

export const STORAGE_KEY = 'restaurant_data_l-auberge-du-moulin';

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

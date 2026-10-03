import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = {
  "id": "le-caracoya",
  "name": "Restaurant Le Caracoya",
  "cuisine": [
    "Classic French",
    "Mediterranean Bistro"
  ],
  "address": "3 Rue de Pierre (ex-Rue Michelet), Rue Ben Messaoud, Sidi M'Hamed, 16000 Alger, Algeria",
  "phone": "+213 44 19 08 00",
  "hours": {
    "monday": "12:00 - 23:00",
    "tuesday": "12:00 - 23:00",
    "wednesday": "12:00 - 23:00",
    "thursday": "12:00 - 23:00",
    "friday": "16:00 - 23:00",
    "saturday": "12:00 - 23:00",
    "sunday": "12:00 - 23:00"
  },
  "social_links": {
    "facebook": "https://www.facebook.com/lecaracoya",
    "instagram": "https://www.instagram.com/le_caracoya_restaurant"
  },
  "branding": {
    "color_palette": [
      "#4A154B",
      "#C0A080",
      "#2D3748",
      "#FFFDF9"
    ],
    "aesthetic_keywords": [
      "Historic bohemian bistro",
      "Indoor fountain patio",
      "French colonial charm",
      "Jazz ambient acoustics",
      "Intimate retro elegance"
    ],
    "logo_description": "Vintage art-nouveau script displaying 'Le Caracoya' underlined with an engraved stone shell fountain motif in antique brass."
  },
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "name": "Escargots de Bourgogne en Coquilles",
          "description": "Douzaine d'escargots sauvages préparés dans leur coquille avec beurre persillé à l'ail et échalotes.",
          "price": "1,400 DZD"
        },
        {
          "name": "Foie Gras de Canard Mi-Cuit Maison",
          "description": "Terrine de foie gras mariné au vieux cognac, chutney de figues de Kabylie et tranches de brioche dorée.",
          "price": "2,200 DZD"
        },
        {
          "name": "Carpaccio de Bœuf à l'Huile de Truffe",
          "description": "Fines tranches de filet de bœuf cru assaisonnées d'huile de truffe, câpres et copeaux de grana padano.",
          "price": "1,500 DZD"
        }
      ]
    },
    {
      "category": "Mains",
      "items": [
        {
          "name": "Confit de Canard et Pommes Sarladaises",
          "description": "Cuisse de canard confite longuement dans sa graisse, peau croustillante, pommes de terre sautées à l'ail et persil.",
          "price": "2,900 DZD"
        },
        {
          "name": "Coq au Vin Traditionnel Mijoté",
          "description": "Morceaux de coq braisés à l'ancienne avec petits oignons grelots, lardons fumés et champignons de Paris.",
          "price": "2,600 DZD"
        },
        {
          "name": "Filet de Loup Poêlé sur Peau",
          "description": "Loup sauvage saisi unilatéralement, tombée d'épinards frais au beurre et réduction balsamique.",
          "price": "2,800 DZD"
        },
        {
          "name": "Pavé de Saumon Rôti Hollandaise",
          "description": "Saumon frais rôti au four, sauce hollandaise onctueuse au citron et tagliatelles fraîches au beurre.",
          "price": "2,700 DZD"
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "name": "Crème Brûlée à la Vanille Bourbon",
          "description": "Crème soyeuse aux jaunes d'œufs et gousses de vanille de Madagascar, fine couche de caramel croustillant.",
          "price": "700 DZD"
        },
        {
          "name": "Profiteroles Artisanales au Chocolat Chaud",
          "description": "Choux croustillants faits maison garnis de glace vanille artisanale et nappés de chocolat noir fondu.",
          "price": "850 DZD"
        }
      ]
    },
    {
      "category": "Beverages",
      "items": [
        {
          "name": "Café Gourmand Le Caracoya",
          "description": "Café espresso italien intense accompagné de trois mignardises sucrées du chef pâtissier.",
          "price": "600 DZD"
        },
        {
          "name": "Jus Pressé Ananas Frais & Menthe",
          "description": "Ananas Victoria pressé minute avec feuilles de menthe fraîche et glaçons.",
          "price": "500 DZD"
        }
      ]
    }
  ]
};

export const STORAGE_KEY = 'restaurant_data_le-caracoya';

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

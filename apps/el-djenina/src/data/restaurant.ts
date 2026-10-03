import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = {
  "id": "el-djenina",
  "name": "Restaurant El Djenina",
  "cuisine": [
    "Traditional Algerian",
    "Maghrebi Haute Cuisine"
  ],
  "address": "10 Rue Franklin Roosevelt, Sidi M'Hamed, 16000 Alger, Algeria",
  "phone": "+213 773 41 77 65",
  "hours": {
    "monday": "12:00 - 14:30, 19:00 - 22:30",
    "tuesday": "12:00 - 14:30, 19:00 - 22:30",
    "wednesday": "12:00 - 14:30, 19:00 - 22:30",
    "thursday": "12:00 - 14:30, 19:00 - 22:30",
    "friday": "Closed",
    "saturday": "12:00 - 14:30, 19:00 - 22:30",
    "sunday": "12:00 - 14:30, 19:00 - 22:30"
  },
  "social_links": {
    "facebook": "https://www.facebook.com/eldjeninaalger",
    "instagram": "https://www.instagram.com/restaurant_eldjenina"
  },
  "branding": {
    "color_palette": [
      "#8B263E",
      "#D4AF37",
      "#2C3E50",
      "#F7F3E9"
    ],
    "aesthetic_keywords": [
      "Ottoman palace",
      "Andalusian zellige",
      "Arabesque plasterwork",
      "Aristocratic heritage",
      "Fine dining"
    ],
    "logo_description": "Intricate Andalusian floral arabesque medallion framing elegant calligraphy of 'El Djenina' rendered in burnished antique gold."
  },
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "name": "Chorba Frik Traditionnelle",
          "description": "Soupe algéroise ancestrale au blé vert concassé, agneau tendre, coriandre fraîche et menthe sauvage.",
          "price": "650 DZD"
        },
        {
          "name": "Bourek Annabi à la Viande",
          "description": "Feuille de dioul croustillante farcie de viande hachée assaisonnée, persil, oignons caramélisés et œuf coulant.",
          "price": "450 DZD"
        },
        {
          "name": "Salade Méchouia du Terroir",
          "description": "Poivrons et tomates grillés au feu de bois, pilés à l'ail et arrosés d'huile d'olive vierge extra de Kabylie.",
          "price": "700 DZD"
        }
      ]
    },
    {
      "category": "Mains",
      "items": [
        {
          "name": "Couscous Royal El Djenina",
          "description": "Semoule fine roulée à la main, souris d'agneau confite, poulet fermier, merguez artisanale et bouillon de légumes frais.",
          "price": "2,600 DZD"
        },
        {
          "name": "Rechta Algéroise Traditionnelle",
          "description": "Pâtes fines artisanales algéroises cuites à la vapeur, poulet fermier, navets fondants et sauce blanche parfumée à la cannelle.",
          "price": "2,200 DZD"
        },
        {
          "name": "Tajine Lham Lahlou aux Fruits Secs",
          "description": "Mijoté sucré-salé de viande de veau aux pruneaux, abricots secs, amandes torréfiées et eau de fleur d'oranger.",
          "price": "2,400 DZD"
        },
        {
          "name": "Tajine Zitoune au Veau Tendre",
          "description": "Olives vertes désamérisées, morceaux de veau fondants et champignons de Paris dans une sauce veloutée au citron.",
          "price": "2,300 DZD"
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "name": "Assortiment de Pâtisseries Algéroises",
          "description": "Plateau de trois douceurs fines : Baklawa feuilletée aux amandes, Dziriette au miel pur et M'chewek doré.",
          "price": "950 DZD"
        },
        {
          "name": "M'halbi Traditionnel à la Cannelle",
          "description": "Crème douce de riz parfumée à l'eau de fleur d'oranger de Blida, saupoudrée de cannelle de Ceylan.",
          "price": "550 DZD"
        }
      ]
    },
    {
      "category": "Beverages & Infusions",
      "items": [
        {
          "name": "Thé à la Menthe Fraîche en Samovar",
          "description": "Thé vert gunpowder infusé aux feuilles de menthe nanah fraîche, servi à la verseuse traditionnelle.",
          "price": "400 DZD"
        },
        {
          "name": "Cherbet Artisanal de Boufarik",
          "description": "Boisson rafraîchissante au jus de citron pressé, zeste et une touche d'eau de fleur d'oranger.",
          "price": "450 DZD"
        }
      ]
    }
  ]
};

export const STORAGE_KEY = 'restaurant_data_el-djenina';

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

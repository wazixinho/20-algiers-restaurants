import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = {
  "id": "la-palmeraie",
  "name": "Restaurant La Palmeraie",
  "cuisine": [
    "Traditional Maghrebi",
    "Andalusian & Moroccan Haute Cuisine"
  ],
  "address": "Villa 313, Coopérative El Moustakbel, Aïn Allah, Dely Ibrahim, 16047 Alger, Algeria",
  "phone": "+213 562 36 36 36",
  "hours": {
    "monday": "12:00 - 00:00",
    "tuesday": "12:00 - 00:00",
    "wednesday": "12:00 - 00:00",
    "thursday": "12:00 - 00:00",
    "friday": "14:00 - 00:00",
    "saturday": "12:00 - 00:00",
    "sunday": "12:00 - 00:00"
  },
  "social_links": {
    "facebook": "https://www.facebook.com/lapalmeraiealger",
    "instagram": "https://www.instagram.com/restaurant_la_palmeraie"
  },
  "branding": {
    "color_palette": [
      "#2D5A27",
      "#C99700",
      "#78281F",
      "#FBF7F0"
    ],
    "aesthetic_keywords": [
      "Oriental oasis palace",
      "Andalusian riad courtyard",
      "Berber rugs and lanterns",
      "Family celebratory banquets",
      "Fragrant oriental spices"
    ],
    "logo_description": "Graceful twin golden date palm fronds crowning an arching calligraphy of 'La Palmeraie' in warm deep emerald."
  },
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "name": "Pastilla Royale au Pigeon et Amandes",
          "description": "Feuilletage ultra-fin croustillant garni de chair de pigeon effilochée, amandes grillées concassées, parfumée à la cannelle et sucre glace.",
          "price": "1,600 DZD"
        },
        {
          "name": "Trio de Salades Marocaines de Fès",
          "description": "Zaalouk d'aubergines mijotées, Taktouka de poivrons rouges et salade de carottes cuites au jus d'orange et cumin.",
          "price": "900 DZD"
        },
        {
          "name": "Harira Impériale aux Dattes Majhoul",
          "description": "Soupe veloutée aux lentilles, pois chiches, céleri frais et dés de viande, servie avec dattes fraîches et quartiers de citron.",
          "price": "650 DZD"
        }
      ]
    },
    {
      "category": "Mains",
      "items": [
        {
          "name": "Tajine d'Agneau Mrouzia aux Pruneaux",
          "description": "Plat de fête sucré-salé : collier et jarret d'agneau mijotés au ras-el-hanout, pruneaux moelleux caramélisés au miel et amandes frites.",
          "price": "2,600 DZD"
        },
        {
          "name": "Tajine de Poulet Fermier au Citron Confit",
          "description": "Poulet doré cuit dans un plat en terre avec oignons confits, citrons beldi macérés au sel et olives violettes.",
          "price": "2,200 DZD"
        },
        {
          "name": "Couscous Royal Fassi à la Tfaya",
          "description": "Semoule extra-fine cuite trois fois à la vapeur, viande d'agneau fondante et garniture tfaya d'oignons caramélisés et raisins secs.",
          "price": "2,500 DZD"
        },
        {
          "name": "Tanjia Marrakchia Cuite à l'Ancienne",
          "description": "Jarret de bœuf confit lentement dans une jarre en terre cuite avec cumin, safran pur et beurre rance smen.",
          "price": "2,700 DZD"
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "name": "Cornes de Gazelle & Douceurs Fassi",
          "description": "Plateau de cornes de gazelle fines à la pâte d'amande fraîche parfumée à la fleur d'oranger et gâteaux au miel.",
          "price": "900 DZD"
        },
        {
          "name": "Pastilla Croustillante au Lait (Khenfouch)",
          "description": "Feuilles de pastilla croustillantes superposées avec une crème au lait parfumée à la fleur d'oranger et amandes grillées.",
          "price": "750 DZD"
        }
      ]
    },
    {
      "category": "Beverages",
      "items": [
        {
          "name": "Thé Royal à la Menthe et Absinthe (Chiba)",
          "description": "Thé vert infusé selon la tradition maghrébine avec menthe fraîche et feuilles d'absinthe aromatique.",
          "price": "400 DZD"
        },
        {
          "name": "Jus d'Avocat Onctueux aux Amandes et Dattes",
          "description": "Avocat crémeux mixé avec du lait frais, miel pur, dattes fraîches et éclats d'amandes pilées.",
          "price": "600 DZD"
        }
      ]
    }
  ]
};

export const STORAGE_KEY = 'restaurant_data_la-palmeraie';

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

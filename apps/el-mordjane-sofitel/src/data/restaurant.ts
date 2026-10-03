import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = {
  "id": "el-mordjane-sofitel",
  "name": "El Mordjane - Sofitel Algiers Hamma Garden",
  "cuisine": [
    "Traditional Algerian Gastronomy",
    "Luxury Hotel Fine Dining"
  ],
  "address": "Sofitel Algiers Hamma Garden, 172 Rue Hassiba Benbouali, Hamma, 16015 Alger, Algeria",
  "phone": "+213 21 68 52 10",
  "hours": {
    "monday": "19:00 - 23:00",
    "tuesday": "19:00 - 23:00",
    "wednesday": "19:00 - 23:00",
    "thursday": "19:00 - 23:00",
    "friday": "19:00 - 23:00",
    "saturday": "19:00 - 23:00",
    "sunday": "19:00 - 23:00"
  },
  "social_links": {
    "website": "https://all.accor.com/hotel/1540/index.fr.shtml",
    "facebook": "https://www.facebook.com/SofitelAlgiersHammaGarden",
    "instagram": "https://www.instagram.com/sofitelalgiers"
  },
  "branding": {
    "color_palette": [
      "#C5A059",
      "#780016",
      "#1A1A1A",
      "#F8F6F0"
    ],
    "aesthetic_keywords": [
      "Five-star luxury",
      "Botanical garden vista",
      "Classical Andalusian lute music",
      "Diplomatic protocol",
      "Haute cuisine algéroise"
    ],
    "logo_description": "Sofitel luxury link geometric geometric knot in brushed champagne gold hovering above elegant serif typography 'El Mordjane'."
  },
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "name": "Chorba Frik Impériale à l'Agneau",
          "description": "Bouillon raffiné de blé vert concassé aux morceaux tendres de gigot d'agneau, légumes finement brunoise et menthe séchée.",
          "price": "1,100 DZD"
        },
        {
          "name": "Trilogie de Boureks Algérois Sofitel",
          "description": "Trois rouleaux croustillants de dioul : viande hachée aux pignons, crevettes à l'aneth et fromage frais fermier aux herbes.",
          "price": "1,200 DZD"
        },
        {
          "name": "Salade d'Oranges Amères & Carottes au Cumin",
          "description": "Entrée fraîche et parfumée de fines rondelles de carottes étuvées, suprêmes d'oranges et vinaigrette au cumin de Tindouf.",
          "price": "950 DZD"
        }
      ]
    },
    {
      "category": "Mains",
      "items": [
        {
          "name": "Rechta Algéroise de Fête au Suprême de Volaille",
          "description": "Fines lanières de pâtes fraîches cuites à la vapeur, suprême de volaille fermière rôti, navets fondants et sauce blanche à la cannelle.",
          "price": "2,800 DZD"
        },
        {
          "name": "Couscous d'Orge aux Médaillons d'Agneau",
          "description": "Couscous traditionnel d'orge aux légumes de saison inspirés du Jardin d'Essai d'El Hamma et agneau cuit à basse température.",
          "price": "3,200 DZD"
        },
        {
          "name": "Tajine de Daurade Royale aux Amandes",
          "description": "Poisson noble cuit à l'étouffée avec amandes effilées, raisins blonds de Mascara et miel pur de jujubier.",
          "price": "3,100 DZD"
        },
        {
          "name": "Lham Lahlou Gastronomique aux Dattes Farcies",
          "description": "Viande de veau caramélisée dans son sirop parfumé, pruneaux, abricots secs et dattes Deglet Nour farcies de pâte d'amande fraîche.",
          "price": "2,600 DZD"
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "name": "Plateau de Haute Pâtisserie Algéroise Sofitel",
          "description": "Assortiment d'œuvres sucrées d'artisanat : corne de gazelle dorée, dziriette royale aux amandes et baklawa aux noix.",
          "price": "1,200 DZD"
        },
        {
          "name": "M'halbi Royal à l'Eau de Fleur de Blida",
          "description": "Crème légère de riz parfumée à l'eau de fleur d'oranger artisanale de Blida, cannelle et éclats de pistaches.",
          "price": "750 DZD"
        }
      ]
    },
    {
      "category": "Beverages",
      "items": [
        {
          "name": "Cérémonie du Thé à la Menthe & Pignons Royaux",
          "description": "Thé vert gunpowder infusé à la menthe nanah fraîche, servi dans des verres dorés à l'or fin avec pignons de pin torréfiés.",
          "price": "600 DZD"
        },
        {
          "name": "Nectar Pressé d'Agrumes de la Mitidja",
          "description": "Jus pur d'oranges et mandarines fraîchement cueillies dans les plaines de la Mitidja.",
          "price": "650 DZD"
        }
      ]
    }
  ]
};

export const STORAGE_KEY = 'restaurant_data_el-mordjane-sofitel';

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

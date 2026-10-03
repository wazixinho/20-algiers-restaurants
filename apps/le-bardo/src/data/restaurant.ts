import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = {
  "id": "le-bardo",
  "name": "Restaurant Le Bardo",
  "cuisine": [
    "Contemporary Algerian",
    "Gourmet Maghrebi"
  ],
  "address": "2 Boulevard Franklin Roosevelt, Sidi M'Hamed, 16000 Alger, Algeria",
  "phone": "+213 770 50 24 98",
  "hours": {
    "monday": "12:00 - 14:30, 19:30 - 23:30",
    "tuesday": "12:00 - 14:30, 19:30 - 23:30",
    "wednesday": "12:00 - 14:30, 19:30 - 23:30",
    "thursday": "12:00 - 14:30, 19:30 - 23:30",
    "friday": "19:30 - 23:30",
    "saturday": "Closed",
    "sunday": "12:00 - 14:30, 19:30 - 23:30"
  },
  "social_links": {
    "facebook": "https://www.facebook.com/RestaurantLeBardoAlger",
    "instagram": "https://www.instagram.com/lebardorestaurant"
  },
  "branding": {
    "color_palette": [
      "#1F2937",
      "#C5A059",
      "#4A5568",
      "#F9FAFB"
    ],
    "aesthetic_keywords": [
      "Gastronomic revival",
      "Refined orientalism",
      "Chic intimate",
      "Subdued ambient lighting",
      "Museum heritage"
    ],
    "logo_description": "Sophisticated minimalist serif wordmark reading 'LE BARDO' with a delicate geometric Moorish arch monogram in brushed brass gold."
  },
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "name": "Velouté de Berkoukes au Pigeon Fondant",
          "description": "Petits grains de pâtes traditionnelles dans une émulsion d'herbes aromatiques des Aurès et effiloché de pigeon.",
          "price": "1,100 DZD"
        },
        {
          "name": "Carpaccio de Poulpe aux Agrumes de la Mitidja",
          "description": "Fines lamelles de poulpe de roche mariné aux citrons et oranges sanguines, piment doux fumé et huile vierge.",
          "price": "1,400 DZD"
        },
        {
          "name": "Pastilla Croustillante au Canard Confit",
          "description": "Feuilletage croustillant, chair de canard confite aux épices douces, amandes effilées torréfiées et sucre glace.",
          "price": "1,500 DZD"
        }
      ]
    },
    {
      "category": "Mains",
      "items": [
        {
          "name": "Méchoui d'Agneau de l'Atlas Rôti 12 Heures",
          "description": "Agneau cuit à basse température, jus corsé infusé au romarin sauvage et semoule fine d'orge perlée.",
          "price": "2,900 DZD"
        },
        {
          "name": "Filet de Loup de Mer au Safran de Tlemcen",
          "description": "Loup sauvage poêlé unilatéral, écrasé de fenouil braisé au safran local et réduction d'agrumes.",
          "price": "2,800 DZD"
        },
        {
          "name": "Jarret de Veau Caramélisé aux Coings",
          "description": "Jarret de veau braisé lentement, quartiers de coings confits au miel d'acacia et graines de sésame grillées.",
          "price": "2,600 DZD"
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "name": "Déclinaison de Dattes Deglet Nour en Textures",
          "description": "Dattes royales en mousse légère, biscuit sablé et glace onctueuse au lait d'amande douce.",
          "price": "900 DZD"
        },
        {
          "name": "Mille-Feuille à la Fleur d'Oranger et Pistaches",
          "description": "Pâte feuilletée inversée croustillante, crème diplomate à l'eau de fleur d'oranger et éclats de pistaches.",
          "price": "850 DZD"
        }
      ]
    },
    {
      "category": "Signature Drinks",
      "items": [
        {
          "name": "Infusion Signature Le Bardo",
          "description": "Sélection d'herbes sauvages des hauts plateaux algériens, écorces d'oranges séchées et miel de montagne.",
          "price": "500 DZD"
        },
        {
          "name": "Nectar Pressé Grenade & Orange Sanguine",
          "description": "Jus pur pressé minute de grenades d'El Affroun et oranges sanguines locales.",
          "price": "600 DZD"
        }
      ]
    }
  ]
};

export const STORAGE_KEY = 'restaurant_data_le-bardo';

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

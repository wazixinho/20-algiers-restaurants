import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = {
  "id": "dar-zellige",
  "name": "Restaurant Dar Zellige",
  "cuisine": [
    "Traditional Algerian Gastronomy",
    "Royal Barbecue & Grills"
  ],
  "address": "Djenane El Malik, Route N11, Hydra, 16035 Alger, Algeria",
  "phone": "+213 770 50 07 02",
  "hours": {
    "monday": "12:00 - 15:30, 19:30 - 23:30",
    "tuesday": "12:00 - 15:30, 19:30 - 23:30",
    "wednesday": "12:00 - 15:30, 19:30 - 23:30",
    "thursday": "12:00 - 15:30, 19:30 - 23:30",
    "friday": "13:30 - 23:30",
    "saturday": "12:00 - 15:30, 19:30 - 23:30",
    "sunday": "12:00 - 15:30, 19:30 - 23:30"
  },
  "social_links": {
    "facebook": "https://www.facebook.com/darzelligepiscine",
    "instagram": "https://www.instagram.com/darzellige_hydra"
  },
  "branding": {
    "color_palette": [
      "#0E4D92",
      "#E6AF2E",
      "#1D2D44",
      "#F0EBD8"
    ],
    "aesthetic_keywords": [
      "Poolside palace",
      "Andalusian zellige tilework",
      "Regal Algerian hospitality",
      "Illuminated courtyard",
      "Ancestral charcoal roasting"
    ],
    "logo_description": "Intricate eight-pointed Moorish-Andalusian Zellige geometric tile motif in cobalt and gold enclosing calligraphic script 'Dar Zellige'."
  },
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "name": "Chorba Frik au Mouton Fermier",
          "description": "Soupe traditionnelle algérienne mijotée longuement dans un faitout en terre cuite avec viande de mouton tendre, blé concassé et coriandre.",
          "price": "700 DZD"
        },
        {
          "name": "Plateau Zellige de Mhadjeb & Brik",
          "description": "Assortiment de crêpes fines feuilletées garnies d'oignons et tomates confits, et brik triangulaire à l'œuf mollet.",
          "price": "800 DZD"
        },
        {
          "name": "Zviti Traditionnel au Mehrez en Bois",
          "description": "Plat chaud emblématique de Boussaâda pilé au pilon de bois d'olivier avec galette émiettée, tomates braisées, ail, piments et coriandre.",
          "price": "1,100 DZD"
        }
      ]
    },
    {
      "category": "Mains",
      "items": [
        {
          "name": "Méchoui Boussaadi à la Broche",
          "description": "Quartier d'agneau entier mariné au cumin et sel gemme, cuit lentement à la broche au feu de bois pour une viande confite et fondante.",
          "price": "3,200 DZD"
        },
        {
          "name": "Merdouma de Gigot d'Agneau à l'Étouffée",
          "description": "Technique de cuisson saharienne ancestrale : gigot enfoui sous terre aux braises ardentes avec bouquet d'herbes aromatiques.",
          "price": "3,500 DZD"
        },
        {
          "name": "Côtes d'Agneau Grillées au Romarin du Jardin",
          "description": "Quatre côtelettes d'agneau fraîches saisies sur le grill extérieur au charbon de bois, aromatisées au romarin frais.",
          "price": "2,600 DZD"
        },
        {
          "name": "Paella Impériale aux Gambas Géantes",
          "description": "Riz espagnol parfumé au safran, grosses gambas, rondelles de calmar et langoustines préparées pour les tablées conviviales.",
          "price": "3,000 DZD"
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "name": "Corbeille de Gâteaux Fins Algériens",
          "description": "Sélection de douceurs festives : Makroudh au miel de fleur d'oranger, Dziriette amande et Samsa triangulaire croustillante.",
          "price": "950 DZD"
        },
        {
          "name": "Salade de Fruits Frais à l'Eau de Rose",
          "description": "Fruits de saison découpés en dés et parfumés d'une infusion d'eau de rose de Damas et d'une pointe de cannelle.",
          "price": "600 DZD"
        }
      ]
    },
    {
      "category": "Beverages",
      "items": [
        {
          "name": "Cérémonie du Thé à la Menthe Dar Zellige",
          "description": "Thé vert à la menthe fraîche servi depuis une théière en cuivre argenté martelée à la main sur plateau ciselé.",
          "price": "500 DZD"
        },
        {
          "name": "Cocktail Rafraîchissant Zellige Grenade",
          "description": "Jus pur de grenade pressée, traits d'eau de fleur d'oranger artisanale et eau gazéifiée fraîche.",
          "price": "550 DZD"
        }
      ]
    }
  ]
};

export const STORAGE_KEY = 'restaurant_data_dar-zellige';

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

import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = {
  "id": "chez-sauveur",
  "name": "Restaurant Chez Sauveur",
  "cuisine": [
    "Traditional Seafood",
    "Coastal Algerian Maritime"
  ],
  "address": "Port El Djamila (La Madrague), Aïn Benian, 16041 Alger, Algeria",
  "phone": "+213 661 55 00 83",
  "hours": {
    "monday": "12:00 - 16:00, 19:00 - 23:30",
    "tuesday": "12:00 - 16:00, 19:00 - 23:30",
    "wednesday": "12:00 - 16:00, 19:00 - 23:30",
    "thursday": "12:00 - 16:00, 19:00 - 23:30",
    "friday": "13:00 - 23:30",
    "saturday": "12:00 - 16:00, 19:00 - 23:30",
    "sunday": "12:00 - 16:00, 19:00 - 23:30"
  },
  "social_links": {
    "facebook": "https://www.facebook.com/chezsauveurlamadrague",
    "instagram": "https://www.instagram.com/chez_sauveur_officiel"
  },
  "branding": {
    "color_palette": [
      "#9E2A2B",
      "#335C67",
      "#E09F3E",
      "#FFF3B0"
    ],
    "aesthetic_keywords": [
      "Historic portside institution",
      "Iconic seafood since 1960",
      "Fisherman harbor vibe",
      "Unpretentious authentic gastronomy",
      "Coastal Mediterranean charm"
    ],
    "logo_description": "Vintage round coastal emblem featuring a wooden ship helm surrounding bold cursive lettering 'Chez Sauveur - Depuis 1960'."
  },
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "name": "Crevettes Culte à la Sauce Rouge Piquante",
          "description": "Spécialité légendaire du restaurant depuis plus de 60 ans : crevettes de roche mijotées dans une sauce rouge épicée à l'ail et piment fort.",
          "price": "1,900 DZD"
        },
        {
          "name": "Salade de Calamars Frais Marinés",
          "description": "Anneaux de calamars tendres cuits au court-bouillon, assaisonnés d'ail haché, persil plat et huile d'olive de première pression.",
          "price": "1,200 DZD"
        },
        {
          "name": "Bourek de la Madrague aux Crevettes",
          "description": "Croustillant de dioul garni d'une béchamel fine aux petits morceaux de crevettes roses et fromage râpé.",
          "price": "550 DZD"
        }
      ]
    },
    {
      "category": "Mains",
      "items": [
        {
          "name": "Loup de Mer Sauvage Grillé au Feu de Bois",
          "description": "Loup de mer fraîchement débarqué au port de la Madrague, cuit sur la braise avec herbes marines et quartier de citron.",
          "price": "2,900 DZD"
        },
        {
          "name": "Pavé d'Espadon Frais à la Plancha",
          "description": "Steak d'espadon épais mariné aux aromates de bord de mer, grillé à point et servi avec frites maison.",
          "price": "2,500 DZD"
        },
        {
          "name": "Rougets de Roche Poêlés à l'Ail",
          "description": "Petits rougets de roche pêchés localement, poêlés à l'huile d'olive avec gousses d'ail entières et persil frais.",
          "price": "2,400 DZD"
        },
        {
          "name": "Tagliatelles aux Fruits de Mer en Sauce Tomate",
          "description": "Pâtes longues nappées d'une sauce mijotée aux tomates fraîches, moules, crevettes et dés de poisson du jour.",
          "price": "2,100 DZD"
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "name": "Tartelette Artisanale aux Fruits de Saison",
          "description": "Fond de pâte sablée croustillant, crème pâtissière légère et fruits frais de saison nappés de gelée de pomme.",
          "price": "600 DZD"
        },
        {
          "name": "Sorbet Plein Fruit Citron Vert de Mitidja",
          "description": "Sorbet artisanal rafraîchissant préparé avec le jus des vergers de la Mitidja.",
          "price": "500 DZD"
        }
      ]
    },
    {
      "category": "Beverages",
      "items": [
        {
          "name": "Citronnade de la Madrague à la Menthe",
          "description": "Jus de citron frais préparé minute avec feuilles de menthe fraîche et glaçons.",
          "price": "400 DZD"
        },
        {
          "name": "Eau Minérale Gazeuse Ifri 1L",
          "description": "Bouteille d'eau gazeuse pure des sources du Djurdjura.",
          "price": "250 DZD"
        }
      ]
    }
  ]
};

export const STORAGE_KEY = 'restaurant_data_chez-sauveur';

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

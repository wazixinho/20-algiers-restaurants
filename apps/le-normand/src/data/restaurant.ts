import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = {
  "id": "le-normand",
  "name": "Restaurant Le Normand",
  "cuisine": [
    "French Terroir & Gastronomy",
    "Historic Brasserie"
  ],
  "address": "Rue des Frères Allahoum (ex-1 Rue Tancrède), Alger-Centre, 16000 Alger, Algeria",
  "phone": "+213 44 19 95 60",
  "hours": {
    "monday": "11:30 - 23:30",
    "tuesday": "11:30 - 23:30",
    "wednesday": "11:30 - 23:30",
    "thursday": "11:30 - 23:30",
    "friday": "18:00 - 23:30",
    "saturday": "11:30 - 23:30",
    "sunday": "11:30 - 23:30"
  },
  "social_links": {
    "facebook": "https://www.facebook.com/lenormandalger",
    "instagram": "https://www.instagram.com/restaurant_le_normand"
  },
  "branding": {
    "color_palette": [
      "#5C1D24",
      "#3D405B",
      "#E07A5F",
      "#F4F1DE"
    ],
    "aesthetic_keywords": [
      "Historic French terroir bistro",
      "Wood-paneled dining room",
      "Rustic French gastronomy",
      "Old Algiers architecture",
      "Hearty culinary tradition"
    ],
    "logo_description": "Vintage heraldic crest displaying two Norman lions flanking a classic copper culinary pot with typography 'Le Normand Alger - Maison Fondée'."
  },
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "name": "Escargots de Bourgogne Persillés",
          "description": "Douzaine d'escargots sauvages préparés au beurre fin d'Isigny, ail haché, persil plat et échalotes grises.",
          "price": "1,300 DZD"
        },
        {
          "name": "Salade Tiède de Foies de Volaille Déglacés",
          "description": "Foies de volaille poêlés minute déglacés au vinaigre de framboise sur lit de roquette et croûtons dorés.",
          "price": "1,100 DZD"
        },
        {
          "name": "Terrine Artisanale de Gibier aux Pistaches",
          "description": "Terrine préparée maison aux viandes de gibier marinées, pistaches entières et compotée d'oignons doux.",
          "price": "1,400 DZD"
        }
      ]
    },
    {
      "category": "Mains",
      "items": [
        {
          "name": "Daube Provençale de Joues de Bœuf",
          "description": "Joues de bœuf fondantes braisées doucement pendant 8 heures avec carottes nouvelles, ail et bouquet garni.",
          "price": "2,700 DZD"
        },
        {
          "name": "Queue de Bœuf Braisée à l'Ancienne",
          "description": "Plat de terroir mijoté jusqu'à détachement de la viande, servi avec mousseline de pommes de terre onctueuse au beurre frais.",
          "price": "2,500 DZD"
        },
        {
          "name": "Choucroute Royale de la Mer",
          "description": "Choucroute fine cuisinée garnie de pavé de saumon, dos de cabillaud, grosses crevettes et sauce au beurre blanc.",
          "price": "2,900 DZD"
        },
        {
          "name": "Perdreau Rôti Farci aux Morilles",
          "description": "Perdreau entier doré au four, farce fine aux raisins de Corinthe et morilles sauvages poêlées au beurre.",
          "price": "3,200 DZD"
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "name": "Tarte Tatin Tiède aux Pommes Caramélisées",
          "description": "Pommes fondantes confites au beurre et sucre caramélisé, pâte brisée croustillante et crème fraîche épaisse d'Isigny.",
          "price": "800 DZD"
        },
        {
          "name": "Mousse au Chocolat Noir Grand Cru",
          "description": "Mousse légère et corsée au chocolat noir 70% pur beurre de cacao préparée selon la recette ancestrale.",
          "price": "650 DZD"
        }
      ]
    },
    {
      "category": "Beverages",
      "items": [
        {
          "name": "Café Filtre à l'Ancienne en Cafetière Émaillée",
          "description": "Café moulu sélectionné extrait lentement dans une cafetière rétro émaillée.",
          "price": "350 DZD"
        },
        {
          "name": "Pur Jus de Pommes Pressé de l'Atlas",
          "description": "Jus pur de pommes acidulées récoltées dans les vergers des montagnes de Blida.",
          "price": "450 DZD"
        }
      ]
    }
  ]
};

export const STORAGE_KEY = 'restaurant_data_le-normand';

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

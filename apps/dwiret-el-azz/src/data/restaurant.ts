import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = {
  "id": "dwiret-el-azz",
  "name": "Restaurant Dwiret El Azz",
  "cuisine": [
    "Traditional Algerian Haute Cuisine",
    "Heritage Tea Lounge"
  ],
  "address": "17 Chemin Abdelkader Gadouche, Hydra, 16035 Alger, Algeria",
  "phone": "+213 550 07 04 50",
  "hours": {
    "monday": "14:00 - 00:00",
    "tuesday": "14:00 - 00:00",
    "wednesday": "14:00 - 00:00",
    "thursday": "14:00 - 00:00",
    "friday": "15:00 - 00:00",
    "saturday": "14:00 - 00:00",
    "sunday": "14:00 - 00:00"
  },
  "social_links": {
    "facebook": "https://www.facebook.com/dwiretelazz",
    "instagram": "https://www.instagram.com/dwiret_el_azz"
  },
  "branding": {
    "color_palette": [
      "#49111C",
      "#D4AF37",
      "#0F4C5C",
      "#F8F5EE"
    ],
    "aesthetic_keywords": [
      "17th-century Moorish mansion",
      "Shaded courtyard gardens",
      "Illuminated pool and fountain",
      "Aristocratic Algerian hospitality",
      "Ancestral luxury dining"
    ],
    "logo_description": "Ornate traditional arched doorway with carved wooden Mashrabiya latticework enclosing delicate Arabic calligraphy 'Dwiret El Azz'."
  },
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "name": "Formule El Meida de Crêpes & Douceurs",
          "description": "Plateau traditionnel servi avec Mhadjeb feuilletées chaudes aux oignons confits et Beghrir aux mille trous nappés de miel et beurre fondu.",
          "price": "1,200 DZD"
        },
        {
          "name": "Chorba Frik au Gigot d'Agneau",
          "description": "Soupe impériale au blé vert concassé, morceaux tendres d'agneau et herbes fraîches du jardin de la demeure.",
          "price": "800 DZD"
        },
        {
          "name": "Trilogie de Salades du Terroir Algérien",
          "description": "Assiette de dégustation : Hmiss piquant de Constantine, Méchouia grillée au feu de bois et Zaalouk d'aubergines au cumin.",
          "price": "1,000 DZD"
        }
      ]
    },
    {
      "category": "Mains",
      "items": [
        {
          "name": "Formule Royale Dwiret El Azz",
          "description": "Méchoui d'agneau fermier rôti lentement, tajine sucré-salé aux fruits secs et couscous fin aux légumes du terroir.",
          "price": "4,200 DZD"
        },
        {
          "name": "Tajine d'Agneau aux Artichauts & Petits Pois",
          "description": "Morceaux d'agneau fondants mijotés avec cœurs d'artichauts sauvages, petits pois doux et parfum de fleur d'oranger.",
          "price": "2,600 DZD"
        },
        {
          "name": "Rechta Traditionnelle au Poulet Fermier",
          "description": "Fines bandelettes de pâtes fraîches maison cuites à la vapeur, morceaux de poulet fermier doré, navets fondants et cannelle.",
          "price": "2,300 DZD"
        },
        {
          "name": "Grillades Mixtes Impériales sur Brasero",
          "description": "Assortiment de brochettes d'agneau, côtelettes parfumées au romarin et merguez artisanales servies sur petit brasero de table au charbon de bois.",
          "price": "3,200 DZD"
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "name": "Plateau Royal de Pâtisseries Algéroises",
          "description": "Sélection de trois gâteaux fins de fête : Dziriette aux amandes, M'chewek doré et Samsa croustillante au miel pur d'oranger.",
          "price": "1,100 DZD"
        },
        {
          "name": "Beghrir Traditionnel au Beurre Clarifié & Miel",
          "description": "Crêpes mille trous tièdes arrosées de beurre clarifié traditionnel smen et miel de cèdre naturel.",
          "price": "750 DZD"
        }
      ]
    },
    {
      "category": "Beverages & Teas",
      "items": [
        {
          "name": "Cérémonie du Thé en Samovar Ciselé",
          "description": "Thé vert royal infusé aux feuilles de menthe nanah fraîche, servi au samovar traditionnel avec pignons de pin.",
          "price": "550 DZD"
        },
        {
          "name": "Frappuccino Maison Pistache & Caramel",
          "description": "Boisson gourmande glacée au café espresso, lait frais, éclats de pistaches grillées et coulis de caramel beurre salé.",
          "price": "800 DZD"
        }
      ]
    }
  ]
};

export const STORAGE_KEY = 'restaurant_data_dwiret-el-azz';

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

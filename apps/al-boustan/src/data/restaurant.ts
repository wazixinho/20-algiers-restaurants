import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = {
  "id": "al-boustan",
  "name": "Restaurant Al Boustan",
  "cuisine": [
    "Authentic Lebanese",
    "Middle Eastern & Seafood"
  ],
  "address": "Bois des Arcades, Riadh El Feth, El Madania, 16075 Alger, Algeria",
  "phone": "+213 21 66 92 71",
  "hours": {
    "monday": "12:00 - 23:30",
    "tuesday": "12:00 - 23:30",
    "wednesday": "12:00 - 23:30",
    "thursday": "12:00 - 23:30",
    "friday": "13:00 - 23:30",
    "saturday": "12:00 - 23:30",
    "sunday": "12:00 - 23:30"
  },
  "social_links": {
    "facebook": "https://www.facebook.com/alboustanalger",
    "instagram": "https://www.instagram.com/alboustan_alger"
  },
  "branding": {
    "color_palette": [
      "#1B4332",
      "#E9C46A",
      "#D8F3DC",
      "#F4F1DE"
    ],
    "aesthetic_keywords": [
      "Panoramic bay view",
      "Lush cedar garden",
      "Diplomatic institution",
      "Levantine banqueting",
      "Sunset terrace"
    ],
    "logo_description": "Stylized golden Lebanese cedar crest entwined with an olive branch, centered above classic Arabic and Latin typography."
  },
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "name": "Grand Mezzé Libanais Froid",
          "description": "Assortiment de 5 spécialités : Hommos crémeux à la tahina, Moutabal d'aubergines fumées, Taboulé libanais au persil plat, Salade Fattouche au sumac et Waraq Enab (feuilles de vigne farcies).",
          "price": "2,200 DZD"
        },
        {
          "name": "Assortiment de Mezzés Chauds",
          "description": "Plateau dégustation de Kébbé croustillant à la viande hachée, Sambousek d'agneau, Fatayer aux épinards et tranches de fromage Halloumi grillé.",
          "price": "1,800 DZD"
        },
        {
          "name": "Salade Fattouche au Pain Grillé",
          "description": "Légumes croquants du potager, pain libanais croustillant, mélasse de grenade aigre-douce et sumac pourpre.",
          "price": "900 DZD"
        }
      ]
    },
    {
      "category": "Mains",
      "items": [
        {
          "name": "Mashawi Mix Grill Beyrouthin",
          "description": "Brochettes de Chich Taouk de volaille marinée, brochettes de Kafta d'agneau aux herbes, côtelettes d'agneau grillées et galettes chaudes au zaatar.",
          "price": "3,100 DZD"
        },
        {
          "name": "Méchoui d'Agneau Oriental Al Boustan",
          "description": "Gigot d'agneau confit aux sept épices libanaises, servi sur lit de riz basmati aux fruits secs et pignons dorés.",
          "price": "3,400 DZD"
        },
        {
          "name": "Gambas Grillées à la Beyrouthine",
          "description": "Gambas géantes saisies sur braises, arrosées d'une émulsion d'ail, jus de citron frais et coriandre hachée.",
          "price": "3,200 DZD"
        },
        {
          "name": "Chawarma d'Agneau à l'Assiette",
          "description": "Émincés d'agneau mariné rôtis à la broche, sauce tarator au sésame, navets marinés au pourpre et pain pita chaud.",
          "price": "2,300 DZD"
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "name": "Mouhalabieh au Mastic et Eau de Rose",
          "description": "Flan libanais soyeux au lait et résine de mastic, nappé d'un sirop à l'eau de rose et généreusement garni d'éclats de pistaches.",
          "price": "650 DZD"
        },
        {
          "name": "Plateau de Baklawa de Beyrouth",
          "description": "Fines feuilles de pâte filo croustillantes garnies de noix et pistaches, arrosées de sirop au miel pur d'acacia.",
          "price": "900 DZD"
        }
      ]
    },
    {
      "category": "Signature Drinks",
      "items": [
        {
          "name": "Limonade Libanaise à la Fleur d'Oranger",
          "description": "Citrons frais pressés avec feuilles de menthe nanah et une larme d'eau de fleur d'oranger artisanale.",
          "price": "500 DZD"
        },
        {
          "name": "Jallab Traditionnel aux Pignons de Pin",
          "description": "Boisson libanaise rafraîchissante à base de sirop de dattes, caroube et eau de rose, parsemée de pignons et raisins blonds.",
          "price": "550 DZD"
        }
      ]
    }
  ]
};

export const STORAGE_KEY = 'restaurant_data_al-boustan';

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

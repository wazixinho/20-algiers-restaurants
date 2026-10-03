import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = {
  "id": "la-trattoria-sheraton",
  "name": "La Trattoria - Sheraton Club des Pins",
  "cuisine": [
    "Upscale Italian",
    "Mediterranean Coastal Cuisine"
  ],
  "address": "Sheraton Club des Pins Resort, Boîte Postale 62, Club des Pins, Staoueli, 16101 Alger, Algeria",
  "phone": "+213 21 37 77 77",
  "hours": {
    "monday": "19:00 - 23:30",
    "tuesday": "19:00 - 23:30",
    "wednesday": "19:00 - 23:30",
    "thursday": "19:00 - 23:30",
    "friday": "Closed",
    "saturday": "19:00 - 23:30",
    "sunday": "19:00 - 23:30"
  },
  "social_links": {
    "website": "https://www.latrattoriaalgiers.com",
    "facebook": "https://www.facebook.com/SheratonClubdesPins",
    "instagram": "https://www.instagram.com/sheratonclubdespins"
  },
  "branding": {
    "color_palette": [
      "#003566",
      "#FFC300",
      "#001D3D",
      "#FFFFFF"
    ],
    "aesthetic_keywords": [
      "Luxury resort coastal dining",
      "Panoramic sea sunset view",
      "Italian riviera chic",
      "Candlelit terrace",
      "Five-star hotel service"
    ],
    "logo_description": "Stylized Italian script reading 'La Trattoria' framed beneath the golden laurel crest of Sheraton Club des Pins Resort."
  },
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "name": "Vitello Tonnato Classico",
          "description": "Fines tranches de quasi de veau rôti à froid, sauce crémeuse au thon blanc, câpres sauvages et filets d'anchois.",
          "price": "1,800 DZD"
        },
        {
          "name": "Insalata di Mare Tiepida",
          "description": "Salade tiède de fruits de mer (crevettes, calamars, seiche et moules) marinés à l'huile d'olive vierge et jus de citron.",
          "price": "2,100 DZD"
        },
        {
          "name": "Bruschetta Gourmet alla Mozzarella di Bufala",
          "description": "Pain de campagne toasté frotté à l'ail, tomates San Marzano concassées, mozzarella di bufala et feuilles de basilic frais.",
          "price": "1,200 DZD"
        }
      ]
    },
    {
      "category": "Mains",
      "items": [
        {
          "name": "Carré d'Agneau Local Grillé aux Herbes",
          "description": "Carré d'agneau tendre grillé à la flamme, jus réduit au romarin et légumes du soleil rôtis à l'huile d'olive.",
          "price": "3,800 DZD"
        },
        {
          "name": "Filet de Bar Poêlé à la Méditerranéenne",
          "description": "Filet de bar frais poêlé unilatéral, écrasé de pommes de terre à l'huile d'olive et tombée de courgettes marinées.",
          "price": "3,400 DZD"
        },
        {
          "name": "Risotto ai Frutti di Mare",
          "description": "Riz carnaroli crémeux cuisiné au fumet de poisson, gambas royales, moules fraîches et anneaux de calmar.",
          "price": "3,200 DZD"
        },
        {
          "name": "Pizza Frutti di Mare al Forno",
          "description": "Pizza artisanale étalée à la main, sauce tomate San Marzano, mozzarella, crevettes, calamars et origan sauvage.",
          "price": "2,400 DZD"
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "name": "Panna Cotta Infusée au Romarin",
          "description": "Crème douce infusée d'une branche de romarin frais du jardin du resort et coulis acidulé de fruits rouges.",
          "price": "850 DZD"
        },
        {
          "name": "Trio de Cannoli Siciliens Artisanaux",
          "description": "Rouleaux de pâte croustillants garnis de crème de ricotta sucrée, pépites de chocolat noir et pistaches de Bronte.",
          "price": "950 DZD"
        }
      ]
    },
    {
      "category": "Beverages",
      "items": [
        {
          "name": "Cocktail Riviera Sunset",
          "description": "Jus pur de grenade, nectar d'oranges sanguines, eau gazeuse fraîche et zeste d'agrumes flambé.",
          "price": "700 DZD"
        },
        {
          "name": "Bouteille San Pellegrino 75cl",
          "description": "Eau minérale naturelle pétillante italienne servie fraîche avec quartier de citron.",
          "price": "500 DZD"
        }
      ]
    }
  ]
};

export const STORAGE_KEY = 'restaurant_data_la-trattoria-sheraton';

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

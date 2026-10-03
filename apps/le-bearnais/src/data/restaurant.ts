import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = {
  "id": "le-bearnais",
  "name": "Restaurant Le Béarnais",
  "cuisine": [
    "Classic French",
    "Steak & Seafood Brasserie"
  ],
  "address": "5 Rue Ahmed et Boualem Khalfi, Alger-Centre, 16000 Alger, Algeria",
  "phone": "+213 21 63 03 07",
  "hours": {
    "monday": "12:00 - 22:30",
    "tuesday": "12:00 - 22:30",
    "wednesday": "12:00 - 22:30",
    "thursday": "12:00 - 22:30",
    "friday": "12:00 - 14:30, 18:00 - 22:30",
    "saturday": "12:00 - 22:30",
    "sunday": "12:00 - 22:30"
  },
  "social_links": {
    "facebook": "https://www.facebook.com/lebearnaisalger",
    "instagram": "https://www.instagram.com/lebearnaisalger"
  },
  "branding": {
    "color_palette": [
      "#4A0E17",
      "#D4AF37",
      "#2B2D42",
      "#F4F1DE"
    ],
    "aesthetic_keywords": [
      "Historic French institution",
      "Haussmannian brasserie",
      "Dark wood and leather banquettes",
      "Intimate candlelit dinners",
      "Generous traditional cooking"
    ],
    "logo_description": "Traditional Pyrenean Béarn cattle horn crest in deep copper above classic antique serif font 'Le Béarnais'."
  },
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "name": "Salade Landaise aux Gésiers Tièdes",
          "description": "Mesclun croquant, gésiers de canard confits chauds, tranches de magret fumé et vinaigrette à l'échalote.",
          "price": "1,400 DZD"
        },
        {
          "name": "Coquille de Poisson & Fruits de Mer Gratinée",
          "description": "Morceaux de poissons nobles et crevettes gratinés au four dans une sauce veloutée à la crème et emmental.",
          "price": "1,700 DZD"
        },
        {
          "name": "Carpaccio de Filet de Bœuf au Parmesan",
          "description": "Fines tranches de filet de bœuf cru assaisonnées d'huile d'olive extra vierge, câpres et copeaux de parmesan.",
          "price": "1,300 DZD"
        }
      ]
    },
    {
      "category": "Mains",
      "items": [
        {
          "name": "Entrecôte Grillée Façon Béarnaise",
          "description": "Généreuse pièce d'entrecôte de bœuf grillée sur braises, sauce béarnaise maison montée à l'estragon et frites fraîches.",
          "price": "2,900 DZD"
        },
        {
          "name": "Filet de Loup Poêlé au Fenouil Braisé",
          "description": "Filet de loup de mer poêlé à l'huile d'olive, fenouil braisé au jus d'agrumes et écrasé de pommes rattes.",
          "price": "2,700 DZD"
        },
        {
          "name": "Paella Traditionnelle Riche en Crustacés",
          "description": "Riz doré au safran avec crevettes fraîches, moules de roche, morceaux de poisson blanc et petits pois doux.",
          "price": "2,800 DZD"
        },
        {
          "name": "Rognons de Veau Flambés à la Moutarde de Dijon",
          "description": "Rognons de veau frais sautés au beurre, flambés au cognac et nappés d'une sauce crémeuse à la moutarde forte.",
          "price": "2,400 DZD"
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "name": "Profiteroles Artisanales au Chocolat Fondu",
          "description": "Trois choux garnis de glace vanille artisanale, nappés d'un riche coulis de chocolat noir chaud et chantilly.",
          "price": "800 DZD"
        },
        {
          "name": "Crème Caramel Renversée à l'Ancienne",
          "description": "Crème aux œufs frais et lait entier cuite au bain-marie, généreux caramel ambré liquide.",
          "price": "600 DZD"
        }
      ]
    },
    {
      "category": "Beverages",
      "items": [
        {
          "name": "Café Gourmand Le Béarnais",
          "description": "Espresso serré accompagné d'une mini tartelette, un macaron et une verrine de mousse chocolat.",
          "price": "550 DZD"
        },
        {
          "name": "Jus d'Oranges Fraîches Pressées",
          "description": "Oranges mûres pressées à la commande servies bien fraîches.",
          "price": "450 DZD"
        }
      ]
    }
  ]
};

export const STORAGE_KEY = 'restaurant_data_le-bearnais';

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

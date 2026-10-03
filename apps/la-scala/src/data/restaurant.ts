import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = {
  "id": "la-scala",
  "name": "Restaurant La Scala",
  "cuisine": [
    "French Fine Dining",
    "Mediterranean Continental"
  ],
  "address": "01 Boulevard du 11 Décembre 1960, Résidence Zemoun Youcef, El Biar, 16030 Alger, Algeria",
  "phone": "+213 561 03 80 04",
  "hours": {
    "monday": "12:00 - 15:00, 19:00 - 23:00",
    "tuesday": "12:00 - 15:00, 19:00 - 23:00",
    "wednesday": "12:00 - 15:00, 19:00 - 23:00",
    "thursday": "12:00 - 15:00, 19:00 - 23:00",
    "friday": "18:00 - 23:00",
    "saturday": "12:00 - 15:00, 19:00 - 23:00",
    "sunday": "12:00 - 15:00, 19:00 - 23:00"
  },
  "social_links": {
    "facebook": "https://www.facebook.com/lascala.elbiar",
    "instagram": "https://www.instagram.com/lascala_elbiar"
  },
  "branding": {
    "color_palette": [
      "#1C1917",
      "#D4AF37",
      "#44403C",
      "#FAFAF9"
    ],
    "aesthetic_keywords": [
      "Operatic elegance",
      "Haute gastronomie",
      "Diplomatic discretion",
      "Refined luxury interior",
      "Crystal chandeliers"
    ],
    "logo_description": "Classical gold emblem featuring a stylized theatrical lyric harp monogram above pristine serif letters reading 'LA SCALA EL BIAR'."
  },
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "name": "Carpaccio de Saumon Fumé aux Baies Roses",
          "description": "Fines tranches de saumon d'Écosse fumé au bois de chêne, crème fouettée à l'aneth et baies roses concassées.",
          "price": "1,600 DZD"
        },
        {
          "name": "Salade Périgourdine Gourmande",
          "description": "Gésiers de canard confits tièdes, copeaux de foie gras de canard, cerneaux de noix et vinaigrette à la moutarde ancienne.",
          "price": "1,800 DZD"
        },
        {
          "name": "Gratinée à l'Oignon à l'Ancienne",
          "description": "Soupe réconfortante aux oignons caramélisés au beurre, bouillon de bœuf, croûtons dorés et fromage de gruyère gratiné.",
          "price": "950 DZD"
        }
      ]
    },
    {
      "category": "Mains",
      "items": [
        {
          "name": "Tournedos Rossini au Jus de Truffe",
          "description": "Cœur de filet de bœuf tendre surmonté d'une escalope de foie gras poêlée et d'une réduction veloutée au jus de truffe.",
          "price": "3,900 DZD"
        },
        {
          "name": "Carré d'Agneau en Croûte d'Herbes de Provence",
          "description": "Côtelettes d'agneau rôties en croûte de chapelure persillée au romarin, servies avec un tian de légumes confits.",
          "price": "3,400 DZD"
        },
        {
          "name": "Paella Royale Valencienne Revisitée",
          "description": "Riz bomba cuisiné au bouillon safrané, morceaux de poulet fermier, gambas royales et langoustines fraîches.",
          "price": "3,100 DZD"
        },
        {
          "name": "Filet de Bar Sauvage en Croûte de Sel",
          "description": "Poisson noble cuit sous sa coque de sel marin pour préserver toute sa chair moelleuse, servi avec beurre blanc citronné.",
          "price": "3,200 DZD"
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "name": "Soufflé Chaud au Grand Marnier",
          "description": "Soufflé aérien préparé à la minute, parfumé aux liqueurs d'agrumes et saupoudré de sucre glace.",
          "price": "850 DZD"
        },
        {
          "name": "Moelleux Chocolat Noir & Cœur Pistache",
          "description": "Gâteau moelleux au cacao pur d'origine avec cœur coulant à la pâte de pistache pure, boule de glace vanille.",
          "price": "800 DZD"
        }
      ]
    },
    {
      "category": "Beverages",
      "items": [
        {
          "name": "Cocktail Signature La Scala",
          "description": "Mélange raffiné de jus de fruits exotiques de la passion, pointe de sirop d'orgeat artisanal et eau gazeuse.",
          "price": "650 DZD"
        },
        {
          "name": "Café Ristretto Illy d'Exception",
          "description": "Café italien torréfié d'origine pure servi avec assortiment de chocolats fins.",
          "price": "450 DZD"
        }
      ]
    }
  ]
};

export const STORAGE_KEY = 'restaurant_data_la-scala';

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

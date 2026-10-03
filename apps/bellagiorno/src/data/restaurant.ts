import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = {
  "id": "bellagiorno",
  "name": "Restaurant Bellagiorno",
  "cuisine": [
    "Artisanal Italian",
    "Mediterranean Garden Dining"
  ],
  "address": "Chemin Saïd Hamdine, Bir Mourad Raïs, 16005 Alger, Algeria",
  "phone": "+213 560 00 11 03",
  "hours": {
    "monday": "10:00 - 23:30",
    "tuesday": "10:00 - 23:30",
    "wednesday": "10:00 - 23:30",
    "thursday": "10:00 - 23:30",
    "friday": "14:00 - 23:30",
    "saturday": "10:00 - 23:30",
    "sunday": "10:00 - 23:30"
  },
  "social_links": {
    "facebook": "https://www.facebook.com/bellagiornoalger",
    "website": "https://www.bellagiorno.com",
    "instagram": "https://www.instagram.com/bellagiorno_alger"
  },
  "branding": {
    "color_palette": [
      "#2B4C3F",
      "#D4A373",
      "#E76F51",
      "#FAEDCD"
    ],
    "aesthetic_keywords": [
      "Open-air garden lounge",
      "Wood-fired oven",
      "Fresh handmade pasta",
      "Al fresco Mediterranean dining",
      "Contemporary Italian lifestyle"
    ],
    "logo_description": "Modern stylized golden sun emblem radiating sleek artistic rays above flowing Italian typography 'Bellagiorno Restaurant & Lounge'."
  },
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "name": "Carpaccio di Manzo al Parmigiano",
          "description": "Très fines lamelles de filet de bœuf mariné au citron de Sorrente, huile d'olive vierge, roquette fraîche et copeaux de parmesan 24 mois.",
          "price": "1,500 DZD"
        },
        {
          "name": "Burrata Crémeuse & Focaccia au Romarin",
          "description": "Boule entière de burrata crémeuse, concassé de tomates cerises marinées au basilic et focaccia chaude cuite au feu de bois.",
          "price": "1,800 DZD"
        },
        {
          "name": "Calamari Fritti alla Romana",
          "description": "Anneaux et tentacules de calmar frais frits dans une pâte légère croustillante, sauce tartare maison au citron.",
          "price": "1,400 DZD"
        }
      ]
    },
    {
      "category": "Mains",
      "items": [
        {
          "name": "Tagliolini Artisanales à la Truffe d'Été",
          "description": "Pâtes fraîches fabriquées sur place le matin même, émulsion au beurre de truffe, copeaux de truffe d'été et parmesan râpé minute.",
          "price": "2,400 DZD"
        },
        {
          "name": "Pizza Gourmet Tartufata au Feu de Bois",
          "description": "Pâte à fermentation lente de 48h, crème de truffe noire, mozzarella fior di latte, champignons sautés et huile de truffe.",
          "price": "2,100 DZD"
        },
        {
          "name": "Filetto di Spigola alla Ligure",
          "description": "Filet de bar poêlé aux câpres de Salina, olives taggiasche, tomates cerises confites et pommes de terre fondantes.",
          "price": "2,800 DZD"
        },
        {
          "name": "Osso Buco alla Milanese & Risotto",
          "description": "Jarret de veau braisé lentement aux petits légumes et zeste de gremolata, accompagné de son risotto crémeux au safran.",
          "price": "2,900 DZD"
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "name": "Tiramisu Classique Vénitien",
          "description": "Véritable mascarpone italien, biscuits savoiardi trempés dans un café espresso serré et saupoudrés de cacao hollandais amer.",
          "price": "800 DZD"
        },
        {
          "name": "Panna Cotta à la Vanille de Madagascar",
          "description": "Crème soyeuse prise à froid parfumée aux gousses de vanille et nappe de coulis de framboises fraîches.",
          "price": "700 DZD"
        }
      ]
    },
    {
      "category": "Beverages",
      "items": [
        {
          "name": "Mocktail Bellagiorno Spritz",
          "description": "Bitter sans alcool San Pellegrino, jus d'oranges sanguines pressées, tranche d'orange séchée et branche de romarin frais.",
          "price": "650 DZD"
        },
        {
          "name": "Limonata Artigianale au Basilic Frais",
          "description": "Citrons frais pressés, sirop de canne et feuilles de basilic frais pilées sur glace.",
          "price": "500 DZD"
        }
      ]
    }
  ]
};

export const STORAGE_KEY = 'restaurant_data_bellagiorno';

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

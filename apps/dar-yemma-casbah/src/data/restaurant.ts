import { RestaurantProfile } from '../types';

export const initialRestaurantData: RestaurantProfile = {
  "id": "dar-yemma-casbah",
  "name": "Restaurant Dar Yemma Casbah",
  "cuisine": [
    "Casbah Ancestral Cuisine",
    "Traditional Algerian Comfort Food"
  ],
  "address": "6 Rue Larbi Triki, Casbah, 16017 Alger, Algeria",
  "phone": "+213 550 98 08 50",
  "hours": {
    "monday": "11:30 - 16:30",
    "tuesday": "11:30 - 16:30",
    "wednesday": "11:30 - 16:30",
    "thursday": "11:30 - 18:00",
    "friday": "Closed",
    "saturday": "11:30 - 16:30",
    "sunday": "11:30 - 16:30"
  },
  "social_links": {
    "facebook": "https://www.facebook.com/daryemmacasbah",
    "instagram": "https://www.instagram.com/dar_yemma_casbah"
  },
  "branding": {
    "color_palette": [
      "#A8422B",
      "#F3C68F",
      "#4A3B32",
      "#FFFBF2"
    ],
    "aesthetic_keywords": [
      "UNESCO Casbah heritage",
      "Maternal home cooking",
      "Copper sniwa service",
      "Nostalgic authenticity",
      "Historic Ottoman townhouse"
    ],
    "logo_description": "Warm folk-art silhouette of an Algerian grandmother (Yemma) wearing a traditional Hayek, framed by historic Casbah window woodwork."
  },
  "menu": [
    {
      "category": "Starters",
      "items": [
        {
          "name": "Hmiss Traditionnel au Mortier & Kesra Chaude",
          "description": "Poivrons verts doux et piquants grillés sur flamme, pilés avec tomates mûres, ail et généreux filet d'huile d'olive de Kabylie, servi avec galette kesra tiède.",
          "price": "600 DZD"
        },
        {
          "name": "Batata Mchermla aux Épices Douces",
          "description": "Pommes de terre fondantes mijotées avec ail écrasé, carvi moulu, coriandre fraîche et paprika doux.",
          "price": "500 DZD"
        },
        {
          "name": "Zaalouk d'Aubergines de la Casbah",
          "description": "Purée rustique d'aubergines cuites à la vapeur puis revenues à l'huile d'olive, ail et cumin oriental.",
          "price": "550 DZD"
        }
      ]
    },
    {
      "category": "Mains",
      "items": [
        {
          "name": "Rechta Algéroise Faite Maison",
          "description": "Pâtes fines fraîches découpées à la main dans la Casbah, poulet fermier doré, navets blancs fondants et sauce blanche à la cannelle.",
          "price": "1,600 DZD"
        },
        {
          "name": "Couscous Ancestral aux Sept Légumes",
          "description": "Semoule de blé dur tamisée à la main, épaule d'agneau tendre mijotée, courgettes, carottes, navets, pois chiches et courge rouge.",
          "price": "1,900 DZD"
        },
        {
          "name": "Chentouf El 3azeb Traditionnel",
          "description": "Plat algérois d'antan oublié : morceaux de viande de veau mijotés longuement avec pois chiches et sauce onctueuse parfumée au poivre noir et cannelle.",
          "price": "1,800 DZD"
        },
        {
          "name": "Chtitha Djedj à la Dersa Rouge",
          "description": "Morceaux de poulet fermier mijotés dans une sauce rouge pimentée préparée avec la درسة (ail, piment sec pilé et cumin).",
          "price": "1,700 DZD"
        }
      ]
    },
    {
      "category": "Desserts",
      "items": [
        {
          "name": "Tamina Dorée au Miel Pur & Cannelle",
          "description": "Semoule grillée à la poêle mélangée à du beurre fondu et miel pur, décorée de motifs traditionnels à la cannelle.",
          "price": "500 DZD"
        },
        {
          "name": "M'halbi de la Casbah à la Poudre de Riz",
          "description": "Entremets doux au lait et riz moulu parfumé à l'eau de rose et parsemé d'amandes hachées.",
          "price": "450 DZD"
        }
      ]
    },
    {
      "category": "Beverages",
      "items": [
        {
          "name": "Thé Vert Casbadji aux Pignons Torréfiés",
          "description": "Thé à la menthe fraîche servi très chaud avec des pignons de pin légèrement dorés à la poêle.",
          "price": "350 DZD"
        },
        {
          "name": "Cherbet Casbah au Citron Pressé",
          "description": "Recette artisanale de limonade algéroise avec zeste râpé et pointe de lait entier.",
          "price": "300 DZD"
        }
      ]
    }
  ]
};

export const STORAGE_KEY = 'restaurant_data_dar-yemma-casbah';

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

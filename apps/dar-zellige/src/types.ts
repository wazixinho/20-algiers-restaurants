export interface MenuItem {
  id?: string;
  name: string;
  description: string;
  price: string;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export interface RestaurantHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  [key: string]: string;
}

export interface RestaurantBranding {
  color_palette: string[];
  aesthetic_keywords: string[];
  logo_description: string;
}

export interface RestaurantSocialLinks {
  instagram?: string;
  facebook?: string;
  website?: string;
  [key: string]: string | undefined;
}

export interface RestaurantProfile {
  id: string;
  name: string;
  cuisine: string[];
  address: string;
  phone: string;
  hours: RestaurantHours;
  social_links: RestaurantSocialLinks;
  branding: RestaurantBranding;
  menu: MenuCategory[];
}

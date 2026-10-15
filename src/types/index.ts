export interface CookingInstructions {
  oven?: {
    temp: string;
    duration: string;
    steps: string[];
    thermalBagTip?: string;
  };
  airfryer?: {
    temp: string;
    duration: string;
    steps: string[];
  };
  grill?: {
    heat: string;
    duration: string;
    steps: string[];
  };
  skillet?: {
    heat: string;
    duration: string;
    steps: string[];
  };
}

export interface ProductVariant {
  id: string;
  label: string;
  priceDelta?: number;
}

export type ProductCategory = 'duck' | 'beef' | 'poultry' | 'bundles';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  originalPrice?: number;
  weight: string;
  servings: string;
  image: string;
  badge?: string;
  badgeColor?: 'gold' | 'red' | 'green' | 'blue';
  description: string;
  marinade: string;
  packaging: string;
  prepTime: string;
  cookingTime: string;
  cookingInstructions: CookingInstructions;
  chefTip: string;
  variants?: ProductVariant[];
  isHero?: boolean;
  popular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface DeliveryDetails {
  fullName: string;
  phone: string;
  alternatePhone?: string;
  city: string;
  address: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  notes?: string;
  paymentMethod: 'whatsapp' | 'cod';
}

export interface GatheringPlan {
  guests: number;
  focus: 'duck_baladi' | 'bbq_meats' | 'family_mix';
  title: string;
  description: string;
  items: {
    productId: string;
    quantity: number;
    customNote?: string;
  }[];
}

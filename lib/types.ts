// ================================================================
// LA TOILE BLANCHE — TypeScript Type Definitions
// ================================================================

export interface Artist {
  id: string;
  slug: string;
  name: string;
  bio: string;
  philosophy: string;
  birthYear: number;
  nationality: string;
  location: string;
  exhibitions: string[];
  instagram?: string;
  website?: string;
}

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  artistId: string;
  year: number;
  price: number;
  currency: string;
  medium: string;
  dimensions: string;
  widthCm: number;
  heightCm: number;
  description: string;
  story: string;
  images: string[];
  availability: 'available' | 'sold' | 'reserved';
  category: string;
  tags: string[];
  featured: boolean;
  certificateId: string;
}

export interface CartItem {
  artworkId: string;
  quantity: number;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  governorate: string;
  city: string;
  address: string;
  postalCode: string;
  notes: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image?: string;
  date: string;
  readTime: string;
}

export type CartAction =
  | { type: 'ADD_ITEM'; artworkId: string }
  | { type: 'REMOVE_ITEM'; artworkId: string }
  | { type: 'CLEAR_CART' };

export interface CartState {
  items: CartItem[];
}

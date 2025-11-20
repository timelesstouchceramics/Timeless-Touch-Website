export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  finish: string;
  price: number;
  unit: string;
  images: string[];
  code?: string;
  size?: string;
  thickness?: string;
  bookmatch?: boolean;
  sixFace?: boolean;
  applications?: string[];
  description?: string;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
  description: string;
}

export type SortOption =
  | "name"
  | "name-desc"
  | "newest"
  | "price-asc"
  | "price-desc";

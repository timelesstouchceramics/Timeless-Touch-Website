export interface Product {
  id: number;
  slug: string;
  name: string;
  // Main category: slabs, tiles, pool-tiles, decorative
  mainCategory: string;
  // Design style sub-category: stone-look, marble-look, modern-look, wood-look, decorative
  designStyle: string;
  finish: string;
  price: number;
  unit: string;
  images: string[];
  code?: string;
  sizes?: string[];
  thickness?: string;
  bookmatch?: boolean;
  sixFace?: boolean;
  fullBody?: boolean;
  applications?: string[];
  description?: string;
}

export interface Collection {
  name: string;
  slug: string;
  type: "mainCategory" | "designStyle";
  image: string;
  description: string;
}

export type SortOption =
  | "name"
  | "name-desc"
  | "newest"
  | "price-asc"
  | "price-desc";

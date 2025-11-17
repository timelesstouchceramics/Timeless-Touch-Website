export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  finish: string;
  price: number;
  unit: string;
  image: string;
}

export type SortOption = "name" | "name-desc" | "newest" | "price-asc" | "price-desc";

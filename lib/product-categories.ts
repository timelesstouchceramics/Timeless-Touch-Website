import { Category } from "./types";

/**
 * Centralized product categories data.
 * This is the single source of truth for product categories used across the application.
 */
export const productCategories: Category[] = [
  {
    name: "Tiles",
    slug: "tiles",
    image: "/images/categories/tiles-category.jpeg",
    description: "Wood Look and Standard Tiles",
  },

  {
    name: "Slabs",
    slug: "slabs",
    image: "/images/categories/slabs-category.jpeg",
    description: "Large format porcelain slabs",
  },
  {
    name: "Modern Look Collection",
    slug: "modern-look",
    image: "/images/categories/modernlook-category.jpeg",
    description: "Emerald, Monocolor, Tattoo, and Concept series",
  },
  {
    name: "Stone Look Collection",
    slug: "stone-look",
    image: "/images/categories/stonelook-category.jpeg",
    description: "Travertine, Rockstone, and Ceppo series",
  },
  {
    name: "Marble Look Collection",
    slug: "marble-look",
    image: "/images/categories/marblelook-category.jpeg",
    description: "Black Collection, Luxury Range, Classic Marbles",
  },
  {
    name: "Swimming Pool Tiles",
    slug: "pool",
    image: "/images/categories/pooltile-category.jpeg",
    description: "Starwave Series - Crystalline Glazed Porcelain",
  },
  {
    name: "Decorative Designs",
    slug: "decorative",
    image: "/images/categories/decoration-category.jpeg",
    description: "Evo Dry Technology collections",
  },
  {
    name: "Wood Look",
    slug: "woodlook",
    image: "/images/categories/woodlook-category.jpeg",
    description: "Wood look porcelain tiles and slabs",
  },
];

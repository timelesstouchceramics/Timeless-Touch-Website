import { Collection } from "./types";

/**
 * Centralized product categories data.
 * This is the single source of truth for product categories used across the application.
 *
 * Categories are organized in the following order:
 * Slabs → Tiles → Marble Look → Swimming Pool Tiles → Stone Look → Modern Look → Wood Look → Decorative
 */
export const productCategories: Collection[] = [
  {
    name: "Slabs",
    slug: "slabs",
    type: "mainCategory",
    image: "/images/categories/slabs-category.jpeg",
    description: "Large format porcelain slabs",
  },
  {
    name: "Tiles",
    slug: "tiles",
    type: "mainCategory",
    image: "/images/categories/tiles-category.jpeg",
    description: "Wood Look and Standard Tiles",
  },
  {
    name: "Marble Look Collection",
    slug: "marble-look",
    type: "designStyle",
    image: "/images/categories/marblelook-category.jpeg",
    description: "Black Collection, Luxury Range, Classic Marbles",
  },
  {
    name: "Swimming Pool Tiles",
    slug: "pool-tiles",
    type: "mainCategory",
    image: "/images/categories/pooltile-category.jpeg",
    description: "Starwave Series - Crystalline Glazed Porcelain",
  },
  {
    name: "Stone Look Collection",
    slug: "stone-look",
    type: "designStyle",
    image: "/images/categories/stonelook-category.jpeg",
    description: "Travertine, Rockstone, and Ceppo series",
  },
  {
    name: "Modern Look Collection",
    slug: "modern-look",
    type: "designStyle",
    image: "/images/categories/modernlook-category.jpeg",
    description: "Emerald, Monocolor, Tattoo, and Concept series",
  },
  {
    name: "Wood Look Collection",
    slug: "wood-look",
    type: "designStyle",
    image: "/images/categories/woodlook-category.jpeg",
    description: "Wood look porcelain tiles and slabs",
  },
  {
    name: "Decorative Designs",
    slug: "decorative",
    type: "designStyle",
    image: "/images/categories/decoration-category.jpeg",
    description: "Evo Dry Technology collections",
  },
];

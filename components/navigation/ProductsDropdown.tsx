"use client";

import NavigationDropdown, { Category } from "./NavigationDropdown";

interface ProductsDropdownProps {
  navLinksRef: React.RefObject<HTMLDivElement | null>;
}

const productCategories: Category[] = [
  {
    name: "Stone Look Collection",
    slug: "stone-look",
    image:
      "/images/Exotic-Travertine-Ivory-Stripe-qxti2zc4r56gc8v6pnujh77ae4t684kdfhln9no0w0.jpg",
    description: "Travertine, Rockstone, and Ceppo series",
  },
  {
    name: "Marble Look Collection",
    slug: "marble-look",
    image: "/images/blac-marquina-1.jpg",
    description: "Black Collection, Luxury Range, Classic Marbles",
  },
  {
    name: "Modern Look Collection",
    slug: "modern-look",
    image: "/images/concept-light-gray-.jpg",
    description: "Emerald, Monocolor, Tattoo, and Concept series",
  },
  {
    name: "Decorative Designs",
    slug: "decorative",
    image: "/images/slider-lava-blue.jpg",
    description: "Evo Dry Technology collections",
  },
  {
    name: "Tiles",
    slug: "tiles",
    image: "/images/cottage-tile.jpg",
    description: "Wood Look and Standard Tiles",
  },
  {
    name: "Swimming Pool Tiles",
    slug: "pool",
    image: "/images/lava-blue.jpg",
    description: "Starwave Series - Crystalline Glazed Porcelain",
  },
];

export default function ProductsDropdown({
  navLinksRef,
}: ProductsDropdownProps) {
  return (
    <NavigationDropdown
      navLinksRef={navLinksRef}
      href="/products"
      label="PRODUCTS"
      categories={productCategories}
      queryParam="categories"
      viewAllText="View All Products →"
    />
  );
}

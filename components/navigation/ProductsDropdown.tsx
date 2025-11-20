"use client";

import NavigationDropdown from "./NavigationDropdown";
import { productCategories } from "@/lib/product-categories";

interface ProductsDropdownProps {
  navLinksRef: React.RefObject<HTMLDivElement | null>;
}

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

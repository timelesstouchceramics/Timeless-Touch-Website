"use client";

import NavigationDropdown from "./NavigationDropdown";
import { Collection } from "@/lib/types";

interface ProductsDropdownProps {
  navLinksRef: React.RefObject<HTMLDivElement | null>;
  collections: Collection[];
}

export default function ProductsDropdown({
  navLinksRef,
  collections,
}: ProductsDropdownProps) {
  return (
    <NavigationDropdown
      navLinksRef={navLinksRef}
      href="/products"
      label="PRODUCTS"
      categories={collections}
      queryParam="categories"
      viewAllText="View All Products →"
    />
  );
}

"use client";

import NavigationDropdown from "./NavigationDropdown";
import { catalogues } from "@/lib/catalogues-data";

interface CataloguesDropdownProps {
  navLinksRef: React.RefObject<HTMLDivElement | null>;
}

// Convert catalogues to dropdown format, show only first 4
const catalogueItems = catalogues.slice(0, 4).map((catalogue) => ({
  name: catalogue.title,
  slug: catalogue.slug,
  image: catalogue.thumbnail,
  description: catalogue.fileSize,
}));

export default function CataloguesDropdown({
  navLinksRef,
}: CataloguesDropdownProps) {
  return (
    <NavigationDropdown
      navLinksRef={navLinksRef}
      href="/catalogues"
      label="CATALOGUES"
      categories={catalogueItems}
      viewAllText="View All Catalogues →"
    />
  );
}

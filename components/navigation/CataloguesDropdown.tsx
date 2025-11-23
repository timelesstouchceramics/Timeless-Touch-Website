"use client";

import NavigationDropdown from "./NavigationDropdown";
import { catalogues } from "@/lib/catalogues-data";

interface CataloguesDropdownProps {
  navLinksRef: React.RefObject<HTMLDivElement | null>;
}

// Convert catalogues to dropdown format
const catalogueItems = catalogues.map((catalogue) => ({
  name: catalogue.title,
  slug: catalogue.slug,
  image: catalogue.thumbnail,
  description: catalogue.description || "",
  downloadUrl: catalogue.fileUrl,
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

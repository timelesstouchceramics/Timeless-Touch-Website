"use client";

import NavigationDropdown from "./NavigationDropdown";
import { Catalogue } from "@/lib/types";

interface CataloguesDropdownProps {
  navLinksRef: React.RefObject<HTMLDivElement | null>;
  catalogues: Catalogue[];
}

export default function CataloguesDropdown({
  navLinksRef,
  catalogues,
}: CataloguesDropdownProps) {
  // Convert catalogues to dropdown format
  const catalogueItems = catalogues.map((catalogue) => ({
    name: catalogue.title,
    slug: catalogue.slug,
    image: catalogue.thumbnail,
    description: catalogue.description || "",
    downloadUrl: catalogue.fileUrl,
  }));

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

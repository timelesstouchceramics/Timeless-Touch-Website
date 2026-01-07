import { Metadata } from "next";
import { getCatalogues } from "@/lib/api";
import CataloguesClient from "./catalogues-client";

export const metadata: Metadata = {
  title: "Product Catalogues | Timeless Touch Ceramics",
  description:
    "Browse and download our comprehensive porcelain tile catalogues. Explore our collections including large format slabs, marble look, stone look, and swimming pool tiles.",
  keywords: [
    "porcelain tile catalogue",
    "ceramic catalogue PDF",
    "tile brochure download",
    "slab catalogue",
    "tile collections",
  ],
  openGraph: {
    title: "Product Catalogues | Timeless Touch Ceramics",
    description:
      "Browse and download our comprehensive porcelain tile catalogues featuring all our collections.",
  },
};

export default async function Catalogues() {
  const catalogues = await getCatalogues();

  return <CataloguesClient catalogues={catalogues} />;
}

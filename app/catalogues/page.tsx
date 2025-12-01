import { getCatalogues } from "@/lib/api/products";
import CataloguesClient from "./catalogues-client";

export default async function Catalogues() {
  const catalogues = await getCatalogues();

  return <CataloguesClient catalogues={catalogues} />;
}

import { getCollections, getCatalogues } from "@/lib/api";
import Navigation from "./Navigation";

export default async function NavigationServer() {
  const collections = await getCollections();
  const catalogues = await getCatalogues();

  return <Navigation collections={collections} catalogues={catalogues} />;
}


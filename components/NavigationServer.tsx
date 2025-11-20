import { getCollections } from "@/lib/api/products";
import Navigation from "./Navigation";

export default async function NavigationServer() {
  const collections = await getCollections();

  return <Navigation collections={collections} />;
}


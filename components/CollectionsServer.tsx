import { getCollections } from "@/lib/api/products";
import Collections from "./Collections";

export default async function CollectionsServer() {
  const collections = await getCollections();

  return <Collections collections={collections} />;
}


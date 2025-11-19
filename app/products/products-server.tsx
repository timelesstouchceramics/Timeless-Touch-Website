import { getProducts, getCategories, getFinishes } from "@/lib/api/products";
import ProductsClient from "./products-client";

export default async function ProductsServer() {
  const [products, categories, finishes] = await Promise.all([
    getProducts(),
    getCategories(),
    getFinishes(),
  ]);

  return (
    <ProductsClient
      initialProducts={products}
      categories={categories}
      finishes={finishes}
    />
  );
}

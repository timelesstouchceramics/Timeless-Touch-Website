import {
  getProducts,
  getMainCategories,
  getDesignStyles,
  getFinishes,
  getApplications,
  getSizes,
  getThicknesses,
} from "@/lib/api/products";
import ProductsClient from "./products-client";

export default async function ProductsServer() {
  const [
    products,
    mainCategories,
    designStyles,
    finishes,
    applications,
    sizes,
    thicknesses,
  ] = await Promise.all([
    getProducts(),
    getMainCategories(),
    getDesignStyles(),
    getFinishes(),
    getApplications(),
    getSizes(),
    getThicknesses(),
  ]);

  return (
    <ProductsClient
      initialProducts={products}
      mainCategories={mainCategories}
      designStyles={designStyles}
      finishes={finishes}
      applications={applications}
      sizes={sizes}
      thicknesses={thicknesses}
    />
  );
}

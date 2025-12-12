import {
  getProducts,
  getMainCategories,
  getDesignStyles,
  getFinishes,
  getApplications,
  getSizes,
  getThicknesses,
  getCatalogues,
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
    catalogues,
  ] = await Promise.all([
    getProducts(),
    getMainCategories(),
    getDesignStyles(),
    getFinishes(),
    getApplications(),
    getSizes(),
    getThicknesses(),
    getCatalogues(),
  ]);

  // Extract catalogue slugs for the filter
  const catalogueSlugs = catalogues.map((c) => c.slug);

  return (
    <ProductsClient
      initialProducts={products}
      mainCategories={mainCategories}
      designStyles={designStyles}
      finishes={finishes}
      applications={applications}
      sizes={sizes}
      thicknesses={thicknesses}
      catalogues={catalogueSlugs}
      allCatalogues={catalogues}
    />
  );
}

import { Product, Collection, Catalogue } from "@/lib/types";

const USE_SANITY = process.env.USE_SANITY === "true";

async function getContentfulApi() {
  return await import("./products");
}

async function getSanityApi() {
  return await import("./sanity");
}

export async function getProducts(): Promise<Product[]> {
  if (USE_SANITY) {
    const api = await getSanityApi();
    return api.getProducts();
  }
  const api = await getContentfulApi();
  return api.getProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (USE_SANITY) {
    const api = await getSanityApi();
    return api.getProductBySlug(slug);
  }
  const api = await getContentfulApi();
  return api.getProductBySlug(slug);
}

export async function getMainCategories(): Promise<string[]> {
  if (USE_SANITY) {
    const api = await getSanityApi();
    return api.getMainCategories();
  }
  const api = await getContentfulApi();
  return api.getMainCategories();
}

export async function getDesignStyles(): Promise<string[]> {
  if (USE_SANITY) {
    const api = await getSanityApi();
    return api.getDesignStyles();
  }
  const api = await getContentfulApi();
  return api.getDesignStyles();
}

export async function getFinishes(): Promise<string[]> {
  if (USE_SANITY) {
    const api = await getSanityApi();
    return api.getFinishes();
  }
  const api = await getContentfulApi();
  return api.getFinishes();
}

export async function getApplications(): Promise<string[]> {
  if (USE_SANITY) {
    const api = await getSanityApi();
    return api.getApplications();
  }
  const api = await getContentfulApi();
  return api.getApplications();
}

export async function getSizes(): Promise<string[]> {
  if (USE_SANITY) {
    const api = await getSanityApi();
    return api.getSizes();
  }
  const api = await getContentfulApi();
  return api.getSizes();
}

export async function getThicknesses(): Promise<string[]> {
  if (USE_SANITY) {
    const api = await getSanityApi();
    return api.getThicknesses();
  }
  const api = await getContentfulApi();
  return api.getThicknesses();
}

export async function getFilteredProducts(options?: {
  mainCategories?: string[];
  designStyles?: string[];
  finishes?: string[];
  applications?: string[];
  sizes?: string[];
  thicknesses?: string[];
  bookmatch?: boolean;
  sixFace?: boolean;
  fullBody?: boolean;
  sortBy?: string;
  page?: number;
  perPage?: number;
}): Promise<{
  products: Product[];
  total: number;
  mainCategories: string[];
  designStyles: string[];
  finishes: string[];
  applications: string[];
  sizes: string[];
  thicknesses: string[];
}> {
  if (USE_SANITY) {
    const api = await getSanityApi();
    return api.getFilteredProducts(options);
  }
  const api = await getContentfulApi();
  return api.getFilteredProducts(options);
}

export async function getSimilarProducts(
  product: Product,
  limit: number = 3
): Promise<Product[]> {
  if (USE_SANITY) {
    const api = await getSanityApi();
    return api.getSimilarProducts(product, limit);
  }
  const api = await getContentfulApi();
  return api.getSimilarProducts(product, limit);
}

export async function getCollections(): Promise<Collection[]> {
  if (USE_SANITY) {
    const api = await getSanityApi();
    return api.getCollections();
  }
  const api = await getContentfulApi();
  return api.getCollections();
}

export async function getCatalogues(): Promise<Catalogue[]> {
  if (USE_SANITY) {
    const api = await getSanityApi();
    return api.getCatalogues();
  }
  const api = await getContentfulApi();
  return api.getCatalogues();
}

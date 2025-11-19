import { Product } from "@/lib/types";
import { products as staticProducts, categories as staticCategories, finishes as staticFinishes } from "@/lib/products-data";

// Contentful configuration
// TODO: Move to environment variables
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const CONTENTFUL_ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || "master";

// Use Contentful if credentials are available, otherwise fallback to static data
const USE_CONTENTFUL = Boolean(CONTENTFUL_SPACE_ID && CONTENTFUL_ACCESS_TOKEN);

interface ContentfulAsset {
  fields: {
    file: {
      url: string;
    };
  };
}

interface ContentfulProductFields {
  name: string;
  slug: string;
  category: string;
  finish: string;
  price: number;
  unit: string;
  images: ContentfulAsset[];
  description?: string;
}

interface ContentfulEntry<T> {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: T;
}

interface ContentfulResponse<T> {
  items: ContentfulEntry<T>[];
  total: number;
}

/**
 * Fetches data from Contentful Delivery API
 */
async function fetchContentful<T>(
  contentType: string,
  query: Record<string, string | number> = {}
): Promise<ContentfulResponse<T>> {
  if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) {
    throw new Error("Contentful credentials not configured");
  }

  const params = new URLSearchParams({
    access_token: CONTENTFUL_ACCESS_TOKEN,
    content_type: contentType,
    ...Object.fromEntries(
      Object.entries(query).map(([k, v]) => [k, String(v)])
    ),
  });

  const response = await fetch(
    `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries?${params}`,
    {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    }
  );

  if (!response.ok) {
    throw new Error(`Contentful API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Transforms Contentful product entry to our Product type
 */
function transformContentfulProduct(
  entry: ContentfulEntry<ContentfulProductFields>,
  index: number
): Product {
  const { fields, sys } = entry;
  return {
    id: index + 1, // Use index as ID since Contentful uses string IDs
    slug: fields.slug,
    name: fields.name,
    category: fields.category,
    finish: fields.finish,
    price: fields.price,
    unit: fields.unit,
    images: fields.images.map((asset) => `https:${asset.fields.file.url}`),
  };
}

/**
 * Fetches all products from the data source.
 * Uses Contentful if configured, otherwise falls back to static data.
 */
export async function getProducts(): Promise<Product[]> {
  if (!USE_CONTENTFUL) {
    return staticProducts;
  }

  try {
    const response = await fetchContentful<ContentfulProductFields>("product", {
      order: "-sys.createdAt",
      limit: 100,
    });

    return response.items.map(transformContentfulProduct);
  } catch (error) {
    console.error("Failed to fetch from Contentful:", error);
    // Fallback to static data on error
    return staticProducts;
  }
}

/**
 * Fetches a single product by slug.
 *
 * @param slug - The product slug
 * @returns The product or null if not found
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!USE_CONTENTFUL) {
    const product = staticProducts.find((p) => p.slug === slug);
    return product || null;
  }

  try {
    const response = await fetchContentful<ContentfulProductFields>("product", {
      "fields.slug": slug,
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    return transformContentfulProduct(response.items[0], 0);
  } catch (error) {
    console.error("Failed to fetch product from Contentful:", error);
    // Fallback to static data on error
    const product = staticProducts.find((p) => p.slug === slug);
    return product || null;
  }
}

/**
 * Fetches all available categories.
 * In Contentful, these could be stored as a separate content type or derived from products.
 */
export async function getCategories(): Promise<string[]> {
  if (!USE_CONTENTFUL) {
    return staticCategories;
  }

  try {
    // Option 1: Fetch from a dedicated "category" content type
    // const response = await fetchContentful<{ name: string }>("category");
    // return response.items.map((item) => item.fields.name);

    // Option 2: Derive from products (current approach)
    const products = await getProducts();
    const categories = [...new Set(products.map((p) => p.category))];
    return categories.sort();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return staticCategories;
  }
}

/**
 * Fetches all available finishes.
 */
export async function getFinishes(): Promise<string[]> {
  if (!USE_CONTENTFUL) {
    return staticFinishes;
  }

  try {
    // Derive from products
    const products = await getProducts();
    const finishes = [...new Set(products.map((p) => p.finish))];
    return finishes.sort();
  } catch (error) {
    console.error("Failed to fetch finishes:", error);
    return staticFinishes;
  }
}

/**
 * Fetches products with optional filters.
 * Server-side filtering for better performance with large catalogs.
 *
 * @param options - Filter and sort options
 */
export async function getFilteredProducts(options?: {
  categories?: string[];
  finishes?: string[];
  sortBy?: string;
  page?: number;
  perPage?: number;
}): Promise<{
  products: Product[];
  total: number;
  categories: string[];
  finishes: string[];
}> {
  // For Contentful, we could build a query with filters
  // Currently fetching all and filtering client-side for simplicity
  // TODO: Optimize with Contentful query parameters for large catalogs

  const allProducts = await getProducts();
  const allCategories = await getCategories();
  const allFinishes = await getFinishes();

  let filtered = [...allProducts];

  // Apply category filter
  if (options?.categories && options.categories.length > 0) {
    filtered = filtered.filter((p) => options.categories!.includes(p.category));
  }

  // Apply finish filter
  if (options?.finishes && options.finishes.length > 0) {
    filtered = filtered.filter((p) => options.finishes!.includes(p.finish));
  }

  // Apply sorting
  if (options?.sortBy) {
    filtered.sort((a, b) => {
      switch (options.sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });
  }

  const total = filtered.length;

  // Apply pagination
  if (options?.page && options?.perPage) {
    const startIndex = (options.page - 1) * options.perPage;
    filtered = filtered.slice(startIndex, startIndex + options.perPage);
  }

  return {
    products: filtered,
    total,
    categories: allCategories,
    finishes: allFinishes,
  };
}

/**
 * Fetches similar products based on category.
 *
 * @param product - The current product
 * @param limit - Maximum number of similar products to return
 */
export async function getSimilarProducts(
  product: Product,
  limit: number = 3
): Promise<Product[]> {
  if (!USE_CONTENTFUL) {
    return staticProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, limit);
  }

  try {
    const response = await fetchContentful<ContentfulProductFields>("product", {
      "fields.category": product.category,
      "fields.slug[ne]": product.slug,
      limit,
    });

    return response.items.map(transformContentfulProduct);
  } catch (error) {
    console.error("Failed to fetch similar products:", error);
    return staticProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, limit);
  }
}

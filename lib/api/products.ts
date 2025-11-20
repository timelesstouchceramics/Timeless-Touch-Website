import { Product } from "@/lib/types";
import {
  products as staticProducts,
  mainCategories as staticMainCategories,
  designStyles as staticDesignStyles,
  finishes as staticFinishes,
  applications as staticApplications,
  sizes as staticSizes,
  thicknesses as staticThicknesses,
} from "@/lib/products-data";

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
  mainCategory: string;
  designStyle: string;
  finish: string;
  price: number;
  unit: string;
  images: ContentfulAsset[];
  description?: string;
  code?: string;
  size?: string;
  thickness?: string;
  bookmatch?: boolean;
  sixFace?: boolean;
  fullBody?: boolean;
  applications?: string[];
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
 * Generates a numeric ID from Contentful's string ID
 * Uses a simple hash function to convert the string ID to a number
 */
function generateNumericId(contentfulId: string): number {
  let hash = 0;
  for (let i = 0; i < contentfulId.length; i++) {
    const char = contentfulId.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Transforms Contentful product entry to our Product type
 */
function transformContentfulProduct(
  entry: ContentfulEntry<ContentfulProductFields>
): Product {
  const { fields, sys } = entry;
  return {
    id: generateNumericId(sys.id), // Generate stable numeric ID from Contentful ID
    slug: fields.slug,
    name: fields.name,
    mainCategory: fields.mainCategory,
    designStyle: fields.designStyle,
    finish: fields.finish,
    price: fields.price,
    unit: fields.unit,
    images: fields.images.map((asset) => `https:${asset.fields.file.url}`),
    code: fields.code,
    size: fields.size,
    thickness: fields.thickness,
    bookmatch: fields.bookmatch ?? false,
    sixFace: fields.sixFace ?? false,
    fullBody: fields.fullBody ?? false,
    applications: fields.applications,
    description: fields.description,
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

    return response.items.map((item) => transformContentfulProduct(item));
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

    return transformContentfulProduct(response.items[0]);
  } catch (error) {
    console.error("Failed to fetch product from Contentful:", error);
    // Fallback to static data on error
    const product = staticProducts.find((p) => p.slug === slug);
    return product || null;
  }
}

/**
 * Fetches all available main categories.
 * In Contentful, these could be stored as a separate content type or derived from products.
 */
export async function getMainCategories(): Promise<string[]> {
  if (!USE_CONTENTFUL) {
    return staticMainCategories;
  }

  try {
    // Derive from products
    const products = await getProducts();
    const mainCategories = [...new Set(products.map((p) => p.mainCategory))];
    return mainCategories.sort();
  } catch (error) {
    console.error("Failed to fetch main categories:", error);
    return staticMainCategories;
  }
}

/**
 * Fetches all available design styles.
 */
export async function getDesignStyles(): Promise<string[]> {
  if (!USE_CONTENTFUL) {
    return staticDesignStyles;
  }

  try {
    // Derive from products
    const products = await getProducts();
    const designStyles = [...new Set(products.map((p) => p.designStyle))];
    return designStyles.sort();
  } catch (error) {
    console.error("Failed to fetch design styles:", error);
    return staticDesignStyles;
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
 * Fetches all available applications.
 */
export async function getApplications(): Promise<string[]> {
  if (!USE_CONTENTFUL) {
    return staticApplications;
  }

  try {
    // Derive from products
    const products = await getProducts();
    const applications = [
      ...new Set(products.flatMap((p) => p.applications || [])),
    ];
    return applications.sort();
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return staticApplications;
  }
}

/**
 * Fetches all available sizes.
 */
export async function getSizes(): Promise<string[]> {
  if (!USE_CONTENTFUL) {
    return staticSizes;
  }

  try {
    // Derive from products
    const products = await getProducts();
    const sizes = [
      ...new Set(products.map((p) => p.size).filter((s): s is string => !!s)),
    ];
    return sizes.sort();
  } catch (error) {
    console.error("Failed to fetch sizes:", error);
    return staticSizes;
  }
}

/**
 * Fetches all available thicknesses.
 */
export async function getThicknesses(): Promise<string[]> {
  if (!USE_CONTENTFUL) {
    return staticThicknesses;
  }

  try {
    // Derive from products
    const products = await getProducts();
    const thicknesses = [
      ...new Set(
        products.map((p) => p.thickness).filter((t): t is string => !!t)
      ),
    ];
    return thicknesses.sort();
  } catch (error) {
    console.error("Failed to fetch thicknesses:", error);
    return staticThicknesses;
  }
}

/**
 * Fetches products with optional filters.
 * Server-side filtering for better performance with large catalogs.
 *
 * @param options - Filter and sort options
 */
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
  // For Contentful, we could build a query with filters
  // Currently fetching all and filtering client-side for simplicity
  // TODO: Optimize with Contentful query parameters for large catalogs

  const allProducts = await getProducts();
  const allMainCategories = await getMainCategories();
  const allDesignStyles = await getDesignStyles();
  const allFinishes = await getFinishes();
  const allApplications = await getApplications();
  const allSizes = await getSizes();
  const allThicknesses = await getThicknesses();

  let filtered = [...allProducts];

  // Apply main category filter
  if (options?.mainCategories && options.mainCategories.length > 0) {
    filtered = filtered.filter((p) =>
      options.mainCategories!.includes(p.mainCategory)
    );
  }

  // Apply design style filter
  if (options?.designStyles && options.designStyles.length > 0) {
    filtered = filtered.filter((p) =>
      options.designStyles!.includes(p.designStyle)
    );
  }

  // Apply finish filter
  if (options?.finishes && options.finishes.length > 0) {
    filtered = filtered.filter((p) => options.finishes!.includes(p.finish));
  }

  // Apply applications filter
  if (options?.applications && options.applications.length > 0) {
    filtered = filtered.filter(
      (p) =>
        p.applications &&
        p.applications.some((app) => options.applications!.includes(app))
    );
  }

  // Apply size filter
  if (options?.sizes && options.sizes.length > 0) {
    filtered = filtered.filter(
      (p) => p.size && options.sizes!.includes(p.size)
    );
  }

  // Apply thickness filter
  if (options?.thicknesses && options.thicknesses.length > 0) {
    filtered = filtered.filter(
      (p) => p.thickness && options.thicknesses!.includes(p.thickness)
    );
  }

  // Apply special features filters
  if (options?.bookmatch === true) {
    filtered = filtered.filter((p) => p.bookmatch === true);
  }

  if (options?.sixFace === true) {
    filtered = filtered.filter((p) => p.sixFace === true);
  }

  if (options?.fullBody === true) {
    filtered = filtered.filter((p) => p.fullBody === true);
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
    mainCategories: allMainCategories,
    designStyles: allDesignStyles,
    finishes: allFinishes,
    applications: allApplications,
    sizes: allSizes,
    thicknesses: allThicknesses,
  };
}

/**
 * Fetches similar products based on design style and main category.
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
      .filter(
        (p) =>
          (p.designStyle === product.designStyle ||
            p.mainCategory === product.mainCategory) &&
          p.id !== product.id
      )
      .slice(0, limit);
  }

  try {
    const response = await fetchContentful<ContentfulProductFields>("product", {
      "fields.designStyle": product.designStyle,
      "fields.slug[ne]": product.slug,
      limit,
    });

    return response.items.map((item) => transformContentfulProduct(item));
  } catch (error) {
    console.error("Failed to fetch similar products:", error);
    return staticProducts
      .filter(
        (p) =>
          (p.designStyle === product.designStyle ||
            p.mainCategory === product.mainCategory) &&
          p.id !== product.id
      )
      .slice(0, limit);
  }
}

import { Product, Collection, Catalogue } from "@/lib/types";
// Dynamic import for static data - only loaded server-side when needed
// This prevents the data from being bundled into client JavaScript
async function getStaticData() {
  const {
    products,
    mainCategories,
    designStyles,
    finishes,
    applications,
    sizes,
    thicknesses,
  } = await import("@/lib/products-data");
  return {
    products,
    mainCategories,
    designStyles,
    finishes,
    applications,
    sizes,
    thicknesses,
  };
}

async function getStaticCollections() {
  const { productCategories } = await import("@/lib/product-categories");
  return productCategories;
}

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
  mainCategory: any; // Reference - will be resolved from includes
  designStyle: any; // Reference - will be resolved from includes
  finish: any; // Reference - will be resolved from includes
  price: number;
  unit: string;
  images: ContentfulAsset[];
  description?: string;
  code?: string;
  sizes?: any[]; // References - will be resolved from includes
  thickness?: any; // Reference - will be resolved from includes
  bookmatch?: boolean;
  sixFace?: boolean;
  fullBody?: boolean;
  applications?: any[]; // References - will be resolved from includes
}

interface ContentfulCollectionFields {
  name: string;
  slug: string;
  type: string;
  mainCategory?: any; // Reference - will be resolved from includes
  designStyle?: any; // Reference - will be resolved from includes
  image?: ContentfulAsset;
  description?: any; // RichText
}

interface ContentfulCatalogueFields {
  title: string;
  slug: string;
  thumbnail?: any; // Reference to Asset - will be resolved from includes
  fileUrl?: any; // Reference to Asset - will be resolved from includes
  fileSize?: string;
  description?: string;
}

interface ContentfulEntry<T> {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: T;
}

interface ContentfulIncludes {
  Entry?: Array<{
    sys: { id: string; contentType?: { sys: { id: string } } };
    fields: Record<string, any>;
  }>;
  Asset?: Array<{
    sys: { id: string };
    fields: Record<string, any>;
  }>;
}

interface ContentfulResponse<T> {
  items: ContentfulEntry<T>[];
  total: number;
  includes?: ContentfulIncludes;
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
    include: "2", // Include references up to 2 levels deep
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
 * Resolves a Contentful reference from the includes array
 */
function resolveReference(
  reference: any,
  includes: ContentfulIncludes | undefined
): any {
  if (!reference) {
    return null;
  }

  // If it's already an object with fields, it might be expanded
  if (reference.fields && typeof reference.fields === "object") {
    return reference;
  }

  // If it's a Link object, find it in includes
  if (reference.sys?.id) {
    const refId = reference.sys.id;

    // Check Entry includes
    if (includes?.Entry) {
      const resolved = includes.Entry.find((entry) => entry.sys.id === refId);
      if (resolved) return resolved;
    }

    // Check Asset includes (for images)
    if (includes?.Asset) {
      const resolved = includes.Asset.find((asset) => asset.sys.id === refId);
      if (resolved) return resolved;
    }
  }

  return null;
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
 * Generates a URL-friendly slug from a product name
 * Converts to lowercase, replaces spaces with hyphens, removes special characters
 */
function generateSlugFromName(name: string): string {
  if (!name) return "";

  return (
    name
      .toLowerCase()
      .trim()
      // Replace spaces and underscores with hyphens
      .replace(/[\s_]+/g, "-")
      // Remove special characters except hyphens
      .replace(/[^a-z0-9-]/g, "")
      // Replace multiple consecutive hyphens with a single hyphen
      .replace(/-+/g, "-")
      // Remove leading and trailing hyphens
      .replace(/^-+|-+$/g, "")
  );
}

/**
 * Extracts plain text from Contentful RichText field
 */
function extractTextFromRichText(richText: any): string {
  if (!richText) return "";

  if (typeof richText === "string") {
    return richText;
  }

  if (typeof richText !== "object" || richText === null) {
    return "";
  }

  try {
    const extractText = (node: any): string => {
      if (!node || typeof node !== "object") return "";

      // If it's a text node, return its value
      if (node.nodeType === "text" && node.value) {
        return String(node.value);
      }

      // If it has content array, recursively extract from it
      if (node.content && Array.isArray(node.content)) {
        return node.content.map(extractText).join("");
      }

      return "";
    };

    // Handle RichText document structure
    if (richText.nodeType === "document" && richText.content) {
      return extractText(richText);
    } else if (richText.content) {
      return extractText(richText);
    } else {
      // Try to extract directly
      return extractText(richText);
    }
  } catch (error) {
    console.error("Error extracting text from RichText:", error);
    return "";
  }
}

/**
 * Transforms Contentful product entry to our Product type
 */
function transformContentfulProduct(
  entry: ContentfulEntry<ContentfulProductFields>,
  includes?: ContentfulIncludes
): Product {
  const { fields, sys } = entry;

  // Resolve references
  const mainCategoryRef = resolveReference(fields.mainCategory, includes);
  const designStyleRef = resolveReference(fields.designStyle, includes);
  const finishRef = resolveReference(fields.finish, includes);
  const thicknessRef = resolveReference(fields.thickness, includes);

  // Resolve applications array
  const applicationsRefs = Array.isArray(fields.applications)
    ? fields.applications
        .map((app) => resolveReference(app, includes))
        .filter(Boolean)
    : [];

  // Resolve sizes array
  const sizesRefs = Array.isArray(fields.sizes)
    ? fields.sizes
        .map((size) => resolveReference(size, includes))
        .filter(Boolean)
    : [];

  // Resolve images array
  const images = Array.isArray(fields.images)
    ? fields.images
        .map((asset) => {
          // Resolve asset if it's a reference
          const assetRef = resolveReference(asset, includes);
          const resolvedAsset = assetRef || asset;
          const fileUrl = resolvedAsset?.fields?.file?.url;
          return fileUrl ? `https:${fileUrl}` : null;
        })
        .filter(
          (url): url is string => typeof url === "string" && url.length > 0
        )
    : [];

  // Generate slug from name if slug is missing
  const slug = fields.slug || generateSlugFromName(fields.name);

  return {
    id: generateNumericId(sys.id), // Generate stable numeric ID from Contentful ID
    slug,
    name: fields.name,
    mainCategory: mainCategoryRef?.fields?.slug || "",
    designStyle: designStyleRef?.fields?.slug || "",
    finish: finishRef?.fields?.slug || "",
    price: fields.price,
    unit: fields.unit,
    images,
    code: fields.code,
    sizes: sizesRefs.map((size) => size.fields?.slug || "").filter(Boolean),
    thickness: thicknessRef?.fields?.slug,
    bookmatch: fields.bookmatch ?? false,
    sixFace: fields.sixFace ?? false,
    fullBody: fields.fullBody ?? false,
    applications: applicationsRefs
      .map((app) => app.fields?.name || "")
      .filter(Boolean),
    description: extractTextFromRichText(fields.description),
  };
}

/**
 * Fetches all products from the data source.
 * Uses Contentful if configured, otherwise falls back to static data.
 */
export async function getProducts(): Promise<Product[]> {
  if (!USE_CONTENTFUL) {
    const { products } = await getStaticData();
    return products;
  }

  try {
    const response = await fetchContentful<ContentfulProductFields>("product", {
      order: "-sys.createdAt",
      limit: 100,
    });

    return response.items.map((item) =>
      transformContentfulProduct(item, response.includes)
    );
  } catch (error) {
    console.error("Failed to fetch from Contentful:", error);
    // Fallback to static data on error
    const { products } = await getStaticData();
    return products;
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
    const { products } = await getStaticData();
    const product = products.find((p) => p.slug === slug);
    return product || null;
  }

  try {
    // First try to find by slug field
    const response = await fetchContentful<ContentfulProductFields>("product", {
      "fields.slug": slug,
      limit: 1,
    });

    // If not found by slug, try to find by searching all products and matching generated slugs
    // This handles cases where products don't have slugs in Contentful
    if (response.items.length === 0) {
      const allProductsResponse =
        await fetchContentful<ContentfulProductFields>("product", {
          limit: 1000, // Get all products to search locally by generated slug
        });

      const allProducts = allProductsResponse.items.map((item) =>
        transformContentfulProduct(item, allProductsResponse.includes)
      );

      const product = allProducts.find((p) => p.slug === slug);
      return product || null;
    }

    return transformContentfulProduct(response.items[0], response.includes);
  } catch (error) {
    console.error("Failed to fetch product from Contentful:", error);
    // Fallback to static data on error
    const { products } = await getStaticData();
    const product = products.find((p) => p.slug === slug);
    return product || null;
  }
}

/**
 * Fetches all available main categories.
 * In Contentful, these could be stored as a separate content type or derived from products.
 */
export async function getMainCategories(): Promise<string[]> {
  if (!USE_CONTENTFUL) {
    const { mainCategories } = await getStaticData();
    return mainCategories;
  }

  try {
    // Derive from products
    const products = await getProducts();
    const mainCategories = [
      ...new Set(products.map((p) => p.mainCategory).filter(Boolean)),
    ];
    return mainCategories.sort();
  } catch (error) {
    console.error("Failed to fetch main categories:", error);
    const { mainCategories } = await getStaticData();
    return mainCategories;
  }
}

/**
 * Fetches all available design styles.
 */
export async function getDesignStyles(): Promise<string[]> {
  if (!USE_CONTENTFUL) {
    const { designStyles } = await getStaticData();
    return designStyles;
  }

  try {
    // Derive from products
    const products = await getProducts();
    const designStyles = [
      ...new Set(products.map((p) => p.designStyle).filter(Boolean)),
    ];
    return designStyles.sort();
  } catch (error) {
    console.error("Failed to fetch design styles:", error);
    const { designStyles } = await getStaticData();
    return designStyles;
  }
}

/**
 * Fetches all available finishes.
 */
export async function getFinishes(): Promise<string[]> {
  if (!USE_CONTENTFUL) {
    const { finishes } = await getStaticData();
    return finishes;
  }

  try {
    // Derive from products
    const products = await getProducts();
    const finishes = [
      ...new Set(products.map((p) => p.finish).filter(Boolean)),
    ];
    return finishes.sort();
  } catch (error) {
    console.error("Failed to fetch finishes:", error);
    const { finishes } = await getStaticData();
    return finishes;
  }
}

/**
 * Fetches all available applications.
 */
export async function getApplications(): Promise<string[]> {
  if (!USE_CONTENTFUL) {
    const { applications } = await getStaticData();
    return applications;
  }

  try {
    // Derive from products
    const products = await getProducts();
    const applications = [
      ...new Set(products.flatMap((p) => p.applications || []).filter(Boolean)),
    ];
    return applications.sort();
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    const { applications } = await getStaticData();
    return applications;
  }
}

/**
 * Fetches all available sizes.
 */
export async function getSizes(): Promise<string[]> {
  if (!USE_CONTENTFUL) {
    const { sizes } = await getStaticData();
    return sizes;
  }

  try {
    // Derive from products
    const products = await getProducts();
    const sizes = [
      ...new Set(
        products
          .flatMap((p) => p.sizes || [])
          .filter((s): s is string => !!s && s !== "")
      ),
    ];
    return sizes.sort();
  } catch (error) {
    console.error("Failed to fetch sizes:", error);
    const { sizes } = await getStaticData();
    return sizes;
  }
}

/**
 * Fetches all available thicknesses.
 */
export async function getThicknesses(): Promise<string[]> {
  if (!USE_CONTENTFUL) {
    const { thicknesses } = await getStaticData();
    return thicknesses;
  }

  try {
    // Derive from products
    const products = await getProducts();
    const thicknesses = [
      ...new Set(
        products
          .map((p) => p.thickness)
          .filter((t): t is string => !!t && t !== "")
      ),
    ];
    return thicknesses.sort();
  } catch (error) {
    console.error("Failed to fetch thicknesses:", error);
    const { thicknesses } = await getStaticData();
    return thicknesses;
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

  // Apply sizes filter
  if (options?.sizes && options.sizes.length > 0) {
    filtered = filtered.filter(
      (p) =>
        p.sizes &&
        p.sizes.length > 0 &&
        p.sizes.some((size) => options.sizes!.includes(size))
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
    const { products } = await getStaticData();
    return products
      .filter(
        (p: Product) =>
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

    return response.items.map((item) =>
      transformContentfulProduct(item, response.includes)
    );
  } catch (error) {
    console.error("Failed to fetch similar products:", error);
    const { products } = await getStaticData();
    return products
      .filter(
        (p: Product) =>
          (p.designStyle === product.designStyle ||
            p.mainCategory === product.mainCategory) &&
          p.id !== product.id
      )
      .slice(0, limit);
  }
}

/**
 * Transforms Contentful collection entry to our Collection type
 */
function transformContentfulCollection(
  entry: ContentfulEntry<ContentfulCollectionFields>,
  includes?: ContentfulIncludes
): Collection {
  const { fields } = entry;

  // Resolve image if present
  let imageUrl = "";
  if (fields.image) {
    const imageRef = resolveReference(fields.image, includes);
    const resolvedImage = imageRef || fields.image;
    const fileUrl = resolvedImage?.fields?.file?.url;
    if (fileUrl) {
      imageUrl = `https:${fileUrl}`;
    }
  }

  // Fallback to local image if Contentful image is not available
  // Map slug to local image path
  const imageMap: Record<string, string> = {
    slabs: "/images/categories/slabs-category.jpeg",
    tiles: "/images/categories/tiles-category.jpeg",
    "pool-tiles": "/images/categories/pooltile-category.jpeg",
    "marble-look": "/images/categories/marblelook-category.jpeg",
    "stone-look": "/images/categories/stonelook-category.jpeg",
    "modern-look": "/images/categories/modernlook-category.jpeg",
    "wood-look": "/images/categories/woodlook-category.jpeg",
    decorative: "/images/categories/decoration-category.jpeg",
  };

  if (!imageUrl && imageMap[fields.slug]) {
    imageUrl = imageMap[fields.slug];
  }

  // Extract description from RichText
  let description = "";
  try {
    if (fields.description) {
      if (typeof fields.description === "string") {
        description = fields.description;
      } else if (
        typeof fields.description === "object" &&
        fields.description !== null
      ) {
        // Extract text from RichText document
        const extractText = (node: any): string => {
          if (!node || typeof node !== "object") return "";

          // If it's a text node, return its value
          if (node.nodeType === "text" && node.value) {
            return String(node.value);
          }

          // If it has content array, recursively extract from it
          if (node.content && Array.isArray(node.content)) {
            return node.content.map(extractText).join("");
          }

          return "";
        };

        // Handle RichText document structure
        if (
          fields.description.nodeType === "document" &&
          fields.description.content
        ) {
          description = extractText(fields.description);
        } else if (fields.description.content) {
          description = extractText(fields.description);
        } else {
          // Try to extract directly
          description = extractText(fields.description);
        }
      }
    }
  } catch (error) {
    console.error("Error extracting description from RichText:", error);
    description = "";
  }

  // Ensure description is always a string (fallback)
  if (typeof description !== "string") {
    description = "";
  }

  return {
    name: fields.name,
    slug: fields.slug,
    type: fields.type as "mainCategory" | "designStyle",
    image: imageUrl,
    description,
  };
}

/**
 * Organizes collections by predefined order.
 * Order: Slabs → Tiles → Marble Look → Swimming Pool Tiles → Stone Look → Modern Look → Wood Look → Decorative
 */
function organizeCollections(collections: Collection[]): Collection[] {
  // Define the unified order (mixed main categories and design styles)
  const unifiedOrder = [
    "slabs",           // Main Category
    "tiles",           // Main Category
    "marble-look",     // Design Style
    "pool-tiles",      // Main Category
    "stone-look",      // Design Style
    "modern-look",     // Design Style
    "wood-look",       // Design Style
    "decorative",      // Design Style
  ];

  // Sort all collections by the unified order
  return collections.sort((a, b) => {
    const indexA = unifiedOrder.indexOf(a.slug);
    const indexB = unifiedOrder.indexOf(b.slug);
    // If slug not in order array, put it at the end
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
}

/**
 * Fetches all collections from the data source.
 * Uses Contentful if configured, otherwise falls back to static data.
 * Collections are organized: Slabs → Tiles → Marble Look → Swimming Pool Tiles → Stone Look → Modern Look → Wood Look → Decorative.
 */
export async function getCollections(): Promise<Collection[]> {
  if (!USE_CONTENTFUL) {
    return await getStaticCollections();
  }

  try {
    const response = await fetchContentful<ContentfulCollectionFields>(
      "collection",
      {
        order: "-sys.createdAt",
        limit: 100,
      }
    );

    const collections = response.items.map((item) =>
      transformContentfulCollection(item, response.includes)
    );

    // Organize collections by type and predefined order
    return organizeCollections(collections);
  } catch (error) {
    console.error("Failed to fetch collections from Contentful:", error);
    // Fallback to static data on error
    return await getStaticCollections();
  }
}

/**
 * Transforms Contentful catalogue entry to our Catalogue type
 */
function transformContentfulCatalogue(
  entry: ContentfulEntry<ContentfulCatalogueFields>,
  includes?: ContentfulIncludes
): Catalogue {
  const { fields } = entry;

  // Resolve thumbnail asset
  let thumbnailUrl = "";
  if (fields.thumbnail) {
    const thumbnailRef = resolveReference(fields.thumbnail, includes);
    const resolvedThumbnail = thumbnailRef || fields.thumbnail;
    const fileUrl = resolvedThumbnail?.fields?.file?.url;
    if (fileUrl) {
      thumbnailUrl = `https:${fileUrl}`;
    }
  }

  // Resolve PDF asset
  let pdfUrl = "";
  if (fields.fileUrl) {
    const pdfRef = resolveReference(fields.fileUrl, includes);
    const resolvedPdf = pdfRef || fields.fileUrl;
    const fileUrl = resolvedPdf?.fields?.file?.url;
    if (fileUrl) {
      pdfUrl = `https:${fileUrl}`;
    }
  }

  // Get description from Contentful
  const description = fields.description || "";

  return {
    title: fields.title,
    slug: fields.slug,
    thumbnail: thumbnailUrl,
    fileUrl: pdfUrl,
    fileSize: fields.fileSize,
    description,
  };
}

/**
 * Fetches all catalogues from the data source.
 * Uses Contentful if configured, otherwise returns empty array.
 */
export async function getCatalogues(): Promise<Catalogue[]> {
  if (!USE_CONTENTFUL) {
    // No local fallback - catalogues are managed in Contentful
    console.warn("Contentful not configured - returning empty catalogues array");
    return [];
  }

  try {
    const response = await fetchContentful<ContentfulCatalogueFields>("catalogue", {
      order: "-sys.createdAt",
      limit: 100,
    });

    const catalogues = response.items.map((item) =>
      transformContentfulCatalogue(item, response.includes)
    );

    return catalogues;
  } catch (error) {
    console.error("Failed to fetch catalogues from Contentful:", error);
    // Return empty array if Contentful fails
    return [];
  }
}

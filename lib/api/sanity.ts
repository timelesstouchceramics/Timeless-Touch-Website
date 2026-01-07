import { Product, Collection, Catalogue } from "@/lib/types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  productsQuery,
  productBySlugQuery,
  collectionsQuery,
  cataloguesQuery,
} from "@/sanity/lib/queries";

interface SanityProduct {
  _id: string;
  name: string;
  slug: string;
  code?: string;
  description?: string;
  price: number;
  unit: string;
  mainCategory: string;
  designStyle: string;
  finish: string;
  applications?: string[];
  sizes?: string[];
  thickness?: string;
  catalogues?: string[];
  bookmatch?: boolean;
  sixFace?: boolean;
  fullBody?: boolean;
  images?: Array<{
    _type: "image";
    asset: {
      _ref: string;
    };
  }>;
}

interface SanityCollection {
  _id: string;
  name: string;
  slug: string;
  type: "mainCategory" | "designStyle";
  mainCategorySlug?: string;
  designStyleSlug?: string;
  image?: {
    _type: "image";
    asset: {
      _ref: string;
    };
  };
  description?: string;
}

interface SanityCatalogue {
  _id: string;
  title: string;
  slug: string;
  thumbnail?: {
    _type: "image";
    asset: {
      _ref: string;
    };
  };
  fileUrl?: string;
  fileSize?: string;
  description?: string;
}

function generateNumericId(sanityId: string): number {
  let hash = 0;
  for (let i = 0; i < sanityId.length; i++) {
    const char = sanityId.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function transformSanityProduct(product: SanityProduct): Product {
  const images = (product.images || [])
    .map((img) => {
      if (img?.asset?._ref) {
        return urlFor(img).url();
      }
      return null;
    })
    .filter((url): url is string => url !== null);

  return {
    id: generateNumericId(product._id),
    slug: product.slug,
    name: product.name,
    mainCategory: product.mainCategory || "",
    designStyle: product.designStyle || "",
    finish: product.finish || "",
    price: product.price,
    unit: product.unit,
    images,
    code: product.code,
    sizes: product.sizes || [],
    thickness: product.thickness,
    bookmatch: product.bookmatch ?? false,
    sixFace: product.sixFace ?? false,
    fullBody: product.fullBody ?? false,
    applications: product.applications || [],
    description: product.description,
    catalogue: product.catalogues || [],
  };
}

function transformSanityCollection(collection: SanityCollection): Collection {
  let imageUrl = "";
  if (collection.image?.asset?._ref) {
    imageUrl = urlFor(collection.image).url();
  }

  return {
    name: collection.name,
    slug: collection.slug,
    type: collection.type,
    image: imageUrl,
    description: collection.description || "",
  };
}

function transformSanityCatalogue(catalogue: SanityCatalogue): Catalogue {
  let thumbnailUrl = "";
  if (catalogue.thumbnail?.asset?._ref) {
    thumbnailUrl = urlFor(catalogue.thumbnail).url();
  }

  return {
    title: catalogue.title,
    slug: catalogue.slug,
    thumbnail: thumbnailUrl,
    fileUrl: catalogue.fileUrl || "",
    fileSize: catalogue.fileSize,
    description: catalogue.description,
  };
}

function organizeCollections(collections: Collection[]): Collection[] {
  const unifiedOrder = [
    "slabs",
    "tiles",
    "marble-look",
    "pool-tiles",
    "stone-look",
    "modern-look",
    "wood-look",
    "decorative",
  ];

  return collections.sort((a, b) => {
    const indexA = unifiedOrder.indexOf(a.slug);
    const indexB = unifiedOrder.indexOf(b.slug);
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
}

export async function getProducts(): Promise<Product[]> {
  try {
    const products: SanityProduct[] = await client.fetch(
      productsQuery,
      {},
      { next: { revalidate: 60 } }
    );

    return products.map(transformSanityProduct);
  } catch (error) {
    console.error("Failed to fetch products from Sanity:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const product: SanityProduct | null = await client.fetch(
      productBySlugQuery,
      { slug },
      { next: { revalidate: 60 } }
    );

    if (!product) return null;

    return transformSanityProduct(product);
  } catch (error) {
    console.error("Failed to fetch product from Sanity:", error);
    return null;
  }
}

export async function getMainCategories(): Promise<string[]> {
  try {
    const products = await getProducts();
    const mainCategories = [
      ...new Set(products.map((p) => p.mainCategory).filter(Boolean)),
    ];
    return mainCategories.sort();
  } catch (error) {
    console.error("Failed to fetch main categories:", error);
    return [];
  }
}

export async function getDesignStyles(): Promise<string[]> {
  try {
    const products = await getProducts();
    const designStyles = [
      ...new Set(products.map((p) => p.designStyle).filter(Boolean)),
    ];
    return designStyles.sort();
  } catch (error) {
    console.error("Failed to fetch design styles:", error);
    return [];
  }
}

export async function getFinishes(): Promise<string[]> {
  try {
    const products = await getProducts();
    const finishes = [
      ...new Set(products.map((p) => p.finish).filter(Boolean)),
    ];
    return finishes.sort();
  } catch (error) {
    console.error("Failed to fetch finishes:", error);
    return [];
  }
}

export async function getApplications(): Promise<string[]> {
  try {
    const products = await getProducts();
    const applications = [
      ...new Set(products.flatMap((p) => p.applications || []).filter(Boolean)),
    ];
    return applications.sort();
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return [];
  }
}

export async function getSizes(): Promise<string[]> {
  try {
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
    return [];
  }
}

export async function getThicknesses(): Promise<string[]> {
  try {
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
    return [];
  }
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
  const allProducts = await getProducts();
  const allMainCategories = await getMainCategories();
  const allDesignStyles = await getDesignStyles();
  const allFinishes = await getFinishes();
  const allApplications = await getApplications();
  const allSizes = await getSizes();
  const allThicknesses = await getThicknesses();

  let filtered = [...allProducts];

  if (options?.mainCategories && options.mainCategories.length > 0) {
    filtered = filtered.filter((p) =>
      options.mainCategories!.includes(p.mainCategory)
    );
  }

  if (options?.designStyles && options.designStyles.length > 0) {
    filtered = filtered.filter((p) =>
      options.designStyles!.includes(p.designStyle)
    );
  }

  if (options?.finishes && options.finishes.length > 0) {
    filtered = filtered.filter((p) => options.finishes!.includes(p.finish));
  }

  if (options?.applications && options.applications.length > 0) {
    filtered = filtered.filter(
      (p) =>
        p.applications &&
        p.applications.some((app) => options.applications!.includes(app))
    );
  }

  if (options?.sizes && options.sizes.length > 0) {
    filtered = filtered.filter(
      (p) =>
        p.sizes &&
        p.sizes.length > 0 &&
        p.sizes.some((size) => options.sizes!.includes(size))
    );
  }

  if (options?.thicknesses && options.thicknesses.length > 0) {
    filtered = filtered.filter(
      (p) => p.thickness && options.thicknesses!.includes(p.thickness)
    );
  }

  if (options?.bookmatch === true) {
    filtered = filtered.filter((p) => p.bookmatch === true);
  }

  if (options?.sixFace === true) {
    filtered = filtered.filter((p) => p.sixFace === true);
  }

  if (options?.fullBody === true) {
    filtered = filtered.filter((p) => p.fullBody === true);
  }

  if (options?.sortBy) {
    filtered.sort((a, b) => {
      switch (options.sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return (a.price || 0) - (b.price || 0);
        case "price-desc":
          return (b.price || 0) - (a.price || 0);
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });
  }

  const total = filtered.length;

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

export async function getSimilarProducts(
  product: Product,
  limit: number = 3
): Promise<Product[]> {
  try {
    const allProducts = await getProducts();
    return allProducts
      .filter(
        (p) =>
          (p.designStyle === product.designStyle ||
            p.mainCategory === product.mainCategory) &&
          p.id !== product.id
      )
      .slice(0, limit);
  } catch (error) {
    console.error("Failed to fetch similar products:", error);
    return [];
  }
}

export async function getCollections(): Promise<Collection[]> {
  try {
    const collections: SanityCollection[] = await client.fetch(
      collectionsQuery,
      {},
      { next: { revalidate: 60 } }
    );

    const transformed = collections.map(transformSanityCollection);
    return organizeCollections(transformed);
  } catch (error) {
    console.error("Failed to fetch collections from Sanity:", error);
    return [];
  }
}

export async function getCatalogues(): Promise<Catalogue[]> {
  try {
    const catalogues: SanityCatalogue[] = await client.fetch(
      cataloguesQuery,
      {},
      { next: { revalidate: 60 } }
    );

    return catalogues.map(transformSanityCatalogue);
  } catch (error) {
    console.error("Failed to fetch catalogues from Sanity:", error);
    return [];
  }
}

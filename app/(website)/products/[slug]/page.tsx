import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/api";
import ProductDetailClient from "./product-detail-client";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Timeless Touch Ceramics",
      description: "The requested product could not be found.",
    };
  }

  const title = `${product.name} | Timeless Touch Ceramics`;
  const description = `${product.name} - ${product.finish} finish ${product.designStyle} porcelain. Premium quality from Timeless Touch Ceramics. ISO 10545 certified.`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.mainCategory,
      product.designStyle,
      product.finish,
      "porcelain tiles",
      "ceramic tiles Dubai",
    ],
    openGraph: {
      title,
      description,
      images: product.images?.[0] ? [{ url: product.images[0] }] : undefined,
    },
  };
}

export default async function ProductDetail({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;

  // Fetch product and all products in parallel
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
  ]);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} allProducts={allProducts} />;
}

import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/api/products";
import ProductDetailClient from "./product-detail-client";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
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

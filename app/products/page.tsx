import { Suspense } from "react";
import ProductsContent from "./products-content";

export default function Products() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

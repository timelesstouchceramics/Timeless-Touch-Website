import { Suspense } from "react";
import ProductsServer from "./products-server";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

function ProductsPageSkeleton() {
  return (
    <div className="bg-neutral-50">
      <section className="section">
        <div className="container">
          {/* Breadcrumb skeleton */}
          <div className="mb-6">
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Page header skeleton */}
          <div className="mb-8">
            <Skeleton className="h-10 w-64 mb-3" />
            <Skeleton className="h-5 w-96" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter sidebar skeleton (desktop) */}
            <div className="hidden lg:block">
              <Card className="border-0">
                <CardContent className="p-0 pr-6">
                  <Skeleton className="h-6 w-20 mb-4" />

                  {/* Category filter skeleton */}
                  <div className="space-y-3 mb-6">
                    <Skeleton className="h-5 w-24" />
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-8 ml-auto" />
                      </div>
                    ))}
                  </div>

                  <Skeleton className="h-px w-full mb-6" />

                  {/* Finish filter skeleton */}
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-16" />
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-8 ml-auto" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products grid skeleton */}
            <div className="lg:col-span-3">
              {/* Controls bar skeleton */}
              <div className="flex items-center justify-between mb-4 gap-4">
                <Skeleton className="h-10 w-24 lg:hidden" />
                <Skeleton className="h-5 w-24 hidden sm:block" />
                <div className="flex items-center gap-2 ml-auto">
                  <Skeleton className="h-5 w-16 hidden sm:block" />
                  <Skeleton className="h-10 w-[180px]" />
                </div>
              </div>

              <Skeleton className="h-5 w-20 sm:hidden mb-4" />

              {/* Product cards skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>

              {/* Pagination skeleton */}
              <div className="flex justify-center items-center gap-2 mt-8">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
              </div>

              <Skeleton className="h-4 w-48 mx-auto mt-4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Products() {
  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsServer />
    </Suspense>
  );
}

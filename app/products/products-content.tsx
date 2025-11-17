"use client";

import { useState, useMemo, useEffect, useCallback, useTransition } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import QuickViewModal from "@/components/QuickViewModal";
import FilterControls from "@/components/products/FilterControls";
import ProductCard from "@/components/products/ProductCard";
import Pagination from "@/components/products/Pagination";
import { products } from "@/lib/products-data";
import { Product, SortOption } from "@/lib/types";

const ITEMS_PER_PAGE = 9;

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // State
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const cats = searchParams.get("categories");
    return cats ? cats.split(",") : [];
  });
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>(() => {
    const fins = searchParams.get("finishes");
    return fins ? fins.split(",") : [];
  });
  const [sortBy, setSortBy] = useState<SortOption>(() => {
    return (searchParams.get("sort") as SortOption) || "name";
  });
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page, 10) : 1;
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [finishOpen, setFinishOpen] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  // URL sync
  const updateURL = useCallback(
    (cats: string[], fins: string[], sort: string, page: number) => {
      const params = new URLSearchParams();
      if (cats.length > 0) params.set("categories", cats.join(","));
      if (fins.length > 0) params.set("finishes", fins.join(","));
      if (sort !== "name") params.set("sort", sort);
      if (page > 1) params.set("page", page.toString());

      const newURL = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.replace(newURL, { scroll: false });
    },
    [pathname, router]
  );

  useEffect(() => {
    updateURL(selectedCategories, selectedFinishes, sortBy, currentPage);
  }, [selectedCategories, selectedFinishes, sortBy, currentPage, updateURL]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedFinishes, sortBy]);

  // Filter counts
  const getCategoryCount = useCallback(
    (category: string) => {
      return products.filter((p) => {
        const matchesCategory = p.category === category;
        const matchesFinish =
          selectedFinishes.length === 0 || selectedFinishes.includes(p.finish);
        return matchesCategory && matchesFinish;
      }).length;
    },
    [selectedFinishes]
  );

  const getFinishCount = useCallback(
    (finish: string) => {
      return products.filter((p) => {
        const matchesFinish = p.finish === finish;
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(p.category);
        return matchesFinish && matchesCategory;
      }).length;
    },
    [selectedCategories]
  );

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedFinishes.length > 0) {
      filtered = filtered.filter((p) => selectedFinishes.includes(p.finish));
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "newest") return b.id - a.id;
      return 0;
    });

    return sorted;
  }, [selectedCategories, selectedFinishes, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Actions
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleFinish = (finish: string) => {
    setSelectedFinishes((prev) =>
      prev.includes(finish)
        ? prev.filter((f) => f !== finish)
        : [...prev, finish]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedFinishes([]);
  };

  const removeCategory = (category: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  };

  const removeFinish = (finish: string) => {
    setSelectedFinishes((prev) => prev.filter((f) => f !== finish));
  };

  const goToPage = (page: number) => {
    startTransition(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const handleQuickView = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  const totalActiveFilters = selectedCategories.length + selectedFinishes.length;

  return (
    <div className="bg-neutral-50">
      <Navigation />

      <section className="section">
        <div className="container">
          <Breadcrumb items={[{ label: "Products" }]} />

          <div className="mb-8">
            <h1 className="title-section">Our Products</h1>
            <p className="text-body">
              Browse our extensive collection of premium tiles and natural stones
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block">
              <Card className="sticky top-24 border-0">
                <CardContent>
                  <CardTitle className="mb-4">Filters</CardTitle>
                  <FilterControls
                    selectedCategories={selectedCategories}
                    selectedFinishes={selectedFinishes}
                    categoryOpen={categoryOpen}
                    finishOpen={finishOpen}
                    onCategoryOpenChange={setCategoryOpen}
                    onFinishOpenChange={setFinishOpen}
                    onToggleCategory={toggleCategory}
                    onToggleFinish={toggleFinish}
                    onClearAll={clearAllFilters}
                    getCategoryCount={getCategoryCount}
                    getFinishCount={getFinishCount}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              {/* Controls Bar */}
              <div className="flex items-center justify-between mb-4 gap-4">
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden relative">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                      {totalActiveFilters > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                          {totalActiveFilters}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full sm:max-w-md">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterControls
                        selectedCategories={selectedCategories}
                        selectedFinishes={selectedFinishes}
                        categoryOpen={categoryOpen}
                        finishOpen={finishOpen}
                        onCategoryOpenChange={setCategoryOpen}
                        onFinishOpenChange={setFinishOpen}
                        onToggleCategory={toggleCategory}
                        onToggleFinish={toggleFinish}
                        onClearAll={clearAllFilters}
                        getCategoryCount={getCategoryCount}
                        getFinishCount={getFinishCount}
                        isMobile
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                <p className="text-body hidden sm:block">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "product" : "products"}
                </p>

                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-neutral-600 hidden sm:block">
                    Sort by:
                  </span>
                  <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <p className="text-body sm:hidden mb-4">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>

              {/* Product Grid */}
              {isPending ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onQuickView={handleQuickView}
                      />
                    ))}
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                  />

                  <p className="text-center text-sm text-neutral-600 mt-4">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of{" "}
                    {filteredProducts.length} products
                  </p>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="text-neutral-400 mb-4">
                    <SlidersHorizontal className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="title-subsection mb-2">No products found</h3>
                  <p className="text-body text-neutral-600 mb-4">
                    Try adjusting your filters to find what you&apos;re looking for.
                  </p>
                  <Button variant="outline" onClick={clearAllFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <QuickViewModal
        product={quickViewProduct}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />

      <Footer />
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

const getEffectiveDesignStyle = (product: Product): string => {
  if (product.designStyle) {
    return product.designStyle;
  }
  // If design style is empty and main category is pool-tiles, use pool-tiles as design style
  if (product.mainCategory === "pool-tiles") {
    return "pool-tiles";
  }
  return "";
};

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasFetchedRef = useRef(false);
  const router = useRouter();

  // Fetch products when dialog opens
  useEffect(() => {
    if (!open) {
      return;
    }

    if (products.length === 0 && !hasFetchedRef.current) {
      hasFetchedRef.current = true;

      const fetchProducts = async () => {
        setIsLoading(true);
        try {
          const res = await fetch("/api/products");
          const data = await res.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setIsLoading(false);
        }
      };

      void fetchProducts();
    }
  }, [open, products.length]);

  const handleSelect = (product: Product) => {
    router.push(`/products/${product.slug}`);
    onOpenChange(false);
  };

  // Build search value with aliases for better matching
  const getSearchValue = (product: Product): string => {
    const baseValue = `${product.name} ${product.mainCategory} ${
      product.designStyle || ""
    } ${product.finish}`;

    // Add search aliases for pool-tiles
    if (product.mainCategory === "pool-tiles") {
      return `${baseValue} swimming pool pools tile tiles`;
    }

    return baseValue;
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <div className="relative [&_[cmdk-input-wrapper]]:pr-10">
        <CommandInput placeholder="Search products..." />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-md hover:bg-neutral-100 z-10"
          onClick={() => onOpenChange(false)}
          aria-label="Close search"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <CommandList className="max-h-[60vh]">
        {isLoading ? (
          <div className="space-y-3 p-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-16 w-16 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <CommandEmpty>No products found.</CommandEmpty>
            {products.length > 0 && (
              <CommandGroup heading="Products">
                {products.map((product) => (
                  <CommandItem
                    key={product.id}
                    value={getSearchValue(product)}
                    onSelect={() => handleSelect(product)}
                    className="flex gap-3 p-3 cursor-pointer aria-selected:bg-neutral-100"
                  >
                    <div className="relative h-16 w-16 shrink-0 rounded overflow-hidden border border-neutral-200 bg-neutral-100">
                      {product.images &&
                      product.images.length > 0 &&
                      product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-neutral-400 text-xs">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-neutral-950 truncate">
                        {product.name}
                      </div>
                      <div className="text-sm text-neutral-600 truncate">
                        {getEffectiveDesignStyle(product)
                          ? `${getEffectiveDesignStyle(product)
                              .split("-")
                              .map(
                                (w) => w.charAt(0).toUpperCase() + w.slice(1)
                              )
                              .join(" ")} • `
                          : ""}
                        {product.finish}
                      </div>
                      {product.price != null && (
                        <div className="text-sm text-neutral-700 mt-1">
                          AED {product.price.toFixed(2)} /{" "}
                          {product.unit || "unit"}
                        </div>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}

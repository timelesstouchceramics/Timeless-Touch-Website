"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, FileText } from "lucide-react";
import { Product } from "@/lib/types";

interface QuickViewModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function QuickViewModal({
  product,
  open,
  onOpenChange,
}: QuickViewModalProps) {
  if (!product) return null;

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const formatLabel = (str: string) => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl rounded-xl">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name} - Quick View</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <AspectRatio ratio={1} className="relative overflow-hidden rounded-lg">
            {product.images && product.images.length > 0 && product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                <span className="text-neutral-400 text-sm">No Image</span>
              </div>
            )}
          </AspectRatio>

          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-neutral-950">{product.name}</h2>
              <div className="flex gap-2 mt-2 flex-wrap">
                <Badge variant="secondary">{formatLabel(product.mainCategory)}</Badge>
                {getEffectiveDesignStyle(product) && (
                  <Badge variant="secondary">{formatLabel(getEffectiveDesignStyle(product))}</Badge>
                )}
                <Badge variant="secondary">{capitalize(product.finish)}</Badge>
              </div>
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div>
                <p className="text-sm font-medium text-neutral-700 mb-2">Available Sizes:</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, index) => {
                    // Format size slug for display (e.g., "60x120-cm" -> "60x120cm")
                    const formattedSize = size
                      .replace(/-/g, "")
                      .replace(/\bcm\b/gi, "cm")
                      .replace(/\bmm\b/gi, "mm");
                    return (
                      <Badge key={index} variant="outline" className="text-xs font-medium">
                        {formattedSize}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}

            {product.thickness && (
              <div>
                <p className="text-sm font-medium text-neutral-700 mb-1">Thickness:</p>
                <p className="text-sm text-neutral-600">{product.thickness}</p>
              </div>
            )}

            <p className="text-sm text-neutral-600">
              {product.description || `Premium quality ${getEffectiveDesignStyle(product) ? formatLabel(getEffectiveDesignStyle(product)) + " " : ""}${formatLabel(product.mainCategory)} with ${product.finish} finish. Perfect for interior and exterior applications.`}
            </p>

            <Separator />

            <div className="space-y-3">
              <Button className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Request Quote
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/products/${product.slug}`}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Full Details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

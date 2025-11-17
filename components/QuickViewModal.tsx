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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
          <DialogDescription>
            Quick view of product details
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <AspectRatio ratio={1} className="relative overflow-hidden rounded-md">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </AspectRatio>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-neutral-600 mb-1">
                Category
              </h4>
              <Badge variant="secondary">{capitalize(product.category)}</Badge>
            </div>

            <div>
              <h4 className="text-sm font-medium text-neutral-600 mb-1">
                Finish
              </h4>
              <Badge variant="secondary">{capitalize(product.finish)}</Badge>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium text-neutral-600 mb-1">
                Price
              </h4>
              <p className="text-2xl font-semibold text-neutral-950">
                AED {product.price}{" "}
                <span className="text-base font-normal text-neutral-600">
                  / {product.unit}
                </span>
              </p>
            </div>

            <div className="pt-2">
              <p className="text-sm text-neutral-600">
                Premium quality {product.category} with {product.finish} finish.
                Perfect for interior and exterior applications.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link href={`/products/${product.slug}`}>
              <ExternalLink className="h-4 w-4 mr-2" />
              View Full Details
            </Link>
          </Button>
          <Button className="w-full sm:w-auto">
            <FileText className="h-4 w-4 mr-2" />
            Request Quote
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

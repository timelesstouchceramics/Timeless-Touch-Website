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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl rounded-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <AspectRatio ratio={1} className="relative overflow-hidden rounded-lg">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </AspectRatio>

          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-neutral-950">{product.name}</h2>
              <div className="flex gap-2 mt-2 flex-wrap">
                <Badge variant="secondary">{formatLabel(product.mainCategory)}</Badge>
                <Badge variant="secondary">{formatLabel(product.designStyle)}</Badge>
                <Badge variant="secondary">{capitalize(product.finish)}</Badge>
              </div>
            </div>

            <div>
              <p className="text-2xl font-semibold text-neutral-950">
                AED {product.price}{" "}
                <span className="text-base font-normal text-neutral-600">
                  / {product.unit}
                </span>
              </p>
            </div>

            <p className="text-sm text-neutral-600">
              {product.description || `Premium quality ${formatLabel(product.designStyle)} ${formatLabel(product.mainCategory)} with ${product.finish} finish. Perfect for interior and exterior applications.`}
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

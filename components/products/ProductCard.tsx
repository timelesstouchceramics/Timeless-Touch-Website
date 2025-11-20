import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Eye, ArrowRight } from "lucide-react";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product, e: React.MouseEvent) => void;
  showActions?: boolean;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const formatLabel = (str: string) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function ProductCard({
  product,
  onQuickView,
  showActions = true,
}: ProductCardProps) {
  return (
    <div className="group relative">
      <Link href={`/products/${product.slug}`}>
        <Card className="shadow-sm overflow-hidden transition-shadow hover:shadow-md">
          <AspectRatio ratio={1} className="relative overflow-hidden">
            {product.images &&
            product.images.length > 0 &&
            product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={`${product.name} - ${formatLabel(
                  product.designStyle
                )} ${formatLabel(product.mainCategory)} with ${
                  product.finish
                } finish`}
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-500"
              />
            ) : (
              <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                <span className="text-neutral-400 text-sm">No Image</span>
              </div>
            )}
            {showActions && onQuickView && (
              <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-500">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="shadow-md"
                    onClick={(e) => onQuickView(product, e)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Quick View
                  </Button>
                </div>
              </div>
            )}
          </AspectRatio>
          <CardContent className="p-4">
            <CardTitle className="text-xl">{product.name}</CardTitle>
            <CardDescription>
              {formatLabel(product.designStyle)} • {capitalize(product.finish)}
            </CardDescription>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3 lg:hidden"
            >
              View Details
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

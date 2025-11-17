import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Eye, FileText } from "lucide-react";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product, e: React.MouseEvent) => void;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  return (
    <div className="group relative">
      <Link href={`/products/${product.slug}`}>
        <Card className="transition-shadow hover:shadow-md">
          <AspectRatio ratio={1} className="relative overflow-hidden">
            <Image
              src={product.image}
              alt={`${product.name} - ${product.category} with ${product.finish} finish`}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
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
          </AspectRatio>
          <CardContent>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>
              {capitalize(product.category)} • {capitalize(product.finish)}
            </CardDescription>
            <p className="font-semibold mt-2">
              AED {product.price}{" "}
              <span className="text-sm font-normal text-neutral-600">
                / {product.unit}
              </span>
            </p>
          </CardContent>
        </Card>
      </Link>
      <div className="mt-2 flex gap-2 lg:hidden">
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={(e) => onQuickView(product, e)}
        >
          <Eye className="h-4 w-4 mr-1" />
          Quick View
        </Button>
        <Button size="sm" className="flex-1">
          <FileText className="h-4 w-4 mr-1" />
          Quote
        </Button>
      </div>
    </div>
  );
}

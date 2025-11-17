import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <Card>
      <AspectRatio ratio={1}>
        <Skeleton className="h-full w-full rounded-none" />
      </AspectRatio>
      <CardContent>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-3" />
        <Skeleton className="h-5 w-1/3" />
      </CardContent>
    </Card>
  );
}

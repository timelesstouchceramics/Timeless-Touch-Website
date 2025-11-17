import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SliderNavProps {
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}

export function SliderNav({ onPrevious, onNext, className }: SliderNavProps) {
  return (
    <div className={cn("flex", className)}>
      <Button
        variant="dark"
        size="icon"
        onClick={onPrevious}
        className="rounded-none [&_svg]:size-5"
        aria-label="Previous slide"
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="dark"
        size="icon"
        onClick={onNext}
        className="rounded-none [&_svg]:size-5"
        aria-label="Next slide"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}

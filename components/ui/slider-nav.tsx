import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SliderNavProps {
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
  separated?: boolean;
  prevClassName?: string;
  nextClassName?: string;
}

export function SliderNav({
  onPrevious,
  onNext,
  className,
  separated = false,
  prevClassName,
  nextClassName,
}: SliderNavProps) {
  const prevButton = (
    <Button
      variant="dark"
      size="icon"
      onClick={onPrevious}
      className={cn("rounded-none [&_svg]:size-5", prevClassName)}
      aria-label="Previous slide"
    >
      <ChevronLeft />
    </Button>
  );

  const nextButton = (
    <Button
      variant="dark"
      size="icon"
      onClick={onNext}
      className={cn("rounded-none [&_svg]:size-5", nextClassName)}
      aria-label="Next slide"
    >
      <ChevronRight />
    </Button>
  );

  if (separated) {
    return (
      <>
        {prevButton}
        {nextButton}
      </>
    );
  }

  return (
    <div className={cn("flex", className)}>
      {prevButton}
      {nextButton}
    </div>
  );
}

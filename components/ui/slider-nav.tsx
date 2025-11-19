import { forwardRef, type ButtonHTMLAttributes } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SliderNavProps {
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
  separated?: boolean;
  prevClassName?: string;
  nextClassName?: string;
}

type SliderButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const SliderButton = forwardRef<HTMLButtonElement, SliderButtonProps>(
  ({ className, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 cursor-pointer shadow-md hover:shadow-lg hover:bg-neutral-200 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white [&_svg]:size-5",
        className
      )}
      {...props}
    />
  )
);
SliderButton.displayName = "SliderButton";

export function SliderNav({
  onPrevious,
  onNext,
  className,
  separated = false,
  prevClassName,
  nextClassName,
}: SliderNavProps) {
  const prevButton = (
    <SliderButton
      onClick={onPrevious}
      className={prevClassName}
      aria-label="Previous slide"
    >
      <ChevronLeft />
    </SliderButton>
  );

  const nextButton = (
    <SliderButton
      onClick={onNext}
      className={nextClassName}
      aria-label="Next slide"
    >
      <ChevronRight />
    </SliderButton>
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

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-neutral-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-neutral-50 hover:bg-primary-600",
        destructive: "bg-error-600 text-neutral-50 hover:bg-error-700",
        outline:
          "border border-neutral-300 bg-transparent text-neutral-950 hover:bg-neutral-100",
        outlineLight:
          "border border-neutral-300 bg-transparent text-neutral-100 hover:bg-neutral-100/20",
        outlineDark:
          "border border-neutral-300 bg-transparent text-neutral-950 hover:bg-neutral-200",
        secondary: "bg-neutral-200 text-neutral-950 hover:bg-neutral-300",
        dark: "bg-neutral-950 text-neutral-50 hover:bg-neutral-900",
        light: "bg-neutral-50 text-primary-500 hover:bg-neutral-100",
        ghost: "hover:bg-neutral-100 hover:text-neutral-950",
        link: "text-primary-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "text-lg h-11 rounded-md p-5",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

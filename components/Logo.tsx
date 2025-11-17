import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

export default function Logo({ className, variant = "light" }: LogoProps) {
  const textColor =
    variant === "light" ? "text-neutral-50" : "text-neutral-950";

  return (
    <Link href="/" className={cn("flex flex-col", className)}>
      <div className={cn("font-serif text-xl", textColor)}>Timeless Touch</div>
      <div className={cn("text-xs uppercase tracking-[.95em]", textColor)}>
        CERAMICS
      </div>
    </Link>
  );
}

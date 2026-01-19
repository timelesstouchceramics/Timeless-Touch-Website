import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import LogoImageDark from "@/public/logo/logo-dark.png";
import LogoImageLight from "@/public/logo/logo-light.png";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  sizing?: "width" | "height";
}

export default function Logo({ className, variant = "light", sizing = "width" }: LogoProps) {
  const imageClassName = sizing === "height" ? "h-full w-auto" : "w-full h-auto";

  return (
    <Link href="/" className={cn("block", className)}>
      {variant === "light" ? (
        <Image
          src={LogoImageLight}
          alt="Timeless Touch Ceramics - Logo"
          className={imageClassName}
          priority
        />
      ) : (
        <Image
          src={LogoImageDark}
          alt="Timeless Touch Ceramics - Logo"
          className={imageClassName}
          priority
        />
      )}
    </Link>
  );
}

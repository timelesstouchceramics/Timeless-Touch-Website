import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import LogoImageDark from "@/public/logo/logo-dark.png";
import LogoImageLight from "@/public/logo/logo-light.png";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

export default function Logo({ className, variant = "light" }: LogoProps) {
  return (
    <Link href="/" className={cn("flex flex-col", className)}>
      {variant === "light" ? (
        <Image
          src={LogoImageLight}
          alt="Timeless Touch Ceramics - Logo"
          className="w-full h-full"
          priority
        />
      ) : (
        <Image
          src={LogoImageDark}
          alt="Timeless Touch Ceramics - Logo"
          className={cn("w-full h-full")}
          priority
        />
      )}
    </Link>
  );
}

import Link from "next/link";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  variant?: "desktop" | "mobile";
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

const NavLink = ({
  href,
  children,
  variant = "desktop",
  onClick,
  onMouseEnter,
  onMouseLeave,
  className = "",
}: NavLinkProps) => {
  const baseStyles =
    variant === "desktop"
      ? "text-neutral-50 border-b border-transparent uppercase tracking-wide text-sm hover:border-neutral-50/80 transition-all duration-250"
      : "text-neutral-50 uppercase tracking-wide text-sm hover:underline hover:decoration-dotted hover:underline-offset-4 transition-all";

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${baseStyles} ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;

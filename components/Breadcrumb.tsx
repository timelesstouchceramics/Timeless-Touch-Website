import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 text-neutral-600 hover:text-neutral-950 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-neutral-400" />
            {item.href && index !== items.length - 1 ? (
              <Link
                href={item.href}
                className="text-neutral-600 hover:text-neutral-950 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-neutral-950 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import NavLink from "@/components/NavLink";

interface DropdownItem {
  name: string;
  slug: string;
  image: string;
  description: string;
  type?: "mainCategory" | "designStyle";
  downloadUrl?: string;
}

interface NavigationDropdownProps {
  navLinksRef: React.RefObject<HTMLDivElement | null>;
  href: string;
  label: string;
  categories: DropdownItem[];
  queryParam?: string;
  viewAllText: string;
}

export default function NavigationDropdown({
  navLinksRef,
  href,
  label,
  categories,
  queryParam,
  viewAllText,
}: NavigationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [hoveredItem, setHoveredItem] = useState<DropdownItem | null>(
    categories.length > 0 ? categories[0] : null
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        navLinksRef.current &&
        !navLinksRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, navLinksRef]);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
    // Initialize hovered item to first item (ascending order)
    if (categories.length > 0) {
      setHoveredItem(categories[0]);
    }
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // Small delay to allow moving to dropdown
  };

  const handleDropdownMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleDropdownMouseLeave = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{`
        .dropdown-scroll-hide::-webkit-scrollbar {
          display: none;
        }
        .dropdown-scroll-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <NavLink
        href={href}
        className="flex items-center gap-1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
        {label}
      </NavLink>

      {isOpen && (
        <div
          ref={dropdownRef}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
          className="absolute left-1/2 top-full -translate-x-1/2 mt-3 w-[750px] p-6 bg-neutral-50 border border-neutral-300 rounded-md shadow-lg z-50 animate-in fade-in-0 zoom-in-95 duration-200"
        >
          <div className="flex gap-6 items-stretch">
            {/* Text list on the left */}
            <div className="relative flex-1 flex flex-col">
              <div
                ref={scrollContainerRef}
                className="grid grid-cols-2 gap-0.5 max-h-[455px] overflow-y-auto pr-2 dropdown-scroll-hide flex-1"
              >
                {categories.map((category) => {
                  // Handle dual category system for product pages: use mainCategories or designStyles based on type
                  // For catalogues and other pages, link directly without query params
                  const isProductPage = href.startsWith("/products");
                  let linkHref = href;
                  const isDownload = !!category.downloadUrl;

                  if (isDownload && category.downloadUrl) {
                    // Use download URL for catalogues
                    linkHref = category.downloadUrl;
                  } else if (isProductPage && category.type) {
                    // Product pages use dual category system
                    const param =
                      category.type === "mainCategory"
                        ? "mainCategories"
                        : "designStyles";
                    linkHref = `${href}?${param}=${category.slug}`;
                  } else if (queryParam) {
                    // Other pages can use custom query param if provided
                    linkHref = `${href}?${queryParam}=${category.slug}`;
                  }
                  // Otherwise, just use href without query params (for catalogues)
                  const isActive = hoveredItem?.slug === category.slug;
                  return (
                    <Link
                      key={category.slug}
                      href={linkHref}
                      download={isDownload}
                      target={isDownload ? "_blank" : undefined}
                      rel={isDownload ? "noopener noreferrer" : undefined}
                      onClick={() => setIsOpen(false)}
                      onMouseEnter={() => setHoveredItem(category)}
                      className={`group block p-3 rounded-lg transition-all border ${
                        isActive
                          ? "bg-neutral-100 border-neutral-200"
                          : "border-transparent hover:bg-neutral-100 hover:border-neutral-200"
                      }`}
                    >
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-xs text-neutral-600">
                          {typeof category.description === "string"
                            ? category.description
                            : ""}
                        </p>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Image display on the right */}
            <div
              className="w-[200px] self-stretch relative rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 flex-shrink-0"
              style={{ maxHeight: "455px" }}
            >
              {hoveredItem && (
                <Image
                  src={hoveredItem.image}
                  alt={hoveredItem.name}
                  fill
                  className="object-cover transition-opacity duration-300"
                />
              )}
            </div>
          </div>
          <Link href={href} onClick={() => setIsOpen(false)} className="">
            <div className="mt-8 p-3 rounded-lg flex justify-center bg-neutral-200/60 hover:bg-neutral-200/80 transition-all duration-200 ease-in-out text-sm font-medium text-neutral-900">
              {viewAllText}
            </div>
          </Link>
        </div>
      )}
    </>
  );
}

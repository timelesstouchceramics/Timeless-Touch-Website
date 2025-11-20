"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import NavLink from "@/components/NavLink";

interface DropdownItem {
  name: string;
  slug: string;
  image: string;
  description: string;
  type?: "mainCategory" | "designStyle";
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
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

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

  // Check scroll position and update arrow visibility
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(scrollTop < scrollHeight - clientHeight - 1);
    }
  };

  // Check scroll position when dropdown opens or categories change
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (isOpen && scrollContainer) {
      checkScrollPosition();
      scrollContainer.addEventListener("scroll", checkScrollPosition);
      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
      };
    }
  }, [isOpen, categories]);

  // Scroll handlers
  const handleScrollUp = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250;
      scrollContainerRef.current.scrollBy({
        top: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScrollDown = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250;
      scrollContainerRef.current.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
          className="absolute left-1/2 top-full -translate-x-1/2 mt-3 w-[600px] p-6 bg-neutral-50 border border-neutral-300 rounded-md shadow-lg z-50 animate-in fade-in-0 zoom-in-95 duration-200"
        >
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="grid grid-cols-2 gap-4 max-h-[455px] overflow-y-auto pr-2 dropdown-scroll-hide"
            >
              {categories.map((category) => {
                // Handle dual category system for product pages: use mainCategories or designStyles based on type
                // For catalogues and other pages, link directly without query params
                const isProductPage = href.startsWith("/products");
                let linkHref = href;

                if (isProductPage && category.type) {
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
                return (
                  <Link
                    key={category.slug}
                    href={linkHref}
                    onClick={() => setIsOpen(false)}
                    className="group relative block rounded-lg overflow-hidden border border-neutral-200 transition-all hover:shadow-sm"
                  >
                    <div className="relative h-32 w-full">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-transform duration-300 hover:scale-105" />
                    </div>
                    <div className="p-4 bg-neutral-50">
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        {category.name}
                      </h3>
                      <p className="text-xs text-neutral-600">
                        {typeof category.description === "string"
                          ? category.description
                          : ""}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
            {/* Scroll arrows */}
            {canScrollUp && (
              <button
                onClick={handleScrollUp}
                className="absolute left-1/2 -translate-x-1/2 top-0 z-10 p-2 rounded-full bg-white hover:bg-neutral-100 border border-neutral-300 shadow-md transition-all duration-200 hover:shadow-lg cursor-pointer"
                aria-label="Scroll up"
              >
                <ChevronUp className="h-4 w-4 text-neutral-700" />
              </button>
            )}
            {canScrollDown && (
              <button
                onClick={handleScrollDown}
                className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 p-2 rounded-full bg-white hover:bg-neutral-100 border border-neutral-300 shadow-md transition-all duration-200 hover:shadow-lg cursor-pointer"
                aria-label="Scroll down"
              >
                <ChevronDown className="h-4 w-4 text-neutral-700" />
              </button>
            )}
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

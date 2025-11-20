"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchDialog } from "@/components/ui/search-dialog";
import Logo from "@/components/Logo";
import NavLink from "@/components/NavLink";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ProductsDropdown from "@/components/navigation/ProductsDropdown";
import CataloguesDropdown from "@/components/navigation/CataloguesDropdown";
import { Collection } from "@/lib/types";

interface NavigationProps {
  collections: Collection[];
}

const Navigation = ({ collections }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const path = usePathname();

  return (
    <nav
      className={`z-50 ${
        path === "/" ? "fixed" : "sticky"
      } top-0  left-0 right-0 transition-all duration-300 ease-in-out border-b will-change-[background-color,border-color] ${
        isScrolled || path !== "/"
          ? "bg-primary-500/85 backdrop-blur-sm border-neutral-800"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <Logo variant="light" className="w-auto h-12" />

          <div
            className="hidden md:flex items-center gap-6 flex-1 justify-center relative"
            ref={navLinksRef}
          >
            <NavLink href="/">HOME</NavLink>
            <ProductsDropdown
              navLinksRef={navLinksRef}
              collections={collections}
            />
            <NavLink href="/services">SERVICES</NavLink>
            <CataloguesDropdown navLinksRef={navLinksRef} />
            <NavLink href="/about">ABOUT US</NavLink>
            <NavLink href="/contact">CONTACT US</NavLink>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="uppercase tracking-wide text-sm flex items-center gap-2 cursor-pointer bg-neutral-100 text-neutral-800 hover:bg-neutral-200 active:ring-2 active:ring-primary-500 active:ring-offset-3 rounded-2xl py-1 px-3 transition-all duration-200"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>

          <button
            className="md:hidden text-neutral-50"
            onClick={() => setIsOpen(true)}
            aria-label="Toggle menu"
          >
            <Menu />
          </button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent
            side="right"
            className="w-full sm:max-w-sm bg-primary-500/60 backdrop-blur-xs border-neutral-800"
          >
            <SheetHeader className="border-b border-neutral-50/20 pb-4">
              <SheetTitle className="text-neutral-50 text-left">
                Menu
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 mt-8">
              <NavLink
                href="/"
                variant="mobile"
                onClick={() => setIsOpen(false)}
              >
                HOME
              </NavLink>

              <NavLink
                href="/products"
                variant="mobile"
                onClick={() => setIsOpen(false)}
              >
                PRODUCTS
              </NavLink>

              <NavLink
                href="/services"
                variant="mobile"
                onClick={() => setIsOpen(false)}
              >
                SERVICES
              </NavLink>

              <NavLink
                href="/catalogues"
                variant="mobile"
                onClick={() => setIsOpen(false)}
              >
                CATALOGUES
              </NavLink>

              <NavLink
                href="/about"
                variant="mobile"
                onClick={() => setIsOpen(false)}
              >
                ABOUT US
              </NavLink>

              <NavLink
                href="/contact"
                variant="mobile"
                onClick={() => setIsOpen(false)}
              >
                CONTACT US
              </NavLink>

              <div className="pt-4 border-t border-neutral-50/20 flex flex-col gap-4">
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsOpen(false);
                  }}
                  className="text-neutral-50 uppercase tracking-wide text-sm flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <Search className="h-4 w-4" />
                  Search
                </button>
                <Button asChild variant="light" className="w-full">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Get in touch
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </nav>
  );
};

export default Navigation;

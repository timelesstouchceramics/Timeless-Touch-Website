"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchDialog } from "@/components/ui/search-dialog";
import Logo from "@/components/Logo";
import NavLink from "@/components/NavLink";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const path = usePathname();

  const productCategories = [
    {
      name: "Marble",
      slug: "marble",
      image:
        "/images/Exotic-Travertine-Ivory-Stripe-qxti2zc4r56gc8v6pnujh77ae4t684kdfhln9no0w0.jpg",
      description: "Timeless elegance and luxury",
    },
    {
      name: "Granite",
      slug: "granite",
      image: "/images/lava-blue.jpg",
      description: "Natural strength and durability",
    },
    {
      name: "Ceramic Tiles",
      slug: "ceramic",
      image: "/images/concept-light-gray-.jpg",
      description: "Versatile beauty for every space",
    },
    {
      name: "Porcelain Tiles",
      slug: "porcelain",
      image: "/images/cottage.jpg",
      description: "Modern sophistication",
    },
  ];

  return (
    <nav
      className={`z-50 ${
        path === "/" ? "fixed" : "sticky"
      } top-0  left-0 right-0 transition-all duration-300 ease-in-out border-b will-change-[background-color,border-color] ${
        isScrolled || path !== "/"
          ? "bg-primary-500/95 backdrop-blur-md border-neutral-800"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <Logo variant="light" />

          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            <NavLink href="/">HOME</NavLink>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>PRODUCTS</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] p-6">
                      <div className="grid grid-cols-2 gap-4">
                        {productCategories.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/products?category=${category.slug}`}
                            className="group relative block rounded-lg overflow-hidden border border-neutral-200 hover:border-neutral-300 transition-all hover:shadow-lg"
                          >
                            <div className="relative h-32 w-full">
                              <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                            <div className="p-4 bg-neutral-50">
                              <h3 className="font-semibold text-neutral-900 mb-1">
                                {category.name}
                              </h3>
                              <p className="text-xs text-neutral-600">
                                {category.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-neutral-200">
                        <Link
                          href="/products"
                          className="text-sm font-medium text-neutral-900 hover:text-neutral-700 transition-colors"
                        >
                          View All Products →
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavLink href="/projects">PROJECTS</NavLink>

            <NavLink href="/about">ABOUT US</NavLink>
            <NavLink href="/contact">CONTACT US</NavLink>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-neutral-50 uppercase tracking-wide text-sm flex items-center gap-2 cursor-pointer"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
            <Button asChild variant="light">
              <Link href="/contact">Get in touch</Link>
            </Button>
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
                href="/projects"
                variant="mobile"
                onClick={() => setIsOpen(false)}
              >
                PROJECTS
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

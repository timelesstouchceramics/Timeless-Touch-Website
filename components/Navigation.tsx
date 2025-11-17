"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchDialog } from "@/components/ui/search-dialog";
import Logo from "@/components/Logo";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/products", label: "PRODUCTS" },
    { path: "/projects", label: "PROJECTS" },
    { path: "/about", label: "ABOUT US" },
  ];

  return (
    <nav className="bg-primary-500 border-t border-neutral-500 border-b">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          <Logo variant="light" />

          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="text-neutral-50 uppercase tracking-wide text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-neutral-50 uppercase tracking-wide text-sm flex items-center gap-2"
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
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-neutral-50/20 mt-4 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-neutral-50 uppercase tracking-wide text-sm"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                }}
                className="text-neutral-50 uppercase tracking-wide text-sm flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
              <Button asChild variant="light">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Get in touch
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </nav>
  );
};

export default Navigation;

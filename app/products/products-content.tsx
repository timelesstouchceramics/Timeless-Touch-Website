"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Label } from "@/components/ui/label";

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("name");

  const products = useMemo(
    () => [
      {
        id: 1,
        name: "Carrara White Marble",
        category: "marble",
        finish: "polished",
        price: "$$$$",
        image: "/images/Exotic-Travertine-Ivory-Stripe-qxti2zc4r56gc8v6pnujh77ae4t684kdfhln9no0w0.jpg",
      },
      {
        id: 2,
        name: "Black Galaxy Granite",
        category: "granite",
        finish: "polished",
        price: "$$$",
        image: "/images/lava-blue.jpg",
      },
      {
        id: 3,
        name: "Calacatta Gold Marble",
        category: "marble",
        finish: "honed",
        price: "$$$$",
        image: "/images/slider-qxbxlb1pnn7lnr37mcfhy1qfctmztsja829dgwhocg.jpg",
      },
      {
        id: 4,
        name: "Kashmir White Granite",
        category: "granite",
        finish: "polished",
        price: "$$$",
        image: "/images/slider-lava-blue.jpg",
      },
      {
        id: 5,
        name: "Emperador Brown Marble",
        category: "marble",
        finish: "polished",
        price: "$$$",
        image: "/images/sansam-mobile-slider.jpg",
      },
      {
        id: 6,
        name: "Absolute Black Granite",
        category: "granite",
        finish: "leather",
        price: "$$",
        image: "/images/Prong-768x1024.webp",
      },
      {
        id: 7,
        name: "Modern Grey Ceramic",
        category: "ceramic",
        finish: "matte",
        price: "$$",
        image: "/images/concept-light-gray-.jpg",
      },
      {
        id: 8,
        name: "Travertine Beige",
        category: "marble",
        finish: "honed",
        price: "$$$",
        image: "/images/cottage-tile.jpg",
      },
      {
        id: 9,
        name: "Porcelain Wood Look",
        category: "porcelain",
        finish: "textured",
        price: "$$",
        image: "/images/cottage.jpg",
      },
      {
        id: 10,
        name: "Statuario Marble",
        category: "marble",
        finish: "polished",
        price: "$$$$",
        image: "/images/sansam-mobile-slider2.jpg",
      },
      {
        id: 11,
        name: "Blue Pearl Granite",
        category: "granite",
        finish: "polished",
        price: "$$$",
        image: "/images/lava-blue.jpg",
      },
      {
        id: 12,
        name: "Concrete Look Porcelain",
        category: "porcelain",
        finish: "matte",
        price: "$$",
        image: "/images/concept-light-gray-.jpg",
      },
    ],
    []
  );

  const categories = ["marble", "granite", "ceramic", "porcelain"];
  const finishes = ["polished", "honed", "matte", "leather", "textured"];

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    if (selectedFinishes.length > 0) {
      filtered = filtered.filter((p) => selectedFinishes.includes(p.finish));
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price-asc") return a.price.length - b.price.length;
      if (sortBy === "price-desc") return b.price.length - a.price.length;
      return 0;
    });

    return filtered;
  }, [selectedCategories, selectedFinishes, sortBy, products]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleFinish = (finish: string) => {
    setSelectedFinishes((prev) =>
      prev.includes(finish)
        ? prev.filter((f) => f !== finish)
        : [...prev, finish]
    );
  };

  return (
    <div className="bg-neutral-50">
      <Navigation />

      <section className="section">
        <div className="container">
          <div className="mb-8">
            <h1 className="title-section">Our Products</h1>
            <p className="text-body">
              Browse our extensive collection of premium tiles and natural
              stones
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent>
                <CardTitle>Filters</CardTitle>

                <div className="mb-6">
                  <h4 className="title-subsection">Category</h4>
                  <div className="flex flex-col gap-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center gap-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <Label htmlFor={category}>{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="mb-6">
                  <h4 className="title-subsection">Finish</h4>
                  <div className="flex flex-col gap-2">
                    {finishes.map((finish) => (
                      <div key={finish} className="flex items-center gap-2">
                        <Checkbox
                          id={finish}
                          checked={selectedFinishes.includes(finish)}
                          onCheckedChange={() => toggleFinish(finish)}
                        />
                        <Label htmlFor={finish}>{finish}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {(selectedCategories.length > 0 ||
                  selectedFinishes.length > 0) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedFinishes([]);
                    }}
                  >
                    Clear All Filters
                  </Button>
                )}
              </CardContent>
            </Card>

            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <p className="text-body">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "product" : "products"}
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price-asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Price: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <Card>
                      <AspectRatio ratio={1} className="relative overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </AspectRatio>
                      <CardContent>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription>
                          {product.category} • {product.finish}
                        </CardDescription>
                        <p>{product.price}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

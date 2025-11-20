"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { MessageCircle } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/lib/products-data";
import { getSimilarProducts } from "@/lib/utils/product-similarity";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [api, setApi] = useState<CarouselApi>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Get similar products using weighted scoring algorithm
  const similarProducts = getSimilarProducts(product, products, 6);

  // Sync carousel state with thumbnail selection
  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentImageIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in ${product.name}. Could you provide more information?`
    );
    window.open(`https://wa.me/971547139032?text=${message}`, "_blank");
  };

  return (
    <div className="bg-neutral-50">
      <section className="section-sm">
        <div className="container">
          <Breadcrumb
            items={[
              { label: "Products", href: "/products" },
              { label: product.name },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-4">
              <Carousel
                setApi={setApi}
                className="w-full"
                opts={{ loop: true }}
              >
                <CarouselContent>
                  {product.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <AspectRatio
                        ratio={1}
                        className="relative overflow-hidden rounded-lg"
                      >
                        <Image
                          src={image}
                          alt={`${product.name} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </AspectRatio>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious variant="light" className="left-4" />
                <CarouselNext variant="light" className="right-4" />
              </Carousel>

              {/* Thumbnail navigation */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`relative overflow-hidden rounded-md transition-all ${
                      currentImageIndex === index
                        ? "ring-2 ring-primary-600"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <AspectRatio ratio={1}>
                      <Image
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </AspectRatio>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="title-section">{product.name}</h1>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <Badge variant="secondary">
                    {capitalize(product.category)}
                  </Badge>
                  <Badge variant="secondary">
                    {capitalize(product.finish)}
                  </Badge>
                  {product.bookmatch && (
                    <Badge variant="outline">Bookmatch Available</Badge>
                  )}
                  {product.sixFace && (
                    <Badge variant="outline">6-Face Design</Badge>
                  )}
                </div>
                {product.code && (
                  <p className="text-sm text-neutral-500 mt-2">
                    Product Code: {product.code}
                  </p>
                )}
              </div>

              {product.description ? (
                <p className="text-body">{product.description}</p>
              ) : (
                <p className="text-body">
                  Premium quality {product.category} with {product.finish}{" "}
                  finish. Perfect for interior and exterior applications.
                </p>
              )}

              <div className="space-y-3">
                <Button
                  onClick={handleWhatsAppContact}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Us to Buy
                </Button>
                <p className="text-sm text-neutral-600">
                  Get a personalized quote and expert advice
                </p>
              </div>

              <Separator />

              <Tabs defaultValue="features">
                <TabsList>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="specs">Specifications</TabsTrigger>
                </TabsList>

                <TabsContent value="specs" className="mt-4">
                  <Table>
                    <TableBody>
                      {product.code && (
                        <TableRow>
                          <TableCell className="font-medium">
                            Product Code
                          </TableCell>
                          <TableCell>{product.code}</TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell className="font-medium">Category</TableCell>
                        <TableCell>{capitalize(product.category)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Finish</TableCell>
                        <TableCell>{capitalize(product.finish)}</TableCell>
                      </TableRow>
                      {product.size && (
                        <TableRow>
                          <TableCell className="font-medium">Size</TableCell>
                          <TableCell>{product.size}</TableCell>
                        </TableRow>
                      )}
                      {product.thickness && (
                        <TableRow>
                          <TableCell className="font-medium">
                            Thickness
                          </TableCell>
                          <TableCell>{product.thickness}</TableCell>
                        </TableRow>
                      )}
                      {(product.bookmatch || product.sixFace) && (
                        <TableRow>
                          <TableCell className="font-medium">
                            Special Features
                          </TableCell>
                          <TableCell>
                            {product.bookmatch && "Bookmatch Available"}
                            {product.bookmatch && product.sixFace && ", "}
                            {product.sixFace && "6-Face Design"}
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell className="font-medium">
                          Applications
                        </TableCell>
                        <TableCell>
                          {product.applications &&
                          product.applications.length > 0
                            ? product.applications.join(", ")
                            : "Indoor & Outdoor"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="features" className="mt-4">
                  <ul className="flex flex-col gap-3">
                    {product.category === "pool" && (
                      <>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>
                            Crystalline Glazed Porcelain capturing starlight and
                            ocean waves
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>
                            Varying shades of blue reflecting shimmering light
                            on sea
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>
                            Expresses harmony between nature&apos;s calm and
                            movement
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>
                            Perfect for indoor and outdoor pool applications
                          </span>
                        </li>
                      </>
                    )}
                    {product.category !== "pool" && (
                      <>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>
                            ISO 10545 certified quality with superior technical
                            performance
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>
                            Full Body Technology for consistent color throughout
                            thickness
                          </span>
                        </li>
                        {product.bookmatch && (
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span>
                              Bookmatch pattern available for dramatic feature
                              wall installations
                            </span>
                          </li>
                        )}
                        {product.sixFace && (
                          <li className="flex items-start gap-2">
                            <span>•</span>
                            <span>
                              6-Face design for versatile installation and
                              creative applications
                            </span>
                          </li>
                        )}
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>
                            Ultra-low water absorption (0.044%) for easy
                            maintenance
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>
                            High breaking strength (7194.95 N) and scratch
                            resistance (5 Moh&apos;s)
                          </span>
                        </li>
                      </>
                    )}
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>
                        Ideal for{" "}
                        {product.applications && product.applications.length > 0
                          ? product.applications.join(", ").toLowerCase()
                          : "countertops, flooring, and walls"}
                      </span>
                    </li>
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {similarProducts.length > 0 && (
            <div>
              <h2 className="title-subsection mb-8">Similar Products</h2>
              <Carousel
                opts={{
                  align: "start",
                  loop: false,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {similarProducts.map((item) => (
                    <CarouselItem
                      key={item.slug}
                      className="pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4"
                    >
                      <ProductCard product={item} showActions={false} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious
                  variant="light"
                  size="lg"
                  className="-left-4 shadow-sm shadow-primary-700"
                />
                <CarouselNext
                  variant="light"
                  size="lg"
                  className="-right-4 shadow-sm shadow-primary-700"
                />
              </Carousel>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

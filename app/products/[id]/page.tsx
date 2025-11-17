"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MessageCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ProductDetail() {
  const params = useParams();
  const id = params.id as string;

  // Mock product data
  const productImages = [
    "/images/Exotic-Travertine-Ivory-Stripe-qxti2zc4r56gc8v6pnujh77ae4t684kdfhln9no0w0.jpg",
    "/images/lava-blue.jpg",
    "/images/slider-qxbxlb1pnn7lnr37mcfhy1qfctmztsja829dgwhocg.jpg",
    "/images/slider-lava-blue.jpg",
  ];

  const product = {
    id: parseInt(id || "1"),
    name: "Carrara White Marble",
    category: "marble",
    finish: "polished",
    price: "$$$$",
    description:
      "Carrara White Marble is a timeless classic featuring soft white backgrounds with elegant grey veining. This premium natural stone brings sophistication and luxury to any space.",
    specs: {
      origin: "Carrara, Italy",
      thickness: "2cm, 3cm",
      size: "Various slabs and tiles",
      finish: "Polished, Honed, Brushed",
      application: "Indoor & Outdoor",
    },
    features: [
      "Natural marble with unique veining patterns",
      "Heat resistant and durable",
      "Ideal for countertops, flooring, and walls",
      "Professional installation recommended",
    ],
    images: productImages,
  };

  const similarProducts = [
    {
      id: 3,
      name: "Calacatta Gold Marble",
      category: "marble",
      price: "$$$$",
      image: "/images/slider-qxbxlb1pnn7lnr37mcfhy1qfctmztsja829dgwhocg.jpg",
    },
    {
      id: 10,
      name: "Statuario Marble",
      category: "marble",
      price: "$$$$",
      image: "/images/sansam-mobile-slider2.jpg",
    },
    {
      id: 8,
      name: "Travertine Beige",
      category: "marble",
      price: "$$$",
      image: "/images/cottage-tile.jpg",
    },
  ];

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in ${product.name}. Could you provide more information?`
    );
    window.open(`https://wa.me/97150XXXXXXX?text=${message}`, "_blank");
  };

  return (
    <div className="bg-neutral-50">
      <Navigation />

      <section className="section-sm">
        <div className="container">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/products">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <AspectRatio ratio={1} className="relative overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </AspectRatio>
              <div className="grid grid-cols-4 gap-3 mt-3">
                {product.images.slice(1).map((img, index) => (
                  <AspectRatio key={index} ratio={1} className="relative overflow-hidden">
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </AspectRatio>
                ))}
              </div>
            </div>

            <div>
              <h1 className="title-section">{product.name}</h1>
              <p className="text-body">
                {product.category} • {product.finish} finish
              </p>
              <div>{product.price}</div>
              <p className="text-body">{product.description}</p>
              <Button onClick={handleWhatsAppContact}>
                <MessageCircle />
                Contact Us to Buy
              </Button>
              <p className="text-body">
                Get a personalized quote and expert advice
              </p>

              <Tabs defaultValue="specs">
                <TabsList>
                  <TabsTrigger value="specs">Specifications</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                </TabsList>

                <TabsContent value="specs">
                  <Table>
                    <TableBody>
                      {Object.entries(product.specs).map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell>{key}</TableCell>
                          <TableCell>{value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="features">
                  <ul className="flex flex-col gap-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span>•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div>
            <h2 className="title-subsection mb-8">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProducts.map((item) => (
                <Link key={item.id} href={`/products/${item.id}`}>
                  <Card>
                    <AspectRatio ratio={1} className="relative overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </AspectRatio>
                    <CardContent>
                      <CardTitle>{item.name}</CardTitle>
                      <CardDescription>{item.category}</CardDescription>
                      <p>{item.price}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

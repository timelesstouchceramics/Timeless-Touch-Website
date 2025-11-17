import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Collections() {
  const categories = [
    {
      name: "Marble",
      image:
        "/images/Exotic-Travertine-Ivory-Stripe-qxti2zc4r56gc8v6pnujh77ae4t684kdfhln9no0w0.jpg",
      description: "Timeless elegance",
    },
    {
      name: "Granite",
      image: "/images/lava-blue.jpg",
      description: "Natural strength",
    },
    {
      name: "Ceramic Tiles",
      image: "/images/concept-light-gray-.jpg",
      description: "Versatile beauty",
    },
    {
      name: "Porcelain",
      image: "/images/cottage-tile.jpg",
      description: "Modern sophistication",
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="title-section">Our Collections</h2>
          <p className="text-body">
            Discover our curated selection of premium materials
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/products?category=${category.name.toLowerCase()}`}
            >
              <Card>
                <AspectRatio ratio={1} className="relative overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </AspectRatio>
                <CardContent>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

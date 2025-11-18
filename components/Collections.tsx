import Link from "next/link";
import Image from "next/image";

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
  ];

  return (
    <section className="section w-full">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="title-section">Our Collections</h2>
          <p className="text-body">
            Discover our curated selection of premium materials
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 h-[550px] px-12">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/products?category=${category.name.toLowerCase()}`}
            className="relative group overflow-hidden"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t bg-black/20" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-white text-2xl md:text-3xl font-light tracking-wide uppercase">
                LARGE SLABS
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

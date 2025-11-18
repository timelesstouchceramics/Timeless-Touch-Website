import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const heroSlide = {
  image: "/images/slider-qxbxlb1pnn7lnr37mcfhy1qfctmztsja829dgwhocg.jpg",
  title: "Transform Your Space",
  description: "Premium tiles and natural stones for spaces that inspire",
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden h-screen min-h-[600px] lg:min-h-[800px]">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroSlide.image}
          alt={heroSlide.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 z-10 bg-neutral-950/40" />
      {/* Content */}
      <div className="container relative z-20 h-full flex items-center justify-center">
        <div className="w-full max-w-4xl text-center py-16 lg:py-24 px-4">
          <h1 className="title-hero">{heroSlide.title}</h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-sans">
            {heroSlide.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg">
              <Link href="/products">
                Explore Products
                <span className="ml-2">→</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Get Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

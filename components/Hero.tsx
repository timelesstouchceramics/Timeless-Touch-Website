"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SliderNav } from "@/components/ui/slider-nav";

const heroSlides = [
  {
    image: "/images/slider-qxbxlb1pnn7lnr37mcfhy1qfctmztsja829dgwhocg.jpg",
    title: "Transform Your Space",
    description: "Premium tiles and natural stones for spaces that inspire",
  },
  {
    image: "/images/slider-lava-blue.jpg",
    title: "Timeless Elegance",
    description: "Discover our curated collection of luxury materials",
  },
  {
    image: "/images/cottage.jpg",
    title: "Crafting Excellence",
    description: "Quality craftsmanship since 2023",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const currentSlide = heroSlides[currentIndex];

  return (
    <section className="relative overflow-hidden mt-8 lg:mt-20">
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      {/* Semi-transparent white overlay on the left */}
      <div className="absolute inset-0 z-10">
        <div className="absolute left-0 top-0 bottom-0 w-full lg:w-[50%] bg-white/80" />
      </div>
      {/* Navigation buttons */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="absolute right-0 bottom-0 pointer-events-auto">
          <SliderNav onPrevious={goToPrevious} onNext={goToNext} />
        </div>
      </div>
      {/* Content */}
      <div className="container relative z-20 h-full min-h-[400px] lg:min-h-[550px] flex items-center">
        <div className="w-full lg:w-[50%] py-16 lg:py-24">
          <div key={currentIndex} className="transition-opacity duration-1000">
            <h1 className="title-hero text-neutral-950 mb-6">
              {currentSlide.title}
            </h1>
            <p className="text-body text-neutral-600 mb-8 max-w-xl">
              {currentSlide.description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild variant="dark">
              <Link href="/products">Explore Products</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Get Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

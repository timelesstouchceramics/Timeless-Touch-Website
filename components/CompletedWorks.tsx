"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { SliderNav } from "@/components/ui/slider-nav";

const projects = [
  {
    title: "Modern Kitchen Renovation",
    description:
      "A stunning transformation featuring premium marble countertops and ceramic tile flooring. This contemporary kitchen combines elegance with functionality, showcasing our finest materials in a residential setting.",
    image: "/images/slider-qxbxlb1pnn7lnr37mcfhy1qfctmztsja829dgwhocg.jpg",
  },
  {
    title: "Luxury Hotel Lobby",
    description:
      "An impressive commercial space featuring exotic travertine and granite surfaces. The grand entrance creates a lasting first impression with natural stone that speaks to timeless sophistication.",
    image: "/images/cottage.jpg",
  },
  {
    title: "Contemporary Bathroom Design",
    description:
      "A serene bathroom retreat showcasing our premium tile collections. The carefully selected materials create a spa-like atmosphere, blending modern aesthetics with natural beauty.",
    image: "/images/cottage-tile.jpg",
  },
  {
    title: "Residential Living Space",
    description:
      "An open-plan living area featuring our signature large slab installations. The seamless integration of natural stone creates a cohesive and luxurious environment for modern living.",
    image: "/images/slider-lava-blue.jpg",
  },
  {
    title: "Commercial Excellence",
    description:
      "A high-end retail space demonstrating the versatility of our ceramic tile collections. The design showcases how premium materials can elevate any commercial environment.",
    image: "/images/concept-light-gray-.jpg",
  },
];

export function CompletedWorks() {
  const [api, setApi] = useState<CarouselApi>();

  const scrollPrev = () => {
    api?.scrollPrev();
  };

  const scrollNext = () => {
    api?.scrollNext();
  };

  return (
    <section className="section">
      <div className="container mb-12">
        <div className="text-center">
          <h2 className="title-section">Our Completed Projects</h2>
          <p className="text-body">
            Discover the spaces we&apos;ve transformed with premium materials
          </p>
        </div>
      </div>

      <div className="w-full">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-0">
            {projects.map((project, index) => (
              <CarouselItem key={index} className="pl-0">
                <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] h-[600px] lg:h-[700px]">
                  {/* Left Panel - Text Content */}
                  <div className="bg-neutral-950 text-white flex flex-col justify-center p-8 lg:p-12 xl:p-16">
                    <h3 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold mb-6 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-base lg:text-lg text-white/90 leading-relaxed font-sans">
                      {project.description}
                    </p>
                  </div>

                  {/* Right Panel - Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    <div className="absolute top-4 right-4 z-10">
                      <SliderNav onPrevious={scrollPrev} onNext={scrollNext} />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

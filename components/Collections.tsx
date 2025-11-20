"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { productCategories } from "@/lib/product-categories";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Collections() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0, 0, 0.58, 1] as const,
      },
    },
  };

  return (
    <section className="section pb-0 md:pb-24 w-full" ref={ref}>
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] as const }}
        >
          <h2 className="title-section">Our Collections</h2>
          <p className="text-body">
            Discover our elegant porcelain collections crafted with Full Body
            Technology
          </p>
        </motion.div>
      </div>
      <div className="container-lg sm:px-4 md:px-12">
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {productCategories.map((category, index) => (
              <CarouselItem
                key={category.name}
                className="pl-2 md:pl-6 basis-full md:basis-1/3"
              >
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={index}
                >
                  <Link
                    href={`/products?categories=${category.slug}`}
                    className="relative group overflow-hidden block h-[370px] md:h-[550px]"
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent lg:bg-black/10" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <p className="text-white text-2xl md:text-3xl font-light tracking-wide uppercase">
                        {category.name.toUpperCase()}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-white shadow-md hover:shadow-lg left-4 top-1/2 -translate-y-1/2" />
          <CarouselNext className="bg-white shadow-md hover:shadow-lg right-4 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  );
}

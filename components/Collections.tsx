"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

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
    <section className="section w-full" ref={ref}>
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] as const }}
        >
          <h2 className="title-section">Our Collections</h2>
          <p className="text-body">
            Discover our curated selection of premium materials
          </p>
        </motion.div>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-12 h-[550px] px-12"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {categories.map((category) => (
          <motion.div key={category.name} variants={itemVariants}>
            <Link
              href={`/products?category=${category.name.toLowerCase()}`}
              className="relative group overflow-hidden block h-full"
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
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

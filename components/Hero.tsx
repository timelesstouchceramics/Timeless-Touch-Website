"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const heroSlide = {
  image: "/hero-bg.jpg",
  title: "Grace Your Space With Top-Notch Products",
  description: "Elegant Porcelain Surfaces for spaces that inspire",
};

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0, 0, 0.58, 1] as const,
    },
  },
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
        <motion.div
          className="w-full max-w-4xl text-center py-16 lg:py-24 px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="title-hero" variants={itemVariants}>
            {heroSlide.title}
          </motion.h1>
          <motion.div variants={itemVariants}>
            <p className="text-xl lg:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
              {heroSlide.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild variant="secondary" size="lg">
                <Link href="/products">
                  Explore Products
                  <span className="ml-2">→</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outlineLight"
                className="backdrop bg-neutral-100/20 hover:bg-neutral-100/25 border border-neutral-100/40"
                size="lg"
              >
                <a
                  href={`https://wa.me/971547139032?text=${encodeURIComponent(
                    "Hello! I'm interested in getting a consultation for my space. I'd like to explore your elegant porcelain surfaces."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Consultation
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const serviceHero = {
  image: "/images/services-hero-bg.jpg",
  title: "Our Premium Services",
  description:
    "Comprehensive porcelain solutions for residential, commercial, pool & outdoor applications with expert design consultation",
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

export default function ServiceHero() {
  return (
    <section className="relative overflow-hidden h-[70vh] min-h-[500px] lg:min-h-[600px]">
      <div className="absolute inset-0 z-0">
        <Image
          src={serviceHero.image}
          alt={serviceHero.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 z-10 bg-neutral-950/50" />
      {/* Content */}
      <div className="container relative z-20 h-full flex items-center justify-center">
        <motion.div
          className="w-full max-w-4xl text-center py-16 lg:py-24 px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="title-hero" variants={itemVariants}>
            {serviceHero.title}
          </motion.h1>
          <motion.div variants={itemVariants}>
            <p className="text-xl lg:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
              {serviceHero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg">
                <a href={`https://wa.me/971547139032?text=${encodeURIComponent("Hello! I'm interested in getting a free consultation for your premium services. I'd like to learn more about your comprehensive porcelain solutions.")}`} target="_blank" rel="noopener noreferrer">
                  Get Free Consultation
                  <span className="ml-2">→</span>
                </a>
              </Button>
              <Button asChild variant="outlineLight" size="lg">
                <Link href="/products">View Our Products</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

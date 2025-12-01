"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutStory() {
  const features = [
    "Full Body Technology",
    "ISO 10545 Certified",
    "Large Format Innovation (800x2400mm)",
    "Ultra-Low Water Absorption (0.044%)",
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: [0, 0, 0.58, 1] as const,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0, 0, 0.58, 1] as const,
      },
    },
  };

  return (
    <section className="section relative" ref={ref}>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/blueprint.jpg"
          alt="blueprint"
          fill
          className="object-fit opacity-10"
          sizes="100vw"
        />
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-neutral-50) 0%, transparent 15%, transparent 85%, var(--color-neutral-50) 100%)",
          }}
        />
      </div>
      <div className="container md:px-4 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{
              duration: 1.0,
              ease: [0, 0, 0.58, 1] as const,
            }}
            className="w-full mx-auto"
          >
            <div className="relative overflow-hidden w-full aspect-square max-h-[280px] md:h-[500px] md:max-h-full">
              <Image
                src="/images/story-section-pic.jpeg"
                alt="Our story"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2 className="title-section" variants={itemVariants}>
              Excellence in Manufacturing
            </motion.h2>
            <motion.p className="text-body" variants={itemVariants}>
              For 3 years, we&apos;ve manufactured elegant porcelain surfaces
              that grace homes and commercial spaces with timeless
              sophistication. We create premium porcelain products with Full
              Body Technology, ensuring superior durability and consistent color
              throughout.
            </motion.p>
            <motion.div
              className="flex flex-col gap-3"
              variants={containerVariants}
            >
              {features.map((feature) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3"
                  variants={featureVariants}
                >
                  <CheckCircle2 className="text-primary-500" />
                  {feature}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

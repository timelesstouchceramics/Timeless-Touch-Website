"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Blockquote() {
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

  return (
    <section className="section pt-12 pb-32" ref={ref}>
      <div className="container md:px-12">
        <motion.blockquote
          className="relative pl-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500" />

          <motion.p
            className="text-3xl md:text-4xl sm:font-semibold text-neutral-950 leading-tight mb-4"
            variants={itemVariants}
          >
            &ldquo;We manufacture elegant porcelain surfaces that transform
            spaces through certified quality and manufacturing
            excellence.&rdquo;
          </motion.p>
          <motion.div className="mt-6" variants={itemVariants}>
            <cite>
              <span className="block font-serif text-base text-neutral-950">
                Timeless Touch Ceramics
              </span>
              <span className="block font-serif text-base text-neutral-500 mt-1">
                Premium Porcelain Manufacturer
              </span>
            </cite>
          </motion.div>
        </motion.blockquote>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Calendar1 } from "lucide-react";

export default function ForAboutUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const glassVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0, 0, 0.58, 1] as const,
      },
    },
  };

  const features = [
    {
      number: "01",
      title: "Consultation & Selection",
      description:
        "Meet with our experts to discuss your vision, explore our collection, and select the perfect materials for your space.",
    },
    {
      number: "02",
      title: "Custom Preparation",
      description:
        "We precisely measure, cut, and prepare your selected materials to your exact specifications and project requirements.",
    },
    {
      number: "03",
      title: "Delivery & Support",
      description:
        "Professional delivery to your site with expert guidance for installation, ensuring a flawless final result.",
    },
  ];

  return (
    <section className="section pt-28 pb-0" ref={ref}>
      <div className="relative min-h-[600px] overflow-hidden w-full">
        <motion.div
          className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] h-full min-h-[600px]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left: CTA */}
          <motion.div
            className="relative bg-primary-500/85 flex items-center justify-center py-16 px-6 md:px-12 overflow-hidden"
            variants={glassVariants}
          >
            {/* Background Lines */}
            <div className="absolute inset-0 opacity-20">
              {/* Horizontal lines */}
              <div className="absolute top-[10%] left-0 w-full h-[1px] bg-neutral-50" />
              <div className="absolute top-[30%] left-0 w-full h-[1px] bg-neutral-50" />
              <div className="absolute top-[50%] left-0 w-full h-[1px] bg-neutral-50" />
              <div className="absolute top-[70%] left-0 w-full h-[1px] bg-neutral-50" />
              <div className="absolute top-[90%] left-0 w-full h-[1px] bg-neutral-50" />

              {/* Vertical lines */}
              <div className="absolute top-0 left-[15%] w-[1px] h-full bg-neutral-50" />
              <div className="absolute top-0 left-[35%] w-[1px] h-full bg-neutral-50" />
              <div className="absolute top-0 left-[65%] w-[1px] h-full bg-neutral-50" />
              <div className="absolute top-0 left-[85%] w-[1px] h-full bg-neutral-50" />

              {/* Diagonal lines */}
              <div className="absolute top-0 left-0 w-full h-full">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="100%"
                    y2="100%"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-neutral-50"
                  />
                  <line
                    x1="0"
                    y1="100%"
                    x2="100%"
                    y2="0"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-neutral-50"
                  />
                </svg>
              </div>

              {/* Corner rectangles */}
              <div className="absolute top-8 right-8 w-24 h-24 border border-neutral-50" />
              <div className="absolute bottom-8 left-8 w-32 h-32 border border-neutral-50" />
            </div>

            <div className="relative z-10 max-w-xl w-full text-center">
              <h2 className="title-section text-neutral-50">
                We Will Transform Your Space
              </h2>
              <p className="text-body text-neutral-50/90">
                Premium tiles and natural stone for spaces that inspire
              </p>
              <div className="flex gap-4 flex-col 2xl:flex-row justify-center mt-6">
                <Button asChild variant="secondary" size="lg">
                  <Link href="/products">
                    Browse Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/contact">
                    Schedule Consultation <Calendar1 className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right: Steps */}
          <div className="bg-neutral-950 flex flex-col justify-center gap-8 p-8 lg:p-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-6"
                variants={glassVariants}
                custom={index}
              >
                <div className="w-16 h-16 flex-shrink-0 rounded-full border-2 border-neutral-50 flex items-center justify-center">
                  <span className="text-2xl font-extralight text-neutral-50 font-serif">
                    {feature.number}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-50 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-neutral-50/80">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

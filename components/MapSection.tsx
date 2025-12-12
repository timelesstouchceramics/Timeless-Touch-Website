"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function MapSection() {
  // Google Maps embed URL for Dubai
  const dubaiMapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3611.211029331109!2d55.23340321066964!3d25.1623513330189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f697bea3b05b5%3A0x2a081fc15608ae36!2sTimeless%20Touch%20Ceramics%20L.L.C!5e0!3m2!1sen!2sfi!4v1765494192658!5m2!1sen!2sfi";

  // Google Maps directions URL
  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Timeless+Touch+Ceramics+L.L.C,+Office+M-45,+The+Curve+Building,+Al+Quoz+3,+Dubai,+UAE";

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

  return (
    <section className="section" ref={ref}>
      <div className="container lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            className="flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2 className="title-section mb-0" variants={itemVariants}>
              Visit Our Showroom in Dubai
            </motion.h2>

            {/* separator line */}
            <motion.div
              className="h-0.5 lg:w-[80%] bg-primary-500"
              variants={itemVariants}
            />

            {/* Location details */}
            <motion.div
              className="flex flex-col gap-2 text-neutral-600 font-sans"
              variants={itemVariants}
            >
              <p className="text-base">Office M-45, The Curve Building</p>
              <p className="text-base">Al Quoz 3, Dubai, UAE</p>
            </motion.div>

            {/* CTA Button */}
            <motion.div className="mt-4" variants={itemVariants}>
              <Button asChild>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions →
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Map */}
          <motion.div
            className="relative w-full overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{
              duration: 1.0,
              ease: [0.4, 0, 0.2, 1] as const,
              delay: 0.3,
            }}
          >
            <div className="relative w-full aspect-[4/3] xl:aspect-video">
              <iframe
                src={dubaiMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
                title="Dubai Location Map"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

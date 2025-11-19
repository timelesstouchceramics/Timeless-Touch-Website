"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar1 } from "lucide-react";

export default function CTA() {
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

  return (
    <section className="section pt-28 pb-8" ref={ref}>
      <div className="container-lg relative overflow-hidden w-full">
        <motion.div
          className="relative z-10 h-full"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="relative flex items-center justify-center py-16 px-6 md:px-12 rounded-[10px] overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: "url('/cta-bg.jpg')" }}
            variants={glassVariants}
          >
            <div className="absolute inset-0 bg-primary-500/60" />
            {/* Background Lines */}
            <div className="relative z-10 w-full text-center">
              <h2 className="title-section text-neutral-50">
                We Will Transform Your Space
              </h2>
              <p className="text-body text-neutral-50/90">
                Premium tiles and natural stone for spaces that inspire
              </p>
              <div className="flex gap-4 justify-center mt-12">
                <Button asChild variant="secondary" size="lg">
                  <Link href="/contact">
                    Schedule Consultation <Calendar1 className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

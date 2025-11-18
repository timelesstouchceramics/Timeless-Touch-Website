"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function CTA() {
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
    <section className="section" ref={ref}>
      <div className="container">
        <Card className="border-0">
          <CardContent className="py-0">
            <motion.div
              className="bg-primary-500 text-neutral-50 text-center p-12"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.h2
                className="title-section text-neutral-50"
                variants={itemVariants}
              >
                Ready to Start Your Project?
              </motion.h2>
              <motion.p
                className="text-body text-neutral-50/90"
                variants={itemVariants}
              >
                Let our experts help you choose the perfect materials for your
                space
              </motion.p>
              <motion.div
                className="flex gap-4 justify-center"
                variants={itemVariants}
              >
                <Button asChild variant="secondary">
                  <Link href="/products">Browse Products</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Schedule Consultation</Link>
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

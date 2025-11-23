"use client";

import CatalogueCard from "@/components/CatalogueCard";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { catalogues } from "@/lib/catalogues-data";

export default function Catalogues() {
  const headerRef = useRef(null);
  const cataloguesRef = useRef(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const cataloguesInView = useInView(cataloguesRef, {
    once: true,
    margin: "-100px",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
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
    <div className="bg-neutral-50">
      <section className="section" ref={headerRef}>
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.9, ease: [0, 0, 0.58, 1] as const }}
          >
            <h1 className="title-section">Product Catalogues</h1>
            <p className="text-body">
              Download our comprehensive product catalogues to explore our full
              range of premium tiles and natural stones
            </p>
          </motion.div>

          <motion.div
            ref={cataloguesRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={cataloguesInView ? "visible" : "hidden"}
          >
            {catalogues.map((catalogue, index) => (
              <motion.div key={index} variants={cardVariants}>
                <CatalogueCard
                  title={catalogue.title}
                  thumbnail={catalogue.thumbnail}
                  fileUrl={catalogue.fileUrl}
                  fileSize={catalogue.fileSize}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

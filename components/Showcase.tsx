"use client";

import Image from "next/image";
import { useState } from "react";
import { SliderNav } from "@/components/ui/slider-nav";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "Modern Kitchen Renovation",
    description:
      "A stunning contemporary kitchen featuring our premium large format tiles in sophisticated light gray from our Modern Look Collection. The seamless flooring harmonizes with natural wood cabinetry and exposed concrete ceilings. Full Body Technology and matt finish ensure beauty.",
    image: "/images/showcase/kitchen.jpg",
  },
  {
    title: "Residential Living Space",
    description:
      "A dramatic double-height entryway showcasing our premium large format marble-look porcelain slabs in warm beige tones. The floor-to-ceiling application creates a seamless, hotel-inspired aesthetic with authentic travertine veining. Strategic lighting highlights the texture.",
    image: "/images/showcase/residential.jpg",
  },
  {
    title: "Luxury Swimming Pool Design",
    description:
      "An elegant aquatic retreat featuring our premium Starwave Series Crystalline Glazed Porcelain mosaic tiles in mesmerizing ocean blue tones. The shimmering underwater surface captures and reflects light beautifully, creating a poetic blend of starlight and sea. These tiles transform pools into sanctuaries.",
    image: "/images/showcase/swimmingpool.jpg",
  },
  {
    title: "Zen Bathroom Sanctuary",
    description:
      "A tranquil sanctuary featuring our premium textured stone-look porcelain in sophisticated gray-green tones. The dramatic three-dimensional feature wall creates depth and visual interest, complemented by smooth large format tiles in warm beige. Thoughtful material selection transforms this space into a wellness retreat.",
    image: "/images/showcase/bathroom.jpg",
  },
];

export function Showcase() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollPrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const scrollNext = () => {
    setSelectedIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="section" ref={ref}>
      <div className="container mb-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, ease: [0, 0, 0.58, 1] as const }}
        >
          <h2 className="title-section">Showcase</h2>
          <p className="text-body">
            Explore how our elegant porcelain surfaces transform spaces across
            residential and commercial projects
          </p>
        </motion.div>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] h-[700px]">
          {/* Left Panel - Text Content */}
          <div className="bg-neutral-950 text-white flex flex-col justify-center p-8 lg:p-12 xl:p-16 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col justify-center p-6 lg:p-12 xl:p-16"
              >
                <h3 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold mb-6 leading-tight">
                  {projects[selectedIndex].title}
                </h3>
                <p className="text-base lg:text-lg text-white/90 leading-relaxed font-sans">
                  {projects[selectedIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Panel - Image */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={projects[selectedIndex].image}
                  alt={projects[selectedIndex].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </motion.div>
            </AnimatePresence>
            <SliderNav
              onPrevious={scrollPrev}
              onNext={scrollNext}
              separated
              prevClassName="absolute top-1/2 -translate-y-1/2 left-4 z-10"
              nextClassName="absolute top-1/2 -translate-y-1/2 right-4 z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

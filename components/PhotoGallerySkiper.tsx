"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const images = [
  "/images/skiper/aalo-lens-XhMzBZrpQT4-unsplash.jpg",
  "/images/skiper/adriana-macias-1TnBLt1KXSg-unsplash.jpg",
  "/images/skiper/alef-morais-l864GKi_dRM-unsplash.jpg",
  "/images/skiper/amira-aboalnaga-O7WjrXiKy_s-unsplash.jpg",
  "/images/skiper/clay-banks-C-FqIffctHI-unsplash.jpg",
  "/images/skiper/ela-de-pure-wK2nvKuHv18-unsplash.jpg",
  "/images/skiper/jean-philippe-delberghe-kpxXdzCbXHw-unsplash.jpg",
  "/images/skiper/jean-philippe-delberghe-yo5hCvbFUJI-unsplash.jpg",
  "/images/skiper/lotus-design-n-print-BrS3Atdfek0-unsplash.jpg",
  "/images/skiper/luigi-estuye-lucreative-uEqlyGxup5I-unsplash.jpg",
  "/images/skiper/peter-muniz-d3lWY5P9sws-unsplash.jpg",
  "/images/skiper/prydumano-design-mqlKz6qnafk-unsplash.jpg",
  "/images/skiper/reisetopia-nxtnUlotYr8-unsplash.jpg",
];

const PhotoGallerySkiper = () => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height, width } = dimension;

  // Vertical transforms for desktop
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  // Horizontal transforms for mobile
  const x = useTransform(scrollYProgress, [0, 1], [0, width * 0.5]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, width * 0.8]);
  const x3 = useTransform(scrollYProgress, [0, 1], [0, width * 0.3]);
  const x4 = useTransform(scrollYProgress, [0, 1], [0, width * 0.6]);

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="w-full relative">
      {/* overly div for the inset shadows */}
      <div className="absolute inset-0 pointer-events-none z-10 [box-shadow:inset_0_10px_8px_rgba(0,0,0,.2),_inset_0_-10px_8px_rgba(0,0,0,.2)] md:[box-shadow:inset_0_10px_10px_30px_rgba(0,0,0,.15),_inset_0_-10px_10px_30px_rgba(0,0,0,.15)]" />
      <div
        ref={gallery}
        className={`relative box-border flex overflow-hidden ${
          isMobile
            ? "h-auto flex-col gap-0 p-0"
            : "h-[175vh] flex-row gap-[2vw] p-[2vw]"
        }`}
      >
        {isMobile ? (
          <>
            <Column
              images={[images[0], images[1], images[2], images[3]]}
              y={y}
              x={x}
              isMobile={isMobile}
            />
            <Column
              images={[images[4], images[5], images[6], images[7]]}
              y={y2}
              x={x2}
              isMobile={isMobile}
            />
            <Column
              images={[
                images[8],
                images[9],
                images[10],
                images[11],
                images[12],
              ]}
              y={y3}
              x={x3}
              isMobile={isMobile}
            />
          </>
        ) : (
          <>
            <Column
              images={[images[0], images[1], images[2]]}
              y={y}
              x={x}
              isMobile={isMobile}
            />
            <Column
              images={[images[3], images[4], images[5]]}
              y={y2}
              x={x2}
              isMobile={isMobile}
            />
            <Column
              images={[images[6], images[7], images[8]]}
              y={y3}
              x={x3}
              isMobile={isMobile}
            />
            <Column
              images={[images[9], images[10], images[11], images[12]]}
              y={y4}
              x={x4}
              isMobile={isMobile}
            />
          </>
        )}
      </div>
    </main>
  );
};

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
  x: MotionValue<number>;
  isMobile: boolean;
};

const Column = ({ images, y, x, isMobile }: ColumnProps) => {
  return (
    <motion.div
      className={
        isMobile
          ? "relative -left-[45%] flex h-[250px] w-full flex-row gap-4 first:left-[-45%] [&:nth-child(2)]:left-[-80%] [&:nth-child(3)]:left-[-30%]"
          : "relative -top-[45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"
      }
      style={isMobile ? { x } : { y }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          className={`relative overflow-hidden ${
            isMobile ? "h-full w-[250px] min-w-[250px]" : "h-full w-full"
          }`}
        >
          <Image
            src={src}
            alt="Gallery image"
            fill
            sizes={isMobile ? "250px" : "25vw"}
            className="pointer-events-none h-full w-full object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
};

export { PhotoGallerySkiper };

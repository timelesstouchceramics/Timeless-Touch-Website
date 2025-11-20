"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Breadcrumb from "@/components/Breadcrumb";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Modern Luxury Villa",
      location: "Dubai, UAE",
      category: "Residential",
      description:
        "Complete porcelain flooring featuring Marble Look Collection with Calacatta Gold and Carrara slabs, complemented by Black Marquina accents",
      materials: ["Calacatta Gold", "Carrara", "Black Marquina"],
      image: "/images/cottage.jpg",
    },
    {
      id: 2,
      title: "Downtown Hotel Lobby",
      location: "Dubai, UAE",
      category: "Commercial",
      description:
        "Large-scale porcelain installation with custom Bookmatch patterns from our Marble Look Collection, creating dramatic feature walls",
      materials: ["Lava Blue", "Statuario", "Exotic Travertine"],
      image: "/images/slider-qxbxlb1pnn7lnr37mcfhy1qfctmztsja829dgwhocg.jpg",
    },
    {
      id: 3,
      title: "Spa & Wellness Center",
      location: "Dubai, UAE",
      category: "Commercial",
      description:
        "Luxury spa featuring Stone Look Collection throughout, creating a serene environment with Exotic Travertine Ivory Stripe and Rockstone series",
      materials: ["Exotic Travertine Ivory", "Rockstone Ivory", "Lava Blue"],
      image: "/images/slider-lava-blue.jpg",
    },
    {
      id: 4,
      title: "Contemporary Kitchen",
      location: "Dubai, UAE",
      category: "Residential",
      description:
        "Custom kitchen with Statuario countertops and Concept Light Gray backsplash from our Modern Look Collection",
      materials: ["Statuario", "Concept Light Gray", "Monocolor White"],
      image: "/images/cottage-tile.jpg",
    },
    {
      id: 5,
      title: "Corporate Office",
      location: "Dubai, UAE",
      category: "Commercial",
      description:
        "Modern office space with polished porcelain flooring from Monocolor and Concept series, showcasing contemporary sophistication",
      materials: [
        "Monocolor Light Gray",
        "Concept Dark Gray",
        "Monocolor White",
      ],
      image: "/images/concept-light-gray-.jpg",
    },
    {
      id: 6,
      title: "Luxury Pool & Outdoor Area",
      location: "Dubai, UAE",
      category: "Residential",
      description:
        "Stunning outdoor pool area featuring Starwave Series swimming pool tiles with Cottage Walnut porcelain for surrounding areas",
      materials: ["Starwave Series", "Cottage Walnut", "Slate Ivory"],
      image: "/images/sansam-mobile-slider.jpg",
    },
  ];

  const headerRef = useRef(null);
  const projectsRef = useRef(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const projectsInView = useInView(projectsRef, {
    once: true,
    margin: "-100px",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      <div className="container pt-8">
        <Breadcrumb items={[{ label: "Projects" }]} />
      </div>
      <section className="section pt-12" ref={headerRef}>
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.9, ease: [0, 0, 0.58, 1] as const }}
          >
            <h1 className="title-section">Our Projects</h1>
            <p className="text-body">
              Explore our portfolio of completed installations featuring elegant
              porcelain surfaces. From residential homes to commercial spaces,
              we bring visions to life with Full Body Technology and ISO 10545
              certified quality.
            </p>
          </motion.div>

          <motion.div
            ref={projectsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={cardVariants}>
                <Card>
                  <AspectRatio
                    ratio={4 / 3}
                    className="relative overflow-hidden rounded-t-lg"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="default">{project.category}</Badge>
                    </div>
                  </AspectRatio>
                  <CardContent>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription className="pb-8">
                      {project.location}
                    </CardDescription>
                    <p className="text-body">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.materials.map((material) => (
                        <Badge key={material} variant="outline">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

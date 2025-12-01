"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Award, Users, Factory, Heart } from "lucide-react";
import FeaturesCard from "@/components/FeaturesCard";
import FAQ from "@/components/FAQ";
import TechnicalSpecs from "@/components/TechnicalSpecs";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const values = [
    {
      icon: Award,
      title: "Quality Excellence",
      description:
        "ISO 10545 certified products exceeding industry standards. Premium quality porcelain manufactured with uncompromising precision.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Our experienced professionals guide you through product selection and provide expert advice on material applications.",
    },
    {
      icon: Factory,
      title: "Manufacturing Excellence",
      description:
        "Full Body Technology with superior durability and color consistency throughout. Large format innovation up to 800x2400mm.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Your satisfaction is our priority, from product selection to delivery and ongoing support for your project.",
    },
  ];

  const timeline = [
    {
      year: "2023",
      event: "Founded Timeless Touch Ceramics with a vision for quality",
    },
    { year: "2024", event: "Expanded to 5 showrooms across the region" },
    { year: "2025", event: "Reached milestone of 10,000 satisfied customers" },
  ];

  const faqItems = [
    {
      question: "What types of porcelain products do you manufacture?",
      answer:
        "We manufacture a comprehensive range of elegant porcelain surfaces including Stone Look Collection (Travertine, Rockstone, Ceppo), Marble Look Collection (Black Collection, Luxury Range, Classic Marbles), Modern Look Collection (Emerald, Monocolor, Tattoo, Concept), Decorative Designs with Evo Dry Technology, Wood Look Tiles, Standard Tiles, and specialized Swimming Pool Tiles. All products feature Full Body Technology and ISO 10545 certification.",
    },
    {
      question: "What are the technical specifications of your products?",
      answer:
        "Our porcelain surfaces exceed industry standards with ultra-low water absorption (0.044%), high breaking strength (7194.95 N), and superior scratch resistance (5 Moh's scale). We offer large format slabs up to 800x2400mm in 15mm thickness with Full Body Technology for consistent color throughout.",
    },
    {
      question: "Do you offer Bookmatch patterns?",
      answer:
        "Yes, we offer Bookmatch options for our Marble Look Collection, creating dramatic and symmetrical patterns perfect for feature walls. Our 6-Face designs ensure seamless continuity across multiple surfaces. Please contact us for custom Bookmatch solutions tailored to your project.",
    },
    {
      question: "What finishes are available?",
      answer:
        "We offer both Polished and Matt finishes across our collections. Our Designer Finishes maintain the premium quality and aesthetic appeal of our porcelain surfaces, suitable for various applications including residential, commercial, indoor, outdoor, pool areas, kitchens, and bathrooms.",
    },
    {
      question: "Can I get samples of your products?",
      answer:
        "Absolutely! We provide samples of our porcelain collections to help you visualize your project. Our samples showcase the authentic appearance, texture, and finish of our products. Please contact us to request samples or schedule a consultation to view our full-size displays and collection catalogues.",
    },
    {
      question: "Do you provide product guidance and support?",
      answer:
        "Yes, we offer expert product guidance to help you select the right materials for your project. Our experienced team assists with everything from choosing the right collection for your space to understanding product specifications, Bookmatch patterns, and application possibilities. We provide detailed information and support for all projects.",
    },
  ];

  // Refs for scroll animations
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const timelineRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const timelineInView = useInView(timelineRef, {
    once: true,
    margin: "-100px",
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.0,
        ease: [0, 0, 0.58, 1] as const,
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

  const timelineItemVariants = {
    hidden: { opacity: 0, x: -30 },
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
    <div className="bg-neutral-50">
      <section className="section-darker" ref={heroRef}>
        <div className="container text-center">
          <motion.h1
            className="title-hero text-neutral-950"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.9, ease: [0, 0, 0.58, 1] as const }}
          >
            About Timeless Touch Ceramics
          </motion.h1>
          <motion.p
            className="text-body"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0, 0, 0.58, 1] as const,
            }}
          >
            3 years of excellence in manufacturing elegant porcelain surfaces
            that grace spaces with timeless sophistication.
          </motion.p>
        </div>
      </section>

      <section className="section" ref={storyRef}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
            >
              <AspectRatio ratio={1} className="relative overflow-hidden">
                <Image
                  src="/images/story-section-pic.jpeg"
                  alt="Our story"
                  fill
                  className="object-cover"
                />
              </AspectRatio>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
            >
              <motion.h2 className="title-section" variants={itemVariants}>
                Our Story
              </motion.h2>
              <motion.p className="text-body" variants={itemVariants}>
                Timeless Touch Ceramics was founded in 2023 with a simple
                mission: to manufacture elegant porcelain surfaces that grace
                spaces with timeless sophistication. What started as a vision
                for quality has grown into a trusted manufacturer in the
                industry.
              </motion.p>
              <motion.p className="text-body" variants={itemVariants}>
                We believe that the right materials can transform any space into
                something extraordinary. That&apos;s why we focus on
                manufacturing excellence, using Full Body Technology to create
                premium porcelain surfaces.
              </motion.p>
              <motion.p className="text-body" variants={itemVariants}>
                Today, we&apos;re proud to serve thousands of satisfied
                customers, from homeowners creating their dream kitchens to
                architects designing landmark commercial spaces, with our
                comprehensive range of stone look, marble look, and modern look
                collections.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-darker" ref={valuesRef}>
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={
              valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.9, ease: [0, 0, 0.58, 1] as const }}
          >
            <h2 className="title-section">Our Values</h2>
            <p className="text-body">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
          >
            {values.map((value) => (
              <motion.div key={value.title} variants={cardVariants}>
                <FeaturesCard
                  icon={value.icon}
                  title={value.title}
                  variant="vertical"
                  description={value.description}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section" ref={timelineRef}>
        <div className="container flex flex-col items-center justify-center">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={
              timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.9, ease: [0, 0, 0.58, 1] as const }}
          >
            <div className="text-center mb-12">
              <p className="text-xs sm:text-sm uppercase tracking-wider font-medium text-neutral-400 mb-2">
                Milestones
              </p>
              <h2 className="title-section">Our Journey</h2>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={timelineInView ? "visible" : "hidden"}
          >
            {timeline.map((item) => (
              <motion.div
                key={item.year}
                className="flex gap-6 items-start"
                variants={timelineItemVariants}
              >
                <div className="flex-shrink-0">
                  <span className="bg-primary-500 rounded-full text-neutral-50 p-4">
                    {item.year}
                  </span>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="text-body">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <TechnicalSpecs />

      <FAQ items={faqItems} />
    </div>
  );
}

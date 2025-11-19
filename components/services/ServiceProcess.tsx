"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import FeaturesCard from "@/components/FeaturesCard";

export default function ServiceProcess() {
  const steps = [
    {
      number: "01",
      title: "Consultation",
      description:
        "Schedule a free consultation to discuss your project needs, budget, and vision with our experts.",
    },
    {
      number: "02",
      title: "Design & Planning",
      description:
        "Our design team creates detailed plans and porcelain material recommendations from our comprehensive collections tailored to your space.",
    },
    {
      number: "03",
      title: "Quote & Approval",
      description:
        "Receive a comprehensive quote with transparent pricing. Approve the plan and we proceed.",
    },
    {
      number: "04",
      title: "Installation & Completion",
      description:
        "Professional installation by certified technicians, followed by final inspection and handover.",
    },
  ];

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
    <section className="section-darker" ref={ref}>
      <div className="container md:px-4 lg:px-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, ease: [0, 0, 0.58, 1] as const }}
        >
          <h2 className="title-section">Our Process</h2>
          <p className="text-body">
            A streamlined approach to transforming your space
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step, index) => {
            return (
              <motion.div
                key={step.number}
                className="relative"
                variants={itemVariants}
              >
                <FeaturesCard
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  variant="vertical"
                  className="h-full"
                />
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-300 transform -translate-y-1/2 z-0" />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

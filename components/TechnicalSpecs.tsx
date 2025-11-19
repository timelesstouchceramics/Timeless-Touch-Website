"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function TechnicalSpecs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const dimensionSpecs = [
    {
      parameter: "Deviation in Length & Width",
      requirement: "±1mm",
      result: "0.00mm",
      superior: true,
    },
    {
      parameter: "Thickness",
      requirement: "±0.5mm",
      result: "0.00mm",
      superior: true,
    },
    {
      parameter: "Straightness of Sides",
      requirement: "±0.8mm",
      result: "0.09mm",
      superior: true,
    },
    {
      parameter: "Rectangularity",
      requirement: "±1.5mm",
      result: "0.11mm",
      superior: true,
    },
  ];

  const physicalSpecs = [
    {
      property: "Water Absorption %",
      testMethod: "ISO 10545-3",
      requirement: "Less than 0.5",
      result: "0.044%",
      superior: true,
    },
    {
      property: "Breaking Strength",
      testMethod: "ISO 10545-4",
      requirement: "-",
      result: "7194.95 N",
      superior: true,
    },
    {
      property: "Modulus of Rupture (MOR)",
      testMethod: "ISO 10545-4",
      requirement: "35",
      result: "49.06 N/mm²",
      superior: true,
    },
    {
      property: "Resistance to Surface Abrasion",
      testMethod: "ISO 10545-7",
      requirement: "-",
      result: "PEI Class III - 1500 Revolution pass",
      superior: true,
    },
    {
      property: "Coefficient of Linear Thermal Expansion",
      testMethod: "ISO 10545-8",
      requirement: "9x10⁻⁶ Max",
      result: "5.51x10⁻⁶",
      superior: true,
    },
    {
      property: "Thermal Shock Resistance",
      testMethod: "ISO 10545-9",
      requirement: "10 Cycle, Min",
      result: "Confirmed",
      superior: true,
    },
    {
      property: "Crazing Resistance",
      testMethod: "ISO 10545-11",
      requirement: "No Crazing in Two Cycle",
      result: "Confirmed",
      superior: true,
    },
    {
      property: "Moisture Expansion",
      testMethod: "ISO 10545-10",
      requirement: "0.02 mm/m max",
      result: "0.01 mm/m max",
      superior: true,
    },
    {
      property: "Impact Resistance",
      testMethod: "ISO 10545-5",
      requirement: "0.55 Min",
      result: "0.78",
      superior: true,
    },
    {
      property: "Scratch Hardness of Surface",
      testMethod: "ISO 13630-13",
      requirement: "5 Moh's scale",
      result: "5 Moh's",
      superior: true,
    },
    {
      property: "Bulk Density",
      testMethod: "ISO 10545-3",
      requirement: "2.2 min",
      result: "2.2903 g/cc",
      superior: true,
    },
  ];

  const chemicalSpecs = [
    {
      property: "Resistance to Stain",
      testMethod: "ISO 10545-14",
      requirement: "Min Class - 3",
      result: "Class - 5",
      superior: true,
    },
    {
      property: "Resistance to Low Concentration of Acid and Alkali",
      testMethod: "ISO 10545-13",
      requirement: "Min Class-GLC",
      result: "Class GLA",
      superior: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.6,
        ease: [0, 0, 0.58, 1] as const,
      },
    },
  };

  return (
    <section className="section bg-neutral-50" ref={ref}>
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, ease: [0, 0, 0.58, 1] as const }}
        >
          <h2 className="title-section">Technical Specifications</h2>
          <p className="text-body">
            ISO 10545 certified products exceeding industry standards
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Dimension and Surface Quality */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-neutral-950 mb-4">
              Dimension and Surface Quality (ISO 10545-2 Compliant)
            </h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Requirement</TableHead>
                    <TableHead className="text-right">Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dimensionSpecs.map((spec) => (
                    <TableRow key={spec.parameter}>
                      <TableCell className="font-medium">
                        {spec.parameter}
                      </TableCell>
                      <TableCell>{spec.requirement}</TableCell>
                      <TableCell
                        className={`text-right font-semibold ${
                          spec.superior ? "text-primary-600" : ""
                        }`}
                      >
                        {spec.result}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>

          {/* Physical Properties */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-neutral-950 mb-4">
              Physical Properties
            </h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Test Method</TableHead>
                    <TableHead>Requirement</TableHead>
                    <TableHead className="text-right">Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {physicalSpecs.map((spec) => (
                    <TableRow key={spec.property}>
                      <TableCell className="font-medium">
                        {spec.property}
                      </TableCell>
                      <TableCell className="text-sm text-neutral-600">
                        {spec.testMethod}
                      </TableCell>
                      <TableCell>{spec.requirement}</TableCell>
                      <TableCell
                        className={`text-right font-semibold ${
                          spec.superior ? "text-primary-600" : ""
                        }`}
                      >
                        {spec.result}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>

          {/* Chemical Properties */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-neutral-950 mb-4">
              Chemical Properties
            </h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Test Method</TableHead>
                    <TableHead>Requirement</TableHead>
                    <TableHead className="text-right">Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chemicalSpecs.map((spec) => (
                    <TableRow key={spec.property}>
                      <TableCell className="font-medium">
                        {spec.property}
                      </TableCell>
                      <TableCell className="text-sm text-neutral-600">
                        {spec.testMethod}
                      </TableCell>
                      <TableCell>{spec.requirement}</TableCell>
                      <TableCell
                        className={`text-right font-semibold ${
                          spec.superior ? "text-primary-600" : ""
                        }`}
                      >
                        {spec.result}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-primary-50 p-6 rounded-md border border-primary-200"
          >
            <p className="text-sm text-neutral-700">
              <strong className="text-primary-900">Note:</strong> All products
              are manufactured in accordance with ISO 10545 series standards and
              exceed international quality benchmarks. Results shown are actual
              test values confirming superior performance across all technical
              parameters.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

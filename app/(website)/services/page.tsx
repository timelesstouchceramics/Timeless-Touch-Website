import { Metadata } from "next";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceFeatures from "@/components/services/ServiceFeatures";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceCTA from "@/components/services/ServiceCTA";
import Blockquote from "@/components/Blockquote";
import { Showcase } from "@/components/Showcase";

export const metadata: Metadata = {
  title: "Our Services | Timeless Touch Ceramics",
  description:
    "Expert consultation, product selection guidance, and professional support for your porcelain tile projects. From residential to commercial spaces, we help you find the perfect surfaces.",
  keywords: [
    "tile consultation Dubai",
    "porcelain selection service",
    "ceramic tile experts",
    "interior design tiles",
    "commercial tile solutions",
  ],
  openGraph: {
    title: "Our Services | Timeless Touch Ceramics",
    description:
      "Expert consultation and product selection guidance for your porcelain tile projects.",
  },
};

export default function Services() {
  return (
    <div className="bg-neutral-50">
      <ServiceHero />
      <ServiceFeatures />
      <ServiceProcess />
      <Showcase />
      <Blockquote />
      <ServiceCTA />
    </div>
  );
}

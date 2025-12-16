import { Metadata } from "next";
import Hero from "@/components/Hero";
import CollectionsServer from "@/components/CollectionsServer";
import AboutStory from "@/components/AboutStory";
import CTA from "@/components/CTA";
import { Showcase } from "@/components/Showcase";
import { PhotoGallerySkiper } from "@/components/PhotoGallerySkiper";
import Blockquote from "@/components/Blockquote";
import MapSection from "@/components/MapSection";

export const metadata: Metadata = {
  title: "Timeless Touch Ceramics | Premium Porcelain Surfaces in Dubai",
  description:
    "Elegant porcelain surfaces that grace your space. Premium manufacturer of ISO 10545 certified porcelain slabs, tiles, and marble-look ceramics in Dubai, UAE.",
  keywords: [
    "porcelain tiles Dubai",
    "ceramic tiles UAE",
    "marble look porcelain",
    "stone look tiles",
    "large format slabs",
    "swimming pool tiles",
    "premium ceramics",
  ],
  openGraph: {
    title: "Timeless Touch Ceramics | Premium Porcelain Surfaces",
    description:
      "Elegant porcelain surfaces that grace your space. Premium manufacturer of ISO 10545 certified porcelain slabs and tiles.",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="bg-neutral-50">
      <Hero />
      <CollectionsServer />
      <AboutStory />
      <Showcase />
      <Blockquote />
      <PhotoGallerySkiper />
      <CTA />
      <MapSection />
    </div>
  );
}

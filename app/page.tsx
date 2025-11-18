import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import AboutStory from "@/components/AboutStory";
import CTA from "@/components/CTA";
import { CompletedWorks } from "@/components/CompletedWorks";
import { Metadata } from "next";
import { PhotoGallerySkiper } from "@/components/PhotoGallerySkiper";
import Blockquote from "@/components/Blockquote";
import MapSection from "@/components/MapSection";

export const metadata: Metadata = {
  title: "Timeless Touch Ceramics - Premium Tiles and Natural Stones",
  description:
    "Premium tiles and natural stones for spaces that inspire. Quality craftsmanship since 2023.",
};

export default function Home() {
  return (
    <div className="bg-neutral-50">
      <Navigation />
      <Hero />
      <Collections />
      <AboutStory />
      <CompletedWorks />
      <Blockquote />
      <PhotoGallerySkiper />
      <CTA />
      <MapSection />
      <Footer />
    </div>
  );
}

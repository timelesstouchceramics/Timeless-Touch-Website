import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import AboutStory from "@/components/AboutStory";
import CTA from "@/components/CTA";
import { Showcase } from "@/components/Showcase";
import { PhotoGallerySkiper } from "@/components/PhotoGallerySkiper";
import Blockquote from "@/components/Blockquote";
import MapSection from "@/components/MapSection";

export default function Home() {
  return (
    <div className="bg-neutral-50">
      <Hero />
      <Collections />
      <AboutStory />
      <Showcase />
      <Blockquote />
      <PhotoGallerySkiper />
      <CTA />
      <MapSection />
    </div>
  );
}

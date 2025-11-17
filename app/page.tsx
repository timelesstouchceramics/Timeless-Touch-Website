import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import AboutStory from "@/components/AboutStory";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="bg-neutral-50">
      <Hero />
      <Collections />
      <AboutStory />
      <CTA />
    </div>
  );
}

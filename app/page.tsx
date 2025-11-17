import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import AboutStory from "@/components/AboutStory";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="bg-neutral-50">
      <Navigation />
      <Hero />
      <Collections />
      <AboutStory />
      <CTA />
      <Footer />
    </div>
  );
}

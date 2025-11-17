import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CheckCircle2 } from "lucide-react";

export default function AboutStory() {
  const features = [
    "Premium Quality Materials",
    "Expert Installation Support",
    "Custom Design Consultation",
    "Sustainable Sourcing",
  ];

  return (
    <section className="section bg-neutral-200">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="title-section">Crafting Excellence Since 2023</h2>
            <p className="text-body">
              For 3 years, Timeless Touch Ceramics has been at the forefront of
              bringing natural beauty into homes and commercial spaces. Our
              passion for quality and commitment to sustainability drives
              everything we do.
            </p>
            <p className="text-body">
              We source the finest materials from around the world, working
              directly with quarries and manufacturers to ensure every piece
              meets our exacting standards.
            </p>
            <div className="flex flex-col gap-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary-500" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
          <AspectRatio ratio={1} className="relative overflow-hidden">
            <Image
              src="/images/cottage.jpg"
              alt="Our story"
              fill
              className="object-cover"
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
}

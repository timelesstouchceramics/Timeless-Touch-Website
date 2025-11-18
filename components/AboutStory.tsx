import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CheckCircle2 } from "lucide-react";

export default function AboutStory() {
  const features = [
    "Premium Materials",
    "Expert Installation",
    "Custom Design",
    "Sustainable Sourcing",
  ];

  return (
    <section className="section relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/blueprint.jpg"
          alt="blueprint"
          fill
          className="object-fit opacity-10"
          sizes="100vw"
        />
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-neutral-50) 0%, transparent 15%, transparent 85%, var(--color-neutral-50) 100%)",
          }}
        />
      </div>
      <div className="container px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <AspectRatio ratio={1} className="relative overflow-hidden">
            <Image
              src="/images/blac-marquina-1.jpg"
              alt="Our story"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/5" />
          </AspectRatio>
          <div>
            <h2 className="title-section">Excellence in Space & Time</h2>
            <p className="text-body">
              For 3 years, we&apos;ve brought natural beauty into homes and
              commercial spaces. Quality and sustainability drive everything we
              do. We source the finest materials worldwide, working directly
              with quarries to ensure every piece meets our standards.
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
        </div>
      </div>
    </section>
  );
}

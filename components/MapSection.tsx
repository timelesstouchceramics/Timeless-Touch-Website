import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function MapSection() {
  // Google Maps embed URL for Dubai
  const dubaiMapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178509744622!2d55.2708!3d25.2048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24d%3A0xff45e502e1ceb7e2!2sDubai!5e0!3m2!1sen!2sae!4v1234567890123!5m2!1sen!2sae";

  // Google Maps directions URL
  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Dubai,+United+Arab+Emirates";

  return (
    <section className="section">
      <div className="container px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col gap-6">
            <h2 className="title-section">Visit Our Showroom in Dubai</h2>

            {/* Teal separator line */}
            <div className="h-0.5 w-[80%] bg-primary-500" />

            {/* Location details */}
            <div className="flex flex-col gap-2 text-neutral-600 font-sans">
              <p className="text-base">1234 Garden Boulevard</p>
              <p className="text-base">Dubai, UAE 12345</p>
            </div>

            {/* CTA Button */}
            <div className="mt-4">
              <Button variant="dark" className="rounded-md" asChild>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions →
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column - Map with light blue background */}
          <div className="relative w-full overflow-hidden">
            <AspectRatio ratio={16 / 9} className="relative">
              <iframe
                src={dubaiMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
                title="Dubai Location Map"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
}

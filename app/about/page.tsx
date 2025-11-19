import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Award, Users, Factory, Heart } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import FeaturesCard from "@/components/FeaturesCard";
import FAQ from "@/components/FAQ";
import TechnicalSpecs from "@/components/TechnicalSpecs";

export default function About() {
  const values = [
    {
      icon: Award,
      title: "Quality Excellence",
      description:
        "ISO 10545 certified products exceeding industry standards. Premium quality porcelain manufactured with uncompromising precision.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Our experienced professionals guide you through every step of your project, from design consultation to installation.",
    },
    {
      icon: Factory,
      title: "Manufacturing Excellence",
      description:
        "Full Body Technology with superior durability and color consistency throughout. Large format innovation up to 800x2400mm.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Your satisfaction is our priority, from material selection to final installation and project completion.",
    },
  ];

  const timeline = [
    {
      year: "2023",
      event: "Founded Timeless Touch Ceramics with a vision for quality",
    },
    { year: "2024", event: "Expanded to 5 showrooms across the region" },
    { year: "2025", event: "Reached milestone of 10,000 satisfied customers" },
  ];

  const faqItems = [
    {
      question: "What types of porcelain products do you manufacture?",
      answer:
        "We manufacture a comprehensive range of elegant porcelain surfaces including Stone Look Collection (Travertine, Rockstone, Ceppo), Marble Look Collection (Black Collection, Luxury Range, Classic Marbles), Modern Look Collection (Emerald, Monocolor, Tattoo, Concept), Decorative Designs with Evo Dry Technology, Wood Look Tiles, Standard Tiles, and specialized Swimming Pool Tiles. All products feature Full Body Technology and ISO 10545 certification.",
    },
    {
      question: "What are the technical specifications of your products?",
      answer:
        "Our porcelain surfaces exceed industry standards with ultra-low water absorption (0.044%), high breaking strength (7194.95 N), and superior scratch resistance (5 Moh's scale). We offer large format slabs up to 800x2400mm in 15mm thickness with Full Body Technology for consistent color throughout.",
    },
    {
      question: "Do you offer Bookmatch patterns?",
      answer:
        "Yes, we offer Bookmatch options for our Marble Look Collection, creating dramatic and symmetrical patterns perfect for feature walls. Our 6-Face designs ensure seamless continuity across multiple surfaces. Please contact us for custom Bookmatch solutions tailored to your project.",
    },
    {
      question: "What finishes are available?",
      answer:
        "We offer both Polished and Matt finishes across our collections. Our Designer Finishes maintain the premium quality and aesthetic appeal of our porcelain surfaces, suitable for various applications including residential, commercial, indoor, outdoor, pool areas, kitchens, and bathrooms.",
    },
    {
      question: "Can I get samples of your products?",
      answer:
        "Absolutely! We provide samples of our porcelain collections to help you visualize your project. Our samples showcase the authentic appearance, texture, and finish of our products. Please contact us to request samples or schedule a consultation to view our full-size displays and collection catalogues.",
    },
    {
      question: "Do you provide design consultation services?",
      answer:
        "Yes, we offer expert design consultation services to guide you through material selection and application. Our experienced team helps with everything from choosing the right collection for your space to planning custom solutions, Bookmatch patterns, and bespoke layouts. We provide free consultations for larger projects.",
    },
  ];

  return (
    <div className="bg-neutral-50">
      <div className="container pt-8">
        <Breadcrumb items={[{ label: "About Us" }]} />
      </div>
      <section className="section-darker">
        <div className="container text-center">
          <h1 className="title-hero text-neutral-950">
            About Timeless Touch Ceramics
          </h1>
          <p className="text-body">
            3 years of excellence in manufacturing elegant porcelain surfaces
            that grace spaces with timeless sophistication.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AspectRatio ratio={1} className="relative overflow-hidden">
              <Image
                src="/images/cottage.jpg"
                alt="Our story"
                fill
                className="object-cover"
              />
            </AspectRatio>
            <div>
              <h2 className="title-section">Our Story</h2>
              <p className="text-body">
                Timeless Touch Ceramics was founded in 2023 with a simple
                mission: to manufacture elegant porcelain surfaces that grace
                spaces with timeless sophistication. What started as a vision
                for quality has grown into a trusted manufacturer in the
                industry.
              </p>
              <p className="text-body">
                We believe that the right materials can transform any space into
                something extraordinary. That&apos;s why we focus on
                manufacturing excellence, using Full Body Technology to create
                premium porcelain surfaces.
              </p>
              <p className="text-body">
                Today, we&apos;re proud to serve thousands of satisfied
                customers, from homeowners creating their dream kitchens to
                architects designing landmark commercial spaces, with our
                comprehensive range of stone look, marble look, and modern look
                collections.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-darker">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="title-section">Our Values</h2>
            <p className="text-body">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <FeaturesCard
                key={value.title}
                icon={value.icon}
                title={value.title}
                variant="vertical"
                description={value.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="title-section">Our Journey</h2>
            <p className="text-body">Milestones that shaped our story</p>
          </div>

          <div className="flex flex-col gap-8">
            {timeline.map((item) => (
              <div key={item.year} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <span className="text-primary-500">{item.year}</span>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="text-body">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TechnicalSpecs />

      <FAQ items={faqItems} />
    </div>
  );
}

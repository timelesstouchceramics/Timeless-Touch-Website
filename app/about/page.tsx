import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Award, Users, Globe, Heart } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Award,
      title: "Quality Excellence",
      description:
        "We source only the finest materials from trusted quarries worldwide.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Our experienced professionals guide you through every step of your project.",
    },
    {
      icon: Globe,
      title: "Global Sourcing",
      description:
        "Direct partnerships with manufacturers ensure authenticity and value.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Your satisfaction is our priority, from selection to installation.",
    },
  ];

  const timeline = [
    {
      year: "2023",
      event: "Founded Timeless Touch Ceramics with a vision for quality",
    },
    { year: "2024", event: "Expanded to 5 showrooms across the region" },
    { year: "2025", event: "Reached milestone of 10,000 satisfied customers" },
    {
      year: "2026",
      event: "Leading provider of premium tiles and natural stones",
    },
  ];

  return (
    <div className="bg-neutral-50">
      <section className="section bg-neutral-200">
        <div className="container text-center">
          <h1 className="title-hero">About Timeless Touch Ceramics</h1>
          <p className="text-body">
            3 years of excellence in providing premium tiles and natural stones
            for spaces that inspire.
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
                mission: to bring the world&apos;s finest natural stones and
                tiles to homes and businesses across the country. What started
                as a small showroom has grown into a trusted name in the
                industry.
              </p>
              <p className="text-body">
                We believe that the right materials can transform any space into
                something extraordinary. That&apos;s why we personally visit
                quarries, inspect materials, and build lasting relationships
                with manufacturers worldwide.
              </p>
              <p className="text-body">
                Today, we&apos;re proud to serve thousands of satisfied
                customers, from homeowners creating their dream kitchens to
                architects designing landmark commercial spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-neutral-200">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="title-section">Our Values</h2>
            <p className="text-body">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent>
                  <Avatar>
                    <AvatarFallback>
                      <value.icon className="text-primary-500" />
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{value.title}</CardTitle>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
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
    </div>
  );
}

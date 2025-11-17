import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Modern Luxury Villa",
      location: "Beverly Hills, CA",
      category: "Residential",
      description:
        "Complete marble flooring and granite countertops installation",
      materials: ["Carrara Marble", "Black Galaxy Granite"],
      image: "/images/cottage.jpg",
    },
    {
      id: 2,
      title: "Downtown Hotel Lobby",
      location: "New York, NY",
      category: "Commercial",
      description:
        "Large-scale porcelain tile installation with custom patterns",
      materials: ["Porcelain Tiles", "Travertine"],
      image: "/images/slider-qxbxlb1pnn7lnr37mcfhy1qfctmztsja829dgwhocg.jpg",
    },
    {
      id: 3,
      title: "Spa & Wellness Center",
      location: "Miami, FL",
      category: "Commercial",
      description: "Luxury spa featuring natural stone throughout",
      materials: ["Calacatta Gold", "Emperador Brown"],
      image: "/images/slider-lava-blue.jpg",
    },
    {
      id: 4,
      title: "Contemporary Kitchen",
      location: "San Francisco, CA",
      category: "Residential",
      description:
        "Custom kitchen with marble countertops and ceramic backsplash",
      materials: ["Statuario Marble", "Ceramic Tiles"],
      image: "/images/cottage-tile.jpg",
    },
    {
      id: 5,
      title: "Corporate Office",
      location: "Chicago, IL",
      category: "Commercial",
      description: "Modern office space with polished granite flooring",
      materials: ["Kashmir White", "Absolute Black"],
      image: "/images/concept-light-gray-.jpg",
    },
    {
      id: 6,
      title: "Outdoor Patio Paradise",
      location: "Austin, TX",
      category: "Residential",
      description: "Weather-resistant porcelain tiles for outdoor living",
      materials: ["Porcelain Pavers", "Natural Stone"],
      image: "/images/sansam-mobile-slider.jpg",
    },
  ];

  return (
    <div className="bg-neutral-50">
      <Navigation />

      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="title-section">Our Projects</h1>
            <p className="text-body">
              Explore our portfolio of completed installations. From residential
              homes to commercial spaces, we bring visions to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id}>
                <AspectRatio ratio={4 / 3} className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="default">{project.category}</Badge>
                  </div>
                </AspectRatio>
                <CardContent>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription className="pb-8">
                    {project.location}
                  </CardDescription>
                  <p className="text-body">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.materials.map((material) => (
                      <Badge key={material} variant="outline">
                        {material}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

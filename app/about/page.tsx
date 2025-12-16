import { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About Us | Timeless Touch Ceramics",
  description:
    "Learn about Timeless Touch Ceramics - 3 years of excellence in manufacturing elegant porcelain surfaces. ISO 10545 certified, Full Body Technology, large format slabs up to 800x2400mm.",
  keywords: [
    "about Timeless Touch",
    "porcelain manufacturer Dubai",
    "ceramic company UAE",
    "ISO 10545 certified",
    "Full Body Technology",
  ],
  openGraph: {
    title: "About Us | Timeless Touch Ceramics",
    description:
      "3 years of excellence in manufacturing elegant porcelain surfaces that grace spaces with timeless sophistication.",
  },
};

export default function About() {
  return <AboutClient />;
}

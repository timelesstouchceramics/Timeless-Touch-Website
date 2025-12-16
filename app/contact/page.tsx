import { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us | Timeless Touch Ceramics",
  description:
    "Get in touch with Timeless Touch Ceramics. Visit our showroom in Dubai, UAE. Call +971 54 713 9032 or email info@timelesstouch.com for inquiries and consultations.",
  keywords: [
    "contact Timeless Touch",
    "porcelain tiles Dubai contact",
    "ceramic showroom UAE",
    "tile consultation",
  ],
  openGraph: {
    title: "Contact Us | Timeless Touch Ceramics",
    description:
      "Get in touch with us for your porcelain tile needs. Located in Dubai, UAE.",
  },
};

export default function Contact() {
  return <ContactClient />;
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FeaturesCard from "@/components/FeaturesCard";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Office M-45, The Curve Building", "Al Quoz 3, Dubai, UAE"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+971 54 713 9032"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["timelesstouchceramics@hotmail.com"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 9AM - 6PM", "Sat: 10AM - 4PM", "Sun: Closed"],
    },
  ];

  const headerRef = useRef(null);
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const contactInfoInView = useInView(contactInfoRef, {
    once: true,
    margin: "-100px",
  });
  const formInView = useInView(formRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0, 0, 0.58, 1] as const,
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: [0, 0, 0.58, 1] as const,
      },
    },
  };

  const mapVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: [0, 0, 0.58, 1] as const,
      },
    },
  };

  return (
    <div className="bg-neutral-50">
      <section className="section" ref={headerRef}>
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.9, ease: [0, 0, 0.58, 1] as const }}
          >
            <h1 className="title-section">Get In Touch</h1>
            <p className="text-body">
              Have a question or ready to start your project? We&apos;d love to
              hear from you.
            </p>
          </motion.div>

          <motion.div
            ref={contactInfoRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={contactInfoInView ? "visible" : "hidden"}
          >
            {contactInfo.map((info) => (
              <motion.div key={info.title} variants={cardVariants}>
                <FeaturesCard
                  icon={info.icon}
                  title={info.title}
                  description={info.details.join("\n")}
                  variant="vertical"
                />
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <motion.div
              ref={formRef}
              variants={formVariants}
              initial="hidden"
              animate={formInView ? "visible" : "hidden"}
            >
              <Card className="bg-white shadow-sm h-full flex flex-col border-0 rounded-md">
                <CardContent className="flex-1 flex flex-col">
                  <CardTitle className="mb-6">Send Us a Message</CardTitle>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 flex-1"
                  >
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 54 713 9032"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about your project..."
                        rows={5}
                      />
                    </div>

                    <Button type="submit">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="relative w-full h-full overflow-hidden rounded-md"
              variants={mapVariants}
              initial="hidden"
              animate={formInView ? "visible" : "hidden"}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3611.211029331109!2d55.23340321066964!3d25.1623513330189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f697bea3b05b5%3A0x2a081fc15608ae36!2sTimeless%20Touch%20Ceramics%20L.L.C!5e0!3m2!1sen!2sfi!4v1765494192658!5m2!1sen!2sfi"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
                title="Dubai Location Map"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

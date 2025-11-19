"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
      details: ["Dubai", "United Arab Emirates"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+971 4 XXX XXXX", "+971 50 XXX XXXX"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "info@timelesstouch.com",
        "sales@timelesstouch.com",
      ],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 9AM - 6PM", "Sat: 10AM - 4PM", "Sun: Closed"],
    },
  ];

  return (
    <div className="bg-neutral-50">
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="title-section">Get In Touch</h1>
            <p className="text-body">
              Have a question or ready to start your project? We&apos;d love to
              hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((info) => (
              <Card key={info.title}>
                <CardContent>
                  <Avatar>
                    <AvatarFallback>
                      <info.icon className="text-primary-500" />
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{info.title}</CardTitle>
                  <div className="flex flex-col gap-1">
                    {info.details.map((detail) => (
                      <p key={detail} className="text-body">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card>
              <CardContent>
                <CardTitle>Send Us a Message</CardTitle>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                      placeholder="+971 50 XXX XXXX"
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

            <AspectRatio ratio={1} className="relative overflow-hidden">
              <Image
                src="/images/sansam-mobile-slider2.jpg"
                alt="Showroom"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950/40">
                <MapPin className="text-primary-500 mb-4" />
                <p className="text-body text-neutral-50">
                  Visit our showroom to see our full collection
                </p>
              </div>
            </AspectRatio>
          </div>
        </div>
      </section>
    </div>
  );
}

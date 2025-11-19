import Navigation from "@/components/Navigation";
import "./globals.css";
import { Providers } from "@/components/providers";
import ScrollToTop from "@/components/ScrollToTop";
import { Metadata } from "next";

import { Geist, Inter } from "next/font/google";
import Footer from "@/components/Footer";

const fontPrimary = Geist({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-primary",
});

const fontSecondary = Inter({
  subsets: ["latin"],
  variable: "--font-secondary",
  weight: ["300", "500", "700"],
});

export const metadata: Metadata = {
  title: "Timeless Touch Ceramics - Premium Tiles and Natural Stones",
  description:
    "Premium tiles and natural stones for spaces that inspire. Quality craftsmanship since 2023.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${fontPrimary.variable} ${fontSecondary.variable}`}
      >
        <Navigation />
        <Providers>{children}</Providers>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}

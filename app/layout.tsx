import NavigationServer from "@/components/NavigationServer";
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
  title: "Timeless Touch Ceramics - Grace Your Space",
  description:
    "Elegant Porcelain Surfaces. Premium manufacturer of ISO 10545 certified porcelain slabs and tiles. Quality craftsmanship since 2023.",
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
        <NavigationServer />
        <Providers>{children}</Providers>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}

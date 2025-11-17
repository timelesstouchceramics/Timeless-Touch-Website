import "./globals.css";
import { Providers } from "@/components/providers";
import ScrollToTop from "@/components/ScrollToTop";
import { Metadata } from "next";

import { Inter, Krub } from "next/font/google";

const fontPrimary = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-primary",
});

const fontSecondary = Krub({
  subsets: ["latin"],
  variable: "--font-secondary",
  weight: ["500", "700"],
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
      <body className={`antialiased ${fontPrimary.variable} ${fontSecondary.variable}`}>
        <Providers>{children}</Providers>
        <ScrollToTop />
      </body>
    </html>
  );
}

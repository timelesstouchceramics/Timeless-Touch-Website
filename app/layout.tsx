import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import ScrollToTop from "@/components/ScrollToTop";

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
      <body className="antialiased">
        <Providers>{children}</Providers>
        <ScrollToTop />
      </body>
    </html>
  );
}

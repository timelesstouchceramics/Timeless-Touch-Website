import "./globals.css";
import { Metadata } from "next";
import Script from "next/script";
import { Geist, Inter } from "next/font/google";

const GTM_ID = "GTM-M2XN8HTP";

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
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      </head>
      <body
        className={`antialiased ${fontPrimary.variable} ${fontSecondary.variable}`}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}

import NavigationServer from "@/components/NavigationServer";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Providers } from "@/components/providers";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationServer />
      <Providers>{children}</Providers>
      <Footer />
      <ScrollToTop />
    </>
  );
}

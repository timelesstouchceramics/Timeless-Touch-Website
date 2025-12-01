import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Logo from "@/components/Logo";

const Footer = () => {
  return (
    <footer className="bg-neutral-200 border-t border-neutral-300 overflow-x-hidden">
      <div className="container section-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo variant="dark" className="w-56 mb-4" />
            <p className="footer-text mb-6">
              Premium tiles and natural stones for spaces that inspire. Quality
              craftsmanship since 2023.
            </p>
            <div className="flex gap-4">
              <a href="#" className="footer-icon">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="footer-icon">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="footer-icon">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Quick Links</h4>
            <ul className="flex flex-col gap-4 mt-4">
              <li>
                <Link href="/products" className="footer-link">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="footer-link">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/catalogues" className="footer-link">
                  Catalogues
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Categories</h4>
            <ul className="flex flex-col gap-4 mt-4">
              <li>
                <Link href="/products?category=marble" className="footer-link">
                  Marble
                </Link>
              </li>
              <li>
                <Link href="/products?category=granite" className="footer-link">
                  Granite
                </Link>
              </li>
              <li>
                <Link href="/products?category=ceramic" className="footer-link">
                  Ceramic Tiles
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=porcelain"
                  className="footer-link"
                >
                  Porcelain Tiles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Contact Us</h4>
            <ul className="flex flex-col gap-4 mt-4">
              <li className="footer-text flex items-start gap-2">
                <MapPin className="h-5 w-5 shrink-0" />
                Dubai, United Arab Emirates
              </li>
              <li className="footer-text flex items-center gap-2">
                <Phone className="h-5 w-5 shrink-0" />
                +971 54 713 9032
              </li>
              <li className="footer-text flex items-center gap-2">
                <Mail className="h-5 w-5 shrink-0" />
                info@timelesstouch.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-300 mt-8 pt-8 text-center">
          <p className="footer-text">
            &copy; {new Date().getFullYear()} Timeless Touch. All rights
            reserved
            <span className="mx-2">•</span>
            Designed by{" "}
            <a
              href="https://xma.ae"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              XMA
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

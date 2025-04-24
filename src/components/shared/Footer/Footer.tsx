import Logo from "@/assets/svg/Logo";
import {
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8 border-t">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Logo />
              <span className="text-xl font-bold text-basafinder-700">
                BasaFinder
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Finding your perfect rental home has never been easier. Let
              BasaFinder connect you with your ideal rental property hrefday.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-accent-500 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-accent-500 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-accent-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-basafinder-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-basafinder-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/rentals"
                  className="text-gray-600 hover:text-basafinder-600 transition-colors"
                >
                  Rental Listings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-basafinder-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/help-centre#privacy"
                  className="text-gray-600 hover:text-basafinder-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/help-centre#faq"
                  className="text-gray-600 hover:text-basafinder-600 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/help-centre#news"
                  className="text-gray-600 hover:text-basafinder-600 transition-colors"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin
                  size={20}
                  className="text-basafinder-600 mt-1 flex-shrink-0"
                />
                <span className="text-gray-600">
                  123 Rental Street, Apartment 4B
                  <br />
                  Cityville, ST 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone
                  size={20}
                  className="text-basafinder-600 flex-shrink-0"
                />
                <span className="text-gray-600">(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-basafinder-600 flex-shrink-0" />
                <span className="text-gray-600">info@basafinder.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} BasaFinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

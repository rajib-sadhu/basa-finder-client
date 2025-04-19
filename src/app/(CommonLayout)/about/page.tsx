"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Home,
  Users,
  Building2,
  Rocket,
  ShieldCheck,
  Gem,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-20">
      {/* Header Section */}
      <div className="text-center">
        <Badge className="bg-emerald-100 text-emerald-700 mb-2">About Us</Badge>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to BasaFinder
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          A smarter rental and housing solution designed for seamless property
          search and hassle-free management in Bangladesh.
        </p>
      </div>

      {/* Why Choose Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Why Choose BasaFinder?
          </h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <Home className="text-emerald-600 mt-1" />
              <span>
                <strong>Smart Listing:</strong> Filter and find properties that
                match your needs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="text-emerald-600 mt-1" />
              <span>
                <strong>Verified Listings:</strong> All properties are vetted
                for trust and safety.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="text-emerald-600 mt-1" />
              <span>
                <strong>Tenant-Landlord Ecosystem:</strong> Secure and direct
                communication.
              </span>
            </li>
          </ul>
          <div className="mt-6">
            <Link href="/rentals">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Explore Listings
              </Button>
            </Link>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://i.ibb.co.com/DP6DP6Bm/basa-Finder1.jpg"
            alt="BasaFinder Overview"
            width={600}
            height={400}
            layout="responsive"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Mission, Values, Policy Section */}
      <div className="bg-gray-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Our Mission, Core Values & Policies
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="text-center">
            <Rocket className="mx-auto text-emerald-600 mb-2" size={32} />
            <h4 className="font-semibold text-lg text-gray-900">Our Mission</h4>
            <p className="text-gray-600 mt-2">
              To revolutionize rental housing with smart tech, seamless access,
              and verified connections.
            </p>
          </div>
          {/* Values */}
          <div className="text-center">
            <Gem className="mx-auto text-emerald-600 mb-2" size={32} />
            <h4 className="font-semibold text-lg text-gray-900">Our Values</h4>
            <p className="text-gray-600 mt-2">
              Transparency, Security, Innovation, and Commitment to Excellence.
            </p>
          </div>
          {/* Policy */}
          <div className="text-center">
            <ShieldCheck className="mx-auto text-emerald-600 mb-2" size={32} />
            <h4 className="font-semibold text-lg text-gray-900">Our Policy</h4>
            <p className="text-gray-600 mt-2">
              We protect user privacy and ensure verified listings through
              strict internal checks.
            </p>
          </div>
        </div>
      </div>

      {/* How It All Started */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="rounded-lg overflow-hidden shadow-md">
          <Image
            src="https://i.ibb.co.com/ZzMfkvh7/basa-Finder3.jpg"
            alt="How it started"
            width={600}
            height={400}
            layout="responsive"
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How It All Started
          </h2>
          <p className="text-gray-600 text-lg">
            BasaFinder was born from a personal frustration—searching for a
            trustworthy rental apartment in the bustling streets of Dhaka. After
            countless scams and wasted time, our founder decided to build a
            transparent, smart, and user-centric platform. What began as a small
            idea during a pandemic lockdown is now transforming the way people
            rent and find homes across Bangladesh.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 px-4 md:px-8 mx-auto py-16 items-center">
        {/* Left Column - Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Contact Us</h2>
          <p className="mb-8 text-gray-600">
            We&apos;d love to hear from you! Whether you have questions about
            our listings, need help with property details, or just want to say
            hi, feel free to reach out.
          </p>

          <div className="grid gap-8">
            {/* Email */}
            <div className="flex items-start gap-4">
              <Mail className="text-emerald-600 w-6 h-6 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <Link
                  href="mailto:support@basafinder.com"
                  className="text-base text-gray-900 hover:underline"
                >
                  support@basafinder.com
                </Link>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <Phone className="text-emerald-600 w-6 h-6 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <Link
                  href="tel:+8801600000000"
                  className="text-base text-gray-900 hover:underline"
                >
                  +880 1600 000000
                </Link>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <MapPin className="text-emerald-600 w-6 h-6 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-base text-gray-900">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Link href="/rentals">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Explore Listings
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column - Map */}
        <div className="w-full">
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902359664899!2d90.39120471538523!3d23.750903494592175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85ac4d1531f%3A0x94785d9e2a8a18e2!2sDhaka!5e0!3m2!1sen!2sbd!4v1712812336563!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl shadow-lg w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

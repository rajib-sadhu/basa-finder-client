"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Users, Building2, Rocket, ShieldCheck, Gem } from "lucide-react";
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
    </div>
  );
};

export default About;

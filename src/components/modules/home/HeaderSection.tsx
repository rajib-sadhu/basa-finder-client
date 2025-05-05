import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";
import Image from "next/image";
import image1 from "@/assets/images/homeHeader.jpeg";
import Link from "next/link";
import React from "react";
// import SearchBox from "./SearchBox";

const HeaderSection = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-24 bg-gradient-to-br from-emerald-50 to-emerald-100 md:px-5 px-2">
        <div className="container px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Find Your Perfect{" "}
                <span className="text-emerald-700">Rental Home</span> Today
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                BasaFinder connects you with the ideal rental property. Browse
                thousands of listings, submit rental requests, and secure your
                next home with ease.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/rentals">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[180px]">
                    Browse Rentals
                  </Button>
                </Link>
                {/* <Link href="/add-property">
                  <Button
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 min-w-[180px]"
                  >
                    List Your Property
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link> */}
              </div>
            </div>

            <div className="lg:w-1/2 lg:pl-12">
              <div className="relative">
                <Image
                  src={image1}
                  alt="Modern apartment interior"
                  width={1000}
                  height={1000}
                  className="rounded-lg shadow-xl w-full object-cover"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 w-48">
                  <div className="text-accent-500 font-bold text-2xl mb-1">
                    $1,250
                  </div>
                  <div className="text-gray-600 text-sm">
                    Modern Downtown Apt
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Downtown, City Center
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Box */}
          {/* <div className="mt-20 relative z-10">
            {" "}
            <SearchBox />{" "}
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default HeaderSection;

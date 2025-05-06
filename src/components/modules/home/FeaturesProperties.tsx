"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllRentals } from "@/services/RentalsService";
import PropertyCard from "../property/PropertyCard";
import { IRental } from "@/types";
import { Button } from "@/components/ui/button";
import PropertyCardSkeleton from "../property/PropertyCardSkeleton";

const FeaturesProperties = () => {
  const [allRentals, setAllRentals] = useState<IRental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allRentalsFunction = async () => {
      try {
        setLoading(true);
        const allRentals = await getAllRentals();
        setAllRentals(allRentals.slice(0, 4));
      } catch (error) {
        console.error("Error fetching featured properties:", error);
      } finally {
        setLoading(false);
      }
    };
    allRentalsFunction();
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of the finest rental properties
            available right now.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <PropertyCardSkeleton key={idx} />
              ))
            : allRentals.map((property) => (
                <PropertyCard key={property._id} {...property} />
              ))}
        </div>

        <div className="grid place-content-center mt-5">
          <Link href="/rentals">
            <Button className="bg-emerald-800">View All</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesProperties;

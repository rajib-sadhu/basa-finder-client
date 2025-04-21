"use client";
import { getAllRentals } from "@/services/RentalsService";
import PropertyCard from "../property/PropertyCard";
import { useEffect, useState } from "react";
import { IRental } from "@/types";

const FeaturesProperties = () => {
  const [allRentals, setAllRentals] = useState([]);

  useEffect(() => {
    const allRentalsFunction = async () => {
      const allRentals = await getAllRentals();
      setAllRentals(allRentals.slice(0,4));
    };
    allRentalsFunction();
  }, []);

  return (
    <section className="py-12 px-4">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allRentals.map((property: IRental) => (
            <PropertyCard key={property._id} {...property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesProperties;

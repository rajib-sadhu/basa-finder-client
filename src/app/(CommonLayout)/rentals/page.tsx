"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getAllRentals } from "@/services/RentalsService";
import { IRental } from "@/types";
import PropertyCard from "@/components/modules/property/PropertyCard";
import SearchFilters from "@/components/ui/core/SearchBox";

const RentalsPage = () => {
  const [allRentals, setAllRentals] = useState<IRental[]>([]);
  const [filteredRentals, setFilteredRentals] = useState<IRental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  // Filter states
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [bedrooms, setBedrooms] = useState<number | "any">("any");
  const [locationFilter, setLocationFilter] = useState("");
  const [amenitiesFilter, setAmenitiesFilter] = useState<string[]>([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setLoading(true);
        const rentals = await getAllRentals();
        setAllRentals(rentals);
        setFilteredRentals(rentals);
      } catch (err) {
        setError("Failed to load rentals. Please try again later.");
        console.error("Error fetching rentals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  useEffect(() => {
    const filtered = allRentals.filter((rental) => {
      const priceMatch =
        rental.rent >= priceRange[0] && rental.rent <= priceRange[1];

      const bedroomsMatch = bedrooms === "any" || rental.bedrooms === bedrooms;

      const locationMatch = rental.location
        .toLowerCase()
        .includes(locationFilter.toLowerCase());

      const amenitiesMatch =
        amenitiesFilter.length === 0 ||
        amenitiesFilter.every((amenity) => rental.amenities.includes(amenity));

      return priceMatch && bedroomsMatch && locationMatch && amenitiesMatch;
    });

    setFilteredRentals(filtered);
  }, [allRentals, priceRange, bedrooms, locationFilter, amenitiesFilter]);

  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setBedrooms("any");
    setLocationFilter("");
    setAmenitiesFilter([]);
  };

  if (loading) {
    return (
      <div className="container py-10 flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-10 text-center">
        <p className="text-red-500">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          className="mt-4 bg-emerald-600 hover:bg-emerald-700"
        >
          Retry
        </Button>
      </div>
    );
  }

  

  return (
    <div className="container py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Find Your Perfect Rental</h1>
        <p className="text-gray-600">
          Browse through our selection of available properties
        </p>
      </div>

      {/* Filters Section */}
      <SearchFilters
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        bedrooms={bedrooms}
        onBedroomsChange={setBedrooms}
        locationFilter={locationFilter}
        onLocationFilterChange={setLocationFilter}
        onResetFilters={resetFilters}
      />

      {/* Results Count */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredRentals.length} of {allRentals.length} properties
        </p>
      </div>

      {/* Properties Grid */}
      {filteredRentals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRentals.map((rental) => (
            <PropertyCard key={rental._id} {...rental} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No properties found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters to see more results
          </p>
          <Button
            onClick={resetFilters}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default RentalsPage;

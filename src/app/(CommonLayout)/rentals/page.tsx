"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getAllRentals } from "@/services/RentalsService";
import { IRental } from "@/types";
import PropertyCard from "@/components/modules/property/PropertyCard";
import PropertyCardSkeleton from "@/components/modules/property/PropertyCardSkeleton";
import SearchFilters from "@/components/ui/core/SearchBox";

const ITEMS_PER_PAGE = 4;

const RentalsPage = () => {
  const [allRentals, setAllRentals] = useState<IRental[]>([]);
  const [filteredRentals, setFilteredRentals] = useState<IRental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [bedrooms, setBedrooms] = useState<number | "any">("any");
  const [locationFilter, setLocationFilter] = useState("");
  const [amenitiesFilter, setAmenitiesFilter] = useState<string[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredRentals.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentRentals = filteredRentals.slice(
    startIdx,
    startIdx + ITEMS_PER_PAGE
  );

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setLoading(true);
        const rentals = await getAllRentals();
        setAllRentals(rentals);
        setFilteredRentals(rentals);
      } catch (err) {
        console.error("Error fetching rentals:", err);
        setError("Failed to load rentals. Please try again later.");
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
        amenitiesFilter.every((a) => rental.amenities.includes(a));

      return priceMatch && bedroomsMatch && locationMatch && amenitiesMatch;
    });

    setFilteredRentals(filtered);
    setCurrentPage(1);
  }, [allRentals, priceRange, bedrooms, locationFilter, amenitiesFilter]);

  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setBedrooms("any");
    setLocationFilter("");
    setAmenitiesFilter([]);
  };

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="container py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Find Your Perfect Rental</h1>
        <p className="text-gray-600">
          Browse through our selection of available properties
        </p>
      </div>

      <SearchFilters
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        bedrooms={bedrooms}
        onBedroomsChange={setBedrooms}
        locationFilter={locationFilter}
        onLocationFilterChange={setLocationFilter}
        onResetFilters={resetFilters}
      />

      {error && (
        <div className="text-center text-red-500 py-10">
          <p>{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700"
          >
            Retry
          </Button>
        </div>
      )}

      {!loading && !error && (
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {currentRentals.length} of {filteredRentals.length}{" "}
            properties
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <PropertyCardSkeleton key={idx} />
            ))
          : currentRentals.length > 0
          ? currentRentals.map((rental) => (
              <PropertyCard key={rental._id} {...rental} />
            ))
          : !error && (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium mb-2">
                  No properties found
                </h3>
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
      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
          <Button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, idx) => {
            const page = idx + 1;
            return (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={` ${
                  page === currentPage
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : ""
                }`}
              >
                {page}
              </Button>
            );
          })}

          <Button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default RentalsPage;

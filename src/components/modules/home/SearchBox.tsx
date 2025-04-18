"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Home, DollarSign } from "lucide-react";

const SearchBox = () => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching with:", { location, priceRange, bedrooms });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-1 sm:p-2">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center">
        {/* Location */}
        <div className="flex-1 relative border-b md:border-b-0 md:border-r border-gray-200">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <MapPin size={18} />
          </div>
          <input
            type="text"
            placeholder="Location"
            className="hero-search-input pl-10 w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Price Range */}
        <div className="flex-1 relative border-b md:border-b-0 md:border-r border-gray-200">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <DollarSign size={18} />
          </div>
          <select
            className="hero-search-input pl-10 w-full bg-transparent"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">Price Range</option>
            <option value="0-500">$0 - $500</option>
            <option value="500-1000">$500 - $1,000</option>
            <option value="1000-1500">$1,000 - $1,500</option>
            <option value="1500-2000">$1,500 - $2,000</option>
            <option value="2000+">$2,000+</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Home size={18} />
          </div>
          <select
            className="hero-search-input pl-10 w-full bg-transparent"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          >
            <option value="">Bedrooms</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5+">5+ Bedrooms</option>
          </select>
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          className="md:rounded-l-none bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer flex items-center"
        >
          <Search className="mr-2" size={18} />
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBox;

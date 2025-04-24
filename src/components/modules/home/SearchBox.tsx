"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Home } from "lucide-react";
import { Slider } from "@radix-ui/react-slider";

const SearchBox = () => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [bedrooms, setBedrooms] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching with:", { location, priceRange, bedrooms });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-1 sm:p-2">
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-center"
      >
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
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <Slider
              value={priceRange}
              onValueChange={(value) =>
                setPriceRange(value as [number, number])
              }
              min={0}
              max={1000}
              step={10}
              minStepsBetweenThumbs={1}
              className="w-full"
            />
          </div>
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

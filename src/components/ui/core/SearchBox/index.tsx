"use client";

import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchFiltersProps {
  priceRange: number[];
  onPriceRangeChange: (value: [number, number]) => void;
  bedrooms: number | "any";
  onBedroomsChange: (value: number | "any") => void;
  locationFilter: string;
  onLocationFilterChange: (value: string) => void;
  onResetFilters: () => void;
}

const SearchFilters = ({
  priceRange,
  onPriceRangeChange,
  bedrooms,
  onBedroomsChange,
  locationFilter,
  onLocationFilterChange,
  onResetFilters,
}: SearchFiltersProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
            min={0}
            max={1000}
            step={10}
            minStepsBetweenThumbs={1}
            className="w-full"
          />
        </div>

        {/* Bedrooms Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Bedrooms</label>
          <Select
            value={bedrooms === "any" ? "any" : bedrooms.toString()}
            onValueChange={(value) =>
              onBedroomsChange(value === "any" ? "any" : parseInt(value))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search location..."
              value={locationFilter}
              onChange={(e) => onLocationFilterChange(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <Button
            onClick={onResetFilters}
            variant="outline"
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
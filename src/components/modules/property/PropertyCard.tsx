import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath } from "lucide-react";
import Link from "next/link";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  isNew?: boolean;
}
const PropertyCard = ({
  id,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  imageUrl,
  isNew = false,
}: PropertyCardProps) => {
  return (
    <div className="property-card">
      {/* Image container with badges */}
      <div className="relative overflow-hidden h-48 sm:h-56">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && (
            <Badge className="bg-accent-500 hover:bg-accent-600 text-white">
              New
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin size={14} className="mr-1 text-emerald-600" />
          <span>{location}</span>
        </div>

        <h3 className="font-medium text-lg mb-2 text-gray-900 line-clamp-1">
          {title}
        </h3>

        <div className="flex items-center mb-4">
          <div className="text-xl font-bold text-emerald-700">
            ${price}
            <span className="text-sm text-gray-500 font-normal">/month</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Bed size={16} className="mr-1" />
            <span>
              {bedrooms} Bed{bedrooms !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center">
            <Bath size={16} className="mr-1" />
            <span>
              {bathrooms} Bath{bathrooms !== 1 ? "s" : ""}
            </span>
          </div>
          <div>
            <span>{area} sqft</span>
          </div>
        </div>

        <Link href={`/property/${id}`}>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;

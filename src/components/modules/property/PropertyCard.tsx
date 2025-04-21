import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  _id: string;
  title: string;
  location: string;
  description: string;
  rent: number;
  bedrooms: number;
  amenities: string[];
  images: string[];
}
const PropertyCard = ({
  _id,
  title,
  location,
  description,
  rent,
  bedrooms,
  amenities,
  images,
}: PropertyCardProps) => {
  return (
    <div className="property-card">
      {/* Image container with badges */}
      <div className="relative overflow-hidden h-48 sm:h-56">
        <Image
          src={
            images[0] ||
            "https://media.istockphoto.com/id/1300331505/vector/living-room-interior-comfortable-sofa-bookcase-chair-and-house-plants-vector-flat-style.jpg?s=612x612&w=0&k=20&c=KbIpj1QZ7FXfma9ELib4My6URwkuPU05gN20IRDG__c="
          }
          alt={title}
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin size={14} className="mr-1 text-emerald-600" />
          <span>{location}</span>
        </div>

        <h3 className="font-medium text-lg text-gray-900 line-clamp-1">
          {title}
        </h3>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <span>{description.slice(0, 40)}...</span>
        </div>

        <div className="flex items-center mb-4">
          <div className="text-xl font-bold text-emerald-700">
            ${rent}
            <span className="text-sm text-gray-500 font-normal">/month</span>
          </div>
        </div>

        {/* Features */}
        <div className="text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Bed size={16} className="mr-1" />
            <span>
              {bedrooms} Bed{bedrooms !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="mt-3">
            {amenities.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {amenities.slice(0, 2).map((item, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="bg-emerald-100"
                  >
                    {item}
                  </Badge>
                ))}
                {amenities.length > 2 && (
                  <Badge variant="outline" className="bg-emerald-100">
                    +{amenities.length - 2} more
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        <Link href={`/rentals/${_id}`}>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;

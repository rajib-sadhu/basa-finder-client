import React from "react";
import { MapPin, Bed, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { IRental } from "@/types";

interface RentalCardProps {
  rental: IRental;
}

export function RentalCard({ rental }: RentalCardProps) {
  const {
    title,
    location,
    description,
    rent,
    bedrooms,
    images,
    availability,
    amenities,
  } = rental;

  return (
    <div className="basa-card border rounded-lg overflow-hidden shadow-sm">
      <div className="relative h-48 w-full">
        <Image
          src={images?.[0] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgZofysvWs3AZrnbtQUHnRK8j88ga11fJfGQ&s"}
          alt={title}
          width={500}
          height={500}
          className="h-full w-full object-cover"
        />
        {!availability && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm px-3 py-1.5">
              Rented
            </Badge>
          </div>
        )}
        <Badge className="absolute top-3 left-3 bg-basa-primary hover:bg-basa-primary-dark">
          ₹{rent}/month
        </Badge>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-lg mb-1 text-basa-neutral-800">
          {title}
        </h3>

        <div className="flex items-center text-basa-neutral-500 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>

        <div className="flex items-center text-basa-neutral-600 text-sm mb-4">
          <Bed className="h-4 w-4 mr-1" />
          <span>{bedrooms} Bedroom{bedrooms > 1 ? "s" : ""}</span>
        </div>

        {amenities?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {amenities.map((item, idx) => (
              <Badge key={idx} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>
        )}

        <Button
          variant="default"
          className="w-full bg-emerald-600 hover:bg-emerald-800 cursor-pointer"
        >
          View Details
        </Button>
      </div>
    </div>
  );
}

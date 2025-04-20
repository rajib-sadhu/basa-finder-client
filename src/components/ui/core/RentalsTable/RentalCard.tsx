
import React from "react";
import {  MapPin, Bed, Bath, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export interface RentalCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  isAvailable?: boolean;
  onClick?: () => void;
}

export function RentalCard({
  title,
  location,
  price,
  image,
  bedrooms,
  bathrooms,
  area,
  isAvailable = true,
  onClick
}: RentalCardProps) {
  return (
    <div className="basa-card">
      <div className="relative h-48 w-full">
        <Image 
          src={image || '/placeholder.svg'} 
          alt={title} 
          width={500}
          height={500}
          className="h-full w-full object-cover"
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm px-3 py-1.5">
              Rented
            </Badge>
          </div>
        )}
        <Badge 
          className="absolute top-3 left-3 bg-basa-primary hover:bg-basa-primary-dark"
        >
          ${price}/month
        </Badge>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1 text-basa-neutral-800">{title}</h3>
        
        <div className="flex items-center text-basa-neutral-500 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center text-basa-neutral-600 text-sm">
            <Bed className="h-4 w-4 mr-1" />
            <span>{bedrooms} Beds</span>
          </div>
          
          <div className="flex items-center text-basa-neutral-600 text-sm">
            <Bath className="h-4 w-4 mr-1" />
            <span>{bathrooms} Baths</span>
          </div>
          
          <div className="flex items-center text-basa-neutral-600 text-sm">
            <Home className="h-4 w-4 mr-1" />
            <span>{area} sqft</span>
          </div>
        </div>
        
        <Button 
          onClick={onClick}
          variant="default" 
          className="w-full bg-basa-primary hover:bg-basa-primary-dark"
        >
          View Details
        </Button>
      </div>
    </div>
  );
}

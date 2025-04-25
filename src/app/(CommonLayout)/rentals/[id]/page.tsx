"use client";
import { getSingleRental } from "@/services/RentalsService";
import { Bed, MapPin, Check, X, Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

interface IRentalDetails {
  _id: string;
  title: string;
  location: string;
  description: string;
  rent: number;
  bedrooms: number;
  amenities: string[];
  images: string[];
  availability: boolean;
}

const RentalDetailsPage = () => {
  const { user } = useUser();
  const { id } = useParams();
  const router = useRouter();
  const [rentalDetails, setRentalDetails] = useState<IRentalDetails | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setLoading(true);
        const rental = await getSingleRental(id as string);
        setRentalDetails(rental);
      } catch (err) {
        console.error("Error fetching rentals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-10 flex items-center justify-center h-64">
        <Loader className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!rentalDetails) {
    return (
      <div className="container py-10 text-center">
        <p>Rental not found</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="grid gap-10 md:grid-cols-2 grid-cols-1">
        {/* Image Gallery */}
        <div className="rounded-lg overflow-hidden">
          <Swiper
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="h-96"
          >
            {rentalDetails.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full w-full">
                  <Image
                    src={image || "https://media.istockphoto.com/id/1300331505/vector/living-room-interior-comfortable-sofa-bookcase-chair-and-house-plants-vector-flat-style.jpg?s=612x612&w=0&k=20&c=KbIpj1QZ7FXfma9ELib4My6URwkuPU05gN20IRDG__c="}
                    alt={`${rentalDetails.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Rental Details */}
        <div className="space-y-6">
          <div className="border-b pb-6">
            <h1 className="text-3xl font-bold">{rentalDetails.title}</h1>
            <div className="flex items-center text-gray-600 mt-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{rentalDetails.location}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bed className="w-5 h-5 text-emerald-600" />
                <span>
                  {rentalDetails.bedrooms} Bedroom
                  {rentalDetails.bedrooms !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="text-2xl font-bold text-emerald-600">
                ${rentalDetails.rent.toLocaleString()}/mo
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium">Availability:</span>
              {rentalDetails.availability ? (
                <span className="flex items-center text-green-600">
                  <Check className="w-4 h-4 mr-1" /> Available
                </span>
              ) : (
                <span className="flex items-center text-red-600">
                  <X className="w-4 h-4 mr-1" /> Rented
                </span>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700">{rentalDetails.description}</p>
          </div>

          {rentalDetails.amenities.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {rentalDetails.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-emerald-100 px-3 py-1 rounded-full"
                  >
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4">
            {user?.role === "tenant" ? (
              <Button
                size="lg"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={!rentalDetails.availability}
                onClick={() => router.push(`/rental-request/${id}`)}
              >
                {rentalDetails.availability
                  ? "Request for Rent"
                  : "Currently Unavailable"}
              </Button>
            ) : (
              <Button size="lg" className="w-full bg-red-600 hover:bg-red-700">
                {user?.role
                  ? user?.role.charAt(0).toUpperCase() +
                    user?.role.slice(1).toLowerCase() +" can not request"
                  : "Login first for request"}
               
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalDetailsPage;

'use client';

import { Button } from '@/components/ui/button';
import { getSingleHouse } from '@/services/house';
import { IHouse } from '@/types/house';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DetailsImageSlider } from '@/components/modules/slider/detailSlider';
import { Skeleton } from '@/components/ui/skeleton';

const ViewDetails = () => {
  const { houseId } = useParams<{ houseId: string }>();
  const [house, setHouse] = useState<IHouse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (houseId) {
      const fetchHouseDetails = async () => {
        try {
          const res = await getSingleHouse(houseId);
          if (res instanceof Error) {
            setError(res.message);
          } else {
            setHouse(res?.data);
          }
        } catch (error) {
          setError('Error fetching house details');
        }
      };

      fetchHouseDetails();
    }
  }, [houseId]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!house) {
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  }

  return (
    <div className="max-w-6xl mx-auto p-8 mt-10">
      <div className="flex flex-col gap-8 justify-center items-center">
        
        {/* Left: Image Slider */}
        <div className="w-full">
          {house.images?.length > 1 ? (
                          <DetailsImageSlider images={house.images} />
          )  : (
            <img
              src={house.images[0]}
              alt="house-renter"
              className="w-full h-[400px] object-cover rounded-xl"
            />
          )}
        </div>

        {/* Right: Details */}
        <div className="w-full space-y-4 py-6">
          <h2 className="text-md md:text-3xl">{house.description}</h2>
          <p className="text-2xl text-gray-800  py-3">Location: {house.location}</p>
          <p className="text-2xl text-gray-800  py-3">Category: {house.category}</p>
          <p className="text-2xl font-semibold text-orange-500 py-3">BDT {house.rentAmount}/month</p>

          <div className="border-t pt-4 space-y-2">
            <h3 className="text-2xl font-semibold py-3">Additional Details</h3>
            <p className="text-gray-700">House ID: {house._id}</p>
            <p className="text-gray-700">Amenities: {house.amenities}</p>
          </div>
        </div>
      </div>

      {/* Bottom: Rental Request Button */}
      <div className="mt-8 flex justify-center">
        <Button
          className="bg-orange-500 text-white px-6 py-3 text-lg rounded-lg shadow-md hover:bg-orange-600 transition"
          onClick={() => router.push(`/rental-request/${house._id}`)}
        >
          Rental Request
        </Button>
      </div>
    </div>
  );
};

export default ViewDetails;

import { Button } from "@/components/ui/button";
import { Home, Plus } from "lucide-react";
import Link from "next/link";

const ManageLandlordRentals = async () => {
  return (
    <div className="mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Home className="w-5 h-5" /> Your Listings
        </h1>
        <Link href="/landlord/listedRentals/createRental">
          <Button
            variant="default"
            className="flex items-center gap-2 bg-emerald-600 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Create Rental
          </Button>
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default ManageLandlordRentals;

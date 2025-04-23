import HeaderPath from "@/components/modules/dashboard/header/HeaderPath";
import ManageLandlordRentals from "@/components/modules/rental";
import { getAllRentals } from "@/services/RentalsService";
import { Home } from "lucide-react";

const AllListsPage = async () => {
  const allRentals = await getAllRentals();
  return (
    <div>
      <HeaderPath role="Admin" subPath="All Listed Rentals" />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Home className="w-5 h-5" /> All Listings
        </h1>
      </div>
      <ManageLandlordRentals myListings={allRentals} />
    </div>
  );
};

export default AllListsPage;

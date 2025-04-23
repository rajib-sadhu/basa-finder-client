"use server";
import HeaderPath from "@/components/modules/dashboard/header/HeaderPath";
import ManageLandlordRentals from "@/components/modules/rental";
import { Button } from "@/components/ui/button";
import { getMyRentals } from "@/services/RentalsService";
import { Home, Plus } from "lucide-react";
import Link from "next/link";

const ListedRentalsPage = async () => {
  // const [myListings, setMyListings] = useState([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  const lists = await getMyRentals();
  //     setMyListings(lists);
  //   };
  //   fetchUsers();
  // }, []);

  return (
    <div>
      <HeaderPath role="LandLord" subPath="Your Listings" />
      <div className="flex justify-between items-center">
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
      <ManageLandlordRentals myListings={lists} />
    </div>
  );
};

export default ListedRentalsPage;

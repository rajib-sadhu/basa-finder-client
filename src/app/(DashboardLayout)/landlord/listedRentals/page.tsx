import HeaderPath from "@/components/modules/dashboard/header/HeaderPath";
import ManageLandlordRentals from "@/components/modules/rental";
import { getMyRentals } from "@/services/RentalsService";

const ListedRentalsPage = async () => {
  const myListings = await getMyRentals();
  return (
    <div>
      <HeaderPath role="LandLord" subPath="Your Listings" />
      <ManageLandlordRentals myListings={myListings} />
    </div>
  );
};

export default ListedRentalsPage;

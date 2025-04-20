import HeaderPath from "@/components/modules/dashboard/header/HeaderPath";
import ManageLandlordRentals from "@/components/modules/rental";

const ListedRentalsPage = async () => {
  return (
    <div>
      <HeaderPath role="LandLord" subPath="Your Listings" />
      <ManageLandlordRentals />
    </div>
  );
};

export default ListedRentalsPage;

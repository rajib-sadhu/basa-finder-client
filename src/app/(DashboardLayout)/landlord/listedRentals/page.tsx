import HeaderPath from "@/components/modules/dashboard/header/HeaderPath";
import ManageLandlordRentals from "@/components/modules/rental";


const ListedRentalsPage = () => {
  return (
    <div>
      <HeaderPath role="LandLord" subPath="All Rentals" />
      <ManageLandlordRentals/>
   
    </div>
  );
};

export default ListedRentalsPage;
